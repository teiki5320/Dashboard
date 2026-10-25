# PUBLICATION — état de la mise en ligne

> Mise à jour le 25 octobre 2026 (mise en ligne automatique par la CI GitHub depuis le 23 octobre 2026, dernière publication le 25 octobre ; lien SOS Amitié corrigé et page « Dettes fiscales et sociales » en ligne ; 82 pages indexées sur 94 suivies, sitemap de 94 adresses, 23 articles Conseils publiés, contrôle en ligne du 25 octobre 2026).

## En bref

- **Production** : https://solelis.com répond, projet en pause
- **Domaine & SSL** : solelis.com chez Cloudflare, SSL automatique
- **Visibilité** : 82 pages indexées sur 94 suivies, sitemap de 94 adresses
- **Monétisation** : aucune, gratuit intégral
- **Contact** : solelis@toakeur.com

## Boutiques

| | 🌐 Site |
|---|---|
| État | [ok] En ligne, projet en pause |
| Hébergement | [ok] Cloudflare Workers, publié par la CI à chaque envoi |
| Domaine | [ok] solelis.com, www et avelor.toakeur.com redirigent |
| SSL | [ok] Certificat automatique Cloudflare |
| Indexation | [à faire] 82 pages sur 94 suivies dans Search Console |
| Mesure d'audience | [pas encore] Plausible prévu, non souscrit |

## Ce qui reste, dans l'ordre

1. ✅ **Mise en ligne** : site servi par le Worker Cloudflare sur solelis.com depuis le 10 octobre 2026.
2. ✅ **Search Console** : domaine déclaré, sitemap envoyé le 12 octobre 2026, renvoyé le 20 octobre.
3. ✅ **Mise en ligne automatique** : la CI publie sur Cloudflare à chaque envoi depuis le 23 octobre 2026 (correctif SOS Amitié en ligne).
4. **Parcours en production** : vérifier fiche, lien magique Resend, rappel du cron et boîte solelis@toakeur.com.
5. **Indexation** : faire entrer dans Google les 12 pages encore absentes sur 94.
6. **Mesure d'audience** : souscrire Plausible et définir `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
7. **Sortie de pause** : refonte Solelis (logo, design, nom partout), puis relance des canaux.

## Vue d'ensemble

- **État** : ⏸️ projet en pause — le site reste en ligne et répond (contrôle du 25 octobre 2026)
- **URL publique** : https://solelis.com (titre « Solelis — Aide aux chefs d'entreprise en difficulté »)
- **Hébergeur** : Cloudflare Workers (Worker « solelis », adaptateur OpenNext)
- **Base** : Cloudflare D1 « solelis » (UE)
- **Domaine + SSL** : solelis.com, enregistré chez Cloudflare, déclaré comme domaine personnalisé du Worker (`wrangler.jsonc`) ; certificat géré automatiquement par Cloudflare
- **Contact public** : solelis@toakeur.com (mentions légales, confidentialité, politique de données, accessibilité, témoignages)
- **Ancienne adresse** : avelor.toakeur.com redirige (301) vers https://solelis.com (constaté le 21 octobre 2026)
- **Dernière mise en production** : 25 octobre 2026, par la CI GitHub (envoi « Conseils : 12 articles programmés du 11 novembre au 7 décembre 2026 », publication réussie) — la première publication par la CI date du 23 octobre 2026 ; détail dans la console Cloudflare (Worker → Déploiements)

### 1. Web · Production

- **Déploiement** : automatique par la CI GitHub à chaque envoi sur `main` (vérification, publication sur Cloudflare, IndexNow) depuis le 23 octobre 2026, secrets `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID` réglés ; `npm run cf:deploy` reste possible à la main en secours
- **Avant de fusionner une PR** : la CI GitHub Actions vérifie lint, TypeScript, build Next.js, tests Vitest et build OpenNext (`npx opennextjs-cloudflare build`)
- **Vérifier en local comme en production** : `npm run cf:preview` (simulateur Cloudflare, port 8787)
- **Variables de production** : console Cloudflare → Worker « solelis » → Paramètres → Variables et secrets (liste dans `docs/INFRA.md`) ; ne jamais les écrire dans le dépôt
- **Schéma de base** : appliquer les nouvelles migrations avec `npx wrangler d1 migrations apply DB --remote`

### 2. Domaine & SSL

- **Domaines servis** : `solelis.com` et `www.solelis.com` (redirection permanente 301 vers `solelis.com` dans `worker.ts`, constatée le 21 octobre 2026)
- **SSL** : automatique (Cloudflare)
- **Registrar / échéance** : Cloudflare ; domaine enregistré le 10 octobre 2026, échéance le 10 octobre 2027 (renouvellement automatique à vérifier dans la console)
- **E-mail** : une clé DKIM Resend est publiée sur `toakeur.com` ; vérification du domaine d'envoi et réglage de `RESEND_FROM` à vérifier dans la console Resend

### 3. Visibilité

- **Indexation** : `app/sitemap.ts` (servi sur `/sitemap.xml`, rendu à la requête : 94 adresses le 24 octobre 2026, dont 24 pour la rubrique Conseils (la page d'accueil de la rubrique et 23 articles) ; page « Dettes fiscales et sociales » en ligne depuis le 23 octobre) et `app/robots.ts` (bloque `/api/` et `/fiche/`, autorise `/api/og`)
- **Google Search Console** : domaine solelis.com déclaré, sitemap envoyé le 12 octobre 2026 et renvoyé le 20 octobre (lu, sans erreur) ; relu par Google le 22 octobre ; 82 pages indexées sur 94 suivies, 2 découvertes mais non indexées, 10 inconnues de Google (relevé du Studio du 24 octobre, onglet Indexation)
- **Rubrique Conseils** : https://solelis.com/conseils et son flux https://solelis.com/conseils/rss.xml répondent ; 23 articles publiés (20 le 12 octobre 2026, 1 le 19 octobre, 1 le 21 octobre, 1 le 23 octobre), 19 programmés du 26 octobre au 7 décembre 2026 (dont 12 ajoutés le 25 octobre 2026), qui paraîtront d’eux-mêmes à leur date ; le lien SOS Amitié corrigé le 21 octobre est en ligne depuis la mise en ligne du 23 octobre (sosamitie.org, constaté le 24 octobre)
- **Balises de partage** : Open Graph + Twitter Card par page (titre et description propres à chaque page), image générée dynamiquement par `/api/og` (runtime Node), URL canonique sur les pages qui la déclarent (`ogMeta({ chemin })`), JSON-LD Organization + WebSite (+ FAQPage, fil d'Ariane)
- **Mesure d'audience** : aucune en production — Plausible est prévu dans le code mais ne se charge que si `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` est définie, ce qui n'est pas le cas
- **PWA** : `manifest.json` + icônes 512/192/favicon — installable sur mobile ; favicon Solelis servi sous une nouvelle adresse (`/icons/solelis-favicon-96.png`) pour que Google remplace l'ancienne icône
