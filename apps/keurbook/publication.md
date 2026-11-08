# PUBLICATION — état de la mise en ligne

> Mis à jour le 8 novembre 2026, d'après le site en ligne, la Search Console, la console AdSense et les exécutions GitHub Actions.
>
> Aucun secret ici — uniquement des références.

## En bref

- **Production** : en ligne sur keurbook.com depuis le 1er octobre 2026
- **Domaine & SSL** : Cloudflare, certificat valide jusqu'au 30 décembre 2026, renouvelé seul
- **Visibilité** : 591 pages indexées par Google sur 996, IndexNow après chaque publication et chaque lundi
- **Contact** : keurbook@toakeur.com

## Boutiques

| | 🌐 Site |
|---|---|
| État | [ok] En ligne, réponse 200 |
| Hébergement | [ok] Cloudflare Pages, projet keurbook |
| Domaine | [ok] keurbook.com, www redirigé (301) |
| SSL | [ok] Certificat Cloudflare, HSTS actif |
| Indexation | [à faire] 591 / 996 pages indexées par Google |
| Mesure d'audience | [ok] Cloudflare Web Analytics, sans cookie ; Umami en essai depuis le 5 novembre |

## Ce qui reste, dans l'ordre

1. ✅ **Mise en ligne** : site publié sur keurbook.com par Cloudflare Pages le 1er octobre 2026.
2. ✅ **Search Console et IndexNow** : sitemap envoyé à Google, tout le site signalé après chaque publication et chaque lundi.
3. ✅ **Publicité préparée** : script AdSense, ads.txt et 4 blocs d'annonces publiés le 12 octobre (aucune annonce affichée avant la validation).
4. ✅ **Fiches rallongées** : refus AdSense du 21 octobre (contenu trop mince) ; les 796 fiches ont reçu « Le livre en détail » le 21 octobre.
5. **Validation AdSense** : nouvel examen demandé le 22 octobre, « En préparation » dans la console (vérifié le 8 novembre 2026 ; aucun courriel d'AdSense depuis) ; suivre l'avis de Google dans la console AdSense.
6. **Indexation complète** : faire entrer dans Google les 405 pages encore absentes.
7. ✅ **Mesure d'audience** : Cloudflare Web Analytics autorisé dans `public/_headers` le 13 octobre.
8. **Design définitif** : remplacer l'habillage provisoire par le design fait à part.

## Web · Production

| | |
|---|---|
| Adresse | **En ligne** sur https://keurbook.com (vérifié le 8 novembre 2026 : réponse 200) |
| Hébergeur | Cloudflare Pages (projet `keurbook`), workflow `deploy.yml` |
| Dernière publication | 7 novembre 2026 à 22 h 21 UTC (publication programmée), réussie, suivie d'IndexNow réussi à 22 h 24 UTC ; `version.txt` sert le dernier envoi sur `main` (aaa9c12, 7 novembre 2026) (vérifié le 8 novembre 2026) ; les précédentes, le 7 novembre à 13 h 22 UTC (envoi sur `main`) et 16 h 59 UTC (programmée), ont aussi réussi |
| Mise en ligne | 1er octobre 2026 |
| Dépôt | https://github.com/teiki5320/keurbook |
| Taille publiée | 996 adresses dans le sitemap (8 novembre 2026 : dont 45 articles Conseils et 16 articles d'actus ; 995 les 6 et 7 novembre, 992 le 5 novembre, 993 le 4 novembre, 991 le 2 novembre, 988 le 1er novembre, 987 le 31 octobre, 984 le 30 octobre, 982 le 29 octobre, 980 le 28 octobre, 975 le 27 octobre, 974 jusqu'au 26 octobre, avant la page Actus) |
| Contact affiché | `keurbook@toakeur.com` |
| Maintenance | désactivée (`content/maintenance.json`) |

## Domaine & SSL

- **Domaine** : `keurbook.com` (adresse canonique) ; `www.keurbook.com` redirige vers elle (301).
- **Registraire et DNS** : Cloudflare.
- **SSL** : certificat fourni et renouvelé par Cloudflare (valide jusqu'au 30 décembre 2026) ;
  HSTS activé dans `public/_headers`.
- L'ancienne version provisoire sur GitHub Pages est arrêtée : son adresse ne répond plus.

## Visibilité

- **Sitemap** : https://keurbook.com/sitemap.xml répond (996 adresses le 8 novembre 2026 ; 995 les 6 et 7 novembre, 992 le 5 novembre, 993 le 4 novembre, 991 le 2 novembre, 988 le 1er novembre, 987 le 31 octobre, 984 le 30 octobre, 982 le 29 octobre, 980 le 28 octobre, 975 le 27 octobre) ; `robots.txt` autorise
  tout et cite le sitemap.
- **Google Search Console** : propriété de domaine `keurbook.com`, sitemap envoyé le 1er octobre
  2026, renvoyé le 16, le 20 et le 28 octobre puis le 4 novembre 2026, lu par Google le 4 novembre (aucune erreur). Search Console
  (onglet Indexation du Studio) au 8 novembre 2026 : 591 pages indexées sur 996, 405 pas encore
  (303 inconnues de Google, 102 explorées mais pas indexées, dont 67 fiches livres) ; 649 sur 995 le 7 novembre (305 inconnues, 41 explorées) et le 6 novembre (311 et 35), 650 sur 993 le 5 novembre, 663 sur 993 le 4 novembre, 663 sur 991 le 2 novembre, 675 sur 988 le 1er novembre, 675 sur 987 le 31 octobre, 677 sur 984 le 30 octobre, 680 sur 982 le 29 octobre, 680 sur 980 le 28 octobre, 679 sur 975 le 27 octobre, 673 sur 971 le 20 octobre.
- **IndexNow** (Bing, Yandex…) : tout le sitemap est signalé après chaque publication réussie de `main`
  (depuis le 28 octobre 2026) et chaque lundi ; dernière exécution du lundi réussie le 2 novembre 2026 (la précédente le 26 octobre).
- **Mesure d'audience** : Cloudflare Web Analytics (sans cookie), balise constatée en ligne le
  14 octobre 2026 ; Umami (sans cookie) en essai depuis le 5 novembre 2026, balise constatée en ligne le
  6 novembre 2026 ; chiffres à vérifier dans les consoles.
- **Publicité** : Google AdSense en place (script chargé sur les pages, `https://keurbook.com/ads.txt`
  répond). Validation du site par AdSense : première demande d'examen le 12 octobre 2026, refusée le 21 octobre 2026 (« contenu à faible valeur informative ») ; les 796 fiches ont été rallongées le 21 octobre et l'examen a été redemandé le 22 octobre 2026 (nouvel examen « En préparation » dans la console, vérifié le 8 novembre 2026) ; aucune annonce
  affichée pour l'instant.
