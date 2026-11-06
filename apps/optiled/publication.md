# PUBLICATION — état de la mise en ligne

> Généré le 21 octobre 2026, mis à jour le 6 novembre 2026. Aucun secret ici.

## En bref

- **Production** : en ligne sur https://www.kultiled.com/ (GitHub Pages)
- **Domaine & SSL** : kultiled.com chez Cloudflare, HTTPS par GitHub Pages
- **Visibilité** : nouveau domaine dans Search Console et Bing, AdSense en examen
- **Contact** : kultiled@toakeur.com

## Boutiques

| | 🌐 Site |
|---|---|
| État | [ok] En ligne, réponse 200 le 6 novembre 2026 |
| Hébergement | [ok] GitHub Pages, publication automatique par GitHub Actions |
| Domaine | [ok] www.kultiled.com (Cloudflare) depuis le 16 octobre 2026 |
| SSL | [ok] certificat GitHub Pages, HTTPS forcé |
| Indexation | [ok] 98 pages dans l'index (6 novembre 2026), IndexNow après chaque publication (depuis le 28 octobre 2026) et chaque lundi |
| Mesure d'audience | [ok] Cloudflare Web Analytics et Umami (depuis le 5 novembre 2026), sans cookie |

## Ce qui reste, dans l'ordre

