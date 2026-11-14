# INFRA — fiche technique

> Généré le 20 août 2026 par un scan du dépôt, mis à jour le
> 14 novembre 2026. Pour mettre à jour : relancer ce même prompt.

## En bref

- **Plateforme** : iOS 15+ et Android en ligne · site vitrine
- **Stack** : Flutter (Dart ≥ 3.6), version `1.0.8+9` dans le code
- **Backend** : aucun — tout reste sur l'appareil, jeu hors ligne
- **Distribution** : Xcode Cloud vers l'App Store · App Bundle signé en local
- **Site** : `https://erea.toakeur.com/`, GitHub Pages derrière Cloudflare, en ligne (vérifié le 14 nov.)
- **IA et outils** : aucune IA dans l'app ; AdMob, Game Center, StoreKit

## Parcours

- 🍎 **iOS** : 🐙 GitHub — main (dépôt public), 1.0.8, CI au vert [ok] → ☁️ Xcode Cloud — build 229 réussi le 13 novembre [ok] → 🛍️ App Store Connect — 1.0.7 (build 210) approuvée le 31 octobre [ok] → 📱 App Store — 1.0.7 en ligne depuis le 31 octobre [ok]
- 🤖 **Android** : 🐙 GitHub — main (dépôt public), 1.0.8, CI au vert [ok] → 🔑 Keystore Android — App Bundle signé sur le Mac [ok] → 🎮 Google Play Console — production accordée le 17 octobre, 1.0.7 envoyée le 30 octobre [ok] → 🛒 Google Play — 1.0.7 en ligne (vérifié le 14 novembre) [ok]
- 🌐 **Web** : 🐙 GitHub — racine de main, dépôt public [ok] → 📄 Hébergement web (GitHub Pages) — redéployé à chaque poussée sur main [ok] → 🏷️ Nom de domaine — erea.toakeur.com via Cloudflare [ok] → 🌐 Site — en ligne, confidentialité et app-ads.txt compris [ok]
- 🎬 **Contenu** : 🎬 Studio — 48 pubs vidéo au Planning [ok] → 🗓️ Planning — 2 programmées les 14 et 15 nov. [ok] → 📣 Réseaux sociaux & influenceurs — TikTok erea.jeu, 45 publiées du 29 oct. au 13 nov. [ok]

## Vue d'ensemble

