# PUBLICATION — état de la mise en ligne

> Mise à jour le 30 octobre 2026 (contrôle en ligne du jour : site actif, CI au vert le 30 octobre 2026, sitemap de 110 adresses dont 12 articles d'actus, 26 articles Conseils publiés et 25 programmés, 93 pages indexées sur 108 suivies. Auparavant, le 29 octobre 2026 : CI au vert le 28 octobre, sitemap de 105 adresses. Auparavant, le 28 octobre 2026 : articles complets des actus en ligne le 28 octobre : une page /actus/<slug> par actu ; site reconstruit et republié par la CI 2 fois par jour. Auparavant, le 27 octobre 2026 : Solelis actif ; page Actus et images des conseils et guides mises en ligne le 27 octobre ; mise en ligne automatique par la CI GitHub depuis le 23 octobre 2026 ; lien SOS Amitié corrigé et page « Dettes fiscales et sociales » en ligne).

## En bref

- **Production** : https://solelis.com répond, site actif
- **Domaine & SSL** : solelis.com chez Cloudflare, SSL automatique
- **Visibilité** : 93 pages indexées sur 108 suivies, sitemap de 110 adresses
- **Monétisation** : aucune, gratuit intégral
- **Contact** : solelis@toakeur.com

## Boutiques

| | 🌐 Site |
|---|---|
| État | [ok] Actif, en ligne |
| Hébergement | [ok] Cloudflare Workers, publié par la CI à chaque envoi |
| Domaine | [ok] solelis.com, www et avelor.toakeur.com redirigent |
| SSL | [ok] Certificat automatique Cloudflare |
| Indexation | [à faire] 93 pages sur 108 suivies dans Search Console |
| Mesure d'audience | [ok] Cloudflare Web Analytics, sans cookie, depuis le 28 octobre 2026 |

## Ce qui reste, dans l'ordre

1. ✅ **Mise en ligne** : site servi par le Worker Cloudflare sur solelis.com depuis le 10 octobre 2026.
2. ✅ **Search Console** : domaine déclaré, sitemap envoyé le 12 octobre 2026, renvoyé le 20 octobre.
3. ✅ **Mise en ligne automatique** : la CI publie sur Cloudflare à chaque envoi depuis le 23 octobre 2026 (correctif SOS Amitié en ligne).
4. **Parcours en production** : vérifier fiche, lien magique Resend, rappel du cron et boîte solelis@toakeur.com.
5. **Indexation** : faire entrer dans Google les 15 pages encore absentes sur 108.
6. ✅ **Mesure d'audience** : Cloudflare Web Analytics, gratuit et sans cookie, ajouté le 28 octobre 2026 (Plausible abandonné).
7. **Relance des canaux** : prescripteurs institutionnels d'abord.

## Vue d'ensemble

- **État** : ✅ actif, en ligne (refonte faite : nom Solelis, logo, design ; contrôle du 30 octobre 2026)
- **URL publique** : https://solelis.com (titre « Solelis — Aide aux chefs d'entreprise en difficulté »)
- **Hébergeur** : Cloudflare Workers (Worker « solelis », adaptateur OpenNext)
- **Base** : Cloudflare D1 « solelis » (UE)
- **Domaine + SSL** : solelis.com, enregistré chez Cloudflare, déclaré comme domaine personnalisé du Worker (`wrangler.jsonc`) ; certificat géré automatiquement par Cloudflare
- **Contact public** : solelis@toakeur.com (mentions légales, confidentialité, politique de données, accessibilité, témoignages)
- **Ancienne adresse** : avelor.toakeur.com redirige (301) vers https://solelis.com (constaté de nouveau le 30 octobre 2026)
- **Dernière mise en production** : 30 octobre 2026, par la CI GitHub (envoi « Référencement du 30/10/2026 », CI au vert) ; la CI republie aussi chaque jour à 11 h 50 et 18 h 50 UTC (la reconstruction du soir du 29 octobre 2026 a échoué sur un test du sitemap, sans conséquence pour le site en ligne) ; avant, le 28 octobre 2026 (articles complets des actus, puis envoi des 9 articles Conseils programmés) ; la précédente date du 27 octobre 2026 (page Actus, images des conseils et des guides), et celle d'avant du 26 octobre 2026 (envoi « Fiches du 26/10 ») — la première publication par la CI date du 23 octobre 2026 ; détail dans la console Cloudflare (Worker → Déploiements)

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

- **Indexation** : `app/sitemap.ts` (servi sur `/sitemap.xml`, rendu à la requête : 110 adresses le 30 octobre 2026, dont 27 pour la rubrique Conseils (la page d'accueil de la rubrique et 26 articles) et 12 articles d'actus ; 105 adresses le 29 octobre, 103 le 28 octobre, 96 le 27 octobre, 95 le 26 octobre ; page « Dettes fiscales et sociales » en ligne depuis le 23 octobre) et `app/robots.ts` (bloque `/api/` et `/fiche/`, autorise `/api/og`) ; `lastmod` = vraie date de dernière modification de chaque page (historique git), /actus datée du fichier des actus et marquée quotidienne
- **Google Search Console** : domaine solelis.com déclaré, sitemap envoyé le 12 octobre 2026 et renvoyé le 20 octobre (lu, sans erreur) ; relu par Google le 29 octobre ; 93 pages indexées sur 108 suivies, 6 découvertes mais non indexées, 9 inconnues de Google (relevé du Studio du 30 octobre 2026, onglet Indexation)
- **Actus** : https://solelis.com/actus (20 actus, celles du build écrites dans la page pour Google puis mises à jour en direct depuis la veille, dans le sitemap) et https://solelis.com/veille/entites.json (les 4 situations, pour la veille), en ligne depuis le 27 octobre 2026 ; aucune actu sur l'accueil. Depuis le 28 octobre 2026, chaque actu a son article complet sur le site, https://solelis.com/actus/<slug> (12 le 30 octobre, 8 le 29 octobre, 6 le 28 octobre, dans le sitemap, JSON-LD NewsArticle), reconstruit 2 fois par jour à partir de l'index de tous les articles (les anciens gardent leur page) ; les plus récentes passent par la page de secours /actus/article (noindex)
- **Rubrique Conseils** : https://solelis.com/conseils et son flux https://solelis.com/conseils/rss.xml répondent ; 26 articles publiés (20 le 12 octobre 2026, 1 le 19 octobre, 1 le 21 octobre, 1 le 23 octobre, 1 le 26 octobre, 1 le 28 octobre, 1 le 30 octobre), 25 programmés du 2 novembre au 28 décembre 2026, qui paraîtront d’eux-mêmes à leur date ; le lien SOS Amitié corrigé le 21 octobre est en ligne depuis la mise en ligne du 23 octobre (sosamitie.org, constaté le 24 octobre)
- **Balises de partage** : Open Graph + Twitter Card par page (titre et description propres à chaque page), image générée dynamiquement par `/api/og` (runtime Node), URL canonique sur les pages qui la déclarent (`ogMeta({ chemin })`), JSON-LD Organization + WebSite (+ FAQPage, fil d'Ariane)
- **Mesure d'audience** : Cloudflare Web Analytics depuis le 28 octobre 2026 (`components/MesureAudience.tsx`) : page d'arrivée seulement, jamais la fiche ni le questionnaire ; lecture dans la console Cloudflare et la page Audience du Studio. Avant, aucune mesure en production (Plausible prévu, jamais souscrit)
- **PWA** : `manifest.json` + icônes 512/192/favicon — installable sur mobile ; favicon Solelis servi sous une nouvelle adresse (`/icons/solelis-favicon-96.png`) pour que Google remplace l'ancienne icône
