# PUBLICATION — état de la mise en ligne

> Mis à jour le 30 octobre 2026 d'après le dépôt et le site en ligne.
>
> Aucun secret ici — uniquement des références.

## En bref

- **Production** : en ligne sur https://www.keurdeco.com/ (GitHub Pages)
- **Domaine & SSL** : keurdeco.com chez Cloudflare, certificat GitHub Pages
- **Visibilité** : Search Console, IndexNow, Pinterest, AdSense
- **Contact** : keurdeco@toakeur.com

## Boutiques

| | 🌐 Site |
|---|---|
| État | [ok] En ligne, réponse 200 le 30 octobre 2026 |
| Hébergement | [ok] GitHub Pages, déployé par `pages.yml` le 29 octobre 2026 vers 23 h UTC (reconstruction après la veille) |
| Domaine | [ok] keurdeco.com chez Cloudflare, échéance le 28 septembre 2027 |
| SSL | [ok] Certificat GitHub Pages, HTTPS imposé |
| Indexation | [à faire] 107 pages indexées sur 128 au 29 octobre 2026 |
| Mesure d'audience | [ok] Cloudflare Web Analytics, sans cookie |

## Ce qui reste, dans l'ordre

1. ✅ **Site en ligne** : www.keurdeco.com sert les articles, conseils et glossaire en HTTPS.
2. ✅ **Affiliation Amazon** : liens `keurdecofr-21` (nouveau compte depuis le 18 octobre 2026) et mention Partenaires sur toutes les pages concernées.
3. ✅ **Code AdSense en ligne** : emplacements sur les pages de lecture, `ads.txt` et fenêtre de choix des cookies (aucune annonce avant la validation).
4. **Validation AdSense** : examen demandé le 16 octobre 2026, toujours en cours (« En préparation » dans la console AdSense, ni validé ni refusé (vérifié le 30 octobre 2026)) ; attendre l'avis de Google dans la console.
5. **Indexation complète** : faire indexer les pages encore « détectées, non indexées » dans la Search Console.
6. ✅ **Publication Pinterest automatique** : accès standard accordé, 5 épingles par passage, premières épingles publiées par l'API le 20 octobre 2026. Avant l'échéance de la clé (environ 60 jours), la refaire avec `npm run pinterest:auth` puis `npm run pinterest:secrets` ; depuis le 28 octobre 2026, un seul ticket GitHub de rappel (au lieu d'un par jour).

## Web · Production

| | |
|---|---|
| État | **En ligne** sur https://www.keurdeco.com/ (réponse 200 le 30 octobre 2026) ; `keurdeco.com` redirige vers `www` |
| Hébergeur | GitHub Pages, déploiement par le workflow `pages.yml` (tests, build, test de bout en bout, publication, vérification que www.keurdeco.com sert la nouvelle version, IndexNow) |
| Dernier changement du site | 29 octobre 2026 vers 23 h UTC, reconstruction programmée réussie (articles d'actus de la veille, conseil du 30 octobre ; auparavant, le 29 octobre vers 4 h 39 UTC, produits Amazon revérifiés : tapis berbère rouge de nouveau en vente, coupons de tissus africains remplacés) |
| Rythme | à chaque push sur `main`, chaque lundi, mercredi et vendredi à 5 h UTC (articles programmés), chaque jour à 11 h 50 et 18 h 50 UTC (articles d'actus) et à la demande |
| Contact affiché | keurdeco@toakeur.com (À propos, mentions légales, confidentialité, `security.txt`) |
| Éditeur | ALOHASH (SAS) — voir `mentions-legales.html` |

## Domaine & SSL

- **Domaine** : `keurdeco.com`, enregistré chez Cloudflare le 28 septembre 2026, échéance le 28 septembre 2027.
- **DNS** : 4 enregistrements A vers GitHub Pages et CNAME `www` → `teiki5320.github.io`, proxy Cloudflare désactivé.
- **SSL** : certificat émis par GitHub Pages, HTTPS imposé ; domaine personnalisé `www.keurdeco.com` (fichier `public/CNAME`).

## Visibilité

- **Référencement** : `sitemap.xml` limité aux pages indexables (avec `lastmod`), rubriques vides en `noindex`, `robots.txt`, Open Graph, données structurées Article / ItemList / FAQ / fil d'Ariane. Search Console vérifiée : 107 pages indexées sur 128 au relevé du Studio du 29 octobre 2026 (5 détectées non explorées, 12 inconnues de Google dont 6 articles d'actus, 4 exclues volontairement par `noindex`), contre 104 sur 120 le 27 octobre et 71 au 7 octobre ; les 10 pages Top 10 sont indexées ; `sitemap.xml` en ligne avec 121 adresses le 27 octobre 2026 (120 le matin, puis la page Actus), puis 127 au build du 28 octobre 2026 et 128 en ligne le 29 octobre 2026 et 132 le 30 octobre 2026, dont les 10 pages Top 10, 42 conseils et 9 pages d'articles d'actus ; 5 pages retravaillées le 21 octobre, 3 le 22 octobre et 3 le 28 octobre (journal `docs/referencement.md`). Balise `max-image-preview:large` sur toutes les pages depuis le 19 octobre. Pages signalées à Bing par IndexNow après chaque reconstruction programmée (lundi, mercredi, vendredi ; et, 2 fois par jour depuis le 28 octobre 2026, les pages d'articles d'actus `/actus/<slug>/`, ajoutées au sitemap avec une donnée structurée NewsArticle).
- **Mesure d'audience** : Cloudflare Web Analytics (sans cookie), balise présente en ligne — chiffres à vérifier dans la console.
- **Publicité** : Google AdSense en place depuis le 12 octobre 2026, examen demandé le 16 octobre et toujours en cours (« En préparation » dans la console au 30 octobre 2026 ; elle y affiche encore `ads.txt` « Introuvable » alors que le fichier répond (200) : elle ne l'a pas revérifié), aucune annonce affichée pour l'instant (code sur les pages qui peuvent porter une annonce, plus sur l'accueil, les Tops, À propos, Mentions légales, la page Actus ni la 404, une au plus sur une page d'article d'actu, `ads.txt` à la racine, annonces sur les pages de lecture, fenêtre de choix des cookies de Google).
- **Pinterest** : domaine revendiqué par la balise `p:domain_verify` (présente en ligne) ; épingles importées par CSV jusqu'au 18 novembre 2026 (2 par jour) ; publication automatique par l'API en marche : accès standard accordé, 20 tableaux reliés, 5 épingles par passage, 5 premières épingles publiées le 20 octobre 2026 (secret renouvelé le même jour), 80 publiées au 30 octobre.
- **Pages légales** : mentions légales (éditeur, hébergeur GitHub Pages, mention Partenaires, section Publicité, images IA, photos libres et actus depuis le 27 octobre 2026), confidentialité (aucun cookie du site lui-même, trois petites mémoires dont la liste des actus, lecture du fichier des actus sur GitHub Pages ; cookies publicitaires de Google seulement avec accord), lien « Gérer mes cookies » en bas de chaque page, paragraphe sur les liens affiliés dans « À propos ».
