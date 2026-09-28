# MARKETING — plan marketing & rémunération

Mis à jour le 28 septembre 2026. Compagnon de INFRA.md.

## Positionnement

- **Promesse** : « Recettes africaines & produits rares » (`src/lib/config.ts`). Les grands plats d'Afrique expliqués pas à pas, et les ingrédients introuvables en grande surface pour les réussir chez soi.
- **Contenu** :
  - 46 recettes de 16 pays (Afrique de l'Ouest, centrale, de l'Est, australe et Madagascar), avec histoire du plat, ingrédients, étapes et astuces ;
  - rubrique « Conseils » : 67 articles programmés, un chaque lundi du 20/07/2026 au 25/10/2027 (`content/conseils/`, `docs/CONSEILS.md`, `docs/CONSEILS-CALENDRIER.md`) ;
  - boutique de 91 produits en 8 gammes : Épices & aromates, Farines & céréales, Feuilles & fleurs séchées, Poissons & fumés, Huiles & pâtes, Snacks & fruits secs, Cafés & thés, Ustensiles. Produits retenus : plus de 3,5 étoiles sur Amazon.
- **Lien recettes → boutique** : chaque ingrédient disponible en boutique est signalé « Produit rare » dans la recette, avec un bouton d'achat Amazon ; chaque fiche produit liste les recettes qui l'utilisent.
- **Ton et image** : thème sombre « Braise », carte de l'Afrique en particules sur l'accueil, grandes photos, carrousels par type de plat.
- **Photos** : générées avec OpenArt (Seedream 4.5).

## Modèle de rémunération

Affiliation Amazon Partenaires : les boutons « Acheter · prix » mènent à Amazon.fr (tag `kultiva-21`, `src/lib/amazon.ts`) ; Amazon encaisse, livre et verse une commission sur les achats. Le site ne vend rien lui-même. Les recettes et les conseils sont gratuits et attirent les visiteurs. Prix affichés indicatifs, relevés le 27/09/2026.

| Phase | Levier | Statut |
| --- | --- | --- |
| 1. Lancement | Recettes en ligne (fiches, pays, recherche par ingrédient, favoris) | ✅ |
| 1. Lancement | Boutique : 91 produits, 8 gammes, boutons « Acheter · prix » vers Amazon.fr | ✅ |
| 1. Lancement | Rubrique « Conseils », un article chaque lundi | ✅ (67 articles programmés) |
| 2. Conversion | Bouton d'achat Amazon sur les ingrédients des recettes | ✅ |
| 2. Conversion | Avis des visiteurs (validés dans l'admin) | ✅ |
| 2. Conversion | Mise à jour régulière des prix indicatifs | ⬜ (relevé manuel) |
| 3. Fidélisation | Newsletter « la recette de la semaine » | ✅ collecte des inscrits et export CSV ; ⬜ envoi (Brevo à brancher) |

## Canaux

- **Référencement naturel** : sitemap avec les recettes, les pages pays et les articles publiés, données structurées Google « Recipe » (temps, ingrédients, étapes, note des avis) et « Product ». ✅ dans le code, sur https://www.alohash.fr (sitemap vide tant que le site est en maintenance ; la vitrine GitHub Pages est en `noindex`).
- **Contenu régulier** : un article « Conseils » chaque lundi, publié automatiquement. ✅
- **Partage** : bouton « Partager sur WhatsApp » et version imprimable sur chaque recette. ✅
- **E-mail** : newsletter (inscription sur l'accueil et l'écran de maintenance), outil d'envoi à brancher. ⬜
- **Réseaux sociaux** : aucun lien ni intégration dans le code. ⬜
- **Publicité payante** : aucune intégration. ⬜

## KPIs

Aucun outil de mesure d'audience n'est installé ; la bannière cookies est une simple information (cookies nécessaires seulement).

| Indicateur | Source | Valeur |
| --- | --- | --- |
| Recettes publiées, avis à valider, inscrits newsletter, produits en ligne | Admin → Tableau de bord | à vérifier dans la console |
| Clics, achats et commissions Amazon | https://partenaires.amazon.fr | à vérifier dans la console |
| Visites, recettes et articles les plus vus | Outil de mesure d'audience (à installer) | à vérifier dans la console |

## Calendrier

Articles « Conseils » : un chaque lundi du 20/07/2026 au 25/10/2027 (`docs/CONSEILS-CALENDRIER.md`). Pour le reste, ordre prévu :

1. Ouvrir le site : désactiver la maintenance, déclarer le site à Google Search Console.
2. Brancher l'envoi de la newsletter et, si besoin, une mesure d'audience respectueuse du consentement.
3. Faire vivre le site : nouvelles recettes, relevé régulier des prix Amazon.

## Prochaines actions

- ✅ Site de recettes africaines (46 recettes, 16 pays) et rubrique « Conseils » (67 articles programmés)
- ✅ Boutique de 91 produits vers Amazon Partenaires (tag kultiva-21)
- ✅ Admin : recettes, produits (ASIN Amazon), avis, newsletter, maintenance
- ⬜ Désactiver la maintenance et déclarer le site à Google Search Console
- ⬜ Brancher l'envoi de la newsletter (Brevo)
- ⬜ Mettre à jour les prix indicatifs régulièrement
