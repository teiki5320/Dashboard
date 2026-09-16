#!/usr/bin/env node
// =============================================================================
// Tests de l'Analyse EBE (ebe.js) — aucune dépendance, runner intégré à Node.
//
//   node --test tool/test-ebe.js
//   EBE_DONNEES=/chemin/ebe-agregats.json node --test tool/test-ebe.js
//
// Les règles sont testées sur un jeu FICTIF de même forme que les vraies
// données (3 sociétés créées en 2017, 2018 et 2019). Les valeurs de contrôle
// réelles ne sont PAS écrites ici — le dépôt est public : elles sont lues dans
// le fichier désigné par EBE_DONNEES (section « controle »), sinon ces tests
// sont sautés.
// =============================================================================
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const EBE = require(path.join(__dirname, '..', 'ebe.js'));

// Arrondi au centime comme l'affichage (Intl : demi vers l'extérieur).
const cts = v => (Math.sign(v) * Math.round(Math.abs(v) * 100 + 1e-9) / 100).toFixed(2);

const FICTIF = {
  perimetre: { exercices: [2017, 2018, 2019, 2020], hors_perimetre: [2024] },
  source: 'jeu fictif',
  societes: [
    { code: 'a', nom: 'Société A', siren: '111111111', premier_exercice: 2017 },
    { code: 'b', nom: 'Société B', siren: '222222222', premier_exercice: 2018 },
    { code: 'c', nom: 'Société C', siren: '333333333', premier_exercice: 2019 }
  ],
  indicateurs: [{ code: 'ebe', nom: 'EBE' }, { code: 'ca', nom: 'CA' }, { code: 'vide', nom: 'Vide' }],
  valeurs: {
    ebe: { a: { 2017: 100, 2018: 300, 2019: -50, 2020: 10 }, b: { 2018: 20, 2019: -40, 2020: 5 }, c: { 2019: -200, 2020: 70 } },
    ca: { a: { 2017: 1000, 2018: 1100, 2019: 900, 2020: 950 }, b: { 2018: 40, 2019: 50 }, c: { 2019: 300 } },
    vide: {}
  }
};
const REF = EBE.normaliser(FICTIF);
const avec = (ind, code, an, v, premier) => {
  const brut = JSON.parse(JSON.stringify(FICTIF));
  brut.valeurs[ind][code] = brut.valeurs[ind][code] || {};
  brut.valeurs[ind][code][an] = v;
  if (premier != null) brut.societes.find(s => s.code === code).premier_exercice = premier;
  return EBE.normaliser(brut);
};

// ── Les règles, sur le jeu fictif ────────────────────────────────────────────
test('1. sélection complète : seules les valeurs présentes comptent', () => {
  const st = EBE.analyser(REF, { indicateur: 'ebe' }).statistiques;
  assert.equal(st.nb, 9);                                      // 12 cases affichées, 3 sans objet
  assert.equal(st.total, 215);
  assert.equal(cts(st.moyenne), cts(215 / 9));
  assert.deepEqual([st.min.valeur, st.min.societe, st.min.exercice], [-200, 'c', 2019]);
  assert.deepEqual([st.max.valeur, st.max.societe, st.max.exercice], [300, 'a', 2018]);
});

test('2. couverture complète : dénominateur hors « sans objet », pas d\'alerte', () => {
  const a = EBE.analyser(REF, { indicateur: 'ebe' });
  assert.deepEqual([a.couverture.renseignees, a.couverture.attendues, a.couverture.sans_objet], [9, 9, 3]);
  assert.equal(a.alerte, null);
});

test('3. couverture incomplète : alerte « X valeurs sur Y attendues (Z non relevées) »', () => {
  const a = EBE.analyser(REF, { indicateur: 'ca' });
  assert.deepEqual([a.couverture.renseignees, a.couverture.attendues], [7, 9]);
  assert.equal(a.alerte.titre, '7 valeurs sur 9 attendues (2 non relevées)');
  assert.match(a.alerte.corps, /ligne à ligne/);
});

