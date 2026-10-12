# INFRA — fiche technique

Mis à jour le 12 octobre 2026, d'après le code du dépôt et le site en ligne. Aucun secret ici :
uniquement des noms de variables et de consoles.

## Vue d'ensemble

- **Plateforme** : site web éditorial en français sur les livres et BD d'auteurs d'Afrique
  subsaharienne et de leur diaspora.
- **Stack** : Next.js 16 (export statique) + React 19 + Tailwind CSS 4, TypeScript, Marked pour les
  articles Markdown. Catalogue dans `src/lib/demo/`, pays dans `src/lib/countries.ts`, articles
  « Conseils » dans `content/conseils/`. Base technique reprise de Keur Cook.
- **Backend** : aucun. Site entièrement statique (dossier `out/`), sans base de données, sans
  compte, sans cookie. La pile à lire reste dans le navigateur du visiteur.
- **Taille** : 957 adresses dans le sitemap au 12 octobre 2026 (675 livres, 122 BD, 92 auteurs,
  26 pays, 34 articles Conseils publiés, pages de liste et pages légales).
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
- **En-têtes** : `public/_headers` (politique de sécurité limitée au site lui-même, HSTS, cache des
  images) ; les adresses techniques `*.pages.dev` sont en `noindex`.
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
