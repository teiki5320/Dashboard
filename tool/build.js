#!/usr/bin/env node
// =============================================================================
// Build du dashboard — AUCUNE dépendance externe.
//
//   node tool/build.js
//
// 1. Vérifie qu'aucun secret ne traîne dans apps/ et catalog/ (sinon ÉCHEC).
// 2. Lit catalog/services.js et chaque apps/<id>/ (app.json, infra.md, marketing.md,
//    et publication.md si elle existe).
// 3. Convertit le Markdown en HTML (ancres par section) via tool/markdown.js.
// 4. Calcule le résumé marketing (modèle actuel, canaux ✅/⬜, prochaines actions).
// 5. Génère assets/dash-data.js : window.DASH_DATA, chargé par une balise
//    <script> — aucun fetch(), fonctionne aussi en file://.
//
// ⚠️ RAPPEL SÉCURITÉ : ce dépôt ne doit JAMAIS contenir de secret ni de mot de
// passe — uniquement des références (noms de variables, de projets, liens).
// =============================================================================
'use strict';

const fs = require('fs');
const path = require('path');
const { mdToHtml, slugify, stripInline } = require('./markdown.js');

const ROOT = path.join(__dirname, '..');
const APPS_DIR = path.join(ROOT, 'apps');
const ASSETS_DIR = path.join(ROOT, 'assets');
const { CATEGORIES, SERVICES } = require(path.join(ROOT, 'catalog', 'services.js'));

