# INFRA — fiche technique

Mis à jour le 12 octobre 2026 d'après le dépôt et la page en ligne. Pour mettre à jour : relancer ce même prompt.

## Vue d'ensemble

- **Plateforme** : application mobile iOS et Android, un seul code source Flutter. Les deux dossiers natifs existent dans le dépôt (`ios/`, `android/`), aucune cible web, macOS, Windows ou Linux.
- **Stack** : Flutter épinglé à la version **3.47.3** (canal stable) aux deux endroits qui construisent — `.github/workflows/ci.yml` et `ios/ci_scripts/ci_post_clone.sh`. SDK Dart `^3.13.0` (`pubspec.yaml`). Trois dépendances seulement : `flutter_riverpod ^3.0.0` (état), `shared_preferences ^2.3.0` (sauvegarde locale), `audioplayers ^6.1.0` (son). En développement : `flutter_lints ^5.0.0`, `flutter_launcher_icons ^0.14.0`. iOS cible **15.0** minimum, Java et Kotlin en **17** côté Android.
- **Backend** : **aucun**. Aucun client réseau n'est déclaré dans `pubspec.yaml` (ni `http`, ni `dio`, ni Firebase, ni Supabase) et aucun appel réseau n'existe dans `lib/`. Tout le contenu du jeu est embarqué : **8 fichiers JSON, 612 Ko**, dans `assets/contenu/` (`cartes.json`, `personnages.json`, `parcours.json`, `fins.json`, `exploits.json`, `objets.json`, `adversaires.json`, `chambre.json`). La sauvegarde passe par `shared_preferences`, sur l'appareil — le commentaire d'en-tête de `lib/sauvegarde/sauvegarde.dart` le dit explicitement : « Rien ne part sur le réseau. » Quatre clés : `partie_en_cours`, `progression`, `intro_vue`, `geste_appris`. Le `AndroidManifest.xml` ne déclare **aucune permission**.
- **Distribution** : dépôt GitHub `teiki5320/palabre` (branche `main`). iOS par **Xcode Cloud** — le script `ios/ci_scripts/ci_post_clone.sh` installe Flutter, fait `pub get`, `flutter build ios --release --no-codesign --config-only` puis `pod install`. Android : pas d'automatisation, mais la signature de publication est câblée — `android/app/build.gradle.kts` lit `android/key.properties` s'il existe et retombe sur la clé de debug sinon, pour que l'intégration continue et `flutter run --release` continuent de marcher sans la clé. Version commune **0.28.0+1** (`pubspec.yaml`).
- **Site** : la politique de confidentialité, `docs/confidentialite.html`, est publiée par **GitHub Pages** et répond sur <https://palabre.toakeur.com/confidentialite.html> (vérifié le 12 octobre 2026). Contact affiché : `palabre@toakeur.com`. La racine sert désormais une page d'accueil, `docs/index.html` : ce qu'est le jeu, cinq captures, les chiffres du contenu, et le fait qu'il n'est publié nulle part. Ses images web vivent dans `docs/site/` (412 Ko en tout).
- **IA et outils** : les portraits et décors sont générés sur **OpenArt**, modèle `nano-banana-2-lite`, format 3:4 — la recette est écrite dans `docs/superpowers/specs/2026-09-16-president-100-jours-design.md`. `assets/images/` pèse **83 Mo**, `assets/` **89 Mo** au total. Les 16 sons de `assets/sons/` sont dans le dépôt mais **aucun outil de production sonore n'y est référencé** : à vérifier hors dépôt. Une douzaine d'outils d'atelier vivent dans `outils/` (Python et Dart) : `audit_cartes.py` (contrôles que le moteur ne peut pas faire), `planche_jeu.py`, `planche_relecture.py`, `planche_romances.py`, `planche_palais.py`, `mesure_par_histoire.dart`. Ils ne sont pas embarqués dans l'application.
- **Particularités du jeu** : quatre jauges — **peuple, armée, caisses, presse** — qui partent à 50 et tuent **à 0 comme à 100** (`lib/moteur/denouement.dart`, `evalue`). Une carte par jour, glissée à gauche ou à droite. Le mandat dure **100 jours** (`const int dureeMandat = 100`) et se termine par une élection que l'on gagne si la moyenne peuple/presse dépasse la force de l'opposition — laquelle part de 50 et monte de ce qu'on a perdu. Le jour et la nuit alternent **toutes les 10 cartes** (`cartesParDemiJournee`), ce qui donne cinq nuits par mandat. Le contenu compte **687 cartes**, **59 histoires à plusieurs cartes**, 15 personnages, 10 parcours de départ, 14 fins, 10 exploits, 24 objets de palais achetables en points de caisses, 5 adversaires d'élection. Une romance à six crans (`lib/moteur/romance.dart`) ne progresse **que** si une réponse la déclare. Le palais est visitable entre deux cartes et ne coûte pas un jour. `outils/planche_relecture.py` fabrique une page HTML de relecture carte par carte. Le dépôt contient **423 blocs de test** sous `test/`.

