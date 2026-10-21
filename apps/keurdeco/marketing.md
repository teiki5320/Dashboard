# MARKETING — plan marketing & rémunération

Mis à jour le 21 octobre 2026. Compagnon de INFRA.md.

## Positionnement

- **Angle** : la décoration africaine expliquée et mise en scène — idées d'aménagement (« ambiances »), tops et guides sur les matières et savoir-faire (wax, bogolan, kente, indigo, raphia…). « Keur » veut dire « maison » en wolof.
- **Publics** : la diaspora africaine en France, et tous les amateurs de déco.
- **Différenciation** : contenu éditorial soigné (animations, nuancier des matières), produits vérifiés à la main sans photos Amazon, éthique affichée (mention IA sur les images, mention Partenaires, aucun prix).

## Rémunération par phases

- [fait] **Aujourd'hui** : liens Amazon Partenaires (tag `keurdecofr-21` depuis le 18 octobre 2026, l'ancien compte ayant été fermé par Amazon ; 230 produits actifs sur 238 relevés).
- [en cours] **Validation AdSense** : code et `ads.txt` en place, examen demandé le 16 octobre 2026 ; aucune annonce ne s'affiche tant que Google n'a pas validé le site.
- [en cours] **Trafic Pinterest automatique** : accès standard accordé, publication quotidienne par l'API (5 épingles par passage) depuis le 20 octobre 2026.
- **Trafic de recherche** : pages indexées par Google et Bing, qui font vivre les deux revenus.

## Points forts

- 🧵 **Matières expliquées** : nuancier animé et glossaire de 15 matières (wax, bogolan, kente, indigo, raphia…).
- 🛋️ **Ambiances cliquables** : chaque image d'ambiance a des points qui mènent aux produits, classés sans mélange par pièce, matière ou occasion.
- ✅ **Produits vérifiés à la main** : aucun prix, aucune photo Amazon, mention IA sur les images et mention Partenaires affichée.

## Canaux

- ✅ **Pinterest « Keur Déco »** (principal) : compte branché au Planning du Studio ; 96 épingles importées par CSV (2 par jour, du 2 octobre au 18 novembre 2026, `data/pinterest-etat.json`). Publication par l'API : accès standard accordé, 20 tableaux reliés, 5 épingles par passage ; maximum corrigé et secret renouvelé le 20 octobre, 5 premières épingles publiées par l'API le même jour.
- ✅ **Google** : Search Console vérifiée (propriété de domaine) ; au relevé du 7 octobre 2026, 71 pages indexées et 27 non indexées, demandes d'indexation faites les 7 et 8 octobre. Le 21 octobre, la routine « Référencement du jour » a retravaillé 5 pages (titres, descriptions, liens internes), à relire à partir du 18 novembre (`docs/referencement.md`).
- ✅ **Bing** : pages signalées par IndexNow après chaque reconstruction du lundi.
- ⬜ **TikTok et YouTube** : TikTok « Afrotok » est branché au Studio mais rattaché à aucune app, YouTube « toa.afrotok » à Erea seule (Studio, 13 octobre 2026) ; aucune publication pour Keur Déco.

## Mesures

- **Audience** : Cloudflare Web Analytics (sans cookie) — à vérifier dans la console.
- **Pages indexées** : 71 indexées et 27 non indexées au 7 octobre 2026 (Search Console).
- **Épingles** : 96 importées par CSV (programmées jusqu'au 18 novembre 2026) et 5 publiées par l'API le 20 octobre (`data/pinterest-etat.json`).
- **Statistiques Pinterest** : à vérifier dans la console Pinterest.
- **Commissions Amazon** : à vérifier dans la console Amazon Partenaires.
- **Revenus AdSense** : aucun, site encore en examen chez Google.

## Calendrier

- Articles et conseils **publiés à leur date** (en-tête `publie_le`), le site étant reconstruit à chaque push et chaque lundi à 5 h UTC. Au 21 octobre 2026 : 39 articles, dont 24 en ligne et 15 programmés, un par lundi jusqu'au 25 janvier 2027, puis le balcon le 26 avril 2027. Page « Top 10 » à onglets (10 sujets) en ligne depuis le 19 octobre.
- Conseils : 50, dont 38 à date et 12 programmés (lundi, mercredi, vendredi) jusqu'au 18 novembre 2026. Le site n'est reconstruit que le lundi (`pages.yml`, cron `0 5 * * 1`) ou à chaque push : un conseil daté d'un mercredi ou d'un vendredi n'apparaît qu'à la reconstruction suivante. Un rappel est prévu le 2 novembre pour préparer le lot suivant.
- Épingles : import CSV par lots de 30 jours, 2 par jour (lot en cours jusqu'au 18 novembre) ; en plus, l'API publie 5 épingles par passage du workflow quotidien.

## Les 3 priorités

- Garder la publication Pinterest par l'API en marche : quand GitHub ouvre un ticket « mettre à jour le secret PINTEREST_REFRESH_TOKEN », recopier le nouveau jeton dans le secret (Pinterest en renvoie un nouveau à chaque renouvellement ; le jeton actuel reste valable environ 60 jours).
- Relever le nombre de pages indexées dans la Search Console (dernier relevé : 7 octobre) et faire indexer les pages encore absentes, dont les 10 pages Top 10.
- Remplacer les 7 produits Amazon indisponibles et sans remplaçant (jarre toscane, coussin femme africaine en jute, plaid chenille, lampadaire rotin, sphère étoiles, suspension parasol, plateaux tressés lot de 2).