// ── 1. Scan anti-secrets ─────────────────────────────────────────────────────
// Motifs à haute confiance : leur présence fait ÉCHOUER le build.
const SECRET_PATTERNS = [
  { nom: 'jeton GitHub', re: /\bgh[pousr]_[A-Za-z0-9]{20,}\b/ },
  { nom: 'jeton GitHub (PAT fine-grained)', re: /\bgithub_pat_[A-Za-z0-9_]{20,}\b/ },
  { nom: 'clé API OpenAI/Stripe (sk-…)', re: /\bsk-[A-Za-z0-9_-]{20,}\b/ },
  { nom: 'clé secrète Stripe (rk_live/sk_live)', re: /\b[rs]k_live_[A-Za-z0-9]{16,}\b/ },
  { nom: 'clé AWS', re: /\bAKIA[0-9A-Z]{16}\b/ },
  { nom: 'clé Google (AIza…)', re: /\bAIza[0-9A-Za-z_-]{30,}\b/ },
  { nom: 'jeton Slack', re: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/ },
  { nom: 'clé privée', re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { nom: 'JWT', re: /\beyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{10,}\b/ },
];
// Motifs "souples" : simple avertissement (faux positifs possibles).
const WARN_PATTERNS = [
  { nom: 'mot de passe en clair ?', re: /\b(password|passwd|mot de passe)\s*[:=]\s*[^\s*_`<{$][^\s]{7,}/i },
];

function scanSecrets() {
  const targets = [];
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (/\.(md|json|js|txt|yml|yaml)$/i.test(entry.name)) targets.push(p);
    }
  };
  walk(APPS_DIR);
  walk(path.join(ROOT, 'catalog'));

  const found = [];
  const warned = [];
  for (const file of targets) {
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, idx) => {
      for (const p of SECRET_PATTERNS) {
        if (p.re.test(line)) found.push({ file, line: idx + 1, type: p.nom });
      }
      for (const p of WARN_PATTERNS) {
        if (p.re.test(line)) warned.push({ file, line: idx + 1, type: p.nom });
      }
    });
  }
  for (const w of warned) {
    console.warn(`⚠️  Avertissement : possible ${w.type} — ${path.relative(ROOT, w.file)}:${w.line}`);
  }
  if (found.length) {
    console.error('\n🛑 SECRET DÉTECTÉ — build refusé. Ce dépôt ne doit contenir AUCUN secret,');
    console.error('   uniquement des références (noms de variables, de projets, liens).\n');
    for (const f of found) {
      console.error(`   • ${f.type} → ${path.relative(ROOT, f.file)}:${f.line}`);
    }
    console.error('');
    process.exit(1);
  }
}

// ── Utilitaires d'extraction (marketing.md) ──────────────────────────────────
function normalize(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

// Retourne les lignes de la section dont le titre matche `re`
// (jusqu'au prochain titre de niveau inférieur ou égal).
// Les titres h2+ sont prioritaires : le h1 est le titre du document
// (« Plan marketing & rémunération ») et matcherait presque tout.
function sectionLines(lines, re) {
  let start = -1;
  let level = 0;
  for (const minLevel of [2, 1]) {
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(/^(#{1,6})\s+(.*)$/);
      if (m && m[1].length >= minLevel && re.test(normalize(m[2]))) {
        start = i + 1; level = m[1].length; break;
      }
    }
    if (start !== -1) break;
  }
  if (start === -1) return null;
  const out = [];
  for (let i = start; i < lines.length; i++) {
    const m = lines[i].match(/^(#{1,6})\s/);
    if (m && m[1].length <= level) break;
    out.push(lines[i]);
  }
  return out;
}

function cleanLine(l) {
  return stripInline(
    l.replace(/^\s*([-*+]|\d+[.)])\s+/, '')     // puce
     .replace(/^\[[ xX]\]\s*/, '')              // case à cocher
     .replace(/^\s*\|/, '').replace(/\|\s*$/, '').replace(/\s*\|\s*/g, ' — ') // ligne de tableau
  ).trim();
}

function extractMarketingSummary(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');

  // Canaux : ✅ / ⬜ dans les tableaux de la section "canaux" si elle existe,
  // sinon dans tous les tableaux du document.
  const canauxLines = sectionLines(lines, /canaux|diffusion|acquisition/) || lines;
  let done = 0, todo = 0;
  for (const l of canauxLines) {
    if (!l.includes('|')) continue;               // uniquement les tableaux
    if (/^\s*\|?\s*:?-{2,}/.test(l)) continue;    // ligne séparatrice
    done += (l.match(/✅/g) || []).length;
    todo += (l.match(/⬜|🔲|☐/g) || []).length;
  }

  // Modèle de rémunération actuel : dans la section revenus/rémunération,
  // la première ligne contenant "actuel" ; sinon la première ligne pleine.
  let model = null;
  const revLines = sectionLines(lines, /remuneration|revenus|monetisation|business/);
  if (revLines) {
    const isSep = (l) => /^\s*\|?\s*:?-{2,}/.test(l);
    const sepIdx = revLines.findIndex(isSep);
    const headerIdx = sepIdx > 0 ? sepIdx - 1 : -1; // en-tête du tableau
    // 1. \b : « actuel(le) » en mot entier — sans quoi « contractuelle » matche.
    const hit = revLines.find((l) => /\bactuel(?:les?)?\b/i.test(l) && cleanLine(l));
    // 2. Première ligne de tableau cochée ✅ (ex. « ✅ câblé (en cours) »).
    const checked = revLines.find((l) => l.includes('|') && l.includes('✅'));
    // 3. Première ligne pleine — jamais l'en-tête ni le séparateur du tableau.
    const first = revLines.find((l, i) => i !== headerIdx && !isSep(l) && cleanLine(l));
    const src = hit || checked || first;
    if (src) {
      model = cleanLine(src).replace(/^.*?actuel(?:le)?\s*[:—-]?\s*/i, (m0) =>
        /[:—-]\s*$/.test(m0) ? '' : m0
      ).trim() || cleanLine(src);
      // enlève un éventuel marqueur « — ✅ actuelle » en fin de ligne
      model = model.replace(/\s*[—–-]?\s*✅?\s*actuel(?:le)?\s*$/i, '').trim() || model;
      if (model.length > 120) model = model.slice(0, 117) + '…';
    }
  }
  if (!model) {
    const any = lines.find((l) => /mod[eè]le\s+actuel/i.test(l));
    if (any) model = cleanLine(any);
  }

  // Prochaines actions : liste de la section dédiée.
  let nextActions = [];
  const naLines = sectionLines(lines, /prochaines actions|prochaines etapes|a faire ensuite|next/);
  if (naLines) {
    nextActions = naLines
      .filter((l) => /^\s*([-*+]|\d+[.)])\s+/.test(l))
      .map(cleanLine)
      .filter(Boolean)
      .slice(0, 6);
  }

  return {
    model,
    done,
    todo,
    nextActions,
    // Infos importantes remontées automatiquement dans l'interface :
    kpis: extractTable(lines, /kpis|indicateurs/, 5),
    jalons: extractTable(lines, /calendrier/, 3) || extractListe(lines, /calendrier/, 3),
  };
}

// Extrait un tableau Markdown d'une section : { header, rows } (texte brut).
function extractTable(lines, re, maxRows) {
  const sec = sectionLines(lines, re);
  if (!sec) return null;
  let header = null;
  let inTable = false;
  const rows = [];
  for (const l of sec) {
    if (!l.includes('|')) { if (inTable) break; continue; }
    if (/^\s*\|?\s*:?-{2,}/.test(l)) { inTable = true; continue; }
    const cells = l.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|')
      .map((c) => stripInline(c.trim()));
    if (!inTable && !header) { header = cells; continue; }
    if (inTable) {
      rows.push(cells);
      if (rows.length >= maxRows) break;
    }
  }
  return header && rows.length ? { header, rows } : null;
}

// L'essentiel technique : les puces « **Label** : valeur » de la section
// « Vue d'ensemble » ; à défaut, le premier paragraphe du document.
function extractInfraEssentiel(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const sec = sectionLines(lines, /vue d.ensemble|overview|resume|l.application\b/);
  const facts = [];
  if (sec) {
    for (let i = 0; i < sec.length && facts.length < 6; i++) {
      const m = sec[i].match(/^\s*[-*+]\s+\*\*(.+?)\*\*\s*:\s*(.+)$/);
      if (!m) continue;
      // joint les lignes de continuation (puce écrite sur plusieurs lignes)
      let value = m[2];
      while (i + 1 < sec.length && sec[i + 1].trim() &&
             !/^\s*(?:[-*+]\s|#|>|\|)/.test(sec[i + 1])) {
        value += ' ' + sec[i + 1].trim();
        i++;
      }
      facts.push({ label: stripInline(m[1]), value: stripInline(value).replace(/\.\s*$/, '') });
    }
  }
  // Repli : la section est parfois un tableau « Info | Valeur »
  if (!facts.length) {
    const table = extractTable(lines, /vue d.ensemble|overview|l.application\b/, 7);
    if (table) {
      for (const r of table.rows) {
        if (r[0] && r[1]) facts.push({ label: r[0], value: r[1] });
      }
    }
  }
  let resume = null;
  if (!facts.length) {
    let apresTitre = false;
    for (const l of lines) {
      if (/^#\s/.test(l)) { apresTitre = true; continue; }
      // ignore : lignes vides, citations, titres, puces (« - x »), tableaux —
      // mais pas les paragraphes commençant par du gras (« **x** »)
      if (!apresTitre || !l.trim() || /^\s*>/.test(l) || /^#/.test(l) ||
          /^\s*(?:[-*+]\s|\|)/.test(l)) continue;
      resume = stripInline(l).slice(0, 300);
      break;
    }
  }
  return { facts, resume };
}

// Repli quand une section attendue en tableau est une liste à puces :
// « **Quand** : quoi » → [quand, quoi], sinon ['', texte].
function extractListe(lines, re, maxItems) {
  const sec = sectionLines(lines, re);
  if (!sec) return null;
  const rows = [];
  for (let i = 0; i < sec.length && rows.length < maxItems; i++) {
    const m = sec[i].match(/^\s*[-*+]\s+(.*)$/);
    if (!m) continue;
    let texte = m[1];
    // joint les lignes de continuation d'une puce multi-lignes
    while (i + 1 < sec.length && sec[i + 1].trim() &&
           !/^\s*(?:[-*+]\s|#|>|\|)/.test(sec[i + 1])) {
      texte += ' ' + sec[i + 1].trim();
      i++;
    }
    const bold = texte.match(/^\*\*(.+?)\*\*\s*:\s*(.+)$/);
    rows.push(bold ? [stripInline(bold[1]), stripInline(bold[2])] : ['', stripInline(texte)]);
  }
  return rows.length ? { header: null, rows } : null;
}

// Relie chaque service de l'app à la section d'infra.md dont le titre
// contient son nom (ou son id).
function findServiceAnchors(serviceIds, toc) {
  const anchors = {};
  for (const id of serviceIds) {
    const svc = SERVICES.find((s) => s.id === id);
    if (!svc) continue;
    // Nom sans parenthèses, découpé sur les « / » : "Game Center / Play Games"
    // → "game center" et "play games".
    const base = svc.nom.replace(/\s*\(.*\)$/, '');
    const needles = [normalize(id)];
    for (const part of base.split('/')) needles.push(normalize(part.trim()));
    // Les noms entre parenthèses : "Hébergement web (Vercel / Netlify)" → vercel, netlify
    const paren = svc.nom.match(/\(([^)]+)\)/);
    if (paren) for (const alt of paren[1].split(/[/,]/)) needles.push(normalize(alt.trim()));
    // Alias explicites du catalogue (ex. "API externe" pour api-tierce)
    for (const alt of svc.alias || []) needles.push(normalize(alt));
    const entry = toc.find((t) => {
      const title = normalize(t.text).replace(/[^a-z0-9]+/g, ' ').trim();
      return needles.some((n) => {
        const needle = n.replace(/[^a-z0-9]+/g, ' ').trim();
        if (!needle || needle.length < 3) return false;
        return title.includes(needle) || (title.length > 3 && needle.includes(title));
      });
    });
    if (entry) anchors[id] = entry.id;
  }
  return anchors;
}

// ── 2-4. Lecture des apps ────────────────────────────────────────────────────
function loadApps() {
  if (!fs.existsSync(APPS_DIR)) return [];
  const apps = [];
  for (const entry of fs.readdirSync(APPS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const id = entry.name;
    const dir = path.join(APPS_DIR, id);
    const manifestPath = path.join(dir, 'app.json');
    if (!fs.existsSync(manifestPath)) {
      console.warn(`⚠️  apps/${id}/ ignoré : pas de app.json`);
      continue;
    }
    let manifest;
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch (e) {
      console.error(`🛑 apps/${id}/app.json invalide : ${e.message}`);
      process.exit(1);
    }
    if (!manifest.name) {
      console.error(`🛑 apps/${id}/app.json : champ "name" manquant`);
      process.exit(1);
    }
    if (manifest.visible === false) {
      console.log(`👻 ${manifest.name} (apps/${id}) : visible=false → absent du site`);
      continue;
    }
    const services = Array.isArray(manifest.services) ? manifest.services : [];
    for (const sid of services) {
      if (!SERVICES.some((s) => s.id === sid)) {
        console.warn(`⚠️  apps/${id} : service inconnu "${sid}" (absent du catalogue) — ignoré dans le schéma`);
      }
    }

    const readMd = (file, label) => {
      const p = path.join(dir, file);
      if (fs.existsSync(p)) return fs.readFileSync(p, 'utf8');
      console.warn(`⚠️  apps/${id}/${file} manquant`);
      return `> ⚠️ *Fichier \`${file}\` manquant — ${label} à fournir.*`;
    };
    const infraMd = readMd('infra.md', 'la fiche technique');
    const marketingMd = readMd('marketing.md', 'le plan marketing');

    const infra = mdToHtml(infraMd, { anchorPrefix: 'i-' + slugify(id) });
    const marketing = mdToHtml(marketingMd, { anchorPrefix: 'm-' + slugify(id) });

    // Fiche de publication : facultative, et sans avertissement quand elle
    // manque — une app non distribuée en boutique n'a rien à y écrire.
    const publicationPath = path.join(dir, 'publication.md');
    const publicationMd = fs.existsSync(publicationPath)
      ? fs.readFileSync(publicationPath, 'utf8')
      : null;
    const publication = publicationMd
      ? mdToHtml(publicationMd, { anchorPrefix: 'p-' + slugify(id) })
      : null;

    // Indicateurs vivants (release + statut CI) : optionnels, produits par
    // tool/sync.js à partir de l'API GitHub de app.repo. Absent tant que la
    // synchro n'a pas encore tourné, ou si l'app n'a pas de repo déclaré.
    let status = null;
    const statusPath = path.join(dir, 'status.json');
    if (fs.existsSync(statusPath)) {
      try { status = JSON.parse(fs.readFileSync(statusPath, 'utf8')); }
      catch (e) { console.warn(`⚠️  apps/${id}/status.json invalide (${e.message}) — ignoré`); }
    }

    apps.push({
      id,
      order: typeof manifest.order === 'number' ? manifest.order : 999,
      name: manifest.name,
      emoji: manifest.emoji || '📱',
      tagline: manifest.tagline || '',
      repo: manifest.repo || '',
      platforms: manifest.platforms || [],
      services: services.filter((sid) => SERVICES.some((s) => s.id === sid)),
      infraHtml: infra.html,
      infraToc: infra.toc,
      infraEssentiel: extractInfraEssentiel(infraMd),
      marketingHtml: marketing.html,
      marketingToc: marketing.toc,
      marketingSummary: extractMarketingSummary(marketingMd),
      publicationHtml: publication ? publication.html : null,
      publicationToc: publication ? publication.toc : null,
      // Même forme que « Vue d'ensemble » de l'infra : mêmes puces, même extracteur.
      publicationEssentiel: publicationMd ? extractInfraEssentiel(publicationMd) : null,
      serviceAnchors: findServiceAnchors(services, infra.toc),
      status,
    });
  }
  // Tri : champ "order" du manifeste (plus petit = premier), puis alphabétique.
  apps.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name, 'fr'));
  return apps;
}

