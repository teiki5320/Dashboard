// =============================================================================
// Module « Mes apps » — moteur Dash porté dans Gestion Pro.
// Chargé par index.html après assets/dash-data.js.
// Aucune dépendance, aucun fetch : données dans window.DASH, carte du monde
// embarquée en masque binaire ci-dessous. Fonctionne en file://.
// =============================================================================
'use strict';

(function () {
  var DATA = window.DASH_DATA;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };

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

  // Palette 1A « Cockpit » : menthe (dépôt & CI), vert (backend), violet (API),
  // ambre (distribution), puis déclinaisons.
  var CAT_COLORS = ['#7fe3d4', '#8ef0b4', '#a89bff', '#ffc48a', '#a9f0e5', '#9ad46a',
                    '#c58aff', '#ffb066', '#5ee0d0', '#e08ad4', '#66c8ff', '#ff8fb1'];
  function catColor(cat) {
    var i = DATA.categories.indexOf(cat);
    return CAT_COLORS[(i >= 0 ? i : 0) % CAT_COLORS.length];
  }
  function pct(done, todo) { var t = done + todo; return t ? Math.round((done / t) * 100) : 0; }
  function slug(s) {
    return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  function norm(s) {
    return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  // ── Prochaines actions : cases cochées persistées ──────────────────────────
  var TODO_KEY = 'v90_dash_todos';
  var todos = {};
  try {
    // Persistance via G (localStorage + push Supabase de Gestion Pro) ;
    // repli localStorage si G n'est pas encore chargé.
    var brut = (typeof G !== 'undefined' && G.get) ? G.get(TODO_KEY) : localStorage.getItem(TODO_KEY);
    todos = (typeof brut === 'string' ? JSON.parse(brut || '{}') : brut) || {};
    // G.get() de Gestion Pro renvoie [] par défaut (convention pour ses propres
    // collections) quand la clé n'existe pas encore : sans ce garde-fou, todos
    // resterait un tableau et JSON.stringify() perdrait silencieusement toute
    // case cochée à la sauvegarde (les clés nommées d'un tableau ne sont pas
    // sérialisées).
    if (Array.isArray(todos)) todos = {};
  } catch (e) { todos = {}; }
  function saveTodos() {
    try {
      if (typeof G !== 'undefined' && G.set) G.set(TODO_KEY, todos);
      else localStorage.setItem(TODO_KEY, JSON.stringify(todos));
    } catch (e) {}
  }
  function todoBox(key) {
    return '<input type="checkbox" data-todo="' + esc(key) + '"' + (todos[key] ? ' checked' : '') + '>';
  }

  // ── Animations : bascule + mémoire ─────────────────────────────────────────
  var ANIM_KEY = 'dash-anim';
  function animOn() { return document.documentElement.getAttribute('data-anim') !== 'off'; }
  function applyAnim(on) {
    document.documentElement.setAttribute('data-anim', on ? 'on' : 'off');
    var btn = $('#anim-toggle');
    if (btn) btn.textContent = on ? '⚡ ANIMATIONS' : '⏸ ANIMATIONS';
    if (globe) globe.setActive(on);
  }
  function initAnim() {
    var v = null;
    try { v = localStorage.getItem(ANIM_KEY); } catch (e) {}
    applyAnim(v !== 'off');
  }
  function toggleAnim() {
    var on = !animOn();
    try { localStorage.setItem(ANIM_KEY, on ? 'on' : 'off'); } catch (e) {}
    applyAnim(on);
  }

  // ── Globe de nuit ──────────────────────────────────────────────────────────
  // Masque de continents 288×144 (équirectangulaire), bits empaquetés en base64.
  var LAND_W = 288, LAND_H = 144;
  var LAND_B64 = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG+AAAf/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB///z/////BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//+//////+AAAAAAAAIAAAAAPgAAAAAAAAAAAAAAAAAAAAAP//Af/////4AAAH+AAAAAAAAAHwAAAAAAAAAAAAAAAAAAAwEgP+P//////wAAAD5gAAAAAAAAANAAAAAAAAAAAAAAAAAB4AAYf4D//////wAAAAgAAAAAAAAAAHgAAAAAAAAAAAAAAAAAPuPDjgAAf////wAAAAAAAAAD4AAA///gAAPgAAAAAAAAAAACAAAIAAAAP////wAAAAAAAAAOAAAH//+AAAAAAAAAAAAAAAAP8DHeb8AAD////AAAAAAAAAAYAAD/////PgDAAAAAAAAAAAAPf/Do//AAD////AAAAAAAAAAwAdf//////gH/AAAAAAD8AAAAP/gcf/8AB///9AAAAAAfAAAAA9///////////gAAAAf//4//H/xuDh/ABf//8AAAAAH/4AAAY9////////////7+wB//////+HBvnhfgA//+AAAAAA///xh//+//////////////9AP//////////Af8B//4AAAAAB///5v//9//////////////fj//////////4A/MA/+AB/gAAD/P8P//////////////////BAH/////////3jfwA/4AA/AAAP+f9//////////////////+AAf////////+AAHwAfwAAAAAA/5////////////////////+AB/////////4ADwAAPwAAAAAD/x//////////////////9/wAA//3//////4AD8AABgAAAAAD/x/////////////////8D+AAAP4AP/////wAD+YAAAAAAAAD/4f///////////////+cOAAAAA4AA/////8AD/8AAAAAAAIAHgf//////////////+AAcAAAABAAAP/////gB/+AAAAAAAcATh///////////////4AB8AAAAIAAAH/////4D//AAAAAAAMAWB///////////////gAD8AAAAAAAAD//////H//wAAAAABnAQf///////////////gAB4AAAAAAAAB//////H//4AAAAABvD//////////////////ABwAAAAAAAAA//////n//4AAAAABPn//////////////////gBAAAAAAAAAA/////////IAAAAAAOf/////////////////8gAAAAAAAAAAAf///////AeAAAAAAB//////////////////8gAAAAAAAAAAAL///////wfAAAAAAH//////////////////8AAAAAAAAAAAAH///////wAAAAAAAD//////+///////////4gAAAAAAAAAAAH////////AAAAAAAB////M/w///////////wAAAAAAAAAAAAH///////YAAAAAAAB/8/+Afx///////////hgAAAAAAAAAAAP//////8AAAAAAAB/4OP8APx//////////+DwAAAAAAAAAAAH//////4AAAAAAAB/wHH8MH4//////////wCAAAAAAAAAAAAH//////gAAAAAAAB/AQzn//8f/////////gCAAAAAAAAAAAAH//////AAAAAAAAB/AQDH//4f///////+TACAAAAAAAAAAAAD//////AAAAAAAAB/AABn//4f///////+DgGAAAAAAAAAAAAD/////+AAAAAAAAAcBwBD//+f////////xweAAAAAAAAAAAAB/////+AAAAAAAAAR/4AAB///////////Bh8AAAAAAAAAAAAA/////8AAAAAAAAAf/wAAB///////////AHwAAAAAAAAAAAAAP////wAAAAAAAAB//4AAD///////////gKAAAAAAAAAAAAAAH////gAAAAAAAAD///DwD///////////gIAAAAAAAAAAAAAAE////gAAAAAAAAD///7/////////////gAAAAAAAAAAAAAAAC//xBgAAAAAAAAD///////7/////////wAAAAAAAAAAAAAAADf/gAwAAAAAAAAP///////5/////////gAAAAAAAAAAAAAAABP/AAwAAAAAAAAf/////5/8X////////AAAAAAAAAAAAAAAAAn/AAQAAAAAAAA//////9/+J////////AAAAAAAAAAAAAAAAAT/AAAAAAAAAAA//////8/+YA//////+AAAAAAAAAAAAAAAAAB/AAAAAAAAAAB//////+f/+Af/////4gAAAAAAAAAAAAAAAAA/AAMAAAAAAAB//////+f//AP/+P//AAAAAAAAAAAAAAAAAAA/AwDAAAAAAAB///////P/+AD/4P/gAAAAAAAAAAAAQAAAAAA/hwAMAAAAAAB///////H/8AD/wH/mAAAAAAAAAAAAAAAAAAAP/wAIAAAAAAB///////n/4AD/gH/gAQAAAAAAAAAAAAAAAAAD/gAAAAAAAAB///////j/gAB/AD/wAwAAAAAAAAAAAAAAAAAAH+AAAAAAAAB///////z/AAB8AA/4AgAAAAAAAAAAAAAAAAAAD+AAAAAAAAD///////74AAA8AA/4AwAAAAAAAAAAAAAAAAAAAOAAAAAAAAB///////9AAAA8AAX4AAAAAAAAAAAAAAAAAAAAAGAIAAAAAAB///////+AAAA8AAT4AAAAAAAAAAAAAAAAAAAAAGA/EAAAAAA///////++AAAcAARwAIAAAAAAAAAAAAAAAAAAABB/+AAAAAAf///////8AAAYAAQgAAAAAAAAAAAAAAAAAAAAAA3//AAAAAAP///////8AAACAAQAAOAAAAAAAAAAAAAAAAAAAAD//gAAAAAH///////8AAACAAIAAGAAAAAAAAAAAAAAAAAAAAD//+AAAAAD/D/////4AAAAAAMAOAAAAAAAAAAAAAAAAAAAAAD///gAAAAAABf////wAAAAABuAeAAAAAAAAAAAAAAAAAAAAAD///gAAAAAAAP////gAAAAAA2A8AAAAAAAAAAAAAAAAAAAAAH///wAAAAAAAP////AAAAAAAeB8AAAAAAAAAAAAAAAAAAAAAP///wAAAAAAAf///+AAAAAAAeH8ggAAAAAAAAAAAAAAAAAAAP///4AAAAAAAf///8AAAAAAAOH8ACAAAAAAAAAAAAAAAAAAAf////AAAAAAAf///4AAAAAAAHD5wCIAAAAAAAAAAAAAAAAAAP////8AAAAAAP///wAAAAAAAHh5wD/AAAAAAAAAAAAAAAAAAf/////AAAAAAH///wAAAAAAADgAQA/wAAAAAAAAAAAAAAAAAf/////wAAAAAD///gAAAAAAAAgAAAP5gAAAAAAAAAAAAAAAAP/////wAAAAAD///gAAAAAAAAfAAAH8AAAAAAAAAAAAAAAAAH/////wAAAAAD///gAAAAAAAABwAAPkAAAAAAAAAAAAAAAAAH/////wAAAAAD///wAAAAAAAAAAEAACAAAAAAAAAAAAAAAAAD/////gAAAAAB///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAB///wAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAB////+AAAAAAD///wEAAAAAAAAAAPhgAAAAAAAAAAAAAAAAAB////+AAAAAAD///4MAAAAAAAAABPhgAAAAAAAAAAAAAAAAAA////+AAAAAAH///wcAAAAAAAAAD/hwAAAAAAAAAAAAAAAAAAP///+AAAAAAH///h8AAAAAAAAAP/54AAAAAAAAAAAAAAAAAAH///8AAAAAAD//+B4AAAAAAAAAP//4AAACAAAAAAAAAAAAAAD///8AAAAAAD//8B4AAAAAAAAAf//8AAAAAAAAAAAAAAAAAAD///8AAAAAAB//8B4AAAAAAAAD///+AAAAAAAAAAAAAAAAAAD///4AAAAAAB//8BwAAAAAAAAP////AAAAAAAAAAAAAAAAAAD///gAAAAAAA//8BwAAAAAAAAf////gAAAAAAAAAAAAAAAAAD//8AAAAAAAA//8BwAAAAAAAAf////wAAAAAAAAAAAAAAAAAH//4AAAAAAAA//wAAAAAAAAAAf////wAAAAAAAAAAAAAAAAAH//4AAAAAAAA//wAAAAAAAAAAf////4AAAAAAAAAAAAAAAAAH//4AAAAAAAAf/wAAAAAAAAAAf////4AAAAAAAAAAAAAAAAAH//wAAAAAAAAf/gAAAAAAAAAAP////4AAAAAAAAAAAAAAAAAH//wAAAAAAAAP/AAAAAAAAAAAP////wAAAAAAAAAAAAAAAAAH//gAAAAAAAAH+AAAAAAAAAAAH/j//wAAAAAAAAAAAAAAAAAH//AAAAAAAAAH8AAAAAAAAAAAP4A//gAAAAAAAAAAAAAAAAAP/+AAAAAAAAAGAAAAAAAAAAAAOAAv/gAAAAAAAAAAAAAAAAAP/wAAAAAAAAAAAAAAAAAAAAAAAAAH/AAAAAAAAAAAAAAAAAAf/wAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAf/wAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAOAAAAAAAAAAAAAAf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAfwAAAAAAAAAAAAAAAAAAAAAAAAAAAOAABgAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAEAADAAAAAAAAAAAAAAAfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeAAAAAAAAAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAD8AAACAPn8f/zwAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAA///gD////////8AAAAAAAAAAAAAAAAAAF4AAAAAAAAAAAAPP///wP//////////AAAAAAAAAAAAAAAAAH8AAAAAAAAD3///////j///////////8AAAAAAAAAAAAEAAA++AAAAAAH//////////n////////////+AAAAAAAAAAAeAwAD+AAAAAA////////////////////////8AAAAAAAJD/AH////8AAAAAB////////////////////////gAAAAAH//////////gAAAAAP///////////////////////+AAAAAAf/////////AAAAAAf////////////////////////+AAAAA///////////AAAHAP//////////////////////////AAAAMA/////////8AAAfgM/////////////////////////4AAAAAAP/////////wBB+AA/////////////////////////wAAAAAH///////////8AfP//////////////////////////8AAAAAH//////////////////////////////////////////wAd8AAf//////////////////////////////////////////8////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////';
  var landBits = null;
  function landAt(lon, lat) {
    if (!landBits) {
      var bin = atob(LAND_B64);
      landBits = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) landBits[i] = bin.charCodeAt(i);
    }
    var x = Math.round((lon + 180) / 360 * LAND_W);
    var y = Math.round((90 - lat) / 180 * LAND_H);
    if (x < 0) x = 0; if (x >= LAND_W) x = LAND_W - 1;
    if (y < 0 || y >= LAND_H) return false;
    var idx = y * LAND_W + x;
    return (landBits[idx >> 3] >> (7 - (idx & 7))) & 1;
  }

  var DEG = Math.PI / 180;
  var globe = null;

  function makeGlobe(canvas) {
    var ctx = canvas.getContext('2d');
    var size = 0, R = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var lambda = 20, tilt = 14, active = true, raf = 0, last = 0;

    // Points de terre, précalculés une seule fois (vecteurs unitaires).
    var dots = [];
    var seed = 7;
    function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    for (var lat = -82; lat <= 82; lat += 2.1) {
      var step = 2.1 / Math.max(0.2, Math.cos(lat * DEG));
      for (var lon = -180; lon < 180; lon += step) {
        var la = lat + (rnd() - 0.5) * 0.7, lo = lon + (rnd() - 0.5) * 0.7;
        if (!landAt(lo, la)) continue;
        dots.push({ clat: Math.cos(la * DEG), slat: Math.sin(la * DEG), lon: lo,
                    b: 0.32 + rnd() * 0.68, tw: rnd() * 6.28 });
      }
    }

    function resize() {
      var w = canvas.clientWidth || 320;
      size = w; R = w / 2 - 2;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(w * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Projection orthographique : renvoie [x, y, z] (z > 0 = face visible).
    var st = Math.sin(tilt * DEG), ct = Math.cos(tilt * DEG);
    function project(clat, slat, lon) {
      var a = (lon + lambda) * DEG;
      var ca = Math.cos(a), sa = Math.sin(a);
      var x = clat * sa;
      var y = ct * slat - st * clat * ca;
      var z = st * slat + ct * clat * ca;
      return [size / 2 + R * x, size / 2 - R * y, z];
    }

    function drawArc(pts) {
      ctx.beginPath();
      var started = false;
      for (var i = 0; i < pts.length; i++) {
        var p = project(pts[i][0], pts[i][1], pts[i][2]);
        if (p[2] <= 0) { started = false; continue; }
        if (!started) { ctx.moveTo(p[0], p[1]); started = true; } else ctx.lineTo(p[0], p[1]);
      }
      ctx.stroke();
    }

    // Graticule précalculé (méridiens + parallèles tous les 15°).
    var grat = [];
    for (var m = -180; m < 180; m += 15) {
      var line = [];
      for (var t = -88; t <= 88; t += 4) line.push([Math.cos(t * DEG), Math.sin(t * DEG), m]);
      grat.push(line);
    }
    for (var p2 = -75; p2 <= 75; p2 += 15) {
      var line2 = [];
      for (var t2 = -180; t2 <= 180; t2 += 4) line2.push([Math.cos(p2 * DEG), Math.sin(p2 * DEG), t2]);
      grat.push(line2);
    }

    function frame(now) {
      var dt = last ? Math.min(60, now - last) : 16;
      last = now;
      if (active) lambda = (lambda + dt * 0.0055) % 360;
      draw(now);
      raf = requestAnimationFrame(frame);
    }

    function draw(now) {
      if (!size) resize();
      var cx = size / 2, cy = size / 2;
      ctx.clearRect(0, 0, size, size);

      var og = ctx.createRadialGradient(size * 0.36, size * 0.3, R * 0.1, cx, cy, R);
      og.addColorStop(0, '#0d2947');
      og.addColorStop(0.55, '#071b33');
      og.addColorStop(1, '#03101f');
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.fillStyle = og; ctx.fill();

      ctx.strokeStyle = 'rgba(62,168,255,0.16)';
      ctx.lineWidth = 0.6;
      for (var i = 0; i < grat.length; i++) drawArc(grat[i]);

      var tw = now / 700;
      for (var j = 0; j < dots.length; j++) {
        var d = dots[j];
        var pt = project(d.clat, d.slat, d.lon);
        if (pt[2] <= 0.02) continue;
        var a = d.b * (0.62 + 0.38 * Math.sin(tw + d.tw)) * (0.35 + 0.65 * pt[2]);
        ctx.fillStyle = 'rgba(150,231,255,' + a.toFixed(2) + ')';
        ctx.fillRect(pt[0] - 0.7, pt[1] - 0.7, 1.6, 1.6);
      }

      var sg = ctx.createRadialGradient(size * 0.33, size * 0.28, R * 0.12, cx, cy, R * 1.08);
      sg.addColorStop(0, 'rgba(120,200,255,0.10)');
      sg.addColorStop(0.45, 'rgba(0,0,0,0)');
      sg.addColorStop(1, 'rgba(1,6,14,0.85)');
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.fillStyle = sg; ctx.fill();

      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832);
      ctx.strokeStyle = 'rgba(138,212,255,0.55)'; ctx.lineWidth = 1;
      ctx.shadowColor = 'rgba(90,190,255,0.9)'; ctx.shadowBlur = 14;
      ctx.stroke(); ctx.shadowBlur = 0;
    }

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', resize);

    return {
      setActive: function (v) { active = v; },
      destroy: function () { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); }
    };
  }

  function mountGlobe() {
    if (globe) { globe.destroy(); globe = null; }
    var cv = $('#globe');
    if (cv) { globe = makeGlobe(cv); globe.setActive(animOn()); }
  }

  // ── Routage ────────────────────────────────────────────────────────────────
  // ── État de vue (pas de hash : Gestion Pro pilote sa propre navigation) ────
  var vue = { page: 'accueil', id: null, volet: 'technique' };
  function currentRoute() { return vue; }
  function dashGo(page, id, volet) {
    vue = { page: page || 'accueil', id: id || null, volet: volet === 'marketing' ? 'marketing' : 'technique' };
    dashRender();
  }
  window.dashGo = dashGo;

  // ── Ossature ───────────────────────────────────────────────────────────────
  // ── Page : vue d'ensemble ──────────────────────────────────────────────────
  function renderAccueil() {
    var tousServices = {};
    var done = 0, todo = 0, actions = [];
    DATA.apps.forEach(function (a) {
      a.services.forEach(function (s) { tousServices[s] = 1; });
      var s = a.marketingSummary || {};
      done += s.done || 0; todo += s.todo || 0;
      (s.nextActions || []).slice(0, 2).forEach(function (t, j) {
        actions.push({ app: a, texte: t, key: a.id + ':' + j });
      });
    });
    var nbServices = Object.keys(tousServices).length;
    var p = pct(done, todo);

    var h = '<div class="stage">';

    h += '<div style="display:flex;flex-direction:column;gap:16px">' +
      '<div class="panel"><div class="panel-h">Parc applicatif</div><div class="kpis">' +
      '<div class="kpi"><b>' + DATA.apps.length + '</b><span>APPLICATIONS</span></div>' +
      '<div class="kpi"><b>' + nbServices + '</b><span>SERVICES UTILISÉS</span></div>' +
      '<div class="kpi"><b>' + DATA.services.length + '</b><span>AU CATALOGUE</span></div>' +
      '</div></div>';
    h += '<div class="panel"><div class="panel-h">Canaux marketing cumulés</div><div class="panel-body" style="display:flex;align-items:center;gap:18px">' +
      '<div class="donut" style="background:conic-gradient(var(--accent) 0 ' + p + '%, rgba(var(--accent-rgb),.13) ' + p + '% 100%)">' +
      '<div><b>' + p + '%</b><span>' + done + ' / ' + (done + todo) + '</span></div></div>' +
      '<div class="hint">' + done + ' canaux ouverts, ' + todo + ' à ouvrir, toutes applications confondues.</div>' +
      '</div></div>';
    h += '</div>';

    h += '<div><div class="globe-wrap"><div class="globe-halo"></div><canvas id="globe"></canvas>' +
      '<div class="globe-ring"></div><div class="globe-ring slow"></div></div>' +
      '<div class="globe-legend">' + DATA.apps.length + ' applications · ' + nbServices + ' services · synchronisation quotidienne</div></div>';

    h += '<div class="panel"><div class="panel-h">Prochaines actions</div><div class="panel-body actions">';
    if (actions.length) {
      actions.slice(0, 8).forEach(function (a) {
        h += '<label>' + todoBox(a.key) + '<span>' +
          '<a data-dash-go="app/' + esc(a.app.id) + '/marketing">' + esc(a.app.name) + '</a> — ' + esc(a.texte) + '</span></label>';
      });
    } else {
      h += '<span class="empty-note">Aucune section « Prochaines actions » dans les fiches marketing.</span>';
    }
    h += '</div></div></div>';

    h += '<div class="grid grid-3" style="margin-top:16px">';
    DATA.apps.forEach(function (a, i) {
      var s = a.marketingSummary || {};
      var pp = pct(s.done || 0, s.todo || 0);
      h += '<a class="app-card" data-dash-go="app/' + esc(a.id) + '" style="animation-delay:' + (i * 0.05).toFixed(2) + 's">' +
        '<h3>' + esc(a.emoji) + ' ' + esc(a.name) + '</h3>' +
        '<p>' + esc(a.tagline || '') + '</p>' +
        (s.model ? '<div class="card-model" title="' + esc(s.model) + '">💰 ' + esc(s.model) + '</div>' : '') +
        '<div class="progress"><i style="width:' + pp + '%"></i></div>' +
        '<div class="meta" style="margin-top:10px"><span>' + a.services.length + ' services</span>' +
        '<span>' + pp + ' % canaux</span>' +
        '<span>' + esc((a.platforms || []).join(' · ')) + '</span></div></a>';
    });
    h += '</div>';
    return h;
  }

  // ── Page : application ─────────────────────────────────────────────────────
  function splitName(name) {
    if (name.length <= 14) return [name];
    var words = name.split(' '), l1 = '', l2 = '';
    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      if (l1.length + w.length <= 14 && !l2) l1 = l1 ? l1 + ' ' + w : w;
      else l2 = l2 ? l2 + ' ' + w : w;
    }
    if (l2.length > 18) l2 = l2.slice(0, 17) + '…';
    return l2 ? [l1, l2] : [l1];
  }

  function renderDiagram(app) {
    var services = app.services.map(serviceById).filter(Boolean);
    if (!services.length) return '<p class="empty-note" style="padding:16px 18px">Aucun service déclaré dans app.json.</p>';
    var groups = [];
    DATA.categories.forEach(function (cat) {
      var list = services.filter(function (s) { return s.categorie === cat; });
      if (list.length) groups.push({ cat: cat, list: list });
    });
    var total = services.length;
    var W = 1040, H = 660, cx = W / 2, cy = H / 2, rx = 370, ry = 225;
    var gap = 0.10, avail = 2 * Math.PI - gap * groups.length, angle = -Math.PI / 2;
    var lines = '', nodes = '';
    var nodeIdx = 0;
    groups.forEach(function (g) {
      var span = (g.list.length / total) * avail;
      var color = catColor(g.cat);
      g.list.forEach(function (s, i) {
        var a = angle + ((i + 0.5) / g.list.length) * span;
        var x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry;
        lines += '<line class="link-line" x1="' + cx + '" y1="' + cy + '" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '"/>';
        var nameSvg = '';
        splitName(s.nom.replace(/\s*\(.*\)$/, '')).forEach(function (ln, k) {
          nameSvg += '<text class="svc-name" x="' + x.toFixed(1) + '" y="' + (y + 46 + k * 14).toFixed(1) +
            '" text-anchor="middle">' + esc(ln) + '</text>';
        });
        nodes += '<g class="svc" data-svc="' + esc(s.id) + '" role="button" tabindex="0" aria-label="' + esc(s.nom) + '">' +
          '<circle class="ping" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="27" stroke="' + color +
          '" style="animation-delay:' + (nodeIdx * 0.4).toFixed(1) + 's"/>' +
          '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="27" stroke="' + color + '"/>' +
          '<text x="' + x.toFixed(1) + '" y="' + (y + 8).toFixed(1) + '" text-anchor="middle" font-size="24">' + esc(s.emoji) + '</text>' +
          nameSvg + '</g>';
        nodeIdx++;
      });
      angle += span + gap;
    });
    // Anneaux de radar concentriques derrière les liens
    var rings = '';
    [0.5, 0.78, 1.04].forEach(function (k) {
      rings += '<ellipse class="rings" cx="' + cx + '" cy="' + cy + '" rx="' + Math.round(rx * k) + '" ry="' + Math.round(ry * k) + '"/>';
    });
    var center = '<g class="center-node">' +
      '<rect x="' + (cx - 95) + '" y="' + (cy - 34) + '" width="190" height="68"/>' +
      '<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" font-size="26">' + esc(app.emoji) + '</text>' +
      '<text x="' + cx + '" y="' + (cy + 22) + '" text-anchor="middle" font-size="16" font-weight="700">' + esc(app.name) + '</text></g>';
    var legend = '<div class="diagram-legend">';
    groups.forEach(function (g) { legend += '<span><i style="background:' + catColor(g.cat) + '"></i>' + esc(g.cat) + '</span>'; });
    legend += '</div>';
    return '<div class="diagram-wrap"><div class="radar-sweep"><div></div></div>' +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma d’architecture de ' + esc(app.name) + '">' +
      rings + lines + center + nodes + '</svg></div>' + legend;
  }

  function tocHtml(toc) {
    var items = toc.filter(function (t) { return t.level >= 2 && t.level <= 3; });
    if (items.length < 3) return '';
    var h = '<div class="toc">';
    items.forEach(function (t) { h += '<a class="lvl-' + t.level + '" href="#' + esc(t.id) + '">' + esc(t.text) + '</a>'; });
    return h + '</div>';
  }

  function fichePanel(titre, toc, mdHtml) {
    return '<div class="panel fiche" style="margin-top:16px">' +
      '<button class="panel-h fiche-toggle" type="button">' + titre +
      '<span class="chev">▾ déplier</span></button>' +
      tocHtml(toc) + '<div class="md">' + mdHtml + '</div></div>';
  }

  function renderApp(app, volet) {
    var h = '';
    if (volet === 'technique') {
      var services = app.services.map(serviceById).filter(Boolean);
      var ess = app.infraEssentiel || { facts: [], resume: null };

      h += '<div class="stage-tech">';

      // L'essentiel : les faits clés extraits de la fiche infra
      h += '<div class="panel st-pile"><div class="panel-h">L’essentiel</div><div class="panel-body">';
      if (ess.facts.length) {
        h += '<dl class="facts">';
        ess.facts.forEach(function (f) {
          h += '<dt>' + esc(f.label) + '</dt><dd>' + esc(f.value) + '</dd>';
        });
        h += '</dl>';
      } else if (ess.resume) {
        h += '<p class="resume">' + esc(ess.resume) + '</p>';
      } else {
        h += '<span class="empty-note">Pas de section « Vue d’ensemble » dans l’infra.md.</span>';
      }
      h += '<div class="tags" style="margin-top:14px">' +
        (app.repo ? '<a class="tag" href="https://github.com/' + esc(app.repo) + '">📦 ' + esc(app.repo) + '</a>' : '') +
        (app.platforms || []).map(function (p) { return '<span class="tag">' + esc(p) + '</span>'; }).join('') +
        '</div></div></div>';

      h += '<div class="panel st-archi" style="animation-delay:.05s"><div class="panel-h">Architecture · cliquez sur un service</div>' + renderDiagram(app) + '</div>';

      h += '<div class="panel st-liste" style="animation-delay:.1s"><div class="panel-h">Services rattachés</div><div class="panel-body liste" style="padding:8px 10px">';
      services.forEach(function (s, i) {
        h += '<button data-svc="' + esc(s.id) + '"><span class="num">' + (i < 9 ? '0' : '') + (i + 1) + '</span>' +
          '<span class="nom">' + esc(s.nom) + '</span><span class="fam">' + esc(s.categorie) + '</span></button>';
      });
      h += '</div></div></div>';

      h += fichePanel('Fiche technique — infra.md', app.infraToc, app.infraHtml);
    } else {
      var s2 = app.marketingSummary || {};
      var p = pct(s2.done || 0, s2.todo || 0);
      h += '<div class="stage">';
      h += '<div class="panel"><div class="panel-h">Canaux</div><div class="panel-body" style="display:flex;align-items:center;gap:18px">' +
        '<div class="donut" style="background:conic-gradient(var(--accent) 0 ' + p + '%, rgba(var(--accent-rgb),.13) ' + p + '% 100%)">' +
        '<div><b>' + p + '%</b><span>' + (s2.done || 0) + ' / ' + ((s2.done || 0) + (s2.todo || 0)) + '</span></div></div>' +
        '<div class="hint">' + (s2.done || 0) + ' actifs · ' + (s2.todo || 0) + ' à ouvrir<br>(✅ / ⬜ des tableaux de marketing.md)</div></div></div>';
      // Cap : modèle actuel + jalons du calendrier — plus de panneau vide
      h += '<div class="panel" style="animation-delay:.05s"><div class="panel-h">Cap</div><div class="panel-body">' +
        '<div class="cap-label">Modèle de rémunération actuel</div>' +
        '<div class="cap-model">' + (s2.model ? esc(s2.model) : '<span class="empty-note">Non renseigné</span>') + '</div>';
      if (s2.jalons && s2.jalons.rows.length) {
        h += '<div class="cap-label" style="margin-top:14px">Calendrier</div><div class="jalons">';
        s2.jalons.rows.forEach(function (r) {
          h += '<div class="jalon">' + (r[0] ? '<b>' + esc(r[0]) + '</b>' : '') +
            '<span>' + esc(r[1] || '') + '</span></div>';
        });
        h += '</div>';
      }
      h += '</div></div>';

      h += '<div class="panel" style="animation-delay:.1s"><div class="panel-h">Prochaines actions</div><div class="panel-body actions">';
      if (s2.nextActions && s2.nextActions.length) {
        s2.nextActions.forEach(function (a, i) {
          h += '<label>' + todoBox(app.id + ':' + i) + '<span>' + esc(a) + '</span></label>';
        });
      } else {
        h += '<span class="empty-note">Aucune section « Prochaines actions » trouvée</span>';
      }
      h += '</div></div></div>';

      // KPIs remontés depuis le tableau de marketing.md
      if (s2.kpis && s2.kpis.rows.length) {
        h += '<div class="kpi-tiles">';
        s2.kpis.rows.forEach(function (r) {
          h += '<div class="kpi-tile"><span class="lab">' + esc(r[0] || '') + '</span>' +
            '<b>' + esc(r[1] || '—') + '</b>' +
            (r[2] ? '<span class="obj">objectif : ' + esc(r[2]) + '</span>' : '') + '</div>';
        });
        h += '</div>';
      }

      h += fichePanel('Plan marketing — marketing.md', app.marketingToc, app.marketingHtml);
    }
    return h;
  }

  // ── Page : catalogue ───────────────────────────────────────────────────────
  function renderCatalogue() {
    var chips = '';
    DATA.categories.forEach(function (cat) {
      if (DATA.services.some(function (s) { return s.categorie === cat; })) {
        chips += '<a href="#cat-' + slug(cat) + '">' + esc(cat) + '</a>';
      }
    });
    var h = '<div class="cat-tools">' +
      '<input id="cat-search" type="search" placeholder="Rechercher un service (nom, rôle, famille)…" autocomplete="off">' +
      '<div class="cat-nav">' + chips + '</div></div>';
    h += '<div class="legend-row"><span>Badges :</span>' + badgeHtml('requis') +
      '<span>indispensable dans sa famille</span>' + badgeHtml('optionnel') +
      '<span>selon les besoins</span>' + badgeHtml('gratuit') +
      '<span>offre gratuite suffisante pour démarrer</span></div>';
    DATA.categories.forEach(function (cat) {
      var list = DATA.services.filter(function (s) { return s.categorie === cat; });
      if (!list.length) return;
      h += '<div class="cat-section" id="cat-' + slug(cat) + '"><h2>' + esc(cat) + '</h2><div class="svc-grid">';
      list.forEach(function (s) {
        h += '<button class="svc-card" data-svc="' + esc(s.id) + '" data-search="' +
          esc(norm(s.nom + ' ' + s.resume + ' ' + s.categorie + ' ' + s.role)) + '">' +
          '<div class="svc-title">' + esc(s.emoji) + ' ' + esc(s.nom) + ' ' + badgeHtml(s.badge) + '</div>' +
          '<div class="svc-resume">' + esc(s.resume) + '</div></button>';
      });
      h += '</div></div>';
    });
    return h;
  }

  function filterCatalogue(q) {
    q = norm(q || '').trim();
    var sections = document.querySelectorAll('.cat-section');
    for (var i = 0; i < sections.length; i++) {
      var cards = sections[i].querySelectorAll('.svc-card');
      var visibles = 0;
      for (var j = 0; j < cards.length; j++) {
        var ok = !q || (cards[j].getAttribute('data-search') || '').indexOf(q) !== -1;
        cards[j].style.display = ok ? '' : 'none';
        if (ok) visibles++;
      }
      sections[i].style.display = visibles ? '' : 'none';
    }
  }

  // ── Fiche service ──────────────────────────────────────────────────────────
  function serviceSheetHtml(svc, appCtx) {
    // Navigation ‹ › entre les fiches de la même famille
    var sibs = DATA.services.filter(function (s) { return s.categorie === svc.categorie; });
    var pos = sibs.indexOf(svc);
    var nav = '';
    if (sibs.length > 1) {
      nav = '<div class="sheet-nav">' +
        '<button data-nav="prev" aria-label="Fiche précédente de la famille">‹</button>' +
        '<span class="pos">' + (pos + 1) + ' / ' + sibs.length + ' · ' + esc(svc.categorie) + '</span>' +
        '<button data-nav="next" aria-label="Fiche suivante de la famille">›</button></div>';
    }
    var h = '<div class="close-row">' + nav + '<span class="grow"></span><button class="close-btn" data-close>✕ FERMER</button></div>';
    h += '<h2>' + esc(svc.emoji) + ' ' + esc(svc.nom) + ' ' + badgeHtml(svc.badge) + '</h2>';
    h += '<div class="svc-cat">Famille : ' + esc(svc.categorie) + '</div>';
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
      h += '<h3>Utilisé par</h3><p class="used-by">';
      users.forEach(function (a) { h += '<a data-dash-go="app/' + esc(a.id) + '">' + esc(a.emoji) + ' ' + esc(a.name) + '</a>'; });
      h += '</p>';
    }
    h += '<div class="sheet-actions">';
    if (appCtx) {
      var anchor = appCtx.serviceAnchors[svc.id];
      if (anchor) h += '<a href="#' + esc(anchor) + '" data-close>VOIR LA SECTION INFRA</a>';
    }
    h += '<a data-dash-go="catalogue/' + esc(svc.id) + '">OUVRIR DANS LE CATALOGUE</a></div>';
    return h;
  }

  var overlayEl = null;
  var sheetSvc = null, sheetCtx = null;
  function closeSheet() {
    if (overlayEl) { overlayEl.remove(); overlayEl = null; }
    sheetSvc = null; sheetCtx = null;
    document.removeEventListener('keydown', onSheetKey);
  }
  function sheetStep(dir) {
    if (!sheetSvc) return;
    var sibs = DATA.services.filter(function (s) { return s.categorie === sheetSvc.categorie; });
    if (sibs.length < 2) return;
    var i = (sibs.indexOf(sheetSvc) + dir + sibs.length) % sibs.length;
    openSheet(sibs[i], sheetCtx);
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
    overlayEl.className = 'overlay';
    overlayEl.innerHTML = '<div class="sheet" role="dialog" aria-modal="true">' + serviceSheetHtml(svc, appCtx) + '</div>';
    overlayEl.addEventListener('click', function (e) {
      var nav = e.target.closest && e.target.closest('[data-nav]');
      if (nav) { sheetStep(nav.getAttribute('data-nav') === 'prev' ? -1 : 1); return; }
      if (e.target === overlayEl || (e.target.closest && e.target.closest('[data-close]'))) closeSheet();
    });
    document.addEventListener('keydown', onSheetKey);
    document.body.appendChild(overlayEl);
  }

  // ── Rendu dans la page « Mes apps » de Gestion Pro ────────────────────────
  function enTete(route) {
    var titre = 'MES APPS', sous = DATA.apps.length + ' applications suivies', volets = '';
    if (route.page === 'app') {
      var a = DATA.apps.filter(function (x) { return x.id === route.id; })[0];
      if (a) {
        titre = a.name;
        sous = (a.platforms || []).join(' \u00b7 ') + (a.repo ? ' \u00b7 ' + a.repo : '');
        volets = '<div class="volets">' +
          '<a data-dash-go="app/' + esc(a.id) + '"' + (route.volet === 'technique' ? ' class="active"' : '') + '>TECHNIQUE</a>' +
          '<a data-dash-go="app/' + esc(a.id) + '/marketing"' + (route.volet === 'marketing' ? ' class="active"' : '') + '>MARKETING</a></div>';
      }
    } else if (route.page === 'catalogue') {
      titre = 'CATALOGUE';
      sous = DATA.services.length + ' services \u00b7 ' + DATA.categories.length + ' familles';
    }
    var nav = '<div class="dash-nav">' +
      '<button class="dash-nav-btn' + (route.page === 'accueil' ? ' active' : '') + '" data-dash-go="accueil">\u25c8 Vue d\u2019ensemble</button>';
    DATA.apps.forEach(function (a) {
      nav += '<button class="dash-nav-btn' + (route.page === 'app' && route.id === a.id ? ' active' : '') +
        '" data-dash-go="app/' + esc(a.id) + '">' + esc(a.emoji) + ' ' + esc(a.name) + '</button>';
    });
    nav += '<button class="dash-nav-btn' + (route.page === 'catalogue' ? ' active' : '') +
      '" data-dash-go="catalogue">\ud83d\uddc2 Catalogue</button>' +
      '<span class="dash-nav-grow"></span>' +
      '<button class="dash-nav-btn" id="anim-toggle" type="button">\u26a1 ANIMATIONS</button></div>';
    return nav + '<div class="dash-head"><h2>' + esc(titre) + '</h2><div class="sub">' + esc(sous) + '</div>' + volets + '</div>';
  }

  function dashRender() {
    var route = vue;
    closeSheet();
    if (globe) { globe.destroy(); globe = null; }
    var tete = $('#dash-titre'), corps = $('#dash-contenu');
    if (!corps) return;
    if (tete) tete.innerHTML = enTete(route);
    if (route.page === 'catalogue') {
      corps.innerHTML = renderCatalogue();
      if (route.service) {
        var svc = serviceById(route.service);
        if (svc) openSheet(svc, null);
      }
    } else if (route.page === 'app') {
      var app = DATA.apps.filter(function (a) { return a.id === route.id; })[0];
      if (!app) { vue = { page: 'accueil', id: null, volet: 'technique' }; return dashRender(); }
      corps.innerHTML = renderApp(app, route.volet);
    } else {
      corps.innerHTML = renderAccueil();
      mountGlobe();
    }
    var btn = $('#anim-toggle');
    if (btn) { btn.textContent = animOn() ? '\u26a1 ANIMATIONS' : '\u23f8 ANIMATIONS'; btn.addEventListener('click', toggleAnim); }
    window.scrollTo(0, 0);
  }

  var initialise = false;
  function dashInit() {
    if (initialise) return;
    var zone = $('#page-dash');
    if (!zone || !DATA) return;
    initialise = true;
    initAnim();

    zone.addEventListener('click', function (e) {
      var go = e.target.closest && e.target.closest('[data-dash-go]');
      if (go) {
        e.preventDefault();
        var p = go.getAttribute('data-dash-go').split('/');
        dashGo(p[0], p[1], p[2]);
        return;
      }
      var tog = e.target.closest && e.target.closest('.fiche-toggle');
      if (tog) { tog.parentElement.classList.toggle('open'); return; }
      // Une ancre interne (#i-\u2026, #m-\u2026) d\u00e9plie la fiche qui la contient
      var lien = e.target.closest && e.target.closest('a[href^="#"]');
      if (lien) {
        var href = lien.getAttribute('href');
        if (href && href.length > 1) {
          var cible = document.getElementById(href.slice(1));
          if (cible) {
            var fiche = cible.closest && cible.closest('.fiche');
            if (fiche) fiche.classList.add('open');
            e.preventDefault();
            cible.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
      var card = e.target.closest && e.target.closest('[data-svc]');
      if (!card) return;
      var svc = serviceById(card.getAttribute('data-svc'));
      if (!svc) return;
      var appCtx = vue.page === 'app' ? DATA.apps.filter(function (a) { return a.id === vue.id; })[0] : null;
      openSheet(svc, appCtx);
    });
    zone.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var g = e.target.closest && e.target.closest('g[data-svc]');
        if (g) g.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    });
    // Cases « Prochaines actions » : \u00e9tat persist\u00e9 (G.set si dispo)
    zone.addEventListener('change', function (e) {
      var t = e.target;
      if (!t || !t.hasAttribute || !t.hasAttribute('data-todo')) return;
      var k2 = t.getAttribute('data-todo');
      if (t.checked) todos[k2] = 1; else delete todos[k2];
      saveTodos();
    });
    zone.addEventListener('input', function (e) {
      if (e.target && e.target.id === 'cat-search') filterCatalogue(e.target.value);
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
      if (id === 'dash') dashInit();
    };
    return true;
  }
  if (!accrocher()) {
    document.addEventListener('DOMContentLoaded', function () {
      if (!accrocher()) {
        // Dernier repli : initialisation si la page est déjà visible.
        var z = $('#page-dash');
        if (z && z.classList.contains('active')) dashInit();
      }
    });
  }

})();
