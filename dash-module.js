// =============================================================================
// Module « Mes apps » — moteur Dash porté dans Gestion Pro.
// Chargé par index.html après assets/dash-data.js.
// Aucune dépendance, aucun fetch : données dans window.DASH_DATA. Fonctionne en file://.
// Thème « Clay » : barre latérale + tuiles en relief, clair / sombre (bouton 🌙 / ☀️).
// =============================================================================
'use strict';

(function () {
  var DATA = window.DASH_DATA;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var PRENOM = 'Teiki'; // prénom affiché dans la barre latérale et le bandeau d'accueil
  var LOGO = 'assets/dash-logo.png'; // remplaçable ; repli sur l'icône PWA si absent

  // ── Utilitaires ────────────────────────────────────────────────────────────
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  var BADGES = { requis: 'Requis', optionnel: 'Optionnel', gratuit: 'Gratuit' };
  function badgeHtml(b) { return '<span class="badge badge-' + b + '">' + (BADGES[b] || b) + '</span>'; }
  function serviceById(id) { return DATA.services.filter(function (s) { return s.id === id; })[0] || null; }
  function appsUsingService(id) { return DATA.apps.filter(function (a) { return a.services.indexOf(id) !== -1; }); }
  function pct(done, todo) { var t = done + todo; return t ? Math.round((done / t) * 100) : 0; }
  function norm(s) { return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
  function slug(s) { return norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); }
  function lienSiUrl(v) {
    return /^https?:\/\/\S+$/.test(v)
      ? '<a href="' + esc(v) + '" target="_blank" rel="noopener">' + esc(v.replace(/^https?:\/\//, '')) + '</a>'
      : esc(v);
  }
  var TINTS = ['mint', 'peach', 'sun', 'sky', 'lilac'];
  function famTint(cat) { var i = DATA.categories.indexOf(cat); return TINTS[(i >= 0 ? i : 0) % TINTS.length]; }
  function appTint(app) { return TINTS[DATA.apps.indexOf(app) % TINTS.length]; }
  function fmtDate(iso, withTime) {
    if (!iso) return '';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    var s = d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    if (withTime) s += ' · ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    return s;
  }
  function logoImg(cls) {
    return '<img class="' + cls + '" src="' + LOGO + '" alt="" onerror="this.onerror=null;this.src=\'assets/icon-192.png\'">';
  }

  // ── Prochaines actions : cases cochées persistées ──────────────────────────
  var TODO_KEY = 'v90_dash_todos';
  var todos = {};
  try {
    var brut = (typeof G !== 'undefined' && G.get) ? G.get(TODO_KEY) : localStorage.getItem(TODO_KEY);
    todos = (typeof brut === 'string' ? JSON.parse(brut || '{}') : brut) || {};
    if (Array.isArray(todos)) todos = {}; // G.get() renvoie [] par défaut
  } catch (e) { todos = {}; }
  function saveTodos() {
    try {
      if (typeof G !== 'undefined' && G.set) G.set(TODO_KEY, todos);
      else localStorage.setItem(TODO_KEY, JSON.stringify(todos));
    } catch (e) {}
  }
  function todoHtml(key, texte, sous) {
    var on = !!todos[key];
    return '<label class="todo' + (on ? ' done' : '') + '"><input type="checkbox" data-todo="' + esc(key) + '"' + (on ? ' checked' : '') + '>' +
      '<span class="todo-txt"><span>' + texte + '</span>' + (sous ? '<small>' + sous + '</small>' : '') + '</span></label>';
  }

  // Le thème clair / sombre est global : html[data-theme] et le bouton de l'en-tête.

  // ── Indicateurs vivants (release + CI) — voir tool/sync.js / apps/<id>/status.json ──
  function ciInfo(app) {
    var ci = app.status && app.status.ci;
    if (!app.repo) return { k: 'none', label: 'Sans dépôt', date: '' };
    if (!ci) return { k: 'none', label: 'Jamais vérifiée', date: '' };
    var base = { url: ci.url || ('https://github.com/' + app.repo + '/actions'), date: fmtDate(ci.updatedAt), dateLong: fmtDate(ci.updatedAt, true) };
    if (ci.status !== 'completed') return Object.assign(base, { k: 'run', label: 'Vérification en cours' });
    if (ci.conclusion === 'success') return Object.assign(base, { k: 'ok', label: 'Code OK' });
    if (ci.conclusion === 'failure') return Object.assign(base, { k: 'ko', label: 'Erreur de code' });
    return Object.assign(base, { k: 'none', label: 'Vérif. ' + (ci.conclusion || ci.status) });
  }
  function ciPill(app, big) {
    var c = ciInfo(app);
    var inner = '<i class="dot"></i><span class="ci-lbl">' + esc(c.label) + (big ? '<small>' + esc(c.dateLong || (app.repo ? 'aucune vérification' : 'à créer')) + '</small>' : '') + '</span>';
    var cls = 'ci ci-' + c.k + (big ? ' ci-big' : '');
    return (big && c.url)
      ? '<a class="' + cls + '" href="' + esc(c.url) + '" target="_blank" rel="noopener">' + inner + '</a>'
      : '<span class="' + cls + '">' + inner + '</span>';
  }
  function releaseTile(app) {
    var rel = app.status && app.status.release;
    var h = '<div class="mini">';
    if (rel) h += '<a href="' + esc(rel.url || ('https://github.com/' + app.repo + '/releases')) + '" target="_blank" rel="noopener"><b>🏷️ ' + esc(rel.tag) + '</b><small>dernière release</small></a>';
    else if (app.repo) h += '<b>Aucune release</b><small>' + esc(app.repo) + '</small>';
    else h += '<b>Pas de dépôt</b><small>à créer</small>';
    return h + '</div>';
  }

  // ── État de vue (pas de hash : Gestion Pro pilote sa propre navigation) ────
  var vue = { page: 'accueil', id: null, volet: 'technique' };
  function dashGo(page, id, volet) {
    var v = (volet === 'marketing' || volet === 'publication') ? volet : 'technique';
    vue = { page: page || 'accueil', id: id || null, volet: v };
    dashRender();
  }
  window.dashGo = dashGo;

  // Retour contextuel : depuis une app ou le Lexique, la flèche ← ramène
  // d'abord à la vue d'ensemble du module (consommé → true) ; depuis la vue
  // d'ensemble, elle rend la main à l'historique global (false).
  window.dashBack = function () {
    if (vue.page !== 'accueil') { dashGo('accueil'); return true; }
    return false;
  };

  // ── Navigation du module, fusionnée dans le rail global de gauche ──────────
  // Plus de barre latérale interne : les entrées (Vue d'ensemble, apps,
  // Catalogue) s'insèrent sous « Mes apps » dans #gp-rail, et s'effacent en
  // quittant la page (voir l'accroche showPage en bas de fichier).
  function renderRailNav(route) {
    var slot = document.getElementById('rail-dash-slot');
    if (!slot) return;
    // Mode focus : dans Mes apps, le rail se consacre au module — les entrées
    // métier (Commande, Factures…) sont masquées par CSS via cette classe.
    var rail = document.getElementById('gp-rail');
    if (rail) rail.classList.add('dash-mode');
    // Pas d'entrée « Vue d'ensemble » : cliquer « Mes apps » dans le rail y
    // mène toujours (voir l'accroche showPage plus bas), c'est le même geste.
    var h = '';
    DATA.apps.forEach(function (a) {
      h += '<button type="button" class="rail-item rail-sub' + (route.page === 'app' && route.id === a.id ? ' active' : '') +
        '" onclick="dashGo(\'app\',\'' + esc(a.id) + '\')" title="' + esc(a.name) + ' — ' + esc(ciInfo(a).label) + '">' +
        '<span class="ico">' + esc(a.emoji) + '<i class="dot ci-' + ciInfo(a).k + '"></i></span>' +
        '<span class="lbl">' + esc(a.name) + '</span></button>';
    });
    h += '<button type="button" class="rail-item rail-sub' + (route.page === 'catalogue' ? ' active' : '') +
      '" onclick="dashGo(\'catalogue\')"><span class="ico">▤</span><span class="lbl">Lexique</span></button>';
    slot.innerHTML = h;
  }
  function clearRailNav() {
    var slot = document.getElementById('rail-dash-slot');
    if (slot) slot.innerHTML = '';
    var rail = document.getElementById('gp-rail');
    if (rail) rail.classList.remove('dash-mode');
  }

  // ── Barre haute ────────────────────────────────────────────────────────────
  function renderTopbar(route, app) {
    // L'info de synchro vivait dans l'ancienne barre latérale du module :
    // elle rejoint le sous-titre de la barre haute.
    var sync = fmtDate(DATA.generatedAt, true);
    var titre = 'Mes apps', sous = DATA.apps.length + ' applications' + (sync ? ' · données du ' + sync : '');
    if (route.page === 'app' && app) { titre = app.name; sous = (app.platforms || []).join(' · ') || 'Aucune plateforme'; }
    if (route.page === 'catalogue') { titre = 'Lexique'; sous = DATA.services.length + ' services · ' + DATA.categories.length + ' familles'; }
    var kos = DATA.apps.filter(function (a) { return ciInfo(a).k === 'ko'; });
    var h = '<div class="topbar"><div class="tb-title"><h2>' + esc(titre) + '</h2><span class="tb-sub">' + esc(sous) + '</span></div>';
    if (route.page !== 'app') {
      h += '<label class="tb-search"><span>⌕</span><input id="dash-search" type="search" autocomplete="off" placeholder="' +
        (route.page === 'catalogue' ? 'Rechercher un service…' : 'Rechercher une app…') + '"></label>';
    }
    h += '<button type="button" class="clay-btn bell"' + (kos.length ? ' data-dash-go="app/' + esc(kos[0].id) + '" title="' + esc(kos.map(function (a) { return a.name; }).join(', ')) + ' : erreur détectée dans le code"' : ' title="Aucune alerte"') + '>🔔' +
      (kos.length ? '<span class="badge-n">' + kos.length + '</span>' : '') + '</button>';
    return h + '</div>';
  }

  // ── Page : vue d'ensemble ──────────────────────────────────────────────────
  function donutHtml(p, done, todo, note) {
    return '<div class="donut-row"><div class="donut" style="--p:' + p + '"><div><b>' + p + ' %</b></div></div>' +
      '<div class="donut-legend"><span><i class="sw sw-accent"></i>' + done + ' ouverts</span><span><i class="sw sw-sun"></i>' + todo + ' à ouvrir</span>' +
      (note ? '<small>' + note + '</small>' : '') + '</div></div>';
  }

  function renderAccueil() {
    var done = 0, todo = 0, actions = [], nbOk = 0, nbKo = 0, nbNone = 0, ko = null, lastRun = null;
    DATA.apps.forEach(function (a) {
      var s = a.marketingSummary || {};
      done += s.done || 0; todo += s.todo || 0;
      (s.nextActions || []).slice(0, 2).forEach(function (t, j) { actions.push({ app: a, texte: t, key: a.id + ':' + j }); });
      var c = ciInfo(a);
      if (c.k === 'ok') nbOk++; else if (c.k === 'ko') { nbKo++; ko = ko || a; } else nbNone++;
      var ts = a.status && a.status.ci && a.status.ci.updatedAt;
      if (ts && (!lastRun || ts > lastRun.ts)) lastRun = { ts: ts, app: a };
    });
    var total = 0, faites = 0;
    DATA.apps.forEach(function (a) {
      ((a.marketingSummary || {}).nextActions || []).forEach(function (t, i) { total++; if (todos[a.id + ':' + i]) faites++; });
    });
    var p = pct(done, todo);
    var koC = ko ? ciInfo(ko) : null;

    var h = '<div class="hero-row">';
    h += '<div class="tile tint-peach hero rise">' + logoImg('hero-img') + '<div class="hero-txt"><h3>Bonjour, ' + esc(PRENOM) + ' ☀️</h3>' +
      '<p>' + (ko
        ? nbOk + ' app' + (nbOk > 1 ? 's' : '') + ' au vert, mais la dernière vérification du code de <b>' + esc(ko.name) + '</b> a échoué' + (koC.date ? ' le ' + esc(koC.date) : '') + '.'
        : 'Toutes tes apps sont au vert. ' + total + ' action' + (total > 1 ? 's' : '') + ' marketing en attente.') + '</p>' +
      '<button type="button" class="cta" data-dash-go="' + (ko ? 'app/' + esc(ko.id) : 'catalogue') + '">' + (ko ? 'Voir ' + esc(ko.name) + ' →' : 'Ouvrir le catalogue →') + '</button></div></div>';
    h += '<div class="tile rise" style="animation-delay:.05s"><div class="tile-h"><b>Canaux marketing</b><span>toutes apps</span></div>' +
      donutHtml(p, done, todo, '✅ / ⬜ des tableaux de marketing.md') + '</div>';
    h += '</div>';

    h += '<div class="kpi-row">';
    h += '<div class="tile kpi tint-mint rise" style="animation-delay:.08s"><span class="kpi-ico">📱</span><span class="kpi-lab">Applications</span><b>' + DATA.apps.length + '</b><small>' + DATA.apps.filter(function (a) { return a.repo; }).length + ' dépôts suivis</small></div>';
    h += '<div class="tile kpi tint-ok rise" style="animation-delay:.12s"><span class="kpi-ico">✅</span><span class="kpi-lab">Apps au vert</span><b>' + nbOk + '</b><small class="c-ok">' + (lastRun ? 'dernière vérif. ' + esc(fmtDate(lastRun.ts)) : 'aucune vérification') + '</small></div>';
    h += '<div class="tile kpi ' + (nbKo ? 'tint-ko' : 'tint-none') + ' rise" style="animation-delay:.16s"><span class="kpi-ico">' + (nbKo ? '⚠️' : '🧘') + '</span><span class="kpi-lab">Apps en erreur</span><b>' + nbKo + '</b><small class="' + (nbKo ? 'c-ko' : '') + '">' + (ko ? esc(ko.name) + (koC.date ? ' · ' + esc(koC.date) : '') : 'tout est au vert') + '</small></div>';
    h += '<div class="tile kpi tint-sky rise" style="animation-delay:.2s"><span class="kpi-ico">🗒️</span><span class="kpi-lab">Actions à faire</span><b>' + (total - faites) + '</b><small>' + faites + ' cochée' + (faites > 1 ? 's' : '') + '</small></div>';
    h += '</div>';

    h += '<div class="two-col">';
    h += '<div class="tile rise" style="animation-delay:.22s"><div class="tile-h"><b>Mes applications</b><span>état de la vérification automatique du code (CI)</span></div><div class="rows" id="app-rows">';
    DATA.apps.forEach(function (a, i) {
      var c = ciInfo(a), meta = [];
      meta.push((a.platforms || []).join(' · ') || 'Aucune plateforme');
      if (a.services.length) meta.push(a.services.length + ' services');
      if (c.date) meta.push('vérif. ' + c.date);
      var ages = [ficheAge(a.fiches && a.fiches.infra), ficheAge(a.fiches && a.fiches.marketing)]
        .filter(function (x) { return x !== null; });
      if (ages.length && Math.min.apply(null, ages) > FICHE_STALE_JOURS) meta.push('🔶 fiches à rafraîchir');
      h += '<a class="row" data-dash-go="app/' + esc(a.id) + '" data-search="' + esc(norm(a.name + ' ' + a.tagline)) + '" style="animation-delay:' + (0.24 + i * 0.04).toFixed(2) + 's">' +
        '<span class="row-ico tint-' + appTint(a) + '">' + esc(a.emoji) + '</span>' +
        '<span class="row-txt"><b>' + esc(a.name) + '</b><small>' + esc(meta.join(' · ')) + '</small></span>' + ciPill(a) + '</a>';
    });
    h += '</div></div>';
    h += '<div class="tile rise" style="animation-delay:.26s"><div class="tile-h"><b>Prochaines actions</b><span>' + (total - faites) + ' restantes</span></div><div class="todos">';
    if (actions.length) {
      actions.slice(0, 8).forEach(function (a) {
        h += todoHtml(a.key, esc(a.texte), '<a data-dash-go="app/' + esc(a.app.id) + '/marketing">' + esc(a.app.name) + '</a>');
      });
    } else h += '<span class="empty-note">Aucune section « Prochaines actions » dans les fiches marketing.</span>';
    h += '</div></div></div>';
    return h;
  }

  // ── Page : application ─────────────────────────────────────────────────────
  function tocHtml(toc) {
    var items = (toc || []).filter(function (t) { return t.level >= 2 && t.level <= 3; });
    if (items.length < 3) return '';
    var h = '<div class="toc">';
    items.forEach(function (t) { h += '<a class="lvl-' + t.level + '" href="#' + esc(t.id) + '">' + esc(t.text) + '</a>'; });
    return h + '</div>';
  }
  function fichePanel(titre, sous, toc, mdHtml) {
    return '<div class="tile fiche tint-sun rise" style="animation-delay:.14s">' +
      '<button class="fiche-toggle" type="button"><span class="fiche-t"><b>' + titre + '</b><small>' + sous + '</small></span><span class="chev">Déplier</span></button>' +
      tocHtml(toc) + '<div class="md">' + mdHtml + '</div></div>';
  }
  function factsHtml(facts) {
    var h = '<div class="facts">';
    facts.forEach(function (f) { h += '<div class="fact"><span>' + esc(f.label) + '</span><span>' + lienSiUrl(f.value) + '</span></div>'; });
    return h + '</div>';
  }

  // Âge d'une fiche en jours (null si la date est inconnue).
  function ficheAge(iso) {
    if (!iso) return null;
    var d = new Date(iso + 'T12:00:00');
    if (isNaN(d.getTime())) return null;
    return Math.floor((Date.now() - d.getTime()) / 86400000);
  }
  var FICHE_STALE_JOURS = 45;

  function renderAppHead(app, volet) {
    var c = ciInfo(app);
    var h = '<div class="tile app-head tint-' + appTint(app) + ' rise">' +
      '<span class="app-big">' + esc(app.emoji) + '</span>' +
      '<div class="app-txt"><h3>' + esc(app.name) + '</h3><p>' + esc(app.tagline || '') + '</p><div class="chips">' +
      (app.platforms || []).map(function (p) { return '<span class="chip">' + esc(p) + '</span>'; }).join('') +
      (app.repo ? '<a class="chip" href="https://github.com/' + esc(app.repo) + '" target="_blank" rel="noopener">📦 ' + esc(app.repo) + '</a>' : '<span class="chip">Pas de dépôt</span>') +
      '<span class="chip">' + app.services.length + ' services</span></div></div>' +
      '<div class="app-side">' + ciPill(app, true) + releaseTile(app) + '</div></div>';

    var volets = [['technique', 'Technique'], ['marketing', 'Marketing']];
    if (app.publicationHtml) volets.push(['publication', 'Publication']);
    var idx = 0;
    volets.forEach(function (v, i) { if (v[0] === volet) idx = i; });
    h += '<div class="seg rise" style="--n:' + volets.length + ';animation-delay:.05s"><span class="seg-thumb" style="--i:' + idx + '"></span>';
    volets.forEach(function (v) {
      h += '<button type="button" class="' + (v[0] === volet ? 'active' : '') + '" data-dash-go="app/' + esc(app.id) + '/' + v[0] + '">' + v[1] + '</button>';
    });
    h += '</div>';

    // Fraîcheur de la fiche affichée : sa date d'en-tête + alerte passé 45 j
    // (rappel : la régénération se fait en relançant le prompt dans le dépôt).
    var ficheKey = volet === 'technique' ? 'infra' : volet;
    var iso = app.fiches && app.fiches[ficheKey];
    var age = ficheAge(iso);
    if (age !== null) {
      var stale = age > FICHE_STALE_JOURS;
      h += '<div class="fiche-date' + (stale ? ' stale' : '') + '">Fiche du ' + esc(fmtDate(iso)) +
        (stale ? ' · 🔶 à rafraîchir (relancer le prompt dans le dépôt de l’app)' : '') + '</div>';
    }
    return h;
  }

  function renderServices(app) {
    var services = app.services.map(serviceById).filter(Boolean);
    var h = '<div class="tile rise" style="animation-delay:.08s"><div class="tile-h"><b>Services</b><span>' + services.length + ' rattachés · cliquez pour la fiche</span></div>';
    if (!services.length) return h + '<span class="empty-note">Aucun service déclaré dans app.json.</span></div>';
    DATA.categories.forEach(function (cat) {
      var list = services.filter(function (s) { return s.categorie === cat; });
      if (!list.length) return;
      h += '<div class="fam"><div class="fam-h"><i class="sw sw-' + famTint(cat) + '"></i>' + esc(cat) + '</div><div class="chips">';
      list.forEach(function (s) {
        h += '<button type="button" class="chip tint-' + famTint(cat) + '" data-svc="' + esc(s.id) + '">' + esc(s.emoji) + ' ' + esc(s.nom.replace(/\s*\(.*\)$/, '')) + '</button>';
      });
      h += '</div></div>';
    });
    return h + '</div>';
  }

  function renderApp(app, volet) {
    var h = '';
    if (volet === 'technique') {
      var ess = app.infraEssentiel || { facts: [], resume: null };
      h += '<div class="two-col">';
      h += '<div class="tile rise" style="animation-delay:.04s"><div class="tile-h"><b>L’essentiel</b><span>infra.md · vue d’ensemble</span></div>';
      if (ess.facts.length) h += factsHtml(ess.facts);
      else if (ess.resume) h += '<p class="resume">' + esc(ess.resume) + '</p>';
      else h += '<span class="empty-note">Pas de section « Vue d’ensemble » dans l’infra.md.</span>';
      h += '</div>';
      h += renderServices(app);
      h += '</div>';
      h += fichePanel('Fiche technique complète', 'infra.md · ' + app.services.length + ' services', app.infraToc, app.infraHtml);
    } else if (volet === 'publication') {
      var essP = app.publicationEssentiel || { facts: [], resume: null };
      var plats = app.publicationPlateformes || [];
      var communs = (essP.facts || []).filter(function (f) {
        return !plats.some(function (p) { return norm(p.titre).indexOf(norm(f.label)) === 0; });
      });
      if (communs.length) {
        h += '<div class="tile rise"><div class="tile-h"><b>Commun aux boutiques</b><span>publication.md</span></div>' + factsHtml(communs) + '</div>';
      }
      if (plats.length) {
        h += '<div class="pub-grid">';
        plats.forEach(function (p, i) {
          var etat = null, autres = [];
          p.faits.forEach(function (f) { if (norm(f.label) === 'etat') etat = f.value; else autres.push(f); });
          var ios = /ios|apple|app store/i.test(p.titre), and = /android|play/i.test(p.titre);
          h += '<div class="tile rise" style="animation-delay:' + (0.05 + i * 0.05).toFixed(2) + 's">' +
            '<div class="store-h"><span class="row-ico tint-' + (ios ? 'sky' : and ? 'mint' : 'lilac') + '">' + (ios ? '🍎' : and ? '🤖' : '🌐') + '</span><div><b>' + esc(p.titre) + '</b>' +
            (etat ? '<small>' + esc(etat) + '</small>' : '') + '</div></div>';
          if (autres.length) h += factsHtml(autres);
          p.notes.forEach(function (n) {
            h += '<div class="note">' + (n.titre ? '<b>' + esc(n.titre) + '</b>' : '') + '<p>' + esc(n.texte) + '</p></div>';
          });
          h += '</div>';
        });
        h += '</div>';
      } else if (!communs.length) {
        h += '<div class="tile"><span class="empty-note">Pas de section par plateforme dans publication.md.</span></div>';
      }
      h += fichePanel('Fiche de publication complète', 'publication.md', app.publicationToc, app.publicationHtml);
    } else {
      var s2 = app.marketingSummary || {};
      var p = pct(s2.done || 0, s2.todo || 0);
      h += '<div class="three-col">';
      h += '<div class="tile rise"><div class="tile-h"><b>Canaux</b><span>marketing.md</span></div>' + donutHtml(p, s2.done || 0, s2.todo || 0, null) + '</div>';
      h += '<div class="tile tint-lilac rise" style="animation-delay:.05s"><div class="cap-label">Modèle de rémunération actuel</div>' +
        '<div class="cap-model">' + (s2.model ? esc(s2.model) : '<span class="empty-note">Non renseigné</span>') + '</div>';
      if (s2.jalons && s2.jalons.rows.length) {
        h += '<div class="cap-label" style="margin-top:14px">Calendrier</div><div class="jalons">';
        s2.jalons.rows.forEach(function (r) {
          h += '<div class="jalon">' + (r[0] ? '<b>' + esc(r[0]) + '</b>' : '') + '<span>' + esc(r[1] || '') + '</span></div>';
        });
        h += '</div>';
      }
      h += '</div>';
      h += '<div class="tile rise" style="animation-delay:.1s"><div class="tile-h"><b>Prochaines actions</b><span>' + ((s2.nextActions || []).length) + '</span></div><div class="todos">';
      if (s2.nextActions && s2.nextActions.length) {
        s2.nextActions.forEach(function (a, i) { h += todoHtml(app.id + ':' + i, esc(a), null); });
      } else h += '<span class="empty-note">Aucune section « Prochaines actions » trouvée.</span>';
      h += '</div></div></div>';
      if (s2.kpis && s2.kpis.rows.length) {
        h += '<div class="kpi-row">';
        s2.kpis.rows.forEach(function (r, i) {
          h += '<div class="tile kpi tint-' + TINTS[i % TINTS.length] + ' rise" style="animation-delay:' + (0.12 + i * 0.04).toFixed(2) + 's"><span class="kpi-lab">' + esc(r[0] || '') + '</span><b class="kpi-txt">' + esc(r[1] || '—') + '</b>' +
            (r[2] ? '<small>objectif : ' + esc(r[2]) + '</small>' : '') + '</div>';
        });
        h += '</div>';
      }
      h += fichePanel('Plan marketing complet', 'marketing.md', app.marketingToc, app.marketingHtml);
    }
    return h;
  }

  // ── Page : catalogue ───────────────────────────────────────────────────────
  function renderCatalogue() {
    var h = '<div class="cat-nav rise">';
    DATA.categories.forEach(function (cat) {
      if (DATA.services.some(function (s) { return s.categorie === cat; })) {
        h += '<a class="chip tint-' + famTint(cat) + '" href="#cat-' + slug(cat) + '">' + esc(cat) + '</a>';
      }
    });
    h += '</div>';
    h += '<div class="legend-row rise">' + badgeHtml('requis') + '<span>indispensable dans sa famille</span>' + badgeHtml('optionnel') +
      '<span>selon les besoins</span>' + badgeHtml('gratuit') + '<span>offre gratuite suffisante pour démarrer</span></div>';
    DATA.categories.forEach(function (cat, ci) {
      var list = DATA.services.filter(function (s) { return s.categorie === cat; });
      if (!list.length) return;
      h += '<div class="cat-section" id="cat-' + slug(cat) + '"><h2><i class="sw sw-' + famTint(cat) + '"></i>' + esc(cat) + '</h2><div class="svc-grid">';
      list.forEach(function (s, i) {
        var users = appsUsingService(s.id);
        h += '<button type="button" class="tile svc-card rise" style="animation-delay:' + Math.min(0.4, (ci * 0.03 + i * 0.03)).toFixed(2) + 's" data-svc="' + esc(s.id) + '" data-search="' +
          esc(norm(s.nom + ' ' + s.resume + ' ' + s.categorie + ' ' + s.role)) + '">' +
          '<span class="row-ico tint-' + famTint(cat) + '">' + esc(s.emoji) + '</span>' +
          '<span class="svc-txt"><b>' + esc(s.nom) + '</b><small>' + esc(s.resume) + '</small>' +
          '<span class="svc-meta">' + badgeHtml(s.badge) + (users.length ? '<em>' + users.map(function (a) { return esc(a.emoji); }).join(' ') + '</em>' : '') + '</span></span></button>';
      });
      h += '</div></div>';
    });
    return h;
  }
  function filterCards(q, sectionSel, cardSel) {
    q = norm(q || '').trim();
    var sections = document.querySelectorAll(sectionSel);
    for (var i = 0; i < sections.length; i++) {
      var cards = sections[i].querySelectorAll(cardSel), visibles = 0;
      for (var j = 0; j < cards.length; j++) {
        var ok = !q || (cards[j].getAttribute('data-search') || '').indexOf(q) !== -1;
        cards[j].style.display = ok ? '' : 'none';
        if (ok) visibles++;
      }
      if (sectionSel !== '#app-rows') sections[i].style.display = visibles ? '' : 'none';
    }
  }
  function onSearch(q) {
    if (vue.page === 'catalogue') filterCards(q, '.cat-section', '.svc-card');
    else filterCards(q, '#app-rows', '.row');
  }

  // ── Fiche service ──────────────────────────────────────────────────────────
  function serviceSheetHtml(svc, appCtx) {
    var sibs = DATA.services.filter(function (s) { return s.categorie === svc.categorie; });
    var pos = sibs.indexOf(svc);
    var nav = '';
    if (sibs.length > 1) {
      nav = '<div class="sheet-nav"><button type="button" class="clay-btn sm" data-nav="prev" aria-label="Fiche précédente">‹</button>' +
        '<span class="pos">' + (pos + 1) + ' / ' + sibs.length + '</span>' +
        '<button type="button" class="clay-btn sm" data-nav="next" aria-label="Fiche suivante">›</button></div>';
    }
    var h = '<div class="close-row">' + nav + '<span class="grow"></span><button type="button" class="clay-btn sm" data-close aria-label="Fermer">✕</button></div>';
    h += '<div class="sheet-head"><span class="row-ico big tint-' + famTint(svc.categorie) + '">' + esc(svc.emoji) + '</span><div><h2>' + esc(svc.nom) + '</h2><div class="svc-cat">' + esc(svc.categorie) + ' · ' + badgeHtml(svc.badge) + '</div></div></div>';
    h += '<h3>Rôle</h3><p>' + esc(svc.role) + '</p>';
    if (svc.concepts && svc.concepts.length) {
      h += '<h3>Concepts clés</h3><dl>';
      svc.concepts.forEach(function (c) { h += '<dt>' + esc(c.terme) + '</dt><dd>' + esc(c.def) + '</dd>'; });
      h += '</dl>';
    }
    h += '<h3>Coût</h3><p>' + esc(svc.cout) + '</p>';
    h += '<h3>Quand l’utiliser</h3><p>' + esc(svc.quand) + '</p>';
    h += '<h3>Alternatives</h3><p>' + esc(svc.alternatives) + '</p>';
    if (svc.consigner && svc.consigner.length) {
      h += '<h3>À consigner dans la fiche de l’app</h3><ul>';
      svc.consigner.forEach(function (c) { h += '<li>' + esc(c) + '</li>'; });
      h += '</ul>';
    }
    var users = appsUsingService(svc.id);
    if (users.length) {
      h += '<h3>Utilisé par</h3><div class="chips">';
      users.forEach(function (a) { h += '<a class="chip tint-' + appTint(a) + '" data-dash-go="app/' + esc(a.id) + '">' + esc(a.emoji) + ' ' + esc(a.name) + '</a>'; });
      h += '</div>';
    }
    h += '<div class="sheet-actions">';
    if (appCtx) {
      var anchor = appCtx.serviceAnchors[svc.id];
      if (anchor) h += '<a class="cta ghost" href="#' + esc(anchor) + '" data-close>Voir la section infra</a>';
    }
    h += '<a class="cta" data-dash-go="catalogue/' + esc(svc.id) + '">Ouvrir dans le catalogue</a></div>';
    return h;
  }

  var overlayEl = null, sheetSvc = null, sheetCtx = null;
  function closeSheet() {
    if (overlayEl) { overlayEl.remove(); overlayEl = null; }
    sheetSvc = null; sheetCtx = null;
    document.removeEventListener('keydown', onSheetKey);
  }
  function sheetStep(dir) {
    if (!sheetSvc) return;
    var sibs = DATA.services.filter(function (s) { return s.categorie === sheetSvc.categorie; });
    if (sibs.length < 2) return;
    openSheet(sibs[(sibs.indexOf(sheetSvc) + dir + sibs.length) % sibs.length], sheetCtx);
  }
  function onSheetKey(e) {
    if (e.key === 'Escape') closeSheet();
    else if (e.key === 'ArrowLeft') sheetStep(-1);
    else if (e.key === 'ArrowRight') sheetStep(1);
  }
  function openSheet(svc, appCtx) {
    closeSheet();
    sheetSvc = svc; sheetCtx = appCtx;
    overlayEl = document.createElement('div');
    overlayEl.className = 'dash-overlay';
    overlayEl.innerHTML = '<div class="dash-sheet" role="dialog" aria-modal="true">' + serviceSheetHtml(svc, appCtx) + '</div>';
    overlayEl.addEventListener('click', function (e) {
      var nav = e.target.closest && e.target.closest('[data-nav]');
      if (nav) { sheetStep(nav.getAttribute('data-nav') === 'prev' ? -1 : 1); return; }
      var go = e.target.closest && e.target.closest('[data-dash-go]');
      if (go) { e.preventDefault(); var p = go.getAttribute('data-dash-go').split('/'); closeSheet(); dashGo(p[0], p[1], p[2]); return; }
      if (e.target === overlayEl || (e.target.closest && e.target.closest('[data-close]'))) {
        var lien = e.target.closest && e.target.closest('a[href^="#"]');
        closeSheet();
        if (lien) revealAnchor(lien.getAttribute('href'), e);
      }
    });
    document.addEventListener('keydown', onSheetKey);
    document.body.appendChild(overlayEl);
  }

  // Une ancre interne (#i-…, #m-…) déplie la fiche qui la contient.
  function revealAnchor(href, e) {
    if (!href || href.length < 2) return;
    var cible = document.getElementById(href.slice(1));
    if (!cible) return;
    var fiche = cible.closest && cible.closest('.fiche');
    if (fiche) fiche.classList.add('open');
    if (e) e.preventDefault();
    var top = cible.getBoundingClientRect().top + window.pageYOffset - 120;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  // ── Rendu dans la page « Mes apps » de Gestion Pro ────────────────────────
  function dashRender() {
    var route = vue;
    closeSheet();
    var side = $('#dash-titre'), corps = $('#dash-contenu');
    if (!corps) return;
    var app = route.page === 'app' ? DATA.apps.filter(function (a) { return a.id === route.id; })[0] : null;
    if (route.page === 'app' && !app) { vue = { page: 'accueil', id: null, volet: 'technique' }; return dashRender(); }
    if (side) side.innerHTML = '';
    renderRailNav(route);
    var h = renderTopbar(route, app) + '<div class="dash-body">';
    if (route.page === 'catalogue') h += renderCatalogue();
    else if (app) h += renderAppHead(app, route.volet) + renderApp(app, route.volet);
    else h += renderAccueil();
    corps.innerHTML = h + '</div>';
    if (route.page === 'catalogue' && route.service) {
      var svc = serviceById(route.service);
      if (svc) openSheet(svc, null);
    }
    window.scrollTo(0, 0);
  }

  var initialise = false;
  function dashInit() {
    if (initialise) return;
    var zone = $('#page-dash');
    if (!zone || !DATA) return;
    initialise = true;

    zone.addEventListener('click', function (e) {
      var home = e.target.closest && e.target.closest('[data-dash-home]');
      if (home) { if (typeof window.showPage === 'function') window.showPage('home'); return; }
      var go = e.target.closest && e.target.closest('[data-dash-go]');
      if (go) {
        e.preventDefault();
        var p = go.getAttribute('data-dash-go').split('/');
        dashGo(p[0], p[1], p[2]);
        return;
      }
      var tog = e.target.closest && e.target.closest('.fiche-toggle');
      if (tog) { tog.parentElement.classList.toggle('open'); return; }
      var lien = e.target.closest && e.target.closest('a[href^="#"]');
      if (lien) { revealAnchor(lien.getAttribute('href'), e); return; }
      var card = e.target.closest && e.target.closest('[data-svc]');
      if (!card) return;
      var svc = serviceById(card.getAttribute('data-svc'));
      if (!svc) return;
      var appCtx = vue.page === 'app' ? DATA.apps.filter(function (a) { return a.id === vue.id; })[0] : null;
      openSheet(svc, appCtx);
    });
    zone.addEventListener('change', function (e) {
      var t = e.target;
      if (!t || !t.hasAttribute || !t.hasAttribute('data-todo')) return;
      var k = t.getAttribute('data-todo');
      if (t.checked) todos[k] = 1; else delete todos[k];
      var lab = t.closest && t.closest('.todo');
      if (lab) lab.classList.toggle('done', t.checked);
      saveTodos();
    });
    zone.addEventListener('input', function (e) {
      if (e.target && e.target.id === 'dash-search') onSearch(e.target.value);
    });
    dashRender();
  }
  window.dashInit = dashInit;

  // Accroche non intrusive : au premier showPage('dash'), le module s'initialise.
  function accrocher() {
    if (typeof window.showPage !== 'function') return false;
    var original = window.showPage;
    window.showPage = function (id) {
      original.apply(this, arguments);
      if (id === 'dash') {
        // « Mes apps » ouvre toujours la vue d'ensemble (l'entrée dédiée du
        // rail a été retirée : c'est le même geste).
        var deja = initialise;
        dashInit();
        if (deja) dashGo('accueil');
      } else clearRailNav();
    };
    return true;
  }
  if (!accrocher()) {
    document.addEventListener('DOMContentLoaded', function () {
      if (!accrocher()) {
        var z = $('#page-dash');
        if (z && z.classList.contains('active')) dashInit();
      }
    });
  }
})();