- **Plateforme** : iOS 15+ (1.0.7 en ligne sur l'App Store depuis le 31 octobre 2026) · Android : 1.0.7 en ligne sur Google Play (vérifié le 14 novembre 2026 ; première version en ligne : 1.0.4, le 20 octobre) · site vitrine `erea.toakeur.com`, en ligne (vérifié le 14 novembre 2026) ; hors ligne le 4 novembre au matin, quand le dépôt était passé en privé, remis en ligne le même jour à 15 h 09
- **Stack** : Flutter (Dart ≥ 3.6), version `1.0.8+9` dans le code, 185 tests, aucun serveur applicatif
- **Backend** : aucun — tout l'état du joueur vit sur l'appareil (`shared_preferences`)
- **Distribution** : App Store via Xcode Cloud · Play Store via App Bundle signé localement
- **Monétisation** : interstitielle AdMob + achat unique 3,99 € qui la retire, en ligne depuis la 1.0.2 ; diffusion d'annonces limitée tant que les applis AdMob ne sont pas associées aux boutiques (vérifié le 13 novembre 2026)
- **Particularités** : jeu entièrement hors ligne, aucune clé d'API dans le dépôt, un seul e-mail public (`erea@toakeur.com`)

Les deux seuls tiers embarqués sont Google (publicité) et les boutiques
(achat, classements, demande de note). Pas de base de données, pas
d'analytics propre, pas de crash reporting : seul le SDK AdMob collecte,
et sa déclaration Play couvre publicité, analyse et prévention des
fraudes. Le site vit sur un sous-domaine de
`toakeur.com`, le domaine commun des apps. Conséquence directe : la
fiche « Confidentialité » de l'App Store déclare, **depuis la 1.0.2**,
les collectes du SDK de Google — le badge « Aucune donnée collectée »
appartenait à la 1.0.0.

---

### 1. GitHub

| | |
|---|---|
| Rôle | Hébergement du code, dépôt `teiki5320/erea`, public (vérifié le 14 novembre 2026 ; passé en privé puis redevenu public le 4 novembre) |
| Console | <https://github.com/teiki5320/erea> |
| Compte propriétaire | `teiki5320` (connexion par le compte de gestion `admin@toakeur.com`) |
| Coût | gratuit |

**Intégration continue (depuis le 10 novembre 2026)** : un workflow
GitHub Actions (`.github/workflows/ci.yml`) lance `flutter pub get`,
`flutter analyze` et `flutter test` (Flutter 3.47.3) à chaque poussée sur
`main` et sur chaque demande de fusion ; dernier passage réussi le
13 novembre 2026. Dependabot (`.github/dependabot.yml`) propose chaque
semaine les mises à jour des paquets Dart et des actions GitHub : sept
demandes de fusion ouvertes le 10 novembre 2026, pas encore fusionnées
(vérifié le 14 novembre 2026).

**Où vivent les secrets :** nulle part. Le workflow n'utilise aucun
secret de CI. L'accès en écriture passe par le compte GitHub lui-même.

**Reprise :** être collaborateur du dépôt, ou propriétaire du compte
`teiki5320`.

---

### 2. Hébergement web (GitHub Pages)

| | |
|---|---|
| Rôle | Sert la vitrine, le prototype web jouable et les deux pages exigées par les boutiques |
| Console | <https://github.com/teiki5320/erea> → Settings → Pages ; Cloudflare pour l'adresse publique |
| Coût | gratuit |

**Identifiants publics :**
- URL publique : `https://erea.toakeur.com/` — la vitrine de l'app, depuis le 7 octobre 2026 ; en ligne (vérifié le 14 novembre 2026) : `/`, `/app-ads.txt`, `/confidentialite.html`, `/support.html`, `/jeu.html` et `/telecharger/` répondent 200. Le 4 novembre au matin, le dépôt passé en privé n'était plus servi par GitHub Pages (offre gratuite) et tout répondait 404 ; redevenu public, il a été redéployé le même jour à 15 h 09.
- Le jeu web jouable est sur `/jeu.html`, copie déployée de `index-v8.html`.
- `/support.html` et `/confidentialite.html` : les deux URL exigées par l'App Store, contact `erea@toakeur.com`.
- Site servi depuis la racine de `main` (fichier `.nojekyll` présent), redéployé à chaque poussée ; dernier déploiement réussi le 13 novembre 2026 à 6 h 42 (celui des fiches du 13 novembre) ; celui de la mesure d'audience date du 5 novembre à 10 h 06.
- L'adresse `erea.toakeur.com` passe par Cloudflare, qui relaie GitHub Pages ; le dépôt ne contient pas de fichier `CNAME` (un `CNAME` ajouté le 4 novembre a été retiré le même jour). L'ancienne adresse `teiki5320.github.io/erea/` répond aussi (vérifié le 14 novembre 2026).
- **Mesure d'audience du site (depuis le 5 novembre 2026)** : Umami Cloud, offre gratuite, région UE, sans cookie ; un seul identifiant de site public partagé par les sites de la maison (`d1715415-5452-48af-a9fa-69e3e2de06f3`), balise dans le `<head>` de `index.html`, `jeu.html`, `support.html`, `confidentialite.html` et `telecharger/index.html`, limitée à `erea.toakeur.com`. Clics comptés : « Télécharger l'appli » (avec le magasin : App Store ou Google Play). Console : https://cloud.umami.is. L'application, elle, n'a toujours aucune mesure d'audience. Sur `telecharger/`, un iPhone ou un Android est renvoyé tout de suite vers sa boutique, avant que la visite soit comptée.

**Où vivent les secrets :** nulle part.

---

### 3. Nom de domaine

| | |
|---|---|
| Rôle | Le sous-domaine `erea.toakeur.com` et l'adresse de contact `erea@toakeur.com` |
| Console | Cloudflare, compte de gestion `admin@toakeur.com` (DNS de `toakeur.com`) |
| Coût | celui du domaine commun `toakeur.com`, partagé entre les apps |

Le domaine n'appartient pas à Erea seule : il porte aussi la vitrine
TOA KEUR et les autres apps. La manière exacte dont Cloudflare relaie
GitHub Pages (règle ou redirection) est à vérifier dans la console.

**Où vivent les secrets :** aucun dans le dépôt.

---

### 4. Apple Developer Program

| | |
|---|---|
| Rôle | Identité, signature de l'app iOS, App ID et capacités |
| Console | <https://developer.apple.com/account> (Certificates, Identifiers & Profiles) |
| Compte propriétaire | Adhésion Apple Developer en organisation, au nom d'ALOHASH depuis le 9 novembre 2026 (individuelle avant), team `K597U7X3FZ` |
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

### 5. App Store Connect

| | |
|---|---|
| Rôle | Fiche App Store, envoi des versions, TestFlight, achats intégrés, configuration Game Center et Xcode Cloud |
| Console | <https://appstoreconnect.apple.com> |
| Compte propriétaire | Même compte que le §4 |
| Coût | inclus dans l'adhésion |

**Identifiants publics :**
- App « Erea », bundle `com.teiki.erea` ; nom « Erea : Quiz d'histoire & frise » à partir de la 1.0.4.
- Version `1.0.8+9` dans `erea_flutter/pubspec.yaml` depuis le 1er novembre 2026, montée parce que la 1.0.7 approuvée n'accepte plus de build (avant elle, `1.0.7+8` à partir du 30 octobre, et `1.0.6+7` à partir du 21 octobre, quand la 1.0.5 approuvée a fermé son numéro au build 196). La 1.0.7 (build 210) est en ligne sur l'App Store depuis le 31 octobre 2026 et sur Google Play (vérifié le 14 novembre 2026).
- iOS minimum : 15.0 (`IPHONEOS_DEPLOYMENT_TARGET`, `Podfile`).
- Chiffrement : `ITSAppUsesNonExemptEncryption = false` dans `ios/Runner/Info.plist` — pas de formulaire d'export à chaque build.

**Accord « Applications payantes » :** actif depuis le 18 août 2026
pour le compte individuel (banque : compte personnel ; fiscal : W-8BEN,
convention France–USA art. 12 à 0 %) ; accepté de nouveau au nom de
l'organisation le 9 novembre 2026, après le passage du compte en
organisation (ALOHASH) ; banque et fiscalité de la nouvelle entité : terminées
dans App Store Connect → Business (confirmé par Jean le 10 novembre 2026). L'achat intégré lui-même est décrit plus bas, section
« StoreKit / Play Billing ».

**État des versions :** la `1.0.0` (build 90) est sortie le 3 septembre
2026 après un refus *Guideline 2.1 — Information Needed* et une
re-soumission (détail dans `docs/APP_REVIEW.md`). La **`1.0.2` (build
150) est sortie le 8 septembre 2026**, avec la publicité et
l'achat intégré. Le build 161 (`1.0.3`) est resté sur TestFlight sans
être soumis. La `1.0.4` (build 182), soumise le 15 octobre 2026, a été
mise en ligne le même jour à 14 h 01 (publication automatique) ; les
builds 176 et 180 avaient été refusés à l'import (ITMS-91064, manifeste
de confidentialité). La `1.0.5` (build 195), soumise le 21 octobre
2026 à 15 h 11, a été mise en ligne le même jour à 17 h 44. Aucune
1.0.6 n'est soumise sur l'App Store : elle ne changeait rien sur iPhone.
La **`1.0.7`** (rappel du soir, pause du Chrono, consentement, doublon retiré,
révélation sur iPhone SE en très grande police, Album, icônes dessinées,
Facile par défaut) a été soumise le 30 octobre 2026 au soir avec le
build 210 ; l'examen automatique l'a arrêtée le 31 octobre à 9 h 02
(case « Publicité » de la classification par âge non cochée), elle a été
renvoyée à 11 h 03, approuvée à 15 h 04 et **est en ligne depuis le
31 octobre 2026 à 15 h 05** (publication automatique). Envoyée le même soir
sur Google Play, elle y est en ligne (vérifié le 14 novembre 2026).

