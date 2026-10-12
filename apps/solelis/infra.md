# INFRA — fiche technique

> Mise à jour le 12 octobre 2026 (sections au nom du Lexique, nom de domaine ajouté, mesure d'audience non active en production).
> Aucun secret dans cette fiche — uniquement des références (noms de variables, consoles).

## Vue d'ensemble

- **État** : ⏸️ projet en pause, mais le site répond sur https://solelis.com
- **Stack** : Next.js 15.5 (App Router) · React 19 · TypeScript · Tailwind 3.4 · Node 22
- **Hébergement** : Cloudflare Workers — Worker « solelis », site Next.js adapté par OpenNext (`@opennextjs/cloudflare`), déployé depuis la branche `main`
- **Domaine** : solelis.com, enregistré chez Cloudflare (www.solelis.com redirige vers solelis.com, voir `worker.ts`)
- **Base de données** : Cloudflare D1 « solelis » (juridiction UE), binding `DB`, schéma dans `migrations/`
- **E-mail** : Resend (liens magiques + rappels quotidiens)
- **Données d'entreprise** : API Recherche d'entreprises (serveur et navigateur), BODACC, INSEE Sirene en secours, Google Places pour les avocats
- **Tâche planifiée** : Cron Trigger Cloudflare chaque jour à 7 h UTC → `GET /api/cron/rappels`
- **CI** : GitHub Actions (lint → TypeScript → build → tests → build OpenNext) à chaque push/PR vers `main`

## GitHub

- **Rôle** : hébergement du code (`teiki5320/Solelis`, branche `main`) + CI GitHub Actions (`.github/workflows/ci.yml`) — sans aucun secret
- **Console** : https://github.com/teiki5320/Solelis
- **Coût** : gratuit

## Hébergement web (GitHub Pages / Cloudflare Pages)

- **Ici** : Cloudflare **Workers** (et non Pages) — Worker « solelis » qui sert le rendu serveur et les fichiers statiques, redirige www et lance le cron des rappels
- **Fichiers** : `wrangler.jsonc` (nom, domaines, D1, cron, observabilité), `worker.ts` (point d'entrée : redirection www + `scheduled`), `open-next.config.ts`
- **Console** : dash.cloudflare.com → Workers & Pages → « solelis »
- **Identifiants publics** : nom du Worker `solelis`, domaines `solelis.com` / `www.solelis.com`
- **Secrets** : variables et secrets de production dans la console (Worker → Paramètres → Variables et secrets) ou via `npx wrangler secret put <NOM>` : `RESEND_API_KEY`, `RESEND_FROM`, `NEXT_PUBLIC_BASE_URL`, `CRON_SECRET`, `INSEE_API_KEY`, `GOOGLE_PLACES_API_KEY`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`. Les `NEXT_PUBLIC_*` doivent aussi exister au moment du build
- **Commandes** : `npm run cf:preview` (aperçu local, port 8787), `npm run cf:deploy` (build + mise en ligne)
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

## Analytics (mesure d'usage) — non souscrit

- **Prévu** : Plausible, sans cookies ; le script n'est chargé que si `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` est définie (`app/layout.tsx`). Mode manuel : adresses envoyées sans paramètres, `/fiche/<token>` remplacé par `/fiche/[token]`
- **État le 12 octobre 2026** : aucun script de mesure sur https://solelis.com — la variable n'est pas définie en production et aucun compte n'est souscrit
- **Console** : https://plausible.io
- **Coût** : payant — à souscrire si besoin

## Limites connues

- **Limitation de débit** : `middleware.ts` garde un compteur en mémoire, propre à chaque instance du Worker — peu efficace. Un limiteur Cloudflare (règle de limitation de débit ou binding Rate Limiting) est à venir.
- **Ancienne base Supabase** : le projet Supabase de l'époque Avelor est en pause (rallumable) ; le code ne l'utilise plus depuis le passage à D1.
