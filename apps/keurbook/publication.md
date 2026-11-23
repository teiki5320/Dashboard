# PUBLICATION — état de la mise en ligne

> Mis à jour le 23 novembre 2026, d'après le site en ligne, la Search Console, la console AdSense et les exécutions GitHub Actions.
>
> Aucun secret ici — uniquement des références.

## En bref

- **Production** : en ligne sur keurbook.com depuis le 1er octobre 2026
- **Domaine & SSL** : Cloudflare, certificat valide jusqu'au 30 décembre 2026, renouvelé seul
- **Visibilité** : 276 pages indexées par Google sur 989 (23 novembre), IndexNow après chaque publication et chaque lundi
- **Contact** : keurbook@toakeur.com

## Boutiques

| | 🌐 Site |
|---|---|
| État | [ok] En ligne, réponse 200 |
| Hébergement | [ok] Cloudflare Pages, projet keurbook |
| Domaine | [ok] keurbook.com, www redirigé (301) |
| SSL | [ok] Certificat Cloudflare, HSTS actif |
| Indexation | [à faire] 276 / 989 pages indexées par Google |
| Mesure d'audience | [ok] Cloudflare Web Analytics, sans cookie ; Umami en essai depuis le 5 novembre |

## Ce qui reste, dans l'ordre

