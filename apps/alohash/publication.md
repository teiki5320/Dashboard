# PUBLICATION — état de la mise en ligne

> Généré le 25 septembre 2026. Aucun secret ici.

## Vue d'ensemble

| Version | En production ? | URL | Hébergeur |
| --- | --- | --- | --- |
| Web — site complet (recettes + épicerie) | Oui, en préouverture : **en maintenance** (écran « On prépare la marmite »), 46 recettes et 26 produits de démo en base | https://www.alohash.fr (aussi https://alohash.vercel.app) | Vercel (plan Hobby), base Neon |
| Web — vitrine statique | Oui (démo : commande, avis, newsletter et admin désactivés) | https://teiki5320.github.io/alohash/ | GitHub Pages |

Les deux versions sont republiées automatiquement à chaque push sur `main`.

## Domaine & SSL

- **Domaine** : `www.alohash.fr` (adresse principale), relié au projet Vercel le 25 septembre 2026 ; `alohash.fr` redirige vers `www.alohash.fr` (redirection 308).
- **DNS** : chez IONOS. Enregistrement A de `alohash.fr` et CNAME de `www` vers Vercel ; enregistrements de messagerie IONOS (MX, SPF, DKIM, DMARC) conservés.
- **SSL** : certificat HTTPS généré automatiquement par Vercel.
- `alohash.vercel.app` reste accessible en parallèle (redirection vers le domaine possible plus tard).

## Visibilité

- **Référencement** : sitemap (`/sitemap.xml`, 95 adresses dont les 46 recettes et les pages pays), robots.txt (admin, panier et commande exclus), métadonnées Open Graph et données JSON-LD (Recipe, Product) présents dans le code.
  - `NEXT_PUBLIC_SITE_URL` vaut `https://www.alohash.fr` sur Vercel : sitemap, robots.txt et liens canoniques utilisent le domaine.
  - Inscription à Google Search Console : à vérifier dans la console.
- **Analytics** : aucun outil installé. Le consentement « mesure d'audience » est recueilli par la bannière cookies, mais aucun script n'y est branché.
- **Accès** : `www.alohash.fr` et `alohash.vercel.app` sont publiques ; pendant la maintenance, les visiteurs voient l'écran « Maintenance ».

## Ce qui reste, dans l'ordre

1. Remplacer les produits et photos de démo par les vrais (photos ajoutées dans le dépôt : `public/products`, `public/recipes`), avec un étiquetage complet (ingrédients, allergènes, conservation, DDM).
2. Déclarer l'activité alimentaire à la DDPP de Vendée.
3. Paiement : rouvrir un compte Stripe pour l'activité alimentaire (le compte CBD a été fermé), tester avec la carte de test, puis passer aux clés réelles ; ou renseigner les coordonnées bancaires (`PAYMENT_BANK_*`) pour le virement.
4. Configurer le SMTP (`SMTP_*`, `EMAIL_FROM`) pour les e-mails de commande.
5. Vérifier que le plan Vercel convient à un usage commercial (Hobby réservé au non commercial).
6. Passer une commande de test de bout en bout, puis l'annuler pour vérifier la remise en stock.
7. Désactiver le mode maintenance (Admin → Maintenance) pour ouvrir le site.
8. Déclarer le site dans Google Search Console, brancher l'envoi de la newsletter et un outil de mesure d'audience.
