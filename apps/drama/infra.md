# INFRA — fiche technique des services externes

> Généré le 3 août 2026 par un scan du dépôt (dépendances, configs, scripts
> de build, CI). **Pour le mettre à jour : relancer le même prompt.**
> Règle absolue : **aucun secret dans ce fichier** — uniquement l'endroit où
> chaque secret vit.

## Vue d'ensemble

Drama est une application **entièrement hors-ligne** : toute l'histoire, les
photos, les sons et la progression vivent dans l'app. Il n'y a **aucun
backend, aucune base de données, aucune authentification, aucun SDK
tiers de tracking**. La surface externe du projet se réduit à : GitHub
(code), Apple (build, signature, distribution TestFlight), les registres de
paquets publics, et les outils de génération de contenu (hors runtime).

## Services

### 1. GitHub — hébergement du code et déclencheur de la CI

- **Rôle** : dépôt source unique (`teiki5320/drama`). Un push sur `main`
  déclenche le build Xcode Cloud.
- **Console** : <https://github.com/teiki5320/drama>
- **Identifiants publics** : l'URL du dépôt ; branche de travail
  `claude/roadmap-review-hr34xx`, branche de release `main`.
- **Secrets** : aucun. Pas de GitHub Actions, donc **aucun secret CI côté
  GitHub**. L'accès au dépôt passe par le compte GitHub du propriétaire
  (mot de passe + 2FA dans son gestionnaire de mots de passe) et par
  l'autorisation OAuth de l'app « Xcode Cloud » (gérée dans
  *GitHub → Settings → Applications*).
- **Reprise** : être propriétaire ou collaborateur du dépôt ; réautoriser
  l'app GitHub « Xcode Cloud » si la liaison saute.

### 2. Apple Developer Program — le compte développeur

- **Rôle** : identité de signature de l'app iOS.
- **Console** : <https://developer.apple.com/account>
- **Identifiants publics** : **Team ID `K597U7X3FZ`** (visible dans
  `ios/Runner.xcodeproj/project.pbxproj`, champ `DEVELOPMENT_TEAM` — un
  Team ID figure de toute façon dans chaque binaire signé).