1. ✅ **Mise en ligne** : site publié sur keurbook.com par Cloudflare Pages le 1er octobre 2026.
2. ✅ **Search Console et IndexNow** : sitemap envoyé à Google, tout le site signalé après chaque publication et chaque lundi.
3. ✅ **Publicité préparée** : script AdSense, ads.txt et 4 blocs d'annonces publiés le 12 octobre (aucune annonce affichée avant la validation).
4. ✅ **Fiches rallongées** : refus AdSense du 21 octobre (contenu trop mince) ; les 796 fiches ont reçu « Le livre en détail » le 21 octobre.
5. **Validation AdSense** : nouvel examen demandé le 22 octobre, « En préparation » dans la console (vérifié le 15 novembre 2026 ; aucun courriel d'AdSense depuis) ; suivre l'avis de Google dans la console AdSense.
6. **Indexation complète** : faire entrer dans Google les 713 pages encore absentes.
7. ✅ **Mesure d'audience** : Cloudflare Web Analytics autorisé dans `public/_headers` le 13 octobre.
8. **Design définitif** : remplacer l'habillage provisoire par le design fait à part.

## Web · Production

| | |
|---|---|
| Adresse | **En ligne** sur https://keurbook.com (vérifié le 23 novembre 2026 : réponse 200) |
| Hébergeur | Cloudflare Pages (projet `keurbook`), workflow `deploy.yml` |
| Dernière publication | 23 novembre 2026 à 4 h 17 UTC (envoi sur `main`), réussie, suivie d'IndexNow réussi à 4 h 20 UTC ; `version.txt` sert le dernier envoi (84f6bc8, 23 novembre 2026) (vérifié le 23 novembre 2026) ; les précédentes, le 22 novembre à 18 h 39 et 23 h 52 UTC et le 23 novembre à 3 h 43 UTC (programmées), ont réussi |
| Mise en ligne | 1er octobre 2026 |
| Dépôt | https://github.com/teiki5320/keurbook |
| Taille publiée | 989 adresses dans le sitemap (le 23 novembre 2026 : dont 54 articles Conseils et la page À propos ; la page Actus et les 23 articles d'actus en sont sortis le 19 novembre 2026, en `noindex`) ; 987 du 20 au 22 novembre, avec 52 articles Conseils ; 1010 les 18 et 19 novembre, avec 51 articles Conseils et 23 articles d'actus ; 1006 les 16 et 17 novembre, avec 49 articles Conseils et 21 articles d'actus ; 1003 du 13 au 15 novembre, avec 48 articles Conseils et 20 articles d'actus ; 1001 les 11 et 12 novembre, avec 47 articles Conseils et 19 articles d'actus ; 999 le 10 novembre, 998 le 9 novembre, 996 le 8 novembre, 995 les 6 et 7 novembre, 992 le 5 novembre, 993 le 4 novembre, 991 le 2 novembre, 988 le 1er novembre, 987 le 31 octobre, 984 le 30 octobre, 982 le 29 octobre, 980 le 28 octobre, 975 le 27 octobre, 974 jusqu'au 26 octobre, avant la page Actus) |
| Contact affiché | `keurbook@toakeur.com` |
| Maintenance | désactivée (`content/maintenance.json`) |

## Domaine & SSL

- **Domaine** : `keurbook.com` (adresse canonique) ; `www.keurbook.com` redirige vers elle (301).
- **Registraire et DNS** : Cloudflare.
- **SSL** : certificat fourni et renouvelé par Cloudflare (valide jusqu'au 30 décembre 2026) ;
  HSTS activé dans `public/_headers`.
- L'ancienne version provisoire sur GitHub Pages est arrêtée : son adresse ne répond plus.

## Visibilité

- **Sitemap** : https://keurbook.com/sitemap.xml répond (989 adresses le 23 novembre 2026, sans les actus ; 987 du 20 au 22 novembre ; 1010 les 18 et 19 novembre 2026 ; 1006 les 16 et 17 novembre ; 1003 du 13 au 15 novembre ; 1001 les 11 et 12 novembre, 999 le 10 novembre, 998 le 9 novembre, 996 le 8 novembre, 995 les 6 et 7 novembre, 992 le 5 novembre, 993 le 4 novembre, 991 le 2 novembre, 988 le 1er novembre, 987 le 31 octobre, 984 le 30 octobre, 982 le 29 octobre, 980 le 28 octobre, 975 le 27 octobre) ; `robots.txt` autorise
  tout et cite le sitemap et, depuis le 18 novembre 2026, le flux RSS des conseils (https://keurbook.com/feed.xml, 30 derniers éléments, sans les actus depuis le 19 novembre 2026, répond 200 le 23 novembre 2026).
- **Google Search Console** : propriété de domaine `keurbook.com`, sitemap envoyé le 1er octobre
  2026, renvoyé le 16, le 20 et le 28 octobre puis le 4 et le 11 novembre 2026, et le 19 novembre 2026 avec le flux RSS, tous deux lus par Google le 19 novembre (aucune erreur). Search Console
  (onglet Indexation du Studio) au 23 novembre 2026 : 276 pages indexées sur 989, 713 pas encore
  (289 inconnues de Google, 424 explorées mais pas indexées, dont 357 fiches livres) ; 282 sur 987 les 21 et 22 novembre (289 inconnues, 416 explorées, dont 351 fiches livres) ; 282 sur 986 le 20 novembre (288 inconnues, 416 explorées) ; 282 sur 1010 le 19 novembre (312 inconnues, 416 explorées) ; 282 sur 1008 le 18 novembre (312 inconnues, 414 explorées) ; 282 sur 1003 le 15 novembre (308 inconnues, 413 explorées) ; 321 sur 1003 le 14 novembre (308 inconnues, 374 explorées), 321 sur 1003 le 13 novembre (310 inconnues, 372 explorées), 321 sur 1001 le 12 novembre (308 inconnues, 372 explorées), 440 sur 1001 le 11 novembre (308 inconnues, 253 explorées), 490 sur 999 le 10 novembre (306 inconnues, 203 explorées), 490 sur 998 le 9 novembre (305 inconnues, 203 explorées), 591 sur 996 le 8 novembre (303 inconnues, 102 explorées), 649 sur 995 le 7 novembre (305 inconnues, 41 explorées) et le 6 novembre (311 et 35), 650 sur 993 le 5 novembre, 663 sur 993 le 4 novembre, 663 sur 991 le 2 novembre, 675 sur 988 le 1er novembre, 675 sur 987 le 31 octobre, 677 sur 984 le 30 octobre, 680 sur 982 le 29 octobre, 680 sur 980 le 28 octobre, 679 sur 975 le 27 octobre, 673 sur 971 le 20 octobre.
- **IndexNow** (Bing, Yandex…) : tout le sitemap est signalé après chaque publication réussie de `main`
  (depuis le 28 octobre 2026) et chaque lundi ; dernière exécution du lundi réussie le 16 novembre 2026 (les précédentes le 9 et le 2 novembre).
- **Mesure d'audience** : Cloudflare Web Analytics (sans cookie), balise constatée en ligne le
  14 octobre 2026 ; Umami (sans cookie) en essai depuis le 5 novembre 2026, balise constatée en ligne le
  6 novembre 2026 ; chiffres à vérifier dans les consoles.
- **Publicité** : Google AdSense en place (script chargé sur les pages, `https://keurbook.com/ads.txt`
  répond). Validation du site par AdSense : première demande d'examen le 12 octobre 2026, refusée le 21 octobre 2026 (« contenu à faible valeur informative ») ; les 796 fiches ont été rallongées le 21 octobre et l'examen a été redemandé le 22 octobre 2026 (nouvel examen « En préparation » dans la console, vérifié le 15 novembre 2026) ; aucune annonce
  affichée pour l'instant.
