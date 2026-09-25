# PUBLICATION — état de la mise en ligne

> Généré le 25 septembre 2026. Aucun secret ici.

## Vue d'ensemble

- **Web · Production** : ✅ en ligne
- **URL** : https://www.optiled.fr/
- **Hébergeur** : GitHub Pages, publication automatique à chaque envoi sur `main` (`.github/workflows/pages.yml` : tests unitaires, build, test de bout en bout, puis mise en ligne). Aucune action manuelle.
- **Ancienne adresse** : https://teiki5320.github.io/optiled/ redirige vers le domaine.
- **Dernière mise en production** : à vérifier dans l'onglet *Actions* du dépôt.

## Domaine & SSL

- **Domaine** : `optiled.fr`, enregistré chez IONOS ; `www.optiled.fr` est l'adresse principale, `optiled.fr` redirige vers elle.
- **DNS** (IONOS) : 4 enregistrements A vers GitHub Pages (185.199.108.153 à 185.199.111.153) et un CNAME `www` → `teiki5320.github.io`. Les enregistrements de messagerie IONOS sont conservés.
- **Dans le code** : `public/CNAME` contient `www.optiled.fr` ; `SITE_URL` vaut `https://www.optiled.fr/` (`build/site.ts`).
- **SSL** : certificat émis et renouvelé automatiquement par GitHub Pages pour `www.optiled.fr` et `optiled.fr` ; HTTPS forcé.
- **Échéance du domaine** : à vérifier dans la console IONOS (renouvellement automatique désactivé au 24 septembre 2026).

## Visibilité

- **Référencement** : sitemap (`sitemap.xml`) et `robots.txt` générés au build, adresses canoniques, balises Open Graph et Twitter Card avec une image de partage par page, données structurées schema.org (WebApplication pour l'accueil, Article pour les guides).
- **Google Search Console** : site non déclaré d'après le dépôt ; une vérification Google existe dans la zone DNS du domaine — état à vérifier dans la console.
- **Pages indexées** : à vérifier dans la console.
- **Analytics** : aucune mesure active. Plausible est prévu dans le code (`PLAUSIBLE_DOMAIN`), mais la variable n'est pas définie dans le workflow.
- **PWA** : installable sur mobile, consultable hors ligne.

## Ce qui reste, dans l'ordre

1. Déclarer `www.optiled.fr` dans Google Search Console et envoyer `https://www.optiled.fr/sitemap.xml`.
2. Vérifier que la routine mensuelle des lampes Amazon arrive à publier sur `main` (premier passage le 1er octobre 2026).
3. Activer une mesure d'audience si souhaité, puis mettre à jour la rubrique « Données personnelles et cookies » de `mentions-legales.html`.
