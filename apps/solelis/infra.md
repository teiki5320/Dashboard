# INFRA — fiche technique

> Mise à jour le 30 octobre 2026 (contrôle du jour : site actif et en ligne, CI au vert le 30 octobre 2026, sitemap de 110 adresses dont 26 articles Conseils publiés et 12 articles d'actus, 93 pages indexées sur 108 suivies, mesure d'audience Cloudflare Web Analytics en place. Auparavant, le 29 octobre 2026 : CI au vert le 28 octobre, sitemap de 105 adresses. Auparavant, le 28 octobre 2026 : ancienne base Supabase de l'époque Avelor absente du compte Supabase ; actus : chaque actu a son article complet sur le site, page /actus/<slug> construite au build, page de secours /actus/article pour les plus récentes, reconstruction automatique 2 fois par jour par la CI, à 11 h 50 et 18 h 50 UTC. Auparavant, le 27 octobre 2026 : refonte faite, site actif ; veille actus lue depuis teiki5320.github.io sur la page /actus et les pages situation, aucune actu sur l'accueil ; images des conseils et des guides rangées dans le dépôt. Auparavant, le 24 octobre 2026 : mise en ligne automatique par la CI GitHub depuis le 23 octobre 2026 ; correctif SOS Amitié, page « Dettes fiscales et sociales » et IndexNow en ligne ; rubrique Conseils publiée par date, pages Conseils et sitemap mises en cache 1 h par le Worker ; mesure d'audience toujours inactive en production).
> Aucun secret dans cette fiche — uniquement des références (noms de variables, consoles).

## En bref

- **Plateforme** : site web, actif et en ligne sur solelis.com
- **Stack** : Next.js 16.4 · React 19 · TypeScript · Tailwind 3.4
- **Backend** : Worker Cloudflare (OpenNext) · base D1 « solelis » (UE)
- **Distribution** : Cloudflare Workers, mise en ligne automatique par la CI GitHub à chaque envoi sur `main` (depuis le 23 octobre 2026)
- **Site** : https://solelis.com (www redirige)
- **IA et outils** : aucune IA sur le site · Resend, API Recherche d'entreprises, BODACC, veille actus (fichier préparé par une tâche Claude, lu dans le navigateur)

## Parcours

- 🌐 **Web** : 🐙 GitHub — main · CI au vert, publie à chaque envoi [ok] → 🌐 Hébergement web — Worker Cloudflare « solelis » [ok] → 🏷️ Nom de domaine — solelis.com, SSL auto [ok] → 🔎 Google — 93 pages indexées sur 108 [à faire]
- 📝 **Contenu** : 🐙 GitHub — articles Markdown des Conseils [ok] → ⚙️ Build — génération des articles [ok] → 🕒 Publication — à sa date, sans redéploiement [ok] → 📣 Réseaux sociaux — aucun compte rattaché [pas encore]
- 📰 **Actus** : 🤖 Tâche de veille — 12 h et 19 h, actus et articles complets [ok] → 🐙 GitHub Pages — teiki5320.github.io/veille (actus/solelis.json, articles/solelis/) [ok] → ⚙️ Reconstruction — CI 2 fois par jour (11 h 50 et 18 h 50 UTC) [ok] → 🌐 Site — /actus, articles /actus/<slug>, pages situation, jamais l'accueil [ok]

## Vue d'ensemble

- **État** : ✅ actif, en ligne sur https://solelis.com (refonte faite : nom Solelis, logo, design)
- **Stack** : Next.js 16.4 (App Router) · React 19 · TypeScript · Tailwind 3.4 · Node 22
- **Hébergement** : Cloudflare Workers — Worker « solelis », site Next.js adapté par OpenNext (`@opennextjs/cloudflare`), mis en ligne par la CI GitHub à chaque envoi sur `main` depuis le 23 octobre 2026 (avant cette date, à la main avec `npm run cf:deploy`, qui reste possible en secours)
- **Domaine** : solelis.com, enregistré chez Cloudflare (www.solelis.com redirige vers solelis.com, voir `worker.ts`)
- **Base de données** : Cloudflare D1 « solelis » (juridiction UE), binding `DB`, schéma dans `migrations/`
- **E-mail** : Resend (liens magiques + rappels quotidiens)
- **Données d'entreprise** : API Recherche d'entreprises (serveur et navigateur), BODACC, INSEE Sirene en secours, Google Places pour les avocats
- **Contenus** : rubrique Conseils — articles Markdown dans `content/conseils/`, convertis au build par `scripts/generer-conseils.ts` (lancé avant `dev`, `build`, `test` et dans la CI) ; `/conseils`, `/conseils/rss.xml` et `/sitemap.xml` sont rendus à la requête et n'affichent que les articles dont la date est passée (heure de Paris), ce qui publie les articles programmés sans redéploiement. Ces pages et le sitemap sont mis en cache 1 h par le Worker (clé liée à la version déployée, `worker.ts`) : un article programmé paraît au plus une heure après sa date. Aucun service externe. Chaque conseil et chaque guide (pages situation) a une image copiée dans le dépôt (`public/illustrations/`, WebP 1200 px + version 640 px `-640.webp` pour les téléphones, chargée en priorité), avec son crédit dans `data/illustrations.json` (photos Wikimedia Commons ou Openverse en licence libre, sinon carte « Illustration : Solelis ») ; `node scripts/illustrations.mjs` complète seulement les pages qui n'en ont pas
- **Veille actus** : la page https://solelis.com/actus (20 actus) et un bloc « Dans l'actualité » (3 actus) en bas des 4 pages situation affichent les actus lues au build (dans le HTML, lisibles par les moteurs de recherche), puis les remplacent, dans le navigateur du visiteur, par `https://teiki5320.github.io/veille/actus/solelis.json` (dépôt public `teiki5320/veille`, mis à jour à 12 h et 19 h par une tâche Claude) — `lib/veille.ts`, `components/actus/`. Délai 8 s, cache 15 min, rien d'affiché en cas d'erreur ; aucune actu sur l'accueil (consigne de Jean), ni dans la fiche ou le questionnaire ; aucune donnée de dirigeant envoyée. Les images des actus sont servies par teiki5320.github.io. Le site expose ses situations à la veille sur https://solelis.com/veille/entites.json (généré depuis `lib/situations.ts`). France uniquement. Gratuit, aucune clé. **Articles complets** (depuis le 28 octobre 2026) : toute la carte d'une actu ouvre son article sur le site (300 à 450 mots, réécrit par la veille, source et crédit de l'image toujours visibles). Au build, `scripts/articles-veille.ts` (`npm run veille`, lancé avant `dev`, `build`, `test` et dans la CI) lit l'index de tous les articles `articles/solelis/index.json` (la veille n'en retire jamais, même quand l'actu sort des actus récentes ; à défaut, les actus récentes de `actus/solelis.json`), puis chaque `articles/solelis/<id>.json`, et génère `lib/veille-articles.generated.ts` et `lib/veille-slugs.generated.ts` (non versionnés) : une page statique `/actus/<slug>` par article, anciens compris (JSON-LD NewsArticle, dans le sitemap donc signalée à IndexNow). Si la veille ne répond pas, le build passe avec 0 article. Les articles parus après la dernière construction s'ouvrent sur la page de secours `/actus/article?id=<id>` (lue dans le navigateur, `noindex`, hors sitemap) ; sans article, la carte mène à la source. La CI reconstruit et republie le site chaque jour à 11 h 50 et 18 h 50 UTC (12 h 50 et 19 h 50 l'hiver), après la veille, sans clé de plus. CSP du site limitée à `frame-ancestors` : rien à autoriser pour teiki5320.github.io
- **Sitemap** : `lastmod` de chaque page = date de son dernier commit (`scripts/dates-pages.ts`, `npm run dates`, CI avec historique complet `fetch-depth: 0`) ; /actus = date du fichier des actus, fréquence `daily`
- **IndexNow** (Bing, DuckDuckGo, Ecosia…) : clé publique servie par `public/6420c222dd7200cc295dd43a6324ec71.txt` ; `node scripts/indexnow.mjs` signale les pages du sitemap — lancé par la CI après chaque mise en ligne (en ligne depuis le 23 octobre 2026 ; à lancer à la main après un `npm run cf:deploy` de secours)
- **Tâche planifiée** : Cron Trigger Cloudflare chaque jour à 7 h UTC → `GET /api/cron/rappels`
- **CI** : GitHub Actions (génération des Conseils → articles des actus → lint → TypeScript → build → tests → build OpenNext) à chaque push/PR vers `main`, et chaque jour à 11 h 50 et 18 h 50 UTC (depuis le 28 octobre 2026, pour les articles des actus ; aussi lançable à la main) ; sur `main` (envoi, horaire ou lancement manuel), elle publie ensuite sur Cloudflare puis prévient IndexNow (depuis le 23 octobre 2026 ; avant, elle vérifiait seulement)

## GitHub

- **Rôle** : hébergement du code (`teiki5320/Solelis`, branche `main`) + CI GitHub Actions (`.github/workflows/ci.yml`), qui vérifie puis publie sur Cloudflare
- **Secrets** : `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID` dans les secrets du dépôt (réglés le 23 octobre 2026)
- **Console** : https://github.com/teiki5320/Solelis
- **Coût** : gratuit

## Hébergement web (GitHub Pages / Cloudflare Pages)

- **Ici** : Cloudflare **Workers** (et non Pages) — Worker « solelis » qui sert le rendu serveur et les fichiers statiques, redirige www, ajoute les en-têtes de sécurité, met en cache `/api/og` (7 jours), `/api/stats` (5 min), `/conseils` et `/sitemap.xml` (1 h), et lance le cron des rappels
- **Fichiers** : `wrangler.jsonc` (nom, domaines, D1, version déployée, cron, observabilité), `worker.ts` (point d'entrée : redirection www + `scheduled`), `open-next.config.ts`
- **Console** : dash.cloudflare.com → Workers & Pages → « solelis »
- **Identifiants publics** : nom du Worker `solelis`, domaines `solelis.com` / `www.solelis.com`
- **Secrets** : variables et secrets de production dans la console (Worker → Paramètres → Variables et secrets) ou via `npx wrangler secret put <NOM>` : `RESEND_API_KEY`, `RESEND_FROM`, `NEXT_PUBLIC_BASE_URL`, `CRON_SECRET`, `INSEE_API_KEY`, `GOOGLE_PLACES_API_KEY`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`. Les `NEXT_PUBLIC_*` doivent aussi exister au moment du build
- **Commandes** : `npm run cf:preview` (aperçu local, port 8787), `npm run cf:deploy` (build + mise en ligne à la main, en secours de la CI)
- **Journaux** : observabilité activée (`wrangler.jsonc`) — console Cloudflare → Worker → Journaux, ou `npx wrangler tail`
- **Coût** : offre Workers gratuite ou payante selon le volume (à vérifier dans la console)

## Nom de domaine

- **Domaine** : `solelis.com`, enregistré chez Cloudflare le 10 octobre 2026, échéance le 10 octobre 2027 (renouvellement à vérifier dans la console)
- **DNS** : serveurs de noms Cloudflare ; `solelis.com` et `www.solelis.com` sont des domaines personnalisés du Worker (`wrangler.jsonc`), certificat SSL automatique
- **Console** : dash.cloudflare.com → Domaines → solelis.com
- **Coût** : renouvellement annuel au prix coûtant de Cloudflare (montant à vérifier dans la console)

## Base SQL hébergée (Cloudflare D1 / Neon / Turso)

- **Ici** : Cloudflare D1 « solelis » (juridiction UE)
- **Rôle** : stockage des fiches (table `fiches` : token, siret, reponses, company_data, email, rappels — JSON en texte) — accès dans `lib/db.ts`
- **Console** : dash.cloudflare.com → Stockage et bases de données → D1 → « solelis »
- **Identifiants publics** : nom `solelis`, binding `DB`, identifiant de base dans `wrangler.jsonc`
- **Secrets** : aucun — l'accès passe par le binding du Worker (pas de clé dans le code)
- **Migrations** : `npx wrangler d1 migrations apply DB --local` (local) / `--remote` (production)
- **Coût** : offre gratuite D1 (à vérifier dans la console selon le volume)

## E-mail transactionnel (Resend / Brevo / Postmark)

- **Ici** : Resend
- **Rôle** : envoi des liens magiques (retrouver sa fiche) et des rappels du cron — `lib/resend.ts`, `app/api/cron/rappels/route.ts`
- **Console** : https://resend.com/overview
- **Identifiants publics** : `RESEND_FROM` (expéditeur ; `.env.example` propose `Solelis <solelis@toakeur.com>`). Sans `RESEND_FROM`, rien n'est envoyé et les journaux le signalent (plus de repli sur une adresse de test)
- **Domaine d'envoi** : une clé DKIM Resend est publiée sur `toakeur.com` ; l'état de vérification du domaine est à vérifier dans la console Resend
- **Secrets** : `RESEND_API_KEY` (console Cloudflare + `.env.local` en local)
- **Coût** : offre gratuite, quota mensuel limité (à vérifier dans la console)

## API tierce (météo, données publiques…)

Quatre sources, toutes appelées depuis le code (`lib/`) :

- **API Recherche d'entreprises** (`recherche-entreprises.api.gouv.fr`, sans compte) : source principale des données SIRET, interrogée par le serveur (`lib/sirene.ts`) et, en repli, par le navigateur pendant le questionnaire (`lib/rechercheEntreprises.ts`) — aucun secret, gratuite
- **BODACC** (`bodacc-datadila.opendatasoft.com`, sans compte) : annonces légales pour repérer les incohérences avec la situation déclarée (`lib/bodacc.ts`) — aucun secret, gratuite
- **INSEE Sirene** (secours) : données SIRET si l'API gouv.fr échoue (`lib/sirene.ts`) — console https://portail-api.insee.fr, secret `INSEE_API_KEY` (optionnelle), gratuite
- **Google Places** : recherche d'avocats près de la ville du dirigeant (`lib/googlePlaces.ts`, Places API New ; bloc vide sans clé, le reste du site fonctionne) — console https://console.cloud.google.com (projet avec « Places API (New) » activée), secret `GOOGLE_PLACES_API_KEY` (optionnelle, à restreindre à l'API Places), paiement à l'usage avec crédit mensuel offert (surveiller les quotas)

## Cloudflare Web Analytics (mesure d'audience)

- **Rôle** : visites et pages d'arrivée, sans cookie ni stockage dans le navigateur, gratuit — site « solelis.com » ajouté le 28 octobre 2026 dans le compte Cloudflare teiki5320@gmail.com (comme keurdeco.com)
- **Code** : `components/MesureAudience.tsx` (jeton public du site, chargé par `app/layout.tsx`) ; script chargé seulement à l'arrivée, avec `spa: false` : la page d'arrivée est comptée, jamais la suite de la navigation ; jamais chargé sur `/fiche/…` (adresse secrète) ni `/questionnaire` (SIRET dans l'adresse)
- **Lecture** : console Cloudflare → Analytics → Web Analytics, et page Audience du Studio (clé Cloudflare en lecture seule)

## Prévu mais pas branché

- **Plausible** : code toujours présent mais inactif (chargé seulement si `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` est définie, ce qui n'est pas le cas) ; remplacé par Cloudflare Web Analytics le 28 octobre 2026
- **Coût** : payant — à souscrire si besoin

## Limites connues

- **Limitation de débit** : `middleware.ts` garde un compteur en mémoire, propre à chaque instance du Worker — peu efficace. Un limiteur Cloudflare (règle de limitation de débit ou binding Rate Limiting) est à venir.
- **Ancienne base Supabase** : le projet Supabase de l'époque Avelor n'apparaît plus dans le compte Supabase (vérifié le 28 octobre 2026) ; le code ne l'utilise plus depuis le passage à D1.
