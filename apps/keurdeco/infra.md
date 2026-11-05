# INFRA — fiche technique

Mis à jour le 5 novembre 2026 d'après le dépôt et le site en ligne. Cette fiche, avec MARKETING.md et PUBLICATION.md, est désormais la source : le Studio la recopie.

## En bref

- **Plateforme** : site éditorial statique, mobile d'abord, installable
- **Stack** : Vite + TypeScript, Markdown + YAML, tests Vitest et Chromium
- **Backend** : aucun — tout est généré au build
- **Distribution** : GitHub Pages, à chaque push, lundi, mercredi, vendredi, et 2 fois par jour après la veille (articles d'actus)
- **Site** : www.keurdeco.com
- **IA et outils** : images d'ambiance OpenArt, photos libres Wikimedia pour 6 conseils, épingles générées au build, veille actus (lue en direct)

## Parcours

- 🌐 **Web** : 🐙 GitHub — main · CI au vert le 5 novembre [ok] → 📄 Hébergement web — GitHub Pages, HTTPS imposé [ok] → 🌍 Nom de domaine — keurdeco.com chez Cloudflare [ok] → 🔎 Google et Bing — 121 pages sur 137 indexées au 3 novembre [à faire]
- 🛒 **Affiliation** : 📝 Articles — 26 en ligne, 13 programmés [ok] → 🛍️ Affiliation — Amazon Partenaires, tag keurdecofr-21 [ok] → 💶 Commissions — à vérifier dans la console [pas encore]
- 📌 **Contenu** : 🖼️ Épingles — générées au build [ok] → 📥 Import CSV — lot jusqu'au 18 novembre [ok] → 🤖 API Pinterest — accès standard, 5 épingles par passage [ok]
- 📰 **Publicité** : 📄 Pages de lecture — emplacements In-Article [ok] → 📰 AdSense (publicité web) — « En préparation » au 4 novembre, aucune annonce [à faire]

## Vue d'ensemble

- **Plateforme** : site web éditorial en français sur la décoration africaine — statique multipage, mobile d'abord, installable (manifeste + service worker), lisible sans JavaScript.
- **Stack** : Vite + TypeScript (Node ≥ 22.18), aucun backend — articles et conseils en Markdown + YAML (`contenu/articles/`, `contenu/conseils/`), données en JSON (`src/data/`), polices Fraunces et Source Sans 3 hébergées avec le site, tests Vitest + test de bout en bout Chromium.
- **Distribution** : GitHub Pages par le workflow `pages.yml` — à chaque push sur `main`, chaque lundi, mercredi et vendredi à 5 h UTC (publication des articles programmés), chaque jour à 11 h 50 et 18 h 50 UTC depuis le 28 octobre 2026 (pages des nouveaux articles d'actus, après la veille de 12 h et 19 h) et à la demande ; adresse `https://www.keurdeco.com/`.
- **Images** : images d'ambiance créées avec OpenArt pendant les séances de rédaction (pas d'appel depuis le site) ; les 12 conseils programmés sans image ont été complétés le 27 octobre 2026 par 6 photos libres de Wikimedia Commons et 6 cartes générées aux couleurs du site, et les 7 conseils ajoutés le 2 novembre 2026 ont chacun une carte générée, rangées dans le dépôt en WebP, crédit sous l'image (`src/data/credits-images.json`, `npm run images-libres`) ; les 39 articles portent `image_ia: true` et la mention correspondante, comme les 13 images d'ambiance à points cliquables des pages Top 10 (20 octobre 2026). Les vignettes des produits sont découpées dans ces images (`npm run vignettes`), jamais de photo Amazon ; les 100 produits des onglets Top 10 en ont une.
- **Particularités** : trois types d'articles (ambiance avec points cliquables vers les produits, top classé, guide) publiés à leur date et rangés sans mélange ; page « Top 10 » à onglets depuis le 19 octobre 2026 (10 sujets, une page par sujet sous `/top-10/<sujet>`, `build/top10.ts`, produits classés selon la note moyenne relevée sur Amazon.fr, note jamais affichée) ; onglet Conseils (une question par page, données structurées FAQ) ; page Actus et blocs d'actus de la veille (accueil, pages matières) depuis le 27 octobre 2026, et depuis le 28 octobre 2026 une page d'article complet par actu (`/actus/<slug>/`, 300 à 450 mots) ; glossaire des matières ; nuancier animé ; animations coupées par « Réduire les animations » ; rapport de build (articles à venir, produits à vérifier) ; journal du référencement `docs/referencement.md`, tenu par la routine « Référencement du jour » (le mercredi ; dernier passage le 4 novembre 2026, 1 page retravaillée, le Top terre cuite, en ligne depuis le déploiement du 4 novembre 2026 au soir) ; menu « Les sites Keur » dans l'en-tête vers Keurbook, Keur Cook, Keurfoot, Keur Kado, Keur Bible et toakeur.com (choix de Jean du 3 novembre 2026, en ligne depuis le 4 novembre 2026) ; emplacements Google AdSense prêts sur les pages de lecture depuis le 12 octobre 2026 (site en examen chez Google depuis le 16 octobre, aucune annonce pour l'instant).

## Veille actus

- **Rôle** : actus de la déco, du design et de l'artisanat africains, depuis le 27 octobre 2026. La tâche de veille (Mac mini, 12 h et 19 h) écrit `actus/keurdeco.json` dans le dépôt public `teiki5320/veille` ; le site le lit en direct dans le navigateur (`src/veille.ts`, délai 8 s, cache 15 min), sans reconstruction. Blocs : accueil (4), page `actus.html` (20), pages matières (3, tag `matiere:<id>`). Depuis le 28 octobre 2026, la veille rédige aussi un article complet par actu (`articles/keurdeco/<id>.json`, index de tous les articles dans `articles/keurdeco/index.json`, jamais supprimés) : avant chaque build, `scripts/veille-articles.ts` les lit et le build en fait une page `/actus/<slug>/` (sitemap, JSON-LD NewsArticle, `build/articles-veille.ts`) ; une actu plus récente que le dernier build s'ouvre sur la page de secours `/actus/article/?id=<id>` (noindex, rendue dans le navigateur). Toute la carte d'une actu ouvre l'article sur le site. Si la veille ne répond pas, le build continue sans page d'article. Le build publie `https://www.keurdeco.com/veille/entites.json` (8 matières) pour la veille. Pas de CSP sur le site ; le service worker ignore les autres origines.
- **Console** : https://github.com/teiki5320/veille
- **Identifiants publics** : `https://teiki5320.github.io/veille/actus/keurdeco.json`, `https://teiki5320.github.io/veille/articles/keurdeco/index.json`.
- **Secrets** : aucun.
- **Coût** : gratuit.

## GitHub

- **Rôle** : code et deux workflows. `pages.yml` : tests, build (épingles comprises), test de bout en bout, déploiement, vérification que www.keurdeco.com sert bien la nouvelle version (fichier `version.txt` = commit + numéro de lancement, relu jusqu'à 3 minutes, sinon échec ; depuis le 28 octobre 2026), réactivation de la tâche programmée à chaque passage programmé (GitHub la coupe après 60 jours sans activité), puis signalement des pages à Bing par IndexNow (`scripts/indexnow.mjs`) après chaque publication, envois sur `main` compris depuis le 28 octobre 2026 (après les reconstructions de la veille, seulement les pages `/actus/`). Le 4 novembre 2026 au matin, `pages.yml` a échoué aux tests : le référencement du jour avait ajouté des liens vers le Top terre cuite (publié le 12 octobre) depuis deux pages parues avant lui, ce que le test des liens internes refusait (`build/contenu.test.ts`) ; corrigé le 4 novembre 2026 après-midi (commit `60691cc` : un lien ajouté après coup vers une page déjà en ligne est accepté). Depuis, les déploiements passent : dernier déploiement réussi le 4 novembre 2026 à 18 h 59 UTC (passage programmé, version `122d9f1` en ligne, vérifiée par `version.txt` le 5 novembre 2026). Le test de bout en bout refuse tout script externe sauf ceux de `pagead2.googlesyndication.com` (AdSense). `pinterest.yml` : chaque jour à 4 h 17 UTC, publication des épingles par l'API Pinterest (accès standard accordé), 5 épingles par passage (`config/pinterest.json`). Le défaut qui lisait une variable `PINTEREST_MAX` vide comme un maximum de 0 est corrigé depuis le 20 octobre 2026 (commit `3529a05`) ; l'API a publié ses 5 premières épingles le 20 octobre et 140 au total au 5 novembre 2026 (`data/pinterest-etat.json`). Pinterest renvoie un nouveau refresh token à chaque renouvellement, mais l'ancien reste valable environ 60 jours après sa création (secret renouvelé le 20 octobre 2026). Jusqu'au 28 octobre 2026, le workflow ouvrait un ticket « mettre à jour le secret » à chaque passage (13 ouverts, n° 2 à 14, du 20 au 28 octobre, tous fermés le 28 octobre 2026) ; depuis le 28 octobre 2026, comme Keur Kado, il n'ouvre plus qu'un seul ticket de rappel « Pinterest : refaire la clé du compte avant son échéance » (n° 15, ouvert le 29 octobre 2026), et `npm run pinterest:secrets` (`scripts/pinterest-secrets.mjs`) range la nouvelle clé de `.env` dans les secrets GitHub sans l'afficher.
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
- **Umami (depuis le 5 novembre 2026)** : Umami Cloud, offre gratuite, région UE, sans cookie ; un seul identifiant de site partagé par les sites de la maison (`UMAMI_WEBSITE_ID` dans `build/site.ts`, public), balise `mesureUmami()` sur toutes les pages, limitée à `www.keurdeco.com` et `keurdeco.com`. Clics comptés : « Clic Amazon » (avec le produit) et « Menu sites Keur » (avec le site). Console : https://cloud.umami.is. Cloudflare Web Analytics reste en place.

## Affiliation (Amazon Partenaires)

- **Rôle** : rémunération du site — liens `https://www.amazon.fr/dp/<ASIN>?tag=keurdecofr-21`, tag défini dans `src/amazon.ts` et nulle part ailleurs (table `CODES_SUIVI` : un code par type de page — ambiance, guide, top, conseil, rubrique —, tous à keurdecofr-21 au 28 octobre 2026 en attendant les codes par emplacement). 238 produits relevés à la main sur Amazon.fr (`src/data/produits.json`), sans API : jamais d'ASIN, de note, d'avis ni de prix inventés, aucune photo Amazon, mention Partenaires près des liens, en pied de page et dans les mentions légales. `npm run verifier-produits` contrôle la disponibilité ; au 29 octobre 2026, 226 produits actifs et 12 indisponibles, 225 et 13 le 3 novembre 2026, de nouveau 226 et 12 depuis le 4 novembre 2026 (voir plus bas) (`jarre-terre-cuite-toscane`, `coussin-femme-africaine-jute`, `plaid-tricot-chenille`, `lampadaire-rotin-boheme`, `sphere-terre-cuite-etoiles`, `suspension-paille-parasol`, `plateaux-tresses-lot-2`, `paniers-muraux-jacinthe-lot-7`, `tissu-bogolan-indigo-fleches`, devenu indisponible à la vérification du 25 octobre, `chemin-table-paisley-africain-40x225`, devenu indisponible à celle du 26 octobre, ainsi que `guirlande-perles-bois` et `awale-mancala-bois`, trouvés sans bouton d'achat le 28 octobre lors de la vérification des 65 produits ajoutés aux conseils et aux pages de pièces et de matières ; tous retirés de l'affichage, `paniers-muraux-jacinthe-lot-7` est déjà remplacé par un lot de 10). `coussin-wax-vert-baobab`, indisponible le 27 octobre, a été remplacé le 28 octobre 2026 par un lot de 12 coupons (B08LNKXY3F) et est de nouveau actif. Le 29 octobre 2026, `tapis-berbere-rouge-140x200` (indisponible le 27 octobre) est de nouveau en vente (B08GZF3KZB revérifié) et `coupons-tissus-africains-lot-6` (indisponible le 28 octobre) a été remplacé par un lot de 12 coupons Ankara 50 × 40 cm (B08JYJFQVL) ; tous deux sont de nouveau actifs. Le 1er novembre 2026, `table-appoint-manguier-laiton` (B07H3XRQ2Y, plus en vente) a été remplacée par la table d'appoint Casa Moro Saada peinte main (B07H4ST9YG) et reste active ; à la vérification du 2 novembre 2026, les 30 produits contrôlés étaient tous disponibles ; à celle du 3 novembre 2026, `tapis-rond-jute-lurex-80` est devenu indisponible (retiré de l'affichage) : 225 produits actifs et 13 indisponibles. Le 4 novembre 2026, il a été remplacé par le tapis rond en jute au motif ajouré Atmosphera, 80 cm (B07T9VWSSK, 4,4 étoiles, 420 avis, en stock) : 226 produits actifs et 12 indisponibles, en ligne depuis le déploiement du 4 novembre 2026 au soir (vérifié sur le site le 5 novembre 2026).
- **Console** : https://partenaires.amazon.fr (nouveau compte Amazon Partenaires ouvert le 18 octobre 2026, géré avec admin@toakeur.com ; keurdeco.com fait partie des sites déclarés).
- **Identifiants publics** : tag `keurdecofr-21`.
- **Secrets** : aucun dans le dépôt.
- **Coût** : gratuit — commissions sur les achats.

## Réseaux sociaux (Pinterest)

- **Rôle** : canal de trafic principal. Le build génère les épingles 1000 × 1500 (une par titre d'article, 4 gabarits, manifeste `epingles.json`, 219 épingles au manifeste le 24 octobre). Deux voies de publication : l'API Pinterest (accès standard accordé, workflow `pinterest.yml`, 5 épingles par passage, premières épingles publiées le 20 octobre 2026, 140 publiées au 5 novembre 2026) et l'import CSV par lots de 30 jours, 2 épingles par jour (`npm run pinterest:lot` prépare le CSV, `npm run pinterest:lot -- --confirmer` les note dans `data/pinterest-etat.json` ; lot en cours jusqu'au 18 novembre). Rich Pins par Open Graph et données structurées, bouton « Épingler » sans script externe, balise `p:domain_verify` en ligne.
- **Console** : https://www.pinterest.fr (compte professionnel « Keur Déco », keurdeco@toakeur.com) ; application sur developers.pinterest.com ; parcours OAuth local par `npm run pinterest:auth` (voir `docs/pinterest.md`).
- **Identifiants publics** : balise `p:domain_verify` (variable `PINTEREST_VERIFY`) ; tableaux dans `config/tableaux-pinterest.json` (`board_id` des 20 tableaux renseignés le 16 octobre 2026).
- **Secrets** : voir GitHub (secrets Actions Pinterest).
- **Coût** : gratuit.

## AdSense (publicité web)

- **Rôle** : second revenu du site, mis en place le 12 octobre 2026 ; examen du site demandé à Google le 16 octobre 2026, toujours en cours (« En préparation » dans la console AdSense, ni validé ni refusé, `ads.txt` « Autorisé », vérifié dans la console le 4 novembre 2026 ; console non consultable le 5 novembre 2026, session Google déconnectée ; aucun mail de Google sur keurdeco.com au 5 novembre 2026) : **aucune annonce ne s'affiche pour l'instant**. Le code AdSense est ajouté par le marqueur commun `<!--#head-->` sur les pages qui peuvent porter une annonce, Confidentialité comprise (son lien « Gérer mes cookies » rouvre la fenêtre de Google) ; depuis le 13 octobre 2026, il n'est plus chargé sur l'accueil, les Tops (pages Top 10 comprises), la page Actus (depuis le 27 octobre 2026), À propos, Mentions légales ni la 404 (`pageAvecAdsense` dans `build/site.ts`) ; depuis le 28 octobre 2026, ce code n'est plus dans l'affichage initial (environ 300 Ko de moins) ; depuis le 28 octobre 2026 au soir, comme sur keurkado.com, il est ajouté une fois la page entièrement chargée, quand le navigateur est libre et au plus tard 3 secondes après (`codeAdsense` ; il était auparavant chargé au premier geste du visiteur ou après 4 secondes), et toutes les pages portent la balise de propriété `google-adsense-account` (`compteAdsense`) ; `public/ads.txt` est servi à la racine (réponse 200 le 13 octobre 2026). Un bloc In-Article « Keur Déco - dans le texte » est placé au build par `build/annonces.ts` : 2 au plus par article, 1 pour un conseil, une fiche du glossaire ou une page de pièce, matière, occasion ou guides ; devant un intertitre, jamais contre un encadré Amazon, signalé « Annonce ». Aucune annonce sur l'accueil, les Tops, la page Actus, À propos, Confidentialité, Mentions légales ni la 404 ; un emplacement non rempli est masqué.
- **Consentement** : fenêtre de choix de Google (Autoriser, Refuser, Gérer les options) ; cookies publicitaires seulement avec accord ; lien « Gérer mes cookies » en bas de chaque page. Confidentialité et mentions légales le décrivent.
- **Console** : https://adsense.google.com (compte `pub-2680784147246798`, géré avec admin@toakeur.com) — site en examen, pas de revenus avant la validation.
- **Identifiants publics** : identifiant éditeur et identifiant du bloc d'annonces, définis une seule fois dans `build/config.ts` (publics, l'éditeur figure aussi dans `ads.txt`).
- **Secrets** : aucun.
- **Coût** : gratuit — Google reverse une part des revenus publicitaires.
