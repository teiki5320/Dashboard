# INFRA — fiche technique

Mis à jour le 13 octobre 2026 par un scan du dépôt. Pour mettre à jour : relancer ce même prompt.

## En bref

- **Plateforme** : site web de recettes africaines, en français
- **Stack** : Next.js 16 en export statique · React 19 · Tailwind 4
- **Backend** : aucun, site 100 % statique sans base de données
- **Distribution** : Cloudflare Pages, publié par GitHub Actions
- **Site** : https://keurcook.com (www redirigé)
- **IA et outils** : photos OpenArt · Amazon Partenaires · AdSense

## Parcours

- 🌐 **Web** : 🐙 GitHub — main · publication au vert [ok] → ☁️ Hébergement web — Cloudflare Pages, projet keurcook [ok] → 🔗 Nom de domaine — keurcook.com, SSL Cloudflare [ok] → 👥 Visiteurs — site ouvert au public [ok]
- 📝 **Contenu** : 🐙 GitHub — 33 articles programmés [ok] → ⏰ GitHub Actions — publication lun., mer., ven. [ok] → 🌐 keurcook.com — 34 articles en ligne [ok] → ✍️ Réserve — vide le 28 décembre 2026 [à faire]
- 🛒 **Affiliation** : 🌐 keurcook.com — boutons « Acheter · prix » [ok] → 🤝 Affiliation — Amazon Partenaires, tag keurcook-21 [ok] → 📦 Amazon.fr — Amazon encaisse et livre [ok]
- 📢 **Publicité** : 🌐 keurcook.com — cinq emplacements « Publicité » [ok] → 💰 AdSense (publicité web) — approbation à vérifier [à faire]

## Vue d'ensemble

- **Plateforme** : site web en français **Keur Cook** (anciennement Alohash) de recettes de plats africains (52 recettes, 16 pays), rubrique « Conseils » (articles Markdown dans `content/conseils/`, trois par semaine : lundi, mercredi, vendredi, publication programmée) et boutique de 91 produits en 8 gammes dont les boutons « Acheter · prix » mènent à Amazon.fr (programme Partenaires). Depuis le 12 octobre 2026, des annonces Google AdSense s'affichent aussi sur les recettes, les articles et les pages pays. Le site ne vend rien lui-même. Éditeur : ALOHASH (SAS), nom commercial TOA CORP.
- **Stack** : Next.js 16 (App Router, `output: "export"`) · React 19 · TypeScript · Tailwind CSS 4 · Three.js (carte de l'Afrique en particules) · Marked (articles Markdown) · sharp (images de partage et d'épingles au build).
- **Backend** : aucun. Site 100 % statique (dossier `out/`) : pas de serveur, pas de base de données, pas d'espace admin. Recettes et produits dans `src/lib/demo/`, articles dans `content/conseils/`, mode maintenance dans `content/maintenance.json` (lu au build ; désactivé aujourd'hui).
- **Distribution** : une seule version, https://keurcook.com (`www` redirigé), publiée sur Cloudflare Pages par GitHub Actions depuis la branche `main`.
- **Mesure d'audience** : aucune. Pas de script de mesure dans le code ; la politique de sécurité (`public/_headers`) n'autorise comme scripts externes que ceux de Google utiles à AdSense et au message de consentement.
- **Particularités** :
  - pages légales `/conditions` (CGU ; `/cgv` y redirige), `/mentions-legales`, `/confidentialite`, groupe de routes `src/app/(legal)` accessible même en maintenance ; hébergeur indiqué : Cloudflare, Inc. ; consentement aux cookies recueilli par le message de Google (Confidentialité et messages, dans AdSense), que le lien « Cookies » du pied de page rouvre (`src/components/compliance/CookieBanner.tsx`) ; l'ancien bandeau maison n'est plus affiché ;
  - liste des allégations de santé interdites (`src/lib/compliance.ts`) ;
  - étiquetage alimentaire sur chaque produit (ingrédients, allergènes, conservation) ;
  - mode maintenance piloté par le bouton « Maintenance » de GitHub Actions ; en maintenance, pages en `noindex` et sitemap vide ;
  - en-têtes de sécurité (CSP, HSTS, `X-Frame-Options`, `nosniff`…) dans `public/_headers` ; la CSP n'ouvre que les adresses Google d'AdSense et du consentement ; redirections (`/cgv`, `/categorie/<gamme>` (une règle par gamme), anciennes pages `/panier`, `/commande`, `/admin`…) dans `public/_redirects` ;
  - favoris stockés dans le navigateur (aucun compte) ;
  - liens Amazon construits par `src/lib/amazon.ts` (tag `keurcook-21`, champ `amazonAsin` rempli depuis les offres de `src/lib/demo/catalog*.ts`) ; prix indicatifs relevés le 27 septembre 2026 (`AMAZON_PRICES_CHECKED_ON`).

## 1. GitHub

- **Rôle** : dépôt du code et publication automatique.
  - `.github/workflows/deploy.yml` (« Publier le site ») : lint, types, tests, build, puis `wrangler pages deploy out --project-name=keurcook` ; à chaque push sur `main`, chaque lundi, mercredi et vendredi à 0 h 15 (cron, articles programmés), à la main et après la maintenance.
  - `.github/workflows/indexnow.yml` (« Signaler les pages (IndexNow) ») : chaque lundi à 3 h UTC et à la main, `node scripts/indexnow.mjs` envoie les adresses du sitemap publié à IndexNow (Bing, Yandex, Seznam…). Clé publique dans le script et dans `public/<clé>.txt`.
  - `.github/workflows/maintenance.yml` (« Maintenance ») : choix Oui/Non et message facultatif ; modifie `content/maintenance.json`, l'enregistre sur `main` et relance la publication.
