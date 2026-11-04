# MARKETING — plan marketing & rémunération

Mis à jour le 4 novembre 2026. Compagnon de INFRA.md.

## Positionnement

- **Angle** : la décoration africaine expliquée et mise en scène — idées d'aménagement (« ambiances »), tops et guides sur les matières et savoir-faire (wax, bogolan, kente, indigo, raphia…). « Keur » veut dire « maison » en wolof.
- **Publics** : la diaspora africaine en France, et tous les amateurs de déco.
- **Différenciation** : contenu éditorial soigné (animations, nuancier des matières), produits vérifiés à la main sans photos Amazon, éthique affichée (mention IA sur les images, mention Partenaires, aucun prix).

## Rémunération par phases

- [fait] **Aujourd'hui** : liens Amazon Partenaires (tag `keurdecofr-21` depuis le 18 octobre 2026), 226 produits actifs sur 238 dans le dépôt au 4 novembre 2026 (225 en ligne tant que le déploiement échoue).
- [en cours] **Validation AdSense** : examen demandé le 16 octobre 2026, « En préparation » au contrôle de la console du 4 novembre 2026.
- **Trafic Pinterest automatique** : publication quotidienne par l'API (5 épingles par passage) depuis le 20 octobre 2026, 130 au 4 novembre.
- **Trafic de recherche** : pages indexées par Google et Bing, qui font vivre les deux revenus.

## Points forts

- 🧵 **Matières expliquées** : nuancier animé et glossaire de 15 matières (wax, bogolan, kente, indigo, raphia…).
- 🛋️ **Ambiances cliquables** : des points sur chaque image d'ambiance mènent à des produits vérifiés à la main, sans prix ni photo Amazon.
- 📰 **Actus de la déco africaine** : 2 fois par jour, des actus réécrites avec leur source, chacune avec son article complet sur le site.

## Canaux

