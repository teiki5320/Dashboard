# INFRA — fiche technique

Généré le 16 octobre 2026 par un scan du dépôt. Pour mettre à jour : relancer ce même prompt.

> Aucun secret dans cette fiche — uniquement des références (noms de variables, consoles).

## En bref

- **Plateforme** : site web statique en français, installable (PWA)
- **Stack** : Vite 8 · TypeScript 6 · Vitest · Playwright
- **Backend** : aucun, tout le calcul se fait dans le navigateur
- **Distribution** : GitHub Pages par GitHub Actions, sur www.optiled.fr
- **Site** : https://www.optiled.fr/ — contact optiled@toakeur.com
- **IA et outils** : images faites par IA hors du site (OpenArt)

## Parcours

- 🌐 **Web** : 🐙 GitHub — main, dernière publication au vert [ok] → ⚙️ GitHub Actions — tests, build et test de bout en bout [ok] → 🏠 GitHub Pages — hébergement du site [ok] → 🔗 Nom de domaine — www.optiled.fr, HTTPS forcé [ok] → 🔎 Google — 62 pages indexées sur 86 [à faire]
- 📝 **Contenu** : ✍️ Articles de conseil — 74 rédigés [ok] → ⏰ GitHub Actions — publication lundi, mercredi, vendredi [ok] → 📰 Rubrique Conseils — 36 en ligne, 38 programmés [ok] → 📌 Pinterest — 12 épingles prêtes, aucun compte [pas encore]
- 🛒 **Affiliation** : 💡 Sélection de lampes — 16 lampes, une indisponible [ok] → 🔁 Routine de vérification — dernier passage le 14 octobre [ok] → 🛍️ Affiliation — liens Amazon.fr optiled-21 [ok]
- 📢 **Publicité** : 📰 Pages de lecture — deux emplacements au plus [ok] → 🍪 Consentement — bandeau de Google en ligne [ok] → 💰 AdSense (publicité web) — validation à vérifier [à faire]

## Vue d'ensemble

