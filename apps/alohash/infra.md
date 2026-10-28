# INFRA — fiche technique

Mis à jour le 28 octobre 2026 (articles complets des actus ; 41 articles « Conseils » en ligne ; AdSense vérifié dans la console) ; dernier scan complet du dépôt le 26 octobre 2026. Pour mettre à jour : relancer ce même prompt.

## En bref

- **Plateforme** : site web de recettes africaines, en français
- **Stack** : Next.js 16 en export statique · React 19 · Tailwind 4
- **Backend** : aucun, site 100 % statique sans base de données
- **Distribution** : Cloudflare Pages, publié par GitHub Actions
- **Site** : https://keurcook.com (www redirigé)
- **IA et outils** : photos OpenArt · Amazon Partenaires · AdSense · Cloudflare Web Analytics · veille actus (2 passages par jour)

## Parcours

- 🌐 **Web** : 🐙 GitHub — main · publication au vert [ok] → ☁️ Hébergement web — Cloudflare Pages, projet keurcook [ok] → 🔗 Nom de domaine — keurcook.com, SSL Cloudflare [ok] → 👥 Visiteurs — site ouvert au public [ok]
- 📝 **Contenu** : 🐙 GitHub — 26 articles programmés [ok] → ⏰ GitHub Actions — publication lun., mer., ven. [ok] → 🌐 keurcook.com — 41 articles en ligne [ok] → ✍️ Réserve — vide le 28 décembre 2026 [à faire]
- 🛒 **Affiliation** : 🌐 keurcook.com — boutons « Voir sur Amazon » [ok] → 🤝 Affiliation — Amazon Partenaires, tag keurcookfr-21 [ok] → 📦 Amazon.fr — Amazon encaisse et livre [ok]
- 📰 **Veille actus** : 📡 Tâche de veille — 12 h et 19 h, 15 flux RSS [ok] → 🐙 Dépôt veille — actus/keurcook.json sur GitHub Pages [ok] → 🏗️ Build GitHub Actions — 12 h 50 et 19 h 50, une page /actus/<adresse> par article [ok] → 🌍 keurcook.com — accueil (4), /actus (20), pages pays (3), articles complets [ok]
- 📢 **Publicité** : 🌐 keurcook.com — six emplacements « Publicité » [ok] → 💰 AdSense (publicité web) — « En préparation » au 28 octobre (examen demandé le 12 octobre), aucune annonce [à faire]

## Vue d'ensemble