- ✅ **Pinterest « Keur Déco »** (principal) : compte branché au Planning du Studio ; 96 épingles importées par CSV (2 par jour, du 2 octobre au 18 novembre 2026, `data/pinterest-etat.json`). Publication par l'API : accès standard accordé, 20 tableaux reliés, 5 épingles par passage ; maximum corrigé et secret renouvelé le 20 octobre, 5 premières épingles publiées par l'API le même jour, 130 au 4 novembre 2026.
- ✅ **Google** : Search Console vérifiée (propriété de domaine) ; 121 pages indexées sur 137 au relevé du Studio du 3 novembre 2026 (118 sur 133 du 31 octobre au 2 novembre, 107 sur 128 le 29 octobre, 104 sur 120 le 27 octobre, 71 au 7 octobre ; demandes d'indexation faites les 7 et 8 octobre). Le 21 octobre, la routine « Référencement du jour » a retravaillé 5 pages (titres, descriptions, liens internes), à relire à partir du 18 novembre ; le 22 octobre, 3 pages presque en première page retravaillées, à relire à partir du 19 novembre ; le 28 octobre, 3 autres pages (décoration bogolan, déco afro bohème, chambre style africain), à relire à partir du 25 novembre ; le 4 novembre, le Top terre cuite (pas encore en ligne, le déploiement échouant) (`docs/referencement.md`).
- ✅ **Bing** : pages signalées par IndexNow après chaque publication : reconstructions programmées (lundi, mercredi, vendredi, veille) et, depuis le 28 octobre 2026, chaque envoi sur `main`.
- ⬜ **TikTok et YouTube** : TikTok « Afrotok » est branché au Studio mais rattaché à aucune app, YouTube « toa.afrotok » à Erea seule (Studio, 13 octobre 2026) ; aucune publication pour Keur Déco.

## Rubrique Actus

- **Où** : bloc « Actus de la déco africaine » sur l'accueil (4), page `actus.html` (20, dans le menu et le pied de page, au sitemap), bloc « L'actu du [matière] » sur chaque page matière (3, absent s'il n'y en a pas) ; une page par article complet (`/actus/<slug>/`, au sitemap, depuis le 28 octobre 2026).
- **Quoi** : designers, artisans, textiles, vannerie, poterie, bois sculpté, perles, salons et expositions ; 15 flux RSS ; titres, résumés et articles complets réécrits par Claude (jamais le titre original ni de texte copié), encadré « Sources » avec le lien vers chaque source, crédit de chaque image, liens vers les fiches matières citées, 3 autres actus en bas de page.
- **Règles** : aucun lien Partenaires ni prix dans les actus, aucune épingle Pinterest tirée des actus, pas d'annonce AdSense sur la page Actus ni sur la page de secours ; une annonce au plus par page d'article (même modèle que les conseils).

## Mesures

- **Audience** : Cloudflare Web Analytics (sans cookie) — à vérifier dans la console.
- **Pages indexées** : 121 sur 137 au 3 novembre 2026 (relevé du Studio) : 5 détectées non explorées (3 articles d'actus et 2 conseils), 7 inconnues de Google (6 articles d'actus et 1 conseil), 4 exclues volontairement par `noindex` ; le sitemap en ligne compte 141 adresses le 4 novembre 2026.
- **Épingles** : 96 importées par CSV (programmées jusqu'au 18 novembre 2026) et 130 publiées par l'API du 20 octobre au 4 novembre 2026 (`data/pinterest-etat.json`).
- **Statistiques Pinterest** : à vérifier dans la console Pinterest.
- **Commissions Amazon** : à vérifier dans la console Amazon Partenaires.
- **Revenus AdSense** : aucun, site encore en examen chez Google.

## Calendrier

- Articles et conseils **publiés à leur date** (en-tête `publie_le`), le site étant reconstruit à chaque push et chaque lundi, mercredi et vendredi à 5 h UTC. Au 4 novembre 2026 : 39 articles, dont 26 en ligne et 13 programmés, un par lundi jusqu'au 25 janvier 2027, puis le balcon le 26 avril 2027. Page « Top 10 » à onglets (10 sujets) en ligne depuis le 19 octobre.
- Conseils : 69, dont 44 en ligne au 4 novembre 2026 et 25 programmés (lundi, mercredi, vendredi) jusqu'au 1er janvier 2027 (44 pages `conseil-…` au sitemap en ligne le 4 novembre ; 7 conseils ajoutés le 2 novembre par la routine « Articles », du 18 décembre 2026 au 1er janvier 2027, avec une carte générée aux couleurs du site ; 12 ajoutés le 26 octobre par la routine « Articles », restés sans image jusqu'au 27 octobre : Jean a choisi de les compléter, 6 avec une photo libre de Wikimedia Commons créditée et 6 avec une carte générée aux couleurs du site ; les 50 images IA déjà en place sont gardées). Depuis le 23 octobre 2026, le site est reconstruit le lundi, le mercredi et le vendredi (`pages.yml`, cron `0 5 * * 1,3,5`) et à chaque push : chaque conseil paraît le jour de sa date.
- Épingles : import CSV par lots de 30 jours, 2 par jour (lot en cours jusqu'au 18 novembre) ; en plus, l'API publie 5 épingles par passage du workflow quotidien.

## Les 3 priorités

- Réparer la publication du site : depuis le 4 novembre 2026, `pages.yml` échoue au test des liens internes (liens vers le Top terre cuite ajoutés dans deux pages parues avant lui) et plus rien ne se met en ligne, ni les articles programmés ni les actus.
- Faire indexer les 12 pages encore absentes (5 détectées non explorées, 7 inconnues de Google ; 9 sont des articles d'actus et 3 des conseils, relevé du 3 novembre 2026) ; les 10 pages Top 10 sont déjà indexées.
- Remplacer les 9 produits Amazon indisponibles et sans remplaçant (jarre toscane, coussin femme africaine en jute, plaid chenille, lampadaire rotin, sphère étoiles, suspension parasol, plateaux tressés lot de 2, tissu bogolan indigo à flèches, chemin de table paisley 40 × 225 cm) ; le tapis rond jute lurex a été remplacé le 4 novembre 2026.
