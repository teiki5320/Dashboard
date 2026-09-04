# INFRA — fiche technique

> Généré le 20 août 2026 par un scan du dépôt. Pour mettre à jour :
> relancer ce même prompt.

## Vue d'ensemble

- **Plateforme** : iOS 15+ (1.0 en cours d'examen App Store) · Android préparé, pas encore publié
- **Stack** : Flutter (Dart ≥ 3.6), 154 tests, aucun serveur applicatif
- **Backend** : aucun — tout l'état du joueur vit sur l'appareil (`shared_preferences`)
- **Distribution** : App Store via Xcode Cloud · Play Store via App Bundle signé localement
- **Monétisation** : interstitielle AdMob + achat unique 3,99 €, à partir de la 1.1
- **Particularités** : jeu entièrement hors ligne, aucune clé d'API dans le dépôt, un seul e-mail public (`erea.toa@gmail.com`)

Les deux seuls tiers embarqués sont Google (publicité) et les boutiques
(achat, classements). Pas de base de données, pas d'analytics, pas de
crash reporting, pas de domaine acheté. Conséquence directe : la fiche
« Confidentialité » de l'App Store déclare, **à partir de la 1.1**, les
collectes du SDK de Google — le badge « Aucune donnée collectée »
appartient à la 1.0.

---

### 1. GitHub

| | |
|---|---|
| Rôle | Hébergement du dépôt `teiki5320/erea` **et** du prototype web jouable via GitHub Pages |
| Console | <https://github.com/teiki5320/erea> (réglages : Settings → Pages) |
| Compte propriétaire | `teiki5320` |
| Coût | gratuit |

**Identifiants publics :**
- URL publique : `https://teiki5320.github.io/erea/` — la vitrine de l'app.
- Le jeu web jouable est sur `/erea/jeu.html`, copie déployée de `index-v8.html`.
- `/erea/support.html` et `/erea/confidentialite.html` : les deux URL exigées par l'App Store, saisies dans la fiche.
- Site servi depuis la racine du dépôt (fichier `.nojekyll` présent).

**Où vivent les secrets :** nulle part. Aucun workflow GitHub Actions,
donc aucun secret de CI côté GitHub. L'accès en écriture passe par le
compte GitHub lui-même.

**Reprise :** être collaborateur du dépôt, ou propriétaire du compte
`teiki5320`. GitHub Pages se redéploie seul à chaque poussée sur `main`.

---

### 2. Apple Developer Program

| | |
|---|---|
| Rôle | Identité, signature de l'app iOS, App ID et capacités |
| Console | <https://developer.apple.com/account> (Certificates, Identifiers & Profiles) |
| Compte propriétaire | Team `K597U7X3FZ` |
| Coût | 99 $ / an |

**Identifiants publics :**
- Team ID : `K597U7X3FZ` — dans `erea_flutter/ios/Runner.xcodeproj/project.pbxproj` (`DEVELOPMENT_TEAM`).
- Bundle ID : `com.teiki.erea` — même fichier (`PRODUCT_BUNDLE_IDENTIFIER`).
- Signature **automatique** (`CODE_SIGN_STYLE = Automatic`) : aucun certificat ni profil dans le dépôt.
- Seule capacité déclarée dans `ios/Runner/Runner.entitlements` : `com.apple.developer.game-center`.

**Où vivent les secrets :** certificats de distribution et profils de
provisioning sont gérés par Apple (signature dans le cloud). Rien à
sauvegarder, rien à recopier sur une machine neuve.

**Reprise :** rôle Admin ou App Manager sur la team `K597U7X3FZ`.

---

### 3. App Store Connect

| | |
|---|---|
| Rôle | Fiche App Store, envoi des versions, TestFlight, achats intégrés, configuration Game Center et Xcode Cloud |
| Console | <https://appstoreconnect.apple.com> |
| Compte propriétaire | Même compte que le §2 |
| Coût | inclus dans l'adhésion |

**Identifiants publics :**
- App « Erea », bundle `com.teiki.erea`.
- Version `1.0.0+1` dans `erea_flutter/pubspec.yaml` — **doit être identique** au numéro saisi dans la console, sinon le build reste non sélectionnable.
- iOS minimum : 15.0 (`IPHONEOS_DEPLOYMENT_TARGET`, `Podfile`).
- Chiffrement : `ITSAppUsesNonExemptEncryption = false` dans `ios/Runner/Info.plist` — pas de formulaire d'export à chaque build.

**Achat intégré :** `com.teiki.erea.sanspub`, achat unique non
consommable à 3,99 €, identifiant Apple `6802621891`, créé le 18 août
2026. L'ID produit est écrit dans `lib/core/achat.dart` et verrouillé par
un test. L'accord « Applications payantes » est actif depuis le 18 août
2026 (banque : compte personnel ; fiscal : W-8BEN, convention
France–USA art. 12 à 0 %). Le pendant Play Console reste à créer, avec le
**même ID produit**.

**État de la version 1.0 :** soumise le 14 août 2026 avec le build 90,
refusée le 15 août au titre de *Guideline 2.1 — Information Needed*
(demande d'informations, aucun bug reproché), puis **re-soumise le
20 août 2026 avec le même build 90** — état « En attente de
vérification ». Le détail et les textes de réponse sont dans
`docs/APP_REVIEW.md`.

**Où vivent les secrets :** aucun côté dépôt. L'authentification est
celle du compte Apple (+ double facteur).

---

### 4. Xcode Cloud

| | |
|---|---|
| Rôle | Compile, signe et livre l'app iOS à partir du dépôt GitHub |
| Console | App Store Connect → Erea → Xcode Cloud |
| Compte propriétaire | Même compte que le §3 ; l'accès au dépôt passe par l'app GitHub « Xcode Cloud » |
| Coût | quota inclus, puis facturation à l'heure de calcul |

**Configuration présente dans le dépôt :**
- `erea_flutter/ios/ci_scripts/ci_post_clone.sh` — installe Flutter sur le
  runner, `flutter pub get`, `flutter build ios --config-only`,
  `pod install`, avec trois tentatives sur les étapes réseau.
- `erea_flutter/ios/ci_scripts/ci_pre_xcodebuild.sh` — garde-fou qui
  régénère `Generated.xcconfig` si l'étape d'archive ne partage pas le
  `$HOME` du post-clone.

Le reste — workflow, déclencheurs, environnement — vit **dans la
console**, pas dans le dépôt.

⚠️ Deux réglages qui ont déjà coûté des builds : dans l'action
*Archiver*, la préparation de la distribution doit rester sur
**« App Store Connect »** et non « TestFlight (tests internes
uniquement) », faute de quoi aucun build ne peut être attaché à une
version ; et le déclenchement sur `main` n'a **aucun filtre de fichiers**,
si bien qu'une poussée documentaire lance un build complet.

**Où vivent les secrets :** aucun dans le dépôt. Signature gérée par
Apple, accès GitHub par l'intégration officielle.

---

### 5. Game Center

| | |
|---|---|
| Rôle | Six classements mondiaux sans serveur à opérer : identité, consentement parental et interface fournis par Apple |
| Console | App Store Connect → Erea → Game Center (+ portail développeur pour la capacité sur l'App ID) |
| Code | Plugin `games_services`, logique dans `erea_flutter/lib/core/classement.dart` |
| Coût | gratuit |

**Identifiants publics** (un ID de classement n'est pas un secret) :

| ID | Type | Plage |
|---|---|---|
| `erea.daily` | Récurrent 24 h | 0–11000 |
| `erea.streak` | Classique | 0–3650 |
| `erea.classic.facile` / `.normal` / `.difficile` | Classique | 0–11000 |
| `erea.chrono` | Classique | 0–10000 |

Actif depuis le 4 août 2026 : capacité cochée sur l'App ID, six
classements créés, entitlement déclaré dans les trois configurations du
target Runner, vérifié sur appareil réel. Les six sont attachés à la
version 1.0.0. L'ordre des opérations — capacité, puis classements, puis
entitlement — est documenté dans `erea_flutter/ios/GAME_CENTER.md` : le
rattacher trop tôt casse la signature.

**Où vivent les secrets :** nulle part. Game Center n'utilise ni clé
d'API ni jeton.

---

### 6. Google AdMob

| | |
|---|---|
| Rôle | Sert l'interstitielle de fin de partie, à partir de la 1.1 |
| Console | <https://apps.admob.com> |
| Compte propriétaire | Compte Google du propriétaire, éditeur `pub-2680784147246798` |
| Coût | gratuit (Google prélève sa part sur les recettes) |

**Identifiants publics par design** — visibles dans toute app publiée :

| Quoi | Valeur | Où dans le dépôt |
|---|---|---|
| App AdMob iOS | `ca-app-pub-2680784147246798~7462344540` | `ios/Runner/Info.plist` |
| App AdMob Android | `ca-app-pub-2680784147246798~5183715892` | `android/app/src/main/AndroidManifest.xml` |
| Bloc interstitiel iOS | `ca-app-pub-2680784147246798/6744159246` | `lib/core/pub.dart` |
| Bloc interstitiel Android | `ca-app-pub-2680784147246798/7670278436` | `lib/core/pub.dart` |

Les quatre valeurs doivent appartenir au même compte, sinon la régie
refuse de servir.

**Consentement RGPD — message publié le 3 septembre 2026.** Jusqu'à
cette date la console était vide, et le journal Android le disait sans
détour : `Publisher misconfiguration: no form(s) configured for the
input app ID`. Aucune annonce n'aurait été servie en Europe. Le message
« Erea — consentement RGPD » couvre les deux applications, s'affiche en
français (anglais en secours), offre les trois boutons *Refuser*,
*Autoriser* et *Gérer les options*, et renvoie à
`https://teiki5320.github.io/erea/confidentialite.html`. Côté code il
n'y avait rien à faire : `lib/core/pub.dart` appelait déjà le SDK UMP au
démarrage et exposait « Options de confidentialité ». Seule la console
manquait.

⚠️ La carte **IDFA** de la même page reste vide. Le reste est prêt :
`NSUserTrackingUsageDescription` est dans `ios/Runner/Info.plist`, et le
même `loadAndShowConsentFormIfRequired` présente le message IDFA puis la
fenêtre d'Apple — il n'y a pas de second appel à écrire. Créer le
message dans la console suffit. À faire avant de re-soumettre la version
iOS, pas avant le test fermé Android.

Reste vraiment ouvert : **aucun identifiant `SKAdNetworkItems`** n'est
déclaré dans `Info.plist`. Sans eux, les conversions attribuées à un
utilisateur qui a refusé le suivi ne remontent pas, et les annonceurs
paient moins cher un inventaire qu'ils ne peuvent pas mesurer.

**Paiements (état au 18 août 2026)** : seuil de versement 70 €, mensuel
vers le 21. L'IBAN ne peut pas encore être saisi — Google n'ouvre
« Gérer les modes de paiement » qu'après un premier seuil de recettes
(environ 10 €). Suivront le courrier postal avec code PIN, à saisir sous
quatre mois sous peine de gel des versements, et la vérification
d'identité. ⚠️ Vérifier alors que le nom du profil de paiement est bien
l'identité civile du titulaire du compte bancaire, et non le pseudonyme.

**Où vivent les secrets :** aucun dans le dépôt. L'accès à la console
passe par le compte Google (+ double facteur).

---

### 7. Google Play Console

| | |
|---|---|
| Rôle | Distribution Android — préparée, rien n'est encore publié |
| Console | <https://play.google.com/console> |
| Compte propriétaire | Compte **personnel**, créé le 20 août 2026 |
| Coût | 25 $ une seule fois |

**État réel :**
- Application ID `com.teiki.erea`, identique à iOS (`android/app/build.gradle.kts`).
- App Bundle de release reconstruit le 20 août 2026 : 58,5 Mo, signé avec la vraie clé (certificat `CN=Toa`, valide jusqu'en 2053).
- Le type de compte personnel impose **douze testeurs distincts pendant quatorze jours consécutifs** avant toute mise en production. C'est le chemin critique du côté Android.
- Vérification par appareil physique : un Pixel 8a a été commandé le 20 août 2026 ; un appareil simulé n'est pas accepté.
- **Play Games** — pas configuré. La table de correspondance `_playGames` de `lib/core/classement.dart` est vide et la méta-donnée `com.google.android.gms.games.APP_ID` reste commentée dans `AndroidManifest.xml`. La décommenter sans identifiant valide ferait planter l'app. Sans cela, les classements sont simplement masqués sur Android, le jeu restant jouable.

La marche à suivre complète est dans `docs/FICHE_PLAY_STORE.md`.

**Où vivent les secrets :** la clé de signature `~/erea-upload.jks` et
`erea_flutter/android/key.properties`, tous deux **hors dépôt**
(`.gitignore` couvre `android/key.properties`, `*.jks`, `*.keystore`).
Créée le 14 août 2026. ⚠️ La perdre interdit toute mise à jour de
l'app : la sauvegarder ailleurs que sur le Mac.

---

### 8. Google Fonts

| | |
|---|---|
| Rôle | Sert les polices Baloo 2 et Nunito au prototype web de la racine, via CDN |
| Console | aucune — service public sans compte |
| Coût | gratuit |

L'app Flutter n'en dépend pas : les mêmes polices sont embarquées dans
`erea_flutter/assets/fonts/`, licence SIL OFL incluse, justement pour que
l'app fonctionne hors ligne. Si le prototype web est abandonné un jour,
cette dépendance disparaît avec lui.

---

## Récapitulatif : où vit chaque secret

| Secret | Où il vit | Dans le dépôt ? |
|---|---|---|
| Certificats et profils de signature iOS | Gérés automatiquement par Apple (signature dans le cloud) | Non |
| Mot de passe Apple Developer / App Store Connect | Compte Apple du propriétaire (+ 2FA) | Non |
| Accès en écriture au dépôt | Compte GitHub `teiki5320` | Non |
| Keystore de signature Android | `~/erea-upload.jks` + `android/key.properties`, hors dépôt — **à sauvegarder ailleurs que sur le Mac** | Non |
| Mot de passe du keystore | `android/key.properties`, hors dépôt | Non |
| Accès Google Play Console / AdMob | Compte Google du propriétaire (+ 2FA) | Non |
| Coordonnées bancaires | Saisies chez Apple ; chez Google après les premières recettes | Non |
| Clés d'API tierces | **Il n'y en a aucune** — les identifiants AdMob sont publics par design | — |

Le dépôt peut être public sans risque : il ne contient aucun secret.

## Valeurs publiques par design

- `com.teiki.erea` — identifiant de l'app, visible dans toute app publiée
- `K597U7X3FZ` — Team ID Apple, visible dans toute app signée
- `erea.daily`, `erea.streak`, `erea.classic.*`, `erea.chrono` — ID de classements
- `ca-app-pub-2680784147246798…` — les quatre identifiants AdMob
- `com.teiki.erea.sanspub` — ID du produit « Erea sans publicité »
- `https://teiki5320.github.io/erea/` — URL publique du prototype web
- `erea.toa@gmail.com` — contact de support et contact public DSA

## Checklist « reprise du projet sur une machine neuve »

**Jouer et développer, sur n'importe quel système :**
1. `git clone https://github.com/teiki5320/erea.git`
2. Installer Flutter stable (≥ 3.6) — <https://docs.flutter.dev/get-started>
3. `cd erea/erea_flutter && flutter pub get`
4. `flutter analyze && flutter test` — 154 tests, la suite doit être verte
5. `flutter run`

**Construire pour iOS, sur Mac uniquement :**
6. Xcode installé, session ouverte avec un compte de la team `K597U7X3FZ`
7. `flutter build ipa --release`, ou laisser Xcode Cloud construire depuis `main`

**Construire pour Android :**
8. Restaurer `~/erea-upload.jks` depuis la sauvegarde, puis recréer
   `erea_flutter/android/key.properties` avec les chemins et mots de passe
9. `flutter build appbundle --release`, puis vérifier le certificat (voir
   `docs/FICHE_PLAY_STORE.md` §1)

**Administrer :**
10. Compte Apple Developer (team `K597U7X3FZ`) : signature et App ID
11. App Store Connect : fiche, TestFlight, Game Center, Xcode Cloud
12. Google Play Console et AdMob : compte Google du propriétaire
13. Dépôt GitHub `teiki5320/erea` : code et site web

**Rien d'autre.** Pas de fichier d'environnement à recréer, pas de base à
restaurer, pas de clé à demander à qui que ce soit — à la seule exception
du keystore Android, qui n'existe qu'en sauvegarde.
