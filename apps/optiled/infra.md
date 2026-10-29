# INFRA — fiche technique

Généré le 21 octobre 2026, mis à jour le 29 octobre 2026 par un scan du dépôt. Pour mettre à jour : relancer ce même prompt.

> Aucun secret dans cette fiche — uniquement des références (noms de variables, consoles).

## En bref

- **Plateforme** : site web statique en français, installable (PWA)
- **Stack** : Vite 8 · TypeScript 6 · Vitest · Playwright
- **Backend** : aucun, tout le calcul se fait dans le navigateur
- **Distribution** : GitHub Pages par GitHub Actions, sur www.kultiled.com
- **Site** : https://www.kultiled.com/ — contact kultiled@toakeur.com
- **IA et outils** : images faites par IA hors du site (OpenArt)

## Parcours

- 🌐 **Web** : 🐙 GitHub — main, CI au vert le 29 octobre [ok] → ⚙️ GitHub Actions — tests, build et test de bout en bout [ok] → 🏠 GitHub Pages — hébergement du site [ok] → 🔗 Nom de domaine — www.kultiled.com depuis le 16 octobre [ok] → 🔎 Google — 98 pages dans l'index au 28 octobre [ok]
- 📝 **Contenu** : ✍️ Articles de conseil — 75 rédigés [ok] → ⏰ GitHub Actions — publication lundi, mercredi, vendredi [ok] → 📰 Rubrique Conseils — 42 en ligne, 33 programmés [ok] → 📌 Pinterest — 12 épingles prêtes, aucun compte [pas encore]
- 🛒 **Affiliation** : 💡 Sélection de lampes — 16 lampes, une indisponible (masquée partout depuis le 28 octobre) [ok] → 🔁 Routine de vérification — dernier passage le 29 octobre ; `npm run verifier-produits` sur le Mac, tout le catalogue vérifié le 28 octobre (96 produits, 6 indisponibles, 5 remplacés) [ok] → 🏆 Top 10 — 9 onglets de 10 produits depuis le 19 octobre, reliés depuis les conseils, les fiches, l'accueil et le calculateur depuis le 28 octobre [ok] → 🛍️ Affiliation — liens Amazon.fr kultiledfr-21 [ok]
- 📰 **Actus** : 🤖 Veille du Studio — 2 passages par jour, 12 h et 19 h [ok] → 🐙 Dépôt teiki5320/veille — fichier kultiled.json [ok] → 🌐 kultiled.com — accueil, page Actus et fiches des cultures, depuis le 27 octobre [ok] → 📄 Articles complets — une page par actu (`actus/<slug>/`), reconstruites à 11 h 50 et 18 h 50 UTC, depuis le 28 octobre [ok]
- 📢 **Publicité** : 📰 Pages de lecture — deux emplacements au plus [ok] → 🍪 Consentement — bandeau de Google en ligne [ok] → 💰 AdSense (publicité web) — examen de kultiled.com demandé le 16 octobre, « En préparation » au 29 octobre [à faire]

## Vue d'ensemble