test('4. une société avant sa création, seule : sans objet, aucun calcul, tiret', () => {
  const a = EBE.analyser(REF, { indicateur: 'ebe', societes: ['b'], exercices: [2017] });
  assert.deepEqual(a.lignes[0].cellules, [{ exercice: 2017, etat: EBE.SANS_OBJET, valeur: null }]);
  assert.equal(a.statistiques, null);
  assert.equal(a.lignes[0].moyenne, null);
  assert.equal(a.colonnes[0].moyenne, null);
  assert.equal(a.moyenne_generale, null);
  assert.equal(a.alerte, null);
  assert.doesNotMatch(JSON.stringify(a), /NaN|Infinity/);
});

test('5. deux cases sans objet : couverture 0 sur 0, pas d\'alerte', () => {
  const a = EBE.analyser(REF, { indicateur: 'ebe', societes: ['c'], exercices: [2017, 2018] });
  assert.deepEqual(a.lignes[0].cellules.map(c => c.etat), [EBE.SANS_OBJET, EBE.SANS_OBJET]);
  assert.deepEqual([a.couverture.renseignees, a.couverture.attendues], [0, 0]);
  assert.equal(a.alerte, null);
});

test('6. une seule valeur : moyenne = cette valeur, alerte affichée', () => {
  const a = EBE.analyser(REF, { indicateur: 'ca', societes: ['b'], exercices: [2019, 2020] });
  assert.equal(a.statistiques.nb, 1);
  assert.equal(a.statistiques.moyenne, 50);
  assert.deepEqual([a.couverture.renseignees, a.couverture.attendues, a.couverture.manquantes], [1, 2, 1]);
  assert.equal(a.alerte.titre, '1 valeur sur 2 attendues (1 non relevée)');
  assert.doesNotMatch(a.alerte.corps, /ligne à ligne/);        // une seule société
});

test('7. multiplicateur sur sélection vide : un message, ni NaN ni 0 €', () => {
  for (const [s, e] of [[[], null], [null, []], [['b'], [2017]]]) {
    const m = EBE.analyser(REF, { indicateur: 'ebe', societes: s, exercices: e, coefficient: '5' }).multiplicateur;
    assert.equal(m.etat, 'vide');
    assert.equal(m.message, EBE.MESSAGE_VIDE);
    assert.equal(m.resultat, null);
    assert.equal(m.valeur_base, null);
  }
});

test('8. un 0 est une valeur : il fait passer le compte de 9 à 10', () => {
  const st = EBE.analyser(avec('ebe', 'c', 2018, 0, 2018), { indicateur: 'ebe' }).statistiques;
  assert.equal(st.nb, 10);
  assert.equal(st.total, 215);
  const a = EBE.analyser(avec('ca', 'b', 2020, 0), { indicateur: 'ca' });
  assert.deepEqual([a.statistiques.nb, a.couverture.renseignees], [8, 8]);
});

// ── Garde-fous ───────────────────────────────────────────────────────────────
test('null, NaN, infini, texte et booléen ne comptent pas', () => {
  for (const v of [null, NaN, Infinity, '12', true]) {
    assert.equal(EBE.analyser(avec('ca', 'b', 2020, v), { indicateur: 'ca' }).statistiques.nb, 7);
  }
});

test('un montant saisi sur une case sans objet est ignoré', () => {
  const a = EBE.analyser(avec('ebe', 'c', 2017, 999999), { indicateur: 'ebe' });
  assert.equal(a.statistiques.nb, 9);
  assert.equal(a.lignes[2].cellules[0].etat, EBE.SANS_OBJET);
});

