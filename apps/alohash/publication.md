# PUBLICATION — état de la mise en ligne

> Généré le 28 septembre 2026. Aucun secret ici.

## Vue d'ensemble

| Version | En production ? | URL | Hébergeur |
| --- | --- | --- | --- |
| Web — site de référence (recettes, conseils, boutique) | Oui, en préouverture : **en maintenance** (écran « On prépare la marmite », pages en `noindex`, sitemap vide) | https://www.alohash.fr (aussi https://alohash.vercel.app) | Vercel (plan Hobby), base Neon |
| Web — vitrine de démonstration | Oui, copie en `noindex` (newsletter et admin désactivés) | https://teiki5320.github.io/alohash/ | GitHub Pages |

Le site de référence est redéployé à chaque push sur `main` ; la vitrine est reconstruite à chaque push et chaque lundi (cron), pour publier les articles « Conseils » programmés.

Contenu : 46 recettes (16 pays), 67 articles « Conseils » programmés du 20/07/2026 au 25/10/2027, 91 produits en 8 gammes dont les boutons « Acheter · prix » mènent à Amazon.fr (tag `kultiva-21`, prix indicatifs relevés le 27/09/2026). Le site ne vend rien lui-même.

## Domaine & SSL

- **Domaine** : `www.alohash.fr` (adresse principale), relié au projet Vercel le 25 septembre 2026 ; `alohash.fr` redirige vers `www.alohash.fr` (redirection 308).
- **DNS** : chez IONOS. Enregistrement A de `alohash.fr` et CNAME de `www` vers Vercel ; enregistrements de messagerie IONOS (MX, SPF, DKIM, DMARC) conservés.
- **SSL** : certificat HTTPS généré automatiquement par Vercel ; HSTS et CSP envoyés par le site (`next.config.ts`).
- `alohash.vercel.app` reste accessible en parallèle (redirection vers le domaine possible plus tard).

## Visibilité

- **Référencement** : sitemap (`/sitemap.xml` : recettes, pays, articles publiés ; vide en maintenance), robots.txt (admin exclu), métadonnées Open Graph et données JSON-LD (Recipe, Product) présents dans le code.
  - `NEXT_PUBLIC_SITE_URL` vaut `https://www.alohash.fr` sur Vercel : sitemap, robots.txt et liens canoniques utilisent le domaine.
  - Inscription à Google Search Console : à vérifier dans la console.
- **Analytics** : aucun outil installé ; bannière cookies d'information (cookies nécessaires seulement).
- **Accès** : `www.alohash.fr` et `alohash.vercel.app` sont publiques ; pendant la maintenance, les visiteurs voient l'écran « Maintenance ».

## Vérifications avant envoi

`npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run build:pages`.

## Ce qui reste, dans l'ordre

1. Relire les pages légales (`/conditions`, `/mentions-legales`, `/confidentialite`) et compléter les variables `NEXT_PUBLIC_LEGAL_*`.
2. Vérifier que le plan Vercel convient aux revenus d'affiliation (Hobby réservé au non commercial).
3. Désactiver le mode maintenance (page `/admin`) pour ouvrir le site.
4. Déclarer le site dans Google Search Console, brancher l'envoi de la newsletter.
5. Mettre à jour régulièrement les prix indicatifs des produits.
