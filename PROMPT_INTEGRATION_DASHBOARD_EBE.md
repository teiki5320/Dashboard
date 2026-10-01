# Intégrer un module « Analyse EBE » dans le dashboard Comptabilité

## Contexte du projet

Le dashboard est l'application `~/Documents/Comptabilite/compta/`. Ce que j'en sais :

- **Backend** : paquet Python `compta/` (stdlib, pas de framework web), serveur HTTP dans
  `compta/serveur.py`, base **SQLite** `data/compta.db`, config `societes.yaml` et `regles.yaml`.
  Lancement : `python3 -m compta interface` → `http://localhost:8765`.
- **Frontend** : **une seule page**, `compta/web/index.html` (~2 150 lignes), HTML + CSS + JS
  vanille, **aucun framework, aucun build, aucune dépendance CDN**. Tout est inline.
- **Navigation** : barre latérale gauche avec des groupes (`.nav-group` + `.lbl`) et des entrées
  `<div class="nav-item" data-vue="…">`. Le groupe qui m'intéresse est celui intitulé
  **« Comptabilité »** (c'est ce que j'appelle l'onglet compta) : `reprise`, `journal`, `balance`,
  `grandlivre`, `resultat`, `bilan`.
- **Routage** : `location.hash` → `allerA(nom)` → `rendreVue()`. Chaque écran est un objet
  `Vues.<nom> = { titre: "…", async rendre(hote) { … } }` enregistré sur l'objet `Vues`.
- **Sociétés** (`societes.yaml`, codes utilisés partout dans l'app) :
  `scea` = SCEA TERRES ET VIE (SIRET 48062702500012), `matevie` = SARL MATEVIE
  (83283972400016), `groupe` = SARL GROUPE MATEVIE (84459128900013).
- **API** : `GET /api/etat`, puis `/api/societe/<code>/<ressource>` via les helpers JS `url()`,
  `api()`, `poster()`.

**Commence par vérifier tout cela dans le code** — ma description peut être datée.

---

## Phase 1 — Inspection obligatoire avant toute écriture de code

Ne produis aucune ligne de code avant d'avoir lu et résumé :

1. `compta/web/index.html` en entier — en particulier : la structure `Vues`, `rendreVue()`,
   `allerA()`, `chargerEtat()`, les helpers `eur()`, `eurCourt()`, `echelleRonde()`, `signe()`,
   `dateFr()`, `ech()`, `avis()`, `toast()`, la fonction qui fabrique les tuiles, et **une vue
   existante prise comme modèle** (`Vues.balance` ou `Vues.resultat` : elles sont proches de ce
   que je demande).
2. `compta/compta/serveur.py` — comment les routes sont déclarées, comment un fichier est servi,
   comment une réponse JSON est construite, comment les erreurs remontent.
3. `compta/compta/db.py` et le schéma SQLite — pour savoir si les agrégats annuels et un
   historique ont leur place en base plutôt qu'ailleurs.
4. `compta/compta/dashboard.py`, `rapports.py`, `exports.py` — pour ne pas réimplémenter
   l'existant.
5. `~/Desktop/DOSSIER COMPTA/BILANS TOUTES SOCIETES/EBE_ANALYSE.html` — la maquette autonome dont
   je veux reprendre la logique. Le jeu de données est reproduit plus bas, mais lis le fichier
   pour la logique de calcul, le libellé des messages et le comportement de l'impression.

Puis **dis-moi ce que tu as trouvé et ce que tu comptes faire**, avant d'écrire.

### Règle de style, non négociable

Tu **t'intègres** à l'existant, tu n'introduis **aucun nouveau système de design**.
Concrètement : pas de framework, pas de CDN, pas de dépendance JS, pas de build, pas de fichier
CSS séparé. Tu réutilises les variables CSS et les classes déjà déclarées dans `index.html` :

- Couleurs : `--surface-0/1/2/3`, `--text-primary/secondary/muted`, `--line`, `--line-soft`,
  `--accent`, `--accent-soft`, `--pos`, `--neg`, `--warn`, et leurs variantes `*-soft`.
  Le thème clair/sombre est géré par `prefers-color-scheme` **et** par `:root[data-theme]` :
  toute couleur que tu ajoutes doit passer par une variable, jamais par une valeur en dur.
- Typo : `--sans` pour le texte, `--mono` pour **tous** les chiffres, toujours avec
  `font-variant-numeric: tabular-nums` (classe `.num`).
- Composants : `section` + `h2.titre` (11,5 px, 700, `letter-spacing: .09em`, majuscules,
  `--text-muted`), `.carte`, `.tuiles`/`.tuile` (`.lbl` / `.val` / `.sub`),
  `.tableau-enveloppe` + `table` (`thead th` collant, `td.d` pour les nombres à droite,
  `tr.total`, `tr.section`), `.barre-outils`, `.sous-onglets`/`.sous-onglet`, `.pilule`,
  `.avis` (`attention` / `souci` / `bien`), `.vide`, `.chargement`, `svg.graphe` + `.axe` +
  `.grille` + `.legende`, `button` / `button.primaire` / `button.mini`.
- Montants : **toujours** via `eur()` (et `eurCourt()` pour les axes de graphe). Ne réécris pas
  de formateur. `eur(null)` doit rendre `—`, comme aujourd'hui.
- Textes de l'interface en français, ton sobre, minuscules pour les libellés secondaires,
  comme dans le reste de l'app.

Si la maquette `EBE_ANALYSE.html` et le dashboard divergent sur un point de style (la maquette a
sa propre palette bleue `#1f4e79`), **c'est le dashboard qui gagne**.

---

## Phase 2 — Le module « Analyse EBE »

Ajoute une vue `Vues.ebe`, entrée `<div class="nav-item" data-vue="ebe"><span>Analyse EBE</span></div>`
dans le groupe **« Comptabilité »** de la barre latérale (place-la après `bilan`, ou propose mieux
et justifie). Titre de la vue : `Analyse de l'EBE — 2017 à 2023`.

Attention : cette vue est **multi-sociétés** et **multi-exercices**, alors que le reste de l'app
travaille sur un couple (société, exercice) piloté par les sélecteurs de l'en-tête. Décide
explicitement comment tu gères ça — par exemple en neutralisant ou en ignorant les sélecteurs
globaux sur cette vue — et dis-le-moi. Ne laisse pas deux systèmes de sélection se contredire
silencieusement.

### 2.1 Contrôles

- **Sélection multiple des sociétés** : SCEA TERRES ET VIE (480 627 025), SARL MATEVIE
  (832 839 724), SARL GROUPE MATEVIE (844 591 289), avec raccourcis « toutes » / « aucune ».
  **MATEVIE et GROUPE MATEVIE sont deux sociétés distinctes.** Ne les fusionne pas, ne traite pas
  l'une comme une consolidation de l'autre.
- **Sélection multiple des exercices** 2017 → 2023, avec raccourcis « tout » / « aucun ».
- **Choix de l'indicateur** : EBE, chiffre d'affaires HT, valeur ajoutée, résultat de l'exercice.
  Le sélecteur affiche la couverture réelle de chaque indicateur (`n/18`) et n'affiche pas un
  indicateur totalement vide.

### 2.2 Indicateurs et alerte de couverture

Quatre tuiles : **moyenne** de la sélection, **total cumulé**, **minimum**, **maximum**.
La tuile « moyenne » indique le **nombre d'exercices réellement retenus** ; « minimum » et
« maximum » indiquent la société et l'année où ils se produisent.

Un `.avis` de niveau `attention` s'affiche dès que la sélection comporte des cases attendues mais
non renseignées : « X valeurs sur Y attendues (Z non relevées) ». Le dénominateur Y **exclut les
cases « sans objet »**. Quand plusieurs sociétés sont sélectionnées, le message rappelle que la
moyenne globale rapproche des entités de tailles très différentes et qu'il vaut mieux lire la
moyenne ligne à ligne.

### 2.3 Tableau croisé

Lignes = sociétés sélectionnées, colonnes = exercices sélectionnés, plus une colonne **Moyenne**
par société et une ligne **Moyenne par exercice**, avec la moyenne générale à l'intersection.
Valeurs positives et négatives visuellement distinguées (`--pos` / `--neg` et leurs fonds
`*-soft`). Légende sous le tableau. Bouton « copier le tableau » (TSV dans le presse-papier, avec
repli si `navigator.clipboard` échoue).

### 2.4 Graphique

Une courbe par société, exercices en abscisse, `svg.graphe` construit à la main comme les autres
graphes de l'app (classes `.axe`, `.grille`, `.legende`, `.pastille-c`). Une ligne de zéro
marquée quand l'échelle traverse zéro. Les trous de données **rompent la courbe** au lieu de la
faire passer par un point interpolé. Les couleurs de série viennent des variables CSS.

### 2.5 Multiplicateur

En bas de la vue, un bloc « Multiplicateur » :

- choix de la base : **moyenne de la sélection** ou **total cumulé** ;
- champ de coefficient libre, acceptant la virgule comme séparateur décimal, signalant une saisie
  invalide sans casser le rendu ;
- raccourcis **×3, ×4, ×5, ×6, ×7** et un ×1 pour revenir à l'état neutre ;
- affichage du calcul en clair : `base × coefficient = résultat`, avec le rappel du périmètre
  (indicateur · sociétés · exercices) et la mention « calculé sur N exercices réellement
  renseignés ; les cases "sans objet" et "n.d." sont exclues ».

### 2.6 Impression

Bouton « Imprimer la sélection » → `window.print()`, avec des styles `@media print` qui produisent
une page A4 propre : en-tête rappelant l'indicateur, les sociétés, les exercices, le nombre
d'exercices retenus et, le cas échéant, le calcul du multiplicateur ; pied de page portant la
source et les trois SIREN ; navigation, contrôles et boutons masqués ; tableau et graphe lisibles
en noir et blanc. Reprends la mise en page d'impression de `EBE_ANALYSE.html`, adaptée aux classes
du dashboard.

---

## Phase 3 — LA règle critique : les moyennes

**C'est le piège principal de ce module. Traite-le explicitement.**

Une cellule peut être dans trois états, et deux d'entre eux ne doivent **jamais** entrer dans un
calcul — ni au numérateur, ni au dénominateur :

| État | Signification | Affichage | Compte dans la moyenne / le total / min / max |
|---|---|---|---|
| valeur | montant relevé dans les comptes annuels | montant formaté | **oui** |
| `sans objet` | la société n'existait pas encore cette année-là | `sans objet`, grisé italique | **non** |
| `n.d.` | société existante, donnée non relevée pour cet indicateur | `n.d.`, grisé italique | **non** |

Règles de création, qui déterminent le « sans objet » :

- **SCEA TERRES ET VIE** : présente dès 2017.
- **SARL MATEVIE** : premier exercice clos le **30 juin 2018** → « sans objet » **avant 2018**.
- **SARL GROUPE MATEVIE** : créée le **5 décembre 2018**, premier exercice clos le
  **31 décembre 2019** → « sans objet » **avant 2019**.

Ce que cela implique, concrètement :

- une moyenne se calcule **uniquement** sur les valeurs numériques présentes ; le dénominateur est
  le nombre de valeurs réellement retenues, jamais le nombre de cellules affichées ;
- un `0` est une valeur, pas une absence — il compte ; `null` / `undefined` / `NaN` n'en sont pas ;
- une ligne, une colonne ou une sélection entièrement vide affiche `—`, pas `0 €`, pas `NaN`,
  pas une division par zéro ;
- le **taux de couverture** affiché a pour dénominateur le nombre de cases *attendues*, donc
  **hors « sans objet »** ; pour l'EBE sur la sélection complète, c'est **18**, pas 21.

### Tests exigés

Écris des tests automatisés (là où le projet en a déjà, sinon un fichier de tests autonome dont tu
m'indiques la commande de lancement) couvrant au minimum :

1. EBE, 3 sociétés × 7 exercices → **18 exercices retenus**, total **−12 463 €**,
   moyenne **−692,39 €**, minimum **−212 722 €** (Groupe Matevie 2023), maximum **187 194 €**
   (SCEA 2018).
2. Couverture EBE sur la sélection complète = **18/18**, sans alerte.
3. Couverture CA = **8/18**, VA = **9/18**, résultat = **9/18** → l'alerte s'affiche.
4. Sélection { MATEVIE, 2017 } seule → **aucune valeur**, affichage `—`, aucune division par zéro,
   et 2017 rendu « sans objet » et non « n.d. ».
5. Sélection { GROUPE MATEVIE, 2017-2018 } → deux cases « sans objet », couverture 0/0, pas
   d'alerte de données manquantes (rien n'est attendu).
6. Sélection { SCEA, 2017-2023 } sur le CA → une seule valeur (2017), moyenne = cette valeur,
   couverture 1/7, alerte affichée.
7. Le multiplicateur appliqué à une sélection vide ne produit ni `NaN` ni `0 €` mais un message.
8. Un ajout de valeur `0` dans le jeu de données fait passer le compte de 18 à 19 (le zéro compte).

---

## Phase 4 — Données

Jeu de données figé, à intégrer tel quel (vérifié contre les plaquettes le 15/09/2026).
Une valeur absente du dictionnaire signifie « non disponible » ; le statut « sans objet » se
déduit du champ `premier_exercice`. Montants en euros.

```json
{
  "perimetre": {
    "exercices": [2017, 2018, 2019, 2020, 2021, 2022, 2023],
    "hors_perimetre": [2024, 2025]
  },
  "societes": [
    { "id": "scea",    "code_app": "scea",    "nom": "SCEA Terres et Vie",  "siren": "480 627 025", "siret": "48062702500012", "premier_exercice": 2017 },
    { "id": "matevie", "code_app": "matevie", "nom": "SARL Matevie",        "siren": "832 839 724", "siret": "83283972400016", "premier_exercice": 2018 },
    { "id": "groupe",  "code_app": "groupe",  "nom": "SARL Groupe Matevie", "siren": "844 591 289", "siret": "84459128900013", "premier_exercice": 2019 }
  ],
  "indicateurs": [
    { "id": "ebe", "nom": "EBE — excédent brut d'exploitation" },
    { "id": "ca",  "nom": "Chiffre d'affaires HT" },
    { "id": "va",  "nom": "Valeur ajoutée" },
    { "id": "res", "nom": "Résultat de l'exercice" }
  ],
  "valeurs": {
    "ebe": {
      "scea":    { "2017": 178984, "2018": 187194, "2019": 17484, "2020": 121075, "2021": 49693, "2022": -57010, "2023": -7646 },
      "matevie": { "2018": 1368, "2019": 641, "2020": -27715, "2021": 13547, "2022": -56743, "2023": -88705 },
      "groupe":  { "2019": -4565, "2020": 38940, "2021": 9589, "2022": -175872, "2023": -212722 }
    },
    "ca": {
      "scea":    { "2017": 1211863.57 },
      "matevie": { "2018": 19371, "2019": 12926, "2020": 1774, "2021": 26065, "2022": 47873 },
      "groupe":  { "2019": 36475, "2020": 1232486 }
    },
    "va": {
      "scea":    { "2017": 469367.55, "2018": 549248 },
      "matevie": { "2018": 1368, "2019": 641, "2020": -27600, "2021": 13637, "2022": -6743 },
      "groupe":  { "2019": -4565, "2020": 38940 }
    },
    "res": {
      "scea":    { "2017": 85410.05, "2018": 91690 },
      "matevie": { "2018": 828, "2019": 13381, "2020": -8317, "2021": 10637, "2022": -42226 },
      "groupe":  { "2019": -4564, "2020": 33780 }
    }
  },
  "controles": {
    "ebe": { "n": 18, "total": -12463, "moyenne": -692.39, "min": -212722, "max": 187194 },
    "ca":  { "n": 8,  "total": 2588833.57 },
    "va":  { "n": 9,  "total": 1034293.55 },
    "res": { "n": 9,  "total": 180619.05 }
  },
  "notes": [
    "SARL Matevie a connu un exercice court du 1er juillet au 31 décembre 2018 (EBE −2 010 €), non représenté dans la grille par année civile.",
    "Source : comptes annuels certifiés, entité vérifiée par SIREN.",
    "Codes dossier cabinet : Strego 53005 = SCEA, 53006 = SARL MATEVIE, 55653 = SARL GROUPE MATEVIE."
  ]
}
```

Choisis où loger ces données au vu de l'architecture — table SQLite alimentée par une migration,
fichier de données à côté de `societes.yaml`, ou constante JS dans `index.html` — et **explique ton
choix**. Si tu passes par la base ou par le serveur, expose-les par une route cohérente avec les
autres (`/api/ebe` ou `/api/societe/<code>/agregats`, à toi de voir) et documente-la.

---

## Phase 5 — Accès aux documents sources

Je veux pouvoir **cliquer sur une valeur et ouvrir le PDF d'où elle vient** : « bilan SCEA 2020 »
→ les comptes annuels 2020 de la SCEA.

### 5.1 Cartographier avant de coder

**Ne devine pas à partir des noms de fichiers.** Les noms confondent régulièrement MATEVIE et
GROUPE MATEVIE — c'est une erreur avérée, déjà corrigée une fois. **L'entité fait foi d'après le
SIREN lu dans le PDF**, pas d'après le nom du fichier ni du dossier.

Construis un **index document ↔ (société, exercice, type de document, chemin réel, disponibilité)** :

- parcours `~/Desktop/DOSSIER COMPTA/BILANS TOUTES SOCIETES/`, sous-dossiers
  `01 SCEA TERRES ET VIE`, `02 SARL MATEVIE`, `03 SARL GROUPE MATEVIE`, eux-mêmes découpés par
  année `2017` → `2025` ;
- **attention** : sur les 43 entrées, **11 seulement sont de vrais PDF ; 32 sont des liens
  symboliques, et les 32 sont actuellement cassés** (ils pointent vers iCloud Drive ou vers un
  montage de session disparu). Ce n'est pas une anomalie ponctuelle, c'est l'état normal du
  dossier ;
- pour chaque entrée : résous le lien, teste l'existence de la cible, et **quand le fichier est
  lisible, ouvre-le et relève le SIREN** pour confirmer l'entité et l'exercice. Quand il ne l'est
  pas, enregistre-le comme *référencé mais indisponible*, avec la raison — sans inventer son
  contenu ;
- distingue les **types** : comptes annuels, liasse fiscale, grand livre, rapport prévisionnel,
  courrier. Un « Rapport Strego (PF) » est un **prévisionnel, pas des comptes annuels certifiés** :
  il ne doit jamais être présenté comme la source d'une valeur de bilan ;
- signale les cas douteux au lieu de trancher : `GM 2022 - Bilan image (Strego 53005)` porte le
  code dossier de la **SCEA**, il est probablement mal classé.

Repère de départ, à vérifier et non à recopier aveuglément : `_RAPPORTS/RAPPORT_CONSOLIDATION.md`
dans ce même dossier documente le référentiel SIREN, les reclassements déjà opérés, les manques
connus (MATEVIE 2020 introuvable, MATEVIE 2019 à requalifier) et l'état des liens.

### 5.2 Dans l'interface

- **Dans le tableau croisé** : quand une valeur est rattachée à un document identifié, la cellule
  offre un accès discret au PDF — une petite icône ou un lien sur le montant, **pas un bouton** qui
  alourdirait le tableau. Le tableau doit rester lisible d'un coup d'œil.
- **Une section « Documents »** dans la vue (ou une vue sœur, à toi de juger) : la liste des
  documents disponibles par société × exercice, avec le type, le téléchargement, et un marquage
  visuel clair des exercices dont le document **n'est pas disponible** — réutilise `.pilule` et les
  couleurs `--warn` / `--neg` déjà en place.
- **Document référencé mais introuvable** : message clair dans la langue de l'app
  (« document référencé mais introuvable sur ce poste — lien rompu vers iCloud »), via `.avis` ou
  `toast`, jamais une 404 brute ni une page blanche.

### 5.3 Implémentation

Tranche au vu du code existant, et **explicite ton choix** :

- le dashboard étant servi par un backend Python, la voie normale est une **route de
  téléchargement** (par exemple `/api/documents/<id>`) qui lit le fichier sur disque, renvoie le
  bon `Content-Type` et un `Content-Disposition` propre — avec une vérification que le chemin
  demandé reste dans le dossier autorisé (pas de traversée de répertoire) ;
- une page statique ouverte en `file://` imposerait des liens relatifs ou une copie des PDF dans un
  dossier d'assets — ce n'est probablement pas le cas ici, mais vérifie.

Dans les deux cas, **je préfère consolider les vrais PDF dans le projet** plutôt que dépendre de
liens symboliques fragiles. Propose-moi un emplacement et un script de consolidation
(copie, pas déplacement — les originaux ne bougent pas), et dis-moi ce qui manquerait encore après
consolidation.

---

## Phase 6 — L'historique : pose-moi la question

Je veux un « historique », mais je n'ai pas tranché ce que ça recouvre. Deux lectures possibles :

**(a) Historique des valorisations calculées.** Un bouton « enregistrer cette valorisation » qui
consigne : la sélection (indicateur, sociétés, exercices), la base (moyenne ou total), le
coefficient, le résultat, la date et un libellé libre. Puis une liste des scénarios enregistrés,
comparables entre eux, rechargeables d'un clic dans les contrôles, supprimables.

**(b) Vue historique des données elles-mêmes.** L'évolution longue des agrégats, au-delà de la
grille 2017-2023 : les exercices **2024 et 2025 sont hors périmètre** mais je veux pouvoir les
consulter **à part**, clairement séparés, sans qu'ils contaminent les moyennes du périmètre.

**Demande-moi laquelle je veux** avant d'implémenter. Si je ne réponds pas, implémente **(a)** —
c'est celle qui n'existe nulle part ailleurs — et prévois l'emplacement de (b).

Si l'historique est persisté, le stockage doit être **cohérent avec l'architecture du dashboard** :
puisqu'il y a une base SQLite, une table (avec migration) est plus juste qu'un `localStorage`.
Vérifie comment les migrations sont gérées dans le projet avant d'en ajouter une. `localStorage`
n'est acceptable que pour une préférence d'affichage, pas pour des scénarios que je voudrai
retrouver.

---

## Phase 7 — Vérification avant de me rendre la main

1. Lance les tests de la Phase 3 et **montre-moi la sortie**. Les trois valeurs de contrôle
   (18 exercices, −12 463 €, −692,39 €) doivent tomber exactement.
2. Vérifie le rendu **à plusieurs largeurs** : ~1400 px, ~1000 px, et **sous 820 px** — c'est le
   point de rupture où la barre latérale du dashboard passe en barre horizontale défilante. Le
   tableau croisé doit défiler dans `.tableau-enveloppe` sans casser la page.
3. Vérifie le rendu **en thème clair et en thème sombre** (bouton « Thème clair / sombre » en bas
   de la barre latérale). Aucune couleur en dur ne doit apparaître.
4. Vérifie l'**aperçu avant impression** : une sélection réduite et une sélection complète.
5. Vérifie qu'un **document indisponible** produit le message attendu, et qu'un document
   disponible se télécharge bien.
6. Vérifie que la navigation depuis et vers les autres vues ne casse rien, et que l'ancre
   `#ebe` fonctionne au rechargement.
7. Liste ce que tu as changé, fichier par fichier, et ce que tu as laissé de côté.
