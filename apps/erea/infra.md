# Erea — fiche technique des services externes

> Générée le 3 août 2026 en scannant le dépôt (dépendances, configs,
> scripts CI, manifestes). Pour la mettre à jour : relancer le même
> prompt dans Claude Code, le fichier sera régénéré à partir de l'état
> réel du dépôt.

**Résumé en une phrase : Erea est une app 100 % locale.** Pas de backend,
pas de base de données, pas d'analytics, pas de crash reporting, pas de
publicité, pas de paiement, pas d'emailing, pas de domaine acheté. Tout
l'état du joueur vit sur l'appareil (`shared_preferences`), la seule
fonction en ligne est le classement mondial délégué à Game Center.
Conséquence utile : la fiche « Confidentialité » App Store peut déclarer
**aucune collecte de données** (hors Game Center, géré par Apple).

---

## 1. GitHub — code source et prototype web

| | |
|---|---|
| Rôle | Hébergement du dépôt `teiki5320/erea` **et** du prototype web jouable via GitHub Pages |
| Console | <https://github.com/teiki5320/erea> (réglages : Settings → Pages) |
| Compte propriétaire | `teiki5320` |

**Identifiants publics :**
- URL publique du jeu web : `https://teiki5320.github.io/erea/` — référencée dans `index.html` (balises `og:`, `canonical`) et `README.md`.
- Le site est servi depuis la **racine du dépôt** (fichier `.nojekyll` présent) : `index.html` est la copie déployée de `index-v8.html`.

**Secrets :** aucun. Pas de workflow GitHub Actions, donc pas de secrets CI
côté GitHub. L'accès en écriture au dépôt passe par le compte GitHub
lui-même.

**Reprise :** être collaborateur du dépôt (ou propriétaire du compte
`teiki5320`). GitHub Pages se redéploie tout seul à chaque push sur `main`.

---

## 2. Apple Developer Program — identité et signature

| | |
|---|---|
| Rôle | Signature de l'app iOS, App ID, capacités (Game Center) |
| Console | <https://developer.apple.com/account> (Certificates, Identifiers & Profiles) |
| Compte propriétaire | Compte Apple Developer de la team `K597U7X3FZ` |

**Identifiants publics :**
- Team ID : `K597U7X3FZ` — dans `erea_flutter/ios/Runner.xcodeproj/project.pbxproj` (`DEVELOPMENT_TEAM`) et `erea_flutter/README.md`.
- Bundle ID : `com.teiki.erea` — dans le même `project.pbxproj` (`PRODUCT_BUNDLE_IDENTIFIER`).
- Signature : **automatique** (`CODE_SIGN_STYLE = Automatic`) — aucun certificat ni profil dans le dépôt.

**Secrets :** les certificats de distribution et profils de provisioning
sont gérés automatiquement par Apple (Xcode / Xcode Cloud). Rien à
sauvegarder dans le dépôt, rien à copier sur une machine neuve.

**Reprise :** accès au compte Apple Developer (rôle Admin ou App Manager
de la team `K597U7X3FZ`). La capacité **Game Center** est activée sur
l'App ID depuis le 4 août 2026.

---

## 3. App Store Connect — publication et TestFlight

| | |
|---|---|
| Rôle | Fiche App Store, distribution TestFlight, configuration Game Center et Xcode Cloud |
| Console | <https://appstoreconnect.apple.com> |
| Compte propriétaire | Même compte que le §2 |

**Identifiants publics :**
- App : « Erea », bundle `com.teiki.erea`.
- Version / build : pilotés par `version:` dans `erea_flutter/pubspec.yaml` (`0.1.0+1` → `CFBundleShortVersionString` / `CFBundleVersion`).
- Chiffrement : `ITSAppUsesNonExemptEncryption = false` (`erea_flutter/ios/Runner/Info.plist`) — pas de formulaire export à remplir à chaque build.

**Secrets :** aucun côté dépôt. L'authentification est celle du compte
App Store Connect.

**Reprise :** rôle App Manager sur l'app dans App Store Connect. C'est ici
que se créent les classements Game Center et que se lancent/configurent les
builds Xcode Cloud.

---

## 4. Xcode Cloud — CI/CD iOS

