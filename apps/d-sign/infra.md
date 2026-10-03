# INFRA — fiche technique

Généré le 21 août 2026 par un scan du dépôt. Pour mettre à jour : relancer ce même prompt.

> Règle absolue respectée : **aucun secret dans ce fichier** — uniquement des
> références (où chaque secret vit, quelle console l'administre).

## Vue d'ensemble

- **Plateforme** : iOS (bêta TestFlight) — Android présent mais non distribué
- **Stack** : Flutter 3.27.4 (épinglé en CI) · Dart · 5 plugins pub.dev (audio, notifications locales, préférences, vidéo)
- **Backend** : aucun — jeu 100 % hors-ligne, sauvegarde locale (`shared_preferences`), zéro tracker
- **Distribution** : push sur `main` → build Xcode Cloud → TestFlight (signature cloud automatique)
- **Identité** : app « D-Sign », bundle ID `com.teiki5320.drama` (inchangé à dessein)
- **Particularités** : aucun secret ni variable d'environnement dans le dépôt ; photos/musiques générées (OpenArt, Suno) commitées dans `assets/`

### 1. GitHub

- **Rôle** : dépôt source unique (`teiki5320/drama`) ; un push sur `main`
  déclenche le build Xcode Cloud. Pas de GitHub Actions.
- **Console** : <https://github.com/teiki5320/drama>
- **Identifiants publics** : URL du dépôt ; branche de release `main`,
  branche de travail `claude/roadmap-review-hr34xx`.
- **Secrets** : aucun secret CI côté GitHub. L'accès vit dans le compte
  GitHub du propriétaire (mot de passe + 2FA dans son gestionnaire de mots
  de passe) ; la liaison CI est l'app GitHub « Xcode Cloud » (révocable dans
  *Settings → Applications*).
- **Coût** : 0 € (offre gratuite).

### 2. Apple Developer Program

- **Rôle** : identité de signature de l'app iOS.
- **Console** : <https://developer.apple.com/account>
- **Identifiants publics** : Team ID `K597U7X3FZ`
  (`ios/Runner.xcodeproj/project.pbxproj`, champ `DEVELOPMENT_TEAM` —
  présent de toute façon dans tout binaire signé).
- **Secrets** : certificats et profils gérés par Apple (cloud signing Xcode
  Cloud) — rien en local, rien dans le dépôt, régénérables depuis la
  console. Identifiant Apple (+ 2FA) dans le gestionnaire de mots de passe
  du propriétaire.
- **Coût** : 99 €/an (abonnement développeur).

### 3. App Store Connect

- **Rôle** : fiche de l'app et distribution TestFlight.
- **Console** : <https://appstoreconnect.apple.com>
- **Identifiants publics** : bundle ID `com.teiki5320.drama` ; nom affiché
  `D-Sign` (`ios/Runner/Info.plist`) ; version marketing dans
  `pubspec.yaml` (`0.19.2+1` au moment du scan — rester au-dessus de
  l'ancien train `0.15.x`) ; `ITSAppUsesNonExemptEncryption` déclaré.
- **Secrets** : aucun dans le dépôt ; aucune clé d'API App Store Connect
  utilisée — tout passe par la session du compte Apple (§ 2).
- **Coût** : inclus dans l'abonnement développeur.

### 4. Xcode Cloud

- **Rôle** : CI/CD — clone, build iOS, upload TestFlight à chaque push sur
  `main`. Le workflow (déclencheur « push sur main ») vit dans App Store
  Connect, **pas dans le dépôt**.
- **Console** : App Store Connect → D-Sign → onglet Xcode Cloud.
- **Identifiants publics / code versionné** :
  `ios/ci_scripts/ci_post_clone.sh` (Flutter épinglé `3.27.4`,
  `CFBundleVersion = $CI_BUILD_NUMBER`, icônes, `pod install`). Variables
  fournies par la plateforme : `CI_PRIMARY_REPOSITORY_PATH`,
  `CI_BUILD_NUMBER` — rien à configurer.
- **Secrets** : aucun secret custom dans le workflow ; signature via § 2,
  liaison GitHub via § 1.
- **Coût** : 0 € (25 h/mois incluses dans l'abonnement développeur —
  largement suffisant au rythme actuel).

### 5. Registres de paquets (pub.dev, CocoaPods)

- **Rôle** : dépendances (`pubspec.yaml`/`pubspec.lock` : `audioplayers`,
  `flutter_local_notifications`, `shared_preferences`, `timezone`,
  `video_player` + outillage `flutter_lints`, `flutter_launcher_icons`) ;
  pods iOS générés (`ios/Podfile`) ; Flutter cloné depuis
  `github.com/flutter/flutter` par la CI.
- **Console** : aucune (accès public anonyme en lecture).
- **Identifiants publics / Secrets / Coût** : aucun compte, aucun secret,
  0 €.

### 6. OpenArt et Suno (outils de contenu, hors runtime)

- **Rôle** : génération des photos (OpenArt) et de la musique (Suno) —
  les exports sont **commités** dans `assets/`, l'app ne dépend d'aucun de
  ces services à l'exécution. Chartes : `docs/PHOTOS_STYLE.md`,
  `docs/MUSIQUE.md`.
- **Console** : <https://openart.ai> · <https://suno.com>
- **Identifiants publics** : aucun dans le dépôt.
- **Secrets** : comptes personnels de l'auteur (gestionnaire de mots de
  passe). Perdre ces comptes ne casse rien : les assets sont dans git.
- **Coût** : selon les abonnements personnels de l'auteur (variable) ; à
  vérifier avant monétisation : les CGU commerciales de ces services.

## Où vit chaque secret (récapitulatif)

| Secret | Où il vit |
|---|---|
| Compte GitHub (+ 2FA) | Gestionnaire de mots de passe du propriétaire |
| Compte Apple / App Store Connect (+ 2FA) | Gestionnaire de mots de passe du propriétaire |
| Certificats de signature iOS | Gérés par Apple (cloud signing), régénérables |
| Comptes OpenArt / Suno | Gestionnaire de mots de passe du propriétaire |
| Secrets CI | Il n'y en a aucun |

## Reprise du projet sur une machine neuve

1. `git clone https://github.com/teiki5320/drama.git` (accès au dépôt).
2. Installer Flutter **3.27.4** (la version épinglée en CI) + Xcode + CocoaPods.
3. `flutter pub get && flutter analyze && flutter test` (17 tests verts attendus).
4. `flutter run` sur simulateur iOS — aucune variable d'environnement, aucun fichier secret à créer.
5. Builder TestFlight : pousser sur `main`, Xcode Cloud fait le reste.
6. Administrer : accès App Store Connect (rôle Admin) + propriété du dépôt GitHub — les deux seuls accès dont dépend le projet.

## À vérifier

- **Renommage du dépôt GitHub** (`drama` → `d-sign`) : à faire par le
  propriétaire (*Settings → Rename*, redirection automatique) ; vérifier
  ensuite que le workflow Xcode Cloud suit. Bundle ID et nom de paquet Dart
  restent volontairement inchangés.
- **`applicationId` Android = `com.teiki5320.contre_jour`**
  (`android/app/build.gradle.kts`) : reliquat d'un ancien nom, à renommer
  avant toute distribution Play Store (aucune conséquence tant qu'Android
  n'est pas distribué).
- **Le workflow Xcode Cloud n'est pas versionné** : documenter ici tout
  changement de sa configuration (déclencheur, version Xcode).
