# INFRA — fiche technique

Mis à jour le 21 octobre 2026 d'après le dépôt et le site en ligne. Cette fiche, avec MARKETING.md et PUBLICATION.md, est désormais la source : le Studio la recopie.

## En bref

- **Plateforme** : site éditorial statique, mobile d'abord, installable
- **Stack** : Vite + TypeScript, Markdown + YAML, tests Vitest et Chromium
- **Backend** : aucun — tout est généré au build
- **Distribution** : GitHub Pages, à chaque push et chaque lundi
- **Site** : www.keurdeco.com
- **IA et outils** : images d'ambiance OpenArt, épingles générées au build

## Parcours

- 🌐 **Web** : 🐙 GitHub — main · pages.yml au vert [ok] → 📄 Hébergement web — GitHub Pages, HTTPS imposé [ok] → 🌍 Nom de domaine — keurdeco.com chez Cloudflare [ok] → 🔎 Google et Bing — indexation en cours [à faire]
- 🛒 **Affiliation** : 📝 Articles — 24 en ligne, 15 programmés [ok] → 🛍️ Affiliation — Amazon Partenaires, tag keurdecofr-21 [ok] → 💶 Commissions — à vérifier dans la console [pas encore]
- 📌 **Contenu** : 🖼️ Épingles — générées au build [ok] → 📥 Import CSV — lot jusqu'au 18 novembre [ok] → 🤖 API Pinterest — accès standard accordé, 5 épingles par jour [ok]
- 📰 **Publicité** : 📄 Pages de lecture — emplacements In-Article [ok] → 📰 AdSense (publicité web) — en examen depuis le 16 octobre, aucune annonce [à faire]

## Vue d'ensemble

- **Plateforme** : site web éditorial en français sur la décoration africaine — statique multipage, mobile d'abord, installable (manifeste + service worker), lisible sans JavaScript.
- **Stack** : Vite + TypeScript (Node ≥ 22.18), aucun backend — articles et conseils en Markdown + YAML (`contenu/articles/`, `contenu/conseils/`), données en JSON (`src/data/`), polices Fraunces et Source Sans 3 hébergées avec le site, tests Vitest + test de bout en bout Chromium.
- **Distribution** : GitHub Pages par le workflow `pages.yml` — à chaque push sur `main`, chaque lundi, mercredi et vendredi à 5 h UTC (publication des articles programmés) et à la demande ; adresse `https://www.keurdeco.com/`.
- **Images** : images d'ambiance créées avec OpenArt pendant les séances de rédaction (pas d'appel depuis le site) ; les 39 articles portent `image_ia: true` et la mention correspondante, comme les 13 images d'ambiance à points cliquables des pages Top 10 (20 octobre 2026). Les vignettes des produits sont découpées dans ces images (`npm run vignettes`), jamais de photo Amazon ; les 100 produits des onglets Top 10 en ont une.
- **Particularités** : trois types d'articles (ambiance avec points cliquables vers les produits, top classé, guide) publiés à leur date et rangés sans mélange ; page « Top 10 » à onglets depuis le 19 octobre 2026 (10 sujets, une page par sujet sous `/top-10/<sujet>`, `build/top10.ts`, produits classés selon la note moyenne relevée sur Amazon.fr, note jamais affichée) ; onglet Conseils (une question par page, données structurées FAQ) ; glossaire des matières ; nuancier animé ; animations coupées par « Réduire les animations » ; rapport de build (articles à venir, produits à vérifier) ; journal du référencement `docs/referencement.md`, tenu par la routine « Référencement du jour » (le mercredi) ; emplacements Google AdSense prêts sur les pages de lecture depuis le 12 octobre 2026 (site en examen chez Google depuis le 16 octobre, aucune annonce pour l'instant).

## GitHub

