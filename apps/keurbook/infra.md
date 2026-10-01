# INFRA — fiche technique

Généré le 1er octobre 2026, mis à jour le même jour après la mise en ligne (côté Dashboard : si le
dépôt publie un jour `docs/INFRA.md`, cette fiche sera remplacée par la sienne).

## Vue d'ensemble

- **Plateforme** : site web éditorial en français présentant des livres et BD d'auteurs d'Afrique
  subsaharienne et de leur diaspora.
- **Stack** : Next.js (export statique) + React + Tailwind CSS, TypeScript ; catalogue de livres
  réparti par région dans `src/lib/demo/`, 10 articles « conseils » en Markdown
  (`content/conseils/`) ; base technique reprise de Keur Cook. 175 pages publiées d'après le
  sitemap au 1er octobre 2026.
- **Backend** : aucun. Site entièrement statique, pas de base de données, pas d'espace de stockage.
- **Distribution** : `deploy.yml` publie sur **Cloudflare Pages** (projet « keurbook ») à chaque
  push sur `main`. La version provisoire sur GitHub Pages a été arrêtée le 1er octobre 2026 avec la
  mise en ligne du domaine.
- **Particularités** : interrupteur de maintenance dans `content/maintenance.json` (désactivé
  aujourd'hui), tests automatisés dans `tests/`.

## Services

### 1. GitHub

- **Rôle** : dépôt du code et du contenu, et intégration continue — trois workflows : `deploy.yml`
  (publication Cloudflare Pages), `pages.yml` (version provisoire), `maintenance.yml`.
- **Console** : https://github.com/teiki5320/keurbook
- **Secrets** : aucun dans le dépôt.

### 2. Cloudflare Pages (hébergement web)

- **Rôle** : hébergement du site (Cloudflare Pages, projet « keurbook »), comme pour Keur Cook.
- **Secrets** : `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID`, tous deux présents dans les
  secrets du dépôt (vérifié le 1er octobre 2026) ; la publication passe depuis.

### 3. keurbook.com (nom de domaine)

- **Domaine** : `keurbook.com`, avec `www.keurbook.com`.
- **État au 1er octobre 2026** : **en ligne**, les deux adresses répondent.

### 4. Amazon Partenaires (affiliation)

- **Rôle** : liens d'affiliation vers les livres présentés, tag `keurbook-21`.
- **Console** : https://partenaires.amazon.fr