- **Plateforme** : site web statique, en français, pensé d'abord pour le mobile, installable (PWA : `public/manifest.webmanifest`, `public/sw.js`, consultation hors ligne).
- **Stack** : Vite 8 · TypeScript 6 · Vitest 5 · Playwright (test de bout en bout) · sharp (préparation des images) · police Urbanist hébergée avec le site (`@fontsource-variable/urbanist`). Node.js 22.12 ou plus récent (`package.json`, champ `engines`).
- **Backend** : aucun. Le calculateur tourne entièrement dans le navigateur (`src/calc.ts`, fonctions pures) ; les réglages du visiteur restent dans son navigateur (stockage local) ou dans l'adresse de la page (`src/etat.ts`).
- **Distribution** : GitHub Pages, publication automatique à chaque envoi sur `main` chaque lundi, mercredi et vendredi à 5 h UTC pour les articles de conseil programmés, et chaque jour à 11 h 50 et 18 h 50 UTC, après la veille, pour les pages des articles d'actus (`.github/workflows/pages.yml`, depuis le 28 octobre 2026), sur le domaine `www.kultiled.com` depuis le 16 octobre 2026 (`public/CNAME`, `SITE_URL` dans `build/site.ts`). L'ancien domaine `www.optiled.fr` a été abandonné le 16 octobre 2026 (retiré d'AdSense le 22 octobre 2026) ; il affichait encore le 28 octobre 2026 une page « Kultiled a déménagé » vers le nouveau domaine, publiée par le dépôt `teiki5320/optiled-redirection`.
- **Contact public** : `kultiled@toakeur.com` (mentions légales et page « À propos » ; dans le code depuis le 7 octobre 2026, en ligne depuis le 12). Plus aucune adresse en `alohash.fr` dans le site.
- **Particularités** :
  - 29 pages HTML à la racine (dont `actus.html` depuis le 27 octobre 2026), plus les articles de conseil (`contenu/conseils/`), les pages des 25 cultures et les pages « Top 10 » (`build/top-10.ts`), assemblées au build par un plugin Vite maison (`build/site.ts`) : en-tête, menu, pied de page, sommaire, sitemap, robots.txt, flux RSS `conseils.xml`, balises de partage, données structurées.
  - Données des 25 cultures dans `src/data/legumes.json`, chaque valeur avec sa source ; sélection de lampes Amazon dans `src/data/lampes.json` ; niveaux de budget sans prix dans `src/data/budget.json` (les fourchettes de prix ont été retirées le 28 octobre 2026) ; produits des onglets « Top 10 » dans `src/data/tentes.json` et `src/data/top-10/`.
  - Pages « Top 10 » depuis le 19 octobre 2026 (`build/top-10.ts`) : onglet « Top 10 » dans le menu, une page par sujet (`top-10-<sujet>.html`), publiée seulement si elle compte 10 vrais produits. Neuf onglets en ligne : lampes LED de culture, tentes, kits complets, kits hydroponiques, extracteurs et ventilateurs, minuteurs et thermomètres, terreaux et substrats, lampes pour semis, lampes pour placard. Les lampes sont classées par efficacité, les autres produits selon la note des acheteurs relevée le 19 octobre 2026, note qui n'est ni enregistrée ni affichée.
  - La chaîne de publication refuse de publier si les tests unitaires, le build ou le test de bout en bout échouent (ce qui a bloqué toute mise en ligne du 7 au 12 octobre 2026).
  - Publicité Google AdSense depuis le 12 octobre 2026 (`build/annonces.ts`, fichier `public/ads.txt`) : script et bandeau de consentement de Google sur toutes les pages publiées, sauf le calculateur intégré sur d'autres sites ; annonces seulement dans les guides, conseils, fiches des cultures, parcours et glossaire.
  - Signalement des pages à Bing et aux autres moteurs par IndexNow : après chaque publication réussie depuis le 28 octobre 2026 (`pages.yml`), et chaque lundi à 7 h UTC (`.github/workflows/indexnow.yml`) ; clé publique dans `public/`.
  - Routines Claude Code (console https://claude.ai/code/routines) : `optiled-verification-lampes`, chaque jour (lampes, envoi sur `main` ; les fourchettes de prix n'existent plus depuis le 28 octobre 2026), de nouveau active depuis le 13 octobre 2026 (dernier envoi le 29 octobre 2026) après une interruption depuis le 1er octobre ; `optiled-nouvelle-serie-conseils`, rappel unique le 16 novembre 2026 pour préparer la série suivante d'articles.

## GitHub

- **Rôle** : hébergement du code (`teiki5320/optiled`, branche unique `main`) et chaîne de publication GitHub Actions : `npm ci` → `npm test` → `npm run build` → installation de Chromium → `npm run test:e2e` → envoi de `dist/` vers GitHub Pages. Depuis le 28 octobre 2026, chaque publication écrit `version.txt` (commit et numéro de lancement) et échoue si www.kultiled.com ne sert pas cette version dans les 3 minutes ; chaque passage programmé réactive la tâche (GitHub la coupe après 60 jours sans activité) ; IndexNow part après chaque publication réussie. Dernière publication réussie le 29 octobre 2026. Second workflow : IndexNow (dernier passage réussi le 26 octobre 2026).
- **Console** : https://github.com/teiki5320/optiled (onglet *Actions* pour le suivi des publications).
- **Identifiants publics** : nom du dépôt `teiki5320/optiled`.
- **Secrets** : aucun secret ni variable de dépôt. Le workflow n'utilise que les autorisations fournies par GitHub (`pages: write`, `id-token: write`).
- **Coût** : gratuit (dépôt public) — à vérifier dans la console en cas de changement de visibilité.

## Hébergement web (GitHub Pages / Cloudflare Pages)

- **Rôle** : hébergement du site statique produit dans `dist/`, sur GitHub Pages (en-tête `server: GitHub.com` constaté le 12 octobre 2026). Pas de Cloudflare Pages.
- **Console** : https://github.com/teiki5320/optiled/settings/pages
- **Identifiants publics** : domaine personnalisé `www.kultiled.com` (fichier `public/CNAME`) ; `kultiled.com` et l'ancienne adresse `https://teiki5320.github.io/optiled/` redirigent vers lui (301, constaté le 28 octobre 2026).
- **Secrets** : aucun.
- **Coût** : gratuit.

## Nom de domaine

- **Rôle** : `kultiled.com`, acheté chez Cloudflare le 16 octobre 2026, qui en gère aussi le DNS : deux CNAME, `@` et `www` → `teiki5320.github.io`, proxy désactivé. L'ancien domaine `optiled.fr` (IONOS) a été abandonné le 16 octobre 2026 ; il servait encore la page de redirection le 28 octobre 2026, jusqu'à la fin du contrat IONOS en novembre 2026. L'adresse de contact publique, elle, est sur `toakeur.com`.
- **Console** : https://dash.cloudflare.com (Domaines → kultiled.com → DNS) ; ancien domaine sur https://my.ionos.fr.
- **Identifiants publics** : nom de domaine `kultiled.com`.
- **Secrets** : identifiants des comptes Cloudflare et IONOS, conservés hors du dépôt.
- **Coût** : à vérifier dans la console Cloudflare.

## Amazon Partenaires (affiliation)

- **Rôle** : liens sponsorisés vers les lampes conseillées (`https://www.amazon.fr/dp/<ASIN>?tag=…`, `rel="sponsored nofollow noopener"` depuis le 28 octobre 2026, bouton nommé « Voir sur Amazon : <nom>, lien partenaire (nouvel onglet) »), générés par `src/lampes.ts` ; page `lampes.html`, page `meilleures-lampes.html`, les neuf pages « Top 10 » (10 liens chacune, constaté le 20 octobre 2026), propositions dans le calculateur et, depuis le 28 octobre 2026, encadré « Lampe conseillée » de chaque fiche culture et encadré « Le matériel pour ça » de 13 conseils (2 produits au plus, plus un lien vers le Top 10). Bouton plein « Voir sur Amazon » d'au moins 44 px partout. Aucun prix de matériel sur le site depuis le 28 octobre 2026 (niveaux de budget à la place). Aucun prix, note ni avis n'est enregistré dans le dépôt (règles du programme, contrôlées par les tests).
- **Console** : https://partenaires.amazon.fr (nouveau compte créé le 18 octobre 2026, identifiant `kultiledfr-21` ; l'ancien compte, où `kultiled.com` avait été déclaré le 16 octobre à côté d'`optiled.fr`, a été fermé par Amazon).
- **Identifiants publics** : identifiant de suivi `kultiledfr-21` (table unique des codes par emplacement dans `src/suivi-amazon.ts` depuis le 28 octobre 2026 : calculateur, Top 10, fiches, guides, conseils ; tous encore sur `kultiledfr-21`), depuis le 18 octobre 2026 : nouveau compte Amazon Partenaires créé le 18 octobre 2026, l'ancien ayant été fermé par Amazon (l'ancien identifiant était `optiled-21`).
- **Secrets** : identifiants du compte et informations de paiement, uniquement dans la console Amazon.
- **Coût** : gratuit.

## Analytics (mesure d'usage)

- **Rôle** : Cloudflare Web Analytics, mesure d'audience gratuite et sans cookie, **active sur le site en ligne** depuis la publication du 12 octobre 2026 (script `static.cloudflareinsights.com/beacon.min.js` présent sur les pages). Une seule source depuis le 12 octobre 2026 : le jeton du site, écrit dans le code (constante `JETON_MESURE_AUDIENCE`, `build/site.ts`), commande à la fois le script, ajouté au seul build de production, et la phrase des mentions légales, qui décrit la mesure (sans cookie, pages vues agrégées, adresse IP non conservée). L'ancienne variable de dépôt `CF_BEACON_TOKEN` a été retirée du code et du workflow. Le test de bout en bout (`scripts/e2e.mjs`) n'autorise que ce script et ceux de Google AdSense.
- **Console** : https://dash.cloudflare.com → Analytics & Logs → Web Analytics (site créé pour `www.optiled.fr`, même jeton depuis le passage à `kultiled.com` ; dernier état connu, non revérifié le 27 octobre 2026 : nom d'hôte à vérifier dans la console).
- **Identifiants publics** : jeton du site (32 caractères, visible dans les pages, non secret), dans `JETON_MESURE_AUDIENCE`.
- **Secrets** : aucun.
- **Coût** : gratuit.

## AdSense (publicité web)

- **Rôle** : annonces display de Google dans les pages de lecture, ajoutées le 12 octobre 2026 (`build/annonces.ts`). Au plus deux par page (milieu et fin de l'article), signalées « Publicité », jamais dans le calculateur, le carnet de suivi ni les pages de lampes, jamais à côté d'un lien Amazon (ni à moins de 3 000 caractères de HTML d'un lien Amazon, depuis le 28 octobre 2026, pour garder les encadrés produits loin des annonces) ; l'emplacement reste replié tant que Google ne fournit pas d'annonce. Le bandeau de consentement est celui de Google (Autoriser, Refuser, Gérer les options), rouvert par le lien « Gérer les cookies » du pied de page ; les mentions légales et la page « À propos » décrivent la publicité et ses cookies. Le calculateur intégré sur d'autres sites ne charge pas le code de Google. Script et `ads.txt` constatés en ligne le 13 octobre 2026 ; examen du nouveau domaine `kultiled.com` demandé le 16 octobre 2026 ; l'ancien site `optiled.fr` a été supprimé du compte AdSense le 22 octobre 2026. Identifiant d'éditeur `ca-pub-…` et `ads.txt` constatés en ligne sur kultiled.com le 28 octobre 2026.
- **Console** : https://adsense.google.com (examen de `kultiled.com` « En préparation » au 29 octobre 2026 ; la console y affiche encore `ads.txt` « Introuvable » alors que le fichier répond (200) : elle ne l'a pas revérifié).
- **Identifiants publics** : identifiant d'éditeur (constante `CLIENT_ADSENSE`) et bloc d'annonces « Kultiled - articles » (constante `BLOC_ARTICLES`), dans `build/annonces.ts` ; ligne de déclaration dans `public/ads.txt`.
- **Secrets** : aucun dans le dépôt ; compte et informations de paiement uniquement dans la console AdSense.
- **Coût** : gratuit (Google prélève sa part sur les revenus).

## Veille actus

- **Rôle** : actus de la culture en intérieur et de l'éclairage des plantes, préparées deux fois par jour (12 h et 19 h) par la tâche de veille du Studio dans le dépôt public `teiki5320/veille`, et lues **en direct dans le navigateur** du visiteur (`src/veille.ts`, délai de 8 s, cache de 15 min), sans reconstruire le site. En ligne depuis le 27 octobre 2026 : bloc de 4 actus sur l'accueil (sous le calculateur), page `actus.html` (20 actus et date de mise à jour) et bloc de 3 actus sur chaque page culture qui en a (tag `legume:<id>`). Si le fichier est injoignable, les blocs restent cachés et le calculateur n'est pas touché. Le build publie aussi `veille/entites.json` (25 cultures), que la veille lit pour relier une actu à une fiche (`build/veille.ts`). Le test de bout en bout vérifie l'affichage avec un fichier d'essai et avec un fichier coupé.
- **Articles complets (depuis le 28 octobre 2026)** : toucher une actu ouvre son article sur le site (300 à 450 mots, rédigé par la veille). Au build (`build/articles.ts`), le site lit l'index de tous les articles (`articles/kultiled/index.json`, jamais vidé) et le fichier des actus, puis construit une page statique par article : `actus/<slug>/` (fil d'Ariane, titre, chapô, date, durée de lecture, image et crédit, intertitres, encadré « Sources », liens vers les fiches cultures citées, 3 autres actus, une annonce AdSense après l'article comme les autres pages de lecture), dans le sitemap et donc signalée par IndexNow, avec adresse canonique, Open Graph et données `NewsArticle`. Une actu publiée après la dernière construction s'ouvre dans la page de secours `actus/article/?id=<id>` (remplie dans le navigateur, `noindex`, hors sitemap). Les cartes choisissent le lien au build (liste des pages construites écrite dans le code). Veille injoignable au build : 0 page d'article, le reste du site est publié normalement. Reconstruction automatique à 11 h 50 et 18 h 50 UTC (`.github/workflows/pages.yml`), sans clé ni secret.
- **Console** : https://github.com/teiki5320/veille (fichiers lus : https://teiki5320.github.io/veille/actus/kultiled.json et https://teiki5320.github.io/veille/articles/kultiled/index.json).
- **Identifiants publics** : adresse du fichier (`URL_VEILLE`, `src/veille.ts`). Pas de politique de sécurité du contenu (CSP) sur le site : rien à ouvrir.
- **Secrets** : aucun.
- **Coût** : gratuit (GitHub Pages ; la tâche tourne sur l'abonnement Claude du Studio).

## API d'IA (génération d'images)

- **Rôle** : photos de couverture des guides et des articles, miniatures des cultures et illustrations des lampes, générées par IA hors du site puis converties en WebP (`npm run images`, `npm run planche`) ; le site n'appelle aucune IA. Les consignes du projet (`CLAUDE.md`) imposent OpenArt en priorité, avec annonce du coût en crédits avant chaque génération ; les premières images ont été faites avec ElevenLabs (d'après le README). Le pied de page signale les images générées. Depuis le 27 octobre 2026, trois guides LED (`led-puissance`, `led-comparer`, `led-semis`) et les deux parcours (`debuter`, `tente`), qui n'avaient pas de photo, ont une photo libre de droits (Wikimedia Commons ou Openverse, `src/data/photos-libres.json`, `npm run images-libres`), avec auteur et licence sous l'image.
- **Console** : OpenArt (crédits) — à vérifier dans la console.
- **Identifiants publics** : aucun dans le code.
- **Secrets** : aucun dans le dépôt.
- **Coût** : crédits consommés à chaque génération — à vérifier dans la console du service.
