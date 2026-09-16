// =============================================================================
// Onglet Compta → sous-onglet « Analyse EBE » : trois sociétés, 2017 à 2023.
// Les calculs sont dans ebe.js ; ce fichier ne fait que l'affichage.
//
// Données — JAMAIS dans ce dépôt public — : clés de la table Supabase app_data,
// rapatriées dans le localStorage par Supa.pullAll() comme le reste de l'app :
//   v90_ebe_agregats       montants, sociétés, notes
//   v90_ebe_documents      index des PDF (stockage « comptes-annuels ») et page
//                          source de chaque montant
//   v90_ebe_valorisations  historique des valorisations enregistrées (G.set)
// =============================================================================
'use strict';

(function () {
  var CLE_DONNEES = 'v90_ebe_agregats', CLE_DOCS = 'v90_ebe_documents', CLE_HIST = 'v90_ebe_valorisations';
  var STOCKAGE = 'comptes-annuels';
  var TYPES = { comptes_annuels: 'Comptes annuels', liasse_fiscale: 'Liasse fiscale', grand_livre: 'Grand livre',
    previsionnel: 'Rapport prévisionnel', courrier: 'Courrier', bilan_image: 'Bilan imagé', autre: 'Document' };

  var sel = null;          // sélection propre à la vue : indicateur, sociétés, exercices, base, coefficient
  var ref = null, docs = null, analyse = null, empreinte = null, minuteur = null;

  // ── Utilitaires ────────────────────────────────────────────────────────────
  function el(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function lire(cle) { try { return JSON.parse(localStorage.getItem(cle) || 'null'); } catch (e) { return null; } }
  // Tout montant passe par eur() de Gestion Pro ; une absence s'affiche en tiret long.
  function montant(v) { return v == null || !isFinite(v) ? '—' : eur(v); }
  function court(v) {
    if (Math.abs(v) >= 1000) {
      var k = v / 1000;
      return (Math.abs(k) < 10 ? k.toFixed(1).replace('.', ',').replace(',0', '') : String(Math.round(k))) + ' k€';
    }
    return Math.round(v) + ' €';
  }
  // Graduation lisible : 1, 2, 2,5 ou 5 × 10ⁿ
  function echelle(v) {
    if (!(v > 0)) return 1;
    var p = Math.pow(10, Math.floor(Math.log10(v))), r = v / p;
    return ([1, 2, 2.5, 5, 10].filter(function (x) { return r <= x; })[0] || 10) * p;
  }
  function classe(v) { return v > 0 ? 'ebe-pos' : v < 0 ? 'ebe-neg' : ''; }
  function plus(v) { return v > 0 ? '<span class="ebe-signe">+</span>' : ''; }
  function plur(n, mot) { return n + ' ' + mot + (n > 1 ? 's' : ''); }
  function coef(c) { return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 4 }).format(c); }
  function nomSoc(code) { var s = ref.societes.filter(function (x) { return x.code === code; })[0]; return s ? s.nom : code; }
  function nomInd(code) { var i = ref.indicateurs.filter(function (x) { return x.code === code; })[0]; return i ? i.nom : code; }
  function serie(code) { return ref.societes.map(function (s) { return s.code; }).indexOf(code) + 1; }
  function avis(niveau, titre, corps) {
    return '<div class="ebe-avis ebe-avis-' + niveau + '"><b>' + esc(titre) + '</b>' + (corps ? ' — ' + corps : '') + '</div>';
  }
  function visible() {
    var page = el('page-compta'), vue = el('view-compta-ebe');
    return !!(page && vue && page.classList.contains('active') && vue.style.display !== 'none');
  }

  // ── Sous-onglets de la page Compta ─────────────────────────────────────────
  window.toggleComptaTab = function (t) {
    ['bilan', 'ebe'].forEach(function (x) {
      el('tab-compta-' + x).classList.toggle('active', x === t);
      el('view-compta-' + x).style.display = x === t ? '' : 'none';
    });
    // Ancre #ebe : un rechargement rouvre directement l'analyse.
    try { history.replaceState(null, '', t === 'ebe' ? '#ebe' : location.pathname + location.search); } catch (e) {}
    if (t === 'ebe') rendre();
  };

  // ── Rendu ──────────────────────────────────────────────────────────────────
  function rendre() {
    var hote = el('ebe-contenu');
    if (!hote) return;
    empreinte = [CLE_DONNEES, CLE_DOCS, CLE_HIST].map(function (c) { return localStorage.getItem(c); }).join('|');
    var brut = lire(CLE_DONNEES);
    ref = null;
    try { if (brut && !Array.isArray(brut)) ref = EBE.normaliser(brut); }
    catch (e) { hote.innerHTML = avis('ko', 'Données EBE illisibles', esc(e.message)); return; }
    if (!ref) {
      hote.innerHTML = avis('run', 'Données EBE absentes de cet appareil', 'elles arrivent de Supabase avec la synchronisation.') +
        '<button class="btn" style="margin-top:12px" onclick="Supa.pullAll(true)">⬇️ Récupérer du cloud</button>';
      return;
    }
    var d = lire(CLE_DOCS);
    docs = d && !Array.isArray(d) ? d : { documents: [], sources: {}, non_localisees: [] };
    if (!sel) {
      sel = { indicateur: 'ebe', societes: ref.societes.map(function (s) { return s.code; }),
              exercices: ref.perimetre.exercices.slice(), base: 'moyenne', coefficient: '1' };
    }

    hote.innerHTML =
      '<div class="ebe-impression ebe-entete-impression" id="ebe-entete"></div>' +
      '<div class="card ebe-ecran ebe-controles">' +
        '<div><div class="ebe-tete"><span class="section-title">Sociétés</span>' +
          '<button class="tva-btn-ghost" data-tout="societes">toutes</button><button class="tva-btn-ghost" data-rien="societes">aucune</button></div>' +
          '<div class="ebe-puces" id="ebe-societes"></div></div>' +
        '<div><div class="ebe-tete"><span class="section-title">Exercices</span>' +
          '<button class="tva-btn-ghost" data-tout="exercices">tout</button><button class="tva-btn-ghost" data-rien="exercices">aucun</button></div>' +
          '<div class="ebe-puces" id="ebe-exercices"></div></div>' +
        '<div class="ebe-indicateur-bloc"><label for="ebe-indicateur">Indicateur</label><select id="ebe-indicateur"></select>' +
          '<div class="ebe-indice" id="ebe-indice"></div></div>' +
      '</div>' +
      '<div id="ebe-alerte"></div>' +
      '<div class="ebe-tuiles" id="ebe-tuiles"></div>' +
      '<div class="section-title" id="ebe-titre-tableau" style="margin-top:22px">Tableau croisé</div>' +
      '<div id="ebe-tableau"></div>' +
      '<div class="ebe-legende">' +
        '<span><i class="ebe-pastille ebe-pos"></i>positif</span><span><i class="ebe-pastille ebe-neg"></i>négatif</span>' +
        '<span><i class="ebe-pastille"></i><i>sans objet</i> ou <i>n.d.</i> : jamais comptés dans les moyennes</span>' +
        '<span class="ebe-ecran">↗ ouvre la page du document source</span></div>' +
      '<div class="ebe-actions ebe-ecran">' +
        '<button class="btn" id="ebe-copier" style="width:auto">📋 Copier le tableau</button>' +
        '<button class="btn btn-gold" id="ebe-imprimer" style="width:auto">🖨 Imprimer la sélection</button></div>' +
      '<div class="section-title" style="margin-top:26px">Évolution par société</div>' +
      '<div class="card ebe-bloc" id="ebe-graphe"></div>' +
      '<div id="ebe-mult"><div class="section-title" style="margin-top:26px">Multiplicateur</div>' +
        '<div class="card ebe-bloc">' +
          '<div class="ebe-mult-controles ebe-ecran">' +
            '<div><label for="ebe-base">Appliquer à</label><select id="ebe-base">' +
              '<option value="moyenne">Moyenne de la sélection</option><option value="total">Total cumulé</option></select></div>' +
            '<div><label for="ebe-coef">Coefficient</label><input id="ebe-coef" type="text" inputmode="decimal" autocomplete="off"></div>' +
            '<div><label>Raccourcis</label><div class="ebe-puces" id="ebe-raccourcis">' +
              [3, 4, 5, 6, 7, 1].map(function (k) { return '<button class="tva-flt tva-flt-off" data-coef="' + k + '">×' + k + '</button>'; }).join('') +
            '</div></div></div>' +
          '<div id="ebe-calcul"></div>' +
          '<div class="ebe-enregistrement ebe-ecran">' +
            '<div style="flex:1; min-width:180px"><label for="ebe-libelle">Libellé du scénario</label>' +
              '<input id="ebe-libelle" type="text" maxlength="120" placeholder="facultatif — ex. base prudente"></div>' +
            '<button class="btn btn-gold" id="ebe-enregistrer" style="width:auto">💾 Enregistrer cette valorisation</button></div>' +
        '</div></div>' +
      '<div class="ebe-ecran"><div class="section-title" style="margin-top:26px">Valorisations enregistrées</div><div id="ebe-historique"></div></div>' +
      '<div class="ebe-ecran"><div class="section-title" style="margin-top:26px">Documents sources</div><div id="ebe-documents"></div></div>' +
      '<div class="section-title" style="margin-top:26px">Notes</div>' +
      '<div class="card ebe-bloc"><ul class="ebe-notes">' + ref.notes.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="ebe-impression ebe-pied-impression" id="ebe-pied"></div>';

    brancher();
    el('ebe-coef').value = sel.coefficient;
    el('ebe-base').value = sel.base;
    dessiner();
    dessinerDocuments();
  }

  function dessiner() {
    analyse = EBE.analyser(ref, sel);
    dessinerControles();
    var a = analyse;
    el('ebe-alerte').innerHTML = a.alerte ? avis('run', a.alerte.titre, esc(a.alerte.corps)) : '';
    dessinerTuiles();
    dessinerTableau();
    el('ebe-graphe').innerHTML = graphe();
    dessinerMultiplicateur();
    dessinerImpression();
    dessinerHistorique();
  }

  function dessinerControles() {
    var actif = document.activeElement;
    var focus = actif && actif.dataset ? (actif.dataset.societe || actif.dataset.exercice) : null;
    el('ebe-societes').innerHTML = ref.societes.map(function (s) {
      var on = sel.societes.indexOf(s.code) !== -1;
      return '<button class="tva-flt ' + (on ? 'tva-flt-on' : 'tva-flt-off') + '" aria-pressed="' + on + '" data-societe="' + esc(s.code) + '">' +
        '<i class="ebe-pastille ebe-serie-' + serie(s.code) + '"></i>' + esc(s.nom) + ' <span class="ebe-siren">' + esc(s.siren_affiche) + '</span></button>';
    }).join('');
    el('ebe-exercices').innerHTML = ref.perimetre.exercices.map(function (x) {
      var on = sel.exercices.indexOf(x) !== -1;
      return '<button class="tva-flt ' + (on ? 'tva-flt-on' : 'tva-flt-off') + '" aria-pressed="' + on + '" data-exercice="' + x + '">' + x + '</button>';
    }).join('');
    var dispo = EBE.indicateursDisponibles(ref);
    el('ebe-indicateur').innerHTML = dispo.map(function (i) {
      return '<option value="' + esc(i.code) + '"' + (i.code === sel.indicateur ? ' selected' : '') + '>' + esc(i.nom) +
        ' (' + i.couverture.renseignees + ' sur ' + i.couverture.attendues + ')</option>';
    }).join('');
    var i = dispo.filter(function (x) { return x.code === sel.indicateur; })[0];
    var p = ref.perimetre.exercices;
    el('ebe-indice').textContent = !i ? '' : i.couverture.manquantes
      ? i.couverture.renseignees + ' valeurs relevées sur ' + i.couverture.attendues + ' attendues pour ' + p[0] + '-' + p[p.length - 1]
      : 'complet : ' + i.couverture.attendues + ' valeurs sur ' + p[0] + '-' + p[p.length - 1];
    if (focus) {
      var cible = el('ebe-contenu').querySelector('[data-societe="' + focus + '"], [data-exercice="' + focus + '"]');
      if (cible) cible.focus();
    }
  }

  function dessinerTuiles() {
    var st = analyse.statistiques;
    var ou = function (x) { return esc(nomSoc(x.societe)) + ' · ' + x.exercice; };
    var tuile = function (lbl, val, sub, cls) {
      return '<div class="tva-stat ebe-tuile"><small>' + esc(lbl) + '</small><b class="' + (cls || '') + '">' + val + '</b><span class="ebe-sub">' + (sub || '&nbsp;') + '</span></div>';
    };
    el('ebe-tuiles').innerHTML = st ? [
      tuile('Moyenne de la sélection', montant(st.moyenne), plur(st.nb, 'exercice') + ' retenu' + (st.nb > 1 ? 's' : ''), classe(st.moyenne)),
      tuile('Total cumulé', montant(st.total), st.nb > 1 ? 'somme des ' + st.nb + ' exercices' : 'un seul exercice', classe(st.total)),
      tuile('Minimum', montant(st.min.valeur), ou(st.min), classe(st.min.valeur)),
      tuile('Maximum', montant(st.max.valeur), ou(st.max), classe(st.max.valeur))
    ].join('') : [
      tuile('Moyenne de la sélection', '—', 'aucun exercice retenu'), tuile('Total cumulé', '—'), tuile('Minimum', '—'), tuile('Maximum', '—')
    ].join('');
  }

  function dessinerTableau() {
    var a = analyse, zone = el('ebe-tableau');
    el('ebe-titre-tableau').textContent = 'Tableau croisé — ' + nomInd(a.indicateur);
    if (!a.societes.length || !a.exercices.length) {
      zone.innerHTML = '<div class="card" style="justify-content:center; color:var(--muted)">Sélectionnez au moins une société et un exercice</div>';
      return;
    }
    var sources = (docs.sources || {})[a.indicateur] || {};
    var lien = function (code, x) {
      var s = (sources[code] || {})[x];
      if (!s || !docParId(s.document)) return '';
      var d = docParId(s.document);
      var quoi = (TYPES[d.type] || 'Document').toLowerCase() + ' ' + d.exercice + ' — ' + nomSoc(d.societe) + ', page ' + s.page + (s.colonne === 'N-1' ? ' (colonne N-1)' : '');
      return '<a href="#" class="ebe-src" data-doc="' + esc(d.id) + '" data-page="' + s.page + '" title="Ouvrir : ' + esc(quoi) + '" aria-label="Ouvrir : ' + esc(quoi) + '">↗</a>';
    };
    var cellule = function (c, code) {
      if (c.etat === EBE.SANS_OBJET) return '<td class="ebe-d ebe-vide">sans objet</td>';
      if (c.etat === EBE.ND) return '<td class="ebe-d ebe-vide">n.d.</td>';
      return '<td class="ebe-d ' + classe(c.valeur) + '">' + plus(c.valeur) + montant(c.valeur) + lien(code, c.exercice) + '</td>';
    };
    var moyenne = function (v) { return '<td class="ebe-d ebe-moy ' + (v == null ? '' : classe(v)) + '">' + (v == null ? '—' : plus(v) + montant(v)) + '</td>'; };
    zone.innerHTML = '<div class="ebe-defile"><table class="tva-table ebe-croise"><thead><tr><th>Société</th>' +
      a.exercices.map(function (x) { return '<th class="ebe-d">' + x + '</th>'; }).join('') + '<th class="ebe-d">Moyenne</th></tr></thead><tbody>' +
      a.lignes.map(function (l) {
        return '<tr><td><i class="ebe-pastille ebe-serie-' + serie(l.societe) + '"></i>' + esc(nomSoc(l.societe)) + '</td>' +
          l.cellules.map(function (c) { return cellule(c, l.societe); }).join('') + moyenne(l.moyenne) + '</tr>';
      }).join('') +
      '<tr class="ebe-total"><td>Moyenne par exercice</td>' + a.colonnes.map(function (c) { return moyenne(c.moyenne); }).join('') +
      moyenne(a.moyenne_generale) + '</tr></tbody></table></div>';
  }

  // Une courbe par société ; une case sans valeur ROMPT la courbe, jamais d'interpolation.
  function graphe() {
    var a = analyse, points = [];
    a.lignes.forEach(function (l) { l.cellules.forEach(function (c) { if (c.etat === EBE.VALEUR) points.push(c.valeur); }); });
    if (!points.length) return '<div style="color:var(--muted); text-align:center; width:100%">Rien à tracer pour cette sélection</div>';
    var L = 900, H = 290, g = 70, d = 18, h = 14, b = 30, zl = L - g - d, zh = H - h - b;
    var bas = Math.min.apply(null, [0].concat(points)), haut = Math.max.apply(null, [0].concat(points));
    var pas = echelle((haut - bas) / 4 || 1);
    bas = Math.floor(bas / pas) * pas; haut = Math.ceil(haut / pas) * pas;
    if (haut === bas) haut = bas + pas;
    var X = function (i) { return g + (a.exercices.length === 1 ? zl / 2 : zl * i / (a.exercices.length - 1)); };
    var Y = function (v) { return h + zh - (v - bas) / (haut - bas) * zh; };
    var s = '';
    for (var k = 0; k <= Math.round((haut - bas) / pas); k++) {
      var v = bas + k * pas, y = Y(v).toFixed(1);
      s += '<line class="ebe-grille" x1="' + g + '" y1="' + y + '" x2="' + (L - d) + '" y2="' + y + '"/>' +
        '<text class="ebe-axe" x="' + (g - 8) + '" y="' + (+y + 3) + '" text-anchor="end">' + court(v) + '</text>';
    }
    if (bas < 0 && haut > 0) s += '<line class="ebe-zero" x1="' + g + '" y1="' + Y(0).toFixed(1) + '" x2="' + (L - d) + '" y2="' + Y(0).toFixed(1) + '"/>';
    a.exercices.forEach(function (x, i) { s += '<text class="ebe-axe" x="' + X(i).toFixed(1) + '" y="' + (H - 9) + '" text-anchor="middle">' + x + '</text>'; });
    a.lignes.forEach(function (l) {
      var n = serie(l.societe), troncon = [];
      var fermer = function () {
        if (troncon.length > 1) {
          s += '<polyline class="ebe-courbe ebe-serie-' + n + '" points="' + troncon.map(function (p) { return X(p.i).toFixed(1) + ',' + Y(p.v).toFixed(1); }).join(' ') + '"/>';
        }
        troncon.forEach(function (p) {
          s += '<circle class="ebe-point ebe-serie-' + n + '" cx="' + X(p.i).toFixed(1) + '" cy="' + Y(p.v).toFixed(1) + '" r="4"><title>' +
            esc(nomSoc(l.societe)) + ' · ' + a.exercices[p.i] + ' : ' + montant(p.v) + '</title></circle>';
        });
        troncon = [];
      };
      l.cellules.forEach(function (c, i) { if (c.etat === EBE.VALEUR) troncon.push({ i: i, v: c.valeur }); else fermer(); });
      fermer();
    });
    return '<div class="ebe-legende" style="margin:0 0 8px">' + a.lignes.map(function (l) {
      return '<span><i class="ebe-trait ebe-serie-' + serie(l.societe) + '"></i>' + esc(nomSoc(l.societe)) + '</span>';
    }).join('') + '<span>une courbe interrompue signale un exercice sans valeur</span></div>' +
      '<svg class="ebe-svg" viewBox="0 0 ' + L + ' ' + H + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Évolution par société">' + s + '</svg>';
  }

  function dessinerMultiplicateur() {
    var a = analyse, m = a.multiplicateur;
    el('ebe-coef').setAttribute('aria-invalid', m.etat === 'invalide' ? 'true' : 'false');
    [].forEach.call(el('ebe-raccourcis').querySelectorAll('[data-coef]'), function (bt) {
      var on = m.coefficient != null && Math.abs(m.coefficient - Number(bt.dataset.coef)) < 1e-9;
      bt.className = 'tva-flt ' + (on ? 'tva-flt-on' : 'tva-flt-off');
    });
    el('ebe-enregistrer').disabled = m.etat !== 'ok';
    // À l'impression, ce bloc n'apparaît que si un coefficient autre que 1 est appliqué.
    el('ebe-mult').classList.toggle('ebe-mult-neutre', !(m.etat === 'ok' && Math.abs(m.coefficient - 1) > 1e-9));
    var zone = el('ebe-calcul');
    if (m.etat === 'vide') { zone.innerHTML = '<div class="ebe-note" style="text-align:center; padding:14px 0">' + esc(m.message) + '</div>'; return; }
    if (m.etat === 'invalide') { zone.innerHTML = avis('ko', m.message); return; }
    zone.innerHTML = '<div class="ebe-note">' + (m.base === 'moyenne' ? 'Moyenne' : 'Total cumulé') + ' — ' + esc(nomInd(a.indicateur)) + ' · ' +
        esc(a.libelle_societes) + ' · ' + esc(a.libelle_exercices) + '</div>' +
      '<div class="ebe-calcul"><span class="' + classe(m.valeur_base) + '">' + montant(m.valeur_base) + '</span><span class="ebe-op">×</span>' +
        '<span>' + coef(m.coefficient) + '</span><span class="ebe-op">=</span><b class="ebe-resultat ' + classe(m.resultat) + '">' + montant(m.resultat) + '</b></div>' +
      '<div class="ebe-note">calculé sur ' + plur(m.nb, 'exercice') + ' réellement renseigné' + (m.nb > 1 ? 's' : '') +
        ' ; les cases « sans objet » et « n.d. » sont exclues.</div>';
  }

  function dessinerImpression() {
    var a = analyse, st = a.statistiques, m = a.multiplicateur;
    var date = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
    var retenus = st ? plur(st.nb, 'exercice') + ' réellement renseigné' + (st.nb > 1 ? 's' : '') +
      (a.couverture.manquantes ? ' sur ' + a.couverture.attendues + ' attendus' : '') : 'aucune donnée pour cette sélection';
    el('ebe-entete').innerHTML = '<div class="t">' + esc(nomInd(a.indicateur)) + ' — ' + esc(a.libelle_exercices) + '</div>' +
      '<div class="d">Analyse multi-sociétés · imprimée le ' + date + '</div><dl>' +
      '<dt>Indicateur</dt><dd>' + esc(nomInd(a.indicateur)) + '</dd>' +
      '<dt>Sociétés</dt><dd>' + esc(a.societes.map(nomSoc).join(', ') || 'aucune') + '</dd>' +
      '<dt>Exercices</dt><dd>' + esc(a.libelle_exercices) + '</dd>' +
      '<dt>Exercices retenus</dt><dd>' + retenus + '</dd>' +
      (m.etat === 'ok' && Math.abs(m.coefficient - 1) > 1e-9
        ? '<dt>Multiplicateur</dt><dd>' + (m.base === 'moyenne' ? 'moyenne' : 'total cumulé') + ' ' + montant(m.valeur_base) + ' × ' + coef(m.coefficient) + ' = <b>' + montant(m.resultat) + '</b></dd>' : '') +
      '</dl>';
    el('ebe-pied').innerHTML = '<span>Source : ' + esc(ref.source) + ' — ' +
      ref.societes.map(function (s) { return esc(s.nom) + ' ' + esc(s.siren_affiche); }).join(' · ') + '</span><span>' + date + '</span>';
  }

  // ── Historique des valorisations ───────────────────────────────────────────
  function valorisations() { var v = lire(CLE_HIST); return Array.isArray(v) ? v : []; }

  function dessinerHistorique() {
    var zone = el('ebe-historique'), liste = valorisations(), actuel = analyse.multiplicateur;
    if (!liste.length) {
      zone.innerHTML = '<div class="card" style="justify-content:center; color:var(--muted)">Aucune valorisation enregistrée — réglez le multiplicateur puis enregistrez-la</div>';
      return;
    }
    zone.innerHTML = '<div class="ebe-defile"><table class="tva-table"><thead><tr><th>Date</th><th>Libellé</th><th>Sélection</th>' +
      '<th class="ebe-d">Base</th><th class="ebe-d">Coef.</th><th class="ebe-d">Résultat</th><th class="ebe-d">Écart au calcul affiché</th><th></th></tr></thead><tbody>' +
      liste.map(function (v) {
        var refait = null;
        try { refait = EBE.analyser(ref, v).multiplicateur.resultat; } catch (e) {}
        var modifie = refait == null || Math.abs(refait - v.resultat) > 0.005;
        return '<tr><td>' + esc(new Date(v.cree_le).toLocaleDateString('fr-FR')) + '</td>' +
          '<td>' + (v.libelle ? esc(v.libelle) : '<span style="color:var(--muted)">sans libellé</span>') +
            (modifie ? '<div><span class="badge-statut badge-attente">données modifiées depuis</span></div>' : '') + '</td>' +
          '<td>' + esc(nomInd(v.indicateur)) + '<div class="ebe-note">' + esc(EBE.libelleSocietes(ref, v.societes.filter(function (c) { return serie(c) > 0; }))) +
            ' · ' + esc(EBE.libelleExercices(v.exercices)) + ' · ' + plur(v.nb_valeurs, 'exercice') + '</div></td>' +
          '<td class="ebe-d">' + montant(v.valeur_base) + '<div class="ebe-note">' + (v.base === 'moyenne' ? 'moyenne' : 'total cumulé') + '</div></td>' +
          '<td class="ebe-d">× ' + coef(v.coefficient) + '</td>' +
          '<td class="ebe-d"><b class="' + classe(v.resultat) + '">' + montant(v.resultat) + '</b></td>' +
          '<td class="ebe-d">' + (actuel.etat === 'ok' ? montant(v.resultat - actuel.resultat) : '—') + '</td>' +
          '<td class="ebe-d" style="white-space:nowrap"><button class="tva-btn-ghost" data-recharger="' + esc(v.id) + '">Recharger</button> ' +
            '<button class="tva-btn-ghost" data-supprimer="' + esc(v.id) + '">Supprimer</button></td></tr>';
      }).join('') + '</tbody></table></div>';
  }

  function enregistrer() {
    var a = EBE.analyser(ref, sel), m = a.multiplicateur;           // recalcul : jamais l'affichage
    if (m.etat !== 'ok') { toast(m.message, 'error'); return; }
    var liste = valorisations();
    liste.unshift({
      id: String(Date.now()), cree_le: new Date().toISOString(),
      libelle: el('ebe-libelle').value.trim().slice(0, 120) || null,
      indicateur: a.indicateur, societes: a.societes, exercices: a.exercices,
      base: m.base, coefficient: m.coefficient, valeur_base: m.valeur_base, resultat: m.resultat, nb_valeurs: m.nb
    });
    G.set(CLE_HIST, liste);                                             // localStorage + Supabase
    el('ebe-libelle').value = '';
    toast('💾 Valorisation enregistrée : ' + montant(m.resultat), 'success');
    empreinte = null;
    dessinerHistorique();
  }

  // ── Documents sources ──────────────────────────────────────────────────────
  function docParId(id) { return (docs.documents || []).filter(function (d) { return d.id === id; })[0] || null; }

  // Lien signé de courte durée vers le PDF du stockage privé « comptes-annuels ».
  function ouvrirDocument(d, page, telecharger) {
    if (!d || !d.chemin) { toast('📄 Document référencé mais introuvable dans le stockage.', 'error'); return; }
    // La fenêtre s'ouvre tout de suite : Safari bloque celles ouvertes après une attente réseau.
    var fenetre = telecharger ? null : window.open('', '_blank');
    fetch(SUPA_URL + '/storage/v1/object/sign/' + STOCKAGE + '/' + d.chemin.split('/').map(encodeURIComponent).join('/'), {
      method: 'POST', headers: Supa._h, body: JSON.stringify({ expiresIn: 600 })
    }).then(function (r) { return r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status)); })
      .then(function (j) {
        var adresse = SUPA_URL + '/storage/v1' + j.signedURL;
        if (telecharger) {
          var a = document.createElement('a');
          a.href = adresse + '&download=' + encodeURIComponent(d.chemin.split('/').pop());
          document.body.appendChild(a); a.click(); a.remove();
        } else if (fenetre) {
          fenetre.location.href = adresse + (page ? '#page=' + page : '');
        }
      })
      .catch(function () {
        if (fenetre) fenetre.close();
        toast('📄 Document référencé mais introuvable dans le stockage (ou connexion indisponible).', 'error');
      });
  }

  function dessinerDocuments() {
    var zone = el('ebe-documents'), liste = docs.documents || [];
    if (!liste.length) {
      zone.innerHTML = avis('run', 'Aucun document indexé', 'l\'index des PDF (clé v90_ebe_documents) n\'est pas encore arrivé sur cet appareil.');
      return;
    }
    var hors = ref.perimetre.hors_perimetre;
    var ligneDoc = function (d) {
      var pilules = [];
      if (d.type === 'previsionnel') pilules.push('<span class="mini-tag">prévisionnel, jamais source d\'un chiffre</span>');
      if (d.exercice_court) pilules.push('<span class="mini-tag">exercice court</span>');
      if (d.statut === 'a_verifier') pilules.push('<span class="badge-statut badge-attente">à vérifier</span>');
      if (!d.chemin) pilules.push('<span class="badge-statut badge-retard">introuvable dans le stockage</span>');
      var detail = [d.nom_origine ? '« ' + d.nom_origine + ' »' : null, d.verification === 'siren' ? 'SIREN vérifié' : null,
        d.periode, d.pages ? d.pages + ' p.' : null, d.remarque].filter(Boolean).map(esc).join(' · ');
      return '<div style="margin:0 0 9px"><b>' + esc(TYPES[d.type] || 'Document') + '</b> ' + pilules.join(' ') +
        ' <a href="#" data-ouvrir="' + esc(d.id) + '">ouvrir</a> · <a href="#" data-telecharger="' + esc(d.id) + '">télécharger</a>' +
        (detail ? '<div class="ebe-note">' + detail + '</div>' : '') + '</div>';
    };
    var etat = function (s, x, docsAn) {
      if (x < s.premier_exercice) return '<span class="ebe-note"><i>sans objet</i></span>';
      var comptes = docsAn.filter(function (d) { return d.type === 'comptes_annuels' && !d.exercice_court && d.statut === 'ok'; });
      if (!comptes.length) return '<span class="badge-statut badge-attente">comptes annuels absents</span>';
      if (!comptes.some(function (d) { return d.chemin; })) return '<span class="badge-statut badge-retard">introuvables</span>';
      return '<span class="badge-statut badge-payee">disponibles</span>';
    };
    var aVerifier = liste.filter(function (d) { return d.statut === 'a_verifier'; });
    var h = aVerifier.length ? avis('run', plur(aVerifier.length, 'document') + ' à vérifier', aVerifier.map(function (d) {
      return esc((TYPES[d.type] || 'document').toLowerCase()) + ' ' + d.exercice + ', classé sous ' + esc(nomSoc(d.societe)) + ' : ' + esc(d.remarque || '');
    }).join(' ; ')) : '';
    h += '<div class="ebe-defile"><table class="tva-table ebe-documents"><thead><tr><th>Exercice</th><th>Comptes annuels</th><th>Documents</th></tr></thead><tbody>';
    ref.societes.forEach(function (s) {
      h += '<tr class="ebe-total"><td colspan="3">' + esc(s.nom) + ' — SIREN ' + esc(s.siren_affiche) + '</td></tr>';
      ref.perimetre.exercices.concat(hors).forEach(function (x) {
        var docsAn = liste.filter(function (d) { return d.societe === s.code && d.exercice === x; });
        h += '<tr><td>' + x + (hors.indexOf(x) !== -1 ? '<div class="ebe-note">hors périmètre</div>' : '') + '</td>' +
          '<td>' + etat(s, x, docsAn) + '</td><td>' + (docsAn.length ? docsAn.map(ligneDoc).join('') : '<span class="ebe-note">—</span>') + '</td></tr>';
      });
    });
    zone.innerHTML = h + '</tbody></table></div>';
  }

  // ── Événements ─────────────────────────────────────────────────────────────
  function brancher() {
    var hote = el('ebe-contenu');
    var basculer = function (liste, v) { var i = liste.indexOf(v); if (i >= 0) liste.splice(i, 1); else liste.push(v); };
    hote.onclick = function (e) {
      var c = e.target.closest ? e.target : null;
      if (!c) return;
      var t;
      if ((t = c.closest('[data-societe]'))) { basculer(sel.societes, t.dataset.societe); dessiner(); return; }
      if ((t = c.closest('[data-exercice]'))) { basculer(sel.exercices, Number(t.dataset.exercice)); dessiner(); return; }
      if ((t = c.closest('[data-tout]'))) {
        sel[t.dataset.tout] = t.dataset.tout === 'societes' ? ref.societes.map(function (s) { return s.code; }) : ref.perimetre.exercices.slice();
        dessiner(); return;
      }
      if ((t = c.closest('[data-rien]'))) { sel[t.dataset.rien] = []; dessiner(); return; }
      if ((t = c.closest('[data-coef]'))) { sel.coefficient = t.dataset.coef; el('ebe-coef').value = sel.coefficient; dessiner(); return; }
      if ((t = c.closest('[data-doc]'))) { e.preventDefault(); ouvrirDocument(docParId(t.dataset.doc), Number(t.dataset.page)); return; }
      if ((t = c.closest('[data-ouvrir]'))) { e.preventDefault(); ouvrirDocument(docParId(t.dataset.ouvrir)); return; }
      if ((t = c.closest('[data-telecharger]'))) { e.preventDefault(); ouvrirDocument(docParId(t.dataset.telecharger), null, true); return; }
      if ((t = c.closest('[data-recharger]'))) {
        var v = valorisations().filter(function (x) { return x.id === t.dataset.recharger; })[0];
        if (!v) return;
        sel = { indicateur: v.indicateur, societes: v.societes.slice(), exercices: v.exercices.slice(), base: v.base,
                coefficient: coef(v.coefficient).replace(/\s/g, '') };
        el('ebe-coef').value = sel.coefficient; el('ebe-base').value = sel.base;
        dessiner();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        toast('Valorisation rechargée : ' + (v.libelle || 'sans libellé'), 'success');
        return;
      }
      if ((t = c.closest('[data-supprimer]'))) {
        var id = t.dataset.supprimer, cible = valorisations().filter(function (x) { return x.id === id; })[0];
        if (!cible || !confirm('Supprimer la valorisation' + (cible.libelle ? ' « ' + cible.libelle + ' »' : '') + ' ?')) return;
        G.set(CLE_HIST, valorisations().filter(function (x) { return x.id !== id; }));
        toast('Valorisation supprimée', 'success');
        dessinerHistorique();
      }
    };
    el('ebe-indicateur').onchange = function (e) { sel.indicateur = e.target.value; dessiner(); };
    el('ebe-base').onchange = function (e) { sel.base = e.target.value; dessiner(); };
    el('ebe-coef').oninput = function (e) {
      sel.coefficient = e.target.value;
      clearTimeout(minuteur);
      minuteur = setTimeout(function () { if (visible()) dessiner(); }, 120);
    };
    el('ebe-enregistrer').onclick = enregistrer;
    el('ebe-imprimer').onclick = function () {
      if (!analyse.statistiques) { toast('Sélection vide : rien à imprimer', 'warn'); return; }
      document.body.classList.add('impression-ebe');
      window.print();
    };
    el('ebe-copier').onclick = copier;
  }

  // Tableau en TSV : nombres au format français sans séparateur de milliers, pour un tableur.
  function copier() {
    var a = analyse;
    if (!a.societes.length || !a.exercices.length) { toast('Rien à copier : la sélection est vide', 'warn'); return; }
    var nombre = function (v) { return v == null ? '—' : v.toFixed(2).replace('.', ','); };
    var texte = [[nomInd(a.indicateur) + ' (euros)'].concat(a.exercices, ['Moyenne'])]
      .concat(a.lignes.map(function (l) {
        return [nomSoc(l.societe)].concat(l.cellules.map(function (c) {
          return c.etat === EBE.VALEUR ? nombre(c.valeur) : c.etat === EBE.SANS_OBJET ? 'sans objet' : 'n.d.';
        }), [nombre(l.moyenne)]);
      }))
      .concat([['Moyenne par exercice'].concat(a.colonnes.map(function (c) { return nombre(c.moyenne); }), [nombre(a.moyenne_generale)])])
      .map(function (l) { return l.join('\t'); }).join('\n');
    var repli = function () {
      var zone = document.createElement('textarea');
      zone.value = texte; zone.setAttribute('readonly', ''); zone.style.position = 'fixed'; zone.style.opacity = '0';
      document.body.appendChild(zone); zone.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      zone.remove();
      toast(ok ? '📋 Tableau copié' : 'Copie refusée par le navigateur', ok ? 'success' : 'error');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texte).then(function () { toast('📋 Tableau copié', 'success'); }, repli);
    } else repli();
  }

  // ── Accroches ──────────────────────────────────────────────────────────────
  window.addEventListener('beforeprint', function () { if (visible()) document.body.classList.add('impression-ebe'); });
  window.addEventListener('afterprint', function () { document.body.classList.remove('impression-ebe'); });

  // Quand la synchronisation Supabase rapatrie de nouvelles données, la vue suit.
  if (typeof window.renderAll === 'function') {
    var renderAllOriginal = window.renderAll;
    window.renderAll = function () {
      var r = renderAllOriginal.apply(this, arguments);
      if (visible()) {
        var e = [CLE_DONNEES, CLE_DOCS, CLE_HIST].map(function (c) { return localStorage.getItem(c); }).join('|');
        if (e !== empreinte) rendre();
      }
      return r;
    };
  }

  // En quittant la page Compta, l'ancre #ebe disparaît ; au chargement, elle rouvre l'analyse.
  if (typeof window.showPage === 'function') {
    var showPageOriginal = window.showPage;
    window.showPage = function (id) {
      var r = showPageOriginal.apply(this, arguments);
      if (id !== 'compta' && location.hash === '#ebe') {
        try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
      }
      return r;
    };
  }
  // Après l'initialisation de la page (script.js et le script en ligne ouvrent
  // d'abord l'accueil) : sinon l'accueil reprendrait la main sur le titre et le rail.
  function ouvrirSurAncre() {
    if (location.hash === '#ebe' && el('page-compta')) {
      window.showPage('compta');
      window.toggleComptaTab('ebe');
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ouvrirSurAncre);
  else setTimeout(ouvrirSurAncre, 0);
})();
