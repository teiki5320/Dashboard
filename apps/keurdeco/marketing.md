# MARKETING — plan marketing & rémunération

Mis à jour le 10 novembre 2026. Compagnon de INFRA.md.

## Positionnement

- **Angle** : la décoration africaine expliquée et mise en scène — idées d'aménagement (« ambiances »), tops et guides sur les matières et savoir-faire (wax, bogolan, kente, indigo, raphia…). « Keur » veut dire « maison » en wolof.
- **Publics** : la diaspora africaine en France, et tous les amateurs de déco.
- **Différenciation** : contenu éditorial soigné (animations, nuancier des matières), produits vérifiés à la main sans photos Amazon, éthique affichée (mention IA sur les images, mention Partenaires, aucun prix).

## Rémunération par phases

- [fait] **Aujourd'hui** : liens Amazon Partenaires (tag `keurdecofr-21` depuis le 18 octobre 2026), 231 produits actifs sur 247 au 10 novembre 2026 (sapin artificiel 180 cm trouvé indisponible à la vérification du 10 novembre ; au soir du 9 novembre, 232 actifs après les fiches Amazon relues une à une ce soir-là : 5 produits passés indisponibles, 4 revenus en stock, 6 remplaçants ajoutés ; puis contre-relecture des 139 produits actifs des Top et Top 10, tous achetables : 2 noms corrigés — tapis kilim en chenille de polyester, lot de 4 housses bogolan —, les 10 onglets Top 10 reclassés selon les notes du 9 novembre, le set éléphant noté 3,4/5 et le lot de 8 paniers muraux noté 3,9/5 sortis de leur onglet au profit de sets ovales en jonc de mer et d’une tête de girafe sculptée ; tous les Top et les 10 onglets Top 10 sont complets).
- [à faire] **Validation AdSense** : examen demandé le 16 octobre 2026, refusé par Google le 9 novembre 2026 pour « Contenu à faible valeur informative » (les agents avaient encore noté « En préparation » le matin du 9 novembre). Avant de redemander l'examen : rallonger les fiches produits et les pages courtes (médiane d'environ 490 mots par page en ligne le 9 novembre 2026).
- **Trafic Pinterest automatique** : publication quotidienne par l'API (5 épingles par passage) depuis le 20 octobre 2026, 155 au 10 novembre 2026 (aucune au passage du 9 novembre au matin, 2 le 9 novembre vers 12 h 50 UTC et 2 au passage du 10 novembre ; 255 au manifeste depuis l'article du 9 novembre, dont 4 pas encore publiées).
- **Trafic de recherche** : pages indexées par Google et Bing, qui font vivre les deux revenus.

## Points forts

- 🧵 **Matières expliquées** : nuancier animé et glossaire de 15 matières (wax, bogolan, kente, indigo, raphia…).
- 🛋️ **Ambiances cliquables** : des points sur chaque image d'ambiance mènent à des produits vérifiés à la main, sans prix ni photo Amazon.
- 📰 **Actus de la déco africaine** : 2 fois par jour, des actus réécrites avec leur source, chacune avec son article complet sur le site.

## Canaux

