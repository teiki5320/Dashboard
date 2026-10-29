# INFRA — fiche technique

Mis à jour le 29 octobre 2026, d'après le code du dépôt et le site en ligne. Aucun secret ici :
uniquement des noms de variables et de consoles.

## En bref

- **Plateforme** : site web éditorial, en français, sur ordinateur et mobile
- **Stack** : Next.js 16 en export statique, React 19, Tailwind CSS 4
- **Backend** : aucun — site statique, sans base ni compte
- **Distribution** : Cloudflare Pages, publié par GitHub Actions
- **Site** : keurbook.com (982 adresses dans le sitemap)
- **IA et outils** : routine « Écrire les articles Conseils », veille actus (2 passages par jour), IndexNow, Cloudflare Web Analytics

## Parcours

- 🌐 **Web** : 🐙 GitHub — main · publication au vert [ok] → ⚙️ GitHub Actions — lint, types, tests, build [ok] → ☁️ Cloudflare Pages — projet keurbook [ok] → 🌍 keurbook.com — en ligne, réponse 200 [ok]
- 📝 **Contenu** : ✍️ Articles Conseils — 41 publiés, 20 programmés [ok] → ⚙️ GitHub Actions — publie lundi, mercredi, vendredi [ok] → 📡 IndexNow — sitemap signalé après chaque publication et chaque lundi [ok] → 🔍 Google — 680 pages indexées sur 982 [à faire]
- 📰 **Veille actus** : 📡 Tâche de veille — 12 h et 19 h, 10 flux RSS [ok] → 🐙 Dépôt veille — actus/keurbook.json sur GitHub Pages [ok] → 🌍 keurbook.com — accueil (4), /actus (20), fiches auteur (3) [ok]
- 🛒 **Affiliation** : 📚 Fiche livre ou BD — bouton « Voir sur Amazon » [ok] → 🛒 Amazon Partenaires (affiliation) — tag keurbookfr-21 [ok] → 🔗 Liens directs — 436 ASIN sur 796 livres et BD [en cours]
- 📰 **Publicité** : 📰 AdSense (publicité web) — script et 4 blocs en place [ok] → ✅ Validation du site — refusée le 21/10, réexamen demandé le 22/10, « En préparation » au 29/10 [pas encore] → 💶 Revenus — aucun constaté [pas encore]

## Vue d'ensemble

- **Plateforme** : site web éditorial en français sur les livres et BD d'auteurs d'Afrique
  subsaharienne et de leur diaspora.
- **Stack** : Next.js 16 (export statique) + React 19 + Tailwind CSS 4, TypeScript, Marked pour les
  articles Markdown. Catalogue dans `src/lib/demo/`, pays dans `src/lib/countries.ts`, articles
  « Conseils » dans `content/conseils/`, pages « Top 10 » (11 sujets) dans `src/lib/top10/`. Base technique reprise de Keur Cook.
- **Backend** : aucun. Site entièrement statique (dossier `out/`), sans base de données, sans
  compte. La pile à lire reste dans le navigateur du visiteur. Seuls cookies : ceux de Google AdSense,
  après accord dans le bandeau de consentement de Google (voir docs/PUBLICITE.md).
