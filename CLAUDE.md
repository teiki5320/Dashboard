# Gestion Pro — Dashboard

Application de gestion personnelle de Teiki, publiée sur GitHub Pages depuis
`teiki5320/Dashboard` (dépôt **public**). Ce fichier est la mémoire durable du
projet : à lire avant toute intervention.

## Règles absolues

- **Aucun secret dans le dépôt.** Ni clé, ni jeton, ni mot de passe, ni SIREN,
  ni montant réel, ni nom de client. Le dépôt est public : ce qui est committé
  une fois ne se retire plus de l'historique. Dans les fiches, on cite des
  *noms* de variables et de consoles, jamais des valeurs.
- **100 % statique, vanilla.** HTML, CSS et JavaScript à la main, aucun
  framework, aucune étape de compilation pour l'app elle-même. Deux scripts
  externes existent déjà dans `index.html` (SheetJS via jsDelivr pour les
  imports/exports Excel, Google Identity pour le module Mail) : ne pas en
  ajouter d'autres.
- **Français sobre** dans l'interface, les commentaires et les commits. Pas de
  jargon, pas de majuscules décoratives.
- **Couleurs par variables CSS** (`--fond`, `--carte`, `--texte`, `--muted`,
  `--ok`, `--ko`, `--run`…), jamais de valeur écrite en dur : le thème clair et
  le thème sombre en dépendent.

## Les modules

