# MARKETING — plan marketing & rémunération

Mis à jour le 14 octobre 2026. Compagnon de INFRA.md.

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

Deux sources, sans rien vendre soi-même :

- **Affiliation Amazon Partenaires** : les boutons « Acheter · prix » mènent à Amazon.fr (tag `keurcook-21`, `src/lib/amazon.ts`) ; Amazon encaisse, livre et verse une commission sur les achats.
- **Publicité Google AdSense** (depuis le 12 octobre 2026) : annonces titrées « Publicité » sur les recettes, les articles « Conseils » et les pages pays ; consentement recueilli par le message de Google.

Les recettes et les conseils sont gratuits et attirent les visiteurs. Prix affichés indicatifs, relevés le 27 septembre 2026.

## Rémunération par phases

- [fait] **Aujourd'hui** : affiliation Amazon sur 91 produits, annonces AdSense depuis le 12 octobre 2026, audience mesurée depuis le 13
- [en cours] **Mesurer** : lire dans Cloudflare Web Analytics quelles pages attirent et rapportent
- **Fidéliser** : newsletter « la recette de la semaine », outil à choisir
- **Élargir** : vidéos de recettes sur TikTok et YouTube, comptes à rattacher à Keur Cook dans le Studio

## Points forts

- 🌍 **Seize pays, une seule table** : 52 recettes de 16 pays, avec l'histoire du plat, les étapes et les valeurs nutritionnelles.
- 🛒 **De la recette au produit** : chaque ingrédient rare est signalé dans la recette et s'achète en un clic sur Amazon.fr.
- 📝 **Un contenu qui paraît seul** : trois articles « Conseils » par semaine, publiés automatiquement par GitHub Actions.

## Canaux

- **Référencement naturel** : sitemap (recettes, pays, produits, articles publiés), données structurées « Recipe » et « Product », textes alternatifs, titres et descriptions calibrés. Domaine déclaré dans Google Search Console (189 pages indexées au relevé du 7 octobre 2026) ; pages signalées chaque lundi à Bing et aux autres moteurs par IndexNow. ✅
- **Contenu régulier** : trois articles « Conseils » par semaine (lundi, mercredi, vendredi), publiés automatiquement. ✅
- **Pinterest** : compte « Keur Cook » branché, site revendiqué, bouton « Épingler » sur chaque recette. Épingles publiées par la routine `keurcook-epingles-pinterest` : 40 recettes épinglées du 2 au 12 octobre 2026 dans les tableaux par région, deux jours de plan restants. ✅
- **Partage** : boutons « Partager sur WhatsApp » et « Épingler sur Pinterest », version imprimable sur chaque recette. ✅
- **TikTok et YouTube** : TikTok « Afrotok » est branché au Studio mais rattaché à aucune app, YouTube « toa.afrotok » à Erea seule ; aucune publication Keur Cook prévue. ⬜
- **E-mail** : pas de newsletter (outil à choisir). ⬜
- **Publicité payante** : aucune. ⬜

## Mesures

- **Pages indexées par Google** : 189 indexées, 31 non indexées (Search Console, 7 octobre 2026)
- **Adresses du sitemap** : 201 (13 octobre 2026)
- **Clics, achats et commissions Amazon** : à vérifier dans la console (partenaires.amazon.fr)
- **Affichages et revenus des annonces** : à vérifier dans la console (adsense.google.com)
- **Épingles Pinterest** : 40 recettes épinglées ; impressions et clics à vérifier dans la console
- **Visites et pages les plus vues** : à vérifier dans la console Cloudflare Web Analytics (mesure active depuis le 13 octobre 2026)

## Les 3 priorités

- Écrire de nouveaux articles « Conseils » : il en reste 33 en réserve, la réserve passe sous 20 vers le 13 novembre et se vide le 28 décembre 2026.
- Relever à nouveau les prix indicatifs des 91 produits : le dernier relevé date du 27 septembre 2026 et rien ne le refait automatiquement.
- Préparer la suite des épingles Pinterest : le plan de la routine `keurcook-epingles-pinterest` s'achève et 12 des 52 recettes n'ont pas encore d'épingle.
