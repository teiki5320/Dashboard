# MARKETING — plan marketing & rémunération

Mis à jour le 30 octobre 2026. Compagnon de INFRA.md.

> Aucun chiffre inventé : les valeurs non mesurées sont marquées comme telles.

## Positionnement

- **Promesse** : un calculateur d'éclairage LED gratuit, en français, pour cultiver des légumes en intérieur. On choisit une culture, sa surface et son stade ; le site donne le PPFD, le DLI, la puissance, le nombre de barres LED et leur plan de pose, le coût annuel et une liste d'achat.
- **Public** : particuliers qui cultivent en intérieur (légumes feuilles, aromatiques, légumes fruits, micro-pousses), débutants comme confirmés.
- **Différenciation** (d'après le code) :
  - 25 cultures avec des valeurs sourcées (références listées dans le glossaire) ;
  - calcul complet dans le navigateur, sans compte, utilisable hors ligne (PWA) ; le site ne dépose lui-même aucun cookie (seuls ceux de la publicité Google, avec accord) ;
  - 12 guides (6 sur les LED, dont 3 guides d'achat, et 6 sur la culture), 25 pages de cultures, une rubrique Conseils, une page Actus mise à jour deux fois par jour (depuis le 27 octobre 2026), un glossaire ;
  - lien de partage des réglages et liste d'achat à copier ou imprimer ;
  - sélection de lampes du commerce reliée aux besoins calculés ;
  - neuf classements « Top 10 » (lampes, tentes, kits, ventilation, minuteurs, terreaux…), sans prix ni note affichés.

## Rémunération par phases

- [fait] **Aujourd'hui** : site gratuit sans compte ; affiliation Amazon (16 lampes, identifiant `kultiledfr-21`, liens `rel="sponsored nofollow noopener"`, ligne « Lien partenaire Amazon » sous chaque bouton, mention dans le pied de page et les mentions légales ; plus d'encadré en haut des pages depuis le 28 octobre 2026 ; depuis le même jour : encadré « Lampe conseillée » sur chaque fiche culture, encadré « Le matériel pour ça » dans 13 conseils, liste d'achat du calculateur et accueil reliés aux Top 10, plus aucun prix de matériel ; depuis le 28 octobre 2026 au soir, bloc « Nos coups de cœur » en haut de l'accueil : 6 produits illustrés des Top 10, liens internes seulement, aucun lien Amazon) et publicité AdSense dans les pages de lecture.
- [en cours] **Validation AdSense** : examen de kultiled.com demandé le 16 octobre 2026, « En préparation » dans la console AdSense, ni validé ni refusé (vérifié le 30 octobre 2026).
- **Affiliation élargie** : la liste d'achat du calculateur renvoie depuis le 28 octobre 2026 vers les Top 10 (lampes, minuteries, thermo-hygromètres, tentes, extracteurs) ; reste à créer un code de suivi Amazon par emplacement (table prête dans `src/suivi-amazon.ts`).

## Points forts

- 🧮 **Calcul complet et sourcé** : PPFD, DLI, puissance, barres et plan de pose pour 25 cultures, chaque valeur avec sa source.
- 📴 **Sans compte, hors ligne** : tout tourne dans le navigateur, installable sur mobile, aucun cookie posé par le site lui-même.
- 📚 **Contenu de fond** : 12 guides, 25 pages de cultures, glossaire et trois articles de conseil par semaine.

## Canaux

| Canal | Détail | Statut |
|---|---|---|
| Référencement naturel (base technique) | Sitemap (102 adresses le 27 octobre 2026 avec la page Actus ; 107 le 28 octobre 2026 avec les 4 premiers articles d'actus et le 41e conseil ; 112 le 30 octobre 2026, nombre qui grandit avec la veille) avec date de dernière modification réelle, robots.txt, adresses canoniques, Open Graph et Twitter Card avec images de partage 1200 × 630, données structurées schema.org sur toutes les pages | ✅ |
| IndexNow (Bing et autres moteurs) | Signalement automatique des pages après chaque publication (depuis le 28 octobre 2026) et chaque lundi (`.github/workflows/indexnow.yml`) | ✅ |
| Flux RSS et Google Discover | `conseils.xml`, grandes images autorisées (`max-image-preview:large`, sur toutes les pages, une seule balise robots par page depuis le 28 octobre 2026) | ✅ |
| Calculateur intégrable | `integrer.html` : code à coller pour les blogs, avec lien vers le site | ✅ prêt, aucun blog contacté |
| Google Search Console et Bing | `kultiled.com` ajouté le 16 octobre 2026 dans les deux consoles ; l'ancienne propriété `optiled.fr` y avait été vérifiée avant le changement de domaine du 16 octobre 2026 | ✅ |
| Guides d'achat | 3 guides (`led-puissance`, `led-comparer`, `led-semis`) avec tableaux calculés depuis les données du site, sans prix ni liens Amazon dans le texte | ✅ |
| Pages « Top 10 » | 9 onglets de 10 produits avec liens Amazon (`top-10-<sujet>.html`), en ligne depuis le 19 octobre 2026 | ✅ |
| Articles de conseil | Rubrique « Conseils » : 43 articles en ligne au 30 octobre 2026 (dont « PAR et PPFD », ajouté hors programme le 29 octobre, et « Pourquoi mes semis ne lèvent-ils pas ? », publié le 30 octobre) et 32 programmés jusqu'au 7 juin 2027 (31 jusqu'au 15 janvier 2027, puis un en juin ; le prochain le 2 novembre 2026), trois par semaine (lundi, mercredi, vendredi, publication automatique) ; rappel le 16 novembre 2026 pour préparer la série suivante | ✅ |
| Actus (veille) | Actus de la culture en intérieur lues en direct depuis la veille du Studio (2 passages par jour) : 4 sur l'accueil, page `actus.html` (20), 3 sur chaque page culture concernée ; source et crédit de l'image toujours visibles ; en ligne depuis le 27 octobre 2026. Depuis le 28 octobre 2026, toucher une actu ouvre son article complet sur le site (une page `actus/<slug>/` par article, dans le sitemap, avec données `NewsArticle` ; 4 pages ce jour-là), pages reconstruites deux fois par jour | ✅ |
| Pages détaillées par culture | 25 pages `legume-<id>.html` (lumière, exemple pour 1 m², lampes, climat, solution nutritive, récolte) | ✅ |
| Partage par les visiteurs | Bouton « Partager » du calculateur (lien avec les réglages) | ✅ |
| Installation sur mobile | Manifest et service worker (PWA) | ✅ |
| Pinterest | 12 épingles prêtes (`public/images/pinterest/`, import `docs/pinterest.csv`) ; aucun compte Pinterest Kultiled branché au Studio, aucune publication constatée | ⬜ |
| TikTok « Afrotok » et YouTube « toa.afrotok » | TikTok rattaché à aucune app, YouTube à Erea seule dans le Studio ; aucune publication Kultiled | ⬜ |
| Forums et communautés de jardinage | Aucune trace | ⬜ |

## Mesures

- **Visiteurs** : à vérifier dans la console Cloudflare Web Analytics (mesure active depuis le 12 octobre 2026)
- **Pages indexées par Google** : 98 pages de kultiled.com dans l'index ; parmi les non indexées, 3 détectées et 2 explorées pas encore indexées, les autres étant des redirections ou des doublons voulus (Search Console, vérifié le 30 octobre 2026 ; le sitemap compte 112 adresses le même jour). L'ancien optiled.fr en avait 62 sur 86 au 12 octobre 2026.
- **Clics vers Amazon** : à vérifier dans la console Partenaires Amazon
- **Commissions Amazon** : à vérifier dans la console Partenaires Amazon
- **Revenus publicitaires** : à vérifier dans la console AdSense
- **Articles de conseil** : 43 en ligne, 32 programmés jusqu'au 7 juin 2027 (au 30 octobre 2026)

## Calendrier

| Date | Événement |
|---|---|
| 24 septembre 2026 | Domaine `www.optiled.fr` en ligne, mentions légales complétées, affiliation Amazon configurée |
| 1er octobre 2026 | Vérification automatique des lampes Amazon, puis interruption de la routine |
| 7 octobre 2026 | Contact `kultiled@toakeur.com` et mesure d'audience Cloudflare ajoutés au code |
| 7 au 12 octobre 2026 | Publications bloquées par le test de bout en bout ; débloquées le 12 octobre |
| 12 octobre 2026 | Mentions légales accordées à la mesure d'audience Cloudflare (une seule source, le jeton du site) ; publicité Google AdSense en ligne (script, emplacements, consentement, `ads.txt`), mentions légales et « À propos » mises à jour |
| 13 et 14 octobre 2026 | Vérification quotidienne des lampes de nouveau active : 16 lampes, une indisponible |
| 16 octobre 2026 | OptiLED devient Kultiled : nom, logo, contact `kultiled@toakeur.com`, domaine `www.kultiled.com` ; Search Console, Bing, Amazon et examen AdSense pour le nouveau domaine |
| 18 octobre 2026 | Ancien compte Amazon Partenaires fermé par Amazon ; nouvel identifiant `kultiledfr-21` |
| 19 octobre 2026 | Pages « Top 10 » en ligne (9 onglets) et page « Les meilleures lampes LED de culture » |
| 22 octobre 2026 | Ancien site `optiled.fr` supprimé du compte AdSense |
| 28 octobre 2026 | Actus : chaque actu ouvre son article complet sur le site (pages `actus/<slug>/` dans le sitemap), reconstruites deux fois par jour après la veille |
| 28 octobre 2026 | Fiche du chanvre retirée du site (25 cultures) ; fourchettes de prix remplacées par des niveaux de budget ; Top 10 reliés depuis les conseils, les fiches, l'accueil et le calculateur ; bloc « Nos coups de cœur » (6 produits illustrés des Top 10) en haut de l'accueil ; catalogue Amazon vérifié (5 produits remplacés) |
| 16 novembre 2026 | Rappel : préparer la série suivante d'articles de conseil |
| 15 janvier 2027 | Fin de la série régulière d'articles programmés (lundi, mercredi, vendredi) |
| 7 juin 2027 | Dernier article programmé (article isolé, après la série) |

## Les 3 priorités

- Réussir le changement de domaine dans Google : faire indexer les dernières adresses de kultiled.com (98 pages dans l'index au 30 octobre 2026, sitemap à 112 adresses le même jour) et signaler le déménagement depuis optiled.fr (outil « Changement d'adresse » de la propriété optiled.fr : pas encore fait au 30 octobre 2026, le bouton « Valider et informer Google » est toujours proposé), avant la fin du contrat IONOS en novembre.
- Ouvrir un premier canal d'audience : créer et brancher un compte Pinterest Kultiled, puis importer les 12 épingles déjà prêtes (`docs/pinterest.csv`).
- Obtenir de premiers liens entrants : proposer le calculateur intégrable (`integrer.html`) à quelques blogs et forums de jardinage en intérieur, aucun n'ayant encore été contacté.

## Pinterest

- 12 épingles verticales (1000 × 1500) dans `public/images/pinterest/`, générées par `node scripts/epingles.mjs` à partir des photos et schémas du site (aucun crédit OpenArt).
- Import groupé : `docs/pinterest.csv` (titre, adresse de l'image, tableau « Culture indoor sous LED », description, lien). Sur Pinterest : compte professionnel → Créer → Créer des épingles en masse → importer le fichier.
- Pour en ajouter : compléter la liste `EPINGLES` du script, relancer, publier sur main, puis importer les nouvelles lignes.
