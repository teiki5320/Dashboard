# PUBLICATION — état de la mise en ligne

> Généré le 21 octobre 2026, mis à jour le 31 octobre 2026. Aucun secret ici.

## En bref

- **Production** : en ligne sur https://www.kultiled.com/ (GitHub Pages)
- **Domaine & SSL** : kultiled.com chez Cloudflare, HTTPS par GitHub Pages
- **Visibilité** : nouveau domaine dans Search Console et Bing, AdSense en examen
- **Contact** : kultiled@toakeur.com

## Boutiques

| | 🌐 Site |
|---|---|
| État | [ok] En ligne, réponse 200 le 31 octobre 2026 |
| Hébergement | [ok] GitHub Pages, publication automatique par GitHub Actions |
| Domaine | [ok] www.kultiled.com (Cloudflare) depuis le 16 octobre 2026 |
| SSL | [ok] certificat GitHub Pages, HTTPS forcé |
| Indexation | [ok] 98 pages dans l'index (31 octobre 2026), IndexNow après chaque publication (depuis le 28 octobre 2026) et chaque lundi |
| Mesure d'audience | [ok] Cloudflare Web Analytics, sans cookie |

## Ce qui reste, dans l'ordre

1. ✅ **Site en ligne** : www.kultiled.com publié par GitHub Pages, HTTPS forcé, anciennes adresses redirigées.
2. ✅ **Revenus branchés** : affiliation Amazon et publicité AdSense en ligne, mentions légales à jour.
3. **Validation AdSense** : obtenir l'accord de Google pour kultiled.com, examen demandé le 16 octobre, « En préparation » au 31 octobre 2026.
4. **Indexation complète** : faire entrer dans Google les dernières adresses du nouveau domaine (98 pages dans l'index au 31 octobre 2026, sitemap à 116 adresses le même jour) et signaler le changement d'adresse depuis la propriété optiled.fr (pas encore fait au 31 octobre 2026).

## Web · Production

- **État** : ✅ en ligne (réponse 200 constatée le 31 octobre 2026)
- **URL** : https://www.kultiled.com/
- **Hébergeur** : GitHub Pages, publication automatique à chaque envoi sur `main` et chaque lundi, mercredi et vendredi pour les articles programmés, et chaque jour à 11 h 50 et 18 h 50 UTC pour les articles d'actus depuis le 28 octobre 2026 (`.github/workflows/pages.yml` : tests unitaires, build, test de bout en bout, puis mise en ligne ; depuis le 28 octobre 2026, la publication vérifie que www.kultiled.com sert la nouvelle version, via `version.txt`, et échoue sinon). Aucune action manuelle.
- **Anciennes adresses** : https://teiki5320.github.io/optiled/ et `kultiled.com` redirigent vers `www.kultiled.com` (301) ; `www.optiled.fr`, abandonné le 16 octobre 2026, affichait encore le 31 octobre 2026 une page « Kultiled a déménagé » vers le nouveau domaine (dépôt `teiki5320/optiled-redirection`).
- **Dernière mise en production** : 31 octobre 2026, publication réussie (les fiches des cultures affichent dès la construction les articles d'actus qui les concernent ; vérification quotidienne des lampes, ViparSpectra Pro P1000 retirée) ; le 30 octobre 2026, le conseil « Pourquoi mes semis ne lèvent-ils pas ? » avait été publié ; le 29 octobre 2026, le conseil « PAR et PPFD » avait été ajouté hors programme ; les pages « Top 10 » ont été mises en ligne le 19 octobre 2026 ; le 16 octobre, le site est devenu Kultiled (nom, logo, contact) et a changé de domaine.
- **Articles de conseil** : 43 en ligne (dont « PAR et PPFD », ajouté hors programme le 29 octobre 2026, et « Pourquoi mes semis ne lèvent-ils pas ? », publié le 30 octobre 2026), 32 programmés jusqu'au 7 juin 2027 (le prochain le 2 novembre 2026), au 31 octobre 2026.
- **Contact affiché** : `kultiled@toakeur.com` (mentions légales et « À propos »).

## Domaine & SSL

- **Domaine** : `kultiled.com`, acheté chez Cloudflare le 16 octobre 2026 ; `www.kultiled.com` est l'adresse principale, `kultiled.com` redirige vers elle (301 constaté le 28 octobre 2026).
- **DNS** (Cloudflare) : deux CNAME, `@` et `www` → `teiki5320.github.io`, proxy désactivé.
- **Dans le code** : `public/CNAME` contient `www.kultiled.com` ; `SITE_URL` vaut `https://www.kultiled.com/` (`build/site.ts`).
- **SSL** : certificat émis et renouvelé automatiquement par GitHub Pages ; HTTPS forcé.
- **Ancien domaine** : `optiled.fr` (IONOS), abandonné le 16 octobre 2026 et supprimé d'AdSense le 22 octobre 2026 ; il servait encore la page de redirection le 31 octobre 2026, jusqu'à la fin du contrat IONOS en novembre 2026.
- **Échéance de kultiled.com** : à vérifier dans la console Cloudflare.

## Visibilité

- **Référencement** : sitemap (`sitemap.xml`, 102 adresses le 27 octobre 2026 avec la nouvelle page Actus ; 107 le 28 octobre 2026 avec les 4 premières pages d'articles d'actus `actus/<slug>/` et le 41e conseil, puis 106 le même jour après le retrait de la fiche du chanvre, qui répond désormais 404 ; 107 le 29 octobre 2026 avec le 42e conseil ; 112 le 30 octobre 2026 avec le 43e conseil et 8 pages d'articles d'actus ; 116 le 31 octobre 2026 avec 12 pages d'articles d'actus ; nombre qui grandit avec la veille) et `robots.txt` générés au build, adresses canoniques, balises Open Graph et Twitter Card avec une image de partage par page, données structurées schema.org sur toutes les pages.
- **Google Search Console** : `kultiled.com` ajouté le 16 octobre 2026, comme dans Bing Webmaster Tools ; l'ancienne propriété `optiled.fr` y avait été vérifiée avant le changement de domaine ; le changement d'adresse vers kultiled.com n'y est pas encore signalé au 31 octobre 2026 (bouton « Valider et informer Google » toujours proposé).
- **Pages indexées** : 98 pages de kultiled.com dans l'index, 3 détectées et 2 explorées pas encore indexées, le reste en redirections ou doublons voulus (Search Console, vérifié le 31 octobre 2026) ; l'ancien `optiled.fr` en avait 62 sur 86 au 12 octobre 2026.
- **IndexNow** : pages signalées à Bing et aux autres moteurs après chaque publication réussie (depuis le 28 octobre 2026) et chaque lundi (passage du lundi réussi le 26 octobre 2026).
- **Analytics** : Cloudflare Web Analytics actif sur le site en ligne depuis le 12 octobre 2026 (sans cookie), décrit comme tel dans les mentions légales.
- **Publicité** : Google AdSense en ligne depuis le 12 octobre 2026 (script, bandeau de consentement de Google, lien « Gérer les cookies », `ads.txt` constatés le 13 octobre 2026) ; examen du nouveau domaine demandé le 16 octobre 2026, « En préparation » au 31 octobre 2026 (ads.txt affiché « Introuvable » par la console au 30 octobre 2026, alors que le fichier répond) ; l'ancien site `optiled.fr` a été supprimé du compte AdSense le 22 octobre 2026 ; diffusion des annonces à vérifier dans la console AdSense.
- **PWA** : installable sur mobile, consultable hors ligne.
