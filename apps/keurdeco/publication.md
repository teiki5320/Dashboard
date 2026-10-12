# PUBLICATION — état de la mise en ligne

> Mis à jour le 12 octobre 2026 d'après le dépôt et le site en ligne.
>
> Aucun secret ici — uniquement des références.

## Web · Production

| | |
|---|---|
| État | **En ligne** sur https://www.keurdeco.com/ (réponse 200 le 12 octobre 2026) ; `keurdeco.com` redirige vers `www` |
| Hébergeur | GitHub Pages, déploiement par le workflow `pages.yml` (tests, build, test de bout en bout, publication) |
| Dernier déploiement | 7 octobre 2026 (contact public keurdeco@toakeur.com) ; la reconstruction du lundi 12 octobre est attendue |
| Rythme | à chaque push sur `main`, chaque lundi à 5 h UTC (articles programmés) et à la demande |
| Contact affiché | keurdeco@toakeur.com (À propos, mentions légales, confidentialité, `security.txt`) |
| Éditeur | ALOHASH (SAS) — voir `mentions-legales.html` |

## Domaine & SSL

- **Domaine** : `keurdeco.com`, enregistré chez Cloudflare le 28 septembre 2026, échéance le 28 septembre 2027.
- **DNS** : 4 enregistrements A vers GitHub Pages et CNAME `www` → `teiki5320.github.io`, proxy Cloudflare désactivé.
- **SSL** : certificat émis par GitHub Pages, HTTPS imposé ; domaine personnalisé `www.keurdeco.com` (fichier `public/CNAME`).

## Visibilité

- **Référencement** : `sitemap.xml` limité aux pages indexables (avec `lastmod`), rubriques vides en `noindex`, `robots.txt`, Open Graph, données structurées Article / ItemList / FAQ / fil d'Ariane. Search Console vérifiée : 71 pages indexées au 7 octobre 2026, demandes d'indexation en cours. Pages signalées à Bing par IndexNow chaque lundi.
- **Mesure d'audience** : Cloudflare Web Analytics (sans cookie), balise présente en ligne — chiffres à vérifier dans la console.
- **Pinterest** : domaine revendiqué par la balise `p:domain_verify` (présente en ligne) ; épingles importées par CSV jusqu'au 1er novembre 2026 ; publication automatique par l'API en attente de l'accès standard.
- **Pages légales** : mentions légales (éditeur, hébergeur GitHub Pages, mention Partenaires, images IA), confidentialité (aucun cookie), paragraphe sur les liens affiliés dans « À propos ».
