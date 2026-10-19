# MARKETING — plan marketing & rémunération

Mis à jour le 19 octobre 2026. Compagnon de INFRA.md.

## Positionnement

- **Angle** : la décoration africaine expliquée et mise en scène — idées d'aménagement (« ambiances »), tops et guides sur les matières et savoir-faire (wax, bogolan, kente, indigo, raphia…). « Keur » veut dire « maison » en wolof.
- **Publics** : la diaspora africaine en France, et tous les amateurs de déco.
- **Différenciation** : contenu éditorial soigné (animations, nuancier des matières), produits vérifiés à la main sans photos Amazon, éthique affichée (mention IA sur les images, mention Partenaires, aucun prix).

## Rémunération par phases

- [fait] **Aujourd'hui** : liens Amazon Partenaires (tag `keurdecofr-21` depuis le 18 octobre 2026, l'ancien compte ayant été fermé par Amazon ; 158 produits actifs sur 163 relevés) et annonces AdSense sur les pages de lecture depuis le 12 octobre 2026.
- [en cours] **Validation AdSense** : Google examine le site avant de diffuser ; état à vérifier dans la console AdSense.
- **Trafic Pinterest automatique** : publication quotidienne par l'API, dès l'accès standard accordé.
- **Trafic de recherche** : pages indexées par Google et Bing, qui font vivre les deux revenus.

## Points forts

- 🧵 **Matières expliquées** : nuancier animé et glossaire de 15 matières (wax, bogolan, kente, indigo, raphia…).
- 🛋️ **Ambiances cliquables** : chaque image d'ambiance a des points qui mènent aux produits, classés sans mélange par pièce, matière ou occasion.
- ✅ **Produits vérifiés à la main** : aucun prix, aucune photo Amazon, mention IA sur les images et mention Partenaires affichée.

## Canaux

- ✅ **Pinterest « Keur Déco »** (principal) : compte branché au Planning du Studio ; 62 épingles importées par CSV, dont 36 parues du 2 au 19 octobre 2026 et 26 programmées jusqu'au 1er novembre (`data/pinterest-etat.json`). Publication par l'API : 20 tableaux reliés et secrets posés le 19 octobre ; accès standard demandé le 16 octobre, en attente.
- ✅ **Google** : Search Console vérifiée (propriété de domaine) ; au relevé du 7 octobre 2026, 71 pages indexées et 27 non indexées, demandes d'indexation faites les 7 et 8 octobre.
- ✅ **Bing** : pages signalées par IndexNow après chaque reconstruction du lundi.
- ⬜ **TikTok et YouTube** : TikTok « Afrotok » est branché au Studio mais rattaché à aucune app, YouTube « toa.afrotok » à Erea seule (Studio, 13 octobre 2026) ; aucune publication pour Keur Déco.

## Mesures

- **Audience** : Cloudflare Web Analytics (sans cookie) — à vérifier dans la console.
- **Pages indexées** : 71 indexées et 27 non indexées au 7 octobre 2026 (Search Console).
- **Épingles importées** : 62, dont 26 programmées jusqu'au 1er novembre 2026 (`data/pinterest-etat.json`).
- **Statistiques Pinterest** : à vérifier dans la console Pinterest.
- **Commissions Amazon** : à vérifier dans la console Amazon Partenaires.
- **Revenus AdSense** : à vérifier dans la console AdSense.

## Calendrier

- Articles et conseils **publiés à leur date** (en-tête `publie_le`), le site étant reconstruit à chaque push et chaque lundi à 5 h UTC. Au 13 octobre 2026 : 37 articles, dont 21 en ligne et 16 programmés, un par lundi du 19 octobre 2026 au 25 janvier 2027, puis le balcon le 26 avril 2027.
- Conseils : 50, dont 34 à date et 16 programmés (lundi, mercredi, vendredi) jusqu'au 18 novembre 2026 ; un rappel est prévu le 2 novembre pour préparer le lot suivant.
- Épingles : par lots de 30 jours, 2 par jour au plus ; le lot en cours s'arrête le 1er novembre.

## Les 3 priorités

- Importer avant le 1er novembre le lot Pinterest suivant (`npm run pinterest:lot`, import sur Pinterest, puis `--confirmer`), sinon plus aucune épingle ne paraît.
- Obtenir l'accès standard à l'API Pinterest (demande envoyée le 16 octobre 2026) : tableaux et secrets sont prêts, la publication automatique n'attend plus que la réponse de Pinterest.
- Faire indexer par Google les pages encore « détectées, non indexées » (relecture du rapport Search Console prévue le 21 octobre).
