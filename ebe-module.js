// =============================================================================
// Onglet Compta → sous-onglet « Analyse EBE » : trois sociétés, 2017 à 2023.
// Les calculs sont dans ebe.js ; ce fichier ne fait que l'affichage.
//
// Organisation de la vue (piste 1a) :
//   – trois onglets internes : Analyse · Scénarios · Documents ;
//   – barre de valorisation fixée en bas de l'écran, toujours visible ;
//   – tableau croisé : seuls les négatifs sont surlignés, « s.o. » / « n.d. »
//     en italique, ↗ discret en coin de case vers la page du document source.
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
  var ONGLETS = { analyse: 'Analyse', scenarios: 'Scénarios', documents: 'Documents' };

  var sel = null;          // sélection propre à la vue : indicateur, sociétés, exercices, base, coefficient
  var onglet = 'analyse';  // onglet interne ouvert
  var vue = 'tableau';     // tableau | courbes
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
  // Seuls les négatifs sont signalés : le tableau reste calme.
  function classe(v) { return v < 0 ? 'ebe-neg' : ''; }
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

      // Onglets internes + actions
      '<div class="ebe-onglets ebe-ecran">' +
        Object.keys(ONGLETS).map(function (o) {
          return '<button class="ebe-onglet" data-onglet="' + o + '" id="ebe-onglet-' + o + '">' + ONGLETS[o] + '</button>';
        }).join('') +
        '<span class="ebe-espace"></span>' +
        '<button class="tva-btn-ghost" id="ebe-copier" title="Copier le tableau pour un tableur">Copier</button>' +
        '<button class="tva-btn-ghost" id="ebe-imprimer" title="Imprimer la sélection">Imprimer</button>' +
      '</div>' +

      // Onglet Analyse
      '<div id="ebe-vue-analyse" class="ebe-vue">' +
        '<div class="card ebe-controles ebe-ecran">' +
          '<div class="ebe-ligne-indicateur"><label for="ebe-indicateur" class="section-title">Indicateur</label>' +
            '<select id="ebe-indicateur"></select><span class="ebe-indice" id="ebe-indice"></span></div>' +
          '<div><div class="ebe-tete"><span class="section-title">Sociétés</span><button class="ebe-lien" data-tout="societes">toutes</button></div>' +
            '<div class="ebe-puces" id="ebe-societes"></div></div>' +
          '<div><div class="ebe-tete"><span class="section-title">Exercices</span><button class="ebe-lien" data-tout="exercices">tous</button></div>' +
            '<div class="ebe-puces" id="ebe-exercices"></div></div>' +
        '</div>' +
        '<div id="ebe-alerte"></div>' +
        '<div class="ebe-tuiles" id="ebe-tuiles"></div>' +
        '<div class="card ebe-carte-tableau" id="ebe-carte-tableau">' +
          '<div class="ebe-carte-tete"><span class="section-title" id="ebe-titre-tableau">Tableau croisé</span><span class="ebe-espace"></span>' +
            '<div class="ebe-segment ebe-ecran"><button data-vue="tableau" id="ebe-vue-tableau">Tableau</button>' +
            '<button data-vue="courbes" id="ebe-vue-courbes">Courbes</button></div></div>' +
          '<div id="ebe-tableau"></div>' +
          '<div id="ebe-graphe" class="ebe-graphe"></div>' +
          '<div class="ebe-legende">' +
            '<span><i class="ebe-pastille ebe-neg"></i>négatif</span>' +
            '<span><i>n.d.</i> et <i>s.o.</i> (sans objet) : jamais comptés dans les moyennes</span>' +
            '<span class="ebe-ecran">↗ page du document source</span></div>' +
        '</div>' +
      '</div>' +

      // Onglet Scénarios
      '<div id="ebe-vue-scenarios" class="ebe-vue ebe-ecran"><div id="ebe-historique"></div></div>' +

      // Onglet Documents
      '<div id="ebe-vue-documents" class="ebe-vue ebe-ecran"><div id="ebe-documents"></div></div>' +

      // Barre de valorisation, fixée en bas
      '<div class="ebe-valo ebe-ecran" id="ebe-valo">' +
        '<div class="ebe-segment"><button data-base="moyenne" id="ebe-base-moyenne">Moyenne</button>' +
          '<button data-base="total" id="ebe-base-total">Total</button></div>' +
        '<div class="ebe-formule">' +
          '<div class="ebe-formule-ligne"><span id="ebe-valo-base">—</span><span class="ebe-op">×</span>' +
            '<input id="ebe-coef" type="text" inputmode="decimal" autocomplete="off" aria-label="Coefficient">' +
            '<span class="ebe-op">=</span><b class="ebe-resultat" id="ebe-valo-resultat">—</b></div>' +
          '<div class="ebe-valo-note" id="ebe-valo-note"></div>' +
        '</div>' +
        '<input id="ebe-libelle" type="text" maxlength="120" placeholder="Libellé du scénario" aria-label="Libellé du scénario">' +
        '<button class="btn btn-gold" id="ebe-enregistrer" style="width:auto">Enregistrer</button>' +
      '</div>' +

      '<div class="ebe-impression ebe-pied-impression" id="ebe-pied"></div>';

    brancher();
    el('ebe-coef').value = sel.coefficient;
    ouvrirOnglet(onglet);
    choisirVue(vue);
    dessiner();
    dessinerDocuments();
  }

  function ouvrirOnglet(o) {
    onglet = ONGLETS[o] ? o : 'analyse';
    Object.keys(ONGLETS).forEach(function (x) {
      el('ebe-onglet-' + x).classList.toggle('actif', x === onglet);
      el('ebe-onglet-' + x).setAttribute('aria-selected', x === onglet);
      el('ebe-vue-' + x).style.display = x === onglet ? '' : 'none';
    });
    // Copier / Imprimer ne concernent que l'analyse.
    el('ebe-copier').style.visibility = el('ebe-imprimer').style.visibility = onglet === 'analyse' ? '' : 'hidden';
    if (onglet === 'scenarios' && analyse) dessinerHistorique();
  }

  function choisirVue(v) {
    vue = v === 'courbes' ? 'courbes' : 'tableau';
    el('ebe-carte-tableau').dataset.vue = vue;
    el('ebe-vue-tableau').classList.toggle('actif', vue === 'tableau');
    el('ebe-vue-courbes').classList.toggle('actif', vue === 'courbes');
  }

  function dessiner() {
    analyse = EBE.analyser(ref, sel);
    dessinerControles();
    var a = analyse;
    el('ebe-alerte').innerHTML = a.alerte ? avis('run', a.alerte.titre, esc(a.alerte.corps)) : '';
    dessinerTuiles();
    dessinerTableau();
    el('ebe-graphe').innerHTML = graphe();
    dessinerValorisation();
    dessinerImpression();
    if (onglet === 'scenarios') dessinerHistorique();
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
      return '<option value="' + esc(i.code) + '"' + (i.code === sel.indicateur ? ' selected' : '') + '>' + esc(i.nom) + '</option>';
    }).join('');
    var i = dispo.filter(function (x) { return x.code === sel.indicateur; })[0];
    var p = ref.perimetre.exercices;
    el('ebe-indice').textContent = !i ? '' : i.couverture.manquantes
      ? i.couverture.renseignees + ' valeurs sur ' + i.couverture.attendues + ' attendues · ' + p[0] + '-' + p[p.length - 1]
      : i.couverture.attendues + ' valeurs, complet · ' + p[0] + '-' + p[p.length - 1];
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
      tuile('Moyenne', montant(st.moyenne), plur(st.nb, 'exercice') + ' retenu' + (st.nb > 1 ? 's' : ''), classe(st.moyenne)),
      tuile('Total cumulé', montant(st.total), st.nb > 1 ? 'somme des ' + st.nb + ' exercices' : 'un seul exercice', classe(st.total)),
      tuile('Minimum', montant(st.min.valeur), ou(st.min), classe(st.min.valeur)),
      tuile('Maximum', montant(st.max.valeur), ou(st.max), classe(st.max.valeur))
    ].join('') : [
      tuile('Moyenne', '—', 'aucun exercice retenu'), tuile('Total cumulé', '—'), tuile('Minimum', '—'), tuile('Maximum', '—')
    ].join('');
  }

  function dessinerTableau() {
    var a = analyse, zone = el('ebe-tableau');
    el('ebe-titre-tableau').textContent = 'Tableau croisé — ' + nomInd(a.indicateur);
    if (!a.societes.length || !a.exercices.length) {
      zone.innerHTML = '<div class="ebe-vide-bloc">Sélectionnez au moins une société et un exercice</div>';
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
      if (c.etat === EBE.SANS_OBJET) return '<td class="ebe-d ebe-vide" title="sans objet">s.o.</td>';
      if (c.etat === EBE.ND) return '<td class="ebe-d ebe-vide" title="non disponible">n.d.</td>';
      return '<td class="ebe-d ' + classe(c.valeur) + '">' + plus(c.valeur) + montant(c.valeur) + lien(code, c.exercice) + '</td>';
    };
    var moyenne = function (v) { return '<td class="ebe-d ebe-moy ' + (v == null ? '' : classe(v)) + '">' + (v == null ? '—' : plus(v) + montant(v)) + '</td>'; };
    zone.innerHTML = '<div class="ebe-defile"><table class="tva-table ebe-croise"><thead><tr><th>Société</th>' +
      a.exercices.map(function (x) { return '<th class="ebe-d">' + x + '</th>'; }).join('') + '<th class="ebe-d ebe-moy">Moy.</th></tr></thead><tbody>' +
      a.lignes.map(function (l) {
        return '<tr><td><i class="ebe-pastille ebe-serie-' + serie(l.societe) + '"></i>' + esc(nomSoc(l.societe)) + '</td>' +
          l.cellules.map(function (c) { return cellule(c, l.societe); }).join('') + moyenne(l.moyenne) + '</tr>';
      }).join('') +
      '<tr class="ebe-total"><td>Moy. par exercice</td>' + a.colonnes.map(function (c) { return moyenne(c.moyenne); }).join('') +
      moyenne(a.moyenne_generale) + '</tr></tbody></table></div>';
  }

  // Une courbe par société ; une case sans valeur ROMPT la courbe, jamais d'interpolation.
  function graphe() {
    var a = analyse, points = [];
    a.lignes.forEach(function (l) { l.cellules.forEach(function (c) { if (c.etat === EBE.VALEUR) points.push(c.valeur); }); });
    if (!points.length) return '<div class="ebe-vide-bloc">Rien à tracer pour cette sélection</div>';
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
    return '<div class="ebe-legende ebe-legende-courbes">' + a.lignes.map(function (l) {
      return '<span><i class="ebe-trait ebe-serie-' + serie(l.societe) + '"></i>' + esc(nomSoc(l.societe)) + '</span>';
    }).join('') + '<span>une courbe interrompue signale un exercice sans valeur</span></div>' +
      '<svg class="ebe-svg" viewBox="0 0 ' + L + ' ' + H + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Évolution par société">' + s + '</svg>';
  }

  // ── Barre de valorisation ──────────────────────────────────────────────────
  function dessinerValorisation() {
    var a = analyse, m = a.multiplicateur;
    el('ebe-coef').setAttribute('aria-invalid', m.etat === 'invalide' ? 'true' : 'false');
    el('ebe-enregistrer').disabled = m.etat !== 'ok';
    el('ebe-base-moyenne').classList.toggle('actif', sel.base === 'moyenne');
    el('ebe-base-total').classList.toggle('actif', sel.base === 'total');
    var base = el('ebe-valo-base'), res = el('ebe-valo-resultat'), note = el('ebe-valo-note');
    var vb = m.valeur_base != null && isFinite(m.valeur_base) ? m.valeur_base : (a.statistiques ? (sel.base === 'moyenne' ? a.statistiques.moyenne : a.statistiques.total) : null);
    base.textContent = montant(vb);
    base.className = classe(vb);
    res.textContent = m.etat === 'ok' ? montant(m.resultat) : '—';
    res.className = 'ebe-resultat ' + (m.etat === 'ok' ? classe(m.resultat) : '');
    note.classList.toggle('ebe-ko', m.etat === 'invalide');
    note.textContent = m.etat === 'ok'
      ? nomInd(a.indicateur) + ' · ' + a.libelle_societes + ' · ' + a.libelle_exercices + ' · ' + plur(m.nb, 'exercice') + ' renseigné' + (m.nb > 1 ? 's' : '')
      : (m.message || '');
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
        ? '<dt>Valorisation</dt><dd>' + (m.base === 'moyenne' ? 'moyenne' : 'total cumulé') + ' ' + montant(m.valeur_base) + ' × ' + coef(m.coefficient) + ' = <b>' + montant(m.resultat) + '</b></dd>' : '') +
      '</dl>';
    el('ebe-pied').innerHTML = '<span>Source : ' + esc(ref.source) + ' — ' +
      ref.societes.map(function (s) { return esc(s.nom) + ' ' + esc(s.siren_affiche); }).join(' · ') + '</span><span>' + date + '</span>';
  }

  // ── Onglet Scénarios ───────────────────────────────────────────────────────
  function valorisations() { var v = lire(CLE_HIST); return Array.isArray(v) ? v : []; }

  function dessinerHistorique() {
    var zone = el('ebe-historique'), liste = valorisations(), actuel = analyse.multiplicateur;
    el('ebe-onglet-scenarios').textContent = 'Scénarios' + (liste.length ? ' (' + liste.length + ')' : '');
    if (!liste.length) {
      zone.innerHTML = '<div class="card ebe-vide-bloc">Aucun scénario enregistré — réglez le coefficient dans la barre du bas, puis « Enregistrer ».</div>';
      return;
    }
    zone.innerHTML = '<div class="card ebe-carte-tableau">' +
      '<div class="ebe-carte-tete"><span class="section-title">Scénarios enregistrés</span><span class="ebe-espace"></span>' +
        '<span class="ebe-note">écart mesuré au calcul de la barre du bas</span></div>' +
      '<div class="ebe-defile"><table class="tva-table ebe-scenarios"><thead><tr><th>Scénario</th>' +
      '<th class="ebe-d">Base</th><th class="ebe-d">Coef.</th><th class="ebe-d">Résultat</th><th class="ebe-d">Écart</th><th></th></tr></thead><tbody>' +
      liste.map(function (v) {
        var refait = null;
        try { refait = EBE.analyser(ref, v).multiplicateur.resultat; } catch (e) {}
        var modifie = refait == null || Math.abs(refait - v.resultat) > 0.005;
        var ecart = actuel.etat === 'ok' ? v.resultat - actuel.resultat : null;
        return '<tr><td><div class="ebe-scenario-titre">' + (v.libelle ? esc(v.libelle) : '<span class="ebe-note">sans libellé</span>') +
            (modifie ? ' <span class="badge-statut badge-attente">données modifiées</span>' : '') + '</div>' +
            '<div class="ebe-note">' + esc(nomInd(v.indicateur)) + ' · ' + esc(EBE.libelleSocietes(ref, v.societes.filter(function (c) { return serie(c) > 0; }))) +
            ' · ' + esc(EBE.libelleExercices(v.exercices)) + ' · ' + plur(v.nb_valeurs, 'exercice') + ' · ' + esc(new Date(v.cree_le).toLocaleDateString('fr-FR')) + '</div></td>' +
          '<td class="ebe-d">' + montant(v.valeur_base) + '<div class="ebe-note">' + (v.base === 'moyenne' ? 'moyenne' : 'total cumulé') + '</div></td>' +
          '<td class="ebe-d">× ' + coef(v.coefficient) + '</td>' +
          '<td class="ebe-d"><b class="' + classe(v.resultat) + '">' + montant(v.resultat) + '</b></td>' +
          '<td class="ebe-d ' + (ecart == null ? '' : ecart < 0 ? 'ebe-ecart-neg' : 'ebe-ecart-pos') + '">' + (ecart == null ? '—' : (ecart > 0 ? '+' : '') + montant(ecart)) + '</td>' +
          '<td class="ebe-d ebe-actions-ligne"><button class="tva-btn-ghost" data-recharger="' + esc(v.id) + '">Recharger</button>' +
            '<button class="ebe-croix" data-supprimer="' + esc(v.id) + '" title="Supprimer" aria-label="Supprimer">✕</button></td></tr>';
      }).join('') + '</tbody></table></div></div>';
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
    toast('💾 Scénario enregistré : ' + montant(m.resultat), 'success');
    empreinte = null;
    dessinerHistorique();
  }

  // ── Onglet Documents ───────────────────────────────────────────────────────
  function docParId(id) { return (docs.documents || []).filter(function (d) { return d.id === id; })[0] || null; }

  // Lien signé de courte durée vers le PDF du stockage privé « comptes-annuels ».
  function ouvrirDocument(d, page) {
    if (!d || !d.chemin) { toast('📄 Document référencé mais introuvable dans le stockage.', 'error'); return; }
    // La fenêtre s'ouvre tout de suite : Safari bloque celles ouvertes après une attente réseau.
    var fenetre = window.open('', '_blank');
    fetch(SUPA_URL + '/storage/v1/object/sign/' + STOCKAGE + '/' + d.chemin.split('/').map(encodeURIComponent).join('/'), {
      method: 'POST', headers: Supa._h, body: JSON.stringify({ expiresIn: 600 })
    }).then(function (r) { return r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status)); })
      .then(function (j) {
        if (fenetre) fenetre.location.href = SUPA_URL + '/storage/v1' + j.signedURL + (page ? '#page=' + page : '');
      })
      .catch(function () {
        if (fenetre) fenetre.close();
        toast('📄 Document référencé mais introuvable dans le stockage (ou connexion indisponible).', 'error');
      });
  }

  // Grille société × exercice : une pastille d'état par case (elle ouvre les
  // comptes annuels), les autres documents de l'exercice en dessous.
  function dessinerDocuments() {
    var zone = el('ebe-documents'), liste = docs.documents || [];
    if (!liste.length) {
      zone.innerHTML = avis('run', 'Aucun document indexé', 'l\'index des PDF (clé v90_ebe_documents) n\'est pas encore arrivé sur cet appareil.');
      return;
    }
    var hors = ref.perimetre.hors_perimetre, annees = ref.perimetre.exercices.concat(hors);
    var estComptes = function (d) { return d.type === 'comptes_annuels' && !d.exercice_court && d.statut === 'ok'; };
    var pastille = function (s, x, docsAn) {
      if (x < s.premier_exercice) return '<span class="ebe-note"><i>s.o.</i></span>';
      var comptes = docsAn.filter(estComptes);
      if (!comptes.length) return '<span class="badge-statut badge-attente">absents</span>';
      var d = comptes.filter(function (c) { return c.chemin; })[0];
      if (!d) return '<span class="badge-statut badge-retard">introuvables</span>';
      return '<a href="#" class="badge-statut badge-payee" data-ouvrir="' + esc(d.id) + '" title="Ouvrir les comptes annuels ' + x + ' — ' + esc(s.nom) + '">disponibles</a>';
    };
    var autres = function (docsAn) {
      var l = docsAn.filter(function (d) { return !estComptes(d); });
      if (!l.length) return '';
      return '<div class="ebe-doc-autres">' + l.map(function (d) {
        var lib = TYPES[d.type] || 'Document';
        var titre = lib + (d.exercice_court ? ', exercice court' : '') + (d.statut === 'a_verifier' ? ' — à vérifier : ' + (d.remarque || '') : '') + (d.chemin ? '' : ' — introuvable dans le stockage');
        return '<a href="#" data-ouvrir="' + esc(d.id) + '" class="' + (d.statut === 'a_verifier' ? 'ebe-doc-verif' : '') + (d.chemin ? '' : ' ebe-doc-absent') + '" title="' + esc(titre) + '">' +
          esc(lib) + (d.exercice_court ? ' (court)' : '') + '</a>';
      }).join('') + '</div>';
    };
    var aVerifier = liste.filter(function (d) { return d.statut === 'a_verifier'; });
    var h = '<div class="card ebe-carte-tableau">' +
      '<div class="ebe-carte-tete"><span class="section-title">Comptes annuels par exercice</span><span class="ebe-espace"></span>' +
        '<span class="ebe-note">toucher une case ouvre le PDF</span></div>' +
      '<div class="ebe-defile"><table class="tva-table ebe-documents"><thead><tr><th>Société</th>' +
      annees.map(function (x) { return '<th class="ebe-c">' + x + (hors.indexOf(x) !== -1 ? '<div class="ebe-hors">hors périmètre</div>' : '') + '</th>'; }).join('') +
      '</tr></thead><tbody>';
    ref.societes.forEach(function (s) {
      h += '<tr><td><i class="ebe-pastille ebe-serie-' + serie(s.code) + '"></i>' + esc(s.nom) + '<div class="ebe-note">SIREN ' + esc(s.siren_affiche) + '</div></td>';
      annees.forEach(function (x) {
        var docsAn = liste.filter(function (d) { return d.societe === s.code && d.exercice === x; });
        h += '<td class="ebe-c">' + pastille(s, x, docsAn) + autres(docsAn) + '</td>';
      });
      h += '</tr>';
    });
    h += '</tbody></table></div></div>';
    if (aVerifier.length) {
      h += avis('run', plur(aVerifier.length, 'document') + ' à vérifier', aVerifier.map(function (d) {
        return '<a href="#" data-ouvrir="' + esc(d.id) + '">' + esc((TYPES[d.type] || 'document').toLowerCase()) + ' ' + d.exercice + '</a>, classé sous ' + esc(nomSoc(d.societe)) + ' : ' + esc(d.remarque || '');
      }).join(' ; '));
    }
    zone.innerHTML = h;
  }

  // ── Événements ─────────────────────────────────────────────────────────────
  function brancher() {
    var hote = el('ebe-contenu');
    var basculer = function (liste, v) { var i = liste.indexOf(v); if (i >= 0) liste.splice(i, 1); else liste.push(v); };
    hote.onclick = function (e) {
      var c = e.target.closest ? e.target : null;
      if (!c) return;
      var t;
      if ((t = c.closest('[data-onglet]'))) { ouvrirOnglet(t.dataset.onglet); return; }
      if ((t = c.closest('[data-vue]'))) { choisirVue(t.dataset.vue); return; }
      if ((t = c.closest('[data-base]'))) { sel.base = t.dataset.base; dessiner(); return; }
      if ((t = c.closest('[data-societe]'))) { basculer(sel.societes, t.dataset.societe); dessiner(); return; }
      if ((t = c.closest('[data-exercice]'))) { basculer(sel.exercices, Number(t.dataset.exercice)); dessiner(); return; }
      if ((t = c.closest('[data-tout]'))) {
        sel[t.dataset.tout] = t.dataset.tout === 'societes' ? ref.societes.map(function (s) { return s.code; }) : ref.perimetre.exercices.slice();
        dessiner(); return;
      }
      if ((t = c.closest('[data-doc]'))) { e.preventDefault(); ouvrirDocument(docParId(t.dataset.doc), Number(t.dataset.page)); return; }
      if ((t = c.closest('[data-ouvrir]'))) { e.preventDefault(); ouvrirDocument(docParId(t.dataset.ouvrir)); return; }
      if ((t = c.closest('[data-recharger]'))) {
        var v = valorisations().filter(function (x) { return x.id === t.dataset.recharger; })[0];
        if (!v) return;
        sel = { indicateur: v.indicateur, societes: v.societes.slice(), exercices: v.exercices.slice(), base: v.base,
                coefficient: coef(v.coefficient).replace(/\s/g, '') };
        el('ebe-coef').value = sel.coefficient;
        dessiner();
        ouvrirOnglet('analyse');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        toast('Scénario rechargé : ' + (v.libelle || 'sans libellé'), 'success');
        return;
      }
      if ((t = c.closest('[data-supprimer]'))) {
        var id = t.dataset.supprimer, cible = valorisations().filter(function (x) { return x.id === id; })[0];
        if (!cible || !confirm('Supprimer le scénario' + (cible.libelle ? ' « ' + cible.libelle + ' »' : '') + ' ?')) return;
        G.set(CLE_HIST, valorisations().filter(function (x) { return x.id !== id; }));
        toast('Scénario supprimé', 'success');
        dessinerHistorique();
      }
    };
    el('ebe-indicateur').onchange = function (e) { sel.indicateur = e.target.value; dessiner(); };
    el('ebe-coef').oninput = function (e) {
      sel.coefficient = e.target.value;
      clearTimeout(minuteur);
      minuteur = setTimeout(function () { if (visible()) dessiner(); }, 120);
    };
    el('ebe-libelle').onkeydown = function (e) { if (e.key === 'Enter' && !el('ebe-enregistrer').disabled) enregistrer(); };
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
  // L'impression sort toujours l'analyse (tableau + courbes), quel que soit l'onglet ouvert.
  window.addEventListener('beforeprint', function () {
    if (visible()) document.body.classList.add('impression-ebe');
  });
  window.addEventListener('afterprint', function () {
    document.body.classList.remove('impression-ebe');
  });

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