// ── 5. Génération de docs/index.html ─────────────────────────────────────────
function build() {
  console.log('🔒 Rappel : AUCUN secret dans ce dépôt — uniquement des références.');
  scanSecrets();

  const apps = loadApps();
  const data = {
    generatedAt: new Date().toISOString(),
    categories: CATEGORIES,
    services: SERVICES,
    apps,
  };

  // Échappements pour charger en toute sécurité dans une balise <script> :
  const json = JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  fs.mkdirSync(ASSETS_DIR, { recursive: true });
  const out = path.join(ASSETS_DIR, 'dash-data.js');
  fs.writeFileSync(out,
    '// \u2699\ufe0f Fichier G\u00c9N\u00c9R\u00c9 par tool/build.js \u2014 ne pas \u00e9diter \u00e0 la main.\n' +
    '// Donn\u00e9es du module \u00ab Mes apps \u00bb (dash-module.js).\n' +
    'window.DASH_DATA = ' + json + ';\n');

  const size = (fs.statSync(out).size / 1024).toFixed(0);
  console.log(`\n\u2705 assets/dash-data.js g\u00e9n\u00e9r\u00e9 (${size} Ko)`);
  console.log(`   ${apps.length} app(s) visible(s) : ${apps.map((a) => a.name).join(', ') || '\u2014'}`);
  console.log(`   ${SERVICES.length} services au catalogue (${CATEGORIES.length} familles)`);
}

build();
