# MARKETING — plan marketing & rémunération

Mis à jour le 20 novembre 2026. Compagnon de INFRA.md.

> Aucun chiffre inventé : les valeurs non mesurées sont marquées comme telles.

## Positionnement

- **Promesse** : un calculateur d'éclairage LED gratuit, en français, pour cultiver des légumes en intérieur. On choisit une culture, sa surface et son stade ; le site donne le PPFD, le DLI, la puissance, le nombre de barres LED et leur plan de pose, le coût annuel et une liste d'achat.
- **Public** : particuliers qui cultivent en intérieur (légumes feuilles, aromatiques, légumes fruits, micro-pousses), débutants comme confirmés.
- **Différenciation** (d'après le code) :
  - 25 cultures avec des valeurs sourcées (références listées dans le glossaire) ;
  - calcul complet dans le navigateur, sans compte, utilisable hors ligne (PWA) ; le site ne dépose lui-même aucun cookie (seuls ceux de la publicité Google, avec accord) ;
  - 12 guides (6 sur les LED, dont 3 guides d'achat, et 6 sur la culture), 25 pages de cultures, une rubrique Conseils, une page Actus mise à jour deux fois par jour (depuis le 27 octobre 2026, hors de Google depuis le 19 novembre 2026), un glossaire ;
  - lien de partage des réglages et liste d'achat à copier ou imprimer ;
  - sélection de lampes du commerce reliée aux besoins calculés ;
  - neuf classements « Top 10 » (lampes, tentes, kits, ventilation, minuteurs, terreaux…), sans prix ni note affichés.

## Rémunération par phases

- [fait] **Aujourd'hui** : site gratuit sans compte ; affiliation Amazon (15 lampes, toutes disponibles au 20 novembre 2026, identifiant `kultiledfr-21`, liens `rel="sponsored nofollow noopener"`, ligne « Lien partenaire Amazon » sous chaque bouton, mention dans le pied de page et les mentions légales ; plus d'encadré en haut des pages depuis le 28 octobre 2026 ; depuis le même jour : encadré « Lampe conseillée » sur chaque fiche culture, encadré « Le matériel pour ça » dans 28 des 52 conseils publiés (constaté en ligne le 20 novembre 2026 ; les conseils du 16 et du 18 novembre 2026 n'en ont pas), liste d'achat du calculateur et accueil reliés aux Top 10, plus aucun prix de matériel ; depuis le 28 octobre 2026 au soir, bloc « Nos coups de cœur » en haut de l'accueil : 6 produits illustrés des Top 10, liens internes seulement, aucun lien Amazon) et publicité AdSense dans les pages de lecture.
- [en cours] **Validation AdSense** : examen de kultiled.com demandé le 16 octobre 2026, « En préparation » dans la console AdSense, ni validé ni refusé (console vérifiée le 15 novembre 2026 ; aucun mail de décision de Google au 20 novembre 2026, Gmail vérifié ce jour-là).
- **Affiliation élargie** : la liste d'achat du calculateur renvoie depuis le 28 octobre 2026 vers les Top 10 (lampes, minuteries, thermo-hygromètres, tentes, extracteurs) ; reste à créer un code de suivi Amazon par emplacement (table prête dans `src/suivi-amazon.ts`).

## Points forts

- 🧮 **Calcul complet et sourcé** : PPFD, DLI, puissance, barres et plan de pose pour 25 cultures, chaque valeur avec sa source.
- 📴 **Sans compte, hors ligne** : tout tourne dans le navigateur, installable sur mobile, aucun cookie posé par le site lui-même.
- 📚 **Contenu de fond** : 12 guides, 25 pages de cultures, glossaire et trois articles de conseil par semaine.

## Canaux

| Canal | Détail | Statut |
|---|---|---|
| Référencement naturel (base technique) | Sitemap (102 adresses le 27 octobre 2026 avec la page Actus ; 107 le 28 octobre 2026 avec les 4 premiers articles d'actus et le 41e conseil ; 112 le 30 octobre 2026 ; 116 le 31 octobre 2026 ; 119 le 2 novembre 2026 avec le 44e conseil et 14 pages d'articles d'actus ; 123 le 3 novembre 2026 avec 18 pages d'articles d'actus ; 126 le 4 novembre 2026 avec le 45e conseil et 20 pages d'articles d'actus ; 127 le 5 novembre 2026 avec 21 pages d'articles d'actus ; 133 le 6 novembre 2026 avec le 46e conseil et 26 pages d'articles d'actus ; 134 le 7 novembre 2026 avec 27 pages d'articles d'actus ; 135 le 8 novembre 2026 avec 28 pages d'articles d'actus ; 136 le 9 novembre 2026 avec le 47e conseil et 28 pages d'articles d'actus ; 138 le 10 novembre 2026 avec 30 pages d'articles d'actus ; 143 le 11 novembre 2026 avec le 48e conseil et 34 pages d'articles d'actus ; 144 le 12 novembre 2026 avec 35 pages d'articles d'actus ; 148 le 13 novembre 2026 avec le 49e conseil et 38 pages d'articles d'actus ; 151 le 14 novembre 2026 avec 49 conseils et 41 pages d'articles d'actus ; 152 le 15 novembre 2026 avec 42 pages d'articles d'actus ; 155 le 16 novembre 2026 avec le 50e conseil et 44 pages d'articles d'actus ; 161 le 18 novembre 2026 avec le 51e conseil et 49 pages d'articles d'actus ; 164 le 19 novembre 2026 avec 52 pages d'articles d'actus ; 112 le 20 novembre 2026 avec 52 conseils et plus aucune page d'actus, sorties du sitemap le 19 novembre 2026) avec date de dernière modification réelle, robots.txt, adresses canoniques, Open Graph et Twitter Card avec images de partage 1200 × 630, données structurées schema.org sur toutes les pages | ✅ |
| IndexNow (Bing et autres moteurs) | Signalement automatique des pages après chaque publication (depuis le 28 octobre 2026) et chaque lundi (`.github/workflows/indexnow.yml`) | ✅ |
| Flux RSS et Google Discover | `conseils.xml`, grandes images autorisées (`max-image-preview:large`, sur toutes les pages, une seule balise robots par page depuis le 28 octobre 2026) | ✅ |
| Calculateur intégrable | `integrer.html` : code à coller pour les blogs, avec lien vers le site (page enrichie le 7 novembre 2026) | ✅ prêt, aucun blog contacté |
| Google Search Console et Bing | `kultiled.com` ajouté le 16 octobre 2026 dans les deux consoles ; l'ancienne propriété `optiled.fr` y avait été vérifiée avant le changement de domaine du 16 octobre 2026 | ✅ |
| Guides d'achat | 3 guides (`led-puissance`, `led-comparer`, `led-semis`) avec tableaux calculés depuis les données du site, sans prix ni liens Amazon dans le texte | ✅ |
| Pages « Top 10 » | 9 onglets de 10 produits avec liens Amazon (`top-10-<sujet>.html`), en ligne depuis le 19 octobre 2026 | ✅ |
| Articles de conseil | Rubrique « Conseils » : 52 articles en ligne au 20 novembre 2026 (dont « PAR et PPFD », ajouté hors programme le 29 octobre, « Pourquoi mes semis ne lèvent-ils pas ? », publié le 30 octobre, « Moisissure blanche sur la terre : est-ce grave ? », publié le 2 novembre, et « Billes d'argile, laine de roche, coco : quel substrat hydroponique ? », publié le 4 novembre, « Poivrons en intérieur : pourquoi les fleurs tombent-elles ? », publié le 6 novembre, « Humidité trop élevée dans la tente : comment la faire baisser ? », publié le 9 novembre, et « Peut-on laisser sa lampe de culture allumée 24 h sur 24 ? », publié le 11 novembre, « Cultiver des légumes en hiver dans une pièce froide », publié le 13 novembre, et « Radis en intérieur : en combien de temps les récolter ? », publié le 16 novembre, et « Algues vertes dans le bac hydroponique : que faire ? », publié le 18 novembre, et « Réglette, panneau ou ampoule : quel format de lampe choisir ? », publié le 20 novembre) et 26 programmés jusqu'au 7 juin 2027 (25 jusqu'au 15 janvier 2027, puis un en juin, dont « Lampe horticole : comment bien la choisir en 5 questions » le 23 novembre et « Lampe horticole pour plantes d'intérieur, avec ou sans fil » le 30 novembre 2026, ajoutés le 19 novembre ; « Black Friday 2026 : comment préparer l'achat de son matériel de culture » ajouté hors programme, daté du mardi 24 novembre 2026, avant le vendredi 27 novembre 2026 ; les prochains le 23 novembre 2026), trois par semaine (lundi, mercredi, vendredi, publication automatique) ; rappel passé le 16 novembre 2026 pour préparer la série suivante | ✅ |
| Actus (veille) | Actus de la culture en intérieur lues en direct depuis la veille du Studio (2 passages par jour) : page `actus.html` (20) ; source et crédit de l'image toujours visibles ; en ligne depuis le 27 octobre 2026. Depuis le 28 octobre 2026, toucher une actu ouvre son article complet sur le site (une page `actus/<slug>/` par article, avec données `NewsArticle`), pages reconstruites deux fois par jour. Depuis le 19 novembre 2026 : plus d'actus sur l'accueil ni les pages cultures, `actus.html` et les pages d'articles hors de Google (`noindex, follow`, hors sitemap), car vues comme du contenu repris | ✅ visiteurs seulement |
| Pages détaillées par culture | 25 pages `legume-<id>.html` (lumière, exemple pour 1 m², lampes, climat, solution nutritive, récolte) | ✅ |
| Partage par les visiteurs | Bouton « Partager » du calculateur (lien avec les réglages) | ✅ |
| Installation sur mobile | Manifest et service worker (PWA) | ✅ |
| Pinterest | 12 épingles prêtes (`public/images/pinterest/`, import `docs/pinterest.csv`) ; aucun compte Pinterest Kultiled branché au Studio, aucune publication constatée | ⬜ |
| TikTok « Afrotok » et YouTube « toa.afrotok » | TikTok rattaché à aucune app, YouTube à Erea seule dans le Studio ; aucune publication Kultiled | ⬜ |
| Forums et communautés de jardinage | Aucune trace | ⬜ |

## Mesures

- **Visiteurs** : à vérifier dans les consoles Cloudflare Web Analytics (depuis le 12 octobre 2026) et Umami (depuis le 5 novembre 2026)
- **Pages indexées par Google** : 129 pages de kultiled.com dans l’index, 45 non indexées pour 5 motifs (Search Console, données du 13 novembre, vérifié le 16 novembre 2026 ; 126 dans l’index et 37 non indexées le 15 novembre ; le sitemap compte 112 adresses le 20 novembre 2026, après la sortie des pages d'actus le 19 novembre). L'ancien optiled.fr en avait 62 sur 86 au 12 octobre 2026.
- **Clics vers Amazon** : à vérifier dans la console Partenaires Amazon et dans Umami (événement « Clic Amazon », depuis le 5 novembre 2026)
- **Commissions Amazon** : à vérifier dans la console Partenaires Amazon
- **Revenus publicitaires** : à vérifier dans la console AdSense
- **Articles de conseil** : 52 en ligne, 26 programmés jusqu'au 7 juin 2027 (dont l'article Black Friday du 24 novembre 2026 ; au 20 novembre 2026)

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
| 19 novembre 2026 | Actus sorties de Google (`noindex, follow`, hors sitemap) et retirées de l'accueil et des pages cultures ; deux conseils sur la lampe horticole programmés (23 et 30 novembre) |
| 15 janvier 2027 | Fin de la série régulière d'articles programmés (lundi, mercredi, vendredi) |
| 7 juin 2027 | Dernier article programmé (article isolé, après la série) |

## Les 3 priorités

- **Changement d'adresse : pas encore signalé** (vérifié le 15 novembre 2026 dans la Search Console). Réussir le changement de domaine dans Google : faire indexer les dernières adresses de kultiled.com (129 pages dans l’index au 16 novembre 2026, données du 13 novembre, sitemap à 112 adresses le 20 novembre 2026) et signaler le déménagement depuis optiled.fr (outil « Changement d'adresse » de la propriété optiled.fr : pas encore fait au 15 novembre 2026, le bouton « Valider et informer Google » est toujours proposé ; la routine automatique n'a pas le droit de modifier un réglage du compte Google, c'est donc à Jean de cliquer), avant la fin du contrat IONOS en novembre.
- Ouvrir un premier canal d'audience : créer et brancher un compte Pinterest Kultiled, puis importer les 12 épingles déjà prêtes (`docs/pinterest.csv`).
- Obtenir de premiers liens entrants : proposer le calculateur intégrable (`integrer.html`) à quelques blogs et forums de jardinage en intérieur, aucun n'ayant encore été contacté.

## Pinterest

- 12 épingles verticales (1000 × 1500) dans `public/images/pinterest/`, générées par `node scripts/epingles.mjs` à partir des photos et schémas du site (aucun crédit OpenArt).
- Import groupé : `docs/pinterest.csv` (titre, adresse de l'image, tableau « Culture indoor sous LED », description, lien). Sur Pinterest : compte professionnel → Créer → Créer des épingles en masse → importer le fichier.
- Pour en ajouter : compléter la liste `EPINGLES` du script, relancer, publier sur main, puis importer les nouvelles lignes.
