# PUBLICATION — état des boutiques

> Mis à jour le 30 octobre 2026 d'après le dépôt, les vérifications GitHub et la page en ligne — pas d'accès aux consoles : tout statut de boutique est « à vérifier dans la console ». Pour mettre à jour : relancer ce même prompt.
>
> Aucun secret ici — uniquement des références.

## En bref

- **Version commune** : 0.31.0+1 (`pubspec.yaml`)
- **Identifiant de bundle** : `sn.palabre.app`, iOS et Android
- **Monétisation** : aucune — ni pub, ni achat intégré
- **Confidentialité** : aucune donnée collectée, politique en ligne
- **Contact** : palabre@toakeur.com

## Boutiques

| | 🍎 App Store | 🤖 Google Play |
|---|---|---|
| État | [pas encore] aucune soumission visible | [pas encore] aucune soumission visible |
| Construction | [ok] Xcode Cloud, build 173 réussie le 29/10 | [à faire] à la main, aucune automatisation |
| Signature | [ok] gérée par Xcode Cloud | [à faire] câblée, vraie clé à poser |
| Classification | [à faire] 17+ visée, questionnaire à remplir | [à faire] 18 visée, questionnaire à remplir |
| Cible | [ok] iOS 15.0 minimum | [ok] SDK par défaut de Flutter |
| Permissions | [ok] aucune | [ok] aucune déclarée |
| Poids | [à faire] non mesuré, à vérifier dans la console | [ok] bundle 109,3 Mo sur 150 |

## Poids

