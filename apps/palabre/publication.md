# PUBLICATION — état des boutiques

> Généré le 22 septembre 2026 d'après les consoles. Pour mettre à jour : relancer ce même prompt.
>
> Aucun secret ici — uniquement des références.

## Vue d'ensemble

- **iOS** : la chaîne de construction existe et fonctionne — Xcode Cloud est câblé par `ios/ci_scripts/ci_post_clone.sh`, la signature est déléguée au service, l'équipe et l'identifiant de bundle sont renseignés dans le projet Xcode. Le dépôt ne montre **aucune trace de soumission** : ni version publiée, ni numéro de build TestFlight, ni fiche. État réel de la fiche et des builds : à vérifier dans la console.
- **Android** : la signature de publication est **câblée et vérifiée**. `android/app/build.gradle.kts` lit `android/key.properties` quand ce fichier existe et signe la variante `release` avec ; sans lui — intégration continue, machine neuve — il retombe sur la clé de debug pour que `flutter run --release` continue de marcher. Vérifié de bout en bout avec un keystore jetable : l'APK produit portait bien le certificat de cette clé, pas celui de debug. Il reste à poser le vrai keystore sur la machine de publication. **Point dur** : le bundle pèse **143,3 Mo** pour une limite de 150 Mo sur le module de base — moins de 5 % de marge.
- **Version commune** : **0.27.0+1** (`pubspec.yaml`). Les deux plateformes en dépendent : iOS lit `FLUTTER_BUILD_NAME` et `FLUTTER_BUILD_NUMBER`, Android lit `flutter.versionName` et `flutter.versionCode`. Une seule ligne à changer pour les deux.
- **Identifiant de bundle** : **`sn.palabre.app`**, identique des deux côtés — `PRODUCT_BUNDLE_IDENTIFIER` dans `ios/Runner.xcodeproj/project.pbxproj`, `applicationId` dans `android/app/build.gradle.kts`. Le `namespace` Android, `sn.palabre.president`, est interne au code Kotlin et n'a aucun effet sur la boutique. Nom affiché des deux côtés : **« Palabre »**.
- **Monétisation** : **aucune**. Ni SDK publicitaire, ni achat intégré, ni abonnement dans `pubspec.yaml` ou dans `lib/`. L'application ne fait aucun appel réseau et ne déclare aucune permission Android. C'est la réponse la plus simple possible aux questionnaires de confidentialité des deux boutiques : aucune donnée collectée.
- **Chemin critique** : la décision de monétisation — qui conditionne la fiche, la classification et le questionnaire de confidentialité —, puis la première soumission iOS, la seule chaîne déjà câblée. Android suit, une fois le keystore posé et le paquet ramené sous les 150 Mo.

### 1. iOS · App Store

| | |
|---|---|
| **État** | Chaîne de construction prête, aucune soumission visible dans le dépôt — à vérifier dans la console |
| **Console** | https://appstoreconnect.apple.com |
| **Version dans le dépôt** | 0.27.0+1 (`pubspec.yaml`) |
| **Version en ligne** | à vérifier dans la console |
| **Identifiant de bundle** | `sn.palabre.app` |
| **Équipe de développement** | `K597U7X3FZ` |
| **Nom affiché** | Palabre |
| **Cible minimale** | iOS 15.0 |
| **Construction** | Xcode Cloud, `ios/ci_scripts/ci_post_clone.sh` — Flutter 3.47.3, `build ios --release --no-codesign --config-only`, puis `pod install` |
| **Numéro de build** | fourni par Xcode Cloud (`CI_BUILD_NUMBER`), pas figé dans le dépôt |
| **Signature** | déléguée à Xcode Cloud ; aucun certificat ni profil dans le dépôt |
| **Classification** | 17+ visée, à cause des scènes de chambre — questionnaire à remplir, à vérifier dans la console |
| **Confidentialité** | aucune donnée collectée ; politique rédigée, `docs/confidentialite.html` |
| **TestFlight** | à vérifier dans la console |
| **Fiche (titre, description, captures)** | rédigée dans `docs/BOUTIQUE.md`, captures dans `docs/captures/` |

### 2. Android · Google Play

| | |
|---|---|
| **État** | Signature câblée et vérifiée ; aucune soumission — à vérifier dans la console |
| **Console** | https://play.google.com/console |
| **Version dans le dépôt** | 0.27.0+1 (`pubspec.yaml`) |
| **Version en ligne** | à vérifier dans la console |
| **Identifiant d'application** | `sn.palabre.app` |
| **Espace de noms** | `sn.palabre.president` |
| **Nom affiché** | Palabre |
| **Niveaux d'API** | `minSdk`, `targetSdk` et `compileSdk` suivent les valeurs par défaut de Flutter — non figés dans le dépôt |
| **Java / Kotlin** | 17 des deux côtés |
| **Permissions déclarées** | aucune (`AndroidManifest.xml`) |
| **Construction** | aucune automatisation — ni action GitHub, ni script de publication |
| **Signature** | `signingConfigs` branché sur `android/key.properties`, avec repli sur la clé de debug si le fichier est absent ; modèle dans `android/key.properties.exemple` |
| **Keystore** | **hors dépôt**, exclu par `.gitignore` (`key.properties`, `*.jks`) ; emplacement réel à vérifier hors dépôt |
| **Poids du bundle** | 143,3 Mo mesurés — limite de 150 Mo, marge sous 5 % |
| **Poids de l'APK** | 144,7 Mo mesurés |
| **Classification** | 18 visée — questionnaire à remplir, à vérifier dans la console |
| **Confidentialité** | « aucune donnée collectée » ; politique rédigée, `docs/confidentialite.html` |
| **Fiche (titre, description, captures)** | rédigée dans `docs/BOUTIQUE.md`, captures dans `docs/captures/` |

## Ce qui reste, dans l'ordre

Le contenu est fini et relu, les fiches de boutique sont écrites, les
captures sont prises, la politique de confidentialité est rédigée et la
signature Android est câblée. Ce qui suit est tout ce qui reste.

1. **Trancher le modèle de rémunération.** Il décide de la fiche, de la classification IARC et du questionnaire de confidentialité : le faire après la soumission obligerait à tout reprendre.
2. **Héberger la politique de confidentialité.** Elle est écrite (`docs/confidentialite.html`) ; il lui faut une adresse publique stable. Le plus court : activer GitHub Pages sur `main / docs`.
3. **Remplir les questionnaires** de classification et de confidentialité des deux côtés. Les réponses sont préparées dans `docs/BOUTIQUE.md` et vérifiables dans le code.
4. **Soumettre une première build iOS à TestFlight** par Xcode Cloud, et la faire tourner sur appareil réel avant toute ouverture publique.
5. **Poser le vrai keystore Android.** Le câblage est fait et vérifié ; il ne manque que `android/key.properties` sur la machine de publication, sur le modèle de `android/key.properties.exemple`.
6. **Ramener le paquet Android sous les 150 Mo.** Le bundle en fait 143,3. Une recompression des images à qualité ferme le ramène autour de 110 Mo sans perte visible ; la livraison d'actifs de Play le ferait sans toucher aux images.
7. **Ouvrir en test fermé** sur les deux boutiques avant la publication générale.
