# INFRA — fiche technique

Généré le 30 septembre 2026, mis à jour le 1er octobre 2026 par un scan du dépôt (côté Dashboard : le dépôt n'a pas encore de fiche docs/INFRA.md — si elle apparaît, elle remplacera celle-ci à la synchro suivante).

## Vue d'ensemble

- **Plateforme** : site web éditorial en français sur la décoration africaine — statique multipage, mobile d'abord, installable (manifeste + service worker), lisible sans JavaScript
- **Stack** : Vite + TypeScript (Node ≥ 22.18), aucun backend — articles en Markdown + YAML (`contenu/articles/`, `contenu/conseils/`), données en JSON (`src/data/`), tests Vitest + test de bout en bout Chromium
- **Distribution** : GitHub Pages via le workflow `pages.yml` — à chaque push sur `main`, chaque lundi à 5 h UTC (publication des articles programmés) et à la demande ; adresse `https://www.keurdeco.com/`
- **IA** : images d'ambiance et vignettes produits créées avec OpenArt (mention « Image d'ambiance créée par IA » affichée) — les 37 articles portent désormais une image créée par IA (`image_ia: true`)
- **Particularités** : 3 types d'articles (ambiance avec points cliquables vers les produits, top classé, guide) publiés à leur date, rangés sans mélange (une pièce, une matière ou une occasion n'affiche que ses ambiances ; menu « Tops » et « Guides » : `tops.html`, `guides.html`) ; onglet Conseils (une question par page, données structurées FAQ) ; nuancier des matières (wax, bogolan, kente, indigo…) ; carrousels de l'accueil (pièces et tops, 7 au plus, flèches et compteur) ; animations signature (porte en arche, visite de la maison, coupons de tissu, rideau de kente) coupées par « Réduire les animations » ; palette « Terre de Dakar », polices Fraunces + Source Sans 3 hébergées avec le site ; rapport de build (articles à venir, produits à vérifier)

### 1. GitHub

- **Rôle** : hébergement du code et des deux workflows (`pages.yml` : tests + build + déploiement ; `pinterest.yml` : publication quotidienne des épingles à 7 h 17 UTC). Développement par sessions Claude Code.
- **Console** : https://github.com/teiki5320/Keurdeco
- **Identifiants publics** : compte `teiki5320`, dépôt public, branche `main`.
- **Secrets** : secrets Actions `PINTEREST_APP_ID`, `PINTEREST_APP_SECRET`, `PINTEREST_REFRESH_TOKEN` (OAuth Pinterest, jeton renouvelé automatiquement — un ticket GitHub s'ouvre quand le refresh token change). Variables sans secret : `SITE_URL`, `CLOUDFLARE_WEB_ANALYTICS`, `PLAUSIBLE_DOMAIN`, `PINTEREST_VERIFY`, `GOOGLE_VERIFY`.
- **Coût** : gratuit.

### 2. GitHub Pages (hébergement web)

- **Rôle** : sert le site statique construit par le workflow (`dist/`), avec HTTPS imposé (*Enforce HTTPS*) et domaine personnalisé `www.keurdeco.com` (fichier `public/CNAME`).
- **Console** : https://github.com/teiki5320/Keurdeco → Settings → Pages (*Source* = GitHub Actions).
- **Identifiants publics** : `https://www.keurdeco.com/` (`keurdeco.com` redirige vers `www`).
- **Secrets** : aucun.
- **Coût** : gratuit.

### 3. Cloudflare (nom de domaine)

- **Rôle** : registrar et DNS du domaine `keurdeco.com` (renouvellement automatique) ; héberge aussi la mesure d'audience sans cookie **Cloudflare Web Analytics** (en place). Proxy **désactivé** (nuage gris) pour laisser GitHub émettre le certificat HTTPS : 4 enregistrements A vers GitHub Pages + CNAME `www` → `teiki5320.github.io`.
- **Console** : https://dash.cloudflare.com (compte Google du propriétaire).
- **Identifiants publics** : zone `keurdeco.com`.
- **Secrets** : jeton API « Modifier le DNS de zone » limité à keurdeco.com, rangé dans `.env` local (`CLOUDFLARE_API_TOKEN`), jamais commité.
- **Coût** : prix annuel du domaine — à vérifier dans la console ; Web Analytics gratuit.

### 4. Amazon Partenaires (affiliation)

- **Rôle** : rémunération du site — liens `https://www.amazon.fr/dp/<ASIN>?tag=keurdeco-21` (`src/amazon.ts`, seul endroit du tag). Produits relevés à la main sur Amazon.fr (`src/data/produits.json`), sans API : jamais d'ASIN, de note, d'avis ni de prix inventés ; aucune photo Amazon (icônes par type d'objet) ; mention Partenaires près des liens, en pied de page et dans les mentions légales ; vérification mensuelle de disponibilité signalée par le rapport de build.
- **Console** : https://partenaires.amazon.fr
- **Identifiants publics** : tag `keurdeco-21`.
- **Secrets** : aucun (identifiants du compte Partenaires hors dépôt).
- **Coût** : gratuit — commissions sur les achats.

### 5. Pinterest (réseaux sociaux)

- **Rôle** : canal de trafic principal — le build génère une épingle 1000 × 1500 par titre d'article (4 gabarits alternés, manifeste `epingles.json`), et le workflow quotidien publie au plus 5 épingles par jour via l'API v5 (`POST /v5/pins`), tableau choisi dans `config/tableaux-pinterest.json`, état mémorisé dans `data/pinterest-etat.json`. Rich Pins (Open Graph + données structurées Article), bouton « Épingler » sans script externe. Repli manuel : import en masse du CSV `public/epingles-pinterest.csv` tant que l'accès API n'est pas accordé.
- **Console** : https://www.pinterest.fr (compte professionnel) ; parcours OAuth local par `npm run pinterest:auth`.
- **Identifiants publics** : balise `p:domain_verify` (variable `PINTEREST_VERIFY`).
- **Secrets** : voir GitHub (secrets Actions Pinterest) ; mode bac à sable via `PINTEREST_SANDBOX=1` ; sans secrets, le workflow tourne à blanc.
- **Coût** : gratuit.
