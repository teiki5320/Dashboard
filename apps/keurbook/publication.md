# PUBLICATION — état de la mise en ligne

> Mis à jour le 21 octobre 2026, d'après le site en ligne, la Search Console et les exécutions GitHub Actions.
>
> Aucun secret ici — uniquement des références.

## En bref

- **Production** : en ligne sur keurbook.com depuis le 1er octobre 2026
- **Domaine & SSL** : Cloudflare, certificat valide jusqu'au 30 décembre 2026, renouvelé seul
- **Visibilité** : 673 pages indexées par Google sur 971, IndexNow chaque lundi
- **Contact** : keurbook@toakeur.com

## Boutiques

| | 🌐 Site |
|---|---|
| État | [ok] En ligne, réponse 200 |
| Hébergement | [ok] Cloudflare Pages, projet keurbook |
| Domaine | [ok] keurbook.com, www redirigé (301) |
| SSL | [ok] Certificat Cloudflare, HSTS actif |
| Indexation | [à faire] 673 / 971 pages indexées par Google |
| Mesure d'audience | [ok] Cloudflare Web Analytics, sans cookie |

## Ce qui reste, dans l'ordre

1. ✅ **Mise en ligne** : site publié sur keurbook.com par Cloudflare Pages le 1er octobre 2026.
2. ✅ **Search Console et IndexNow** : sitemap envoyé à Google, tout le site signalé chaque lundi.
3. ✅ **Publicité préparée** : script AdSense, ads.txt et 4 blocs d'annonces publiés le 12 octobre (aucune annonce affichée avant la validation).
4. **Validation AdSense** : examen demandé le 12 octobre, toujours en cours ; suivre l'avis de Google dans la console AdSense.
5. **Indexation complète** : faire entrer dans Google les 298 pages encore absentes.
6. ✅ **Mesure d'audience** : Cloudflare Web Analytics autorisé dans `public/_headers` le 13 octobre.
7. **Design définitif** : remplacer l'habillage provisoire par le design fait à part.

## Web · Production

| | |
|---|---|
| Adresse | **En ligne** sur https://keurbook.com (vérifié le 21 octobre 2026 : réponse 200) |
| Hébergeur | Cloudflare Pages (projet `keurbook`), workflow `deploy.yml` |
| Dernière publication | 21 octobre 2026 (7 h 46 UTC), publication réussie ; celle de 1 h 40 UTC a mis en ligne l'article Conseils du jour |
| Mise en ligne | 1er octobre 2026 |
| Dépôt | https://github.com/teiki5320/keurbook |
| Taille publiée | 972 adresses dans le sitemap (21 octobre 2026) |
| Contact affiché | `keurbook@toakeur.com` |
| Maintenance | désactivée (`content/maintenance.json`) |

## Domaine & SSL

- **Domaine** : `keurbook.com` (adresse canonique) ; `www.keurbook.com` redirige vers elle (301).
- **Registraire et DNS** : Cloudflare.
- **SSL** : certificat fourni et renouvelé par Cloudflare (valide jusqu'au 30 décembre 2026) ;
  HSTS activé dans `public/_headers`.
- L'ancienne version provisoire sur GitHub Pages est arrêtée : son adresse ne répond plus.

## Visibilité

- **Sitemap** : https://keurbook.com/sitemap.xml répond (972 adresses le 21 octobre 2026) ; `robots.txt` autorise
  tout et cite le sitemap.
- **Google Search Console** : propriété de domaine `keurbook.com`, sitemap envoyé le 1er octobre
  2026 et renvoyé le 16 octobre, lu par Google le 20 octobre. Search Console au 20 octobre 2026 :
  673 pages indexées sur 971, 298 pas encore (159 inconnues de Google, 139 détectées mais non
  explorées).
- **IndexNow** (Bing, Yandex…) : tout le sitemap est signalé chaque lundi ; dernière exécution
  réussie le 19 octobre 2026.
- **Mesure d'audience** : Cloudflare Web Analytics (sans cookie), balise constatée en ligne le
  14 octobre 2026 ; chiffres à vérifier dans la console.
- **Publicité** : Google AdSense en place (script chargé sur les pages, `https://keurbook.com/ads.txt`
  répond). Validation du site par AdSense : en examen depuis le 12 octobre 2026, aucune annonce
  affichée pour l'instant.
