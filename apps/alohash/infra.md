# INFRA — fiche technique

Généré le 28 septembre 2026 par un scan du dépôt. Pour mettre à jour : relancer ce même prompt.

## Vue d'ensemble

- **Plateforme** : site web en français de recettes de plats africains (46 recettes, 16 pays), rubrique « Conseils » (articles Markdown dans `content/conseils/`, un par lundi, publication programmée) et boutique de 91 produits en 8 gammes dont les boutons « Acheter · prix » mènent à Amazon.fr (programme Partenaires). Le site ne vend rien lui-même.
- **Stack** : Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Zod (validation) · Three.js (carte de l'Afrique en particules) · Marked (articles Markdown).
- **Backend** : fonctions serveur Next.js (Server Actions, route handlers) ; base PostgreSQL chez Neon via le pilote `@neondatabase/serverless` (`src/lib/db/`) ; envoi de photos depuis l'admin vers Vercel Blob (`src/app/admin/upload/route.ts`). Sans `DATABASE_URL`, le site tourne en mode démo avec les données de `src/lib/demo/`.
- **Distribution** : deux versions publiées depuis la branche `main` :
  - site de référence sur Vercel (`www.alohash.fr` : recettes, conseils, boutique, avis, newsletter, espace admin) ;
  - vitrine de démonstration sur GitHub Pages (`npm run build:pages`), en `noindex`, sans avis, newsletter ni admin.
- **Particularités** :
  - pages légales `/conditions` (CGU ; `/cgv` y redirige), `/mentions-legales`, `/confidentialite` ; bannière cookies d'information (cookies nécessaires seulement) ;
  - blocage des allégations de santé à l'enregistrement d'un produit ou d'une recette (`src/lib/compliance.ts`) ;
  - étiquetage alimentaire sur chaque produit (ingrédients, allergènes, conservation), obligatoire pour publier ;
  - avis des visiteurs publiés seulement après validation dans l'admin ;
  - espace admin protégé par un mot de passe unique et un cookie signé de 7 jours (`src/lib/admin-session.ts`, `src/proxy.ts`) ;
  - limitation des tentatives (table `rate_limits`, IP hachée) : connexion admin 5 par 15 min, avis et newsletter 5 par heure (`src/lib/rate-limit.ts`) ;
  - CSP et HSTS dans `next.config.ts` ; en maintenance, pages en `noindex` et sitemap vide ;
  - liens Amazon construits par `src/lib/amazon.ts` (tag `kultiva-21`, champ `amazon_asin` en base et dans l'admin) ; prix indicatifs relevés le 27/09/2026.

### 1. GitHub

- **Rôle** : dépôt du code et publication automatique de la vitrine de démonstration (workflow `.github/workflows/pages.yml` : lint, types, tests, build, déploiement à chaque push sur `main` et chaque lundi à 0 h 15 par cron, pour publier les articles programmés).
- **Console** : https://github.com/teiki5320/alohash (Actions, Settings → Pages).
- **Identifiants publics** : dépôt `teiki5320/alohash` ; vitrine https://teiki5320.github.io/alohash/.
- **Secrets** : aucun secret utilisé par le workflow.
- **Coût** : à vérifier dans la console.

### 2. Vercel (site de référence)

- **Rôle** : héberge le site de référence ; redéploie à chaque push sur `main` (dépôt relié au projet).
- **Console** : https://vercel.com, projet `alohash`, équipe `teiki5320-2617s-projects`.
- **Identifiants publics** : https://www.alohash.fr (domaine principal) et https://alohash.vercel.app.
- **Secrets** : dans les variables d'environnement du projet Vercel (Environment Variables) : `DATABASE_URL`, `ADMIN_PASSWORD`. Variable publique : `NEXT_PUBLIC_SITE_URL`. Liste complète des variables attendues : `.env.example`.
- **Coût** : plan Hobby (gratuit). Les conditions de Vercel réservent Hobby à un usage non commercial : à vérifier avec les revenus d'affiliation (plan Pro éventuellement nécessaire).

### 3. Neon (base de données PostgreSQL)

- **Rôle** : recettes, avis (à valider), inscrits à la newsletter, catalogue (gammes, produits, variantes, ASIN Amazon), réglages (maintenance) et limitation des tentatives (`rate_limits`).
- **Console** : https://console.neon.tech, projet `alohash`.
- **Identifiants publics** : région AWS Europe Central 1 (Francfort) ; schéma dans `db/schema.sql`, données de démo dans `db/seed.sql`.
- **Secrets** : chaîne de connexion dans `DATABASE_URL` (variables Vercel ; en local, `.env.local`, non versionné).
- **Coût** : offre gratuite ; limites à vérifier dans la console.

### 4. Vercel Blob (fichiers)

- **Rôle** : prévu pour les photos des produits et des recettes envoyées depuis l'admin, par URL présignée. Non utilisé pour l'instant : le stockage relié est en accès Private, et les photos sont ajoutées directement dans le dépôt (`public/products`, `public/recipes`, `public/conseils`).
- **Console** : Vercel → projet `alohash` → Storage.
- **Identifiants publics** : `BLOB_STORE_ID` (ajouté par Vercel lors de la liaison du stockage) ; images servies depuis `*.public.blob.vercel-storage.com` (`next.config.ts`).
- **Secrets** : aucun sur Vercel (accès par OIDC) ; hors Vercel, `BLOB_READ_WRITE_TOKEN`.
- **Coût** : à vérifier dans la console.

### 5. Amazon Partenaires

- **Rôle** : les boutons « Acheter · prix » mènent à Amazon.fr (programme Partenaires, tag `kultiva-21`, `src/lib/amazon.ts`) ; Amazon encaisse et livre. Produits retenus : plus de 3,5 étoiles sur Amazon ; prix indicatifs relevés le 27/09/2026.
- **Console** : https://partenaires.amazon.fr.
- **Identifiants publics** : tag partenaire `kultiva-21` (`NEXT_PUBLIC_AMAZON_TAG` pour le changer).
- **Secrets** : aucun.
- **Coût** : gratuit ; commission versée par Amazon sur les achats.

### 6. Domaine

- **Rôle** : adresse du site, `www.alohash.fr` (principale) ; `alohash.fr` redirige vers `www`.
- **Console** : IONOS (Domaines & SSL → alohash.fr → DNS) et Vercel (projet alohash → Domains).
- **Identifiants publics** : A `@` et CNAME `www` pointés vers Vercel ; messagerie IONOS (MX, SPF, DKIM, DMARC) sur le même domaine, adresse `contact@alohash.fr`.
- **Secrets** : aucun dans le dépôt (accès au compte IONOS hors dépôt).
- **Coût** : à vérifier dans la console IONOS.

### 7. Photos (OpenArt)

- **Rôle** : photos des recettes, des produits et des articles « Conseils », générées avec OpenArt (modèle Seedream 4.5), converties en WebP dans `public/recipes`, `public/products` et `public/conseils`.
- **Console** : https://openart.ai.
- **Identifiants publics** : aucun.
- **Secrets** : aucun dans le dépôt.
- **Coût** : crédits OpenArt (15 crédits par image au réglage utilisé).
