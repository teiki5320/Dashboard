# MARKETING — plan marketing & rémunération

Mis à jour le 20 octobre 2026. Compagnon de INFRA.md.

## Positionnement

- **Angle** : la décoration africaine expliquée et mise en scène — idées d'aménagement (« ambiances »), tops et guides sur les matières et savoir-faire (wax, bogolan, kente, indigo, raphia…). « Keur » veut dire « maison » en wolof.
- **Publics** : la diaspora africaine en France, et tous les amateurs de déco.
- **Différenciation** : contenu éditorial soigné (animations, nuancier des matières), produits vérifiés à la main sans photos Amazon, éthique affichée (mention IA sur les images, mention Partenaires, aucun prix).

## Rémunération par phases

- [fait] **Aujourd'hui** : liens Amazon Partenaires (tag `keurdecofr-21` depuis le 18 octobre 2026, l'ancien compte ayant été fermé par Amazon ; 229 produits actifs sur 235 relevés) et annonces AdSense sur les pages de lecture depuis le 12 octobre 2026.
- [en cours] **Validation AdSense** : Google examine le site avant de diffuser ; état à vérifier dans la console AdSense.
- **Trafic Pinterest automatique** : publication quotidienne par l'API, une fois l'accès standard accordé, le secret renouvelé et le maximum corrigé.
- **Trafic de recherche** : pages indexées par Google et Bing, qui font vivre les deux revenus.

## Points forts

- 🧵 **Matières expliquées** : nuancier animé et glossaire de 15 matières (wax, bogolan, kente, indigo, raphia…).
- 🛋️ **Ambiances cliquables** : chaque image d'ambiance a des points qui mènent aux produits, classés sans mélange par pièce, matière ou occasion.
- ✅ **Produits vérifiés à la main** : aucun prix, aucune photo Amazon, mention IA sur les images et mention Partenaires affichée.

## Canaux

- ✅ **Pinterest « Keur Déco »** (principal) : compte branché au Planning du Studio ; 96 épingles importées par CSV, dont 38 parues du 2 au 20 octobre 2026 et 58 programmées jusqu'au 18 novembre (`data/pinterest-etat.json`). Publication par l'API : 20 tableaux reliés et secrets posés le 19 octobre ; accès standard demandé le 16 octobre, réponse à vérifier ; la première exécution réelle (19 octobre) n'a rien publié (maximum lu à 0, refresh token à renouveler).
- ✅ **Google** : Search Console vérifiée (propriété de domaine) ; au relevé du 7 octobre 2026, 71 pages indexées et 27 non indexées, demandes d'indexation faites les 7 et 8 octobre.
- ✅ **Bing** : pages signalées par IndexNow après chaque reconstruction du lundi.
- ⬜ **TikTok et YouTube** : TikTok « Afrotok » est branché au Studio mais rattaché à aucune app, YouTube « toa.afrotok » à Erea seule (Studio, 13 octobre 2026) ; aucune publication pour Keur Déco.

## Mesures

- **Audience** : Cloudflare Web Analytics (sans cookie) — à vérifier dans la console.
- **Pages indexées** : 71 indexées et 27 non indexées au 7 octobre 2026 (Search Console).
- **Épingles importées** : 96, dont 58 programmées jusqu'au 18 novembre 2026 (`data/pinterest-etat.json`).
- **Statistiques Pinterest** : à vérifier dans la console Pinterest.
- **Commissions Amazon** : à vérifier dans la console Amazon Partenaires.
- **Revenus AdSense** : à vérifier dans la console AdSense.

## Calendrier

- Articles et conseils **publiés à leur date** (en-tête `publie_le`), le site étant reconstruit à chaque push et chaque lundi à 5 h UTC. Au 20 octobre 2026 : 39 articles, dont 24 en ligne et 15 programmés, un par lundi jusqu'au 25 janvier 2027, puis le balcon le 26 avril 2027. Page « Top 10 » à onglets (10 sujets) en ligne depuis le 19 octobre.
- Conseils : 50, dont 37 à date et 13 programmés (lundi, mercredi, vendredi) jusqu'au 18 novembre 2026 ; un rappel est prévu le 2 novembre pour préparer le lot suivant.
- Épingles : par lots de 30 jours, 2 par jour au plus ; le lot en cours s'arrête le 18 novembre.

## Les 3 priorités

- Débloquer la publication Pinterest par l'API : renouveler le secret `PINTEREST_REFRESH_TOKEN` (ticket n° 1), corriger le maximum lu à 0 quand `PINTEREST_MAX` est vide, et suivre la demande d'accès standard du 16 octobre.
- Faire indexer par Google les pages encore « détectées, non indexées » et les 10 nouvelles pages Top 10 (relecture du rapport Search Console prévue le 21 octobre).
- Remplacer les 5 produits Amazon encore indisponibles et sans remplaçant (jarre toscane, plaid chenille, lampadaire rotin, sphère étoiles, suspension parasol).
