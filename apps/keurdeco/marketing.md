# MARKETING — plan marketing & rémunération

Mis à jour le 12 octobre 2026. Compagnon de INFRA.md.

## Positionnement

- **Angle** : la décoration africaine expliquée et mise en scène — idées d'aménagement (« ambiances »), tops et guides sur les matières et savoir-faire (wax, bogolan, kente, indigo, raphia…). « Keur » veut dire « maison » en wolof.
- **Publics** : la diaspora africaine en France, et tous les amateurs de déco.
- **Différenciation** : contenu éditorial soigné (animations, nuancier des matières), produits vérifiés à la main sans photos Amazon, éthique affichée (mention IA sur les images, mention Partenaires, aucun prix).

## Modèle de rémunération

Liens Partenaires Amazon.fr — tag `keurdeco-21`.

| Phase | Levier | Statut |
| --- | --- | --- |
| 1 — Lancement | Affiliation Amazon (163 produits vérifiés à la main, mention Partenaires) | ✅ en ligne |
| 2 — Trafic | Épingles Pinterest | ✅ par import CSV manuel — publication automatique par l'API pas encore ouverte |
| 3 — Recherche | Référencement Google et Bing (sitemap, données structurées, Search Console, IndexNow) | ✅ en place — indexation en cours |

## Canaux

- ✅ **Pinterest « Keur Déco »** (principal) : compte branché au Planning du Studio ; 62 épingles importées par CSV, dont 22 parues du 2 au 12 octobre 2026 et 40 programmées jusqu'au 1er novembre (`data/pinterest-etat.json`). La publication quotidienne par l'API tourne à blanc faute de secrets.
- ✅ **Google** : Search Console vérifiée (propriété de domaine) ; au relevé du 7 octobre 2026, 71 pages indexées et 27 non indexées, demandes d'indexation faites les 7 et 8 octobre.
- ✅ **Bing** : pages signalées par IndexNow après chaque reconstruction du lundi.
- ⬜ **TikTok « Afrotok » et YouTube « toa.afrotok »** (comptes communs à toutes les apps, branchés au Planning) : aucune publication pour Keur Déco à ce jour.

## KPIs

- Audience : Cloudflare Web Analytics (sans cookie) — chiffres à vérifier dans la console.
- Indexation : Search Console — 71 pages indexées au 7 octobre 2026.
- Épingles : suivies dans `data/pinterest-etat.json` ; statistiques à vérifier dans la console Pinterest.
- Revenus : à vérifier dans la console Amazon Partenaires.

## Calendrier

- Articles et conseils **publiés à leur date** (en-tête `publie_le`), le site étant reconstruit à chaque push et chaque lundi à 5 h UTC. Au 12 octobre 2026 : 37 articles, dont 21 à date (le top terre cuite paraît avec la reconstruction de ce lundi) et 16 programmés, un par lundi du 19 octobre 2026 au 25 janvier 2027, puis le balcon le 26 avril 2027.
- Conseils : 50, dont 34 à date et 16 programmés (lundi, mercredi, vendredi) jusqu'au 18 novembre 2026 ; un rappel est prévu le 2 novembre pour préparer le lot suivant.
- Épingles : par lots de 30 jours, 2 par jour au plus ; le lot en cours s'arrête le 1er novembre.

## Les 3 priorités

- Importer avant le 1er novembre le lot Pinterest suivant (`npm run pinterest:lot`, import sur Pinterest, puis `--confirmer`), sinon plus aucune épingle ne paraît.
- Obtenir l'accès standard à l'API Pinterest (vidéo de démonstration, voir `docs/pinterest.md`), puis renseigner les `board_id` et les trois secrets Actions pour que la publication devienne automatique.
- Faire indexer par Google les pages encore « détectées, non indexées » (relecture du rapport Search Console prévue le 21 octobre).
