# PUBLICATION — état de la mise en ligne

> Mise à jour le 12 octobre 2026 (domaine enregistré chez Cloudflare, mesure d'audience non active, contrôle en ligne du jour).

## Vue d'ensemble

- **État** : ⏸️ projet en pause — le site reste en ligne et répond (contrôle du 12 octobre 2026)
- **URL publique** : https://solelis.com (titre « Solelis — Aide aux chefs d'entreprise en difficulté »)
- **Hébergeur** : Cloudflare Workers (Worker « solelis », adaptateur OpenNext)
- **Base** : Cloudflare D1 « solelis » (UE)
- **Domaine + SSL** : solelis.com, enregistré chez Cloudflare, déclaré comme domaine personnalisé du Worker (`wrangler.jsonc`) ; certificat géré automatiquement par Cloudflare
- **Contact public** : solelis@toakeur.com (mentions légales, confidentialité, politique de données, accessibilité, témoignages)
- **Dernière mise en production** : à lire dans la console Cloudflare (Worker → Déploiements)

### 1. Web · Production

- **Déploiement** : depuis la branche `main` (build Cloudflare), ou à la main avec `npm run cf:deploy`
- **Avant de fusionner une PR** : la CI GitHub Actions vérifie lint, TypeScript, build Next.js, tests Vitest et build OpenNext (`npx opennextjs-cloudflare build`)
- **Vérifier en local comme en production** : `npm run cf:preview` (simulateur Cloudflare, port 8787)
- **Variables de production** : console Cloudflare → Worker « solelis » → Paramètres → Variables et secrets (liste dans `docs/INFRA.md`) ; ne jamais les écrire dans le dépôt
- **Schéma de base** : appliquer les nouvelles migrations avec `npx wrangler d1 migrations apply DB --remote`

### 2. Domaine & SSL

- **Domaines servis** : `solelis.com` et `www.solelis.com` (redirection permanente 301 vers `solelis.com` dans `worker.ts`, constatée le 12 octobre 2026)
- **SSL** : automatique (Cloudflare)
- **Registrar / échéance** : Cloudflare ; domaine enregistré le 10 octobre 2026, échéance le 10 octobre 2027 (renouvellement automatique à vérifier dans la console)
- **E-mail** : une clé DKIM Resend est publiée sur `toakeur.com` ; vérification du domaine d'envoi et réglage de `RESEND_FROM` à vérifier dans la console Resend

### 3. Visibilité

- **Indexation** : `app/sitemap.ts` (servi sur `/sitemap.xml`, 138 adresses le 12 octobre 2026) et `app/robots.ts` (bloque `/api/` et `/fiche/`, autorise `/api/og`) ; déclaration dans Google Search Console encore à faire d'après `_plans/roadmap.md` (à vérifier dans la console)
- **Balises de partage** : Open Graph + Twitter Card par page (titre et description propres à chaque page), image générée dynamiquement par `/api/og` (runtime Node), URL canonique sur les pages qui la déclarent (`ogMeta({ chemin })`), JSON-LD Organization + WebSite (+ FAQPage, fil d'Ariane)
- **Mesure d'audience** : aucune en production — Plausible est prévu dans le code mais ne se charge que si `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` est définie, ce qui n'est pas le cas
- **PWA** : `manifest.json` + icônes 512/192/favicon — installable sur mobile
