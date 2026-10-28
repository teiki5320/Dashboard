# PUBLICATION — état de la mise en ligne

> Mis à jour le 28 octobre 2026, d'après le site en ligne, la Search Console et les exécutions GitHub Actions.
>
> Aucun secret ici — uniquement des références.

## En bref

- **Production** : en ligne sur keurbook.com depuis le 1er octobre 2026
- **Domaine & SSL** : Cloudflare, certificat valide jusqu'au 30 décembre 2026, renouvelé seul
- **Visibilité** : 680 pages indexées par Google sur 980, IndexNow chaque lundi
- **Contact** : keurbook@toakeur.com

## Boutiques

| | 🌐 Site |
|---|---|
| État | [ok] En ligne, réponse 200 |
| Hébergement | [ok] Cloudflare Pages, projet keurbook |
| Domaine | [ok] keurbook.com, www redirigé (301) |
| SSL | [ok] Certificat Cloudflare, HSTS actif |
| Indexation | [à faire] 680 / 980 pages indexées par Google |
| Mesure d'audience | [ok] Cloudflare Web Analytics, sans cookie |

## Ce qui reste, dans l'ordre

1. ✅ **Mise en ligne** : site publié sur keurbook.com par Cloudflare Pages le 1er octobre 2026.
2. ✅ **Search Console et IndexNow** : sitemap envoyé à Google, tout le site signalé chaque lundi.
3. ✅ **Publicité préparée** : script AdSense, ads.txt et 4 blocs d'annonces publiés le 12 octobre (aucune annonce affichée avant la validation).
4. ✅ **Fiches rallongées** : refus AdSense du 21 octobre (contenu trop mince) ; les 796 fiches ont reçu « Le livre en détail » le 21 octobre.
5. **Validation AdSense** : nouvel examen demandé le 22 octobre, « En préparation » dans la console au 28 octobre 2026 ; suivre l'avis de Google dans la console AdSense.
6. **Indexation complète** : faire entrer dans Google les 300 pages encore absentes.
7. ✅ **Mesure d'audience** : Cloudflare Web Analytics autorisé dans `public/_headers` le 13 octobre.
8. **Design définitif** : remplacer l'habillage provisoire par le design fait à part.

## Web · Production

| | |
|---|---|
| Adresse | **En ligne** sur https://keurbook.com (vérifié le 28 octobre 2026 : réponse 200) |
| Hébergeur | Cloudflare Pages (projet `keurbook`), workflow `deploy.yml` |
| Dernière publication | 28 octobre 2026 (2 h 18 UTC), publication programmée réussie, qui a mis en ligne l'article Conseils du 28 octobre |
| Mise en ligne | 1er octobre 2026 |
| Dépôt | https://github.com/teiki5320/keurbook |
| Taille publiée | 980 adresses dans le sitemap (28 octobre 2026 : dont 41 articles Conseils et 4 articles d'actus ; 975 le 27 octobre, 974 jusqu'au 26 octobre, avant la page Actus) |
| Contact affiché | `keurbook@toakeur.com` |
| Maintenance | désactivée (`content/maintenance.json`) |

## Domaine & SSL

- **Domaine** : `keurbook.com` (adresse canonique) ; `www.keurbook.com` redirige vers elle (301).
- **Registraire et DNS** : Cloudflare.
- **SSL** : certificat fourni et renouvelé par Cloudflare (valide jusqu'au 30 décembre 2026) ;
  HSTS activé dans `public/_headers`.
- L'ancienne version provisoire sur GitHub Pages est arrêtée : son adresse ne répond plus.

## Visibilité

- **Sitemap** : https://keurbook.com/sitemap.xml répond (980 adresses le 28 octobre 2026 ; 975 le 27 octobre) ; `robots.txt` autorise
  tout et cite le sitemap.
- **Google Search Console** : propriété de domaine `keurbook.com`, sitemap envoyé le 1er octobre
  2026, renvoyé le 16 puis le 20 octobre, lu par Google le 26 octobre (aucune erreur). Search Console
  (onglet Indexation du Studio) au 28 octobre 2026 : 680 pages indexées sur 980, 300 pas encore
  (182 inconnues de Google, 118 détectées mais non explorées) ; 679 sur 975 le 27 octobre, 673 sur 971 le 20 octobre.
- **IndexNow** (Bing, Yandex…) : tout le sitemap est signalé chaque lundi ; dernière exécution
  réussie le 26 octobre 2026.
- **Mesure d'audience** : Cloudflare Web Analytics (sans cookie), balise constatée en ligne le
  14 octobre 2026 ; chiffres à vérifier dans la console.
- **Publicité** : Google AdSense en place (script chargé sur les pages, `https://keurbook.com/ads.txt`
  répond). Validation du site par AdSense : première demande d'examen le 12 octobre 2026, refusée le 21 octobre 2026 (« contenu à faible valeur informative ») ; les 796 fiches ont été rallongées le 21 octobre et l'examen a été redemandé le 22 octobre 2026 (nouvel examen « En préparation » dans la console, vérifié le 28 octobre 2026) ; aucune annonce
  affichée pour l'instant.
