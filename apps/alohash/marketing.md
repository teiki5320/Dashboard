# MARKETING — plan marketing & rémunération

Mis à jour le 31 octobre 2026. Compagnon de INFRA.md.

## Positionnement

- **Site** : **Keur Cook** (anciennement Alohash), https://keurcook.com ; éditeur ALOHASH (SAS), nom commercial TOA CORP ; pied de page « Un site TOA KEUR » (lien vers https://toakeur.com) ; contact keurcook@toakeur.com.
- **Promesse** : « Recettes africaines & produits rares » (`src/lib/config.ts`). Les grands plats d'Afrique expliqués pas à pas, et les ingrédients introuvables en grande surface pour les réussir chez soi.
- **Contenu** :
  - 58 recettes de 16 pays (Afrique de l'Ouest, centrale, de l'Est, australe et Madagascar), dont six thés, cafés et infusions (ataya, kinkeliba, chai kényan, rooibos glacé, buna, kahawa chungu) depuis le 19 octobre 2026, avec histoire du plat, ingrédients, étapes, astuces et valeurs nutritionnelles estimées ; une section « La cuisine de … » sur chaque page pays ;
  - rubrique « Conseils » : 67 articles, dont 42 publiés et 25 programmés, trois par semaine (lundi, mercredi, vendredi) jusqu'au 28 décembre 2026 (`content/conseils/`, `docs/CONSEILS.md`, `docs/CONSEILS-CALENDRIER.md`) ;
  - boutique de 126 produits en 9 gammes : Épices & aromates, Farines & céréales, Feuilles & fleurs séchées, Poissons & fumés, Huiles & pâtes, Snacks & fruits secs, Cafés & thés, Ustensiles (dont mortiers, marmites, mixeurs et objets de service), Livres de cuisine. Produits retenus : plus de 3,5 étoiles sur Amazon ;
  - « Actus de la cuisine africaine » (depuis le 27 octobre 2026) : page `/actus` (20 actus), bloc de 4 actus sur l'accueil et 3 actus du pays sur chaque page pays, mis à jour 2 fois par jour (12 h et 19 h) par la veille actus ; chaque actu est résumée par nous, avec le lien vers sa source et le crédit de l'image ; depuis le 28 octobre 2026, toucher une actu ouvre son article complet (300 à 450 mots) sur sa propre page du site (`/actus/<adresse>`, trouvable par Google) ; jamais d'actu santé ni de vocabulaire de vente ;
  - « Top 10 » (depuis le 19 octobre 2026) : 10 classements de produits (ustensiles, ingrédients pour débuter, mortiers, marmites, mixeurs, épices, farines, livres, thés et cafés, service et thé), selon la note moyenne des acheteurs sur Amazon.fr, chacun relié aux recettes concernées.
- **Lien recettes → boutique** : chaque ingrédient disponible en boutique est signalé « Produit rare » dans la recette, avec un bouton d'achat Amazon ; chaque fiche produit liste les recettes qui l'utilisent.
- **Ton et image** : thème sombre « Braise », carte de l'Afrique en particules sur l'accueil (« Seize pays, une seule table. »), grandes photos, carrousels par type de plat.
- **Photos** : photos OpenArt.

## Modèle de rémunération

Deux sources, sans rien vendre soi-même :

- **Affiliation Amazon Partenaires** : les boutons « Voir sur Amazon » mènent à Amazon.fr (tag `keurcookfr-21`, `src/lib/amazon.ts`) ; Amazon encaisse, livre et verse une commission sur les achats. Depuis le 28 octobre 2026 : boutons d'au moins 44 px avec texte partout, produits remontés (juste après les ingrédients sur téléphone, en haut des pages pays, après la première partie des conseils), tout le catalogue visible d'emblée en boutique, bloc « Nos coups de cœur » (8 produits en images, reliés à leurs fiches du site, juste après « Cuisiner par pays ») et rangée « Nos Top 10 » sur l'accueil (sans bouton Amazon) et liens internes vers les Top 10 depuis les fiches, recettes, conseils et actus ; codes de suivi par type de page prêts (tous encore `keurcookfr-21`).
- **Publicité Google AdSense** (en examen depuis le 12 octobre 2026 ; « En préparation » dans la console AdSense, ni validé ni refusé (vérifié le 31 octobre 2026)) : emplacements titrés « Publicité » prêts sur les recettes, les articles « Conseils », les articles d'actus (depuis le 28 octobre 2026) et les pages pays ; aucune annonce ne s'affiche tant que Google n'a pas validé le site ; consentement recueilli par le message de Google.

Les recettes et les conseils sont gratuits et attirent les visiteurs. Aucun prix affiché sur le site depuis le 28 octobre 2026 : seul celui d'Amazon fait foi.

