# PUBLICATION — état de la mise en ligne

> Mise à jour le 10/10/2026 (hébergement Cloudflare).

## Vue d'ensemble

- **URL publique** : https://solelis.com
- **Hébergeur** : Cloudflare Workers (Worker « solelis », adaptateur OpenNext)
- **Base** : Cloudflare D1 « solelis » (UE)
- **Domaine + SSL** : solelis.com déclaré comme domaine personnalisé du Worker (`wrangler.jsonc`) ; certificat géré automatiquement par Cloudflare
- **Dernière mise en production** : à lire dans la console Cloudflare (Worker → Déploiements)

### 1. Web · Production

- **Déploiement** : depuis la branche `main` (build Cloudflare), ou à la main avec `npm run cf:deploy`
- **Avant de fusionner une PR** : la CI GitHub Actions vérifie lint, TypeScript, build Next.js, tests Vitest et build OpenNext (`npx opennextjs-cloudflare build`)
- **Vérifier en local comme en production** : `npm run cf:preview` (simulateur Cloudflare, port 8787)
- **Variables de production** : console Cloudflare → Worker « solelis » → Paramètres → Variables et secrets (liste dans `docs/INFRA.md`) ; ne jamais les écrire dans le dépôt
- **Schéma de base** : appliquer les nouvelles migrations avec `npx wrangler d1 migrations apply DB --remote`

### 2. Domaine & SSL

- **Domaines servis** : `solelis.com` et `www.solelis.com` (redirection permanente vers `solelis.com` dans `worker.ts`)
- **SSL** : automatique (Cloudflare)
- **Registrar / échéance** : à vérifier dans la console Cloudflare
- **E-mail** : vérifier le domaine d'envoi dans Resend (SPF/DKIM) et régler `RESEND_FROM` en conséquence

### 3. Visibilité

- **Indexation** : `app/sitemap.ts` (servi sur `/sitemap.xml`, avec les 17 modèles de courriers) et `app/robots.ts` (bloque `/api/` et `/fiche/`, autorise `/api/og`) ; déclarer le site dans Google Search Console
- **Balises de partage** : Open Graph + Twitter Card par page (titre et description propres à chaque page), image générée dynamiquement par `/api/og` (runtime Node), URL canonique sur les pages qui la déclarent (`ogMeta({ chemin })`), JSON-LD Organization + WebSite (+ FAQPage, fil d'Ariane)
- **Mesure d'audience** : Plausible, activée seulement si `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` est définie
- **PWA** : `manifest.json` + icônes 512/192/favicon — installable sur mobile