| | |
|---|---|
| Rôle | Compile, signe et livre l'app sur TestFlight à partir du dépôt GitHub |
| Console | App Store Connect → Erea → Xcode Cloud (ou l'onglet Cloud dans Xcode) |
| Compte propriétaire | Même compte que le §3 ; l'accès au dépôt GitHub est accordé via l'app GitHub « Xcode Cloud » |

**Configuration dans le dépôt :**
- `erea_flutter/ios/ci_scripts/ci_post_clone.sh` — installe Flutter sur le
  runner, `flutter pub get`, `flutter build ios --config-only`, `pod install`
  (avec 3 tentatives sur les étapes réseau).
- `erea_flutter/ios/ci_scripts/ci_pre_xcodebuild.sh` — garde-fou qui
  régénère `Generated.xcconfig` si l'étape d'archive ne partage pas le
  `$HOME` du post-clone.
- Le reste (workflow, déclencheurs, environnement) vit **dans la console**,
  pas dans le dépôt.

**Secrets :** aucun dans le dépôt. La signature est gérée par Apple
(« cloud signing »), l'accès GitHub par l'intégration officielle.

**Reprise :** accès App Store Connect + autorisation de l'app GitHub
Xcode Cloud sur le dépôt. ⚠️ Problème connu : les pushes sur `main` ne
déclenchent pas de build automatiquement — les builds sont lancés à la
main ; les déclencheurs du workflow sont à vérifier dans la console.

---

## 5. Game Center — classements mondiaux

| | |
|---|---|
| Rôle | Classements mondiaux (défi du jour, série, Classique ×3, Chrono) sans serveur à opérer : identité, consentement parental et interface gérés par Apple |
| Console | App Store Connect → Erea → Game Center (+ portail développeur pour la capacité sur l'App ID) |
| Code | Plugin Flutter `games_services`, logique dans `erea_flutter/lib/core/classement.dart` |

**Identifiants publics (les ID de classement ne sont pas des secrets) :**

| ID | Type | Plage | Défini dans |
|---|---|---|---|
| `erea.daily` | Récurrent 24 h | 0–11000 | `lib/core/classement.dart` |
| `erea.streak` | Classique | 0–3650 | idem |
| `erea.classic.facile` / `.normal` / `.difficile` | Classique | 0–11000 | idem |
| `erea.chrono` | Classique | 0–10000 | idem |

**État actuel : actif depuis le 4 août 2026.** Capacité cochée sur l'App
ID, six classements créés, entitlement déclaré dans les trois
configurations du target Runner, build vérifié sur appareil réel.
L'ordre des opérations (capacité → classements → entitlement) reste
documenté dans `erea_flutter/ios/GAME_CENTER.md` : le rattacher trop tôt
casse la signature, ce qui compte si l'App ID est un jour recréé.

Reste à faire avant la soumission : **attacher les classements à la
version** dans App Store Connect (ils sont en « Finaliser avant
soumission »).

**Secrets :** aucun. Game Center n'utilise ni clé d'API ni jeton.

---

## 6. Google Fonts — prototype web uniquement

| | |
|---|---|
| Rôle | Sert les polices Baloo 2 et Nunito au prototype web (`index.html` racine) via CDN |
| Console | aucune (service public sans compte) |

L'**app Flutter n'en dépend pas** : les mêmes polices sont embarquées dans
`erea_flutter/assets/fonts/` (licence SIL OFL incluse), justement pour que
l'app fonctionne hors ligne. Si le prototype web est un jour abandonné,
cette dépendance disparaît avec lui.

---

## À vérifier (présent mais pas clairement branché)

- **Google Play Games (Android)** — le plugin `games_services` couvre
  aussi Play Games, mais rien n'est configuré côté Android : pas de projet
  dans la Google Play Console, pas de méta-donnée `APP_ID` dans
  `AndroidManifest.xml`. Sans cela, le classement sera muet sur Android
  (le jeu reste jouable — les échecs sont silencieux par conception).
- **Signature release Android** — `build.gradle` signe encore la release
  avec les clés de debug (TODO explicite dans le fichier). Une keystore
  sera à créer avant toute sortie Play Store ; `key.properties`, `*.jks`
  et `*.keystore` sont déjà dans `.gitignore`, prêts à accueillir la
  config sans la committer.
- **Google Play Console** — aucune trace d'un compte ou d'une fiche :
  la distribution Android n'existe pas encore.

---

## Récapitulatif : où vit chaque secret

| Secret | Où il vit | Dans le dépôt ? |
|---|---|---|
| Certificats / profils de signature iOS | Gérés automatiquement par Apple (cloud signing Xcode Cloud) | Non |
| Mot de passe compte Apple Developer / App Store Connect | Compte Apple du propriétaire (+ 2FA) | Non |
| Accès en écriture au dépôt GitHub | Compte GitHub `teiki5320` | Non |
| Keystore de signature Android | **N'existe pas encore** — à créer, à garder hors dépôt (`.gitignore` prêt) et à sauvegarder précieusement (perte = impossibilité de mettre à jour l'app) | Non |
| Clés d'API tierces | **Il n'y en a aucune** | — |

Le dépôt peut être public sans risque : il ne contient aucun secret.

## Valeurs publiques par design (aucun doute à avoir)

- `com.teiki.erea` — bundle/application ID (visible dans toute app publiée)
- `K597U7X3FZ` — Team ID Apple (visible dans toute app signée)
- `erea.daily`, `erea.streak`, `erea.classic.*`, `erea.chrono` — ID de classements Game Center
- `https://teiki5320.github.io/erea/` — URL publique du prototype web
- Version `0.1.0+1` dans `pubspec.yaml`

## Checklist « reprise du projet sur une machine neuve »

**Jouer / développer (n'importe quel OS) :**
1. `git clone https://github.com/teiki5320/erea.git`
2. Installer Flutter stable (≥ 3.6) — <https://docs.flutter.dev/get-started>
3. `cd erea/erea_flutter && flutter pub get`
4. `flutter analyze && flutter test` (la suite doit être verte)
5. `flutter run` (simulateur, appareil ou Chrome)

**Builder pour iOS (Mac uniquement) :**
6. Xcode installé, session ouverte avec un compte de la team `K597U7X3FZ`
7. `flutter build ipa --release` → `build/ios/ipa/erea.ipa`, upload via
   Transporter — **ou** laisser Xcode Cloud builder depuis `main`

**Administrer :**
8. Accès au compte Apple Developer (team `K597U7X3FZ`) : signature, App ID
9. Accès App Store Connect : TestFlight, Game Center, Xcode Cloud
10. Accès (ou propriété) du dépôt GitHub `teiki5320/erea` : code + site web

**Rien d'autre.** Pas de `.env` à recréer, pas de base à restaurer, pas de
clé à demander à qui que ce soit.
