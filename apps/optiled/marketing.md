# MARKETING — plan marketing & rémunération

Mis à jour le 13 octobre 2026. Compagnon de INFRA.md.

> Aucun chiffre inventé : les valeurs non mesurées sont marquées comme telles.

## Positionnement

- **Promesse** : un calculateur d'éclairage LED gratuit, en français, pour cultiver des légumes en intérieur. On choisit une culture, sa surface et son stade ; le site donne le PPFD, le DLI, la puissance, le nombre de barres LED et leur plan de pose, le coût annuel et une liste d'achat.
- **Public** : particuliers qui cultivent en intérieur (légumes feuilles, aromatiques, légumes fruits, micro-pousses), débutants comme confirmés.
- **Différenciation** (d'après le code) :
  - 26 cultures avec des valeurs sourcées (références listées dans le glossaire) ;
  - calcul complet dans le navigateur, sans compte, utilisable hors ligne (PWA) ; le site ne dépose lui-même aucun cookie (seuls ceux de la publicité Google, avec accord) ;
  - 12 guides (6 sur les LED, dont 3 guides d'achat, et 6 sur la culture), 26 pages de cultures, une rubrique Conseils, un glossaire ;
  - lien de partage des réglages et liste d'achat à copier ou imprimer ;
  - sélection de lampes du commerce reliée aux besoins calculés.

## Rémunération par phases

- [fait] **Aujourd'hui** : site gratuit sans compte ; affiliation Amazon (16 lampes, identifiant `optiled-21`, liens `rel="sponsored"`, mentions obligatoires) et publicité AdSense dans les pages de lecture.
- [en cours] **Validation AdSense** : validation du site et diffusion des annonces, à vérifier dans la console AdSense.
- **Sélection fiable** : relancer la vérification automatique des lampes (`optiled-verification-lampes`), arrêtée depuis le 1er octobre 2026.
- **Affiliation élargie** : proposer aussi les autres achats de la liste (alimentation, programmateur, variateur…).

## Points forts

- 🧮 **Calcul complet et sourcé** : PPFD, DLI, puissance, barres et plan de pose pour 26 cultures, chaque valeur avec sa source.
- 📴 **Sans compte, hors ligne** : tout tourne dans le navigateur, installable sur mobile, aucun cookie posé par le site lui-même.
- 📚 **Contenu de fond** : 12 guides, 26 pages de cultures, glossaire et trois articles de conseil par semaine.

## Canaux

| Canal | Détail | Statut |
|---|---|---|
| Référencement naturel (base technique) | Sitemap (86 adresses le 12 octobre 2026) avec date de dernière modification réelle, robots.txt, adresses canoniques, Open Graph et Twitter Card avec images de partage 1200 × 630, données structurées schema.org sur toutes les pages | ✅ |
| IndexNow (Bing et autres moteurs) | Signalement automatique des pages chaque lundi (`.github/workflows/indexnow.yml`) | ✅ |
| Flux RSS et Google Discover | `conseils.xml`, grandes images autorisées (`max-image-preview:large`) | ✅ |
| Calculateur intégrable | `integrer.html` : code à coller pour les blogs, avec lien vers le site | ✅ prêt, aucun blog contacté |
| Google Search Console | Propriété `optiled.fr` vérifiée, sitemap envoyé le 25 septembre 2026 puis renvoyé le 12 octobre 2026 (86 adresses) | ✅ |
| Guides d'achat | 3 guides (`led-puissance`, `led-comparer`, `led-semis`) avec tableaux calculés depuis les données du site, sans prix ni liens Amazon dans le texte | ✅ |
| Articles de conseil | Rubrique « Conseils » : 34 articles en ligne et 40 programmés jusqu'au 15 janvier 2027, trois par semaine (lundi, mercredi, vendredi, publication automatique) ; rappel le 16 novembre 2026 pour préparer la série suivante | ✅ |
| Pages détaillées par culture | 26 pages `legume-<id>.html` (lumière, exemple pour 1 m², lampes, climat, solution nutritive, récolte) | ✅ |
| Partage par les visiteurs | Bouton « Partager » du calculateur (lien avec les réglages) | ✅ |
| Installation sur mobile | Manifest et service worker (PWA) | ✅ |
| Pinterest | 12 épingles prêtes (`public/images/pinterest/`, import `docs/pinterest.csv`) ; aucun compte Pinterest OptiLED branché au Studio, aucune publication constatée | ⬜ |
| TikTok « Afrotok » et YouTube « toa.afrotok » | Comptes communs branchés au Studio, mais aucune publication OptiLED planifiée | ⬜ |
| Forums et communautés de jardinage | Aucune trace | ⬜ |

## Mesures

- **Visiteurs** : à vérifier dans la console Cloudflare Web Analytics (mesure active depuis le 12 octobre 2026)
- **Pages indexées par Google** : 62 sur 86 (contrôle du Studio, 12 octobre 2026)
- **Clics vers Amazon** : à vérifier dans la console Partenaires Amazon
- **Commissions Amazon** : à vérifier dans la console Partenaires Amazon
- **Revenus publicitaires** : à vérifier dans la console AdSense
- **Articles de conseil** : 34 en ligne, 40 programmés jusqu'au 15 janvier 2027

## Calendrier

| Date | Événement |
|---|---|
| 24 septembre 2026 | Domaine `www.optiled.fr` en ligne, mentions légales complétées, affiliation Amazon configurée |
| 1er octobre 2026 | Première vérification automatique des lampes Amazon (la seule à ce jour) |
| 7 octobre 2026 | Contact `optiled@toakeur.com` et mesure d'audience Cloudflare ajoutés au code |
| 7 au 12 octobre 2026 | Publications bloquées par le test de bout en bout ; débloquées le 12 octobre |
| 12 octobre 2026 | Mentions légales accordées à la mesure d'audience Cloudflare (une seule source, le jeton du site) ; publicité Google AdSense en ligne (script, emplacements, consentement, `ads.txt`), mentions légales et « À propos » mises à jour |
| 16 novembre 2026 | Rappel : préparer la série suivante d'articles de conseil |
| 15 janvier 2027 | Dernier article programmé de la série actuelle (hors un article en juin 2027) |

## Les 3 priorités

- Faire indexer par Google les pages encore absentes : 62 des 86 adresses du plan du site y figurent (contrôle du Studio du 12 octobre 2026) ; plan du site renvoyé le 12 octobre, à renvoyer après chaque série de pages.
- Ouvrir un premier canal d'audience : créer et brancher un compte Pinterest OptiLED, puis importer les 12 épingles déjà prêtes (`docs/pinterest.csv`).
- Obtenir de premiers liens entrants : proposer le calculateur intégrable (`integrer.html`) à quelques blogs et forums de jardinage en intérieur, aucun n'ayant encore été contacté.

## Pinterest

- 12 épingles verticales (1000 × 1500) dans `public/images/pinterest/`, générées par `node scripts/epingles.mjs` à partir des photos et schémas du site (aucun crédit OpenArt).
- Import groupé : `docs/pinterest.csv` (titre, adresse de l'image, tableau « Culture indoor sous LED », description, lien). Sur Pinterest : compte professionnel → Créer → Créer des épingles en masse → importer le fichier.
- Pour en ajouter : compléter la liste `EPINGLES` du script, relancer, publier sur main, puis importer les nouvelles lignes.
