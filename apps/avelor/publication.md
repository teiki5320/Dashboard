# PUBLICATION — état de la mise en ligne

> Généré le 20/07/2026. Pour mettre à jour : relancer ce même prompt.

## Vue d'ensemble

- **URL publique** : https://avelor.vercel.app
- **État** : en ligne (version du 28/05/2026 — la mise à niveau complète attend le merge de la PR #3)
- **Hébergeur** : Vercel
- **Domaine + SSL** : sous-domaine `*.vercel.app` avec SSL automatique ; domaine propre non acheté
- **Dernière mise en production** : commit `7d99443` du 28/05/2026 sur `main` (heure exacte du déploiement : à vérifier dans la console Vercel)

### 1. Web · Production

- **URL** : https://avelor.vercel.app
- **Hébergeur** : Vercel, projet connecté au dépôt GitHub `teiki5320/avelor`
- **Déploiement** : automatique — tout commit mergé sur `main` déclenche build + mise en ligne (~2 min). Aucune action manuelle. Preview deployments sur les PR (comportement Vercel par défaut, à vérifier dans la console)
- **Dernière mise en prod** : 28/05/2026 (`7d99443`)
- **Ce qui bloque** :
  - la PR #3 (`claude/blissful-clarke-ycvXl` → `main`, 30 commits : 44 corrections juridiques, 18 secteurs, 3 thèmes, Next 15) est **ouverte, en attente de merge** → https://github.com/teiki5320/avelor/pull/3
  - variables d'environnement de production à vérifier dans la console Vercel (indispensables : `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `RESEND_API_KEY`, `RESEND_FROM` ; voir `docs/INFRA.md`)
  - l'e-mail de contact des pages légales (`contact@avelor.vercel.app`) ne peut pas recevoir de messages — à corriger avec le domaine propre

### 2. Domaine & SSL

- **Registrar** : aucun — le site vit sur le sous-domaine gratuit `avelor.vercel.app`
- **SSL** : certificat automatique fourni et renouvelé par Vercel (rien à gérer)
- **Échéance de renouvellement** : sans objet tant qu'aucun domaine n'est acheté
- **DNS** : gérés par Vercel (sous-domaine)
- **Prévu** : achat d'un domaine propre (idéalement `avelor.fr`, de préférence via Vercel Domains pour un DNS pilotable en CLI) + adresse e-mail de contact + vérification du domaine dans Resend (SPF/DKIM). Plan détaillé : `_plans/roadmap.md` § MISE EN LIGNE. Le code référence `avelor.vercel.app` dans ~30 fichiers à remplacer au changement

### 3. Visibilité

- **Indexation Google** : `sitemap.ts` et `robots.ts` en place (sitemap servi sur `/sitemap.xml`) ; site non déclaré dans Google Search Console (à faire après le domaine définitif) ; pages effectivement indexées : à vérifier dans la console
- **Balises de partage** : Open Graph + Twitter Card sur 48 pages, image OG générée dynamiquement (`/api/og`, Edge runtime), JSON-LD (site + FAQPage)
- **Analytics** : aucun actif — Plausible est câblé dans le code (`app/layout.tsx`, conditionné à `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`) mais aucun compte souscrit ; alternative possible : Vercel Analytics (activation en 1 clic dans la console)
- **PWA** : `manifest.json` + icônes 512/192/favicon — installable sur mobile, non publiée sur les stores