**Où vivent les secrets :** aucun côté dépôt. L'authentification est
celle du compte Apple (+ double facteur).

---

### 6. Xcode Cloud

| | |
|---|---|
| Rôle | Compile, signe et livre l'app iOS à partir du dépôt GitHub |
| Console | App Store Connect → Erea → Xcode Cloud |
| Compte propriétaire | Même compte que le §5 ; l'accès au dépôt passe par l'app GitHub « Xcode Cloud » |
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

### 7. Game Center / Play Games

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

**Play Games — pas configuré.** La table `_playGames` de
`lib/core/classement.dart` est vide et la méta-donnée
`com.google.android.gms.games.APP_ID` reste commentée dans
`AndroidManifest.xml` : la décommenter sans identifiant valide ferait
planter l'app. Depuis la 1.0.4 (code du 30 septembre 2026), Android
masque tout ce qui mène au classement plutôt que d'afficher un bouton
qui ne fait rien.

**Où vivent les secrets :** nulle part. Game Center n'utilise ni clé
d'API ni jeton.

---

### 8. StoreKit / Play Billing (achats intégrés)

| | |
|---|---|
| Rôle | L'achat unique « Erea sans publicité », qui retire la publicité |
| Console | App Store Connect → Erea → Achats intégrés · Play Console → Monétiser → Produits intégrés |
| Code | Plugin `in_app_purchase`, logique dans `erea_flutter/lib/core/achat.dart` |
| Coût | commission des boutiques sur chaque vente |

