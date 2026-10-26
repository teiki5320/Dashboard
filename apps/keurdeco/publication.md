# PUBLICATION — état de la mise en ligne

> Mis à jour le 26 octobre 2026 d'après le dépôt et le site en ligne.
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
| État | [ok] En ligne, réponse 200 le 26 octobre 2026 |
| Hébergement | [ok] GitHub Pages, déployé par `pages.yml` le 26 octobre 2026 |
| Domaine | [ok] keurdeco.com chez Cloudflare, échéance le 28 septembre 2027 |
| SSL | [ok] Certificat GitHub Pages, HTTPS imposé |
| Indexation | [à faire] 71 pages indexées, 27 non indexées au 7 octobre 2026 |
| Mesure d'audience | [ok] Cloudflare Web Analytics, sans cookie |

## Ce qui reste, dans l'ordre

1. ✅ **Site en ligne** : www.keurdeco.com sert les articles, conseils et glossaire en HTTPS.
2. ✅ **Affiliation Amazon** : liens `keurdecofr-21` (nouveau compte depuis le 18 octobre 2026) et mention Partenaires sur toutes les pages concernées.
3. ✅ **Code AdSense en ligne** : emplacements sur les pages de lecture, `ads.txt` et fenêtre de choix des cookies (aucune annonce avant la validation).
4. **Validation AdSense** : examen demandé le 16 octobre 2026, toujours en cours ; attendre l'avis de Google dans la console.
5. **Indexation complète** : faire indexer les pages encore « détectées, non indexées » dans la Search Console.
6. ✅ **Publication Pinterest automatique** : accès standard accordé, 5 épingles par passage, premières épingles publiées par l'API le 20 octobre 2026. Recopier le nouveau refresh token quand GitHub rouvre le ticket.

## Web · Production

| | |
|---|---|
| État | **En ligne** sur https://www.keurdeco.com/ (réponse 200 le 26 octobre 2026) ; `keurdeco.com` redirige vers `www` |
| Hébergeur | GitHub Pages, déploiement par le workflow `pages.yml` (tests, build, test de bout en bout, publication) |
| Dernier changement du site | 26 octobre 2026 vers 4 h 34 UTC, déploiement réussi (vérification des produits Amazon du jour) |
| Rythme | à chaque push sur `main`, chaque lundi, mercredi et vendredi à 5 h UTC (articles programmés) et à la demande |
| Contact affiché | keurdeco@toakeur.com (À propos, mentions légales, confidentialité, `security.txt`) |
| Éditeur | ALOHASH (SAS) — voir `mentions-legales.html` |

## Domaine & SSL

- **Domaine** : `keurdeco.com`, enregistré chez Cloudflare le 28 septembre 2026, échéance le 28 septembre 2027.
- **DNS** : 4 enregistrements A vers GitHub Pages et CNAME `www` → `teiki5320.github.io`, proxy Cloudflare désactivé.
- **SSL** : certificat émis par GitHub Pages, HTTPS imposé ; domaine personnalisé `www.keurdeco.com` (fichier `public/CNAME`).

## Visibilité

- **Référencement** : `sitemap.xml` limité aux pages indexables (avec `lastmod`), rubriques vides en `noindex`, `robots.txt`, Open Graph, données structurées Article / ItemList / FAQ / fil d'Ariane. Search Console vérifiée : 71 pages indexées au 7 octobre 2026, demandes d'indexation en cours ; `sitemap.xml` en ligne avec 120 adresses le 26 octobre 2026, dont les 10 pages Top 10 ; 5 pages retravaillées le 21 octobre et 3 le 22 octobre (journal `docs/referencement.md`). Balise `max-image-preview:large` sur toutes les pages depuis le 19 octobre. Pages signalées à Bing par IndexNow après chaque reconstruction programmée (lundi, mercredi, vendredi).
- **Mesure d'audience** : Cloudflare Web Analytics (sans cookie), balise présente en ligne — chiffres à vérifier dans la console.
- **Publicité** : Google AdSense en place depuis le 12 octobre 2026, examen demandé le 16 octobre et toujours en cours, aucune annonce affichée pour l'instant (code sur les pages qui peuvent porter une annonce, plus sur l'accueil, les Tops, À propos, Mentions légales ni la 404, `ads.txt` à la racine, annonces sur les pages de lecture, fenêtre de choix des cookies de Google).
- **Pinterest** : domaine revendiqué par la balise `p:domain_verify` (présente en ligne) ; épingles importées par CSV jusqu'au 18 novembre 2026 (2 par jour) ; publication automatique par l'API en marche : accès standard accordé, 20 tableaux reliés, 5 épingles par passage, 5 premières épingles publiées le 20 octobre 2026 (secret renouvelé le même jour), 40 publiées au 26 octobre.
- **Pages légales** : mentions légales (éditeur, hébergeur GitHub Pages, mention Partenaires, section Publicité, images IA), confidentialité (aucun cookie du site lui-même ; cookies publicitaires de Google seulement avec accord), lien « Gérer mes cookies » en bas de chaque page, paragraphe sur les liens affiliés dans « À propos ».