- **Taille** : 982 adresses dans le sitemap au 29 octobre 2026 (675 livres, 121 BD, 92 auteurs,
  26 pays, 41 articles Conseils publiés, 11 pages Top 10, la page Actus, 6 articles d'actus, pages de liste
  et pages légales ; 980 le 28 octobre avec 4 articles d'actus, 975 le 27 octobre, avant les articles d'actus, et 974 jusqu'au 26 octobre, avant la page Actus).
- **Particularités** : interrupteur de maintenance dans `content/maintenance.json` (désactivé),
  tests de cohérence des contenus dans `tests/`, contrôle du site construit avant chaque mise en ligne
  (`tests/sortie/`, depuis le 28 octobre 2026), signalement IndexNow après chaque publication et chaque lundi.

## GitHub

- **Rôle** : dépôt du code et des contenus, et trois workflows :
  - `deploy.yml` (« Publier le site ») : lint, types, tests, build (dates du plan du site recalculées
    avant, historique git complet), contrôle du site construit, puis publication sur
    Cloudflare Pages à chaque push sur `main`, chaque lundi, mercredi et vendredi à 23 h 15 UTC la
    veille (articles programmés), chaque jour à 11 h 50 et 18 h 50 UTC (pages des articles d'actus,
    depuis le 28 octobre 2026) et à la main. Depuis le 28 octobre 2026 : échec en rouge si un secret
    Cloudflare manque, et vérification (3 minutes au plus) que `https://keurbook.com/version.txt` sert la
    nouvelle version ;
  - `indexnow.yml` : signale toutes les pages du sitemap publié à IndexNow (Bing, Yandex…) après
    chaque publication réussie de `main` (depuis le 28 octobre 2026), chaque lundi à 2 h UTC et à la demande ;
  - `maintenance.yml` : met le site en pause ou le rouvre, puis republie.
- **Console** : https://github.com/teiki5320/keurbook
- **Secrets** : `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID`, réglés dans les secrets
  Actions du dépôt, jamais dans le code.

## Hébergement web (GitHub Pages / Cloudflare Pages)

- **Fournisseur** : Cloudflare Pages, projet `keurbook`, publié par `wrangler` depuis `deploy.yml`.
- **En-têtes** : `public/_headers` (politique de sécurité limitée au site lui-même, à Google AdSense,
  à Cloudflare Web Analytics et, depuis le 27 octobre 2026, à `teiki5320.github.io` pour le fichier et les images
  de la veille actus — `connect-src` et `img-src` seulement —, HSTS, cache des images) ; les adresses techniques `*.pages.dev` sont en `noindex`, et depuis le 28 octobre 2026
  les fichiers `.txt` internes de Next.js aussi (sauf `ads.txt`, `robots.txt` et la clé IndexNow).
- **Redirections** : `public/_redirects`.
- **Cache des pages** : depuis le 28 octobre 2026, une règle de cache Cloudflare (Caching → Cache Rules, « Pages HTML en cache 10 min ») garde les pages HTML de keurbook.com (adresses sans point) 10 minutes chez Cloudflare ; les erreurs et redirections (codes 300 et plus) ne sont jamais gardées. Une page republiée apparaît donc en 10 minutes au plus. Réponse du serveur : environ 0,2 s au lieu de 0,6 à 2,8 s avant.
- **Console** : tableau de bord Cloudflare, rubrique Workers & Pages → `keurbook`.

## Nom de domaine

- **Domaine** : `keurbook.com`, adresse canonique sans www ; `www.keurbook.com` redirige vers elle
  (301).
- **Registraire et DNS** : Cloudflare (Cloudflare Registrar, serveurs de noms Cloudflare). Échéance
  à vérifier dans la console Cloudflare (renouvellement prévu en octobre 2027).
- **Adresse de contact** : `keurbook@toakeur.com`, affichée sur le site (`NEXT_PUBLIC_CONTACT_EMAIL`).
  Le domaine reçoit aussi le courrier par Cloudflare Email Routing (ancienne adresse
  `contact@keurbook.com`, renvoyée vers la boîte de gestion).
- **Console** : tableau de bord Cloudflare, rubrique Domaines → `keurbook.com`.

## Amazon Partenaires (affiliation)

- **Rôle** : les boutons « Voir sur Amazon » (au moins 44 px de haut) mènent à Amazon.fr avec le tag `keurbookfr-21`
  (construits par `src/lib/amazon.ts`, réglable par `NEXT_PUBLIC_AMAZON_TAG`). Depuis le 28 octobre 2026, le lien
  reçoit un emplacement (fiche, top, conseil, rubrique) et prend son code dans une table unique (`AMAZON_TAGS`) :
  tous les emplacements utilisent encore `keurbookfr-21`. 436 livres et BD sur 796 ont un ASIN vérifié
  (`src/lib/demo/amazon-asins.json`, date de vérification par livre) et mènent directement à leur fiche Amazon :
  90 le 19 octobre 2026 (pages Top 10), 359 ajoutés le 28 octobre 2026 (titre et ISBN-13 comparés à la fiche,
  bouton « Ajouter au panier » présent), puis 16 retirés le même jour car plus vendus neufs (dont Le monde s'effondre,
  Une si longue lettre, Allah n'est pas obligé dans l'édition de la fiche) ; deux sont revenus le même jour avec
  une édition neuve en stock, vérifiée (Aya de Yopougon : Gallimard BD 2022 ; L'Intérieur de la nuit : Plon 2005).
  Le monde s'effondre mène aussi à une édition neuve : la nouvelle traduction de Pierre Girard, « Tout s'effondre »
  (Les Belles Lettres, 2026), affichée dans la fiche. Le 29 octobre 2026, Éthiopiques est passé à l'Œuvre poétique
  de Senghor (Points), l'édition Seuil n'étant plus vendue neuve (toujours 436 ASIN vérifiés). Assèze l'Africaine, n° 1 de son Top 10, reste sur la recherche :
  aucune édition vendue neuve. L'Empire peul du Macina, épuisé, reste
  sans lien direct depuis le 24 octobre 2026. Les autres ouvrent une recherche Amazon (ISBN ou titre + auteur, rayon Livres).
- **Vérification de la disponibilité** : `npm run verifier-produits` (sur le Mac, pas sur GitHub ; `--ecrire`,
  `--lot 30`, `--ids …`) ouvre chaque page Amazon : bouton d'achat présent → date du jour ; sinon le livre passe en
  « indisponibles » et revient à la recherche. Premier passage le 28 octobre 2026 (54 confirmés, 16 retirés,
  20 non vérifiés car Amazon a demandé un captcha : à relancer).
- **Site déclaré** : `keurbook.com` est déclaré sur le nouveau compte Amazon Partenaires (ouvert le 18 octobre 2026, tag `keurbookfr-21`).
- **Contrôle** : une routine quotidienne (Keur Cook, Keurbook, Keur Foot, Keur Kado) vérifie
  chaque matin que les livres liés sont toujours en vente sur Amazon.
- **Console** : https://partenaires.amazon.fr (nouveau compte Amazon Partenaires créé le 18 octobre 2026, l'ancien ayant été fermé par Amazon ; identifiant `keurbookfr-21` depuis cette date).

## AdSense (publicité web)

- **Rôle** : annonces Google sur le site, une fois le site validé. Historique : première demande d'examen le 12 octobre 2026, refusée le 21 octobre 2026 (« contenu à faible valeur informative ») ; les 796 fiches ont été rallongées le 21 octobre et l'examen a été redemandé le 22 octobre 2026. État du nouvel examen : « En préparation » dans la console, ni validé ni refusé (vérifié le 29 octobre 2026) ; **aucune annonce ne s'affiche pour l'instant**. Script AdSense et balise
  `google-adsense-account` chargés dans `src/app/layout.tsx` ; identifiant d'éditeur dans
  `src/lib/config.ts` (`ADSENSE_CLIENT`, réglable par `NEXT_PUBLIC_ADSENSE_CLIENT` ; laissée vide,
  plus aucun script Google ne serait chargé). `public/ads.txt` est publié et répond (la console AdSense l'affiche encore « Introuvable » au 29 octobre 2026).
- **Emplacements choisis** (annonces automatiques désactivées), composant `AdSlot`, mention
  « Publicité » visible : 1 en fin de fiche livre ou BD, 1 après la biographie d'un auteur, 1 sur
  les pages pays, 2 dans les articles Conseils. Aucune sur l'accueil, les listes, les Top 10, la pile à lire
  et les pages légales. Identifiants des blocs dans `ADSENSE_SLOTS` (variables
  `NEXT_PUBLIC_ADSENSE_SLOT_FICHE`, `_AUTEUR`, `_PAYS`, `_ARTICLE`).
- **Consentement** : bandeau « Confidentialité et messages » d'AdSense (réglementations
  européennes), lien « Gérer mes cookies » en pied de page ; la politique de sécurité de
  `public/_headers` n'ouvre que les domaines Google nécessaires.
- **Détail** : docs/PUBLICITE.md.
- **Validation du site et revenus** : refusée le 21 octobre 2026, nouvel examen demandé le 22 octobre 2026, « En préparation » dans la console (vérifié le 29 octobre 2026) ; aucun revenu tant que le site n'est pas validé.
- **Console** : https://adsense.google.com (compte `pub-2680784147246798`, géré avec `admin@toakeur.com`).

## Analytics (mesure d'usage)

- **Fournisseur** : Cloudflare Web Analytics, gratuit et sans cookie. La balise est ajoutée par
  Cloudflare aux pages servies (rien dans le code) ; depuis le 13 octobre 2026, la politique de
  sécurité de `public/_headers` autorise son script (`static.cloudflareinsights.com`) et son envoi
  (`cloudflareinsights.com`), qui étaient bloqués jusque-là. Balise constatée en ligne le 14 octobre
  2026. La page Confidentialité décrit cette mesure.
- **Chiffres** : à vérifier dans la console.
- **Console** : tableau de bord Cloudflare, rubrique Analytics & Logs → Web Analytics.

## Veille actus

- **Rôle** : actus du livre et de la BD d'Afrique (titre reformulé, résumé réécrit, lien vers la source,
  image libre de droits avec son crédit), en ligne depuis le 27 octobre 2026. Une tâche Claude les
  prépare 2 fois par jour (12 h et 19 h) à partir de 10 flux RSS, dans le dépôt public `teiki5320/veille`.
- **Lecture** : le site lit `https://teiki5320.github.io/veille/actus/keurbook.json` (schéma v3) directement
  dans le navigateur du visiteur, sans reconstruction (`src/lib/veille.ts` : délai de 8 s, cache de
  15 minutes dans le navigateur ; fichier injoignable = bloc absent, page intacte). Les images viennent
  aussi de `teiki5320.github.io`.
- **Emplacements** : bloc « Actus du livre » sur l'accueil (4 actus), page `/actus` (20 actus, dans le
  menu et le sitemap), bloc « L'actu de … » sur chaque fiche auteur (3 actus liées à l'auteur ; absent
  s'il n'y en a pas). Composants dans `src/components/actus/`. Jamais de lien Amazon dans ces blocs.
