# PUBLICATION — état de la mise en ligne

> Mis à jour le 13 novembre 2026, d'après le site en ligne, la Search Console, la console AdSense et les exécutions GitHub Actions.
>
> Aucun secret ici — uniquement des références.

## En bref

- **Production** : en ligne sur keurbook.com depuis le 1er octobre 2026
- **Domaine & SSL** : Cloudflare, certificat valide jusqu'au 30 décembre 2026, renouvelé seul
- **Visibilité** : 321 pages indexées par Google sur 1003, IndexNow après chaque publication et chaque lundi
- **Contact** : keurbook@toakeur.com

## Boutiques

| | 🌐 Site |
|---|---|
| État | [ok] En ligne, réponse 200 |
| Hébergement | [ok] Cloudflare Pages, projet keurbook |
| Domaine | [ok] keurbook.com, www redirigé (301) |
| SSL | [ok] Certificat Cloudflare, HSTS actif |
| Indexation | [à faire] 321 / 1003 pages indexées par Google |
| Mesure d'audience | [ok] Cloudflare Web Analytics, sans cookie ; Umami en essai depuis le 5 novembre |

## Ce qui reste, dans l'ordre

1. ✅ **Mise en ligne** : site publié sur keurbook.com par Cloudflare Pages le 1er octobre 2026.
2. ✅ **Search Console et IndexNow** : sitemap envoyé à Google, tout le site signalé après chaque publication et chaque lundi.
3. ✅ **Publicité préparée** : script AdSense, ads.txt et 4 blocs d'annonces publiés le 12 octobre (aucune annonce affichée avant la validation).
4. ✅ **Fiches rallongées** : refus AdSense du 21 octobre (contenu trop mince) ; les 796 fiches ont reçu « Le livre en détail » le 21 octobre.
5. **Validation AdSense** : nouvel examen demandé le 22 octobre, « En préparation » dans la console (vérifié le 12 novembre 2026 ; aucun courriel d'AdSense depuis) ; suivre l'avis de Google dans la console AdSense.
6. **Indexation complète** : faire entrer dans Google les 680 pages encore absentes.
7. ✅ **Mesure d'audience** : Cloudflare Web Analytics autorisé dans `public/_headers` le 13 octobre.
8. **Design définitif** : remplacer l'habillage provisoire par le design fait à part.

## Web · Production

| | |
|---|---|
| Adresse | **En ligne** sur https://keurbook.com (vérifié le 13 novembre 2026 : réponse 200) |
| Hébergeur | Cloudflare Pages (projet `keurbook`), workflow `deploy.yml` |
| Dernière publication | 13 novembre 2026 à 3 h 25 UTC (publication programmée), réussie, suivie d'IndexNow réussi à 3 h 28 UTC ; `version.txt` sert le dernier envoi (50f39a6, 12 novembre 2026) (vérifié le 13 novembre 2026) ; la précédente, le 12 novembre à 20 h 02 UTC (envoi sur `main`), a réussi |
| Mise en ligne | 1er octobre 2026 |
| Dépôt | https://github.com/teiki5320/keurbook |
| Taille publiée | 1003 adresses dans le sitemap (13 novembre 2026 : dont 48 articles Conseils et 20 articles d'actus ; 1001 les 11 et 12 novembre, avec 47 articles Conseils et 19 articles d'actus ; 999 le 10 novembre, 998 le 9 novembre, 996 le 8 novembre, 995 les 6 et 7 novembre, 992 le 5 novembre, 993 le 4 novembre, 991 le 2 novembre, 988 le 1er novembre, 987 le 31 octobre, 984 le 30 octobre, 982 le 29 octobre, 980 le 28 octobre, 975 le 27 octobre, 974 jusqu'au 26 octobre, avant la page Actus) |
| Contact affiché | `keurbook@toakeur.com` |
| Maintenance | désactivée (`content/maintenance.json`) |

## Domaine & SSL

- **Domaine** : `keurbook.com` (adresse canonique) ; `www.keurbook.com` redirige vers elle (301).
- **Registraire et DNS** : Cloudflare.
- **SSL** : certificat fourni et renouvelé par Cloudflare (valide jusqu'au 30 décembre 2026) ;
  HSTS activé dans `public/_headers`.
- L'ancienne version provisoire sur GitHub Pages est arrêtée : son adresse ne répond plus.

## Visibilité

- **Sitemap** : https://keurbook.com/sitemap.xml répond (1003 adresses le 13 novembre 2026 ; 1001 les 11 et 12 novembre, 999 le 10 novembre, 998 le 9 novembre, 996 le 8 novembre, 995 les 6 et 7 novembre, 992 le 5 novembre, 993 le 4 novembre, 991 le 2 novembre, 988 le 1er novembre, 987 le 31 octobre, 984 le 30 octobre, 982 le 29 octobre, 980 le 28 octobre, 975 le 27 octobre) ; `robots.txt` autorise
  tout et cite le sitemap.
- **Google Search Console** : propriété de domaine `keurbook.com`, sitemap envoyé le 1er octobre
  2026, renvoyé le 16, le 20 et le 28 octobre puis le 4 et le 11 novembre 2026, lu par Google le 11 novembre (aucune erreur). Search Console
  (onglet Indexation du Studio) au 13 novembre 2026 : 321 pages indexées sur 1003, 682 pas encore
  (310 inconnues de Google, 372 explorées mais pas indexées, dont 334 fiches livres) ; 321 sur 1001 le 12 novembre (308 inconnues, 372 explorées), 440 sur 1001 le 11 novembre (308 inconnues, 253 explorées), 490 sur 999 le 10 novembre (306 inconnues, 203 explorées), 490 sur 998 le 9 novembre (305 inconnues, 203 explorées), 591 sur 996 le 8 novembre (303 inconnues, 102 explorées), 649 sur 995 le 7 novembre (305 inconnues, 41 explorées) et le 6 novembre (311 et 35), 650 sur 993 le 5 novembre, 663 sur 993 le 4 novembre, 663 sur 991 le 2 novembre, 675 sur 988 le 1er novembre, 675 sur 987 le 31 octobre, 677 sur 984 le 30 octobre, 680 sur 982 le 29 octobre, 680 sur 980 le 28 octobre, 679 sur 975 le 27 octobre, 673 sur 971 le 20 octobre.
- **IndexNow** (Bing, Yandex…) : tout le sitemap est signalé après chaque publication réussie de `main`
  (depuis le 28 octobre 2026) et chaque lundi ; dernière exécution du lundi réussie le 9 novembre 2026 (les précédentes le 2 novembre et le 26 octobre).
- **Mesure d'audience** : Cloudflare Web Analytics (sans cookie), balise constatée en ligne le
  14 octobre 2026 ; Umami (sans cookie) en essai depuis le 5 novembre 2026, balise constatée en ligne le
  6 novembre 2026 ; chiffres à vérifier dans les consoles.
- **Publicité** : Google AdSense en place (script chargé sur les pages, `https://keurbook.com/ads.txt`
  répond). Validation du site par AdSense : première demande d'examen le 12 octobre 2026, refusée le 21 octobre 2026 (« contenu à faible valeur informative ») ; les 796 fiches ont été rallongées le 21 octobre et l'examen a été redemandé le 22 octobre 2026 (nouvel examen « En préparation » dans la console, vérifié le 12 novembre 2026) ; aucune annonce
  affichée pour l'instant.
