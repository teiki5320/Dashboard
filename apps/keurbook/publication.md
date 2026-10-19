# PUBLICATION — état de la mise en ligne

> Mis à jour le 19 octobre 2026, d'après le site en ligne, la Search Console et les exécutions GitHub Actions.
>
> Aucun secret ici — uniquement des références.

## En bref

- **Production** : en ligne sur keurbook.com depuis le 1er octobre 2026
- **Domaine & SSL** : Cloudflare, certificat valide jusqu'au 30 décembre 2026, renouvelé seul
- **Visibilité** : 663 pages indexées par Google sur 960, IndexNow chaque lundi
- **Contact** : keurbook@toakeur.com

## Boutiques

| | 🌐 Site |
|---|---|
| État | [ok] En ligne, réponse 200 |
| Hébergement | [ok] Cloudflare Pages, projet keurbook |
| Domaine | [ok] keurbook.com, www redirigé (301) |
| SSL | [ok] Certificat Cloudflare, HSTS actif |
| Indexation | [à faire] 663 / 960 pages indexées par Google |
| Mesure d'audience | [ok] Cloudflare Web Analytics, sans cookie |

## Ce qui reste, dans l'ordre

1. ✅ **Mise en ligne** : site publié sur keurbook.com par Cloudflare Pages le 1er octobre 2026.
2. ✅ **Search Console et IndexNow** : sitemap envoyé à Google, tout le site signalé chaque lundi.
3. ✅ **Publicité en place** : script AdSense, ads.txt et 4 blocs d'annonces publiés le 12 octobre.
4. **Validation AdSense** : attendre et suivre l'avis de Google dans la console AdSense.
5. **Indexation complète** : faire entrer dans Google les 297 pages encore absentes.
6. ✅ **Mesure d'audience** : Cloudflare Web Analytics autorisé dans `public/_headers` le 13 octobre.
7. **Design définitif** : remplacer l'habillage provisoire par le design fait à part.

## Web · Production

| | |
|---|---|
| Adresse | **En ligne** sur https://keurbook.com (vérifié le 13 octobre 2026 : réponse 200) |
| Hébergeur | Cloudflare Pages (projet `keurbook`), workflow `deploy.yml` |
| Dernière publication | 13 octobre 2026 (8 h UTC), publication réussie après la mise à jour des fiches |
| Mise en ligne | 1er octobre 2026 |
| Dépôt | https://github.com/teiki5320/keurbook |
| Taille publiée | 960 adresses dans le sitemap |
| Contact affiché | `keurbook@toakeur.com` |
| Maintenance | désactivée (`content/maintenance.json`) |

## Domaine & SSL

- **Domaine** : `keurbook.com` (adresse canonique) ; `www.keurbook.com` redirige vers elle (301).
- **Registraire et DNS** : Cloudflare.
- **SSL** : certificat fourni et renouvelé par Cloudflare (valide jusqu'au 30 décembre 2026) ;
  HSTS activé dans `public/_headers`.
- L'ancienne version provisoire sur GitHub Pages est arrêtée : son adresse ne répond plus.

## Visibilité

- **Sitemap** : https://keurbook.com/sitemap.xml répond (960 adresses) ; `robots.txt` autorise
  tout et cite le sitemap.
- **Google Search Console** : propriété de domaine `keurbook.com`, sitemap envoyé le 1er octobre
  2026 et renvoyé le 12 octobre. Search Console au 19 octobre 2026 : 663 pages indexées sur 960,
  297 pas encore (160 inconnues de Google, 137 détectées mais non explorées).
- **IndexNow** (Bing, Yandex…) : tout le sitemap est signalé chaque lundi ; dernière exécution
  réussie le 12 octobre 2026.
- **Mesure d'audience** : Cloudflare Web Analytics (sans cookie), balise constatée en ligne le
  14 octobre 2026 ; chiffres à vérifier dans la console.
- **Publicité** : Google AdSense en place (script chargé sur les pages, `https://keurbook.com/ads.txt`
  répond). Validation du site par AdSense : à vérifier dans la console.
