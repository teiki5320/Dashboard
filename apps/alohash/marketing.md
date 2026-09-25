# MARKETING — plan marketing & rémunération

Mis à jour le 25 septembre 2026. Compagnon de INFRA.md.

## Positionnement

- **Promesse** : « CBD français, cultivé avec soin » (`src/lib/config.ts`). Fleurs, résines, huiles, infusions et cosmétiques issus de producteurs français, avec des accessoires (grinders, vaporisateurs, feuilles, boîtes de conservation).
- **Preuves affichées** : certificat d'analyse PDF pour chaque produit CBD, taux de CBD et de THC (≤ 0,3 %), région d'origine et producteur sur chaque fiche.
- **Cadre** : vente interdite aux mineurs (vérification d'âge à l'entrée), aucune allégation de santé (contrôle automatique à l'enregistrement d'un produit).
- **Ton et image** : thème sombre « Braise », boutique en une page par gammes, badges « Coup de cœur », prix au gramme.
- **État du catalogue** : les 16 produits en ligne sont des produits de démonstration (producteurs et certificats fictifs, photos générées par IA). Ils sont à remplacer par les vrais produits.

## Modèle de rémunération

Vente directe en ligne de produits physiques. Frais de port par défaut : 4,90 €, offerts à partir de 50 € d'achat (`src/lib/config.ts`, réglables par variables d'environnement).

| Phase | Levier | Statut |
| --- | --- | --- |
| 1. Lancement | Boutique en ligne avec catalogue, panier et commande | ✅ |
| 1. Lancement | Paiement par virement bancaire | ✅ (coordonnées bancaires encore à renseigner) |
| 1. Lancement | Gestion des stocks et des commandes dans l'admin | ✅ |
| 1. Lancement | E-mails de confirmation de commande | ⬜ (code prêt, SMTP non configuré) |
| 1. Lancement | Vrais produits, photos et certificats d'analyse | ⬜ |
| 2. Conversion | Paiement par carte, Apple Pay, Google Pay (Stripe Checkout) | ✅ en mode test (accord de Stripe pour le CBD à obtenir avant les clés réelles) |
| 2. Conversion | Livraison offerte au-delà d'un seuil | ✅ |
| 2. Conversion | Mise en avant « Coup de cœur » et tri | ✅ |
| 3. Fidélisation | Codes promo, programme de fidélité | ⬜ (absent du code) |
| 3. Fidélisation | Newsletter / e-mails marketing | ⬜ (consentement « marketing » recueilli par la bannière, aucun outil branché) |

## Canaux

- **Référencement naturel** : sitemap et robots.txt générés automatiquement, métadonnées Open Graph, données structurées JSON-LD sur l'accueil et les fiches produit. ✅ dans le code, sur le domaine https://www.alohash.fr.
- **Réseaux sociaux** : aucun lien ni intégration dans le code. ⬜
- **E-mail** : e-mails transactionnels prêts, aucun outil d'e-mailing marketing. ⬜
- **Publicité payante** : aucune intégration. Les régies grand public limitent fortement la publicité pour le CBD : à vérifier avant toute campagne. ⬜

## KPIs

Aucun outil de mesure d'audience n'est installé : la bannière cookies recueille le consentement « mesure d'audience », mais aucun script n'est branché. Les valeurs ci-dessous sont à vérifier dans la console une fois les outils en place.

| Indicateur | Source | Valeur |
| --- | --- | --- |
| Commandes par statut | Admin → Tableau de bord | à vérifier dans la console |
| Chiffre d'affaires | Admin → Commandes | à vérifier dans la console |
| Panier moyen | Admin → Commandes | à vérifier dans la console |
| Visites, taux de conversion | Outil de mesure d'audience (à installer) | à vérifier dans la console |
| Produits en stock bas (≤ 5) | Admin → Stocks | à vérifier dans la console |

## Calendrier

Aucune date n'est fixée dans le dépôt. Ordre prévu :

1. Préparer l'ouverture : vrais produits, coordonnées bancaires, SMTP (nom de domaine fait).
2. Ouvrir la boutique : paiement par virement, référencement naturel.
3. Ajouter le paiement par carte, puis la mesure d'audience.
4. Fidéliser : newsletter, codes promo.

## Prochaines actions

- ✅ Mentions légales, CGV et médiateur de la consommation (CM2C) renseignés
- ✅ Base de données de production (Neon) et espace admin opérationnels
- ⬜ Remplacer les 16 produits de démo par les vrais produits (photos, certificats d'analyse)
- ⬜ Renseigner l'IBAN et les coordonnées bancaires (`PAYMENT_BANK_*`)
- ⬜ Configurer le SMTP pour les e-mails de commande
- ✅ Nom de domaine www.alohash.fr relié, `NEXT_PUBLIC_SITE_URL` renseignée
- ⬜ Choisir un outil de mesure d'audience respectueux du consentement
- ✅ Paiement par carte branché (Stripe, mode test)
- ⬜ Obtenir l'accord de Stripe pour l'activité CBD, puis passer aux clés réelles