- **Plateforme** : site web en français **Keur Cook** (anciennement Alohash) de recettes de plats africains (58 recettes, dont six thés, cafés et infusions, de 16 pays), rubrique « Conseils » (articles Markdown dans `content/conseils/`, trois par semaine : lundi, mercredi, vendredi, publication programmée) boutique de 127 produits en 9 gammes dont les boutons « Voir sur Amazon » mènent à Amazon.fr (programme Partenaires), et rubrique « Top 10 » (10 classements de produits, `/top-10/<sujet>`, selon la note moyenne des acheteurs sur Amazon.fr, relevé du 19 octobre 2026, sauf l'onglet Farines classé selon le nombre de recettes ; au moins 10 évaluations, sauf l'onglet Livres ; notes jamais affichées), et, depuis le 27 octobre 2026, « Actus de la cuisine africaine » lues en direct depuis la veille actus (`/actus`, accueil, pages pays ; voir section 9). Emplacements Google AdSense prêts sur les recettes, les articles et les pages pays depuis le 12 octobre 2026, mais le site est encore en examen chez Google : aucune annonce ne s'affiche pour l'instant. Le site ne vend rien lui-même. Éditeur : ALOHASH (SAS), nom commercial TOA CORP.
- **Stack** : Next.js 16 (App Router, `output: "export"`) · React 19 · TypeScript · Tailwind CSS 4 · Three.js (carte de l'Afrique en particules) · Marked (articles Markdown) · sharp (images de partage et d'épingles au build).
- **Backend** : aucun. Site 100 % statique (dossier `out/`) : pas de serveur, pas de base de données, pas d'espace admin. Recettes, produits et Top 10 dans `src/lib/demo/`, articles dans `content/conseils/`, mode maintenance dans `content/maintenance.json` (lu au build ; désactivé aujourd'hui).
- **Distribution** : une seule version, https://keurcook.com (`www` redirigé), publiée sur Cloudflare Pages par GitHub Actions depuis la branche `main`.
- **Mesure d'audience** : Cloudflare Web Analytics, sans cookie, ajouté par Cloudflare aux pages servies (rien dans le code) ; la politique de sécurité (`public/_headers`) l'autorise depuis le 13 octobre 2026 (voir section 8).
- **Particularités** :
  - pages légales `/conditions` (CGU ; `/cgv` y redirige), `/mentions-legales`, `/confidentialite`, groupe de routes `src/app/(legal)` accessible même en maintenance ; hébergeur indiqué : Cloudflare, Inc. ; consentement aux cookies recueilli par le message de Google (Confidentialité et messages, dans AdSense), que le lien « Cookies » du pied de page rouvre (`src/components/compliance/CookieBanner.tsx`) ; l'ancien bandeau maison n'est plus affiché ;
  - liste des allégations de santé interdites (`src/lib/compliance.ts`) ;
  - étiquetage alimentaire sur chaque produit (ingrédients, allergènes, conservation) ;
  - mode maintenance piloté par le bouton « Maintenance » de GitHub Actions ; en maintenance, pages en `noindex` et sitemap vide ;
  - en-têtes de sécurité (CSP, HSTS, `X-Frame-Options`, `nosniff`…) dans `public/_headers` ; la CSP n'ouvre que les adresses Google d'AdSense et du consentement, celles de Cloudflare Web Analytics et, depuis le 27 octobre 2026, `teiki5320.github.io` pour la veille actus (`connect-src` et `img-src` seulement) ; redirections (`/cgv`, `/categorie/<gamme>` (une règle par gamme), anciennes pages `/panier`, `/commande`, `/admin`…) dans `public/_redirects` ;
  - favoris stockés dans le navigateur (aucun compte) ;
  - liens Amazon construits par `src/lib/amazon.ts` (tag `keurcookfr-21`, champ `amazonAsin` rempli depuis les offres de `src/lib/demo/catalog*.ts`) ; aucun prix affiché sur le site depuis le 28 octobre 2026 (seul celui d'Amazon fait foi).

## 1. GitHub

- **Rôle** : dépôt du code et publication automatique.
  - `.github/workflows/deploy.yml` (« Publier le site ») : lint, types, tests, build, puis `wrangler pages deploy out --project-name=keurcook` ; à chaque push sur `main`, chaque lundi, mercredi et vendredi à 0 h 15 (cron, articles programmés), chaque jour à 11 h 50 et 18 h 50 UTC (cron `50 11,18 * * *`, depuis le 28 octobre 2026 : pages des articles d'actus après la veille), à la main et après la maintenance.
  - `.github/workflows/indexnow.yml` (« Signaler les pages (IndexNow) ») : chaque lundi à 3 h UTC et à la main, `node scripts/indexnow.mjs` envoie les adresses du sitemap publié à IndexNow (Bing, Yandex, Seznam…). Clé publique dans le script et dans `public/<clé>.txt`.
  - `.github/workflows/maintenance.yml` (« Maintenance ») : choix Oui/Non et message facultatif ; modifie `content/maintenance.json`, l'enregistre sur `main` et relance la publication.
- **Console** : https://github.com/teiki5320/keurcook (Actions, Settings → Secrets and variables → Actions).
- **Identifiants publics** : dépôt `teiki5320/keurcook` (anciennement `teiki5320/alohash`).
- **Secrets** : `CLOUDFLARE_API_TOKEN` (jeton API Cloudflare, droit Cloudflare Pages : Edit) et `CLOUDFLARE_ACCOUNT_ID`, dans les secrets Actions du dépôt. Sans eux, le workflow échoue (en rouge) sans rien publier ; GitHub envoie un e-mail à chaque échec.
- **Coût** : à vérifier dans la console.

## 2. Hébergement web (GitHub Pages / Cloudflare Pages)

- **Rôle** : hébergement du site sur Cloudflare Pages (projet `keurcook`, envoi direct depuis GitHub Actions avec `wrangler`). Sert aussi les en-têtes (`public/_headers`) et les redirections (`public/_redirects`).
- **Console** : https://dash.cloudflare.com (Workers & Pages → keurcook).
- **Identifiants publics** : https://keurcook.com, adresse technique https://keurcook.pages.dev.
- **Secrets** : jeton API et identifiant de compte, uniquement dans les secrets GitHub (voir ci-dessus).
- **Coût** : à vérifier dans la console.

## 3. Nom de domaine

- **Rôle** : domaine `keurcook.com` chez Cloudflare, relié au projet Pages (SSL géré par Cloudflare) ; `www.keurcook.com` redirigé vers `keurcook.com` (règle de redirection 301). Adresse de contact publique `keurcook@toakeur.com` (Cloudflare Email Routing du domaine toakeur.com, renvoyée vers la boîte de Jean) ; l'ancienne `contact@keurcook.com` arrive au même endroit.
- **Ancien domaine** : `alohash.fr` (IONOS) ne sert plus à Keur Cook (aucun site, aucune adresse). Il a été renouvelé automatiquement : il expire désormais le 16 octobre 2027.
- **Console** : https://dash.cloudflare.com (keurcook.com → DNS, Email Routing ; toakeur.com → Email Routing).
- **Identifiants publics** : `keurcook.com`, `www.keurcook.com`, `keurcook@toakeur.com`.
- **Secrets** : aucun dans le dépôt.
- **Coût** : à vérifier dans la console.

## 4. Amazon Partenaires (affiliation)

- **Rôle** : les boutons « Voir sur Amazon » mènent à Amazon.fr (programme Partenaires, tag `keurcookfr-21`, `src/lib/amazon.ts`) ; Amazon encaisse et livre. Produits retenus : plus de 3,5 étoiles sur Amazon ; aucun prix affiché sur le site depuis le 28 octobre 2026. Identifiant `keurcookfr-21` depuis le 18 octobre 2026 (nouveau compte Amazon Partenaires créé le 18 octobre 2026, l'ancien ayant été fermé par Amazon) ; sites déclarés dans le nouveau compte : à vérifier dans la console. Une routine quotidienne vérifie par lots que les produits cités sont toujours achetables. Les 13 et 14 octobre 2026, 14 produits devenus indisponibles ont été remplacés par des équivalents en vente (fiches vérifiées sur amazon.fr le 14 octobre) ; le 15 octobre, trois nouveautés de plus (bitter kola, farine d'igname, akpi) ; le 19 octobre, le berbère ; le même jour, le guedj et le café Touba, indisponibles et sans équivalent, ont été masqués de la boutique ; le 24 octobre 2026, les feuilles de baobab, le café d'Éthiopie bio et le bitter kola, indisponibles sur Amazon.fr et sans équivalent, ont été masqués à leur tour ; le 25 octobre 2026, les chips de plantain ont été remplacées par un équivalent en vente et le pèbè moulu, indisponible et sans équivalent, a été masqué ; le 28 octobre 2026, la citronnelle séchée a été remplacée par un équivalent en vente (127 produits en ligne).
- **Console** : https://partenaires.amazon.fr (nouveau compte depuis le 18 octobre 2026).
- **Identifiants publics** : tag partenaire `keurcookfr-21` (`NEXT_PUBLIC_AMAZON_TAG` pour le changer).
- **Secrets** : aucun.
- **Coût** : gratuit ; commission versée par Amazon sur les achats.

## 5. Réseaux sociaux & influenceurs (Pinterest)

- **Rôle** : compte Pinterest **Keur Cook**. Le site est revendiqué sur ce compte (balise `p:domain_verify` dans `src/app/layout.tsx`) ; chaque recette a un bouton « Épingler sur Pinterest » (`src/components/recipe/RecipeActions.tsx`) qui utilise une image verticale 1000×1500 générée par `scripts/pin-images.mjs` (`public/pins/`, 58 images ; celles des six boissons ajoutées le 19 octobre ont été faites le 23 octobre). 52 recettes ont été épinglées du 2 au 14 octobre 2026 par l'ancienne routine Claude `keurcook-epingles-pinterest` (navigateur), qui n'est plus programmée. Depuis le 23 octobre 2026, la publication automatique de Keur Déco est en place ici aussi : manifeste `epingles.json` fait au build (`scripts/epingles.ts`, une épingle par recette qui a son image), workflow `.github/workflows/pinterest.yml` chaque jour à 4 h 17 UTC (lancé aussi chaque matin par la tâche « Sites du jour » du Studio), 5 épingles par passage au plus, jamais deux de la même recette le même jour, tableaux par région (`config/pinterest.json`), état `data/pinterest-etat.json`. La clé du compte a été créée le 23 octobre 2026 ; premier passage par l'API le 24 octobre 2026 : 5 boissons épinglées (ataya, buna, chai kényan, kahawa chungu, kinkeliba), puis le rooibos glacé au passage suivant le même jour, soit les 58 recettes épinglées ; les prochains passages n'auront de nouvelle épingle à publier que pour une recette ajoutée.
- **Console** : https://fr.pinterest.com (compte Keur Cook, rattaché à `keurcook@toakeur.com`).
- **Identifiants publics** : compte Pinterest « Keur Cook » ; application Pinterest « TOA CORP publication » (accès standard, partagée avec Keur Déco).
- **Secrets** : `PINTEREST_APP_ID`, `PINTEREST_APP_SECRET` et `PINTEREST_REFRESH_TOKEN` (clé du compte Keur Cook, valable environ 60 jours), dans les secrets GitHub du dépôt depuis le 23 octobre 2026 (créés avec `npm run pinterest:auth` puis `npm run pinterest:secrets`) ; clé à refaire avant son échéance, vers le 22 décembre 2026 (ticket GitHub « refaire la clé » ouvert le 24 octobre). Jamais dans le dépôt.
- **Coût** : gratuit.

## 6. API d'IA (OpenArt, photos)

- **Rôle** : photos générées avec OpenArt pour les recettes, les produits et les articles « Conseils », converties en WebP dans `public/recipes`, `public/products` et `public/conseils`.
- **Console** : https://openart.ai.
- **Identifiants publics** : aucun.
- **Secrets** : aucun dans le dépôt.
- **Coût** : crédits OpenArt.

## 7. AdSense (publicité web)

- **Rôle** : annonces display Google sur six emplacements titrés « Publicité » (`src/components/ads/AdSlot.tsx`, `src/lib/ads.ts`) : au milieu et en fin de recette, au milieu et en fin d'article « Conseils », en fin d'article d'actu (depuis le 28 octobre 2026) et sur les pages pays ; un seul bloc d'annonces « Keur Cook » sert les six. Script `adsbygoogle.js` et balise `google-adsense-account` dans `src/app/layout.tsx`, fichier `public/ads.txt`. Le message de consentement de Google (Confidentialité et messages) gère les cookies publicitaires. Mis en place le 12 octobre 2026 (demande d'examen le même jour) ; le site est encore en examen, aucune annonce ne s'affiche pour l'instant.
- **Console** : https://adsense.google.com (compte `pub-2680784147246798`, géré avec `admin@toakeur.com`).
- **Identifiants publics** : identifiant d'éditeur `ca-pub-…` et numéro de bloc d'annonces dans `src/lib/ads.ts` et `public/ads.txt` (publics par nature).
- **Secrets** : aucun.
- **Coût** : gratuit ; Google verse une part des revenus publicitaires. Pas de revenus tant que le site n'est pas validé.

## 8. Analytics (mesure d'usage)

- **Rôle** : Cloudflare Web Analytics, mesure de fréquentation sans cookie (pages vues, pays, type d'appareil). La balise est ajoutée par Cloudflare aux pages servies ; depuis le 13 octobre 2026, `public/_headers` autorise son script (`static.cloudflareinsights.com`) et son envoi (`cloudflareinsights.com`), bloqués jusque-là. Balise constatée en ligne le 14 octobre 2026 ; la page Confidentialité décrit cette mesure.
- **Console** : https://dash.cloudflare.com (Analytics & Logs → Web Analytics).
- **Identifiants publics** : aucun dans le dépôt.
- **Secrets** : aucun.
- **Coût** : gratuit.

## 9. Veille actus

- **Rôle** : actus de la cuisine africaine (titre reformulé, résumé réécrit, lien vers la source, image libre de droits avec son crédit), en ligne depuis le 27 octobre 2026. Une tâche Claude sur le Mac mini les prépare 2 fois par jour (12 h et 19 h) à partir de 15 flux RSS, dans le dépôt public `teiki5320/veille` ; jamais d'actu santé ni de vocabulaire de vente.
- **Lecture** : le site lit `https://teiki5320.github.io/veille/actus/keurcook.json` (schéma v3) directement dans le navigateur du visiteur, sans reconstruction (`src/lib/veille.ts` : délai de 8 s, cache de 15 min dans `sessionStorage`). Fichier injoignable ou vide : aucun bloc ne s'affiche, la page reste intacte. Images servies par `teiki5320.github.io` (photos WebP 16:9 et carrées, ou carte générée).
- **Emplacements** : bloc « Actus de la cuisine africaine » sur l'accueil (4 actus, après « Cuisiner par pays »), page `/actus` (20 actus, dans le menu, le pied de page et le sitemap), bloc « L'actu de la cuisine du … » sur chaque page pays (3 actus dont le champ `pays` contient le code du pays ; absent s'il n'y en a pas), placé après « La cuisine du … », un bloc après l'annonce. Composants dans `src/components/actus/`. Jamais de lien Amazon, de bouton d'achat ni de produit de la boutique dans ces blocs.
- **Articles complets** (depuis le 28 octobre 2026) : la veille rédige pour chaque actu un article de 300 à 450 mots (`https://teiki5320.github.io/veille/articles/keurcook/<id>.json`, schéma article v1). Avant chaque build, `scripts/articles-veille.ts` lit l'index de tous les articles jamais publiés (`articles/keurcook/index.json`, jamais vidé, plus les actus récentes pas encore indexées) et télécharge chaque article dans `.veille/articles.json` (non versionné) : une page déjà en ligne ne disparaît jamais, même quand son actu sort des 60 plus récentes ; chacun devient une page `/actus/<adresse>` (`src/app/(shop)/actus/[slug]/page.tsx` : titre, chapô, date et durée de lecture, image et crédit, intertitres, encadré « Sources », fiches liées, 3 autres actus, une annonce en fin d'article ; NewsArticle en JSON-LD ; dans le sitemap, donc signalée par IndexNow le lundi). Toute la carte d'une actu ouvre cette page ; une actu plus récente que le dernier build s'ouvre sur la page de secours `/actus/article?id=…` (lue dans le navigateur, noindex, hors sitemap) ; sans article, la carte ouvre la source. Veille injoignable au build : 0 page article, le build continue. Le site est reconstruit chaque jour à 12 h 50 et 19 h 50 (heure d'hiver) par `deploy.yml`, sans clé ni secret de plus.
- **Console** : https://github.com/teiki5320/veille (aucune clé, aucun secret).
- **Coût** : gratuit (GitHub Pages et abonnement Claude existant).
