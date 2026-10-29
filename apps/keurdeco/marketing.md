# MARKETING — plan marketing & rémunération

Mis à jour le 29 octobre 2026. Compagnon de INFRA.md.

## Positionnement

- **Angle** : la décoration africaine expliquée et mise en scène — idées d'aménagement (« ambiances »), tops et guides sur les matières et savoir-faire (wax, bogolan, kente, indigo, raphia…). « Keur » veut dire « maison » en wolof.
- **Publics** : la diaspora africaine en France, et tous les amateurs de déco.
- **Différenciation** : contenu éditorial soigné (animations, nuancier des matières), produits vérifiés à la main sans photos Amazon, éthique affichée (mention IA sur les images, mention Partenaires, aucun prix).

## Rémunération par phases

- [fait] **Aujourd'hui** : liens Amazon Partenaires (tag `keurdecofr-21` depuis le 18 octobre 2026, l'ancien compte ayant été fermé par Amazon ; 226 produits actifs sur 238 relevés au 29 octobre 2026 ; le 29 octobre, le tapis berbère rouge 140 × 200 est de nouveau en vente et les coupons de tissus africains ont été remplacés par un lot de 12 coupons Ankara). Depuis le 28 octobre 2026 : 14 conseils « choisir / accrocher » montrent 1 à 3 produits (`{{produit: id}}`), chaque conseil et chaque fiche du glossaire finit par un lien « Notre sélection » vers le Top 10 ou l'ambiance assortis, les pages de pièces et de matières (sauf Perles, trop peu de produits) ont un bandeau de 4 produits, les cartes des ambiances disent « Pourquoi » et « Idéal pour » (textes repris de nos classements), le bloc « Nos Top 10 » passe avant les actus sur l'accueil, l'accueil montre dès le haut de page « Nos coups de cœur » (8 produits en vignettes maison, chacun menant à sa place dans un Top 10, sans lien Amazon), et une actu qui cite une matière renvoie vers son Top 10 ou sa fiche (jamais de lien Amazon dans une actu).
- [en cours] **Validation AdSense** : code et `ads.txt` en place, examen demandé le 16 octobre 2026, « En préparation » dans la console AdSense, ni validé ni refusé (vérifié le 29 octobre 2026) ; aucune annonce ne s'affiche tant que Google n'a pas validé le site.
- [en cours] **Trafic Pinterest automatique** : accès standard accordé, publication quotidienne par l'API (5 épingles par passage) depuis le 20 octobre 2026.
- **Trafic de recherche** : pages indexées par Google et Bing, qui font vivre les deux revenus.

## Points forts

- 🧵 **Matières expliquées** : nuancier animé et glossaire de 15 matières (wax, bogolan, kente, indigo, raphia…).
- 🛋️ **Ambiances cliquables** : chaque image d'ambiance a des points qui mènent aux produits, classés sans mélange par pièce, matière ou occasion.
- 📰 **Actus de la déco africaine** : depuis le 27 octobre 2026, 4 actus sur l'accueil, 20 sur la page Actus et 3 par page matière, mises à jour 2 fois par jour par la veille (titres et résumés réécrits, source et crédit photo toujours affichés, aucun lien Amazon). Depuis le 28 octobre 2026, toucher une actu ouvre son article complet sur le site (300 à 450 mots, page `/actus/<slug>/` trouvable par Google).
- ✅ **Produits vérifiés à la main** : aucun prix, aucune photo Amazon, mention IA sur les images et mention Partenaires affichée.

## Canaux

