# INFRA — fiche technique

Mis à jour le 15 octobre 2026 d'après le dépôt et le site en ligne. Cette fiche, avec MARKETING.md et PUBLICATION.md, est désormais la source : le Studio la recopie.

## En bref

- **Plateforme** : site éditorial statique, mobile d'abord, installable
- **Stack** : Vite + TypeScript, Markdown + YAML, tests Vitest et Chromium
- **Backend** : aucun — tout est généré au build
- **Distribution** : GitHub Pages, à chaque push et chaque lundi
- **Site** : www.keurdeco.com
- **IA et outils** : images d'ambiance OpenArt, épingles générées au build

## Parcours

- 🌐 **Web** : 🐙 GitHub — main · pages.yml au vert [ok] → 📄 Hébergement web — GitHub Pages, HTTPS imposé [ok] → 🌍 Nom de domaine — keurdeco.com chez Cloudflare [ok] → 🔎 Google et Bing — indexation en cours [à faire]
- 🛒 **Affiliation** : 📝 Articles — 21 en ligne, 16 programmés [ok] → 🛍️ Affiliation — Amazon Partenaires, tag keurdeco-21 [ok] → 💶 Commissions — à vérifier dans la console [pas encore]
- 📌 **Contenu** : 🖼️ Épingles — générées au build [ok] → 📥 Import CSV — lot jusqu'au 1er novembre [ok] → 🤖 API Pinterest — tourne à blanc, sans secrets [bloquant]
- 📰 **Publicité** : 📄 Pages de lecture — emplacements In-Article [ok] → 📰 AdSense (publicité web) — validation à vérifier [à faire]

## Vue d'ensemble

- **Plateforme** : site web éditorial en français sur la décoration africaine — statique multipage, mobile d'abord, installable (manifeste + service worker), lisible sans JavaScript.
- **Stack** : Vite + TypeScript (Node ≥ 22.18), aucun backend — articles et conseils en Markdown + YAML (`contenu/articles/`, `contenu/conseils/`), données en JSON (`src/data/`), polices Fraunces et Source Sans 3 hébergées avec le site, tests Vitest + test de bout en bout Chromium.
- **Distribution** : GitHub Pages par le workflow `pages.yml` — à chaque push sur `main`, chaque lundi à 5 h UTC (publication des articles programmés) et à la demande ; adresse `https://www.keurdeco.com/`.
- **Images** : images d'ambiance créées avec OpenArt pendant les séances de rédaction (pas d'appel depuis le site) ; les 37 articles portent `image_ia: true` et la mention correspondante. Les vignettes des produits sont découpées dans ces images (`npm run vignettes`), jamais de photo Amazon.
- **Particularités** : trois types d'articles (ambiance avec points cliquables vers les produits, top classé, guide) publiés à leur date et rangés sans mélange ; onglet Conseils (une question par page, données structurées FAQ) ; glossaire des matières ; nuancier animé ; animations coupées par « Réduire les animations » ; rapport de build (articles à venir, produits à vérifier) ; annonces Google AdSense sur les pages de lecture depuis le 12 octobre 2026.

## GitHub