## Rémunération par phases

- [fait] **Aujourd'hui** : affiliation Amazon sur 126 produits et 10 Top 10, AdSense en place mais encore en examen (aucune annonce), audience mesurée depuis le 13 octobre
- [en cours] **Mesurer** : lire dans Cloudflare Web Analytics quelles pages attirent et rapportent
- **Fidéliser** : newsletter « la recette de la semaine », outil à choisir
- **Élargir** : vidéos de recettes sur TikTok et YouTube, comptes à rattacher à Keur Cook dans le Studio

## Points forts

- 🌍 **Seize pays, une seule table** : 58 recettes de 16 pays, avec l'histoire du plat, les étapes et les valeurs nutritionnelles.
- 🛒 **De la recette au produit** : chaque ingrédient rare est signalé dans la recette et s'achète en un clic sur Amazon.fr.
- 📰 **Des actus fraîches** : l'actualité de la cuisine africaine (plats, chefs, produits, festivals) deux fois par jour, en articles complets à lire sur le site, avec la source de chaque actu.

## Canaux

- **Référencement naturel** : sitemap (recettes, pays, produits, articles publiés, Top 10), données structurées (Recipe, Article, FAQPage, fil d'Ariane), textes alternatifs, titres et descriptions calibrés. Domaine déclaré dans Google Search Console (248 pages indexées sur 259 au relevé du Studio du 27 octobre 2026) ; pages signalées à Bing après chaque publication et chaque lundi et aux autres moteurs par IndexNow ; depuis le 20 octobre 2026, titres, descriptions et FAQ retravaillés page par page d'après Search Console (journal `docs/referencement.md`). ✅
- **Contenu régulier** : trois articles « Conseils » par semaine (lundi, mercredi, vendredi), publiés automatiquement. ✅
- **Actus** : depuis le 27 octobre 2026, rubrique « Actus de la cuisine africaine » (`/actus`), bloc sur l'accueil et sur chaque page pays, mis à jour 2 fois par jour par la veille actus ; contenu frais sans reconstruire le site ; depuis le 28 octobre 2026, chaque actu a son article complet sur sa propre page (site reconstruit 2 fois par jour, à 12 h 50 et 19 h 50). ✅
- **Pinterest** : compte « Keur Cook » branché, site revendiqué, bouton « Épingler » sur chaque recette. 52 recettes épinglées du 2 au 14 octobre 2026 dans les tableaux par région par l'ancienne routine `keurcook-epingles-pinterest` (plus programmée). Publication automatique par l'API (comme Keur Déco, 5 épingles par jour au plus) : clé du compte créée le 23 octobre 2026, les six boissons épinglées le 24 octobre, les 58 recettes sont épinglées. ✅
- **Partage** : boutons « Partager sur WhatsApp » et « Épingler sur Pinterest », version imprimable sur chaque recette. ✅
- **TikTok et YouTube** : TikTok « Afrotok » est branché au Studio mais rattaché à aucune app, YouTube « toa.afrotok » à Erea seule ; aucune publication Keur Cook prévue. ⬜
- **E-mail** : pas de newsletter (outil à choisir). ⬜
- **Publicité payante** : aucune. ⬜

## Mesures

- **Pages indexées par Google** : 248 sur 259 ; 11 pas encore, dont 7 inconnues de Google et 4 détectées non explorées (relevé du Studio, 27 octobre 2026)
- **Adresses du sitemap** : 258 (31 octobre 2026 ; 257 le 30 octobre ; 254 le 29 octobre ; 264 le 28 octobre au matin, avant le retrait des contenus du Maghreb du sitemap le même jour) ; le nombre grandit 2 fois par jour avec les nouveaux articles d'actus
- **Clics, achats et commissions Amazon** : à vérifier dans la console (partenaires.amazon.fr)
- **Affichages et revenus des annonces** : aucun, site encore en examen chez Google (adsense.google.com)
- **Épingles Pinterest** : 58 recettes sur 58 épinglées (24 octobre 2026) ; impressions et clics à vérifier dans la console
- **Visites et pages les plus vues** : à vérifier dans la console Cloudflare Web Analytics (mesure active depuis le 13 octobre 2026)

## Les 3 priorités

- Écrire de nouveaux articles « Conseils » : il en reste 25 en réserve, la réserve passe sous 20 vers le 13 novembre et se vide le 28 décembre 2026.
- Faire indexer les 11 pages manquantes (7 inconnues de Google, 4 détectées non explorées au 27 octobre 2026) ; demander leur indexation dans Search Console.
- Créer dans Amazon Partenaires un code de suivi par emplacement (recette, conseil, top, fiche, rubrique) : la table `CODES_SUIVI` est prête, tous encore à `keurcookfr-21`.
