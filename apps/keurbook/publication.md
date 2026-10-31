# PUBLICATION — état de la mise en ligne

> Mis à jour le 31 octobre 2026, d'après le site en ligne, la Search Console et les exécutions GitHub Actions.
>
> Aucun secret ici — uniquement des références.

## En bref

- **Production** : en ligne sur keurbook.com depuis le 1er octobre 2026
- **Domaine & SSL** : Cloudflare, certificat valide jusqu'au 30 décembre 2026, renouvelé seul
- **Visibilité** : 675 pages indexées par Google sur 987, IndexNow après chaque publication et chaque lundi
- **Contact** : keurbook@toakeur.com

## Boutiques

| | 🌐 Site |
|---|---|
| État | [ok] En ligne, réponse 200 |
| Hébergement | [ok] Cloudflare Pages, projet keurbook |
| Domaine | [ok] keurbook.com, www redirigé (301) |
| SSL | [ok] Certificat Cloudflare, HSTS actif |
| Indexation | [à faire] 675 / 987 pages indexées par Google |
| Mesure d'audience | [ok] Cloudflare Web Analytics, sans cookie |

## Ce qui reste, dans l'ordre

1. ✅ **Mise en ligne** : site publié sur keurbook.com par Cloudflare Pages le 1er octobre 2026.
2. ✅ **Search Console et IndexNow** : sitemap envoyé à Google, tout le site signalé après chaque publication et chaque lundi.
3. ✅ **Publicité préparée** : script AdSense, ads.txt et 4 blocs d'annonces publiés le 12 octobre (aucune annonce affichée avant la validation).
4. ✅ **Fiches rallongées** : refus AdSense du 21 octobre (contenu trop mince) ; les 796 fiches ont reçu « Le livre en détail » le 21 octobre.
5. **Validation AdSense** : nouvel examen demandé le 22 octobre, « En préparation » dans la console au 31 octobre 2026 ; suivre l'avis de Google dans la console AdSense.
6. **Indexation complète** : faire entrer dans Google les 312 pages encore absentes.
7. ✅ **Mesure d'audience** : Cloudflare Web Analytics autorisé dans `public/_headers` le 13 octobre.
8. **Design définitif** : remplacer l'habillage provisoire par le design fait à part.

## Web · Production

| | |
|---|---|
| Adresse | **En ligne** sur https://keurbook.com (vérifié le 31 octobre 2026 : réponse 200) |
| Hébergeur | Cloudflare Pages (projet `keurbook`), workflow `deploy.yml` |
| Dernière publication | 31 octobre 2026 (4 h 27 UTC), publication réussie après un envoi sur `main` (liens internes vers 4 pages explorées mais pas indexées) ; `version.txt` sert ce commit |
| Mise en ligne | 1er octobre 2026 |
| Dépôt | https://github.com/teiki5320/keurbook |
| Taille publiée | 987 adresses dans le sitemap (31 octobre 2026 : dont 42 articles Conseils et 10 articles d'actus ; 984 le 30 octobre, 982 le 29 octobre, 980 le 28 octobre, 975 le 27 octobre, 974 jusqu'au 26 octobre, avant la page Actus) |
| Contact affiché | `keurbook@toakeur.com` |
| Maintenance | désactivée (`content/maintenance.json`) |

## Domaine & SSL

- **Domaine** : `keurbook.com` (adresse canonique) ; `www.keurbook.com` redirige vers elle (301).
- **Registraire et DNS** : Cloudflare.
- **SSL** : certificat fourni et renouvelé par Cloudflare (valide jusqu'au 30 décembre 2026) ;
  HSTS activé dans `public/_headers`.
- L'ancienne version provisoire sur GitHub Pages est arrêtée : son adresse ne répond plus.

## Visibilité

- **Sitemap** : https://keurbook.com/sitemap.xml répond (987 adresses le 31 octobre 2026 ; 984 le 30 octobre, 982 le 29 octobre, 980 le 28 octobre, 975 le 27 octobre) ; `robots.txt` autorise
  tout et cite le sitemap.
- **Google Search Console** : propriété de domaine `keurbook.com`, sitemap envoyé le 1er octobre
  2026, renvoyé le 16, le 20 puis le 28 octobre, lu par Google le 28 octobre (aucune erreur). Search Console
  (onglet Indexation du Studio) au 31 octobre 2026 : 675 pages indexées sur 987, 312 pas encore
  (307 inconnues de Google, 5 explorées mais pas indexées) ; 677 sur 984 le 30 octobre, 680 sur 982 le 29 octobre, 680 sur 980 le 28 octobre, 679 sur 975 le 27 octobre, 673 sur 971 le 20 octobre.
- **IndexNow** (Bing, Yandex…) : tout le sitemap est signalé après chaque publication réussie de `main`
  (depuis le 28 octobre 2026) et chaque lundi ; dernière exécution du lundi réussie le 26 octobre 2026.
- **Mesure d'audience** : Cloudflare Web Analytics (sans cookie), balise constatée en ligne le
  14 octobre 2026 ; chiffres à vérifier dans la console.
- **Publicité** : Google AdSense en place (script chargé sur les pages, `https://keurbook.com/ads.txt`
  répond). Validation du site par AdSense : première demande d'examen le 12 octobre 2026, refusée le 21 octobre 2026 (« contenu à faible valeur informative ») ; les 796 fiches ont été rallongées le 21 octobre et l'examen a été redemandé le 22 octobre 2026 (nouvel examen « En préparation » dans la console, vérifié le 31 octobre 2026) ; aucune annonce
  affichée pour l'instant.