1. ✅ **Site en ligne** : www.kultiled.com publié par GitHub Pages, HTTPS forcé, anciennes adresses redirigées.
2. ✅ **Revenus branchés** : affiliation Amazon et publicité AdSense en ligne, mentions légales à jour.
3. **Validation AdSense** : obtenir l'accord de Google pour kultiled.com, examen demandé le 16 octobre, « En préparation » au 6 novembre 2026 (console vérifiée ce jour-là), aucun mail de décision au 6 novembre 2026.
4. **Indexation complète** : faire entrer dans Google les dernières adresses du nouveau domaine (98 pages dans l'index au 6 novembre 2026, sitemap à 133 adresses le même jour) et signaler le changement d'adresse depuis la propriété optiled.fr (pas encore signalé au 6 novembre 2026 : à faire par Jean, la routine automatique ne peut pas modifier un réglage du compte Google).

## Web · Production

- **État** : ✅ en ligne (réponse 200 constatée le 6 novembre 2026)
- **URL** : https://www.kultiled.com/
- **Hébergeur** : GitHub Pages, publication automatique à chaque envoi sur `main` et chaque lundi, mercredi et vendredi pour les articles programmés, et chaque jour à 11 h 50 et 18 h 50 UTC pour les articles d'actus depuis le 28 octobre 2026 (`.github/workflows/pages.yml` : tests unitaires, build, test de bout en bout, puis mise en ligne ; depuis le 28 octobre 2026, la publication vérifie que www.kultiled.com sert la nouvelle version, via `version.txt`, et échoue sinon). Aucune action manuelle.
- **Anciennes adresses** : https://teiki5320.github.io/optiled/ et `kultiled.com` redirigent vers `www.kultiled.com` (301) ; `www.optiled.fr`, abandonné le 16 octobre 2026, affichait encore le 6 novembre 2026 une page « Kultiled a déménagé » vers le nouveau domaine (dépôt `teiki5320/optiled-redirection`).
- **Dernière mise en production** : 6 novembre 2026 à 4 h 23 UTC, publication réussie (vérification quotidienne des lampes, 15 lampes toujours disponibles ; conseil « Poivrons en intérieur : pourquoi les fleurs tombent-elles ? » publié) ; le 5 novembre 2026, publications réussies (test de bout en bout rendu plus robuste après l'échec de la publication du 4 novembre au matin ; titre et description de la page du concombre en intérieur améliorés ; mesure d'audience Umami ajoutée ; titre de la rubrique Culture repris) ; le 4 novembre 2026, les publications de 12 h 40 et 18 h 53 UTC avaient réussi ; dans la nuit du 3 au 4 novembre 2026, le conseil « Billes d'argile, laine de roche, coco : quel substrat hydroponique ? » a été publié ; le 2 novembre 2026, le conseil « Moisissure blanche sur la terre : est-ce grave ? » avait été publié ; le 31 octobre 2026, les fiches des cultures avaient commencé à afficher dès la construction les articles d'actus qui les concernent et la ViparSpectra Pro P1000 avait été retirée ; le 30 octobre 2026, le conseil « Pourquoi mes semis ne lèvent-ils pas ? » avait été publié ; le 29 octobre 2026, le conseil « PAR et PPFD » avait été ajouté hors programme ; les pages « Top 10 » ont été mises en ligne le 19 octobre 2026 ; le 16 octobre, le site est devenu Kultiled (nom, logo, contact) et a changé de domaine.
- **Articles de conseil** : 46 en ligne (dont « PAR et PPFD », ajouté hors programme le 29 octobre 2026, « Pourquoi mes semis ne lèvent-ils pas ? », publié le 30 octobre 2026, « Moisissure blanche sur la terre : est-ce grave ? », publié le 2 novembre 2026, et « Billes d'argile, laine de roche, coco : quel substrat hydroponique ? », publié le 4 novembre 2026, et « Poivrons en intérieur : pourquoi les fleurs tombent-elles ? », publié le 6 novembre 2026), 29 programmés jusqu'au 7 juin 2027 (le prochain le 9 novembre 2026), au 6 novembre 2026 (sitemap vérifié le 6 novembre 2026 : 46 conseils).
- **Contact affiché** : `kultiled@toakeur.com` (mentions légales et « À propos »).

## Domaine & SSL

- **Domaine** : `kultiled.com`, acheté chez Cloudflare le 16 octobre 2026 ; `www.kultiled.com` est l'adresse principale, `kultiled.com` redirige vers elle (301 constaté le 28 octobre 2026).
- **DNS** (Cloudflare) : deux CNAME, `@` et `www` → `teiki5320.github.io`, proxy désactivé.
- **Dans le code** : `public/CNAME` contient `www.kultiled.com` ; `SITE_URL` vaut `https://www.kultiled.com/` (`build/site.ts`).
- **SSL** : certificat émis et renouvelé automatiquement par GitHub Pages ; HTTPS forcé.
- **Ancien domaine** : `optiled.fr` (IONOS), abandonné le 16 octobre 2026 et supprimé d'AdSense le 22 octobre 2026 ; il servait encore la page de redirection le 6 novembre 2026, jusqu'à la fin du contrat IONOS en novembre 2026.
- **Échéance de kultiled.com** : à vérifier dans la console Cloudflare.

## Visibilité

- **Référencement** : sitemap (`sitemap.xml`, 102 adresses le 27 octobre 2026 avec la nouvelle page Actus ; 107 le 28 octobre 2026 avec les 4 premières pages d'articles d'actus `actus/<slug>/` et le 41e conseil, puis 106 le même jour après le retrait de la fiche du chanvre, qui répond désormais 404 ; 107 le 29 octobre 2026 avec le 42e conseil ; 112 le 30 octobre 2026 avec le 43e conseil et 8 pages d'articles d'actus ; 116 le 31 octobre 2026 avec 12 pages d'articles d'actus ; 119 le 2 novembre 2026 avec le 44e conseil et 14 pages d'articles d'actus ; 123 le 3 novembre 2026 avec 18 pages d'articles d'actus ; 126 le 4 novembre 2026 avec le 45e conseil et 20 pages d'articles d'actus ; 127 le 5 novembre 2026 avec 21 pages d'articles d'actus ; 133 le 6 novembre 2026 avec le 46e conseil et 26 pages d'articles d'actus ; nombre qui grandit avec la veille) et `robots.txt` générés au build, adresses canoniques, balises Open Graph et Twitter Card avec une image de partage par page, données structurées schema.org sur toutes les pages.
- **Google Search Console** : `kultiled.com` ajouté le 16 octobre 2026, comme dans Bing Webmaster Tools ; l'ancienne propriété `optiled.fr` y avait été vérifiée avant le changement de domaine ; le changement d'adresse vers kultiled.com n'y est pas encore signalé au 6 novembre 2026 (bouton « Valider et informer Google » toujours proposé, vérifié ce jour-là).
- **Pages indexées** : 98 pages de kultiled.com dans l'index, 3 détectées et 2 explorées pas encore indexées, le reste en redirections ou doublons voulus (Search Console, vérifié le 6 novembre 2026) ; l'ancien `optiled.fr` en avait 62 sur 86 au 12 octobre 2026.
- **IndexNow** : pages signalées à Bing et aux autres moteurs après chaque publication réussie (depuis le 28 octobre 2026) et chaque lundi (passage du lundi réussi le 2 novembre 2026).
- **Analytics** : Cloudflare Web Analytics actif sur le site en ligne depuis le 12 octobre 2026 et Umami (offre gratuite, UE) depuis le 5 novembre 2026, avec les clics « Voir sur Amazon » ; tous deux sans cookie et décrits dans les mentions légales.
- **Publicité** : Google AdSense en ligne depuis le 12 octobre 2026 (script, bandeau de consentement de Google, lien « Gérer les cookies », `ads.txt` constatés le 13 octobre 2026) ; examen du nouveau domaine demandé le 16 octobre 2026, « En préparation » au 6 novembre 2026 (ads.txt toujours affiché « Introuvable » par la console ce jour-là, alors que le fichier répond) ; l'ancien site `optiled.fr` a été supprimé du compte AdSense le 22 octobre 2026 ; diffusion des annonces à vérifier dans la console AdSense.
- **PWA** : installable sur mobile, consultable hors ligne.