- Identifiant produit **identique sur les deux boutiques** :
  `com.teiki.erea.sanspub`, non consommable, 3,99 €. Écrit dans
  `lib/core/achat.dart` et verrouillé par un test.
- App Store : identifiant Apple `6802621891`, créé le 18 août 2026,
  **approuvé le 8 septembre** avec la 1.0.2.
- Google Play : option d'achat `sans-pub`, **active depuis le
  8 septembre 2026** ; prix ressaisi sur la ligne France le 16 septembre
  pour afficher 3,99 € TTC.
- Pas de serveur de validation des reçus : la boutique fait foi, l'état
  est gardé sur l'appareil. Depuis la 1.0.4, les achats sont restaurés
  au lancement chez un non-acheteur.

**Où vivent les secrets :** aucun. Les identifiants de produit sont
publics.

---

### 9. Google AdMob

| | |
|---|---|
| Rôle | Sert l'interstitielle de fin de partie (une partie sur deux, jamais dans le Défi du jour), depuis la 1.0.2 |
| Console | <https://apps.admob.com> |
| Compte propriétaire | Compte Google de gestion (`admin@toakeur.com`), éditeur `pub-2680784147246798` |
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

**app-ads.txt** — publié le 30 octobre 2026 à la racine du dépôt, et
servi sur `https://erea.toakeur.com/app-ads.txt` (l'URL marketing de la
fiche App Store), de nouveau en ligne (vérifié le 14 novembre 2026). Une ligne : l'éditeur `pub-2680784147246798` en
`DIRECT`. Avant le 30 octobre, l'adresse répondait 404, et de nouveau le
4 novembre au matin, le temps que le dépôt redevienne public. Dans AdMob, les deux applis AdMob (Erea iOS et Erea Android) sont en « Examen requis », avec une diffusion d'annonces limitée, parce qu'elles ne sont pas encore associées à leur fiche App Store et Google Play ; tant que ce n'est pas fait, AdMob ne peut pas valider `app-ads.txt` (vérifié le 13 novembre 2026).

**Consentement RGPD — message publié le 3 septembre 2026.** Jusqu'à
cette date la console était vide, et le journal Android le disait sans
détour : `Publisher misconfiguration: no form(s) configured for the
input app ID`. Aucune annonce n'aurait été servie en Europe. Le message
« Erea — consentement RGPD » couvre les deux applications, s'affiche en
français (anglais en secours), offre les trois boutons *Refuser*,
*Autoriser* et *Gérer les options*, et renvoie à
`https://erea.toakeur.com/confidentialite.html` (en ligne, vérifié le
14 novembre 2026). Côté code,
`lib/core/pub.dart` appelle le SDK UMP au démarrage et expose « Options
de confidentialité » ; depuis la 1.0.4, la préparation de la régie attend
vraiment la fermeture du formulaire. Formulaire vérifié sur le Pixel le
16 septembre 2026.