- **Rôle** : code et deux workflows. `pages.yml` : tests, build (épingles comprises), test de bout en bout, déploiement, puis, hors push, signalement des pages à Bing par IndexNow (`scripts/indexnow.mjs`). Le test de bout en bout refuse tout script externe sauf ceux de `pagead2.googlesyndication.com` (AdSense). `pinterest.yml` : chaque jour à 7 h 17 UTC, publication des épingles par l'API Pinterest — sans les secrets, il tourne à blanc (constaté sur les exécutions du 5 au 12 octobre 2026 : « Mode à blanc »).
- **Console** : https://github.com/teiki5320/Keurdeco
- **Identifiants publics** : compte `teiki5320`, dépôt public, branche `main` (pas d'autre branche).
- **Secrets** : secrets Actions attendus `PINTEREST_APP_ID`, `PINTEREST_APP_SECRET`, `PINTEREST_REFRESH_TOKEN` (pas encore définis). Variables sans secret : `SITE_URL`, `CLOUDFLARE_WEB_ANALYTICS`, `PINTEREST_VERIFY`, `GOOGLE_VERIFY`, et facultatives `PINTEREST_SANDBOX`, `PINTEREST_MAX`.
- **Coût** : gratuit.

## Hébergement web (GitHub Pages / Cloudflare Pages)

- **Fournisseur** : GitHub Pages.
- **Rôle** : sert le site statique construit par le workflow (`dist/`), HTTPS imposé, domaine personnalisé `www.keurdeco.com` (fichier `public/CNAME`).
- **Console** : https://github.com/teiki5320/Keurdeco → Settings → Pages (source : GitHub Actions).
- **Identifiants publics** : `https://www.keurdeco.com/` (`keurdeco.com` redirige vers `www`).
- **Secrets** : aucun.
- **Coût** : gratuit.

## Nom de domaine (Cloudflare)

- **Rôle** : registrar et DNS de `keurdeco.com` (créé le 28 septembre 2026, échéance le 28 septembre 2027). Proxy désactivé pour laisser GitHub émettre le certificat : 4 enregistrements A vers GitHub Pages et CNAME `www` → `teiki5320.github.io`.
- **Console** : https://dash.cloudflare.com (compte de gestion admin@toakeur.com).
- **Identifiants publics** : zone `keurdeco.com`.
- **Secrets** : jeton API « Modifier le DNS de zone » limité à keurdeco.com, rangé dans `.env` local (`CLOUDFLARE_API_TOKEN`), jamais commité.
- **Coût** : prix annuel du domaine — à vérifier dans la console.

## Analytics (Cloudflare Web Analytics)

- **Rôle** : mesure d'audience gratuite et sans cookie ; balise présente sur les pages publiées (vérifié le 13 octobre 2026). Elle ne demande aucun consentement ; seuls les cookies publicitaires de Google en demandent (voir AdSense).
- **Console** : https://dash.cloudflare.com → Analytics & Logs → Web Analytics (site `www.keurdeco.com`).
- **Identifiants publics** : jeton de balise (variable `CLOUDFLARE_WEB_ANALYTICS`), visible dans les pages — non secret.
- **Secrets** : aucun.
- **Coût** : gratuit.

## Affiliation (Amazon Partenaires)

- **Rôle** : rémunération du site — liens `https://www.amazon.fr/dp/<ASIN>?tag=keurdeco-21`, tag défini dans `src/amazon.ts` et nulle part ailleurs. 163 produits relevés à la main sur Amazon.fr (`src/data/produits.json`), sans API : jamais d'ASIN, de note, d'avis ni de prix inventés, aucune photo Amazon, mention Partenaires près des liens, en pied de page et dans les mentions légales. `npm run verifier-produits` contrôle la disponibilité ; après les passages des 13 et 14 octobre 2026, 161 produits actifs et 2 indisponibles (`jarre-terre-cuite-toscane` et `bannette-courrier-jonc`, retirés de l'affichage, à remplacer).
- **Console** : https://partenaires.amazon.fr (compte Amazon Partenaires de Jean ; keurdeco.com fait partie des sites déclarés).
- **Identifiants publics** : tag `keurdeco-21`.
- **Secrets** : aucun dans le dépôt.
- **Coût** : gratuit — commissions sur les achats.

## Réseaux sociaux (Pinterest)

- **Rôle** : canal de trafic principal. Le build génère les épingles 1000 × 1500 (une par titre d'article, 4 gabarits, manifeste `epingles.json`, 174 épingles au 11 octobre). Tant que l'accès API n'est pas accordé, elles s'importent à la main par lots de 30 jours : `npm run pinterest:lot` prépare le CSV, `npm run pinterest:lot -- --confirmer` les note dans `data/pinterest-etat.json`. Rich Pins par Open Graph et données structurées, bouton « Épingler » sans script externe, balise `p:domain_verify` en ligne.
- **Console** : https://www.pinterest.fr (compte professionnel « Keur Déco », keurdeco@toakeur.com) ; application sur developers.pinterest.com ; parcours OAuth local par `npm run pinterest:auth` (voir `docs/pinterest.md`).
- **Identifiants publics** : balise `p:domain_verify` (variable `PINTEREST_VERIFY`) ; tableaux dans `config/tableaux-pinterest.json` (`board_id` encore vides).
- **Secrets** : voir GitHub (secrets Actions Pinterest).
- **Coût** : gratuit.

## AdSense (publicité web)

- **Rôle** : second revenu du site, mis en place le 12 octobre 2026. Le code AdSense est ajouté par le marqueur commun `<!--#head-->` sur les pages qui peuvent porter une annonce, Confidentialité comprise (son lien « Gérer mes cookies » rouvre la fenêtre de Google) ; depuis le 13 octobre 2026, il n'est plus chargé sur l'accueil, les Tops, À propos, Mentions légales ni la 404 (`pageAvecAdsense` dans `build/site.ts`) ; `public/ads.txt` est servi à la racine (réponse 200 le 13 octobre 2026). Un bloc In-Article « Keur Déco - dans le texte » est placé au build par `build/annonces.ts` : 2 au plus par article, 1 pour un conseil, une fiche du glossaire ou une page de pièce, matière, occasion ou guides ; devant un intertitre, jamais contre un encadré Amazon, signalé « Annonce ». Aucune annonce sur l'accueil, les Tops, À propos, Confidentialité, Mentions légales ni la 404 ; un emplacement non rempli est masqué.
- **Consentement** : fenêtre de choix de Google (Autoriser, Refuser, Gérer les options) ; cookies publicitaires seulement avec accord ; lien « Gérer mes cookies » en bas de chaque page. Confidentialité et mentions légales le décrivent.
- **Console** : https://adsense.google.com (compte Google de Jean) — validation du site et revenus à vérifier dans la console.
- **Identifiants publics** : identifiant éditeur et identifiant du bloc d'annonces, définis une seule fois dans `build/config.ts` (publics, l'éditeur figure aussi dans `ads.txt`).
- **Secrets** : aucun.
- **Coût** : gratuit — Google reverse une part des revenus publicitaires.