- 🤖 **Poids du bundle Android** : 109,3 / 150 Mo — mesuré le 30 octobre 2026, après recompression des images (il faisait 143,3 Mo jusqu'au 30 octobre)

## Vue d'ensemble

- **iOS** : la chaîne de construction existe et fonctionne — Xcode Cloud est câblé par `ios/ci_scripts/ci_post_clone.sh`, la signature est déléguée au service, l'équipe et l'identifiant de bundle sont renseignés dans le projet Xcode. Preuve sur GitHub : le flux Xcode Cloud « palabre-testflight » a réussi son archive iOS du 13 au 27 octobre 2026, puis de nouveau le 29 octobre (build 173, mail d'Apple du 29 octobre), sans étape TestFlight ; seule la build 172 du 28 octobre avait échoué, le script `ci_post_clone.sh` ayant dépassé le délai de 15 minutes sans rien écrire. Le dépôt ne montre **aucune trace de soumission** : ni version publiée, ni numéro de build TestFlight, ni fiche. Les builds n'arrivent pas seules dans TestFlight : l'envoi est manuel, fait par Jean (aucune build sur TestFlight au 30 octobre 2026, aucun mail TestFlight — vérifié dans Gmail le 30 octobre). État de la fiche : à vérifier dans la console.
- **Android** : la signature de publication est **câblée et vérifiée**. `android/app/build.gradle.kts` lit `android/key.properties` quand ce fichier existe et signe la variante `release` avec ; sans lui — intégration continue, machine neuve — il retombe sur la clé de debug pour que `flutter run --release` continue de marcher. Vérifié de bout en bout avec un keystore jetable : l'APK produit portait bien le certificat de cette clé, pas celui de debug. Aucune trace de la vraie clé de publication pour l'instant — à vérifier hors dépôt. Le bundle pèse **109,3 Mo** pour une limite de 150 Mo sur le module de base (mesuré le 30 octobre 2026) : la marge est de quarante mégaoctets. Il en faisait 143,3 jusqu'à la recompression des images du 30 octobre.
- **Version commune** : **0.31.0+1** (`pubspec.yaml`). Les deux plateformes en dépendent : iOS lit `FLUTTER_BUILD_NAME` et `FLUTTER_BUILD_NUMBER`, Android lit `flutter.versionName` et `flutter.versionCode`. Une seule ligne à changer pour les deux.
- **Identifiant de bundle** : **`sn.palabre.app`**, identique des deux côtés — `PRODUCT_BUNDLE_IDENTIFIER` dans `ios/Runner.xcodeproj/project.pbxproj`, `applicationId` dans `android/app/build.gradle.kts`. Le `namespace` Android, `sn.palabre.president`, est interne au code Kotlin et n'a aucun effet sur la boutique. Nom affiché des deux côtés : **« Palabre »**.
- **Monétisation** : **aucune**. Ni SDK publicitaire, ni achat intégré, ni abonnement dans `pubspec.yaml` ou dans `lib/`. L'application ne fait aucun appel réseau et ne déclare aucune permission Android. C'est la réponse la plus simple possible aux questionnaires de confidentialité des deux boutiques : aucune donnée collectée.
- **Confidentialité** : la politique est en ligne sur <https://palabre.toakeur.com/confidentialite.html> (GitHub Pages derrière Cloudflare, vérifié le 30 octobre 2026), contact `palabre@toakeur.com`. La racine <https://palabre.toakeur.com/> sert une page d'accueil en ligne depuis le 12 octobre 2026, qui porte la même adresse de contact : c'est l'adresse de site et d'assistance prévue pour les deux fiches.
- **Soumission** : aucune, ni sur l'App Store ni sur Google Play, d'après le dépôt ; le site lui-même dit que le jeu n'est publié nulle part. Seule la construction iOS est automatisée (Xcode Cloud) ; Android se construit à la main.

### 1. iOS · App Store

| | |
|---|---|
| **État** | Fiche créée (identifiant Apple `6811035059`), chaîne de construction qui archive, aucune soumission |
| **Console** | https://appstoreconnect.apple.com |
| **Version dans le dépôt** | 0.31.0+1 (`pubspec.yaml`) |
| **Version en ligne** | à vérifier dans la console |
| **Identifiant de l'application** | `6811035059` (relevé le 30 octobre 2026) |
| **Identifiant de bundle** | `sn.palabre.app` |
| **Équipe de développement** | `K597U7X3FZ` |
| **Nom affiché** | Palabre |
| **Cible minimale** | iOS 15.0 |
| **Construction** | Xcode Cloud, `ios/ci_scripts/ci_post_clone.sh` — Flutter 3.47.3, `build ios --release --no-codesign --config-only`, puis `pod install` |
| **Numéro de build** | fourni par Xcode Cloud (`CI_BUILD_NUMBER`), pas figé dans le dépôt |
| **Signature** | déléguée à Xcode Cloud ; aucun certificat ni profil dans le dépôt |
| **Classification** | 17+ visée, à cause des scènes de chambre — questionnaire à remplir, à vérifier dans la console |
| **Confidentialité** | aucune donnée collectée ; politique en ligne, `https://palabre.toakeur.com/confidentialite.html`, contact `palabre@toakeur.com` |
| **TestFlight** | envoi manuel par Jean, aucune build sur TestFlight au 30 octobre 2026 : le flux « palabre-testflight » ne fait que l'archive iOS (builds 167 à 171 réussies du 24 au 27 octobre, build 172 en échec le 28 octobre, build 173 réussie le 29 octobre), sans étape TestFlight ni post-action de distribution — vérifié par l'API GitHub le 30 octobre 2026 |
| **Fiche (titre, description, captures)** | rédigée dans `docs/BOUTIQUE.md`, captures dans `docs/captures/` |

### 2. Android · Google Play

| | |
|---|---|
| **État** | Signature câblée et vérifiée ; aucune soumission — à vérifier dans la console |
| **Console** | https://play.google.com/console |
| **Version dans le dépôt** | 0.31.0+1 (`pubspec.yaml`) |
| **Version en ligne** | à vérifier dans la console |
| **Identifiant d'application** | `sn.palabre.app` |
| **Espace de noms** | `sn.palabre.president` |
| **Nom affiché** | Palabre |
| **Niveaux d'API** | `targetSdk` **figé à 36** depuis le 30 octobre 2026 ; `minSdk` (24) et `compileSdk` suivent Flutter |
| **Java / Kotlin** | 17 des deux côtés |
| **Permissions déclarées** | aucune (`AndroidManifest.xml`) |
| **Construction** | aucune automatisation — ni action GitHub, ni script de publication |
| **Signature** | `signingConfigs` branché sur `android/key.properties`, avec repli sur la clé de debug si le fichier est absent ; modèle dans `android/key.properties.exemple` |
| **Keystore** | **hors dépôt**, exclu par `.gitignore` (`key.properties`, `*.jks`) ; vraie clé de publication : aucune trace, à vérifier hors dépôt |
| **Poids du bundle** | **109,3 Mo** mesurés le 30 octobre 2026 — limite de 150 Mo, quarante de marge (143,3 Mo jusqu'au 30 octobre) |
| **Classification** | 18 visée — questionnaire à remplir, à vérifier dans la console |
| **Confidentialité** | « aucune donnée collectée » ; politique en ligne, `https://palabre.toakeur.com/confidentialite.html`, contact `palabre@toakeur.com` |
| **Fiche (titre, description, captures)** | rédigée dans `docs/BOUTIQUE.md`, captures dans `docs/captures/` |

## Ce qui reste, dans l'ordre

1. ✅ **Contenu et fiches de boutique** : 687 cartes relues, textes et captures prêts dans `docs/`.
2. ✅ **Site et confidentialité** : accueil et politique en ligne sur palabre.toakeur.com.
3. ✅ **Signature Android câblée** : `key.properties` lu s'il existe, vérifié avec une clé jetable.
4. **Trancher le modèle de rémunération** : il décide de la fiche, de la classification et de la confidentialité.
5. **Remplir les questionnaires** : classification et confidentialité, des deux côtés.
6. **Brancher TestFlight sur le flux Xcode Cloud** : le flux `palabre-testflight` n'a qu'une action, *Archive - iOS*, sans post-action de distribution — c'est pour cela qu'aucune build n'arrive. Console → Xcode Cloud → flux → Post-Actions → TestFlight Internal Testing. Deux minutes, et la suite se fait seule.
7. **Première build sur TestFlight** : essayée sur un appareil réel. Tant que le point 6 n'est pas fait, l'archive se télécharge et s'envoie à la main.
8. **Poser la vraie clé Android** : `android/key.properties`, sauvegardée hors du dépôt.
9. ✅ **Bundle Android sous 150 Mo** : 109,3 Mo depuis la recompression des images du 30 octobre 2026.
10. **Test fermé puis sortie publique** : sur les deux boutiques.