**Message IDFA** : créé dans la même page de la console en septembre
2026. `NSUserTrackingUsageDescription` est dans `ios/Runner/Info.plist`
et le même `loadAndShowConsentFormIfRequired` présente le message puis
la fenêtre d'Apple.

**SKAdNetwork** : les cinquante identifiants publiés par Google sont
dans `Info.plist` depuis septembre 2026. Depuis la 1.0.4,
`PrivacyInfo.xcprivacy` déclare les six types de données de la fiche
Confidentialité. `NSPrivacyTracking` y reste à faux, sans clé de
domaines : c'est la seule combinaison acceptée à l'import (build 182) ;
le suivi reste déclaré dans la fiche Confidentialité.

**Paiements (dernier état connu, au 18 août 2026 ; non revérifié le 30 octobre 2026, à vérifier dans la console)** : seuil de versement 70 €, mensuel
vers le 21. L'IBAN ne peut pas encore être saisi — Google n'ouvre
« Gérer les modes de paiement » qu'après un premier seuil de recettes
(environ 10 €). Suivront le courrier postal avec code PIN, à saisir sous
quatre mois sous peine de gel des versements, et la vérification
d'identité. ⚠️ Vérifier alors que le nom du profil de paiement est bien
l'identité civile du titulaire du compte bancaire, et non le pseudonyme.

**Où vivent les secrets :** aucun dans le dépôt. L'accès à la console
passe par le compte Google (+ double facteur).

---

### 10. Google Play Console

| | |
|---|---|
| Rôle | Distribution Android — 1.0.7 en ligne (vérifié le 14 novembre 2026 ; première mise en production le 20 octobre) |
| Console | <https://play.google.com/console> |
| Compte propriétaire | Compte développeur **personnel**, créé le 20 août 2026, sur le compte Google de gestion |
| Coût | 25 $ une seule fois |

**État réel :**
- Application ID `com.teiki.erea`, identique à iOS (`android/app/build.gradle.kts`).
- Test fermé « Alpha » : release `4 (1.0.3)` servie aux testeurs à partir du 16 septembre 2026, puis release `5 (1.0.4)` envoyée le 14 octobre. Les **douze testeurs pendant quatorze jours** exigés d'un compte personnel ont été tenus du 8 au 22 septembre (voir « Testeurs » plus bas).
- **Accès à la production demandé le 14 octobre 2026 à 18 h 39, accordé le 17 octobre** ; la release de production `5 (1.0.4)`, promue depuis la piste Alpha et envoyée le 17 octobre vers 8 h 25, a été mise en ligne le 20 octobre 2026 à 16 h 07 ; la `6 (1.0.5)` l'a remplacée le 21 octobre, la `7 (1.0.6)` le 22 octobre 2026, et la **`8 (1.0.7)`, envoyée le 30 octobre 2026, est en ligne (vérifié le 14 novembre 2026)**. La fiche publique `play.google.com/store/apps/details?id=com.teiki.erea` répond (vérifié le 14 novembre 2026).
- **Statut de professionnel (DSA)** : Google a écrit le 4 novembre 2026 qu'il faut le déclarer dans la Play Console (Gérer le compte → Détails du compte) **d'ici le 1er février 2027**, faute de quoi plus aucune mise à jour ne passe et les applis sont retirées ; le statut de professionnel n'est pas encore déclaré : l'accueil de la Play Console affiche « Déclarez votre statut de professionnel d'ici février 2027 » avec « Action requise » (vérifié le 13 novembre 2026). Erea y est en « Production », mise à jour du 30 octobre 2026.
- Achat intégré actif (voir « StoreKit / Play Billing »). Classements Play Games non configurés (voir « Game Center / Play Games »).
- Appareil physique de vérification : un Pixel 8a, utilisé pour les tests du 16 septembre.

