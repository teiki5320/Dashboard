# INFRA — fiche technique

Généré le 25 septembre 2026 par un scan du dépôt. Pour mettre à jour : relancer ce même prompt.

## Vue d'ensemble

- **Plateforme** : site web en français de recettes de plats africains, avec une épicerie en ligne de produits africains rares.
- **Stack** : Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Zod (validation) · Three.js (carte de l'Afrique en particules) · Nodemailer (e-mails).
- **Backend** : fonctions serveur Next.js (Server Actions, route handlers) ; base PostgreSQL chez Neon via le pilote `@neondatabase/serverless` (`src/lib/db/`) ; envoi de photos depuis l'admin vers Vercel Blob (`src/app/admin/upload/route.ts`). Sans `DATABASE_URL`, le site tourne en mode démo avec les données de `src/lib/demo/`.
- **Distribution** : deux versions publiées depuis la branche `main` :
  - version complète sur Vercel (recettes, avis, newsletter, boutique, commande, espace admin) ;
  - vitrine statique sur GitHub Pages (`npm run build:pages`), sans commande, avis, newsletter ni admin.
- **Particularités** :
  - bannière cookies, blocage des allégations de santé à l'enregistrement d'un produit ou d'une recette (`src/lib/compliance.ts`) ;
  - étiquetage alimentaire sur chaque produit (ingrédients, allergènes, conservation), obligatoire pour publier ;
  - avis des visiteurs publiés seulement après validation dans l'admin ;
  - espace admin protégé par un mot de passe unique et un cookie signé de 7 jours (`src/lib/admin-session.ts`, `src/proxy.ts`) ;
  - paiement par Stripe Checkout et/ou virement, via une couche `PaymentProvider` extensible (`src/lib/payments/`).

### 1. GitHub

- **Rôle** : dépôt du code et publication automatique de la vitrine statique (workflow `.github/workflows/pages.yml` : lint, types, build, déploiement à chaque push sur `main`).
- **Console** : https://github.com/teiki5320/alohash (Actions, Settings → Pages).
- **Identifiants publics** : dépôt `teiki5320/alohash` ; vitrine https://teiki5320.github.io/alohash/.
- **Secrets** : aucun secret utilisé par le workflow.
- **Coût** : à vérifier dans la console.

### 2. Vercel (hébergement de la version complète)

- **Rôle** : héberge la boutique complète ; redéploie à chaque push sur `main` (dépôt relié au projet).
- **Console** : https://vercel.com, projet `alohash`, équipe `teiki5320-2617s-projects`.
- **Identifiants publics** : https://www.alohash.fr (domaine principal) et https://alohash.vercel.app.
- **Secrets** : dans les variables d'environnement du projet Vercel (Environment Variables) : `DATABASE_URL`, `ADMIN_PASSWORD`. Variable publique : `NEXT_PUBLIC_SITE_URL`. Liste complète des variables attendues : `.env.example`.
- **Coût** : plan Hobby (gratuit). Les conditions de Vercel réservent Hobby à un usage non commercial : à vérifier dans la console avant l'ouverture de l'épicerie (plan Pro probablement nécessaire).

### 3. Neon (base de données PostgreSQL)

- **Rôle** : recettes, avis (à valider), inscrits à la newsletter, catalogue, variantes, stocks, commandes et réglages (maintenance). Fonctions SQL `place_order` (création atomique de commande, prix et stocks recalculés côté base) et `cancel_order` (annulation et remise en stock).
- **Console** : https://console.neon.tech, projet `alohash`.
- **Identifiants publics** : région AWS Europe Central 1 (Francfort) ; schéma dans `db/schema.sql`, données de démo dans `db/seed.sql`.
- **Secrets** : chaîne de connexion dans `DATABASE_URL` (variables Vercel ; en local, `.env.local`, non versionné).
- **Coût** : offre gratuite ; limites à vérifier dans la console.

### 4. Vercel Blob (fichiers)

- **Rôle** : prévu pour les photos des produits et des recettes envoyées depuis l'admin, par URL présignée. Non utilisé pour l'instant : le stockage relié est en accès Private, et les photos sont ajoutées directement dans le dépôt (`public/products`, `public/recipes`).
- **Console** : Vercel → projet `alohash` → Storage.
- **Identifiants publics** : `BLOB_STORE_ID` (ajouté par Vercel lors de la liaison du stockage) ; images servies depuis `*.public.blob.vercel-storage.com` (`next.config.ts`).
- **Secrets** : aucun sur Vercel (accès par OIDC) ; hors Vercel, `BLOB_READ_WRITE_TOKEN`.
- **Coût** : à vérifier dans la console.

### 5. E-mails (SMTP)

- **Rôle** : confirmation de commande au client, notification à l'admin, changement de statut (`src/lib/email/`).
- **Console** : fournisseur SMTP au choix (exemple documenté : IONOS). Non configuré pour l'instant : sans `SMTP_HOST`, les e-mails sont seulement écrits dans les journaux du serveur.
- **Identifiants publics** : expéditeur par défaut `contact@alohash.fr` (`EMAIL_FROM`).
- **Secrets** : `SMTP_USER`, `SMTP_PASSWORD` (à ajouter dans les variables Vercel).
- **Coût** : à vérifier dans la console du fournisseur.

### 6. Paiement

- **Rôle** : deux moyens de paiement (`src/lib/payments/`), choisis par `PAYMENT_PROVIDERS` :
  - **Stripe Checkout** (`providers/stripe.ts`) : page de paiement hébergée par Stripe (carte, Apple Pay, Google Pay…), confirmation automatique par webhook `/api/payments/stripe/webhook` et au retour du client ; session expirée ou refusée = commande annulée et stock remis en vente ;
  - **virement bancaire** (`providers/bank-transfer.ts`) : l'admin passe la commande en « payée » à réception.
- **Console** : https://dashboard.stripe.com (compte en mode test) ; banque de la société pour le virement.
- **Identifiants publics** : destination webhook Stripe `https://www.alohash.fr/api/payments/stripe/webhook` (4 événements `checkout.session.*`) ; coordonnées bancaires via `PAYMENT_BANK_*` (non renseignées : valeurs d'exemple).
- **Secrets** : `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (variables Vercel, clés de test) ; `PAYMENT_PROVIDERS` dans Vercel.
- **Coût** : commissions Stripe par transaction, à vérifier dans la console. Le 25 septembre 2026, Stripe a fermé le compte ouvert pour l'ancienne activité CBD ; l'épicerie alimentaire doit être déclarée sur un compte Stripe (nouveau ou réactivé) avant les clés réelles.

### 7. Domaine

- **Rôle** : adresse du site, `www.alohash.fr` (principale) ; `alohash.fr` redirige vers `www`.
- **Console** : IONOS (Domaines & SSL → alohash.fr → DNS) et Vercel (projet alohash → Domains).
- **Identifiants publics** : A `@` et CNAME `www` pointés vers Vercel ; messagerie IONOS (MX, SPF, DKIM, DMARC) sur le même domaine, adresse `contact@alohash.fr`.
- **Secrets** : aucun dans le dépôt (accès au compte IONOS hors dépôt).
- **Coût** : à vérifier dans la console IONOS.

### 8. Photos (OpenArt)

- **Rôle** : photos de démonstration des recettes et des produits, générées par IA (modèle Seedream 4.5), converties en WebP dans `public/recipes` et `public/products`. À remplacer par de vraies photos.
- **Console** : https://openart.ai.
- **Identifiants publics** : aucun.
- **Secrets** : aucun dans le dépôt.
- **Coût** : crédits OpenArt (15 crédits par image au réglage utilisé).

### 9. Médiation de la consommation

- **Rôle** : médiateur obligatoire pour la vente aux particuliers, cité dans les CGV et les mentions légales (`src/lib/config.ts`).
- **Console** : https://www.cm2c.net (espace professionnel).
- **Identifiants publics** : CM2C, 49 rue de Ponthieu, 75008 Paris.
- **Secrets** : identifiants de l'espace professionnel, hors dépôt.
- **Coût** : à vérifier dans l'espace CM2C.
