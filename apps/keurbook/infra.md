# INFRA — fiche technique

Mis à jour le 24 octobre 2026, d'après le code du dépôt et le site en ligne. Aucun secret ici :
uniquement des noms de variables et de consoles.

## En bref

- **Plateforme** : site web éditorial, en français, sur ordinateur et mobile
- **Stack** : Next.js 16 en export statique, React 19, Tailwind CSS 4
- **Backend** : aucun — site statique, sans base ni compte
- **Distribution** : Cloudflare Pages, publié par GitHub Actions
- **Site** : keurbook.com (973 adresses dans le sitemap)
- **IA et outils** : routine « Écrire les articles Conseils », IndexNow, Cloudflare Web Analytics

## Parcours

- 🌐 **Web** : 🐙 GitHub — main · publication au vert [ok] → ⚙️ GitHub Actions — lint, types, tests, build [ok] → ☁️ Cloudflare Pages — projet keurbook [ok] → 🌍 keurbook.com — en ligne, réponse 200 [ok]
- 📝 **Contenu** : ✍️ Articles Conseils — 39 publiés, 22 programmés [ok] → ⚙️ GitHub Actions — publie lundi, mercredi, vendredi [ok] → 📡 IndexNow — sitemap signalé chaque lundi [ok] → 🔍 Google — 673 pages indexées sur 971 [à faire]
- 🛒 **Affiliation** : 📚 Fiche livre ou BD — bouton « Acheter sur Amazon » [ok] → 🛒 Amazon Partenaires (affiliation) — tag keurbookfr-21 [ok] → 🔗 Liens directs — 90 ASIN sur 796 livres et BD [à faire]
- 📰 **Publicité** : 📰 AdSense (publicité web) — script et 4 blocs en place [ok] → ✅ Validation du site — refusée le 21/10, réexamen demandé le 22/10 [pas encore] → 💶 Revenus — aucun constaté [pas encore]

## Vue d'ensemble

- **Plateforme** : site web éditorial en français sur les livres et BD d'auteurs d'Afrique
  subsaharienne et de leur diaspora.
- **Stack** : Next.js 16 (export statique) + React 19 + Tailwind CSS 4, TypeScript, Marked pour les
  articles Markdown. Catalogue dans `src/lib/demo/`, pays dans `src/lib/countries.ts`, articles
  « Conseils » dans `content/conseils/`, pages « Top 10 » (11 sujets) dans `src/lib/top10/`. Base technique reprise de Keur Cook.
- **Backend** : aucun. Site entièrement statique (dossier `out/`), sans base de données, sans
  compte. La pile à lire reste dans le navigateur du visiteur. Seuls cookies : ceux de Google AdSense,
  après accord dans le bandeau de consentement de Google (voir docs/PUBLICITE.md).
- **Taille** : 973 adresses dans le sitemap au 24 octobre 2026 (675 livres, 121 BD, 92 auteurs,
  26 pays, 39 articles Conseils publiés, 11 pages Top 10, pages de liste et pages légales).
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

- **Rôle** : les boutons « Acheter sur Amazon » mènent à Amazon.fr avec le tag `keurbookfr-21`
  (construits par `src/lib/amazon.ts`, réglable par `NEXT_PUBLIC_AMAZON_TAG`). 90 livres et BD (ceux
  des pages Top 10) ont un ASIN vérifié à la main le 19 octobre 2026 (`src/lib/demo/amazon-asins.ts`)
  et mènent directement à leur fiche Amazon (91 jusqu'au 24 octobre 2026 : L'Empire peul du Macina, épuisé et
  indisponible sur Amazon.fr, est revenu à la recherche) ; les autres ouvrent une recherche Amazon (ISBN ou
  titre + auteur, rayon Livres).
- **Site déclaré** : `keurbook.com` est déclaré sur le nouveau compte Amazon Partenaires (ouvert le 18 octobre 2026, tag `keurbookfr-21`).
- **Contrôle** : une routine quotidienne (Keur Cook, Keurbook, Keur Foot, Keur Kado) vérifie
  chaque matin que les livres liés sont toujours en vente sur Amazon.
- **Console** : https://partenaires.amazon.fr (nouveau compte Amazon Partenaires créé le 18 octobre 2026, l'ancien ayant été fermé par Amazon ; identifiant `keurbookfr-21` depuis cette date).

## AdSense (publicité web)

- **Rôle** : annonces Google sur le site, une fois le site validé. Historique : première demande d'examen le 12 octobre 2026, refusée le 21 octobre 2026 (« contenu à faible valeur informative ») ; les 796 fiches ont été rallongées le 21 octobre et l'examen a été redemandé le 22 octobre 2026. État du nouvel examen : à vérifier dans la console ; **aucune annonce ne s'affiche pour l'instant**. Script AdSense et balise
  `google-adsense-account` chargés dans `src/app/layout.tsx` ; identifiant d'éditeur dans
  `src/lib/config.ts` (`ADSENSE_CLIENT`, réglable par `NEXT_PUBLIC_ADSENSE_CLIENT` ; laissée vide,
  plus aucun script Google ne serait chargé). `public/ads.txt` est publié et répond.
- **Emplacements choisis** (annonces automatiques désactivées), composant `AdSlot`, mention
  « Publicité » visible : 1 en fin de fiche livre ou BD, 1 après la biographie d'un auteur, 1 sur
  les pages pays, 2 dans les articles Conseils. Aucune sur l'accueil, les listes, les Top 10, la pile à lire
  et les pages légales. Identifiants des blocs dans `ADSENSE_SLOTS` (variables
  `NEXT_PUBLIC_ADSENSE_SLOT_FICHE`, `_AUTEUR`, `_PAYS`, `_ARTICLE`).
- **Consentement** : bandeau « Confidentialité et messages » d'AdSense (réglementations
  européennes), lien « Gérer mes cookies » en pied de page ; la politique de sécurité de
  `public/_headers` n'ouvre que les domaines Google nécessaires.
- **Détail** : docs/PUBLICITE.md.
- **Validation du site et revenus** : refusée le 21 octobre 2026, nouvel examen demandé le 22 octobre 2026 (état à vérifier dans la console) ; aucun revenu tant que le site n'est pas validé.
- **Console** : https://adsense.google.com (compte `pub-2680784147246798`, géré avec `admin@toakeur.com`).

## Analytics (mesure d'usage)

- **Fournisseur** : Cloudflare Web Analytics, gratuit et sans cookie. La balise est ajoutée par
  Cloudflare aux pages servies (rien dans le code) ; depuis le 13 octobre 2026, la politique de
  sécurité de `public/_headers` autorise son script (`static.cloudflareinsights.com`) et son envoi
  (`cloudflareinsights.com`), qui étaient bloqués jusque-là. Balise constatée en ligne le 14 octobre
  2026. La page Confidentialité décrit cette mesure.
- **Chiffres** : à vérifier dans la console.
- **Console** : tableau de bord Cloudflare, rubrique Analytics & Logs → Web Analytics.
