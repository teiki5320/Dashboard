# INFRA — fiche technique

> Généré le 20/07/2026 par un scan du dépôt. Pour mettre à jour : relancer ce même prompt.
> Aucun secret dans cette fiche — uniquement des références (noms de variables, consoles).

## Vue d'ensemble

- **Stack** : Next.js 15.5.20 (App Router) · React 19 · TypeScript · Tailwind 3.4
- **Hébergement** : Vercel (déploiement automatique depuis la branche `main`)
- **Domaine** : avelor.vercel.app (sous-domaine Vercel, SSL auto — domaine propre à acheter)
- **Base de données** : Supabase (PostgreSQL, table `fiches`, RLS)
- **E-mail** : Resend (magic links + rappels quotidiens via cron Vercel 7h)
- **CI** : GitHub Actions (lint → build → 259 tests à chaque push/PR vers `main`)

### 1. Vercel

- **Rôle** : hébergement du site, déploiement auto à chaque commit sur `main`, cron quotidien des rappels (`vercel.json` → `GET /api/cron/rappels` à 7h UTC)
- **Console** : https://vercel.com/dashboard
- **Identifiants publics** : URL de production `https://avelor.vercel.app`
- **Secrets** : toutes les variables d'environnement de production vivent dans Vercel → Settings → Environment Variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `RESEND_API_KEY`, `RESEND_FROM`, `NEXT_PUBLIC_BASE_URL`, `CRON_SECRET`, `INSEE_API_KEY`, `GOOGLE_PLACES_API_KEY`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`)
- **Coût** : plan Hobby gratuit (à vérifier dans la console selon l'usage)

### 2. GitHub

- **Rôle** : hébergement du code (`teiki5320/avelor`) + CI GitHub Actions (`.github/workflows/ci.yml` : lint, build, tests — sans aucun secret CI)
- **Console** : https://github.com/teiki5320/avelor
- **Identifiants publics** : nom du dépôt
- **Secrets** : aucun secret CI configuré (le build fonctionne sans variable)
- **Coût** : gratuit

### 3. Supabase

- **Rôle** : stockage des fiches (table `fiches` : token, siret, reponses, company_data, email, rappels) avec règles RLS
- **Console** : https://supabase.com/dashboard
- **Identifiants publics** : `SUPABASE_URL` et `SUPABASE_ANON_KEY` (clé anonyme exposable par design, la sécurité repose sur RLS) — lues dans `lib/supabase.ts`
- **Secrets** : valeurs dans Vercel (env prod) + `.env.local` (non commité) ; la clé `service_role` reste uniquement dans le dashboard Supabase (non utilisée par le code)
- **Coût** : free tier (à vérifier dans la console selon le volume)

### 4. Resend

- **Rôle** : envoi des magic links (retrouver sa fiche) et des rappels du cron — `lib/resend.ts`, `app/api/cron/rappels/route.ts`
- **Console** : https://resend.com/overview
- **Identifiants publics** : `RESEND_FROM` (expéditeur ; défaut code : `AVELOR <onboarding@resend.dev>` — à passer sur le futur domaine après vérification DNS)
- **Secrets** : `RESEND_API_KEY` dans Vercel (env prod) + `.env.local`
- **Coût** : free tier 3 000 e-mails/mois (à vérifier dans la console)

### 5. APIs publiques de l'État (sans compte)

- **Rôle** : Recherche d'entreprises (`recherche-entreprises.api.gouv.fr`, source principale des données SIRET — `lib/sirene.ts`) et BODACC (`bodacc-datadila.opendatasoft.com`, détection d'incohérences de procédures — `lib/bodacc.ts`)
- **Console** : aucune — APIs open data sans authentification
- **Identifiants publics** : URLs de base codées en dur dans `lib/sirene.ts` et `lib/bodacc.ts`
- **Secrets** : aucun
- **Coût** : gratuit

### 6. INSEE Sirene (secours)

- **Rôle** : fallback des données SIRET si l'API gouv.fr échoue — `lib/sirene.ts`
- **Console** : https://portail-api.insee.fr
- **Identifiants publics** : URL de base `https://api.insee.fr/entreprises/sirene/V3`
- **Secrets** : `INSEE_API_KEY` (optionnelle) dans Vercel (env prod) + `.env.local`
- **Coût** : gratuit

### 7. Google Places

- **Rôle** : recherche d'avocats près de la ville du dirigeant — `lib/googlePlaces.ts` (bloc vide sans clé, le reste du site fonctionne)
- **Console** : https://console.cloud.google.com (projet avec « Places API » activée)
- **Identifiants publics** : URL de base `https://maps.googleapis.com/maps/api/place`
- **Secrets** : `GOOGLE_PLACES_API_KEY` (optionnelle) dans Vercel (env prod) + `.env.local` — restreindre la clé à l'API Places
- **Coût** : pay-as-you-go avec crédit mensuel offert (à vérifier dans la console ; surveiller les quotas)

### 8. Plausible (optionnel — non souscrit)

- **Rôle** : analytics sans cookies ; le script n'est chargé que si `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` est définie (`app/layout.tsx`)
- **Console** : https://plausible.io
- **Identifiants publics** : `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (public par design)
- **Secrets** : aucun côté code
- **Coût** : payant (~9 €/mois) — aucun compte à ce jour