- **Console** : https://github.com/teiki5320/keurcook (Actions, Settings → Secrets and variables → Actions).
- **Identifiants publics** : dépôt `teiki5320/keurcook` (anciennement `teiki5320/alohash`).
- **Secrets** : `CLOUDFLARE_API_TOKEN` (jeton API Cloudflare, droit Cloudflare Pages : Edit) et `CLOUDFLARE_ACCOUNT_ID`, dans les secrets Actions du dépôt. Sans eux, le workflow affiche un avertissement et ne publie pas.
- **Coût** : à vérifier dans la console.

## 2. Hébergement web (GitHub Pages / Cloudflare Pages)

- **Rôle** : hébergement du site sur Cloudflare Pages (projet `keurcook`, envoi direct depuis GitHub Actions avec `wrangler`). Sert aussi les en-têtes (`public/_headers`) et les redirections (`public/_redirects`).
- **Console** : https://dash.cloudflare.com (Workers & Pages → keurcook).
- **Identifiants publics** : https://keurcook.com, adresse technique https://keurcook.pages.dev.
- **Secrets** : jeton API et identifiant de compte, uniquement dans les secrets GitHub (voir ci-dessus).
- **Coût** : à vérifier dans la console.

## 3. Nom de domaine

- **Rôle** : domaine `keurcook.com` chez Cloudflare, relié au projet Pages (SSL géré par Cloudflare) ; `www.keurcook.com` redirigé vers `keurcook.com` (règle de redirection 301). Adresse de contact publique `keurcook@toakeur.com` (Cloudflare Email Routing du domaine toakeur.com, renvoyée vers la boîte de Jean) ; l'ancienne `contact@keurcook.com` arrive au même endroit.
- **Ancien domaine** : `alohash.fr` (IONOS) ne sert plus à Keur Cook (aucun site, aucune adresse). Il expire le 16 octobre 2026 : renouvellement à décider.
- **Console** : https://dash.cloudflare.com (keurcook.com → DNS, Email Routing ; toakeur.com → Email Routing).
- **Identifiants publics** : `keurcook.com`, `www.keurcook.com`, `keurcook@toakeur.com`.
- **Secrets** : aucun dans le dépôt.
- **Coût** : à vérifier dans la console.

## 4. Amazon Partenaires (affiliation)

- **Rôle** : les boutons « Acheter · prix » mènent à Amazon.fr (programme Partenaires, tag `keurcook-21`, `src/lib/amazon.ts`) ; Amazon encaisse et livre. Produits retenus : plus de 3,5 étoiles sur Amazon ; prix indicatifs relevés le 27 septembre 2026. `keurcook.com` figure dans la liste des sites du compte (9 octobre 2026). Une routine quotidienne vérifie par lots que les produits cités sont toujours achetables.
- **Console** : https://partenaires.amazon.fr (compte Amazon Partenaires de Jean).
- **Identifiants publics** : tag partenaire `keurcook-21` (`NEXT_PUBLIC_AMAZON_TAG` pour le changer).
- **Secrets** : aucun.
- **Coût** : gratuit ; commission versée par Amazon sur les achats.

## 5. Réseaux sociaux & influenceurs (Pinterest)

- **Rôle** : compte Pinterest **Keur Cook**. Le site est revendiqué sur ce compte (balise `p:domain_verify` dans `src/app/layout.tsx`) ; chaque recette a un bouton « Épingler sur Pinterest » (`src/components/recipe/RecipeActions.tsx`) qui utilise une image verticale 1000×1500 générée par `scripts/pin-images.mjs` (`public/pins/`).
- **Console** : https://fr.pinterest.com (compte Keur Cook, rattaché à `keurcook@toakeur.com`).
- **Identifiants publics** : compte Pinterest « Keur Cook ».
- **Secrets** : aucun dans le dépôt.
- **Coût** : gratuit.

## 6. API d'IA (OpenArt, photos)

- **Rôle** : photos générées avec OpenArt pour les recettes, les produits et les articles « Conseils », converties en WebP dans `public/recipes`, `public/products` et `public/conseils`.
- **Console** : https://openart.ai.
- **Identifiants publics** : aucun.
- **Secrets** : aucun dans le dépôt.
- **Coût** : crédits OpenArt.

## 7. AdSense (publicité web)

- **Rôle** : annonces display Google sur cinq emplacements titrés « Publicité » (`src/components/ads/AdSlot.tsx`, `src/lib/ads.ts`) : au milieu et en fin de recette, au milieu et en fin d'article « Conseils », et sur les pages pays ; un seul bloc d'annonces « Keur Cook » sert les cinq. Script `adsbygoogle.js` et balise `google-adsense-account` dans `src/app/layout.tsx`, fichier `public/ads.txt`. Le message de consentement de Google (Confidentialité et messages) gère les cookies publicitaires. Mis en ligne le 12 octobre 2026.
- **Console** : https://adsense.google.com (compte Google de gestion).
- **Identifiants publics** : identifiant d'éditeur `ca-pub-…` et numéro de bloc d'annonces dans `src/lib/ads.ts` et `public/ads.txt` (publics par nature).
- **Secrets** : aucun.
- **Coût** : gratuit ; Google verse une part des revenus publicitaires. Approbation du site et revenus : à vérifier dans la console.
