# MARKETING — plan marketing & rémunération

Mis à jour le 12 octobre 2026. Compagnon de INFRA.md.

## Positionnement

- **Site** : **Keur Cook** (anciennement Alohash), https://keurcook.com ; éditeur ALOHASH (SAS), nom commercial TOA CORP ; pied de page « Un site TOA KEUR » (lien vers https://toakeur.com) ; contact keurcook@toakeur.com.
- **Promesse** : « Recettes africaines & produits rares » (`src/lib/config.ts`). Les grands plats d'Afrique expliqués pas à pas, et les ingrédients introuvables en grande surface pour les réussir chez soi.
- **Contenu** :
  - 52 recettes de 16 pays (Afrique de l'Ouest, centrale, de l'Est, australe et Madagascar), avec histoire du plat, ingrédients, étapes, astuces et valeurs nutritionnelles estimées ; une section « La cuisine de … » sur chaque page pays ;
  - rubrique « Conseils » : 67 articles, dont 34 publiés et 33 programmés, trois par semaine (lundi, mercredi, vendredi) jusqu'au 28 décembre 2026 (`content/conseils/`, `docs/CONSEILS.md`, `docs/CONSEILS-CALENDRIER.md`) ;
  - boutique de 91 produits en 8 gammes : Épices & aromates, Farines & céréales, Feuilles & fleurs séchées, Poissons & fumés, Huiles & pâtes, Snacks & fruits secs, Cafés & thés, Ustensiles. Produits retenus : plus de 3,5 étoiles sur Amazon.
- **Lien recettes → boutique** : chaque ingrédient disponible en boutique est signalé « Produit rare » dans la recette, avec un bouton d'achat Amazon ; chaque fiche produit liste les recettes qui l'utilisent.
- **Ton et image** : thème sombre « Braise », carte de l'Afrique en particules sur l'accueil (« Seize pays, une seule table. »), grandes photos, carrousels par type de plat.
- **Photos** : photos OpenArt.

## Modèle de rémunération

Affiliation Amazon Partenaires : les boutons « Acheter · prix » mènent à Amazon.fr (tag `keurcook-21`, `src/lib/amazon.ts`) ; Amazon encaisse, livre et verse une commission sur les achats. Le site ne vend rien lui-même. Les recettes et les conseils sont gratuits et attirent les visiteurs. Prix affichés indicatifs, relevés le 27 septembre 2026.

| Phase | Levier | Statut |
| --- | --- | --- |
| 1. Lancement | Site ouvert au public (maintenance coupée) | ✅ |
| 1. Lancement | Recettes en ligne (fiches, pays, recherche par ingrédient, favoris) | ✅ |
| 1. Lancement | Boutique : 91 produits, 8 gammes, boutons « Acheter · prix » vers Amazon.fr ; keurcook.com déclaré chez Amazon Partenaires | ✅ |
| 1. Lancement | Rubrique « Conseils », trois articles par semaine | ✅ (33 en réserve, jusqu'au 28 décembre 2026) |
| 2. Conversion | Bouton d'achat Amazon sur les ingrédients des recettes | ✅ |
| 2. Conversion | Mise à jour régulière des prix indicatifs | ⬜ (relevé manuel, dernier le 27 septembre 2026) |
| 3. Fidélisation | Newsletter « la recette de la semaine » | ⬜ aucun outil choisi |

## Canaux

- **Référencement naturel** : sitemap (recettes, pays, produits, articles publiés), données structurées « Recipe » et « Product », textes alternatifs, titres et descriptions calibrés. Domaine déclaré dans Google Search Console (189 pages indexées au relevé du 7 octobre 2026) ; pages signalées chaque lundi à Bing et aux autres moteurs par IndexNow. ✅
- **Contenu régulier** : trois articles « Conseils » par semaine (lundi, mercredi, vendredi), publiés automatiquement. ✅
- **Pinterest** : compte « Keur Cook » branché, site revendiqué, bouton « Épingler » sur chaque recette. Épingles publiées par la routine `keurcook-epingles-pinterest` : 40 recettes épinglées du 2 au 12 octobre 2026 dans les tableaux par région, deux jours de plan restants. ✅
- **Partage** : boutons « Partager sur WhatsApp » et « Épingler sur Pinterest », version imprimable sur chaque recette. ✅
- **TikTok et YouTube** : comptes communs « Afrotok » et « toa.afrotok » branchés au Planning du Studio, mais aucune publication Keur Cook prévue. ⬜
- **E-mail** : pas de newsletter (outil à choisir). ⬜
- **Publicité payante** : aucune. ⬜

## KPIs

Aucun outil de mesure d'audience n'est installé ; la bannière cookies est une simple information (cookies nécessaires seulement).

| Indicateur | Source | Valeur |
| --- | --- | --- |
| Pages indexées par Google | Google Search Console (domaine keurcook.com) | 189 indexées, 31 non indexées (7 octobre 2026) |
| Clics, achats et commissions Amazon | https://partenaires.amazon.fr | à vérifier dans la console |
| Impressions et clics des épingles | Pinterest (statistiques du compte Keur Cook) | à vérifier dans la console |
| Visites, recettes et articles les plus vus | aucun outil installé | — |

## Les 3 priorités

- Écrire de nouveaux articles « Conseils » : il en reste 33 en réserve, la réserve passe sous 20 vers le 13 novembre et se vide le 28 décembre 2026.
- Relever à nouveau les prix indicatifs des 91 produits : le dernier relevé date du 27 septembre 2026 et rien ne le refait automatiquement.
- Installer une mesure d'audience respectueuse du consentement (Cloudflare Web Analytics, en autorisant son script dans `public/_headers`) pour savoir quelles recettes et quels articles attirent les visiteurs.