- ✅ **Pinterest « Keur Déco »** (principal) : compte branché au Planning du Studio ; 96 épingles importées par CSV (2 par jour, du 2 octobre au 18 novembre 2026, `data/pinterest-etat.json`). Publication par l'API : accès standard accordé, 20 tableaux reliés, 5 épingles par passage ; maximum corrigé et secret renouvelé le 20 octobre, 5 premières épingles publiées par l'API le même jour, 155 au 10 novembre 2026.
- ✅ **Google** : Search Console vérifiée (propriété de domaine) ; 144 pages indexées sur 151 au relevé du Studio du 10 novembre 2026 (135 sur 147 le 9 novembre, 133 sur 145 le 8 novembre, 124 sur 143 le 6 novembre, 121 sur 137 le 3 novembre, 118 sur 133 du 31 octobre au 2 novembre, 107 sur 128 le 29 octobre, 104 sur 120 le 27 octobre, 71 au 7 octobre ; demandes d'indexation faites les 7 et 8 octobre). Le 21 octobre, la routine « Référencement du jour » a retravaillé 5 pages (titres, descriptions, liens internes), à relire à partir du 18 novembre ; le 22 octobre, 3 pages presque en première page retravaillées, à relire à partir du 19 novembre ; le 28 octobre, 3 autres pages (décoration bogolan, déco afro bohème, chambre style africain), à relire à partir du 25 novembre ; le 4 novembre, le Top terre cuite (en ligne depuis le 4 novembre au soir) (`docs/referencement.md`).
- ✅ **Bing** : pages signalées par IndexNow après chaque publication : reconstructions programmées (lundi, mercredi, vendredi, veille) et, depuis le 28 octobre 2026, chaque envoi sur `main`.
- ⬜ **TikTok et YouTube** : TikTok « Afrotok » est branché au Studio mais rattaché à aucune app, YouTube « toa.afrotok » à Erea seule (Studio, 13 octobre 2026) ; aucune publication pour Keur Déco.

## Rubrique Actus

- **Où** : bloc « Actus de la déco africaine » sur l'accueil (4), page `actus.html` (20, dans le menu et le pied de page, au sitemap), bloc « L'actu du [matière] » sur chaque page matière (3, absent s'il n'y en a pas) ; une page par article complet (`/actus/<slug>/`, au sitemap, depuis le 28 octobre 2026).
- **Quoi** : designers, artisans, textiles, vannerie, poterie, bois sculpté, perles, salons et expositions ; 15 flux RSS ; titres, résumés et articles complets réécrits par Claude (jamais le titre original ni de texte copié), encadré « Sources » avec le lien vers chaque source, crédit de chaque image, liens vers les fiches matières citées, 3 autres actus en bas de page.
- **Règles** : aucun lien Partenaires ni prix dans les actus, aucune épingle Pinterest tirée des actus, pas d'annonce AdSense sur la page Actus ni sur la page de secours ; une annonce au plus par page d'article (même modèle que les conseils).

## Mesures

- **Audience** : Cloudflare Web Analytics et, depuis le 5 novembre 2026, Umami (sans cookie, visites, clics Amazon et clics du menu des sites Keur) — à vérifier dans la console.
- **Pages indexées** : 144 sur 151 au 10 novembre 2026 (relevé du Studio) : 1 détectée non explorée (un article d'actus), 2 inconnues de Google (un article d'actus et le conseil sur le tabouret ashanti, en ligne depuis le 9 novembre), et 4 pages (matière perles, occasions fêtes de fin d'année, mariage et Tabaski) encore vues par Google avec le `noindex` de son dernier passage du 29 septembre 2026, alors qu'elles sont ouvertes (sans `noindex`, au sitemap) depuis qu'elles ont leurs ambiances ; le sitemap en ligne compte 151 adresses le 10 novembre 2026, dont 46 conseils et 22 articles d'actus.
- **Épingles** : 96 importées par CSV (programmées jusqu'au 18 novembre 2026) et 155 publiées par l'API du 20 octobre au 10 novembre 2026 (255 au manifeste depuis l'article du 9 novembre, dont 4 pas encore publiées) (`data/pinterest-etat.json`).
- **Statistiques Pinterest** : à vérifier dans la console Pinterest.
- **Commissions Amazon** : à vérifier dans la console Amazon Partenaires.
- **Revenus AdSense** : aucun, site refusé par Google le 9 novembre 2026 (contenu à faible valeur informative).

## Calendrier

- Articles et conseils **publiés à leur date** (en-tête `publie_le`), le site étant reconstruit à chaque push et chaque lundi, mercredi et vendredi à 5 h UTC. Au 10 novembre 2026 : 40 articles, dont 27 en ligne (la table de réveillon wax et or, parue le 9 novembre, comprise) et 13 programmés, un par lundi jusqu'au 25 janvier 2027 (plus le guide Black Friday, programmé exceptionnellement le mercredi 18 novembre 2026), puis le balcon le 26 avril 2027. Page « Top 10 » à onglets (10 sujets) en ligne depuis le 19 octobre.
- Conseils : 69, dont 46 en ligne au 10 novembre 2026 et 23 programmés (lundi, mercredi, vendredi) jusqu'au 1er janvier 2027 (46 pages `conseil-…` au sitemap en ligne le 10 novembre, dont celui du 9 novembre sur le tabouret ashanti ; 7 conseils ajoutés le 2 novembre par la routine « Articles », du 18 décembre 2026 au 1er janvier 2027, avec une carte générée aux couleurs du site ; 12 ajoutés le 26 octobre par la routine « Articles », restés sans image jusqu'au 27 octobre : Jean a choisi de les compléter, 6 avec une photo libre de Wikimedia Commons créditée et 6 avec une carte générée aux couleurs du site ; les 50 images IA déjà en place sont gardées). Depuis le 23 octobre 2026, le site est reconstruit le lundi, le mercredi et le vendredi (`pages.yml`, cron `0 5 * * 1,3,5`) et à chaque push : chaque conseil paraît le jour de sa date.
- Épingles : import CSV par lots de 30 jours, 2 par jour (lot en cours jusqu'au 18 novembre) ; en plus, l'API publie 5 épingles par passage du workflow quotidien.

## Les 3 priorités

- Faire indexer les 3 pages encore absentes (2 articles d'actus et le conseil sur le tabouret ashanti) et demander à Google de repasser sur les 4 pages ouvertes depuis (matière perles, occasions fêtes de fin d'année, mariage, Tabaski), qu'il voit encore en `noindex` depuis le 29 septembre (relevé du 10 novembre 2026) ; les 10 pages Top 10 sont déjà indexées.
- 16 produits Amazon sont indisponibles au 10 novembre 2026 (masqués automatiquement). Ils ont été remplacés dans tous les Top et Top 10 le 9 novembre 2026 ; restent à remplacer le sapin artificiel 180 cm de l'article Noël touche africaine (indisponible depuis le 10 novembre) et les points masqués de 8 ambiances (jarre toscane, plaid chenille, lampadaire rotin, sphère étoiles, guirlande de perles, kit de teinture indigo, panier suspendu en jacinthe d’eau). La suspension parasol et les plateaux tressés lot de 2 sont revenus en stock le 9 novembre 2026.
- Refaire la clé Pinterest avant son échéance : le secret `PINTEREST_REFRESH_TOKEN` date du 20 octobre 2026 (valable environ 60 jours, soit vers le 19 décembre) ; sans elle, la publication automatique des épingles s'arrête (ticket de rappel n° 15 ouvert).