**Testeurs** : le service payant Testers Community (plan Starter,
15 testeurs, 14 € une fois, souscrit le 8 septembre 2026, groupe Google
`testers-community@googlegroups.com` ajouté au test fermé) a fourni les
douze testeurs. Test tenu du 8 au 22 septembre 2026 ; plus rien n'en
dépend. Le rapport du 15 septembre est dans `docs/erea_feedback.pdf`.

La marche à suivre complète est dans `docs/FICHE_PLAY_STORE.md`.

**Où vivent les secrets :** aucun dans le dépôt. La clé de signature est
décrite dans la section suivante.

---

### 11. Keystore Android (signature)

| | |
|---|---|
| Rôle | Signe chaque App Bundle envoyé à Google Play |
| Où | `erea_flutter/android/erea-upload.jks` + `erea_flutter/android/key.properties`, ignorés par git |
| Certificat | `CN=Toa`, valable jusqu'en 2053, créé le 14 août 2026 |
| Sauvegarde | copie de secours dans iCloud Drive → `Sauvegardes/erea-keystore/` (29 septembre 2026) |

`.gitignore` couvre `android/key.properties`, `*.jks` et `*.keystore`.
⚠️ Si `key.properties` manque, `flutter build appbundle` s'arrête sur
une erreur explicite (`android/app/build.gradle.kts`) plutôt que de
signer en debug un bundle que Google refuserait. Perdre la clé interdit
toute mise à jour de l'app.

**Où vivent les secrets :** le keystore et son mot de passe, hors dépôt
uniquement.

---

### 12. Avis in-app (StoreKit Review / In-App Review)

| | |
|---|---|
| Rôle | Demande de note native, au bon moment |
| Code | Plugin `in_app_review`, logique dans `erea_flutter/lib/core/avis.dart` |
| Console | aucune — les avis se lisent dans App Store Connect et la Play Console |
| Coût | gratuit |

Proposée après un PERFECT, un record ou trois défis d'affilée, une seule
fois, jamais au lancement ; le système décide de l'affichage. Le même
fichier fournit le lien de boutique ajouté aux grilles partagées : App
Store sur iOS, Play Store sur Android depuis la 1.0.4. Au 14 novembre
2026, l'App Store compte 0 note.

**Où vivent les secrets :** aucun.

---

### 13. Google Fonts

| | |
|---|---|
| Rôle | Sert les polices Baloo 2 et Nunito à tout le site, via CDN |
| Console | aucune — service public sans compte |
| Coût | gratuit |

Toutes les pages publiées l'appellent : la vitrine (`index.html`), le
jeu web (`jeu.html`), `support.html` et `confidentialite.html` — pas
seulement le prototype. L'app Flutter n'en dépend pas : les mêmes
polices sont embarquées dans `erea_flutter/assets/fonts/`, licence
SIL OFL incluse, justement pour que l'app fonctionne hors ligne.

---

### 14. TikTok For Business (Ads Manager)

| | |
|---|---|
| Rôle | Régie publicitaire de TikTok ; le compte pub existe mais ne sert pas |
| Console | <https://ads.tiktok.com> |
| Compte | identité annonceur créée le 22 octobre 2026 sur `admin@toakeur.com`, compte pub `ALOHASH_adv` (`aadvid=7699469128796635142`), relié à TikTok « erea.jeu » |
| Coût | aucun : aucun moyen de paiement saisi, aucune campagne |

Le mode guidé ne propose que des campagnes « Trafic » de 245 à 385 € par
semaine. Jean a préféré booster les vidéos par « Promouvoir », dans
l'application TikTok, avec quelques dizaines d'euros. Le lien de
téléchargement à suivre par TikTok est
`https://erea.toakeur.com/telecharger/?src=tiktok` (en ligne, vérifié le 14 novembre 2026). Sur un compte
personnel, TikTok n'affiche pas de lien dans la bio, et le compte
Entreprise passe désormais par une vérification de l'entreprise, qui
publie l'adresse sur le profil : ce choix reste à faire (chez Apple, le
statut de commerçant DSA est réglé depuis le 9 novembre 2026, au nom
d'ALOHASH). Les vidéos elles-mêmes sont publiées sans régie, par le
Planning du Studio via Buffer : quarante-cinq l'ont été en public
sur « erea.jeu » du 29 octobre au 13 novembre 2026 ; l'envoi du 10 novembre à 18 h 02 (« Ludger Sylbaris, sauvé par son cachot ») a échoué, coupé par un redémarrage du Studio, et deux autres sont programmées au Planning les 14 et 15 novembre (vérifié le 14 novembre 2026).