## Services externes

### 1. GitHub

- **Rôle** : dépôt du code et de tout le contenu, intégration continue, et publication de la page de confidentialité (GitHub Pages, voir plus bas). C'est la source unique — Xcode Cloud clone depuis ici.
- **Console** : https://github.com/teiki5320/palabre
- **Identifiants publics** : propriétaire `teiki5320`, dépôt `palabre` (public), branche par défaut `main`. Un tag historique, `palabre-final`, marque l'application précédente qui occupait ce dépôt.
- **Secrets** : aucun secret n'est requis par le workflow. `.github/workflows/ci.yml` n'utilise ni `secrets.*` ni variable d'environnement chiffrée — il ne fait qu'analyser et tester (dernier passage vert le 8 octobre 2026).
- **Coût** : GitHub Actions sur `ubuntu-latest`, dans le quota gratuit des dépôts publics.

### 2. Apple Developer Program

- **Rôle** : compte développeur (compte Apple Developer de Jean) — certificats et profils de signature, gérés par Xcode Cloud et non par le dépôt.
- **Console** : https://developer.apple.com/account
- **Identifiants publics** : équipe de développement **`K597U7X3FZ`**.
- **Secrets** : aucun dans le dépôt ; identifiants du compte → gestionnaire de mots de passe. État de l'abonnement et des certificats : à vérifier dans la console.
- **Coût** : adhésion annuelle.

### 3. App Store Connect

- **Rôle** : fiche App Store, TestFlight, soumission. Textes de fiche et réponses aux questionnaires prêts dans `docs/BOUTIQUE.md`.
- **Console** : https://appstoreconnect.apple.com
- **Identifiants publics** : identifiant de bundle **`sn.palabre.app`** (`ios/Runner.xcodeproj/project.pbxproj`), nom affiché **« Palabre »** (`CFBundleDisplayName`), nom interne `president`. Cible minimale iOS 15.0. La version marketing vient de `FLUTTER_BUILD_NAME`, donc de `pubspec.yaml`. Adresse de confidentialité à coller : `https://palabre.toakeur.com/confidentialite.html`.
- **Secrets** : — (accès par le compte Apple Developer).
- **Coût** : inclus dans l'adhésion Apple Developer.

### 4. Xcode Cloud

- **Rôle** : construction iOS. Le script `ios/ci_scripts/ci_post_clone.sh` installe Flutter **3.47.3**, fait `flutter pub get`, `flutter build ios --release --no-codesign --config-only` puis `pod install` ; la signature est faite par le service. Le numéro de build vient de `CI_BUILD_NUMBER`. Les flux de travail eux-mêmes (déclencheurs, destination TestFlight) ne sont pas dans le dépôt.
- **Console** : App Store Connect → onglet Xcode Cloud.
- **Identifiants publics** : variable `FLUTTER_VERSION` (facultative, 3.47.3 par défaut).
- **Secrets** : aucun dans le dépôt (signature gérée par Apple).
- **Coût** : heures de build gratuites incluses dans l'adhésion ; consommation à vérifier dans la console.

### 5. Google Play Console

