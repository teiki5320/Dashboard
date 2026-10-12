# PUBLICATION — état de la mise en ligne

> Mis à jour le 12 octobre 2026. Aucun secret ici.

## Web · Production

| Version | En production ? | URL | Hébergeur |
| --- | --- | --- | --- |
| Web — Keur Cook (recettes, conseils, boutique) | **En ligne, ouvert au public** (maintenance désactivée) ; dernière publication réussie le 12 octobre 2026 | https://keurcook.com (`www` redirigé) | Cloudflare Pages (projet `keurcook`) |

Site 100 % statique (Next.js `output: "export"`, dossier `out/`), sans serveur ni base de données. Il est construit et publié par GitHub Actions (`.github/workflows/deploy.yml`, « Publier le site ») :

- à chaque push sur `main` ;
- chaque lundi, mercredi et vendredi à 0 h 15, heure de Paris en hiver (1 h 15 en été ; cron), pour publier les articles « Conseils » programmés ;
- à la main (onglet **Actions → Publier le site → Run workflow**) ;
- après le bouton « Maintenance ».

Étapes : lint, types, tests, build, puis `wrangler pages deploy out --project-name=keurcook`. Sans les secrets GitHub `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID`, le workflow affiche un avertissement et ne publie rien.

Contenu en ligne : 52 recettes (16 pays), 34 articles « Conseils » publiés et 33 programmés jusqu'au 28 décembre 2026, 91 produits en 8 gammes dont les boutons « Acheter · prix » mènent à Amazon.fr (tag `keurcook-21`, prix indicatifs relevés le 27 septembre 2026). Le site ne vend rien lui-même.

### Maintenance

Onglet **Actions → Maintenance → Run workflow** : choisir « Oui, mettre en pause » ou « Non, rouvrir le site », avec un message facultatif. Le workflow modifie `content/maintenance.json`, l'enregistre sur `main` et republie le site. Aujourd'hui : désactivée (`"enabled": false`).

Pendant une maintenance : écran « On prépare la marmite », pages en `noindex`, sitemap vide. Les pages légales (`/mentions-legales`, `/confidentialite`, `/conditions`) restent accessibles.

## Domaine & SSL

- **Domaine** : `keurcook.com` chez Cloudflare, relié au projet Pages `keurcook` ; `www.keurcook.com` redirigé vers `keurcook.com` (301). Adresse technique : https://keurcook.pages.dev.
- **SSL** : certificat HTTPS géré par Cloudflare ; en-têtes de sécurité (CSP, HSTS…) dans `public/_headers`.
- **E-mail** : `keurcook@toakeur.com` (Cloudflare Email Routing de toakeur.com), affichée sur le site ; l'ancienne `contact@keurcook.com` arrive au même endroit.
- **Ancien domaine** : `alohash.fr` (IONOS) ne sert plus au site ; il expire le 16 octobre 2026, renouvellement à décider.
- **Redirections** : `public/_redirects` (`/cgv`, `/categorie/<gamme>` (une règle par gamme), anciennes pages `/panier`, `/commande`, `/admin`…).

## Visibilité

- **Référencement** : sitemap en ligne (`/sitemap.xml`, 201 adresses : recettes, pays, produits, articles publiés, pages légales), robots.txt, métadonnées Open Graph et données JSON-LD (Recipe, Product). Le build de production utilise `NEXT_PUBLIC_SITE_URL=https://keurcook.com`.
- **Google Search Console** : propriété de domaine `keurcook.com` déclarée ; 189 pages indexées et 31 non indexées au relevé du 7 octobre 2026 (motifs jugés normaux ou temporaires). Une routine (`keurcook-demandes-indexation`) sert à demander l'indexation des nouvelles recettes.
- **IndexNow** : sitemap signalé chaque lundi (`.github/workflows/indexnow.yml`) ; dernier envoi réussi le 12 octobre 2026.
- **Pinterest** : site revendiqué sur le compte « Keur Cook » ; 40 recettes épinglées du 2 au 12 octobre 2026.
- **Analytics** : aucun outil installé ; bannière cookies d'information (cookies nécessaires seulement).
- **Newsletter** : aucune.

## Vérifications avant envoi

`npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
