# PUBLICATION — état de la mise en ligne

> Généré le 30 septembre 2026, mis à jour le 2 octobre 2026 d'après le dépôt (côté Dashboard : si le dépôt crée sa propre fiche docs/PUBLICATION.md, elle remplacera celle-ci à la synchro suivante).
>
> Aucun secret ici — uniquement des références.

## Vue d'ensemble

| | |
|---|---|
| Web · Production | **En ligne** sur https://www.keurdeco.com/ (`keurdeco.com` redirige vers `www`) |
| Hébergeur | GitHub Pages (déploiement par le workflow `pages.yml` : tests, build, test de bout en bout, publication) |
| Rythme | à chaque push sur `main` + chaque lundi à 5 h UTC (articles programmés) + à la demande |
| Éditeur | ALOHASH (SAS, nom commercial TOA CORP) — voir `mentions-legales.html` |

## Domaine & SSL

- **Domaine** : `keurdeco.com` enregistré chez **Cloudflare** (renouvellement automatique), actif depuis le 29 septembre 2026.
- **DNS** : 4 enregistrements A vers GitHub Pages + CNAME `www` → `teiki5320.github.io`, **proxy Cloudflare désactivé** (nécessaire au certificat GitHub).
- **SSL** : certificat émis par GitHub Pages, *Enforce HTTPS* coché ; domaine personnalisé `www.keurdeco.com` (fichier `public/CNAME`).

## Visibilité

- **Référencement** : `sitemap.xml` limité aux pages indexables (avec `lastmod`), rubriques sans article en `noindex`, `robots.txt`, Open Graph, données structurées Article / ItemList / FAQ / fil d'Ariane, nom du site retiré des titres de plus de 65 caractères. Pages signalées à Bing par IndexNow chaque lundi après la publication. Balise Search Console prête (`GOOGLE_VERIFY`) — inscription à vérifier dans la console.
- **Mesure d'audience** : Cloudflare Web Analytics (sans cookie), en place — chiffres à vérifier dans la console.
- **Pinterest** : balise `p:domain_verify` prête (`PINTEREST_VERIFY`), Rich Pins via Open Graph + données structurées ; publication automatique quotidienne (7 h 17 UTC) dès que l'accès API est accordé, import CSV manuel par lots de 30 jours (`npm run pinterest:lot`) en attendant.
- **Pages légales** : mentions légales (ALOHASH SAS, hébergeur GitHub Pages, mention Partenaires, images IA), confidentialité (aucun cookie), paragraphe liens affiliés dans « À propos ».

## Ce qui reste, dans l'ordre

1. **Pinterest** — obtenir l'accès à l'API (vidéo de démonstration exigée), recopier le refresh token dans les secrets GitHub ; d'ici là, publier les épingles par l'import CSV.
2. **Google** — vérifier l'inscription à la Search Console et l'indexation des premières pages.
3. **Images** — fait côté dépôt : les 37 articles portent une image créée par IA (`image_ia: true`).
