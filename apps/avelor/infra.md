# Avelor — Fiche technique (INFRA)

> Fiche générée par **analyse du dépôt** `teiki5320/avelor` (commit `7d99443`, 2026‑08‑03).
> Elle sera remplacée automatiquement dès qu'un `docs/INFRA.md` existera dans le dépôt
> de l'app (synchro pull quotidienne). **Aucun secret ici — uniquement des références.**

## Vue d'ensemble

- **App** : Avelor — plateforme web d'aide aux chefs d'entreprise français en
  difficulté : questionnaire de situation, annuaire d'aides et de procédures,
  courriers types, glossaire, témoignages, espace proches/famille.
- **Stack** : Next.js 14 (App Router) · Tailwind CSS · Framer Motion · Zod ·
  tests Vitest.
- **Plateforme** : Web uniquement (pas d'app mobile).
- **SEO** : `robots.ts` et `sitemap.ts` générés par Next.

## Dépôt & CI (GitHub)

- Dépôt : `teiki5320/avelor` — branche par défaut `main`.
- Déploiement continu : chaque push sur `main` déclenche un déploiement Vercel.

## Hébergement web (Vercel)

- Déploiement Next.js sur **Vercel** (`vercel.json` présent).
- **Cron Vercel** : `/api/cron/rappels` tous les jours à 7h UTC
  (rappels par e-mail liés aux fiches).
- Images Open Graph dynamiques via `@vercel/og`.

## Nom de domaine

- Domaine : **avelor.fr** (URL de production) — alias `avelor.vercel.app`.
- *(À consigner : registrar et date de renouvellement.)*

## Backend (Supabase)

- Table `fiches` : `id`, `token` (accès par lien magique), `siret`,
  `reponses` (jsonb), `company_data` (jsonb), `email`, `created_at`.
- Accès côté serveur via `@supabase/supabase-js`.
- Variables : `SUPABASE_URL`, `SUPABASE_ANON_KEY`.
- *(À vérifier : état de la RLS sur la table `fiches` — accès par token unique.)*

## API externes (INSEE Sirene, Google Places)

- **API Sirene (INSEE)** : récupération des données d'entreprise à partir
  du SIRET — variable `INSEE_API_KEY`.
- **Google Places** : recherche/complétion d'établissements —
  variable `GOOGLE_PLACES_API_KEY`.

## E-mail transactionnel (Resend)

- Envoi des **liens magiques** d'accès aux fiches et des **rappels**
  (déclenchés par le cron quotidien) via **Resend** — variable `RESEND_API_KEY`.
- `NEXT_PUBLIC_BASE_URL` : URL publique utilisée pour construire les liens.

## Variables & références

| Nom | Où vit la valeur | Usage |
| --- | --- | --- |
| `INSEE_API_KEY` | `.env.local` / variables Vercel | API Sirene (données SIRET) |
| `GOOGLE_PLACES_API_KEY` | `.env.local` / variables Vercel | Google Places |
| `SUPABASE_URL` / `SUPABASE_ANON_KEY` | `.env.local` / variables Vercel | Base Supabase (table `fiches`) |
| `RESEND_API_KEY` | `.env.local` / variables Vercel | E-mails (liens magiques, rappels) |
| `NEXT_PUBLIC_BASE_URL` | `.env.local` / variables Vercel | Construction des liens publics |
