# MARKETING — plan marketing & rémunération

Mis à jour le 25 septembre 2026. Compagnon de INFRA.md.

> Aucun chiffre inventé : les valeurs non mesurées sont marquées comme telles.

## Positionnement

- **Promesse** : un calculateur d'éclairage LED gratuit, en français, pour cultiver des légumes en intérieur. On choisit une culture, sa surface et son stade ; le site donne le PPFD, le DLI, la puissance, le nombre de barres LED et leur plan de pose, le coût annuel et une liste d'achat.
- **Public** : particuliers qui cultivent en intérieur (légumes feuilles, aromatiques, légumes fruits, micro-pousses), débutants comme confirmés.
- **Différenciation** (d'après le code) :
  - 26 cultures avec des valeurs sourcées (références listées dans le glossaire) ;
  - calcul complet dans le navigateur, sans compte ni cookie, utilisable hors ligne (PWA) ;
  - 9 guides (3 sur les LED, 6 sur la culture), des fiches légumes, un glossaire ;
  - lien de partage des réglages et liste d'achat à copier ou imprimer ;
  - sélection de lampes du commerce reliée aux besoins calculés.

## Modèle de rémunération

| Phase | Levier | Statut |
|---|---|---|
| 0 | Site gratuit, sans publicité ni compte | ✅ en place |
| 1 | Affiliation Amazon : 16 lampes (`src/data/lampes.json`), liens `rel="sponsored"` avec l'identifiant `optiled-21`, propositions dans le calculateur et page `lampes.html` | ✅ en place |
| 1 | Mentions obligatoires de l'affiliation (près des liens, pied de page, mentions légales) | ✅ en place |
| 1 | Vérification mensuelle automatique de la sélection de lampes | ✅ en place (premier passage prévu le 1er octobre 2026) |
| 2 | Élargir l'affiliation aux autres achats de la liste d'achat (alimentation, programmateur, variateur…) | ⬜ |
| 3 | Publicité display | ⬜ non prévue dans le code |

## Canaux

| Canal | Détail | Statut |
|---|---|---|
| Référencement naturel (base technique) | Sitemap, robots.txt, adresses canoniques, Open Graph et Twitter Card avec images de partage 1200 × 630, données structurées schema.org (WebApplication, Article) | ✅ |
| Google Search Console | Déclaration de `www.optiled.fr` et envoi du sitemap | ⬜ |
| Partage par les visiteurs | Bouton « Partager » du calculateur (lien avec les réglages) | ✅ |
| Installation sur mobile | Manifest et service worker (PWA) | ✅ |
| Réseaux sociaux, forums, communautés de jardinage | Aucune trace dans le dépôt | ⬜ |

## KPIs

| Métrique | Valeur | Objectif |
|---|---|---|
| Visiteurs | non mesuré (Plausible prévu dans le code, non activé) | à définir après activation d'une mesure |
| Pages indexées par Google | non vérifié | à vérifier dans la console Search Console |
| Clics vers Amazon | à vérifier dans la console Partenaires Amazon | à définir |
| Commissions Amazon | à vérifier dans la console Partenaires Amazon | premier seuil de paiement (25 € d'après la console) |

## Calendrier

| Date | Événement |
|---|---|
| 24 septembre 2026 | Domaine `www.optiled.fr` en ligne, mentions légales complétées, affiliation Amazon configurée |
| 1er octobre 2026 | Première vérification mensuelle automatique des lampes Amazon |
| Chaque 1er du mois | Vérification des lampes (note, disponibilité, chiffres) |

## Prochaines actions

- ✅ Mettre en ligne le domaine `www.optiled.fr` avec HTTPS
- ✅ Compléter les mentions légales (éditeur ALOHASH)
- ✅ Déclarer le site et configurer le paiement dans Partenaires Amazon
- ⬜ Déclarer le site dans Google Search Console et envoyer le sitemap
- ⬜ Vérifier que la routine mensuelle arrive à publier ses mises à jour
- ⬜ Choisir et activer une mesure d'audience (Plausible prévu dans le code), puis mettre à jour la rubrique cookies des mentions légales
- ⬜ Faire connaître le site dans les communautés de culture en intérieur
