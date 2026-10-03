# INFRA — fiche technique

Mis à jour le 29 septembre 2026 par un scan du dépôt. Pour mettre à jour : relancer ce même prompt.

## Vue d'ensemble

- **Plateforme** : site web en français **Keur Cook** (anciennement Alohash) de recettes de plats africains (46 recettes, 16 pays), rubrique « Conseils » (articles Markdown dans `content/conseils/`, trois par semaine (lundi, mercredi, vendredi), publication programmée) et boutique de 91 produits en 8 gammes dont les boutons « Acheter · prix » mènent à Amazon.fr (programme Partenaires). Le site ne vend rien lui-même. Éditeur : ALOHASH (SAS).
- **Stack** : Next.js 16 (App Router, `output: "export"`) · React 19 · TypeScript · Tailwind CSS 4 · Three.js (carte de l'Afrique en particules) · Marked (articles Markdown).
- **Backend** : aucun. Site 100 % statique (dossier `out/`) : pas de serveur, pas de base de données, pas d'espace admin. Recettes et produits dans `src/lib/demo/`, articles dans `content/conseils/`, mode maintenance dans `content/maintenance.json` (lu au build).
- **Distribution** : une seule version, https://keurcook.com (`www` redirigé), publiée sur Cloudflare Pages par GitHub Actions depuis la branche `main`.
- **Particularités** :
  - pages légales `/conditions` (CGU ; `/cgv` y redirige), `/mentions-legales`, `/confidentialite`, groupe de routes `src/app/(legal)` accessible même en maintenance ; hébergeur indiqué : Cloudflare, Inc. ; bannière cookies d'information (cookies nécessaires seulement) ;
  - liste des allégations de santé interdites (`src/lib/compliance.ts`) ;
  - étiquetage alimentaire sur chaque produit (ingrédients, allergènes, conservation) ;
  - mode maintenance piloté par le bouton « Maintenance » de GitHub Actions ; en maintenance, pages en `noindex` et sitemap vide ;
  - en-têtes de sécurité (CSP, HSTS, `X-Frame-Options`, `nosniff`…) dans `public/_headers` ; redirections (`/cgv`, `/categorie/<gamme>` (une règle par gamme), anciennes pages `/panier`, `/commande`, `/admin`…) dans `public/_redirects` ;
  - favoris stockés dans le navigateur (aucun compte) ;
  - liens Amazon construits par `src/lib/amazon.ts` (tag `keurcook-21`, champ `amazonAsin` (rempli depuis les offres de `src/lib/demo/catalog*.ts`)) ; prix indicatifs relevés le 27/09/2026.

### 1. GitHub

- **Rôle** : dépôt du code et publication automatique.
  - `.github/workflows/deploy.yml` (« Publier le site ») : lint, types, tests, build, puis `wrangler pages deploy out --project-name=keurcook` ; à chaque push sur `main`, chaque lundi, mercredi et vendredi à 0 h 15 (cron, articles programmés), à la main et après la maintenance.
  - `.github/workflows/indexnow.yml` (« Signaler les pages (IndexNow) ») : chaque lundi à 3 h UTC et à la main, `node scripts/indexnow.mjs` envoie les adresses du sitemap publié à IndexNow (Bing, Yandex, Seznam…). Clé publique dans le script et dans `public/<clé>.txt`.
  - `.github/workflows/maintenance.yml` (« Maintenance ») : choix Oui/Non et message facultatif ; modifie `content/maintenance.json`, l'enregistre sur `main` et relance la publication.
- **Console** : https://github.com/teiki5320/keurcook (Actions, Settings → Secrets and variables → Actions).
- **Identifiants publics** : dépôt `teiki5320/keurcook` (anciennement `teiki5320/alohash`).
- **Secrets** : `CLOUDFLARE_API_TOKEN` (jeton API Cloudflare, droit Cloudflare Pages : Edit) et `CLOUDFLARE_ACCOUNT_ID`, dans les secrets Actions du dépôt. Sans eux, le workflow affiche un avertissement et ne publie pas.
- **Coût** : à vérifier dans la console.

### 2. Cloudflare

- **Rôle** : hébergement du site (Cloudflare Pages, projet `keurcook`, envoi direct depuis GitHub Actions), domaine `keurcook.com` et Cloudflare Email Routing (`contact@keurcook.com` renvoyé vers `contact@alohash.fr`). Sert aussi les en-têtes (`public/_headers`) et les redirections (`public/_redirects`).
- **Console** : https://dash.cloudflare.com (Workers & Pages → keurcook ; keurcook.com → DNS, Email Routing).
- **Identifiants publics** : https://keurcook.com (domaine principal), `www.keurcook.com` redirigé.
- **Secrets** : jeton API et identifiant de compte, uniquement dans les secrets GitHub (voir ci-dessus).
- **Coût** : à vérifier dans la console.

### 3. IONOS

- **Rôle** : domaine `alohash.fr` et messagerie (boîte `contact@alohash.fr`, qui reçoit aussi les messages envoyés à `contact@keurcook.com`). Le domaine ne sert plus qu'à la messagerie : aucun site n'y est publié (choix du propriétaire, pas de redirection).
- **Console** : IONOS (Domaines & SSL → alohash.fr ; E-mail).
- **Identifiants publics** : enregistrements de messagerie (MX, SPF, DKIM, DMARC) sur `alohash.fr`, à conserver.
- **Secrets** : aucun dans le dépôt (accès au compte IONOS hors dépôt).
- **Coût** : à vérifier dans la console IONOS.

### 4. Amazon Partenaires

- **Rôle** : les boutons « Acheter · prix » mènent à Amazon.fr (programme Partenaires, tag `keurcook-21`, `src/lib/amazon.ts`) ; Amazon encaisse et livre. Produits retenus : plus de 3,5 étoiles sur Amazon ; prix indicatifs relevés le 27/09/2026. `keurcook.com` doit être ajouté à la liste des sites du compte.
- **Console** : https://partenaires.amazon.fr.
- **Identifiants publics** : tag partenaire `keurcook-21` (`NEXT_PUBLIC_AMAZON_TAG` pour le changer).
- **Secrets** : aucun.
- **Coût** : gratuit ; commission versée par Amazon sur les achats.

### 5. Photos (OpenArt)

- **Rôle** : photos OpenArt des recettes, des produits et des articles « Conseils », converties en WebP dans `public/recipes`, `public/products` et `public/conseils`.
- **Console** : https://openart.ai.
- **Identifiants publics** : aucun.
- **Secrets** : aucun dans le dépôt.
- **Coût** : crédits OpenArt.
