# INFRA — fiche technique

Généré le 25 septembre 2026 par un scan du dépôt. Pour mettre à jour : relancer ce même prompt.

> Aucun secret dans cette fiche — uniquement des références (noms de variables, consoles).

## Vue d'ensemble

- **Plateforme** : site web statique, en français, pensé d'abord pour le mobile, installable (PWA : `public/manifest.webmanifest`, `public/sw.js`, consultation hors ligne).
- **Stack** : Vite 8 · TypeScript 6 · Vitest 5 · Playwright (test de bout en bout) · sharp (préparation des images) · police Urbanist hébergée avec le site (`@fontsource-variable/urbanist`). Node.js 22.12 ou plus récent (`package.json`, champ `engines`).
- **Backend** : aucun. Le calculateur tourne entièrement dans le navigateur (`src/calc.ts`, fonctions pures) ; les réglages du visiteur restent dans son navigateur (stockage local) ou dans l'adresse de la page (`src/etat.ts`).
- **Distribution** : GitHub Pages, publication automatique à chaque envoi sur `main` (`.github/workflows/pages.yml`), sur le domaine `www.optiled.fr` (`public/CNAME`, `SITE_URL` dans `build/site.ts`).
- **Particularités** :
  - 18 pages HTML à la racine, assemblées au build par un plugin Vite maison (`build/site.ts`) : en-tête, menu, pied de page, sommaire, sitemap, robots.txt, balises de partage, données structurées.
  - Données des 26 cultures dans `src/data/legumes.json`, chaque valeur avec sa source ; sélection de 16 lampes Amazon.fr dans `src/data/lampes.json`.
  - La chaîne de publication refuse de publier si les tests unitaires, le build ou le test de bout en bout échouent.

### 1. GitHub (code et publication)

- **Rôle** : hébergement du code (`teiki5320/optiled`, branche unique `main`) et chaîne de publication GitHub Actions : `npm ci` → `npm test` → `npm run build` → installation de Chromium → `npm run test:e2e` → envoi de `dist/` vers GitHub Pages.
- **Console** : https://github.com/teiki5320/optiled (onglet *Actions* pour le suivi des publications).
- **Identifiants publics** : nom du dépôt `teiki5320/optiled`.
- **Secrets** : aucun secret configuré. Le workflow n'utilise que les autorisations fournies par GitHub (`pages: write`, `id-token: write`).
- **Coût** : gratuit (dépôt public) — à vérifier dans la console en cas de changement de visibilité.

### 2. GitHub Pages (hébergement)

- **Rôle** : hébergement du site statique produit dans `dist/`.
- **Console** : https://github.com/teiki5320/optiled/settings/pages
- **Identifiants publics** : domaine personnalisé `www.optiled.fr` (fichier `public/CNAME`) ; l'ancienne adresse `https://teiki5320.github.io/optiled/` redirige vers le domaine.
- **Secrets** : aucun.
- **Coût** : gratuit.

### 3. IONOS (domaine, DNS, messagerie)

- **Rôle** : registrar et DNS du domaine `optiled.fr`. La zone contient 4 enregistrements A vers GitHub Pages, un CNAME `www` → `teiki5320.github.io`, ainsi que les enregistrements de messagerie IONOS (MX, SPF, DKIM, DMARC, autodiscover) et une vérification Google (constaté dans la zone DNS le 24 septembre 2026 ; détail dans le README, section « Domaine personnalisé »).
- **Console** : https://my.ionos.fr (Domaines & SSL → optiled.fr → DNS).
- **Identifiants publics** : nom de domaine `optiled.fr`.
- **Secrets** : identifiants du compte IONOS, conservés hors du dépôt.
- **Coût** : à vérifier dans la console (contrat « IONOS Pack Domaine »).

### 4. Partenaires Amazon (affiliation)

- **Rôle** : liens sponsorisés vers les lampes conseillées (`https://www.amazon.fr/dp/<ASIN>?tag=…`, `rel="sponsored"`), générés par `src/lampes.ts` ; page `lampes.html` et propositions dans le calculateur.
- **Console** : https://partenaires.amazon.fr
- **Identifiants publics** : identifiant de suivi `optiled-21` (constante `TAG_AMAZON` dans `src/lampes.ts`, à changer à un seul endroit).
- **Secrets** : identifiants du compte et informations de paiement, uniquement dans la console Amazon.
- **Coût** : gratuit.

### 5. Plausible (mesure d'audience, non activée)

- **Rôle** : mesure d'audience sans cookie, prévue dans le code (`mesureAudience`, `build/site.ts`). Le script n'est ajouté que si la variable `PLAUSIBLE_DOMAIN` est définie au build ; le workflow ne la définit pas, donc aucune mesure n'est active.
- **Console** : https://plausible.io (aucun compte relié à ce jour d'après le code).
- **Identifiants publics** : `PLAUSIBLE_DOMAIN` (nom de domaine, non secret).
- **Secrets** : aucun.
- **Coût** : abonnement payant si activé — à vérifier sur le site de Plausible.

### 6. Génération d'images (IA)

- **Rôle** : photos de couverture des guides et miniatures des cultures, générées par IA puis converties en WebP (`npm run images`, `npm run planche`). Le README indique ElevenLabs (modèles Seedream et gpt-image-2) ; les consignes du projet (`CLAUDE.md`) prévoient OpenArt en priorité pour les prochaines images.
- **Console** : selon le service utilisé.
- **Identifiants publics** : aucun dans le code.
- **Secrets** : aucun dans le dépôt.
- **Coût** : crédits consommés à chaque génération — à vérifier dans la console du service.

### 7. Routine mensuelle (Claude Code)

- **Rôle** : vérification mensuelle de la sélection de lampes Amazon (note, disponibilité, chiffres, date `verifie_le`), avec mise à jour de `src/data/lampes.json` et envoi sur `main`. Le 1er de chaque mois à 9 h (heure de Paris).
- **Console** : https://claude.ai/code/routines
- **Identifiants publics** : aucun dans le code.
- **Secrets** : aucun dans le dépôt.
- **Coût** : inclus dans l'abonnement Claude — à vérifier dans la console.
