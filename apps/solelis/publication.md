# PUBLICATION — état de la mise en ligne

> Mise à jour le 21 octobre 2026 (mise en ligne manuelle uniquement, lien SOS Amitié corrigé dans le dépôt mais pas encore en ligne ; 79 pages indexées sur 92 suivies, sitemap de 92 adresses, 22 articles Conseils publiés, contrôle en ligne du jour).

## En bref

- **Production** : https://solelis.com répond, projet en pause
- **Domaine & SSL** : solelis.com chez Cloudflare, SSL automatique
- **Visibilité** : 79 pages indexées sur 92 suivies, sitemap de 92 adresses
- **Monétisation** : aucune, gratuit intégral
- **Contact** : solelis@toakeur.com

## Boutiques

| | 🌐 Site |
|---|---|
| État | [ok] En ligne, projet en pause |
| Hébergement | [ok] Cloudflare Workers, Worker « solelis » |
| Domaine | [ok] solelis.com, www et avelor.toakeur.com redirigent |
| SSL | [ok] Certificat automatique Cloudflare |
| Indexation | [à faire] 79 pages sur 92 suivies dans Search Console |
| Mesure d'audience | [pas encore] Plausible prévu, non souscrit |

## Ce qui reste, dans l'ordre

1. ✅ **Mise en ligne** : site servi par le Worker Cloudflare sur solelis.com depuis le 10 octobre 2026.
2. ✅ **Search Console** : domaine déclaré, sitemap envoyé le 12 octobre 2026, renvoyé le 20 octobre.
3. **Mise en ligne du correctif** : `npm run cf:deploy` pour publier le lien SOS Amitié corrigé le 21 octobre.
4. **Parcours en production** : vérifier fiche, lien magique Resend, rappel du cron et boîte solelis@toakeur.com.
5. **Indexation** : faire entrer dans Google les 13 pages encore absentes sur 92.
6. **Mesure d'audience** : souscrire Plausible et définir `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
7. **Sortie de pause** : refonte Solelis (logo, design, nom partout), puis relance des canaux.

## Vue d'ensemble

- **État** : ⏸️ projet en pause — le site reste en ligne et répond (contrôle du 21 octobre 2026)
- **URL publique** : https://solelis.com (titre « Solelis — Aide aux chefs d'entreprise en difficulté »)
- **Hébergeur** : Cloudflare Workers (Worker « solelis », adaptateur OpenNext)
- **Base** : Cloudflare D1 « solelis » (UE)
- **Domaine + SSL** : solelis.com, enregistré chez Cloudflare, déclaré comme domaine personnalisé du Worker (`wrangler.jsonc`) ; certificat géré automatiquement par Cloudflare
- **Contact public** : solelis@toakeur.com (mentions légales, confidentialité, politique de données, accessibilité, témoignages)
- **Ancienne adresse** : avelor.toakeur.com redirige (301) vers https://solelis.com (constaté le 21 octobre 2026)
- **Dernière mise en production** : à lire dans la console Cloudflare (Worker → Déploiements)

### 1. Web · Production

- **Déploiement** : à la main uniquement, avec `npm run cf:deploy` ; un envoi sur `main` ne met rien en ligne (la CI GitHub ne fait que vérifier)
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

- **Indexation** : `app/sitemap.ts` (servi sur `/sitemap.xml`, rendu à la requête : 92 adresses le 21 octobre 2026, dont 23 pour la rubrique Conseils) et `app/robots.ts` (bloque `/api/` et `/fiche/`, autorise `/api/og`)
- **Google Search Console** : domaine solelis.com déclaré, sitemap envoyé le 12 octobre 2026 et renvoyé le 20 octobre (lu, sans erreur) ; 79 pages indexées sur 92 suivies, 2 découvertes mais non indexées, 11 inconnues de Google (relevé du Studio du 21 octobre, onglet Indexation)
- **Rubrique Conseils** : https://solelis.com/conseils et son flux https://solelis.com/conseils/rss.xml répondent ; 22 articles publiés (20 le 12 octobre 2026, 1 le 19 octobre, 1 le 21 octobre), 8 programmés du 23 octobre au 9 novembre 2026, qui paraîtront d'eux-mêmes à leur date ; le lien SOS Amitié corrigé dans le dépôt le 21 octobre n'est pas encore en ligne (l'ancienne adresse reste affichée)
- **Balises de partage** : Open Graph + Twitter Card par page (titre et description propres à chaque page), image générée dynamiquement par `/api/og` (runtime Node), URL canonique sur les pages qui la déclarent (`ogMeta({ chemin })`), JSON-LD Organization + WebSite (+ FAQPage, fil d'Ariane)
- **Mesure d'audience** : aucune en production — Plausible est prévu dans le code mais ne se charge que si `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` est définie, ce qui n'est pas le cas
- **PWA** : `manifest.json` + icônes 512/192/favicon — installable sur mobile ; favicon Solelis servi sous une nouvelle adresse (`/icons/solelis-favicon-96.png`) pour que Google remplace l'ancienne icône
