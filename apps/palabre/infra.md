# INFRA — fiche technique

Généré le 22 septembre 2026 par un scan du dépôt. Pour mettre à jour : relancer ce même prompt.

## Vue d'ensemble

- **Plateforme** : application mobile iOS et Android, un seul code source Flutter. Les deux dossiers natifs existent dans le dépôt (`ios/`, `android/`), aucune cible web, macOS, Windows ou Linux.
- **Stack** : Flutter épinglé à la version **3.47.3** (canal stable) aux deux endroits qui construisent — `.github/workflows/ci.yml` et `ios/ci_scripts/ci_post_clone.sh`. SDK Dart `^3.13.0` (`pubspec.yaml`). Trois dépendances seulement : `flutter_riverpod ^3.0.0` (état), `shared_preferences ^2.3.0` (sauvegarde locale), `audioplayers ^6.1.0` (son). En développement : `flutter_lints ^5.0.0`, `flutter_launcher_icons ^0.14.0`. iOS cible **15.0** minimum, Java et Kotlin en **17** côté Android.
- **Backend** : **aucun**. Aucun client réseau n'est déclaré dans `pubspec.yaml` (ni `http`, ni `dio`, ni Firebase, ni Supabase) et aucun appel réseau n'existe dans `lib/`. Tout le contenu du jeu est embarqué : **8 fichiers JSON, 612 Ko**, dans `assets/contenu/` (`cartes.json`, `personnages.json`, `parcours.json`, `fins.json`, `exploits.json`, `objets.json`, `adversaires.json`, `chambre.json`). La sauvegarde passe par `shared_preferences`, sur l'appareil — le commentaire d'en-tête de `lib/sauvegarde/sauvegarde.dart` le dit explicitement : « Rien ne part sur le réseau. » Quatre clés : `partie_en_cours`, `progression`, `intro_vue`, `geste_appris`. Le `AndroidManifest.xml` ne déclare **aucune permission**.
- **Distribution** : dépôt GitHub `teiki5320/palabre` (branche `main`). iOS par **Xcode Cloud** — le script `ios/ci_scripts/ci_post_clone.sh` installe Flutter, fait `pub get`, `flutter build ios --release --no-codesign --config-only` puis `pod install`. Android : pas d'automatisation, mais la signature de publication est câblée — `android/app/build.gradle.kts` lit `android/key.properties` s'il existe et retombe sur la clé de debug sinon, pour que l'intégration continue et `flutter run --release` continuent de marcher sans la clé.
- **IA et outils** : les portraits et décors sont générés sur **OpenArt**, modèle `nano-banana-2-lite`, format 3:4 — la recette est écrite dans `docs/superpowers/specs/2026-09-16-president-100-jours-design.md`. `assets/images/` pèse **83 Mo**, `assets/` **91 Mo** au total. Les 16 sons de `assets/sons/` sont dans le dépôt mais **aucun outil de production sonore n'y est référencé** : à vérifier hors dépôt. Une douzaine d'outils d'atelier vivent dans `outils/` (Python et Dart) : `audit_cartes.py` (contrôles que le moteur ne peut pas faire), `planche_jeu.py`, `planche_relecture.py`, `planche_romances.py`, `planche_palais.py`, `mesure_par_histoire.dart`. Ils ne sont pas embarqués dans l'application.
- **Particularités du jeu** : quatre jauges — **peuple, armée, caisses, presse** — qui partent à 50 et tuent **à 0 comme à 100** (`lib/moteur/denouement.dart`, `evalue`). Une carte par jour, glissée à gauche ou à droite. Le mandat dure **100 jours** (`const int dureeMandat = 100`) et se termine par une élection que l'on gagne si la moyenne peuple/presse dépasse la force de l'opposition — laquelle part de 50 et monte de ce qu'on a perdu. Le jour et la nuit alternent **toutes les 10 cartes** (`cartesParDemiJournee`), ce qui donne cinq nuits par mandat. Le contenu compte **687 cartes**, **59 histoires à plusieurs cartes**, 15 personnages, 10 parcours de départ, 14 fins, 10 exploits, 24 objets de palais achetables en points de caisses, 5 adversaires d'élection. Une romance à six crans (`lib/moteur/romance.dart`) ne progresse **que** si une réponse la déclare. Le palais est visitable entre deux cartes et ne coûte pas un jour. `outils/planche_relecture.py` fabrique une page HTML de relecture carte par carte. Le dépôt contient **423 blocs de test** sous `test/`.

