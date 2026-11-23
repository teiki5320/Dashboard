# MARKETING — plan marketing & rémunération

Mis à jour le 23 novembre 2026. Compagnon de INFRA.md.

## Positionnement

- **Site** : **Keur Cook** (anciennement Alohash), https://keurcook.com ; éditeur ALOHASH (SAS), nom commercial TOA CORP ; pied de page « Un site TOA KEUR » (lien vers https://toakeur.com) retiré le 19 novembre 2026 (plus aucun lien vers les autres sites) ; contact keurcook@toakeur.com.
- **Promesse** : « Recettes africaines & produits rares » (`src/lib/config.ts`). Les grands plats d'Afrique expliqués pas à pas, et les ingrédients introuvables en grande surface pour les réussir chez soi.
- **Contenu** :
  - 58 recettes de 16 pays (Afrique de l'Ouest, centrale, de l'Est, australe et Madagascar), dont six thés, cafés et infusions (ataya, kinkeliba, chai kényan, rooibos glacé, buna, kahawa chungu) depuis le 19 octobre 2026, avec histoire du plat, ingrédients, étapes, astuces et valeurs nutritionnelles estimées ; une section « La cuisine de … » sur chaque page pays ;
  - rubrique « Conseils » : 74 articles, dont 54 publiés et 20 programmés au 23 novembre (dont 2 des 3 articles sur les plats ajoutés le 19 novembre, prévus le 30 novembre et le 7 décembre ; le premier, « plats africains à connaître », est en ligne depuis le 23 novembre), trois par semaine (lundi, mercredi, vendredi) jusqu'au 28 décembre 2026 (`content/conseils/`, `docs/CONSEILS.md`, `docs/CONSEILS-CALENDRIER.md`) ;
  - boutique de 126 produits en 9 gammes (comptés sur la boutique le 23 novembre 2026 ; 125 du 18 au 20 novembre, après le retrait des feuilles de ndolé indisponibles, puis le café d'Éthiopie bio revenu le 20) : Épices & aromates, Farines & céréales, Feuilles & fleurs séchées, Poissons & fumés, Huiles & pâtes, Snacks & fruits secs, Cafés & thés, Ustensiles (dont mortiers, marmites, mixeurs et objets de service), Livres de cuisine. Produits retenus : plus de 3,5 étoiles sur Amazon ;
  - « Actus de la cuisine africaine » (depuis le 27 octobre 2026) : page `/actus` (20 actus ; depuis le 19 novembre 2026 en `noindex`, hors sitemap, et sans bloc d'actus sur l'accueil ni sur les pages pays), mis à jour 2 fois par jour (12 h et 19 h) par la veille actus ; chaque actu est résumée par nous, avec le lien vers sa source et le crédit de l'image ; depuis le 28 octobre 2026, toucher une actu ouvre son article complet (300 à 450 mots) sur sa propre page du site (`/actus/<adresse>`, plus trouvable par Google depuis le 19 novembre 2026 : noindex, hors sitemap) ; jamais d'actu santé ni de vocabulaire de vente ;
  - « Top 10 » (depuis le 19 octobre 2026) : 10 classements de produits (ustensiles, ingrédients pour débuter, mortiers, marmites, mixeurs, épices, farines, livres, thés et cafés, service et thé), selon la note moyenne des acheteurs sur Amazon.fr, chacun relié aux recettes concernées.
- **Lien recettes → boutique** : chaque ingrédient disponible en boutique est signalé « Produit rare » dans la recette, avec un bouton d'achat Amazon ; chaque fiche produit liste les recettes qui l'utilisent.
- **Ton et image** : thème sombre « Braise », carte de l'Afrique en particules sur l'accueil (« Seize pays, une seule table. »), grandes photos, carrousels par type de plat.
- **Photos** : photos OpenArt ; photos libres de droits (Wikimedia Commons, crédit sous la photo) pour les articles « Conseils » récents, dont les trois articles de Noël.

## Modèle de rémunération

Deux sources, sans rien vendre soi-même :

- **Affiliation Amazon Partenaires** : les boutons « Voir sur Amazon » mènent à Amazon.fr (tag `keurcookfr-21`, `src/lib/amazon.ts`) ; Amazon encaisse, livre et verse une commission sur les achats. Depuis le 28 octobre 2026 : boutons d'au moins 44 px avec texte partout, produits remontés (juste après les ingrédients sur téléphone, en haut des pages pays, après la première partie des conseils), tout le catalogue visible d'emblée en boutique, bloc « Nos coups de cœur » (8 produits en images, reliés à leurs fiches du site, juste après « Cuisiner par pays ») et rangée « Nos Top 10 » sur l'accueil (sans bouton Amazon) et liens internes vers les Top 10 depuis les fiches, recettes, conseils et actus ; codes de suivi par type de page prêts (tous encore `keurcookfr-21`).
- **Publicité Google AdSense** (examen demandé le 12 octobre 2026, refusé par Google le 31 octobre 2026 pour « contenu à faible valeur informative », motif lu dans la console AdSense le 15 novembre 2026 ; nouvel examen en cours : la console affiche « En préparation » (dernière mise à jour le 20 novembre 2026, vérifié le 21 novembre 2026)) : emplacements titrés « Publicité » prêts sur les recettes, les articles « Conseils », les articles d'actus (depuis le 28 octobre 2026) et les pages pays ; aucune annonce ne s'affiche tant que Google n'a pas validé le site ; consentement recueilli par le message de Google.

Les recettes et les conseils sont gratuits et attirent les visiteurs. Aucun prix affiché sur le site depuis le 28 octobre 2026 : seul celui d'Amazon fait foi.

## Rémunération par phases

- [fait] **Aujourd'hui** : affiliation Amazon sur 126 produits et 10 Top 10, AdSense en place, refusé le 31 octobre, nouvel examen en cours (aucune annonce), audience mesurée depuis le 13 octobre (Umami en essai depuis le 5 novembre)
- [en cours] **Faire valider AdSense** : nouvel examen « En préparation » depuis le 20 novembre (vérifié le 21 novembre)
- **Mesurer** : lire dans Cloudflare Web Analytics et Umami quelles pages attirent et rapportent
- **Fidéliser** : newsletter « la recette de la semaine », outil à choisir
- **Élargir** : vidéos de recettes sur TikTok et YouTube, comptes à rattacher à Keur Cook dans le Studio

## Points forts

- 🌍 **Seize pays, une seule table** : 58 recettes de 16 pays, avec l'histoire du plat, les étapes et les valeurs nutritionnelles.
- 🛒 **De la recette au produit** : chaque ingrédient rare est signalé dans la recette et s'achète en un clic sur Amazon.fr.
- 📰 **Des actus fraîches** : l'actualité de la cuisine africaine (plats, chefs, produits, festivals) deux fois par jour, en articles complets à lire sur le site, avec la source de chaque actu.

## Canaux

- **Référencement naturel** : sitemap (recettes, pays, produits, articles publiés, Top 10), données structurées (Recipe, Article, FAQPage, fil d'Ariane), textes alternatifs, titres et descriptions calibrés. Domaine déclaré dans Google Search Console (246 pages indexées sur les 269 envoyées, données du 16 novembre, vérifié dans la console le 21 novembre 2026 ; 248 sur 259 au 27 octobre) ; pages signalées à Bing après chaque publication et chaque lundi et aux autres moteurs par IndexNow ; depuis le 20 octobre 2026, titres, descriptions et FAQ retravaillés page par page d'après Search Console (journal `docs/referencement.md`). ✅
- **Contenu régulier** : trois articles « Conseils » par semaine (lundi, mercredi, vendredi), publiés automatiquement. ✅
- **Actus** : depuis le 27 octobre 2026, rubrique « Actus de la cuisine africaine » (`/actus`, en noindex et hors sitemap depuis le 19 novembre 2026, blocs de l'accueil et des pages pays retirés ce jour-là), mis à jour 2 fois par jour par la veille actus ; contenu frais sans reconstruire le site ; depuis le 28 octobre 2026, chaque actu a son article complet sur sa propre page (site reconstruit 2 fois par jour, à 12 h 50 et 19 h 50). ✅
- **Pinterest** : compte « Keur Cook » branché, site revendiqué, bouton « Épingler » sur chaque recette. 52 recettes épinglées du 2 au 14 octobre 2026 dans les tableaux par région par l'ancienne routine `keurcook-epingles-pinterest` (plus programmée). Publication automatique par l'API (comme Keur Déco, 5 épingles par jour au plus) : clé du compte créée le 23 octobre 2026, les six boissons épinglées le 24 octobre, les 58 recettes sont épinglées. ✅
- **Partage** : boutons « Partager sur WhatsApp » et « Épingler sur Pinterest », version imprimable sur chaque recette. ✅
- **TikTok et YouTube** : TikTok « Afrotok » est branché au Studio mais rattaché à aucune app, YouTube « toa.afrotok » à Erea seule ; aucune publication Keur Cook prévue. ⬜
- **E-mail** : pas de newsletter (outil à choisir). ⬜
- **Publicité payante** : aucune. ⬜

## Mesures

- **Pages indexées par Google** : 246 sur les 269 envoyées, 23 pas encore (Search Console, données du 16 novembre, vérifié le 21 novembre 2026 ; 245 sur 267 au 13 novembre ; 248 sur 259 au relevé du Studio du 27 octobre)
- **Adresses du sitemap** : 266 (23 novembre 2026, dont 54 articles « Conseils » et plus aucun article d'actus, retirés du sitemap le 19 novembre ; 264 les 21 et 22 novembre, dont 52 articles « Conseils » ; 263 le 20 novembre au matin ; 275 le 19 novembre, dont 50 articles « Conseils » et 13 articles d'actus ; 275 aussi le 18 novembre, avec 12 articles d'actus ; 274 le 16 novembre, avec les pages À propos et Contact ajoutées ce jour-là ; 270 le 15 novembre ; 269 les 13 et 14 novembre ; 268 les 11 et 12 novembre ; 267 les 9 et 10 novembre ; 266 les 6, 7 et 8 novembre ; 264 le 5 novembre ; 263 le 4 novembre ; 260 le 3 et le 2 novembre ; 258 le 1er et le 31 octobre ; 257 le 30 octobre ; 254 le 29 octobre ; 264 le 28 octobre au matin, avant le retrait des contenus du Maghreb du sitemap le même jour) ; jusqu'au 19 novembre 2026, le nombre grandissait 2 fois par jour avec les nouveaux articles d'actus ; depuis, il grandit seulement avec les articles « Conseils » publiés
- **Clics, achats et commissions Amazon** : à vérifier dans la console (partenaires.amazon.fr)
- **Affichages et revenus des annonces** : aucun, examen AdSense refusé le 31 octobre 2026, nouvel examen « En préparation » depuis le 20 novembre 2026 (adsense.google.com, vérifié le 21 novembre 2026)
- **Épingles Pinterest** : 58 recettes sur 58 épinglées (24 octobre 2026) ; impressions et clics à vérifier dans la console
- **Visites et pages les plus vues** : à vérifier dans la console Cloudflare Web Analytics (mesure active depuis le 13 octobre 2026)
- **Clics Amazon** (et clics du menu des sites Keur jusqu'à son retrait le 19 novembre 2026) : à vérifier dans la console Umami (essai depuis le 5 novembre 2026, filtrer sur keurcook.com)

## Les 3 priorités

- Suivre le nouvel examen AdSense : après le refus du 31 octobre 2026 (« contenu à faible valeur informative »), la console affiche « En préparation » depuis le 20 novembre 2026 (vérifié le 21 novembre 2026) ; continuer à étoffer les pages les plus minces en attendant la décision. Le 9 novembre 2026, les 10 articles « Conseils » les plus courts ont été enrichis (de 165-255 mots à 350-430 mots) et, le 16 novembre 2026, les pages À propos et Contact ont été mises en ligne.
- Écrire de nouveaux articles « Conseils » : il en reste 20 en réserve au 23 novembre 2026, qui se vide le 28 décembre 2026 (les trois articles de Noël ajoutés le 13 novembre et ceux sur les plats sénégalais et camerounais ajoutés le 19 novembre y sont déjà).
- Créer dans Amazon Partenaires un code de suivi par emplacement (recette, conseil, top, fiche, rubrique) : la table `CODES_SUIVI` est prête, tous encore à `keurcookfr-21`.
