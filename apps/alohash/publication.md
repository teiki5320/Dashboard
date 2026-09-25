# PUBLICATION — état de la mise en ligne

> Généré le 25 septembre 2026. Aucun secret ici.

## Vue d'ensemble

| Version | En production ? | URL | Hébergeur |
| --- | --- | --- | --- |
| Web — boutique complète | Oui, en préouverture (produits de démo, paiement par virement) | https://alohash.vercel.app | Vercel (plan Hobby), base Neon, fichiers Vercel Blob |
| Web — vitrine statique | Oui (démo, commande désactivée) | https://teiki5320.github.io/alohash/ | GitHub Pages |

Les deux versions sont republiées automatiquement à chaque push sur `main`.

## Domaine & SSL

- **Domaine personnalisé** : aucun relié pour l'instant. Le site est servi sur `alohash.vercel.app` et `teiki5320.github.io`.
- **SSL** : HTTPS fourni automatiquement par Vercel et par GitHub Pages sur leurs adresses.
- **Procédure prévue** : ajout du domaine dans Vercel (Settings → Domains), puis enregistrements DNS chez IONOS (README, section « Nom de domaine IONOS »).
- L'adresse `contact@alohash.fr` est affichée sur le site : propriété du domaine `alohash.fr` à vérifier.

## Visibilité

- **Référencement** : sitemap (`/sitemap.xml`), robots.txt (admin, panier et commande exclus), métadonnées Open Graph et données JSON-LD présents dans le code.
  - ⚠️ `NEXT_PUBLIC_SITE_URL` n'est pas définie sur Vercel : sur la version complète, le sitemap, le robots.txt et les liens canoniques pointent vers `http://localhost:3000`, la valeur par défaut.
  - Inscription à Google Search Console : à vérifier dans la console.
- **Analytics** : aucun outil installé. Le consentement « mesure d'audience » est recueilli par la bannière cookies, mais aucun script n'y est branché.
- **Accès** : l'adresse `alohash.vercel.app` est publique. La protection Vercel ne couvre que les adresses de déploiement de test.

## Ce qui reste, dans l'ordre

1. Remplacer le stockage Blob « Private » par un stockage « Public », puis tester l'envoi d'une photo depuis l'admin.
2. Passer une commande de test de bout en bout, puis l'annuler pour vérifier la remise en stock.
3. Renseigner `NEXT_PUBLIC_SITE_URL` sur Vercel (URL définitive du site).
4. Vérifier que le plan Vercel convient à un usage commercial (Hobby réservé au non commercial).
5. Relier le nom de domaine (Vercel + DNS IONOS), puis mettre à jour `NEXT_PUBLIC_SITE_URL`.
6. Configurer le SMTP (`SMTP_*`, `EMAIL_FROM`) pour les e-mails de commande.
7. Renseigner les coordonnées bancaires (`PAYMENT_BANK_*`).
8. Remplacer les produits de démo par les vrais produits, photos et certificats d'analyse.
9. Déclarer le site dans Google Search Console et choisir un outil de mesure d'audience.
10. Brancher un prestataire de paiement par carte acceptant le CBD.
