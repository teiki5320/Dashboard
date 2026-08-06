// =============================================================================
// Mini convertisseur Markdown → HTML, sans dépendance.
// Couvre ce dont les fiches infra.md / marketing.md ont besoin :
// titres (avec ancres), tableaux, listes (imbriquées, cases à cocher),
// liens, images, code (inline + blocs), gras/italique/barré, citations,
// séparateurs. Les emojis de statut (✅ ⬜ …) passent tels quels.
// =============================================================================
'use strict';

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// « Backend (Supabase) » → "backend-supabase"
function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // enlève les accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section';
}

// Rendu des éléments "inline" (le texte est déjà échappé HTML).
function renderInline(text) {
  const codes = [];
  let out = text
    // code inline — protégé du reste des transformations
    .replace(/`([^`]+)`/g, (_, c) => {
      codes.push('<code>' + c + '</code>');
      return '\u0000' + (codes.length - 1) + '\u0000';
    })
    // images → simple lien (pas d'images distantes dans un site file://)
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<a href="$2">🖼️ $1</a>')
    // liens [texte](url)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
    // gras puis italique puis barré
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(«‘'>])\*([^*\n]+)\*/g, '$1<em>$2</em>')
    .replace(/~~([^~]+)~~/g, '<del>$1</del>');
  // cases à cocher de listes → emojis de statut
  out = out.replace(/^\[ \]\s/, '⬜ ').replace(/^\[[xX]\]\s/, '✅ ');
  return out.replace(/\u0000(\d+)\u0000/g, (_, i) => codes[+i]);
}

// Supprime le balisage inline pour obtenir du texte brut (ancres, résumés).
function stripInline(text) {
  return text
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1')
    .trim();
}

function isTableSeparator(line) {
  return /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+\|?\s*$/.test(line);
}

/**
 * Convertit un document Markdown en HTML.
 * @param {string} md - le source Markdown
 * @param {object} opts - { anchorPrefix: "i" } → ids "i-mon-titre"
 * @returns {{ html: string, toc: Array<{level:number, text:string, id:string}> }}
 */
function mdToHtml(md, opts = {}) {
  const prefix = opts.anchorPrefix ? opts.anchorPrefix + '-' : '';
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  const toc = [];
  const usedIds = new Set();
  let i = 0;

  function uniqueId(base) {
    let id = prefix + base;
    let n = 2;
    while (usedIds.has(id)) id = prefix + base + '-' + n++;
    usedIds.add(id);
    return id;
  }

  // Pile de listes imbriquées : [{type:'ul'|'ol', indent:n}]
  function renderList(startIndex) {
    const items = [];
    let j = startIndex;
    const re = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;
    while (j < lines.length) {
      const m = lines[j].match(re);
      if (!m) break;
      items.push({ indent: m[1].length, ordered: /\d/.test(m[2]), text: m[3] });
      j++;
    }
    let html = '';
    const stack = [];
    for (const it of items) {
      while (stack.length && it.indent < stack[stack.length - 1].indent) {
        html += '</li></' + stack.pop().type + '>';
      }
      const top = stack[stack.length - 1];
      if (!top || it.indent > top.indent) {
        const type = it.ordered ? 'ol' : 'ul';
        html += '<' + type + '>';
        stack.push({ type, indent: it.indent, first: true });
      } else {
        html += '</li>';
      }
      html += '<li>' + renderInline(escapeHtml(it.text));
    }
    while (stack.length) html += '</li></' + stack.pop().type + '>';
    return { html, next: j };
  }

  while (i < lines.length) {
    const line = lines[i];

    // Bloc de code clôturé ```
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      const buf = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) buf.push(lines[i++]);
      i++; // saute le ``` fermant
      const lang = fence[1] ? ' class="lang-' + escapeHtml(fence[1]) + '"' : '';
      out.push('<pre><code' + lang + '>' + escapeHtml(buf.join('\n')) + '</code></pre>');
      continue;
    }

    // Titre
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const raw = h[2].replace(/\s+#+\s*$/, '');
      const text = stripInline(raw);
      const id = uniqueId(slugify(text));
      toc.push({ level, text, id });
      out.push(
        '<h' + level + ' id="' + id + '">' + renderInline(escapeHtml(raw)) +
        ' <a class="anchor" href="#' + id + '" aria-label="Lien vers cette section">#</a></h' + level + '>'
      );
      i++;
      continue;
    }

    // Séparateur horizontal
    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      out.push('<hr>');
      i++;
      continue;
    }

    // Tableau : ligne avec | suivie d'une ligne séparatrice
    if (line.includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const parseRow = (l) =>
        l.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());
      const headers = parseRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].includes('|') && lines[i].trim() !== '') {
        rows.push(parseRow(lines[i]));
        i++;
      }
      let t = '<div class="table-wrap"><table><thead><tr>';
      for (const hcell of headers) t += '<th>' + renderInline(escapeHtml(hcell)) + '</th>';
      t += '</tr></thead><tbody>';
      for (const r of rows) {
        t += '<tr>';
        for (let k = 0; k < headers.length; k++) {
          t += '<td>' + renderInline(escapeHtml(r[k] || '')) + '</td>';
        }
        t += '</tr>';
      }
      t += '</tbody></table></div>';
      out.push(t);
      continue;
    }

    // Citation
    if (/^\s*>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^\s*>\s?/, ''));
        i++;
      }
      out.push('<blockquote>' + buf.map((l) => renderInline(escapeHtml(l))).join('<br>') + '</blockquote>');
      continue;
    }

    // Liste
    if (/^(\s*)([-*+]|\d+[.)])\s+/.test(line)) {
      const { html, next } = renderList(i);
      out.push(html);
      i = next;
      continue;
    }

    // Ligne vide
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Paragraphe (accumule les lignes contiguës)
    const buf = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(#{1,6})\s|^```|^\s*>\s?|^(\s*)([-*+]|\d+[.)])\s+|^\s*(?:-{3,}|\*{3,})\s*$/.test(lines[i]) &&
      !(lines[i].includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1]))
    ) {
      buf.push(lines[i]);
      i++;
    }
    out.push('<p>' + buf.map((l) => renderInline(escapeHtml(l))).join('<br>') + '</p>');
  }

  return { html: out.join('\n'), toc };
}

module.exports = { mdToHtml, slugify, stripInline, escapeHtml };