- **Rôle** : distribution Android. Il n'y a **aucune automatisation** — ni script de publication, ni action GitHub. Le bundle se construit à la main, sur une machine qui a la clé.
- **Console** : https://play.google.com/console
- **Identifiants publics** : `applicationId` **`sn.palabre.app`**, `namespace` `sn.palabre.president`, nom affiché **« Palabre »** (`android:label`). `minSdk`, `targetSdk` et `compileSdk` suivent les valeurs par défaut de Flutter, elles ne sont pas figées dans le dépôt.
- **Poids** : APK de release **144,7 Mo**, bundle **143,3 Mo**, mesurés en septembre. La limite du module de base sur Play est de 150 Mo.
- **Secrets** : voir « Keystore Android » ci-dessous.
- **Coût** : frais d'inscription unique. État du compte : à vérifier dans la console.

### 6. Keystore Android (signature)

- **Rôle** : signe la variante `release`. `android/app/build.gradle.kts` lit `android/key.properties` quand il existe ; sinon il retombe sur la clé de debug. Le câblage a été vérifié avec un keystore jetable ; aucune trace de la vraie clé de publication pour l'instant — à vérifier hors dépôt.
- **Console** : aucune — fichiers locaux.
- **Identifiants publics** : modèle vide `android/key.properties.exemple`.
- **Secrets** : `android/key.properties` et le fichier `.jks`, exclus du dépôt par `.gitignore` (`android/key.properties`, `*.jks`). Les sauvegarder hors du dépôt une fois créés : leur perte empêche toute mise à jour sur Play (sauf signature d'application par Play, à vérifier dans la console).
- **Coût** : gratuit.

### 7. Hébergement web (GitHub Pages / Cloudflare Pages)

- **Rôle** : publie le dossier `docs/` de `main` sur **GitHub Pages** (publication automatique à chaque envoi). Seule page utile : `confidentialite.html`, l'adresse de confidentialité exigée par les deux boutiques.
- **État** : en ligne — la racine <https://palabre.toakeur.com/> et <https://palabre.toakeur.com/confidentialite.html> répondent. Deux pages publiées depuis `docs/` : l'accueil et la politique de confidentialité.
- **Console** : https://github.com/teiki5320/palabre/settings/pages
- **Identifiants publics** : adresses ci-dessus.
- **Secrets** : aucun.
- **Coût** : gratuit.

### 8. Nom de domaine

- **Rôle** : sous-domaine `palabre.toakeur.com` du domaine commun `toakeur.com`, DNS chez Cloudflare (proxy actif devant GitHub Pages). Aucun domaine personnalisé n'est déclaré côté GitHub Pages (pas de fichier `CNAME` dans `docs/`) : le raccord se fait côté Cloudflare, réglage exact à vérifier dans la console. Adresse de contact publique `palabre@toakeur.com` (politique de confidentialité).
- **Console** : https://dash.cloudflare.com (compte de gestion `admin@toakeur.com`) ; bureau d'enregistrement du domaine à vérifier dans la console.
- **Identifiants publics** : `palabre.toakeur.com`, `palabre@toakeur.com`.
- **Secrets** : identifiants du compte → gestionnaire de mots de passe.
- **Coût** : domaine partagé entre toutes les apps.

### 9. API d'IA (OpenArt, génération d'images)

- **Rôle** : génération des portraits de personnages, des plaques du palais et des cartes du pays. Ce n'est pas une dépendance de l'application — les images sont produites une fois puis versionnées dans `assets/images/` ; l'app n'appelle aucune IA.
- **Console** : https://openart.ai
- **Identifiants publics** : modèle `nano-banana-2-lite`, format 3:4, recette de prompt consignée dans `docs/superpowers/specs/2026-09-16-president-100-jours-design.md`.
- **Secrets** : aucun dans le dépôt. Le compte est utilisé de façon interactive, aucune clé d'API n'est stockée ici.
- **Coût** : en crédits, prépayés. Solde restant : à vérifier dans la console.

### 10. Visuels du store (icône, captures)

- **Rôle** : icône de l'application, fabriquée depuis `assets/icone/icone.png` par `flutter_launcher_icons` (`dart run flutter_launcher_icons`), et visuels des fiches dans `docs/captures/` : six captures App Store au format 6,9 pouces (`app-store-6.9/`), six captures téléphone pour Play (`play-telephone/`), l'icône Play 512 px et l'image de présentation 1024 × 500.
- **Console** : App Store Connect et Google Play Console, au moment de remplir les fiches.
- **Identifiants publics** : —
- **Secrets** : aucun.
- **Coût** : gratuit.
