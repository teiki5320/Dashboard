# INFRA — fiche technique

Mis à jour le 16 octobre 2026, d'après le code du dépôt et le site en ligne. Aucun secret ici :
uniquement des noms de variables et de consoles.

## En bref

- **Plateforme** : site web éditorial, en français, sur ordinateur et mobile
- **Stack** : Next.js 16 en export statique, React 19, Tailwind CSS 4
- **Backend** : aucun — site statique, sans base ni compte
- **Distribution** : Cloudflare Pages, publié par GitHub Actions
- **Site** : keurbook.com (957 adresses dans le sitemap)
- **IA et outils** : routine « Écrire les articles Conseils », IndexNow, Cloudflare Web Analytics

## Parcours

- 🌐 **Web** : 🐙 GitHub — main · publication au vert [ok] → ⚙️ GitHub Actions — lint, types, tests, build [ok] → ☁️ Cloudflare Pages — projet keurbook [ok] → 🌍 keurbook.com — en ligne, réponse 200 [ok]
- 📝 **Contenu** : ✍️ Articles Conseils — 36 publiés, 25 programmés [ok] → ⚙️ GitHub Actions — publie lundi, mercredi, vendredi [ok] → 📡 IndexNow — sitemap signalé chaque lundi [ok] → 🔍 Google — 638 pages indexées sur 957 [à faire]
- 🛒 **Affiliation** : 📚 Fiche livre ou BD — bouton « Acheter sur Amazon » [ok] → 🛒 Amazon Partenaires (affiliation) — tag keurbook-21 [ok] → 🔗 Liens directs — surtout des recherches, peu d'ASIN [à faire]
- 📰 **Publicité** : 📰 AdSense (publicité web) — script et 4 blocs en place [ok] → ✅ Validation du site — à vérifier dans la console [pas encore] → 💶 Revenus — aucun constaté [pas encore]

## Vue d'ensemble

- **Plateforme** : site web éditorial en français sur les livres et BD d'auteurs d'Afrique
  subsaharienne et de leur diaspora.
- **Stack** : Next.js 16 (export statique) + React 19 + Tailwind CSS 4, TypeScript, Marked pour les
  articles Markdown. Catalogue dans `src/lib/demo/`, pays dans `src/lib/countries.ts`, articles
  « Conseils » dans `content/conseils/`. Base technique reprise de Keur Cook.
- **Backend** : aucun. Site entièrement statique (dossier `out/`), sans base de données, sans
  compte. La pile à lire reste dans le navigateur du visiteur. Seuls cookies : ceux de Google AdSense,
  après accord dans le bandeau de consentement de Google (voir docs/PUBLICITE.md).
- **Taille** : 957 adresses dans le sitemap au 13 octobre 2026 (675 livres, 122 BD, 92 auteurs,
  26 pays, 36 articles Conseils publiés, pages de liste et pages légales).
- **Particularités** : interrupteur de maintenance dans `content/maintenance.json` (désactivé),
  tests de cohérence des contenus dans `tests/`, signalement IndexNow chaque lundi.

## GitHub

- **Rôle** : dépôt du code et des contenus, et trois workflows :
  - `deploy.yml` (« Publier le site ») : lint, types, tests, build, puis publication sur
    Cloudflare Pages à chaque push sur `main`, chaque lundi, mercredi et vendredi à 23 h 15 UTC la
    veille (articles programmés) et à la main ;
  - `indexnow.yml` : signale toutes les pages du sitemap publié à IndexNow (Bing, Yandex…) chaque
    lundi à 2 h UTC et à la demande ;
  - `maintenance.yml` : met le site en pause ou le rouvre, puis republie.
- **Console** : https://github.com/teiki5320/keurbook
- **Secrets** : `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID`, réglés dans les secrets
  Actions du dépôt, jamais dans le code.

## Hébergement web (GitHub Pages / Cloudflare Pages)

- **Fournisseur** : Cloudflare Pages, projet `keurbook`, publié par `wrangler` depuis `deploy.yml`.
- **En-têtes** : `public/_headers` (politique de sécurité limitée au site lui-même, à Google AdSense
  et à Cloudflare Web Analytics, HSTS, cache des images) ; les adresses techniques `*.pages.dev` sont en `noindex`.
- **Redirections** : `public/_redirects`.
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

- **Rôle** : les boutons « Acheter sur Amazon » mènent à Amazon.fr avec le tag `keurbook-21`
  (construits par `src/lib/amazon.ts`, réglable par `NEXT_PUBLIC_AMAZON_TAG`). Sans ASIN vérifié, le
  lien ouvre une recherche Amazon (ISBN ou titre + auteur, rayon Livres) — c'est le cas courant
  aujourd'hui.
- **Site déclaré** : `keurbook.com` figure parmi les sites déclarés chez Amazon (9 octobre 2026).
- **Contrôle** : la routine « Vérifier les liens Amazon » (Keur Cook, Keurbook, Kultiva) passe
  chaque jour.
- **Console** : https://partenaires.amazon.fr (compte Amazon Partenaires de Jean).

## AdSense (publicité web)

- **Rôle** : annonces Google sur le site depuis le 12 octobre 2026. Script AdSense et balise
  `google-adsense-account` chargés dans `src/app/layout.tsx` ; identifiant d'éditeur dans
  `src/lib/config.ts` (`ADSENSE_CLIENT`, réglable par `NEXT_PUBLIC_ADSENSE_CLIENT` — vide, plus aucun
  script Google). `public/ads.txt` est publié et répond.
- **Emplacements choisis** (annonces automatiques désactivées), composant `AdSlot`, mention
  « Publicité » visible : 1 en fin de fiche livre ou BD, 1 après la biographie d'un auteur, 1 sur
  les pages pays, 2 dans les articles Conseils. Aucune sur l'accueil, les listes, la pile à lire et
  les pages légales. Identifiants des blocs dans `ADSENSE_SLOTS` (variables
  `NEXT_PUBLIC_ADSENSE_SLOT_FICHE`, `_AUTEUR`, `_PAYS`, `_ARTICLE`).
- **Consentement** : bandeau « Confidentialité et messages » d'AdSense (réglementations
  européennes), lien « Gérer mes cookies » en pied de page ; la politique de sécurité de
  `public/_headers` n'ouvre que les domaines Google nécessaires.
- **Détail** : docs/PUBLICITE.md.
- **Validation du site et revenus** : à vérifier dans la console.
- **Console** : https://adsense.google.com (compte AdSense de Jean).

## Analytics (mesure d'usage)

- **Fournisseur** : Cloudflare Web Analytics, gratuit et sans cookie. La balise est ajoutée par
  Cloudflare aux pages servies (rien dans le code) ; depuis le 13 octobre 2026, la politique de
  sécurité de `public/_headers` autorise son script (`static.cloudflareinsights.com`) et son envoi
  (`cloudflareinsights.com`), qui étaient bloqués jusque-là. Balise constatée en ligne le 14 octobre
  2026. La page Confidentialité décrit cette mesure.
- **Chiffres** : à vérifier dans la console.
- **Console** : tableau de bord Cloudflare, rubrique Analytics & Logs → Web Analytics.
