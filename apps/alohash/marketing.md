# MARKETING — plan marketing & rémunération

Mis à jour le 25 septembre 2026. Compagnon de INFRA.md.

## Positionnement

- **Promesse** : « Recettes africaines & produits rares » (`src/lib/config.ts`). Les grands plats d'Afrique expliqués pas à pas, et les ingrédients introuvables en grande surface pour les réussir chez soi.
- **Contenu** : 46 recettes de 16 pays (Afrique de l'Ouest, centrale, de l'Est, australe et Madagascar), avec histoire du plat, ingrédients, étapes et astuces. 26 produits rares en 5 gammes : épices et aromates, farines et céréales, feuilles et fleurs séchées, poissons et fumés, huiles et pâtes.
- **Lien recettes → boutique** : chaque ingrédient vendu sur le site est signalé « Produit rare » dans la recette, avec un bouton « Tout ajouter au panier » ; chaque fiche produit liste les recettes qui l'utilisent.
- **Ton et image** : thème sombre « Braise », carte de l'Afrique en particules sur l'accueil, grandes photos, carrousels par type de plat.
- **État du contenu** : recettes, producteurs et photos sont de démonstration (producteurs fictifs, photos générées par IA). À remplacer par les vrais produits et de vraies photos.

## Modèle de rémunération

Vente directe en ligne de produits alimentaires ; les recettes sont gratuites et servent à attirer les visiteurs. Frais de port par défaut : 4,90 €, offerts à partir de 50 € d'achat (`src/lib/config.ts`, réglables par variables d'environnement).

| Phase | Levier | Statut |
| --- | --- | --- |
| 1. Lancement | Recettes en ligne (fiches, pays, recherche par ingrédient, favoris) | ✅ |
| 1. Lancement | Épicerie : catalogue, panier, commande, stocks | ✅ |
| 1. Lancement | Achat via Amazon Partenaires (bouton « Acheter », tag kultiva-21) | ✅ |
| 1. Lancement | E-mails de confirmation de commande | ⬜ (code prêt, SMTP non configuré) |
| 1. Lancement | Vrais produits, étiquetage, photos | ⬜ |
| 2. Conversion | « Tout ajouter au panier » depuis une recette | ✅ |
| 2. Conversion | Livraison offerte au-delà d'un seuil | ✅ |
| 2. Conversion | Avis des visiteurs (validés dans l'admin) | ✅ |
| 3. Fidélisation | Newsletter « la recette de la semaine » | ✅ collecte des inscrits et export CSV ; ⬜ envoi (Brevo à brancher) |
| 3. Fidélisation | Codes promo, programme de fidélité | ⬜ (absent du code) |

## Canaux

- **Référencement naturel** : sitemap avec toutes les recettes et les pages pays, données structurées Google « Recipe » (temps, ingrédients, étapes, note des avis) et « Product ». ✅ dans le code, sur https://www.alohash.fr.
- **Partage** : bouton « Partager sur WhatsApp » et version imprimable sur chaque recette. ✅
- **E-mail** : newsletter (inscription sur l'accueil et l'écran de maintenance), outil d'envoi à brancher. ⬜
- **Réseaux sociaux** : aucun lien ni intégration dans le code. ⬜
- **Publicité payante** : aucune intégration. ⬜

## KPIs

Aucun outil de mesure d'audience n'est installé : la bannière cookies recueille le consentement « mesure d'audience », mais aucun script n'est branché.

| Indicateur | Source | Valeur |
| --- | --- | --- |
| Recettes publiées, avis à valider, inscrits newsletter | Admin → Tableau de bord | à vérifier dans la console |
| Commandes par statut, chiffre d'affaires, panier moyen | Admin → Commandes | à vérifier dans la console |
| Visites, recettes les plus vues, taux de conversion | Outil de mesure d'audience (à installer) | à vérifier dans la console |
| Produits en stock bas (≤ 5) | Admin → Stocks | à vérifier dans la console |

## Calendrier

Aucune date n'est fixée dans le dépôt. Ordre prévu :

1. Préparer l'ouverture : vrais produits et étiquetage, déclaration DDPP, paiement, SMTP.
2. Ouvrir le site : désactiver la maintenance, déclarer le site à Google Search Console.
3. Brancher l'envoi de la newsletter et la mesure d'audience.
4. Fidéliser : codes promo, nouvelles recettes chaque semaine.

## Prochaines actions

- ✅ Site transformé en recettes africaines + épicerie de produits rares (46 recettes, 26 produits)
- ✅ Admin : recettes, avis, newsletter, maintenance
- ⬜ Remplacer les produits et photos de démo par les vrais
- ⬜ Déclarer l'activité alimentaire à la DDPP de Vendée et vérifier l'étiquetage (règlement INCO)
- ⬜ Configurer le SMTP pour les e-mails de commande
- ⬜ Brancher l'envoi de la newsletter (Brevo)
- ⬜ Choisir un outil de mesure d'audience respectueux du consentement