### 1. GitHub

- **Rôle** : dépôt du code et de tout le contenu, plus l'intégration continue. C'est la source unique — Xcode Cloud clone depuis ici.
- **Console** : https://github.com/teiki5320/palabre
- **Identifiants publics** : propriétaire `teiki5320`, dépôt `palabre`, branche par défaut `main`. Un tag historique, `palabre-final`, marque l'application précédente qui occupait ce dépôt. 201 commits à ce jour.
- **Secrets** : aucun secret n'est requis par le workflow. `.github/workflows/ci.yml` n'utilise ni `secrets.*` ni variable d'environnement chiffrée — il ne fait qu'analyser et tester.
- **Coût** : GitHub Actions sur `ubuntu-latest`, dans le quota gratuit des dépôts publics ; à vérifier dans la console si le dépôt est privé.

### 2. Apple Developer et App Store Connect

- **Rôle** : signature, distribution TestFlight et App Store de la version iOS. C'est la seule chaîne de publication réellement câblée dans le dépôt.
- **Console** : https://appstoreconnect.apple.com et https://developer.apple.com/account
- **Identifiants publics** : identifiant de bundle **`sn.palabre.app`** (`ios/Runner.xcodeproj/project.pbxproj`), équipe de développement **`K597U7X3FZ`**, nom affiché **« Palabre »** (`CFBundleDisplayName`), nom interne `president`. Cible minimale iOS 15.0. Le numéro de build vient de `CI_BUILD_NUMBER`, la version marketing de `FLUTTER_BUILD_NAME`, donc de `pubspec.yaml`.
- **Secrets** : aucun dans le dépôt. Les certificats et profils de provisionnement sont gérés par Xcode Cloud et le trousseau Apple ; `ci_post_clone.sh` construit d'ailleurs **sans signer** (`--no-codesign`), la signature étant faite par le service. État de l'abonnement et des certificats : à vérifier dans la console.
- **Coût** : programme Apple Developer, 99 $ par an ; minutes Xcode Cloud selon le forfait — à vérifier dans la console.

### 3. Google Play Console

- **Rôle** : distribution Android. La signature de publication est câblée et vérifiée ; il n'y a en revanche **aucune automatisation** — ni script de publication, ni action GitHub. Le bundle se construit à la main, sur une machine qui a la clé.
- **Console** : https://play.google.com/console
- **Identifiants publics** : `applicationId` **`sn.palabre.app`**, `namespace` `sn.palabre.president`, nom affiché **« Palabre »** (`android:label`). `minSdk`, `targetSdk` et `compileSdk` suivent les valeurs par défaut de Flutter, elles ne sont pas figées dans le dépôt.
- **Secrets** : le keystore de publication et `android/key.properties` sont **exclus du dépôt** par `.gitignore` (lignes `android/key.properties` et `*.jks`) et n'y ont jamais été versionnés. Un modèle vide, `android/key.properties.exemple`, dit quoi y mettre. Emplacement réel et mots de passe : hors dépôt, à vérifier.
- **Poids** : APK de release **144,7 Mo**, bundle **143,3 Mo**, mesurés. La limite du module de base sur Play est de 150 Mo.
- **Coût** : inscription Google Play, 25 $ une fois. État du compte : à vérifier dans la console.

### 4. OpenArt

- **Rôle** : génération des portraits de personnages, des plaques du palais et des cartes du pays. Ce n'est pas une dépendance de l'application — les images sont produites une fois puis versionnées dans `assets/images/`.
- **Console** : https://openart.ai
- **Identifiants publics** : modèle `nano-banana-2-lite`, format 3:4, recette de prompt consignée dans `docs/superpowers/specs/2026-09-16-president-100-jours-design.md`.
- **Secrets** : aucun dans le dépôt. Le compte est utilisé de façon interactive, aucune clé d'API n'est stockée ici.
- **Coût** : en crédits, prépayés. Solde restant : à vérifier dans la console.