- **Secrets** : les **certificats et profils de signature sont gérés par
  Apple** (cloud signing d'Xcode Cloud) — rien en local, rien dans le
  dépôt, régénérables depuis la console. L'identifiant Apple du
  propriétaire (+ 2FA) vit dans son gestionnaire de mots de passe.
- **Reprise** : accès au compte Apple propriétaire (l'abonnement
  développeur annuel doit rester actif pour distribuer).

### 3. App Store Connect / TestFlight — distribution

- **Rôle** : fiche de l'app « Drama » et distribution des builds de test.
- **Console** : <https://appstoreconnect.apple.com>
- **Identifiants publics** :
  - bundle ID iOS : `com.teiki5320.drama`
    (`ios/Runner.xcodeproj/project.pbxproj`) ;
  - version marketing : `version:` dans `pubspec.yaml` (ex. `0.19.1+1`) —
    doit rester au-dessus de l'ancien train `0.15.x` pour l'ordre
    TestFlight ;
  - nom affiché : `D-Sign` (`ios/Runner/Info.plist`,
    `CFBundleDisplayName`) — le nom du jeu depuis le 3 août 2026.
- **Secrets** : aucun dans le dépôt — tout passe par la session du compte
  Apple. Aucune clé d'API App Store Connect n'est utilisée.
- **Reprise** : rôle Admin sur l'app dans App Store Connect ; les
  testeurs TestFlight sont gérés dans l'onglet TestFlight.

### 4. Xcode Cloud — CI/CD

- **Rôle** : à chaque push sur `main`, clone, build iOS, upload TestFlight.
- **Console** : App Store Connect → Drama → onglet **Xcode Cloud** (le
  workflow — déclencheur « push sur main » — vit là, **pas dans le
  dépôt**).
- **Identifiants publics / code versionné** :
  - script de build : `ios/ci_scripts/ci_post_clone.sh` — installe
    **Flutter épinglé `3.27.4`**, exécute `flutter pub get`, force
    `CFBundleVersion = $CI_BUILD_NUMBER` (numéro de build toujours
    croissant), génère les icônes (`flutter_launcher_icons`), `pod
    install` ;
  - variables d'environnement utilisées : `CI_PRIMARY_REPOSITORY_PATH`,
    `CI_BUILD_NUMBER` — fournies par Xcode Cloud, **rien à configurer**.
- **Secrets** : aucun secret custom déclaré dans le workflow ; la
  signature est automatique (cf. § 2), la liaison GitHub est l'OAuth du
  § 1.
- **Reprise** : accès App Store Connect ; si le workflow disparaît, en
  recréer un (« branch changes » sur `main` + action Archive/TestFlight),
  le script du dépôt fait le reste.

### 5. Registres de paquets (anonymes, sans compte)

- **pub.dev** : dépendances Flutter (`pubspec.yaml` / `pubspec.lock`) —
  `audioplayers`, `flutter_local_notifications`, `shared_preferences`,
  `timezone`, `video_player`, `flutter_lints`, `flutter_launcher_icons`.
- **CocoaPods** (`ios/Podfile`) : pods générés par les plugins ci-dessus.
- **github.com/flutter/flutter** : cloné par la CI à la version épinglée.
- **Secrets / reprise** : aucun — accès public en lecture.

### 6. Outils de contenu (hors runtime — rien dans l'app ne les appelle)

- **OpenArt** (génération des photos) : console <https://openart.ai>.
  Les exports sont **commités** dans `assets/` (l'app n'a aucune
  dépendance à ce service). Charte et prompts : `docs/PHOTOS_STYLE.md`.
- **Suno / Udio** (génération de la musique) : les mp3 sont commités dans
  `assets/audio/`. Convention et prompts : `docs/MUSIQUE.md`.
- **Secrets** : les comptes de ces services appartiennent à l'auteur
  (gestionnaire de mots de passe personnel). Perdre ces comptes ne casse
  **rien** : les assets sont dans git.

## Ce que le projet n'utilise PAS (par design)

Backend/API maison, base de données, authentification, analytics, crash
reporting, publicité, paiement/affiliation, notifications **push**
distantes (uniquement des notifications *locales* programmées par l'app),
domaine/DNS, emailing, Google Play (l'app n'est pas distribuée sur
Android).

## 1. Où vit chaque secret

| Secret | Où il vit | Jamais |
|---|---|---|
| Compte GitHub du propriétaire (+ 2FA) | Gestionnaire de mots de passe du propriétaire | dans le dépôt |
| Compte Apple / App Store Connect (+ 2FA) | Gestionnaire de mots de passe du propriétaire | dans le dépôt |
| Certificats & profils de signature iOS | Gérés par Apple (cloud signing Xcode Cloud), régénérables | en local ou dans le dépôt |
| Comptes OpenArt / Suno | Gestionnaire de mots de passe du propriétaire | dans le dépôt |
| Secrets CI | **Il n'y en a aucun** (pas de GitHub Actions, workflow Xcode Cloud sans variable secrète) | — |

## 2. Valeurs publiques par design (aucun doute à avoir)

| Valeur | Où elle vit | Pourquoi c'est public |
|---|---|---|
| `com.teiki5320.drama` (bundle ID iOS) | `ios/Runner.xcodeproj/project.pbxproj` | Identifiant d'app, visible sur l'App Store |
| `K597U7X3FZ` (Team ID Apple) | idem, `DEVELOPMENT_TEAM` | Présent dans tout binaire signé |
| `com.teiki5320.contre_jour` (applicationId Android) | `android/app/build.gradle.kts` | Identifiant d'app (cf. « À vérifier ») |
| `0.x.y+1` (version marketing) | `pubspec.yaml` | Affichée sur TestFlight |
| URL du dépôt `github.com/teiki5320/drama` | remote git | Adresse du code |
| `3.27.4` (version Flutter épinglée) | `ios/ci_scripts/ci_post_clone.sh` | Choix de build, pas un secret |

## 3. Checklist — reprise du projet sur une machine neuve

1. **Cloner** : `git clone https://github.com/teiki5320/drama.git`
   (compte GitHub avec accès au dépôt).
2. **Installer Flutter 3.27.4** (la même version que la CI) et Xcode +
   CocoaPods pour la partie iOS.
3. **Vérifier** : `flutter pub get && flutter analyze && flutter test`
   (17 tests, tous verts attendus).
4. **Lancer** : `flutter run` sur un simulateur iOS (aucune variable
   d'environnement, aucun fichier secret à créer — tout est dans le
   dépôt).
5. **Builder pour TestFlight** : rien à faire localement — **pousser sur
   `main`** déclenche Xcode Cloud, qui signe et téléverse tout seul.
6. **Administrer** : demander l'accès App Store Connect (rôle Admin sur
   l'app Drama) et la propriété/collaboration du dépôt GitHub. Ce sont
   les **deux seuls accès** dont dépend le projet.

## À vérifier

- **Renommage du dépôt GitHub** (`drama` → `d-sign`) : à faire par le
  propriétaire dans *GitHub → Settings → Rename*. GitHub redirige
  automatiquement l'ancienne URL ; vérifier ensuite que le workflow Xcode
  Cloud suit (il est lié à l'identifiant du dépôt, pas à son nom). Le
  bundle ID `com.teiki5320.drama` et le nom de paquet Dart `drama`
  restent volontairement inchangés (invisibles, et en changer casserait
  l'app App Store Connect existante).
- **`applicationId` Android = `com.teiki5320.contre_jour`** : reliquat
  d'un ancien nom de projet, incohérent avec l'iOS
  (`com.teiki5320.drama`). Sans conséquence tant qu'Android n'est pas
  distribué — à renommer avant toute publication Play Store.
- **Le workflow Xcode Cloud n'est pas versionné** : il vit uniquement
  dans App Store Connect. Si sa configuration évolue (déclencheur,
  environnement Xcode), la documenter ici.
- `flutter_launcher_icons` référence une config Android (`launcher_icon`,
  `min_sdk_android: 23`) : fonctionnelle mais jamais exercée en
  distribution.
