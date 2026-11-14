# PUBLICATION — état de la mise en ligne

> Mis à jour le 14 novembre 2026 d'après le dépôt et le site en ligne.
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
| État | [ok] En ligne, réponse 200 le 14 novembre 2026 |
| Hébergement | [ok] GitHub Pages ; dernier déploiement réussi le 14 novembre 2026 vers 4 h 34 UTC (version f977555, vérifiée par `version.txt`) |
| Domaine | [ok] keurdeco.com chez Cloudflare, échéance le 28 septembre 2027 |
| SSL | [ok] Certificat GitHub Pages, HTTPS imposé |
| Indexation | [à faire] 150 pages indexées sur 163 au 14 novembre 2026 |
| Mesure d'audience | [ok] Cloudflare Web Analytics et Umami, sans cookie |

## Ce qui reste, dans l'ordre

1. ✅ **Site en ligne** : www.keurdeco.com sert les articles, conseils et glossaire en HTTPS.
2. ✅ **Affiliation Amazon** : liens `keurdecofr-21` (nouveau compte depuis le 18 octobre 2026) et mention Partenaires sur toutes les pages concernées.
3. ✅ **Code AdSense en ligne** : emplacements sur les pages de lecture, `ads.txt` et fenêtre de choix des cookies (aucune annonce avant la validation).
4. ✅ **Réparer la publication** : la panne du 7 novembre 2026 (test de bout en bout, manifeste des épingles 199/204) a été corrigée le 8 novembre 2026 (commit `6079606`, 199/199) ; déploiement réussi le 8 novembre 2026 (version `b4feb6c`), puis versions `0593097` le 8 novembre 2026 au soir et `4773fac` mise en ligne le 9 novembre 2026 à 5 h 52 UTC ; version `f977555` en ligne depuis le 14 novembre 2026.
5. **Validation AdSense** : examen demandé le 16 octobre 2026, refusé par Google le 9 novembre 2026 pour « Contenu à faible valeur informative » (les agents avaient encore noté « En préparation » le matin du 9 novembre). Rallonger les fiches produits et les pages courtes, puis redemander l'examen dans la console.
6. **Indexation complète** : faire indexer les 9 pages encore absentes et faire relire par Google les 4 pages ouvertes qu'il voit encore en `noindex` (Search Console).
7. ✅ **Publication Pinterest automatique** : accès standard accordé, 5 épingles par passage, premières épingles publiées par l'API le 20 octobre 2026. Avant l'échéance de la clé (environ 60 jours), la refaire avec `npm run pinterest:auth` puis `npm run pinterest:secrets` ; depuis le 28 octobre 2026, un seul ticket GitHub de rappel (au lieu d'un par jour).

## Web · Production

| | |
|---|---|
| État | **En ligne** sur https://www.keurdeco.com/ (réponse 200 le 14 novembre 2026) ; `keurdeco.com` redirige vers `www` |
| Hébergeur | GitHub Pages, déploiement par le workflow `pages.yml` (tests, build, test de bout en bout, publication, vérification que www.keurdeco.com sert la nouvelle version, IndexNow) |
| Dernier changement du site | 14 novembre 2026 vers 4 h 34 UTC (version `f977555`, vérifiée par `version.txt` : vérification des produits Amazon, lot de coupons de tissus africains remplacé par un lot de 12 coupons Ankara en coton) ; avant, 13 novembre 2026 vers 4 h 39 UTC (version `5f61f6e`, vérifiée par `version.txt` : vérification des produits Amazon, lot de 6 coupons de tissus africains retiré de l'affichage, parure femme africaine tribale brune remplacée par la rouge, conseil du 13 novembre sur la table de fête à petit budget) ; avant, 12 novembre 2026 vers 4 h 33 UTC (version `0f980ac`, vérifiée par `version.txt` : vérification des produits Amazon, 3 parures de lit indisponibles retirées de l'affichage, table d'appoint en racine de teck revenue en stock) ; avant, 11 novembre 2026 vers 13 h 25 UTC (rubrique Wax retravaillée pour Google) ; avant, 11 novembre 2026 vers 4 h 33 UTC (version `b154fa6`, vérifiée par `version.txt` : vérification des produits Amazon, chemin de table paisley revenu en stock, kit de teinture indigo remplacé dans ses pages, référencement du jour sur le conseil tissu kuba et le Top 10 chemins de table, conseil du 11 novembre) ; avant, 10 novembre 2026 dans l'après-midi (version `2c39205` : 8 produits indisponibles remplacés) ; avant, 10 novembre 2026 vers 4 h 47 UTC (version `c5e01d8`, vérifiée par `version.txt` : vérification des produits Amazon, sapin artificiel 180 cm retiré de l'affichage) ; avant, 9 novembre 2026 vers 21 h 43 UTC (version `4cd29ef`, mise en ligne par le passage programmé après l'échec du déploiement de l'envoi de 20 h 56 UTC, délai dépassé chez GitHub Pages) ; avant, 9 novembre 2026 vers 20 h 55 UTC (version `c789efc`, vérifiée par `version.txt` : contre-relecture des 139 produits des Top et Top 10, onglets Top 10 reclassés selon les notes du 9 novembre, pages Tops, Matières et Occasions enrichies ; la publication de `ccdd309` vers 20 h 47 UTC avait échoué au déploiement GitHub Pages, délai dépassé puis relance annulée) ; avant, 9 novembre 2026 vers 19 h 53 UTC (version `fbff325`, vérifiée par `version.txt` : rallonge des Top, Top 10 et rubriques, produits Amazon relus un à un, Top complets ; 151 adresses au sitemap) ; avant, 9 novembre 2026 à 5 h 52 UTC (version `4773fac`, vérifiée par `version.txt` le 9 novembre 2026, avec l'article sur la table de réveillon wax et or et le conseil sur le tabouret ashanti ; 149 adresses au sitemap le 9 novembre 2026, dont 46 conseils et 20 articles d'actus) ; les versions `b4feb6c` et `0593097` avaient été mises en ligne le 8 novembre 2026 à 4 h 38 et 22 h 36 UTC ; du 7 novembre 2026 au matin au 8 novembre, les publications avaient échoué au test de bout en bout (épingles du guide Black Friday), corrigé le 8 novembre (commit `6079606`) ; la housse éléphant Homemissing du Top parures de lit est en ligne depuis la nuit du 6 au 7 novembre 2026 (version `b1e04fa`). Le conseil sur les symboles adinkra est en ligne depuis le 6 novembre 2026 au matin ; la mesure Umami et les paniers en jonc de mer remplacés sont en ligne depuis le 5 novembre 2026 au soir ; le tapis rond remplacé, le Top terre cuite retravaillé et le menu « Les sites Keur » sont en ligne depuis le 4 novembre 2026 au soir ; les déploiements du 4 novembre au matin avaient échoué aux tests (liens internes), corrigés le même jour |
| Rythme | à chaque push sur `main`, chaque lundi, mercredi et vendredi à 5 h UTC (articles programmés), chaque jour à 11 h 50 et 18 h 50 UTC (articles d'actus) et à la demande |
| Contact affiché | keurdeco@toakeur.com (À propos, mentions légales, confidentialité, `security.txt`) |
| Éditeur | ALOHASH (SAS) — voir `mentions-legales.html` |

## Domaine & SSL

- **Domaine** : `keurdeco.com`, enregistré chez Cloudflare le 28 septembre 2026, échéance le 28 septembre 2027.
- **DNS** : 4 enregistrements A vers GitHub Pages et CNAME `www` → `teiki5320.github.io`, proxy Cloudflare désactivé.
- **SSL** : certificat émis par GitHub Pages, HTTPS imposé ; domaine personnalisé `www.keurdeco.com` (fichier `public/CNAME`).

## Visibilité

- **Référencement** : `sitemap.xml` limité aux pages indexables (avec `lastmod`), rubriques vides en `noindex`, `robots.txt`, Open Graph, données structurées Article / ItemList / FAQ / fil d'Ariane. Search Console vérifiée : 150 pages indexées sur 163 au relevé du Studio du 14 novembre 2026 (le conseil artisanal ou industriel, demande d'indexation faite le 13 novembre, le conseil table de fête à petit budget, demande refusée faute de quota le 14 novembre, et 7 articles d'actus pas encore indexés ; 4 pages ouvertes depuis — matière perles, occasions fêtes de fin d'année, mariage, Tabaski — encore vues par Google avec le `noindex` de son passage du 29 septembre), contre 150 sur 159 le 13 novembre, 150 sur 156 le 12 novembre, 146 sur 153 le 11 novembre, 144 sur 151 le 10 novembre, 135 sur 147 le 9 novembre, 133 sur 145 le 8 novembre, 124 sur 143 le 6 novembre, 121 sur 137 le 3 novembre, 118 sur 133 du 31 octobre au 2 novembre, contre 107 sur 128 le 29 octobre, 104 sur 120 le 27 octobre et 71 au 7 octobre ; les 10 pages Top 10 sont indexées ; `sitemap.xml` en ligne avec 121 adresses le 27 octobre 2026 (120 le matin, puis la page Actus), puis 127 au build du 28 octobre 2026 et 128 en ligne le 29 octobre 2026, 132 le 30 octobre 2026 et 133 les 31 octobre et 1er novembre 2026, 135 le 2 novembre 2026, 137 le 3 novembre 2026, 141 le 4 novembre 2026, 142 le 5 novembre 2026, 145 le 6 novembre 2026, 146 le 8 novembre 2026, puis 147 le 9 novembre 2026 au matin, 149 après la publication de ce jour-là 151 le 10 novembre 2026, 154 le 11 novembre 2026, 156 le 12 novembre 2026, 160 le 13 novembre 2026 et 163 le 14 novembre 2026, dont les 10 pages Top 10, 48 conseils et 32 pages d'articles d'actus ; 5 pages retravaillées le 21 octobre, 3 le 22 octobre, 3 le 28 octobre, 1 le 4 novembre et 3 le 11 novembre (en ligne depuis le 11 novembre, la rubrique Wax depuis l'après-midi) (journal `docs/referencement.md`). Balise `max-image-preview:large` sur toutes les pages depuis le 19 octobre. Pages signalées à Bing par IndexNow après chaque reconstruction programmée (lundi, mercredi, vendredi ; et, 2 fois par jour depuis le 28 octobre 2026, les pages d'articles d'actus `/actus/<slug>/`, ajoutées au sitemap avec une donnée structurée NewsArticle).
- **Mesure d'audience** : Cloudflare Web Analytics et, depuis le 5 novembre 2026, Umami (offre gratuite, UE, sans cookie : visites, clics Amazon, clics du menu des sites Keur), balises présentes en ligne le 6 novembre 2026 — chiffres à vérifier dans la console.
- **Publicité** : Google AdSense en place depuis le 12 octobre 2026, examen demandé le 16 octobre, refusé par Google le 9 novembre 2026 pour « Contenu à faible valeur informative » (mail de refus vérifié dans Gmail le 11 novembre 2026, aucun nouveau message au 14 novembre 2026 ; `ads.txt` « Autorisé » ; jusqu'au 31 octobre 2026 la console affichait `ads.txt` « Introuvable »), aucune annonce affichée pour l'instant (code sur les pages qui peuvent porter une annonce, plus sur l'accueil, les Tops, À propos, Mentions légales, la page Actus ni la 404, une au plus sur une page d'article d'actu, `ads.txt` à la racine, annonces sur les pages de lecture, fenêtre de choix des cookies de Google).
- **Pinterest** : domaine revendiqué par la balise `p:domain_verify` (présente en ligne) ; épingles importées par CSV jusqu'au 18 novembre 2026 (2 par jour) ; publication automatique par l'API en marche : accès standard accordé, 20 tableaux reliés, 5 épingles par passage, 5 premières épingles publiées le 20 octobre 2026 (secret renouvelé le même jour), 164 publiées au 14 novembre 2026 (aucune au passage du 9 novembre à 4 h 13 UTC : les 247 épingles du manifeste d'alors étaient toutes publiées ou programmées ; 2 publiées le 9 novembre vers 12 h 50 UTC, 2 au passage du 10 novembre, 3 le 11 novembre, 2 au passage du 12 novembre, 3 le 13 novembre, 1 au passage du 14 novembre ; 261 au manifeste en ligne le 14 novembre, dont 1 pas encore publiée).
- **Pages légales** : mentions légales (éditeur, hébergeur GitHub Pages, mention Partenaires, section Publicité, images IA, photos libres et actus depuis le 27 octobre 2026), confidentialité (aucun cookie du site lui-même, trois petites mémoires dont la liste des actus, lecture du fichier des actus sur GitHub Pages ; cookies publicitaires de Google seulement avec accord), lien « Gérer mes cookies » en bas de chaque page, paragraphe sur les liens affiliés dans « À propos ».
