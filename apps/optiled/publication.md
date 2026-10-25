# PUBLICATION — état de la mise en ligne

> Généré le 21 octobre 2026, mis à jour le 25 octobre 2026. Aucun secret ici.

## En bref

- **Production** : en ligne sur https://www.kultiled.com/ (GitHub Pages)
- **Domaine & SSL** : kultiled.com chez Cloudflare, HTTPS par GitHub Pages
- **Visibilité** : nouveau domaine dans Search Console et Bing, AdSense en examen
- **Contact** : kultiled@toakeur.com

## Boutiques

| | 🌐 Site |
|---|---|
| État | [ok] En ligne, réponse 200 le 25 octobre 2026 |
| Hébergement | [ok] GitHub Pages, publication automatique par GitHub Actions |
| Domaine | [ok] www.kultiled.com (Cloudflare) depuis le 16 octobre 2026 |
| SSL | [ok] certificat GitHub Pages, HTTPS forcé |
| Indexation | [à faire] nouveau domaine à faire indexer, IndexNow chaque lundi |
| Mesure d'audience | [ok] Cloudflare Web Analytics, sans cookie |

## Ce qui reste, dans l'ordre

1. ✅ **Site en ligne** : www.kultiled.com publié par GitHub Pages, HTTPS forcé, anciennes adresses redirigées.
2. ✅ **Revenus branchés** : affiliation Amazon et publicité AdSense en ligne, mentions légales à jour.
3. **Validation AdSense** : obtenir l'accord de Google pour kultiled.com, examen demandé le 16 octobre.
4. **Indexation complète** : faire entrer dans Google les 100 adresses du plan du site sous le nouveau domaine.

## Web · Production

- **État** : ✅ en ligne (réponse 200 constatée le 25 octobre 2026)
- **URL** : https://www.kultiled.com/
- **Hébergeur** : GitHub Pages, publication automatique à chaque envoi sur `main` et chaque lundi, mercredi et vendredi pour les articles programmés (`.github/workflows/pages.yml` : tests unitaires, build, test de bout en bout, puis mise en ligne). Aucune action manuelle.
- **Anciennes adresses** : https://teiki5320.github.io/optiled/ et `kultiled.com` redirigent vers `www.kultiled.com` (301) ; `www.optiled.fr`, abandonné le 16 octobre 2026, affichait encore le 25 octobre 2026 une page « Kultiled a déménagé » vers le nouveau domaine (dépôt `teiki5320/optiled-redirection`).
- **Dernière mise en production** : 25 octobre 2026, publication réussie (vérification quotidienne des lampes) ; les pages « Top 10 » ont été mises en ligne le 19 octobre 2026 ; le 16 octobre, le site est devenu Kultiled (nom, logo, contact) et a changé de domaine.
- **Articles de conseil** : 39 en ligne, 35 programmés jusqu'au 7 juin 2027 (le prochain le 26 octobre 2026).
- **Contact affiché** : `kultiled@toakeur.com` (mentions légales et « À propos »).

## Domaine & SSL

- **Domaine** : `kultiled.com`, acheté chez Cloudflare le 16 octobre 2026 ; `www.kultiled.com` est l'adresse principale, `kultiled.com` redirige vers elle (301 constaté le 20 octobre 2026).
- **DNS** (Cloudflare) : deux CNAME, `@` et `www` → `teiki5320.github.io`, proxy désactivé.
- **Dans le code** : `public/CNAME` contient `www.kultiled.com` ; `SITE_URL` vaut `https://www.kultiled.com/` (`build/site.ts`).
- **SSL** : certificat émis et renouvelé automatiquement par GitHub Pages ; HTTPS forcé.
- **Ancien domaine** : `optiled.fr` (IONOS), abandonné le 16 octobre 2026 et supprimé d'AdSense le 22 octobre 2026 ; il servait encore la page de redirection le 25 octobre 2026, jusqu'à la fin du contrat IONOS en novembre 2026.
- **Échéance de kultiled.com** : à vérifier dans la console Cloudflare.

## Visibilité

- **Référencement** : sitemap (`sitemap.xml`, 100 adresses le 25 octobre 2026) et `robots.txt` générés au build, adresses canoniques, balises Open Graph et Twitter Card avec une image de partage par page, données structurées schema.org sur toutes les pages.
- **Google Search Console** : `kultiled.com` ajouté le 16 octobre 2026, comme dans Bing Webmaster Tools ; l'ancienne propriété `optiled.fr` y avait été vérifiée avant le changement de domaine (état actuel à vérifier dans la console).
- **Pages indexées** : à vérifier dans la console pour le nouveau domaine (62 des 86 adresses sous `optiled.fr` au 12 octobre 2026).
- **IndexNow** : pages signalées chaque lundi à Bing et aux autres moteurs (dernier passage réussi le 19 octobre 2026).
- **Analytics** : Cloudflare Web Analytics actif sur le site en ligne depuis le 12 octobre 2026 (sans cookie), décrit comme tel dans les mentions légales.
- **Publicité** : Google AdSense en ligne depuis le 12 octobre 2026 (script, bandeau de consentement de Google, lien « Gérer les cookies », `ads.txt` constatés le 13 octobre 2026) ; examen du nouveau domaine demandé le 16 octobre 2026 ; l'ancien site `optiled.fr` a été supprimé du compte AdSense le 22 octobre 2026 ; diffusion des annonces à vérifier dans la console AdSense.
- **PWA** : installable sur mobile, consultable hors ligne.
