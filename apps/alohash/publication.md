# PUBLICATION — état de la mise en ligne

> Mis à jour le 30 octobre 2026. Aucun secret ici.

## En bref

- **Production** : https://keurcook.com, ouvert au public, dernière publication le 30 octobre 2026
- **Domaine & SSL** : keurcook.com chez Cloudflare, HTTPS géré, www redirigé
- **Visibilité** : Search Console, IndexNow, Pinterest ; sitemap de 257 adresses
- **Monétisation** : affiliation Amazon (keurcookfr-21) ; AdSense en examen, aucune annonce
- **Contact** : keurcook@toakeur.com

## Boutiques

| | 🌐 Site |
|---|---|
| État | [ok] En ligne, ouvert au public |
| Hébergement | [ok] Cloudflare Pages, projet keurcook |
| Domaine | [ok] keurcook.com, www redirigé en 301 |
| SSL | [ok] Certificat géré par Cloudflare, HSTS |
| Indexation | [ok] 248 / 259 pages indexées par Google (27 octobre 2026) |
| Mesure d'audience | [ok] Cloudflare Web Analytics, sans cookie |

## Ce qui reste, dans l'ordre

1. ✅ **Site statique sur Cloudflare Pages** : publié par GitHub Actions à chaque envoi sur main.
2. ✅ **Domaine keurcook.com** : relié au projet, www redirigé, SSL géré par Cloudflare.
3. ✅ **Ouverture au public** : maintenance coupée le 29 septembre 2026.
4. ✅ **Référencement** : Search Console déclarée, IndexNow après chaque publication et chaque lundi, Pinterest revendiqué.
5. ✅ **AdSense préparé** : script, emplacements et ads.txt publiés le 12 octobre 2026, examen demandé le même jour.
6. **Approbation AdSense** : site encore en examen, « En préparation » dans la console AdSense, ni validé ni refusé (vérifié le 30 octobre 2026), aucune annonce affichée ; suivre l'avis de Google dans la console.
7. ✅ **Mesure d'audience** : Cloudflare Web Analytics autorisé dans la CSP le 13 octobre 2026.

## Web · Production

| Version | En production ? | URL | Hébergeur |
| --- | --- | --- | --- |
| Web — Keur Cook (recettes, conseils, boutique) | **En ligne, ouvert au public** (maintenance désactivée) ; dernière publication réussie le 30 octobre 2026 au matin (envoi sur main, après la publication programmée de l'article du jour) ; AdSense en examen depuis le 12 octobre 2026, « En préparation » dans la console au 30 octobre 2026, aucune annonce | https://keurcook.com (`www` redirigé) | Cloudflare Pages (projet `keurcook`) |

Site 100 % statique (Next.js `output: "export"`, dossier `out/`), sans serveur ni base de données. Il est construit et publié par GitHub Actions (`.github/workflows/deploy.yml`, « Publier le site ») :

- à chaque push sur `main` ;
- chaque lundi, mercredi et vendredi à 0 h 15, heure de Paris en hiver (1 h 15 en été ; cron), pour publier les articles « Conseils » programmés ;
- chaque jour à 12 h 50 et 19 h 50, heure de Paris en hiver (13 h 50 et 20 h 50 en été ; cron `50 11,18 * * *`), après la veille actus : chaque nouvel article d'actu devient sa page `/actus/<adresse>` ;
- à la main (onglet **Actions → Publier le site → Run workflow**) ;
- après le bouton « Maintenance ».

Étapes : lint, types, tests, build, contrôle du site construit (`tests/sortie/`, depuis le 28 octobre 2026), puis `wrangler pages deploy out --project-name=keurcook`. Sans les secrets GitHub `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID`, le workflow échoue (en rouge) sans rien publier. Après la publication, une dernière étape vérifie que keurcook.com sert bien la nouvelle version (`/version.txt`), sinon le workflow échoue aussi.

Contenu en ligne : 58 recettes (16 pays), 42 articles « Conseils » publiés et 25 programmés jusqu'au 28 décembre 2026, 10 « Top 10 » de produits, 126 produits en 9 gammes dont les boutons « Voir sur Amazon » mènent à Amazon.fr (tag `keurcookfr-21`, aucun prix affiché depuis le 28 octobre 2026), et des emplacements Google AdSense sur les recettes, les articles et les pages pays (`public/ads.txt` en ligne ; site en examen, aucune annonce pour l'instant). Le site ne vend rien lui-même.

