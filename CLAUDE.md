# Dash

Tableau de bord des projets numériques de Teiki, publié sur GitHub Pages
depuis `teiki5320/Dashboard` (dépôt **public**). Ce fichier est la mémoire
durable du projet : à lire avant toute intervention.

L'app s'appelait « Gestion Pro » jusqu'au 11 octobre 2026, quand la partie
gestion commerciale a été mise en sommeil. Le dépôt, lui, garde son nom.

## Règles absolues

- **Aucun secret dans le dépôt.** Ni clé, ni jeton, ni mot de passe, ni SIREN,
  ni montant réel, ni nom de client. Le dépôt est public : ce qui est committé
  une fois ne se retire plus de l'historique. Dans les fiches, on cite des
  *noms* de variables et de consoles, jamais des valeurs.
- **100 % statique, vanilla.** HTML, CSS et JavaScript à la main, aucun
  framework, aucune étape de compilation pour l'app elle-même. **Aucun script
  externe** : depuis le 11 octobre 2026 la politique de sécurité n'autorise
  plus que le site lui-même (`default-src 'self'`). Ne pas y rouvrir de
  domaine.
- **Français sobre** dans l'interface, les commentaires et les commits. Pas de
  jargon, pas de majuscules décoratives.
- **Couleurs par variables CSS** (`--fond`, `--carte`, `--texte`, `--muted`,
  `--ok`, `--ko`, `--run`…), jamais de valeur écrite en dur : le thème clair et
  le thème sombre en dépendent.

## Ce que fait cette application

**Un seul module : « Mes apps ».** Le tableau de bord ne sert plus qu'aux
projets numériques de Teiki — l'état de ses onze applis et sites, leurs
fiches, leurs services. Le rail n'a que trois entrées : **Mes apps**, et deux
raccourcis vers le Studio (**Publicité**, **Chaîne**), qui ouvrent
`studio.toakeur.com` dans un onglet.

`dash-module.js` pour l'affichage, `assets/dash-data.js` pour les données. Ce
dernier est **généré** par `node tool/build.js` à partir de `apps/<id>/` et de
`catalog/services.js` : toujours le régénérer et le committer avec les fiches
qu'on modifie. `script.js` n'est plus qu'une coquille (~150 lignes) : thème,
animations, horloge, messages, flèche retour.

### Ce qui a été retiré le 11 octobre 2026

Toute la gestion commerciale : bons de livraison, facturation, stock, TVA,
comptabilité, analyse EBE, réglages (produits, clients, émetteurs), sauvegarde
par fichier. Avec elle sont partis `ebe.js`, `ebe-module.js`,
`tool/test-ebe.js`, SheetJS et neuf des dix pages. « On verra plus tard pour
le reste » — c'est donc une mise en sommeil, pas un abandon : tout reste dans
l'historique git, au commit qui précède ce retrait.

⚠️ **Les données de l'ancienne application dorment toujours dans le
navigateur**, sous les clés `v90_*` du localStorage. Un bandeau en haut de la
page permet de les télécharger puis de les effacer, et disparaît une fois
qu'il n'en reste plus (voir `renderRecuperation` dans `script.js`). Ne pas le
supprimer tant que Teiki ne l'a pas vidé.

## Mes apps — les 11 cartes

Le classement se fait sur `platforms` dans `apps/<id>/app.json` : une app dont
toutes les plateformes sont `Web` est un **site**, sinon c'est une **appli**. Une
liste de plateformes **vide** ne fait pas un site : l'app reste une appli.

| Groupe | App | id | dépôt suivi |
|---|---|---|---|
| Applis | Kultiva | `kultiva` | `teiki5320/Kultiva` |
| Applis | Erea | `erea` | `teiki5320/erea` |
| Applis | Drama-studio | `drama-studio` | `teiki5320/Studio` |
| Applis | Tama TV | `tama-tv` | `teiki5320/Tama` |
| Applis | D-Sign | `d-sign` | `teiki5320/D-Sign` |
| Applis | Palabre | `palabre` | `teiki5320/palabre` |
| Sites | Solelis | `solelis` | `teiki5320/Solelis` |
| Sites | Keur Cook | `alohash` | `teiki5320/keurcook` |
| Sites | OptiLED | `optiled` | `teiki5320/optiled` |
| Sites | Keur Déco | `keurdeco` | `teiki5320/Keurdeco` |
| Sites | Keurbook | `keurbook` | `teiki5320/keurbook` |

À retenir : **Keur Cook porte l'identifiant `alohash`** — héritage de son
ancien nom — alors que son dépôt s'appelle `teiki5320/keurcook`, comme son
domaine `keurcook.com`. **Avelor s'appelle Solelis** depuis le 10 octobre 2026 —
dépôt, dossier et identifiant renommés en même temps, pour ne pas refaire le
coup de `alohash`. Le site déployé, lui, affiche encore « AVELOR » et vit
toujours sur `avelor.vercel.app` : c'est son dépôt qui changera ça, pas le
Dashboard. **Solelis est en pause** (⏸️), mais son site répond. **Drama Studio n'est pas une app mobile** : c'est un
studio local sur **macOS** (Express + React sur `127.0.0.1:4600`), et sa carte le
dit depuis le 3 octobre 2026. Son dépôt a été renommé deux fois —
`bd`, puis `Drama-Studio`, puis **`teiki5320/Studio`** depuis le 10 octobre 2026 ;
ses propres fiches citent encore l'ancien nom (les redirections GitHub tiennent).

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
- **Nom** : l'app s'appelle **Dash** (titre, manifeste, cache du service
  worker). Les clés de stockage gardent leurs anciens préfixes — `gp-theme`,
  `dash-anim`, `v90_dash_todos` — et les identifiants internes du HTML aussi
  (`#gp-shell`, `#gp-rail`). Les renommer effacerait les préférences et les
  cases cochées pour rien.

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

## La fiche d'un service parle de l'app d'où on l'ouvre

Depuis une app, cliquer un service n'ouvre plus l'article du Lexique mais **la
section de son `infra.md` qui le décrit** — le fournisseur réel, ce que l'app en
fait, les adresses qu'elle cite. L'article général passe dessous, replié ; il
s'ouvre d'emblée quand l'app ne documente pas le service, et la fiche le dit
alors franchement au lieu de laisser un trou silencieux.

Le lien app → section existe depuis `findServiceAnchors` dans `tool/build.js`
(56 couples sur 63) ; `dash-module.js` relit la section dans `app.infraHtml`,
déjà en mémoire, plutôt que de la dupliquer dans `dash-data.js`. Depuis le
Lexique, rien ne change : c'est bien l'article général qu'on veut.

## Commandes utiles

```bash
node tool/build.js               # régénère assets/dash-data.js
node --test tool/test-markdown.js # tests du convertisseur Markdown
node tool/sync.js                # rapatrie les fiches (ce que fait la CI)
node tool/verifier-fiches.js     # contrôle que les fiches disent vrai
```
