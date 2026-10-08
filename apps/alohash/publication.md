# PUBLICATION — état de la mise en ligne

> Mis à jour le 29 septembre 2026. Aucun secret ici.

## Vue d'ensemble

| Version | En production ? | URL | Hébergeur |
| --- | --- | --- | --- |
| Web — Keur Cook (recettes, conseils, boutique) | En ligne sur Cloudflare Pages ; **maintenance activée** (écran « On prépare la marmite », pages en `noindex`, sitemap vide) | https://keurcook.com (`www` redirigé) | Cloudflare Pages (projet `keurcook`) |

Site 100 % statique (Next.js `output: "export"`, dossier `out/`), sans serveur ni base de données. Il est construit et publié par GitHub Actions (`.github/workflows/deploy.yml`, « Publier le site ») :

- à chaque push sur `main` ;
- chaque lundi, mercredi et vendredi à 0 h 15, heure de Paris en hiver (1 h 15 en été ; cron), pour publier les articles « Conseils » programmés ;
- à la main (onglet **Actions → Publier le site → Run workflow**) ;
- après le bouton « Maintenance ».

Étapes : lint, types, tests, build, puis `wrangler pages deploy out --project-name=keurcook`. Sans les secrets GitHub `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID`, le workflow affiche un avertissement et ne publie rien.

Contenu : 46 recettes (16 pays), 67 articles « Conseils » programmés du 20/07/2026 au 25/10/2027, 91 produits en 8 gammes dont les boutons « Acheter · prix » mènent à Amazon.fr (tag `keurcook-21`, prix indicatifs relevés le 27/09/2026). Le site ne vend rien lui-même.

## Maintenance

Onglet **Actions → Maintenance → Run workflow** : choisir « Oui, mettre en pause » ou « Non, rouvrir le site », avec un message facultatif. Le workflow modifie `content/maintenance.json`, l'enregistre sur `main` et republie le site.

Pendant la maintenance : écran « On prépare la marmite », pages en `noindex`, sitemap vide. Les pages légales (`/mentions-legales`, `/confidentialite`, `/conditions`) restent accessibles.

## Domaine, e-mail & SSL

- **Domaine** : `keurcook.com` chez Cloudflare, relié au projet Pages `keurcook` (SSL actif) ; `www.keurcook.com` redirigé vers `keurcook.com`.
- **E-mail** : `keurcook@toakeur.com` (Cloudflare Email Routing de toakeur.com, renvoyé vers teiki5320@gmail.com). L'ancienne `contact@keurcook.com` est renvoyée au même endroit.
- **Ancien domaine** : `alohash.fr` reste chez IONOS pour la messagerie (MX, SPF, DKIM, DMARC à ne pas toucher) ; aucun site n'y est plus publié (pas de redirection).
- **SSL** : certificat HTTPS géré par Cloudflare ; en-têtes de sécurité (CSP, HSTS…) dans `public/_headers`.
- **Redirections** : `public/_redirects` (`/cgv`, `/categorie/<gamme>` (une règle par gamme), anciennes pages `/panier`, `/commande`, `/admin`…).

## Visibilité

- **Référencement** : sitemap (`/sitemap.xml` : recettes, pays, articles publiés ; vide en maintenance), robots.txt, métadonnées Open Graph et données JSON-LD (Recipe, Product) présents dans le code. Le build de production utilise `NEXT_PUBLIC_SITE_URL=https://keurcook.com`.
  - Inscription à Google Search Console : à faire.
- **Analytics** : aucun outil installé ; bannière cookies d'information (cookies nécessaires seulement).
- **Newsletter** : aucune ; formulaire retiré en attendant le choix d'un outil (Brevo envisagé, non confirmé).

## Vérifications avant envoi

`npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

## À faire

Mise en route (propriétaire) :

- [x] Première publication faite le 29 septembre 2026 (https://keurcook.pages.dev, projet créé automatiquement) ; `keurcook.com` relié (SSL actif) et `www.keurcook.com` redirigé vers `keurcook.com` (règle de redirection Cloudflare « Rediriger de WWW vers la racine », 301, chaîne de requête conservée).
- [x] Créer un jeton API Cloudflare (droit **Cloudflare Pages : Edit**), puis ajouter les secrets `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID` dans GitHub (**Settings → Secrets and variables → Actions**).
- [ ] Ajouter `keurcook.com` à la liste des sites du compte Amazon Partenaires.

Ensuite :

- [ ] Relire les pages légales (`/conditions`, `/mentions-legales`, `/confidentialite`) et compléter les variables `NEXT_PUBLIC_LEGAL_*` si besoin.
- [ ] Couper la maintenance (bouton « Maintenance » → « Non, rouvrir le site ») pour ouvrir le site.
- [ ] Déclarer le site dans Google Search Console.
- [ ] Choisir un outil de newsletter.
- [ ] Mettre à jour régulièrement les prix indicatifs des produits.