- ✅ **Pinterest « Keur Déco »** (principal) : compte branché au Planning du Studio ; 96 épingles importées par CSV (2 par jour, du 2 octobre au 18 novembre 2026, `data/pinterest-etat.json`). Publication par l'API : accès standard accordé, 20 tableaux reliés, 5 épingles par passage ; maximum corrigé et secret renouvelé le 20 octobre, 5 premières épingles publiées par l'API le même jour, 70 au 29 octobre.
- ✅ **Google** : Search Console vérifiée (propriété de domaine) ; 107 pages indexées sur 128 au relevé du Studio du 29 octobre 2026 (104 sur 120 le 27 octobre, 71 au 7 octobre ; demandes d'indexation faites les 7 et 8 octobre). Le 21 octobre, la routine « Référencement du jour » a retravaillé 5 pages (titres, descriptions, liens internes), à relire à partir du 18 novembre ; le 22 octobre, 3 pages presque en première page retravaillées, à relire à partir du 19 novembre ; le 28 octobre, 3 autres pages (décoration bogolan, déco afro bohème, chambre style africain), à relire à partir du 25 novembre (`docs/referencement.md`).
- ✅ **Bing** : pages signalées par IndexNow après chaque publication : reconstructions programmées (lundi, mercredi, vendredi, veille) et, depuis le 28 octobre 2026, chaque envoi sur `main`.
- ⬜ **TikTok et YouTube** : TikTok « Afrotok » est branché au Studio mais rattaché à aucune app, YouTube « toa.afrotok » à Erea seule (Studio, 13 octobre 2026) ; aucune publication pour Keur Déco.

## Rubrique Actus

- **Où** : bloc « Actus de la déco africaine » sur l'accueil (4), page `actus.html` (20, dans le menu et le pied de page, au sitemap), bloc « L'actu du [matière] » sur chaque page matière (3, absent s'il n'y en a pas) ; une page par article complet (`/actus/<slug>/`, au sitemap, depuis le 28 octobre 2026).
- **Quoi** : designers, artisans, textiles, vannerie, poterie, bois sculpté, perles, salons et expositions ; 15 flux RSS ; titres, résumés et articles complets réécrits par Claude (jamais le titre original ni de texte copié), encadré « Sources » avec le lien vers chaque source, crédit de chaque image, liens vers les fiches matières citées, 3 autres actus en bas de page.
- **Règles** : aucun lien Partenaires ni prix dans les actus, aucune épingle Pinterest tirée des actus, pas d'annonce AdSense sur la page Actus ni sur la page de secours ; une annonce au plus par page d'article (même modèle que les conseils).

## Mesures

- **Audience** : Cloudflare Web Analytics (sans cookie) — à vérifier dans la console.
- **Pages indexées** : 107 sur 128 au 29 octobre 2026 (relevé du Studio) : 5 détectées non explorées, 12 inconnues de Google (dont 6 articles d'actus), 4 exclues volontairement par `noindex`.
- **Épingles** : 96 importées par CSV (programmées jusqu'au 18 novembre 2026) et 70 publiées par l'API du 20 au 29 octobre 2026 (`data/pinterest-etat.json`).
- **Statistiques Pinterest** : à vérifier dans la console Pinterest.
- **Commissions Amazon** : à vérifier dans la console Amazon Partenaires.
- **Revenus AdSense** : aucun, site encore en examen chez Google.

## Calendrier

- Articles et conseils **publiés à leur date** (en-tête `publie_le`), le site étant reconstruit à chaque push et chaque lundi, mercredi et vendredi à 5 h UTC. Au 28 octobre 2026 : 39 articles, dont 25 en ligne et 14 programmés, un par lundi jusqu'au 25 janvier 2027, puis le balcon le 26 avril 2027. Page « Top 10 » à onglets (10 sujets) en ligne depuis le 19 octobre.
- Conseils : 62, dont 41 en ligne au 28 octobre 2026 et 21 programmés (lundi, mercredi, vendredi) jusqu'au 16 décembre 2026 (12 ajoutés le 26 octobre par la routine « Articles », restés sans image jusqu'au 27 octobre : Jean a choisi de les compléter, 6 avec une photo libre de Wikimedia Commons créditée et 6 avec une carte générée aux couleurs du site ; les 50 images IA déjà en place sont gardées). Depuis le 23 octobre 2026, le site est reconstruit le lundi, le mercredi et le vendredi (`pages.yml`, cron `0 5 * * 1,3,5`) et à chaque push : chaque conseil paraît le jour de sa date.
- Épingles : import CSV par lots de 30 jours, 2 par jour (lot en cours jusqu'au 18 novembre) ; en plus, l'API publie 5 épingles par passage du workflow quotidien.

## Les 3 priorités

- Garder la publication Pinterest par l'API en marche : refaire la clé avant son échéance (environ 60 jours après le 20 octobre 2026) avec `npm run pinterest:auth` puis `npm run pinterest:secrets` (plus besoin de recopier le jeton à la main depuis le 28 octobre 2026), puis fermer le ticket de rappel n° 15 ; les 13 anciens tickets « mettre à jour le secret » ont été fermés le 28 octobre 2026.
- Faire indexer les 17 pages encore absentes (5 détectées non explorées, 12 inconnues de Google dont 6 articles d'actus, relevé du 29 octobre 2026) ; les 10 pages Top 10 sont déjà indexées.
- Remplacer les 9 produits Amazon indisponibles et sans remplaçant (jarre toscane, coussin femme africaine en jute, plaid chenille, lampadaire rotin, sphère étoiles, suspension parasol, plateaux tressés lot de 2, tissu bogolan indigo à flèches, chemin de table paisley 40 × 225 cm).