**Où vivent les secrets :** aucun ; la connexion se fait par un code
envoyé à `admin@toakeur.com`.

---

## Récapitulatif : où vit chaque secret

| Secret | Où il vit | Dans le dépôt ? |
|---|---|---|
| Certificats et profils de signature iOS | Gérés automatiquement par Apple (signature dans le cloud) | Non |
| Mot de passe Apple Developer / App Store Connect | Compte Apple Developer (adhésion ALOHASH depuis le 9 novembre 2026, + 2FA) | Non |
| Accès en écriture au dépôt | Compte GitHub `teiki5320` | Non |
| Keystore de signature Android | `erea_flutter/android/erea-upload.jks` + `android/key.properties`, ignorés par git ; **copie de secours dans iCloud Drive → `Sauvegardes/erea-keystore/`** (29 septembre 2026) | Non |
| Mot de passe du keystore | `android/key.properties`, hors dépôt | Non |
| Accès Google Play Console / AdMob | Compte Google de gestion (+ 2FA) | Non |
| Accès TikTok For Business | Code de connexion envoyé à `admin@toakeur.com` | Non |
| Coordonnées bancaires | Saisies chez Apple ; chez Google après les premières recettes | Non |
| Clés d'API tierces | **Il n'y en a aucune** — les identifiants AdMob sont publics par design | — |

Le dépôt peut être public sans risque : il ne contient aucun secret.

## Valeurs publiques par design

- `com.teiki.erea` — identifiant de l'app, visible dans toute app publiée
- `K597U7X3FZ` — Team ID Apple, visible dans toute app signée
- `erea.daily`, `erea.streak`, `erea.classic.*`, `erea.chrono` — ID de classements
- `ca-app-pub-2680784147246798…` — les quatre identifiants AdMob
- `com.teiki.erea.sanspub` — ID du produit « Erea sans publicité »
- `https://erea.toakeur.com/` — URL publique de la vitrine et du prototype web
- `erea@toakeur.com` — contact de support et contact public DSA

## Checklist « reprise du projet sur une machine neuve »

**Jouer et développer, sur n'importe quel système :**
1. `git clone https://github.com/teiki5320/erea.git`
2. Installer Flutter 3.47.3, la version figée sur Xcode Cloud (`ios/ci_scripts/ci_post_clone.sh`) — <https://docs.flutter.dev/get-started>
3. `cd erea/erea_flutter && flutter pub get`
4. `flutter analyze && flutter test` — 185 tests, la suite doit être verte
5. `flutter run`

**Construire pour iOS, sur Mac uniquement :**
6. Xcode installé, session ouverte avec un compte de la team `K597U7X3FZ`
7. `flutter build ipa --release`, ou laisser Xcode Cloud construire depuis `main`

**Construire pour Android :**
8. Restaurer `erea-upload.jks` et `key.properties` depuis iCloud Drive
   (`Sauvegardes/erea-keystore/`) dans `erea_flutter/android/`, en
   vérifiant les chemins qu'il contient
9. `flutter build appbundle --release`, puis vérifier le certificat (voir
   `docs/FICHE_PLAY_STORE.md` §1)

**Administrer :**
10. Compte Apple Developer (team `K597U7X3FZ`) : signature et App ID
11. App Store Connect : fiche, TestFlight, Game Center, Xcode Cloud
12. Google Play Console et AdMob : compte Google de gestion
13. Dépôt GitHub `teiki5320/erea` : code et site web
14. Cloudflare (compte de gestion) : l'adresse `erea.toakeur.com`

**Rien d'autre.** Pas de fichier d'environnement à recréer, pas de base à
restaurer, pas de clé à demander à qui que ce soit — à la seule exception
du keystore Android, qui n'existe qu'en sauvegarde.