- **Articles complets** (depuis le 28 octobre 2026) : chaque actu a son article de 300 à 450 mots, écrit
  par la veille (`articles/keurbook/<id>.json`, schéma article v1), jamais supprimé ensuite. Au build,
  `scripts/veille-articles.mjs` lit l'index de tous les articles (`articles/keurbook/index.json`) et les actus
  récentes (fichier `.veille/articles.json`, non suivi ; veille injoignable = 0 page, build intact) et le site construit une page `/actus/<adresse>` par article (fil d'Ariane, chapô, image et
  crédit, intertitres, encadré « Sources », liens vers les fiches auteurs, 3 autres actus, 1 annonce
  AdSense « article »), avec `NewsArticle` en JSON-LD, dans le sitemap (et donc IndexNow). Reconstruction
  2 fois par jour (11 h 50 et 18 h 50 UTC) par `deploy.yml`. Les articles parus entre deux constructions
  s'ouvrent dans la page de secours `/actus/article?id=<id>` (lue dans le navigateur, `noindex`, hors
  sitemap). Toute la carte d'une actu ouvre l'article sur le site ; sans article, elle ouvre la source.
- **Fiches pour la veille** : `public/veille/entites.json` (92 auteurs : tag `auteur:<slug>`, nom
  public, variantes sans accents, pays), généré à chaque build par `scripts/veille-entites.mjs`
  et publié sur `https://keurbook.com/veille/entites.json`. La tâche de veille s'en sert pour relier une
  actu à un auteur.
- **Console** : https://github.com/teiki5320/veille (aucune clé, aucun secret).