**Gestion Pro** — bons de livraison → factures (il n'y a **pas** de devis),
stock, TVA, Mail. Tout est dans `script.js` (~2 500 lignes) et `index.html`.
Pages : `home`, `dash`, `bl`, `facture`, `stock`, `historique`, `tva`, `compta`,
`mail`, `parametres`.

**Compta → Analyse EBE** — `ebe.js` fait les calculs (sans DOM, testable),
`ebe-module.js` l'affichage. Tests : `node --test tool/test-ebe.js`.
Les montants et l'index des PDF vivent dans Supabase sous les clés
`v90_ebe_*`, **jamais** dans le dépôt.
⚠️ Au 30 septembre 2026, le projet Supabase de l'app a été supprimé : la
synchronisation est donc hors service jusqu'à ce qu'un nouveau projet soit
créé et rebranché dans `script.js`.

**Mes apps** — `dash-module.js` pour l'affichage, `assets/dash-data.js` pour
les données. Ce dernier est **généré** par `node tool/build.js` à partir de
`apps/<id>/` et de `catalog/services.js` : toujours le régénérer et le
committer avec les fiches qu'on modifie.

## Mes apps — les 11 cartes

Le classement se fait sur `platforms` dans `apps/<id>/app.json` : une app dont
toutes les plateformes sont `Web` est un **site**, sinon c'est une **appli**. Une
liste de plateformes **vide** ne fait pas un site : l'app reste une appli.

| Groupe | App | id | dépôt suivi |
|---|---|---|---|
| Applis | Kultiva | `kultiva` | `teiki5320/Kultiva` |
| Applis | Erea | `erea` | `teiki5320/erea` |
| Applis | Drama-studio | `drama-studio` | `teiki5320/Drama-studio` |
| Applis | Tama TV | `tama-tv` | `teiki5320/Tama` |
| Applis | D-Sign | `d-sign` | `teiki5320/D-Sign` |
| Applis | Palabre | `palabre` | `teiki5320/palabre` |
| Sites | Avelor | `avelor` | `teiki5320/avelor` |
| Sites | Keur Cook | `alohash` | `teiki5320/keurcook` |
| Sites | OptiLED | `optiled` | `teiki5320/optiled` |
| Sites | Keur Déco | `keurdeco` | `teiki5320/Keurdeco` |
| Sites | Keurbook | `keurbook` | `teiki5320/keurbook` |

À retenir : **Keur Cook porte l'identifiant `alohash`** — héritage de son
ancien nom — alors que son dépôt s'appelle `teiki5320/keurcook`, comme son
domaine `keurcook.com`. **Avelor est en pause** (⏸️), mais son site est encore servi
par `avelor.vercel.app`. **Drama Studio n'est pas une app mobile** : c'est un
studio local sur **macOS** (Express + React sur `127.0.0.1:4600`), et sa carte le
dit depuis le 3 octobre 2026.

⚠️ **Kultiva n'a plus de backend.** Son projet Supabase a été supprimé : son
adresse ne résout plus (constaté le 3 octobre 2026). L'app n'a donc plus ni
authentification, ni données, ni stockage de photos. `apps/kultiva/infra.md`
décrit ce qu'il faudra recréer.

## La synchro automatique (`.github/workflows/sync.yml`)

Tourne toute seule chaque jour à 6 h UTC. **Ne jamais la modifier.** Elle
rapatrie `docs/INFRA.md`, `docs/MARKETING.md` et `docs/PUBLICATION.md` des
dépôts d'apps dans `apps/<id>/`, met à jour `status.json` (CI, release), puis
régénère `assets/dash-data.js`.

`apps/.sync-state.json` garde le hachage SHA-256 de la **dernière copie
rapatriée depuis le dépôt d'app**. Tant que ce hachage correspond, une fiche
retouchée côté Dashboard n'est pas écrasée.

> **Piège à ne jamais oublier** : après avoir retouché une fiche côté
> Dashboard, ne **jamais** remplacer son hachage par celui de ta version. Le
> hachage doit rester celui du dépôt d'app, sinon la prochaine synchro croira
> que le dépôt n'a pas bougé et n'apportera plus rien.

## Façon de travailler (validée)

1. Partir d'`origin/main` à jour.
2. Branche `claude/<sujet>`.
3. Commit clair en français, qui dit ce qui change et pourquoi.
4. Push, PR vers `main`, fusion immédiate.
5. **Jamais de commit sans contenu réel** — pas de mise à jour de date seule,
   pas de reformatage cosmétique.

## États particuliers

- `drama-studio`, `erea` et `alohash` régénèrent **leurs propres fiches** dans
  leur dépôt. Le rôle du Dashboard s'y limite à la cohérence et aux trous.
- `keurdeco` n'a pas de dossier `docs/` : ses fiches ont été générées côté
  Dashboard le 30 septembre 2026 et n'ont donc aucun hachage dans
  `.sync-state.json`. Elles seront remplacées le jour où son dépôt en publie.
- `d-sign` et `tama-tv` ont été reliés à leurs dépôts le 3 octobre 2026.
  `teiki5320/D-Sign` publie ses propres `docs/INFRA.md` et `docs/MARKETING.md`,
  rapatriées par la synchro. `teiki5320/Tama` ne publie que `docs/PUBLICATION.md` :
  ses fiches infra et marketing restent provisoires jusqu'à ce que son dépôt les
  génère. D-Sign n'a aucun workflow, donc `ci: null` y est exact ; la dernière CI
  de Tama est **en échec** depuis le 20 août 2026.
- **Lexique** : on écrit « Hébergement web (GitHub Pages / Cloudflare Pages) ».
  Des alias invisibles (vercel, netlify) servent uniquement à l'ancrage de la
  recherche — ne pas réintroduire d'outils abandonnés dans les textes visibles.
- **Zoom** : le corps de l'app est à `1.6` ; le module Mes apps repasse à `.75`
  (soit 1,2 effectif) et à `.9` à partir de 1200 px.
- **En attente** : secrets Qonto, dépôts de Tama TV et D-Sign.

## Dire vrai, et savoir quand on ne sait pas

`tool/verifier-fiches.js` contrôle trois choses : le dépôt déclaré existe bien
sous ce nom, chaque adresse citée répond, et chaque service déclaré a une section
— **ainsi que l'inverse**, une section qui documente un service que `app.json`
oublie de déclarer.

Deux règles y sont acquises, et valent aussi pour `tool/sync.js` :

1. **Un échec réseau n'est pas un constat.** Une adresse est réessayée une fois
   avant d'être déclarée morte, et un refus de l'API GitHub (403 de quota, droit
   manquant) donne « non vérifiable », jamais « introuvable ». Sans cela, un quota
   épuisé faisait dire au Dashboard que les onze dépôts avaient disparu.
2. **Ne jamais confondre « il n'y a rien » et « je n'ai pas pu savoir ».** Dans
   `sync.js`, seul un 404 signifie qu'il n'y a ni release ni run ; tout autre
   refus conserve les valeurs précédentes de `status.json`. Sans cela, une simple
   limite d'appels remplaçait une CI verte par « aucune CI ».

Les alias de `catalog/services.js` servent à rapprocher une section de fiche d'un
service (`ionos` → nom de domaine, `openart` → API d'IA, `plausible` → analytics).
Ils restent **invisibles** et doivent rester sans ambiguïté : `cloudflare` tout
court a été retiré, parce qu'il faisait correspondre la section d'analytique à
celle du nom de domaine.

Un jeton de lecture dans `APPS_READ_TOKEN` ou `GITHUB_TOKEN` lève la limite de
60 appels par heure.

## Commandes utiles

```bash
node tool/build.js          # régénère assets/dash-data.js
node --test tool/test-ebe.js # tests du module EBE
node tool/sync.js           # rapatrie les fiches (ce que fait la CI)
node tool/verifier-fiches.js # contrôle que les fiches disent vrai
```