- **Plateforme** : site web statique, en français, pensé d'abord pour le mobile, installable (PWA : `public/manifest.webmanifest`, `public/sw.js`, consultation hors ligne).
- **Stack** : Vite 8 · TypeScript 6 · Vitest 5 · Playwright (test de bout en bout) · sharp (préparation des images) · police Urbanist hébergée avec le site (`@fontsource-variable/urbanist`). Node.js 22.12 ou plus récent (`package.json`, champ `engines`).
- **Backend** : aucun. Le calculateur tourne entièrement dans le navigateur (`src/calc.ts`, fonctions pures) ; les réglages du visiteur restent dans son navigateur (stockage local) ou dans l'adresse de la page (`src/etat.ts`).
- **Distribution** : GitHub Pages, publication automatique à chaque envoi sur `main` et chaque lundi, mercredi et vendredi à 5 h UTC pour les articles de conseil programmés (`.github/workflows/pages.yml`), sur le domaine `www.optiled.fr` (`public/CNAME`, `SITE_URL` dans `build/site.ts`).
- **Contact public** : `optiled@toakeur.com` (mentions légales et page « À propos » ; dans le code depuis le 7 octobre 2026, en ligne depuis le 12). Plus aucune adresse en `alohash.fr` dans le site.
- **Particularités** :
  - 28 pages HTML à la racine, plus les articles de conseil (`contenu/conseils/`) et les pages des 26 cultures, assemblées au build par un plugin Vite maison (`build/site.ts`) : en-tête, menu, pied de page, sommaire, sitemap, robots.txt, flux RSS `conseils.xml`, balises de partage, données structurées.
  - Données des 26 cultures dans `src/data/legumes.json`, chaque valeur avec sa source ; sélection de lampes Amazon dans `src/data/lampes.json` ; fourchettes de prix dans `src/data/budget.json`.
  - La chaîne de publication refuse de publier si les tests unitaires, le build ou le test de bout en bout échouent (ce qui a bloqué toute mise en ligne du 7 au 12 octobre 2026).
  - Publicité Google AdSense depuis le 12 octobre 2026 (`build/annonces.ts`, fichier `public/ads.txt`) : script et bandeau de consentement de Google sur toutes les pages publiées, sauf le calculateur intégré sur d'autres sites ; annonces seulement dans les guides, conseils, fiches des cultures, parcours et glossaire.
  - Signalement hebdomadaire des pages à Bing et aux autres moteurs par IndexNow (`.github/workflows/indexnow.yml`, le lundi à 7 h UTC ; clé publique dans `public/`).
  - Routines Claude Code (console https://claude.ai/code/routines) : `optiled-verification-lampes`, chaque jour (lampes et fourchettes de prix, envoi sur `main`), de nouveau active : passages des 13 et 14 octobre 2026 après une interruption depuis le 1er octobre ; `optiled-nouvelle-serie-conseils`, rappel unique le 16 novembre 2026 pour préparer la série suivante d'articles.

## GitHub

- **Rôle** : hébergement du code (`teiki5320/optiled`, branche unique `main`) et chaîne de publication GitHub Actions : `npm ci` → `npm test` → `npm run build` → installation de Chromium → `npm run test:e2e` → envoi de `dist/` vers GitHub Pages. Second workflow : IndexNow.
- **Console** : https://github.com/teiki5320/optiled (onglet *Actions* pour le suivi des publications).
- **Identifiants publics** : nom du dépôt `teiki5320/optiled`.
- **Secrets** : aucun secret ni variable de dépôt. Le workflow n'utilise que les autorisations fournies par GitHub (`pages: write`, `id-token: write`).
- **Coût** : gratuit (dépôt public) — à vérifier dans la console en cas de changement de visibilité.

## Hébergement web (GitHub Pages / Cloudflare Pages)

- **Rôle** : hébergement du site statique produit dans `dist/`, sur GitHub Pages (en-tête `server: GitHub.com` constaté le 12 octobre 2026). Pas de Cloudflare Pages.
- **Console** : https://github.com/teiki5320/optiled/settings/pages
- **Identifiants publics** : domaine personnalisé `www.optiled.fr` (fichier `public/CNAME`) ; l'ancienne adresse `https://teiki5320.github.io/optiled/` redirige vers le domaine (301, constaté le 12 octobre 2026).
- **Secrets** : aucun.
- **Coût** : gratuit.

## Nom de domaine

- **Rôle** : `optiled.fr`, enregistré chez IONOS, qui en gère aussi le DNS. La zone contient 4 enregistrements A vers GitHub Pages, un CNAME `www` → `teiki5320.github.io`, les enregistrements de messagerie IONOS (MX `mx00` / `mx01.ionos.fr`, SPF, DKIM, DMARC, autodiscover) et une vérification Google. L'adresse de contact publique, elle, est sur `toakeur.com`, pas sur `optiled.fr`.
- **Console** : https://my.ionos.fr (Domaines & SSL → optiled.fr → DNS).
- **Identifiants publics** : nom de domaine `optiled.fr`.
- **Secrets** : identifiants du compte IONOS, conservés hors du dépôt.
- **Coût** : à vérifier dans la console (contrat « IONOS Pack Domaine » ; renouvellement automatique désactivé au 24 septembre 2026, échéance à vérifier).

## Amazon Partenaires (affiliation)

- **Rôle** : liens sponsorisés vers les lampes conseillées (`https://www.amazon.fr/dp/<ASIN>?tag=…`, `rel="sponsored"`), générés par `src/lampes.ts` ; page `lampes.html`, page `meilleures-lampes.html` et propositions dans le calculateur. Aucun prix, note ni avis n'est enregistré dans le dépôt (règles du programme, contrôlées par les tests).
- **Console** : https://partenaires.amazon.fr (site `optiled.fr` déclaré).
- **Identifiants publics** : identifiant de suivi `optiled-21` (constante `TAG_AMAZON` dans `src/lampes.ts`, à changer à un seul endroit).
- **Secrets** : identifiants du compte et informations de paiement, uniquement dans la console Amazon.
- **Coût** : gratuit.

## Analytics (mesure d'usage)

- **Rôle** : Cloudflare Web Analytics, mesure d'audience gratuite et sans cookie, **active sur le site en ligne** depuis la publication du 12 octobre 2026 (script `static.cloudflareinsights.com/beacon.min.js` présent sur les pages). Une seule source depuis le 12 octobre 2026 : le jeton du site, écrit dans le code (constante `JETON_MESURE_AUDIENCE`, `build/site.ts`), commande à la fois le script, ajouté au seul build de production, et la phrase des mentions légales, qui décrit la mesure (sans cookie, pages vues agrégées, adresse IP non conservée). L'ancienne variable de dépôt `CF_BEACON_TOKEN` a été retirée du code et du workflow. Le test de bout en bout (`scripts/e2e.mjs`) n'autorise que ce script et ceux de Google AdSense.
- **Console** : https://dash.cloudflare.com → Analytics & Logs → Web Analytics (site `www.optiled.fr`, sans changer les DNS).
- **Identifiants publics** : jeton du site (32 caractères, visible dans les pages, non secret), dans `JETON_MESURE_AUDIENCE`.
- **Secrets** : aucun.
- **Coût** : gratuit.

## AdSense (publicité web)

- **Rôle** : annonces display de Google dans les pages de lecture, ajoutées le 12 octobre 2026 (`build/annonces.ts`). Au plus deux par page (milieu et fin de l'article), signalées « Publicité », jamais dans le calculateur, le carnet de suivi ni les pages de lampes, jamais à côté d'un lien Amazon ; l'emplacement reste replié tant que Google ne fournit pas d'annonce. Le bandeau de consentement est celui de Google (Autoriser, Refuser, Gérer les options), rouvert par le lien « Gérer les cookies » du pied de page ; les mentions légales et la page « À propos » décrivent la publicité et ses cookies. Le calculateur intégré sur d'autres sites ne charge pas le code de Google. Script et `ads.txt` constatés en ligne le 13 octobre 2026.
- **Console** : https://adsense.google.com (validation du site et diffusion des annonces : à vérifier dans la console).
- **Identifiants publics** : identifiant d'éditeur (constante `CLIENT_ADSENSE`) et bloc d'annonces « OptiLED - articles » (constante `BLOC_ARTICLES`), dans `build/annonces.ts` ; ligne de déclaration dans `public/ads.txt`.
- **Secrets** : aucun dans le dépôt ; compte et informations de paiement uniquement dans la console AdSense.
- **Coût** : gratuit (Google prélève sa part sur les revenus).

## API d'IA (génération d'images)

- **Rôle** : photos de couverture des guides et des articles, miniatures des cultures et illustrations des lampes, générées par IA hors du site puis converties en WebP (`npm run images`, `npm run planche`) ; le site n'appelle aucune IA. Les consignes du projet (`CLAUDE.md`) imposent OpenArt en priorité, avec annonce du coût en crédits avant chaque génération ; les premières images ont été faites avec ElevenLabs (d'après le README). Le pied de page signale les images générées.
- **Console** : OpenArt (crédits) — à vérifier dans la console.
- **Identifiants publics** : aucun dans le code.
- **Secrets** : aucun dans le dépôt.
- **Coût** : crédits consommés à chaque génération — à vérifier dans la console du service.
