// =============================================================================
// Analyse EBE — règles de calcul, sans DOM : utilisées par l'onglet Compta
// (ebe-module.js) et par les tests (tool/test-ebe.js).
//
// La règle des moyennes : une case « sans objet » (société pas encore créée)
// ou « n.d. » (société existante, donnée non relevée) n'entre dans AUCUN
// calcul, ni au numérateur ni au dénominateur. Un 0 est une valeur et compte.
//
// ⚠️ Aucune donnée ici : ce dépôt est public. Les montants vivent dans
// Supabase (clé v90_ebe_agregats), synchronisés comme le reste de l'app.
// =============================================================================
(function (racine, fabrique) {
  var EBE = fabrique();
  if (typeof module === 'object' && module.exports) module.exports = EBE;
  else racine.EBE = EBE;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var VALEUR = 'valeur', SANS_OBJET = 'sans_objet', ND = 'nd';
  var MESSAGE_VIDE = 'Aucun exercice retenu : élargissez la sélection.';
  var MESSAGE_COEFFICIENT = 'Coefficient invalide : saisissez un nombre, avec une virgule ou un point.';

  // Montant exploitable : un nombre fini. 0 en est un ; null, NaN, texte ou booléen non.
  function estValeur(v) { return typeof v === 'number' && isFinite(v); }

  // ── Données ────────────────────────────────────────────────────────────────
  // Contrôle la structure reçue de Supabase et ramène les exercices à des nombres.
  function normaliser(brut) {
    if (!brut || typeof brut !== 'object') throw new Error('Données EBE absentes');
    var perimetre = brut.perimetre || {};
    var exercices = (perimetre.exercices || []).map(Number).sort(function (a, b) { return a - b; });
    if (!exercices.length) throw new Error('Données EBE : aucun exercice dans le périmètre');
    var societes = (brut.societes || []).map(function (s) {
      if (!s.code || s.premier_exercice == null) throw new Error('Données EBE : société sans code ou sans premier exercice');
      var siren = String(s.siren || '').replace(/\D/g, '');
      return {
        code: String(s.code), nom: String(s.nom || s.code), siren: siren,
        siren_affiche: siren.replace(/(\d{3})(?=\d)/g, '$1 '),
        premier_exercice: Number(s.premier_exercice),
        dossier_cabinet: String(s.dossier_cabinet || '')
      };
    });
    var codes = societes.map(function (s) { return s.code; });
    var indicateurs = (brut.indicateurs || []).map(function (i) { return { code: String(i.code), nom: String(i.nom || i.code) }; });
    var valeurs = {};
    indicateurs.forEach(function (i) { valeurs[i.code] = {}; });
    Object.keys(brut.valeurs || {}).forEach(function (ind) {
      if (!valeurs[ind]) throw new Error('Données EBE : indicateur inconnu « ' + ind + ' »');
      Object.keys(brut.valeurs[ind] || {}).forEach(function (code) {
        if (codes.indexOf(code) === -1) throw new Error('Données EBE : société inconnue « ' + code + ' »');
        var parAn = {};
        var src = brut.valeurs[ind][code] || {};
        Object.keys(src).forEach(function (a) { parAn[Number(a)] = src[a]; });
        valeurs[ind][code] = parAn;
      });
    });
    return {
      perimetre: { exercices: exercices, hors_perimetre: (perimetre.hors_perimetre || []).map(Number) },
      source: String(brut.source || ''),
      societes: societes,
      indicateurs: indicateurs,
      valeurs: valeurs,
      notes: (brut.notes || []).map(String)
    };
  }

  function societe(ref, code) {
    for (var i = 0; i < ref.societes.length; i++) if (ref.societes[i].code === code) return ref.societes[i];
    throw new Error('Société « ' + code + ' » absente des données EBE');
  }

  // État d'une case. « Sans objet » prime sur tout montant saisi.
  function etatCellule(ref, indicateur, code, exercice) {
    if (exercice < societe(ref, code).premier_exercice) return { etat: SANS_OBJET, valeur: null };
    var v = ((ref.valeurs[indicateur] || {})[code] || {})[exercice];
    return estValeur(v) ? { etat: VALEUR, valeur: v } : { etat: ND, valeur: null };
  }

  // Sélection nettoyée : null = tout, [] = rien. Un exercice hors périmètre est
  // écarté : il ne se mêle jamais aux calculs du périmètre.
  function selection(ref, societes, exercices) {
    var ordre = ref.societes.map(function (s) { return s.code; });
    var socs = societes == null ? ordre : ordre.filter(function (c) { return societes.indexOf(c) !== -1; });
    var voulus = exercices == null ? null : exercices.map(Number);
    var exs = ref.perimetre.exercices.filter(function (a) { return voulus == null || voulus.indexOf(a) !== -1; });
    return { societes: socs, exercices: exs };
  }

  // ── Calculs ────────────────────────────────────────────────────────────────
  // Dénominateur = valeurs réellement présentes, jamais cases affichées.
  function statistiques(retenues) {
    if (!retenues.length) return null;
    var total = 0, min = retenues[0], max = retenues[0];
    retenues.forEach(function (x) {
      total += x.valeur;
      if (x.valeur < min.valeur) min = x;   // première occurrence en cas d'égalité
      if (x.valeur > max.valeur) max = x;
    });
    return { nb: retenues.length, total: total, moyenne: total / retenues.length, min: min, max: max };
  }

  // Cases attendues (hors « sans objet ») et cases réellement renseignées.
  function couverture(ref, indicateur, societes, exercices) {
    var attendues = 0, renseignees = 0, sansObjet = 0;
    societes.forEach(function (code) {
      exercices.forEach(function (a) {
        var c = etatCellule(ref, indicateur, code, a);
        if (c.etat === SANS_OBJET) { sansObjet++; return; }
        attendues++;
        if (c.etat === VALEUR) renseignees++;
      });
    });
    return { attendues: attendues, renseignees: renseignees, manquantes: attendues - renseignees, sans_objet: sansObjet };
  }

  function pluriel(n, mot) { return n + ' ' + mot + (n > 1 ? 's' : ''); }

  // Avis de données manquantes : seulement si des cases ATTENDUES sont vides.
  function alerte(cov, nbSocietes) {
    if (!cov.manquantes) return null;
    return {
      titre: pluriel(cov.renseignees, 'valeur') + ' sur ' + cov.attendues + ' attendue' + (cov.attendues > 1 ? 's' : '') +
        ' (' + cov.manquantes + ' non relevée' + (cov.manquantes > 1 ? 's' : '') + ')',
      corps: 'la moyenne ne porte que sur les exercices renseignés' + (nbSocietes > 1
        ? ' et rapproche des sociétés de tailles très différentes : lisez plutôt la moyenne ligne à ligne.'
        : '.')
    };
  }

  // « 4 », « 4,5 », « 4.5 » → nombre ; sinon null.
  function lireCoefficient(texte) {
    if (typeof texte === 'number') return isFinite(texte) ? texte : null;
    if (typeof texte !== 'string') return null;
    var s = texte.replace(/[\s  ]/g, '').replace(',', '.');
    return /^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(s) ? parseFloat(s) : null;
  }

  function multiplicateur(stats, base, coefficient) {
    base = base === 'total' ? 'total' : 'moyenne';
    var coef = lireCoefficient(coefficient);
    if (!stats) return { etat: 'vide', message: MESSAGE_VIDE, base: base, coefficient: coef, valeur_base: null, resultat: null, nb: 0 };
    var vb = base === 'moyenne' ? stats.moyenne : stats.total;
    if (coef === null) return { etat: 'invalide', message: MESSAGE_COEFFICIENT, base: base, coefficient: null, valeur_base: vb, resultat: null, nb: stats.nb };
    return { etat: 'ok', message: null, base: base, coefficient: coef, valeur_base: vb, resultat: vb * coef, nb: stats.nb };
  }

  // [2017, 2018, 2019, 2022] → « 2017-2019, 2022 »
  function libelleExercices(exs) {
    if (!exs.length) return 'aucun exercice';
    var plages = [], debut = exs[0], fin = exs[0];
    for (var i = 1; i < exs.length; i++) {
      if (exs[i] === fin + 1) fin = exs[i];
      else { plages.push([debut, fin]); debut = fin = exs[i]; }
    }
    plages.push([debut, fin]);
    return plages.map(function (p) { return p[0] === p[1] ? String(p[0]) : p[0] + '-' + p[1]; }).join(', ');
  }

  function libelleSocietes(ref, codes) {
    if (!codes.length) return 'aucune société';
    if (codes.length === ref.societes.length && codes.length > 1) return 'les ' + codes.length + ' sociétés';
    return codes.map(function (c) { return societe(ref, c).nom; }).join(', ');
  }

  // Indicateurs ayant au moins une valeur, avec leur couverture réelle (n sur 18).
  function indicateursDisponibles(ref) {
    var toutes = ref.societes.map(function (s) { return s.code; });
    return ref.indicateurs.map(function (i) {
      return { code: i.code, nom: i.nom, couverture: couverture(ref, i.code, toutes, ref.perimetre.exercices) };
    }).filter(function (i) { return i.couverture.renseignees > 0; });
  }

  // Tableau croisé, statistiques, couverture, alerte et multiplicateur.
  function analyser(ref, options) {
    options = options || {};
    var indicateur = options.indicateur || 'ebe';
    if (!ref.valeurs[indicateur]) throw new Error('Indicateur inconnu : « ' + indicateur + ' »');
    var sel = selection(ref, options.societes, options.exercices);
    var retenues = [];
    var lignes = sel.societes.map(function (code) {
      var deLaLigne = [];
      var cellules = sel.exercices.map(function (a) {
        var c = etatCellule(ref, indicateur, code, a);
        if (c.etat === VALEUR) deLaLigne.push({ societe: code, exercice: a, valeur: c.valeur });
        return { exercice: a, etat: c.etat, valeur: c.valeur };
      });
      var st = statistiques(deLaLigne);
      retenues = retenues.concat(deLaLigne);
      return { societe: code, cellules: cellules, moyenne: st ? st.moyenne : null, nb: st ? st.nb : 0 };
    });
    var colonnes = sel.exercices.map(function (a, i) {
      var st = statistiques(lignes.filter(function (l) { return l.cellules[i].etat === VALEUR; })
        .map(function (l) { return { societe: l.societe, exercice: a, valeur: l.cellules[i].valeur }; }));
      return { exercice: a, moyenne: st ? st.moyenne : null, nb: st ? st.nb : 0 };
    });
    var stats = statistiques(retenues);
    var cov = couverture(ref, indicateur, sel.societes, sel.exercices);
    return {
      indicateur: indicateur,
      societes: sel.societes,
      exercices: sel.exercices,
      libelle_societes: libelleSocietes(ref, sel.societes),
      libelle_exercices: libelleExercices(sel.exercices),
      lignes: lignes,
      colonnes: colonnes,
      moyenne_generale: stats ? stats.moyenne : null,
      statistiques: stats,
      couverture: cov,
      alerte: alerte(cov, sel.societes.length),
      multiplicateur: multiplicateur(stats, options.base, options.coefficient == null ? '1' : options.coefficient)
    };
  }

  return {
    VALEUR: VALEUR, SANS_OBJET: SANS_OBJET, ND: ND,
    MESSAGE_VIDE: MESSAGE_VIDE, MESSAGE_COEFFICIENT: MESSAGE_COEFFICIENT,
    estValeur: estValeur, normaliser: normaliser, societe: societe, etatCellule: etatCellule,
    selection: selection, statistiques: statistiques, couverture: couverture, alerte: alerte,
    lireCoefficient: lireCoefficient, multiplicateur: multiplicateur,
    libelleExercices: libelleExercices, libelleSocietes: libelleSocietes,
    indicateursDisponibles: indicateursDisponibles, analyser: analyser
  };
});
