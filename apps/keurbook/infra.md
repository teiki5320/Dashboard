# INFRA — fiche technique

Généré le 1er octobre 2026 par un scan du dépôt (côté Dashboard : si le dépôt publie un jour
`docs/INFRA.md`, cette fiche sera remplacée par la sienne).

## Vue d'ensemble

- **Plateforme** : site web éditorial en français présentant des livres et BD d'auteurs d'Afrique
  subsaharienne et de leur diaspora.
- **Stack** : Next.js (export statique) + React + Tailwind CSS, TypeScript, contenu en Markdown
  (`content/conseils/`, 10 articles au 1er octobre 2026) ; base technique reprise de Keur Cook.
- **Backend** : aucun. Site entièrement statique, pas de base de données, pas d'espace de stockage.
- **Distribution** : deux chemins coexistent — `deploy.yml` publie sur **Cloudflare Pages** (projet
  « keurbook »), `pages.yml` publie une **version provisoire non indexée** sur GitHub Pages.
- **Particularités** : interrupteur de maintenance dans `content/maintenance.json` (désactivé
  aujourd'hui), tests automatisés dans `tests/`.

## Services

### 1. GitHub

- **Rôle** : dépôt du code et du contenu, et intégration continue — trois workflows : `deploy.yml`
  (publication Cloudflare Pages), `pages.yml` (version provisoire), `maintenance.yml`.
- **Console** : https://github.com/teiki5320/keurbook
- **Secrets** : aucun dans le dépôt.

### 2. Cloudflare Pages (hébergement web)

- **Rôle** : hébergement visé du site (Cloudflare Pages, projet « keurbook »), comme pour Keur Cook.
- **Secrets** : `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID`, attendus dans les secrets du
  dépôt. Le workflow avertit explicitement quand ils manquent — à vérifier dans la console.

### 3. keurbook.com (nom de domaine)

- **Domaine visé** : `keurbook.com`.
- **État au 1er octobre 2026** : l'adresse **ne répond pas encore** (aucune résolution). La seule
  version accessible est la provisoire : https://teiki5320.github.io/keurbook/

### 4. Amazon Partenaires (affiliation)

- **Rôle** : liens d'affiliation vers les livres présentés, tag `keurbook-21`.
- **Console** : https://partenaires.amazon.fr
