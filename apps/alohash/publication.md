# PUBLICATION — état de la mise en ligne

> Mis à jour le 26 octobre 2026. Aucun secret ici.

## En bref

- **Production** : https://keurcook.com, ouvert au public, dernière publication le 26 octobre 2026
- **Domaine & SSL** : keurcook.com chez Cloudflare, HTTPS géré, www redirigé
- **Visibilité** : Search Console, IndexNow, Pinterest ; sitemap de 259 adresses
- **Monétisation** : affiliation Amazon (keurcookfr-21) ; AdSense en examen, aucune annonce
- **Contact** : keurcook@toakeur.com

## Boutiques

| | 🌐 Site |
|---|---|
| État | [ok] En ligne, ouvert au public |
| Hébergement | [ok] Cloudflare Pages, projet keurcook |
| Domaine | [ok] keurcook.com, www redirigé en 301 |
| SSL | [ok] Certificat géré par Cloudflare, HSTS |
| Indexation | [ok] 232 / 261 pages indexées par Google (21 octobre 2026) |
| Mesure d'audience | [ok] Cloudflare Web Analytics, sans cookie |

## Ce qui reste, dans l'ordre

1. ✅ **Site statique sur Cloudflare Pages** : publié par GitHub Actions à chaque envoi sur main.
2. ✅ **Domaine keurcook.com** : relié au projet, www redirigé, SSL géré par Cloudflare.
3. ✅ **Ouverture au public** : maintenance coupée le 29 septembre 2026.
4. ✅ **Référencement** : Search Console déclarée, IndexNow chaque lundi, Pinterest revendiqué.
5. ✅ **AdSense préparé** : script, emplacements et ads.txt publiés le 12 octobre 2026, examen demandé le même jour.
6. **Approbation AdSense** : site encore en examen, aucune annonce affichée ; suivre l'avis de Google dans la console.
7. ✅ **Mesure d'audience** : Cloudflare Web Analytics autorisé dans la CSP le 13 octobre 2026.

## Web · Production

| Version | En production ? | URL | Hébergeur |
| --- | --- | --- | --- |
| Web — Keur Cook (recettes, conseils, boutique) | **En ligne, ouvert au public** (maintenance désactivée) ; dernière publication réussie le 26 octobre 2026 (publication programmée) ; AdSense en examen depuis le 12 octobre 2026, aucune annonce | https://keurcook.com (`www` redirigé) | Cloudflare Pages (projet `keurcook`) |

Site 100 % statique (Next.js `output: "export"`, dossier `out/`), sans serveur ni base de données. Il est construit et publié par GitHub Actions (`.github/workflows/deploy.yml`, « Publier le site ») :

- à chaque push sur `main` ;
- chaque lundi, mercredi et vendredi à 0 h 15, heure de Paris en hiver (1 h 15 en été ; cron), pour publier les articles « Conseils » programmés ;
- à la main (onglet **Actions → Publier le site → Run workflow**) ;
- après le bouton « Maintenance ».

Étapes : lint, types, tests, build, puis `wrangler pages deploy out --project-name=keurcook`. Sans les secrets GitHub `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID`, le workflow échoue (en rouge) sans rien publier. Après la publication, une dernière étape vérifie que keurcook.com sert bien la nouvelle version (`/version.txt`), sinon le workflow échoue aussi.

Contenu en ligne : 58 recettes (16 pays), 40 articles « Conseils » publiés et 27 programmés jusqu'au 28 décembre 2026, 10 « Top 10 » de produits, 127 produits en 9 gammes dont les boutons « Acheter · prix » mènent à Amazon.fr (tag `keurcookfr-21`, prix indicatifs relevés le 27 septembre 2026), et des emplacements Google AdSense sur les recettes, les articles et les pages pays (`public/ads.txt` en ligne ; site en examen, aucune annonce pour l'instant). Le site ne vend rien lui-même.

### Maintenance

Onglet **Actions → Maintenance → Run workflow** : choisir « Oui, mettre en pause » ou « Non, rouvrir le site », avec un message facultatif. Le workflow modifie `content/maintenance.json`, l'enregistre sur `main` et republie le site. Aujourd'hui : désactivée (`"enabled": false`).

Pendant une maintenance : écran « On prépare la marmite », pages en `noindex`, sitemap vide. Les pages légales (`/mentions-legales`, `/confidentialite`, `/conditions`) restent accessibles.

## Domaine & SSL

- **Domaine** : `keurcook.com` chez Cloudflare, relié au projet Pages `keurcook` ; `www.keurcook.com` redirigé vers `keurcook.com` (301). Adresse technique : https://keurcook.pages.dev.
- **SSL** : certificat HTTPS géré et renouvelé par Cloudflare (valide jusqu'au 28 décembre 2026) ; en-têtes de sécurité (CSP, HSTS…) dans `public/_headers`, la CSP n'ouvrant que les adresses Google d'AdSense et du consentement, et celles de Cloudflare Web Analytics.
- **E-mail** : `keurcook@toakeur.com` (Cloudflare Email Routing de toakeur.com), affichée sur le site ; l'ancienne `contact@keurcook.com` arrive au même endroit.
- **Ancien domaine** : `alohash.fr` (IONOS) ne sert plus au site ; renouvelé automatiquement, il expire désormais le 16 octobre 2027.
- **Redirections** : `public/_redirects` (`/cgv`, `/categorie/<gamme>` (une règle par gamme), anciennes pages `/panier`, `/commande`, `/admin`…).

## Visibilité

- **Référencement** : sitemap en ligne (`/sitemap.xml`, 259 adresses au 26 octobre 2026, dont 40 articles « Conseils » : recettes, pays, produits, articles publiés, Top 10, pages légales), robots.txt, balise robots « max-image-preview:large », métadonnées Open Graph et données JSON-LD (Recipe, Article, BreadcrumbList, FAQPage, ItemList, WebSite et Organization ; pas de Product sur les fiches produit). Journal des retouches page par page : `docs/referencement.md` (premières retouches le 20 octobre 2026). Le build de production utilise `NEXT_PUBLIC_SITE_URL=https://keurcook.com`.
- **Google Search Console** : propriété de domaine `keurcook.com` déclarée ; 232 pages indexées sur 261 au relevé du 21 octobre 2026 ; 29 pas encore (17 inconnues de Google, 12 détectées mais non explorées) ; sitemap renvoyé et lu le 20 octobre 2026. Une routine (`keurcook-demandes-indexation`) sert à demander l'indexation des nouvelles recettes.
- **IndexNow** : sitemap signalé chaque lundi (`.github/workflows/indexnow.yml`) ; dernier envoi réussi le 19 octobre 2026.
- **Pinterest** : site revendiqué sur le compte « Keur Cook » ; 52 recettes épinglées du 2 au 14 octobre 2026 ; publication automatique par l'API (`.github/workflows/pinterest.yml`, chaque jour à 4 h 17 UTC, 5 épingles au plus) en place depuis le 23 octobre 2026, clé du compte créée le même jour ; les 6 boissons épinglées le 24 octobre, soit les 58 recettes.
- **Publicité** : Google AdSense en place depuis le 12 octobre 2026 ; site encore en examen, aucune annonce affichée.
- **Analytics** : Cloudflare Web Analytics (sans cookie), balise constatée en ligne le 14 octobre 2026, chiffres à vérifier dans la console ; consentement aux cookies publicitaires recueilli par le message de Google, rouvert par le lien « Cookies » du pied de page.
- **Newsletter** : aucune.

## Vérifications avant envoi

`npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
