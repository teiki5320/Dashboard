# MARKETING — plan marketing & rémunération

Mis à jour le 30 septembre 2026. Compagnon de INFRA.md (généré côté Dashboard : si le dépôt crée sa propre fiche docs/MARKETING.md, elle remplacera celle-ci à la synchro suivante).

## Positionnement

- **Angle** : la décoration africaine expliquée et mise en scène — idées d'aménagement (« ambiances »), Top 10 et guides sur les matières et savoir-faire (wax, bogolan, kente, indigo, raphia…). « Keur » veut dire « maison » en wolof.
- **Publics** : la diaspora africaine en France, et tous les amateurs de déco.
- **Différenciation** : contenu éditorial soigné (typographie française, animations signature, nuancier des matières interactif), produits vérifiés à la main sans photos Amazon, éthique affichée (mention IA sur les images, mention Partenaires, aucun prix inventé).

## Modèle de rémunération

Liens Partenaires Amazon.fr — tag `keurdeco-21`.

| Phase | Levier | Statut |
| --- | --- | --- |
| 1 — Lancement | Affiliation Amazon (produits déco vérifiés à la main, mention Partenaires) | ✅ câblé |
| 2 — Trafic | Épingles Pinterest automatiques (API v5, 5/jour max) | ✅ câblé — accès API : à vérifier dans la console Pinterest |
| 3 — Recherche | Référencement Google (sitemap, données structurées, Search Console) | ⬜ inscription Search Console à vérifier |

## Canaux

- **Pinterest** (principal) : épingles générées au build (une par titre d'article, gabarits alternés), publication quotidienne automatique à 7 h 17 UTC ; import CSV manuel en repli tant que l'accès API n'est pas accordé ; Rich Pins et bouton « Épingler » sur le site.
- **Google** : sitemap réservé aux pages indexables (rubriques vides en `noindex`), données structurées Article / ItemList / FAQ, balise `google-site-verification` prête (variable `GOOGLE_VERIFY`).
- Pas d'autres canaux câblés dans le dépôt.

## KPIs

- Audience mesurée par **Cloudflare Web Analytics** (sans cookie) — chiffres à vérifier dans la console.
- Épingles publiées : suivies dans `data/pinterest-etat.json` (mis à jour par le workflow).
- Aucun autre chiffre disponible dans le dépôt.

## Calendrier

- Articles et conseils **publiés à leur date** (en-tête `publie_le`, heure de Paris) : le site est reconstruit à chaque push et chaque lundi à 5 h UTC. 10 articles programmés du 14 décembre au 15 février (chambre d'enfant, paniers muraux, indigo, salle de bain, tapis, cuisine, mariage ×2, Saint-Valentin, baptême) ; 12 premiers conseils en place.
- Épingles Pinterest : au fil de l'eau, 5 par jour au plus, jamais deux du même article le même jour.

## Prochaines actions

- ⬜ Faire accorder l'accès à l'API Pinterest (vidéo de démonstration exigée — formulaire prêt via `npm run pinterest:auth`) ; d'ici là, importer le CSV à la main.
- ⬜ Vérifier l'inscription à la Search Console (variable `GOOGLE_VERIFY`).
- ⬜ Remplacer les illustrations provisoires des trois articles de départ par les images OpenArt.