### Maintenance

Onglet **Actions → Maintenance → Run workflow** : choisir « Oui, mettre en pause » ou « Non, rouvrir le site », avec un message facultatif. Le workflow modifie `content/maintenance.json`, l'enregistre sur `main` et republie le site. Aujourd'hui : désactivée (`"enabled": false`).

Pendant une maintenance : écran « On prépare la marmite », pages en `noindex`, sitemap vide. Les pages légales (`/mentions-legales`, `/confidentialite`, `/conditions`) restent accessibles.

## Domaine & SSL

- **Domaine** : `keurcook.com` chez Cloudflare, relié au projet Pages `keurcook` ; `www.keurcook.com` redirigé vers `keurcook.com` (301). Adresse technique : https://keurcook.pages.dev.
- **SSL** : certificat HTTPS géré et renouvelé par Cloudflare (valide jusqu'au 28 décembre 2026) ; en-têtes de sécurité (CSP, HSTS…) dans `public/_headers`, la CSP n'ouvrant que les adresses Google d'AdSense et du consentement, celles de Cloudflare Web Analytics et `teiki5320.github.io` (veille actus, depuis le 27 octobre 2026).
- **E-mail** : `keurcook@toakeur.com` (Cloudflare Email Routing de toakeur.com), affichée sur le site ; l'ancienne `contact@keurcook.com` arrive au même endroit.
- **Ancien domaine** : `alohash.fr` (IONOS) ne sert plus au site ; renouvelé automatiquement, il expire désormais le 16 octobre 2027.
- **Redirections** : `public/_redirects` (`/cgv`, `/categorie/<gamme>` (une règle par gamme), anciennes pages `/panier`, `/commande`, `/admin`…).

## Visibilité

- **Référencement** : sitemap en ligne (`/sitemap.xml`, 257 adresses au 30 octobre 2026 (254 le 29 octobre ; 264 le 28 octobre au matin, avant le retrait des fiches produit d'Afrique du Nord et des actus du Maghreb, gardées en noindex), dont 42 articles « Conseils », la page Actus et 4 articles d'actus : recettes, pays, produits, articles publiés, Top 10, Actus et articles d'actus, pages légales ; les articles d'actus s'ajoutent 2 fois par jour), robots.txt, balise robots « max-image-preview:large », métadonnées Open Graph et données JSON-LD (Recipe, Article, NewsArticle, BreadcrumbList, FAQPage, ItemList, WebSite et Organization ; pas de Product sur les fiches produit). Journal des retouches page par page : `docs/referencement.md` (premières retouches le 20 octobre 2026). Le build de production utilise `NEXT_PUBLIC_SITE_URL=https://keurcook.com`.
- **Google Search Console** : propriété de domaine `keurcook.com` déclarée ; 248 pages indexées sur 259 au relevé du Studio du 27 octobre 2026 ; 11 pas encore (7 inconnues de Google, 4 détectées mais non explorées) ; sitemap renvoyé le 20 octobre 2026, relu par Google le 26 octobre 2026. Une routine (`keurcook-demandes-indexation`) sert à demander l'indexation des nouvelles recettes.
- **IndexNow** : sitemap signalé après chaque publication réussie (depuis le 28 octobre 2026) et chaque lundi (`.github/workflows/indexnow.yml`) ; dernier envoi réussi le 30 octobre 2026.
- **Pinterest** : site revendiqué sur le compte « Keur Cook » ; 52 recettes épinglées du 2 au 14 octobre 2026 ; publication automatique par l'API (`.github/workflows/pinterest.yml`, chaque jour à 4 h 17 UTC, 5 épingles au plus) en place depuis le 23 octobre 2026, clé du compte créée le même jour ; les 6 boissons épinglées le 24 octobre, soit les 58 recettes.
- **Publicité** : Google AdSense en place depuis le 12 octobre 2026 ; site encore en examen (« En préparation » dans la console AdSense, ni validé ni refusé (vérifié le 30 octobre 2026)), aucune annonce affichée.
- **Analytics** : Cloudflare Web Analytics (sans cookie), balise constatée en ligne le 14 octobre 2026, chiffres à vérifier dans la console ; consentement aux cookies publicitaires recueilli par le message de Google, rouvert par le lien « Cookies » du pied de page.
- **Newsletter** : aucune.

## Vérifications avant envoi

`npm run lint`, `npm run typecheck`, `npm test`, `npm run test:sortie` (build puis contrôle du dossier `out/`).