test('un exercice hors périmètre ne contamine pas les moyennes', () => {
  const a = EBE.analyser(avec('ebe', 'a', 2024, 5e6), { indicateur: 'ebe', exercices: [2017, 2018, 2019, 2020, 2024] });
  assert.deepEqual(a.exercices, [2017, 2018, 2019, 2020]);
  assert.equal(a.statistiques.total, 215);
});

test('moyennes par ligne et par colonne', () => {
  const a = EBE.analyser(REF, { indicateur: 'ebe' });
  assert.deepEqual([a.lignes[1].nb, cts(a.lignes[1].moyenne)], [3, cts(-15 / 3)]);
  assert.deepEqual([a.colonnes[0].nb, a.colonnes[0].moyenne], [1, 100]);
});

test('coefficient : virgule acceptée, saisie invalide signalée sans casser le calcul', () => {
  const cas = { '4': 4, '4,5': 4.5, ' 4.5 ': 4.5, '-2': -2, 'x3': null, '': null, '1,5,3': null, 'NaN': null, '1e3': null };
  for (const [t, v] of Object.entries(cas)) assert.equal(EBE.lireCoefficient(t), v, t);
  const a = EBE.analyser(REF, { indicateur: 'ebe', coefficient: 'abc' });
  assert.equal(a.multiplicateur.etat, 'invalide');
  assert.equal(a.statistiques.nb, 9);
  assert.equal(EBE.analyser(REF, { indicateur: 'ebe', base: 'total', coefficient: '4,5' }).multiplicateur.resultat, 215 * 4.5);
});

test('sélecteur d\'indicateur : couverture réelle, indicateur vide masqué', () => {
  const liste = EBE.indicateursDisponibles(REF);
  assert.deepEqual(liste.map(i => [i.code, i.couverture.renseignees, i.couverture.attendues]), [['ebe', 9, 9], ['ca', 7, 9]]);
});

test('libellés', () => {
  assert.equal(EBE.libelleExercices([2017, 2018, 2019, 2022]), '2017-2019, 2022');
  assert.equal(EBE.libelleSocietes(REF, ['a', 'b', 'c']), 'les 3 sociétés');
  assert.throws(() => EBE.analyser(REF, { indicateur: 'marge' }));
});

// ── Valeurs de contrôle réelles (fichier hors dépôt) ─────────────────────────
const fichier = process.env.EBE_DONNEES;
const reel = fichier && fs.existsSync(fichier) ? JSON.parse(fs.readFileSync(fichier, 'utf8')) : null;

test('valeurs de contrôle des vraies données', { skip: reel ? false : 'EBE_DONNEES non renseigné' }, () => {
  const ref = EBE.normaliser(reel);
  for (const [ind, attendu] of Object.entries(reel.controle)) {
    const a = EBE.analyser(ref, { indicateur: ind });
    const st = a.statistiques;
    console.log(`  ${ind.padEnd(4)} ${st.nb} sur ${a.couverture.attendues}  total ${cts(st.total)}  moyenne ${cts(st.moyenne)}`);
    assert.equal(st.nb, attendu.nb, ind);
    assert.equal(a.couverture.attendues, attendu.attendues, ind);
    assert.equal(a.alerte === null, attendu.nb === attendu.attendues, ind);
    if (attendu.total) assert.equal(cts(st.total), attendu.total, ind);
    if (attendu.moyenne) assert.equal(cts(st.moyenne), attendu.moyenne, ind);
    if (attendu.min) assert.deepEqual([st.min.valeur, st.min.societe, st.min.exercice], attendu.min, ind);
    if (attendu.max) assert.deepEqual([st.max.valeur, st.max.societe, st.max.exercice], attendu.max, ind);
  }
  // Matevie seule en 2017 : « sans objet », pas « n.d. »
  const m = EBE.analyser(ref, { indicateur: 'ebe', societes: ['matevie'], exercices: [2017] });
  assert.equal(m.lignes[0].cellules[0].etat, EBE.SANS_OBJET);
  assert.equal(m.statistiques, null);
});