- **Rôle** : code et deux workflows. `pages.yml` : tests, build (épingles comprises), test de bout en bout, déploiement, puis, hors push, signalement des pages à Bing par IndexNow (`scripts/indexnow.mjs`). Le test de bout en bout refuse tout script externe sauf ceux de `pagead2.googlesyndication.com` (AdSense). `pinterest.yml` : chaque jour à 4 h 17 UTC, publication des épingles par l'API Pinterest (accès standard accordé), 5 épingles par passage (`config/pinterest.json`). Le défaut qui lisait une variable `PINTEREST_MAX` vide comme un maximum de 0 est corrigé depuis le 20 octobre 2026 (commit `3529a05`) ; 5 épingles ont été publiées par l'API le 20 octobre. Pinterest renvoie un nouveau refresh token à chaque renouvellement : le workflow ouvre alors un ticket GitHub demandant de recopier `PINTEREST_REFRESH_TOKEN` dans le secret (secret renouvelé le 20 octobre ; le jeton actuel reste valable environ 60 jours).
- **Console** : https://github.com/teiki5320/Keurdeco
- **Identifiants publics** : compte `teiki5320`, dépôt public, branche `main` (pas d'autre branche).
- **Secrets** : secrets Actions attendus `PINTEREST_APP_ID`, `PINTEREST_APP_SECRET`, `PINTEREST_REFRESH_TOKEN` (définis le 19 octobre 2026, refresh token renouvelé le 20 octobre). Variables sans secret : `SITE_URL`, `CLOUDFLARE_WEB_ANALYTICS`, `PINTEREST_VERIFY`, `GOOGLE_VERIFY`, et facultatives `PINTEREST_SANDBOX`, `PINTEREST_MAX`.
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

- **Rôle** : rémunération du site — liens `https://www.amazon.fr/dp/<ASIN>?tag=keurdecofr-21`, tag défini dans `src/amazon.ts` et nulle part ailleurs. 238 produits relevés à la main sur Amazon.fr (`src/data/produits.json`), sans API : jamais d'ASIN, de note, d'avis ni de prix inventés, aucune photo Amazon, mention Partenaires près des liens, en pied de page et dans les mentions légales. `npm run verifier-produits` contrôle la disponibilité ; au 21 octobre 2026, 230 produits actifs et 8 indisponibles (`jarre-terre-cuite-toscane`, `coussin-femme-africaine-jute`, `plaid-tricot-chenille`, `lampadaire-rotin-boheme`, `sphere-terre-cuite-etoiles`, `suspension-paille-parasol`, `plateaux-tresses-lot-2` et `paniers-muraux-jacinthe-lot-7`, retirés de l'affichage ; le dernier est déjà remplacé par un lot de 10).
- **Console** : https://partenaires.amazon.fr (nouveau compte Amazon Partenaires ouvert le 18 octobre 2026, géré avec admin@toakeur.com ; keurdeco.com fait partie des sites déclarés).
- **Identifiants publics** : tag `keurdecofr-21`.
- **Secrets** : aucun dans le dépôt.
- **Coût** : gratuit — commissions sur les achats.

## Réseaux sociaux (Pinterest)

- **Rôle** : canal de trafic principal. Le build génère les épingles 1000 × 1500 (une par titre d'article, 4 gabarits, manifeste `epingles.json`, 216 épingles au manifeste le 21 octobre). Deux voies de publication : l'API Pinterest (accès standard accordé, workflow `pinterest.yml`, 5 épingles par passage, premières épingles publiées le 20 octobre 2026) et l'import CSV par lots de 30 jours, 2 épingles par jour (`npm run pinterest:lot` prépare le CSV, `npm run pinterest:lot -- --confirmer` les note dans `data/pinterest-etat.json` ; lot en cours jusqu'au 18 novembre). Rich Pins par Open Graph et données structurées, bouton « Épingler » sans script externe, balise `p:domain_verify` en ligne.
- **Console** : https://www.pinterest.fr (compte professionnel « Keur Déco », keurdeco@toakeur.com) ; application sur developers.pinterest.com ; parcours OAuth local par `npm run pinterest:auth` (voir `docs/pinterest.md`).
- **Identifiants publics** : balise `p:domain_verify` (variable `PINTEREST_VERIFY`) ; tableaux dans `config/tableaux-pinterest.json` (`board_id` des 20 tableaux renseignés le 16 octobre 2026).
- **Secrets** : voir GitHub (secrets Actions Pinterest).
- **Coût** : gratuit.

## AdSense (publicité web)

- **Rôle** : second revenu du site, mis en place le 12 octobre 2026 ; examen du site demandé à Google le 16 octobre 2026, toujours en cours : **aucune annonce ne s'affiche pour l'instant**. Le code AdSense est ajouté par le marqueur commun `<!--#head-->` sur les pages qui peuvent porter une annonce, Confidentialité comprise (son lien « Gérer mes cookies » rouvre la fenêtre de Google) ; depuis le 13 octobre 2026, il n'est plus chargé sur l'accueil, les Tops (pages Top 10 comprises), À propos, Mentions légales ni la 404 (`pageAvecAdsense` dans `build/site.ts`) ; `public/ads.txt` est servi à la racine (réponse 200 le 13 octobre 2026). Un bloc In-Article « Keur Déco - dans le texte » est placé au build par `build/annonces.ts` : 2 au plus par article, 1 pour un conseil, une fiche du glossaire ou une page de pièce, matière, occasion ou guides ; devant un intertitre, jamais contre un encadré Amazon, signalé « Annonce ». Aucune annonce sur l'accueil, les Tops, À propos, Confidentialité, Mentions légales ni la 404 ; un emplacement non rempli est masqué.
- **Consentement** : fenêtre de choix de Google (Autoriser, Refuser, Gérer les options) ; cookies publicitaires seulement avec accord ; lien « Gérer mes cookies » en bas de chaque page. Confidentialité et mentions légales le décrivent.
- **Console** : https://adsense.google.com (compte `pub-2680784147246798`, géré avec admin@toakeur.com) — site en examen, pas de revenus avant la validation.
- **Identifiants publics** : identifiant éditeur et identifiant du bloc d'annonces, définis une seule fois dans `build/config.ts` (publics, l'éditeur figure aussi dans `ads.txt`).
- **Secrets** : aucun.
- **Coût** : gratuit — Google reverse une part des revenus publicitaires.
