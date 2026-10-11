# INFRA — fiche technique

> Mise à jour le 10/10/2026 (passage à Cloudflare Workers + D1).
> Aucun secret dans cette fiche — uniquement des références (noms de variables, consoles).

## Vue d'ensemble

- **Stack** : Next.js 15.5 (App Router) · React 19 · TypeScript · Tailwind 3.4 · Node 22
- **Hébergement** : Cloudflare Workers — Worker « solelis », site Next.js adapté par OpenNext (`@opennextjs/cloudflare`), déployé depuis la branche `main`
- **Domaine** : solelis.com (domaine personnalisé du Worker ; www.solelis.com redirige vers solelis.com, voir `worker.ts`)
- **Base de données** : Cloudflare D1 « solelis » (juridiction UE), binding `DB`, schéma dans `migrations/`
- **E-mail** : Resend (liens magiques + rappels quotidiens)
- **Tâche planifiée** : Cron Trigger Cloudflare chaque jour à 7 h UTC → `GET /api/cron/rappels`
- **CI** : GitHub Actions (lint → TypeScript → build → tests → build OpenNext) à chaque push/PR vers `main`

### 1. Cloudflare Workers

- **Rôle** : héberge le site (rendu serveur + fichiers statiques), redirige www, lance le cron des rappels
- **Fichiers** : `wrangler.jsonc` (nom, domaines, D1, cron, observabilité), `worker.ts` (point d'entrée : redirection www + `scheduled`), `open-next.config.ts`
- **Console** : https://dash.cloudflare.com → Workers & Pages → « solelis »
- **Identifiants publics** : nom du Worker `solelis`, domaines `solelis.com` / `www.solelis.com`
- **Secrets** : variables et secrets de production dans la console (Worker → Paramètres → Variables et secrets) ou via `npx wrangler secret put <NOM>` : `RESEND_API_KEY`, `RESEND_FROM`, `NEXT_PUBLIC_BASE_URL`, `CRON_SECRET`, `INSEE_API_KEY`, `GOOGLE_PLACES_API_KEY`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`. Les `NEXT_PUBLIC_*` doivent aussi exister au moment du build
- **Commandes** : `npm run cf:preview` (aperçu local, port 8787), `npm run cf:deploy` (build + mise en ligne)
- **Journaux** : observabilité activée (`wrangler.jsonc`) — console Cloudflare → Worker → Journaux, ou `npx wrangler tail`
- **Coût** : offre Workers gratuite ou payante selon le volume (à vérifier dans la console)

### 2. Cloudflare D1

- **Rôle** : stockage des fiches (table `fiches` : token, siret, reponses, company_data, email, rappels — JSON en texte) — accès dans `lib/db.ts`
- **Console** : https://dash.cloudflare.com → Stockage et bases de données → D1 → « solelis »
- **Identifiants publics** : nom `solelis`, binding `DB`, identifiant de base dans `wrangler.jsonc`
- **Secrets** : aucun — l'accès passe par le binding du Worker (pas de clé dans le code)
- **Migrations** : `npx wrangler d1 migrations apply DB --local` (local) / `--remote` (production)
- **Coût** : offre gratuite D1 (à vérifier dans la console selon le volume)

### 3. GitHub

- **Rôle** : hébergement du code (`teiki5320/solelis`) + CI GitHub Actions (`.github/workflows/ci.yml`) — sans aucun secret
- **Console** : https://github.com/teiki5320/solelis
- **Coût** : gratuit

### 4. Resend

- **Rôle** : envoi des liens magiques (retrouver sa fiche) et des rappels du cron — `lib/resend.ts`, `app/api/cron/rappels/route.ts`
- **Console** : https://resend.com/overview
- **Identifiants publics** : `RESEND_FROM` (expéditeur ; valeur par défaut du code : `Solelis <onboarding@resend.dev>`)
- **Secrets** : `RESEND_API_KEY` (console Cloudflare + `.env.local` en local)
- **Coût** : offre gratuite, quota mensuel limité (à vérifier dans la console)

### 5. APIs publiques de l'État (sans compte)

- **Rôle** : Recherche d'entreprises (`recherche-entreprises.api.gouv.fr`, source principale des données SIRET — `lib/sirene.ts`) et BODACC (`lib/bodacc.ts`)
- **Secrets** : aucun
- **Coût** : gratuit

### 6. INSEE Sirene (secours)

- **Rôle** : données SIRET si l'API gouv.fr échoue — `lib/sirene.ts`
- **Console** : https://portail-api.insee.fr
- **Secrets** : `INSEE_API_KEY` (optionnelle)
- **Coût** : gratuit

### 7. Google Places

- **Rôle** : recherche d'avocats près de la ville du dirigeant — `lib/googlePlaces.ts` (Places API New ; bloc vide sans clé, le reste du site fonctionne)
- **Console** : https://console.cloud.google.com (projet avec « Places API (New) » activée)
- **Secrets** : `GOOGLE_PLACES_API_KEY` (optionnelle) — restreindre la clé à l'API Places
- **Coût** : paiement à l'usage avec crédit mensuel offert (surveiller les quotas)

### 8. Plausible (optionnel)

- **Rôle** : mesure d'audience sans cookies ; chargée seulement si `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` est définie (`app/layout.tsx`). Mode manuel : les adresses envoyées sont sans paramètres et `/fiche/<token>` est remplacé par `/fiche/[token]`
- **Console** : https://plausible.io
- **Secrets** : aucun
- **Coût** : payant — à souscrire si besoin

## Limites connues

- **Limitation de débit** : `middleware.ts` garde un compteur en mémoire, propre à chaque instance du Worker — peu efficace. Un limiteur Cloudflare (règle de limitation de débit ou binding Rate Limiting) est à venir.
