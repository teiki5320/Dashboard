# INFRA — fiche technique

Mis à jour le 30 octobre 2026 d'après le dépôt et le site en ligne. Pour mettre à jour : relancer ce même prompt.

> Aucun secret, clé ni jeton dans ce fichier — uniquement des références
> (nom de variable, endroit où le secret vit, lien vers la console).

## En bref

- **Plateforme** : iOS + Android (Flutter), iPhone et iPad, portrait
- **Stack** : Flutter/Dart Material 3, local-first, hors ligne
- **Backend** : **aucun** — l'app ne contacte plus aucun serveur
- **Distribution** : Xcode Cloud + App Bundle signé — jamais soumise
- **Site** : kultiva.toakeur.com sur GitHub Pages
- **IA et outils** : météo Open-Meteo, Sentry, aucune IA

## Parcours

- 🍎 **iOS** : 🐙 GitHub — main · CI au vert [ok] → ☁️ Xcode Cloud — builds 95 à 97 réussis, envoyés à ASC [ok] → 🛍️ App Store Connect — fiche créée, à compléter [à faire] → 📱 App Store — pas publiée [pas encore]
- 🤖 **Android** : 🐙 GitHub — CI construit l'App Bundle [ok] → 🔑 Keystore Android — clé locale, valable 2053 [ok] → 🛍️ Google Play Console — fiche à créer [à faire] → 📱 Google Play — pas publiée [pas encore]
- 🗄️ **Comptes** : 📱 App — aucun compte, tout en local [ok] → 🗄️ Backend — aucun [aucun] → 🔐 Connexion utilisateurs — retirée le 30/10 [aucun]
- 🌐 **Web** : 🐙 GitHub — dossier landing/ [ok] → 📄 GitHub Pages — publié par site.yml [ok] → 🌐 Nom de domaine — kultiva.toakeur.com, HTTPS [ok] → ⬇️ Boutons « Télécharger » — encore sans lien [pas encore]

## Vue d'ensemble

- **État du projet** : en pause (choix de Jean) — rien n'est soumis aux boutiques.
- **Plateforme** : iOS + Android (Flutter ≥ 3.38), portrait, iPhone + iPad — app `com.toa.kultiva`, v1.0.0+5
- **Stack** : Flutter/Dart Material 3, local-first (SharedPreferences + services singletons, `ValueNotifier`, sans framework d'état)
- **Backend** : **aucun depuis le 30 octobre 2026.** Les comptes ont été retirés de la v1 : le jardin, les photos, les badges et la créature vivent uniquement sur l'appareil. Les deux seuls appels sortants sont Open-Meteo (météo) et Sentry (plantages).
- **Distribution** : App Store via Xcode Cloud + Play Store (AAB signé) — jamais soumise (un script local `update-testflight.command` construit aussi l'IPA à envoyer par Transporter), textes des fiches prêts (`docs/store-listings.md`)
- **Site** : <https://kultiva.toakeur.com> (présentation + confidentialité), en ligne depuis le 7 octobre 2026
- **Marchés** : bi-marché France + 8 pays francophones d'Afrique de l'Ouest, détection du pays et de la sous-zone climatique
- **Particularités** : météo Open-Meteo sans clé d'API, notifications locales uniquement, tutos et contenu 100 % hors ligne
- **Monétisation** : aucune. Les liens Amazon du catalogue ont été retirés le 20 octobre 2026 ; le bouton « Acheter » reste dans le code (`amazonUrl`) mais ne s'affiche plus, faute de lien. La mention « Partenaire Amazon » a été ôtée de `landing/index.html` le 21 octobre 2026.

## Services externes

### 1. GitHub

- **Rôle** : dépôt du code + CI GitHub Actions — `ci.yml` (analyze + tests + builds Android AAB/APK) et `site.yml` (publication du dossier `landing/`, voir plus bas). Le workflow `sync-catalog.yml`, qui exportait le catalogue vers Kultivaprix, a été supprimé le 30 octobre 2026 : les deux projets n'ont plus de lien.
- **Console** : <https://github.com/teiki5320/Kultiva> (branche par défaut : `main`)
- **Identifiants publics** : —
- **Secrets** : aucun secret de CI n'est plus nécessaire. `KULTIVA_SEED_SECRET` ne sert plus depuis le retrait de la sync Kultivaprix (30 octobre 2026) et peut être supprimé dans repo → Settings → Secrets → Actions.
- **Coût** : gratuit.

### 2. Supabase — plus utilisé

- **Rôle** : **aucun depuis le 30 octobre 2026.** Le projet portait l'authentification, la synchronisation et la suppression de compte in-app ; tout cela a été retiré de la v1 avec les comptes. Plus aucune ligne de Dart ne le contacte.
- **Pourquoi** : le plan était **gratuit**, et Supabase met en pause tout projet gratuit après une semaine d'inactivité. Une app non publiée n'a pas de trafic : le projet se rendormait chaque semaine, et le rallumer n'y changeait rien. Payer 25 $/mois pour zéro utilisateur n'avait pas de sens.
- **État** : ⏸️ **en pause, pas supprimé.** `vkiwkeknfzwdvufcqbrp`, région `eu-west-1`. Données et migrations conservées un an par Supabase — **ne pas supprimer le projet**, mais il ne bloque plus rien.
- **Console** : <https://supabase.com/dashboard/project/vkiwkeknfzwdvufcqbrp>
- **À nettoyer à la main, sans urgence** : la table `species` (ne servait qu'à Kultivaprix) et le secret GitHub `KULTIVA_SEED_SECRET`.
- **Si la synchro revient** : ne pas reprendre Supabase. La piste retenue est **Cloudflare** — un Worker + D1 (données) + R2 (photos), gratuit, qui ne s'endort jamais, avec juridiction EU disponible. En gardant Google + Apple **seulement**, le Worker se contente de vérifier le jeton d'identité : aucun mot de passe à hacher ni à stocker.
- **Coût** : 0 €.

### 3. Connexion utilisateurs — retirée

- **Rôle** : **aucun depuis le 30 octobre 2026.** L'app n'a plus d'écran de connexion. Supprimés : `lib/screens/auth/`, `auth_service.dart`, `cloud_sync_service.dart`, `supabase_config.dart`, les dépendances `supabase_flutter`, `google_sign_in`, `sign_in_with_apple` et `crypto` (−36 paquets, −70 lignes de `Podfile.lock`), l'entitlement Apple Sign-In et le schéma d'URL Google de `Info.plist`.
- **Effet sur la soumission** : plus d'obligation Apple de suppression de compte in-app, questionnaire de confidentialité réduit à deux types (localisation, plantages), guideline 4.8 sans objet, et plus de clés Google « Se connecter » à recréer.
- **Contrepartie assumée** : changer de téléphone fait perdre le jardin. Un export/import de fichier reste à écrire.
- **Coût** : 0 €.

### 4. API tierce (météo Open-Meteo)

- **Rôle** : météo 7 jours (`lib/services/weather_service.dart`), alertes arrosage/canicule. Fallback si géolocalisation refusée : Paris ou la capitale du pays sélectionné.
- **Console** : aucune — pas de compte.
- **Identifiants publics** : aucun, API sans clé.
- **Secrets** : aucun.
- **Coût** : gratuit.

### 5. Apple Developer Program

- **Rôle** : compte développeur (compte Apple Developer de Jean) — Sign in with Apple, certificats et profils de signature gérés par Xcode Cloud (rien dans le dépôt).
- **Console** : <https://developer.apple.com>
- **Identifiants publics** : team `K597U7X3FZ`.
- **Secrets** : identifiants du compte Apple → gestionnaire de mots de passe.
- **Coût** : adhésion annuelle.

### 6. App Store Connect

- **Rôle** : fiche App Store, TestFlight, soumission à la review. Textes prêts à coller dans `docs/FICHE_APP_STORE.md` et `docs/store-listings.md`.
- **Console** : <https://appstoreconnect.apple.com>
- **État** : la fiche existe (App Apple ID `6762550020`) et reçoit les builds de Xcode Cloud (95, 96 et 97, vérifié le 28 octobre 2026 dans les mails d'Apple) ; aucune soumission à la review.
- **Identifiants publics** : bundle `com.toa.kultiva`, App Apple ID `6762550020`, version 1.0.0 (build 5 dans `pubspec.yaml`, numéros de build Xcode Cloud à part). Conformité chiffrement déclarée dans l'`Info.plist` (`ITSAppUsesNonExemptEncryption = false`).
- **Secrets** : — (accès via le compte Apple Developer).
- **Coût** : inclus dans l'adhésion Apple Developer.

### 7. Xcode Cloud

- **Rôle** : CI iOS — build automatique via `ios/ci_scripts/ci_post_clone.sh` (Flutter épinglé 3.41.6, SPM désactivé, `--config-only` avant `pod install`). Cible minimale iOS 15.0 pour l'appli et tous les pods (`ios/Podfile`) depuis le 25 octobre 2026 ; avant : 13.0.
- **État** : les builds 95 et 96 ont réussi le 25 octobre 2026 et le build 97 le 27 octobre 2026, chacun avec l'étape « TestFlight internes - iOS » (vérifié le 28 octobre 2026). À chaque envoi, Apple signale l'avertissement ITMS-90683 : la clé `NSLocationAlwaysAndWhenInUseUsageDescription` manque dans `ios/Runner/Info.plist` (envoi accepté quand même). Le build 94 avait échoué le 24 octobre 2026 (Sentry et d'autres pods visaient une version d'iOS trop basse), corrigé le 25 octobre.
- **Console** : App Store Connect → onglet Xcode Cloud.
- **Identifiants publics** : —
- **Secrets** : aucun secret dans le dépôt (signature gérée par Apple).
- **Coût** : inclus (25 h de build/mois gratuites).

### 8. Google Play Console

- **Rôle** : publication Android — AAB signé (Gradle 8.14, Java 17, min SDK 24, target SDK 36, desugaring activé).
- **Console** : <https://play.google.com/console>
- **Identifiants publics** : applicationId `com.toa.kultiva`.
- **Secrets** : voir « Keystore Android » ci-dessous.
- **Coût** : frais d'inscription unique.

### 9. Keystore Android (signature)

- **Rôle** : signe les builds release Android. `android/app/build.gradle.kts` lit `android/key.properties` (`storeFile`, `storePassword`, `keyAlias`, `keyPassword`) ; sans ce fichier, le build release n'est pas signé avec la clé de publication. Certificat valable jusqu'en 2053.
- **Console** : aucune — fichiers locaux.
- **Identifiants publics** : —
- **Secrets** : `android/key.properties` et le fichier `.jks`, tous deux ignorés par git. ⚠️ Les sauvegarder hors du dépôt : leur perte rend toute mise à jour sur Play impossible (sauf signature d'application par Play, à vérifier dans la console).
- **Coût** : gratuit.

### 10. Hébergement web (GitHub Pages / Cloudflare Pages)

- **Rôle** : site de présentation `landing/` (`index.html` + `privacy.html` + images WebP), publié sur **GitHub Pages** par le workflow `.github/workflows/site.yml` à chaque modification de `landing/`. Fournit l'URL d'assistance, l'URL marketing et l'URL de confidentialité exigées par les stores.
- **État** : en ligne — <https://kultiva.toakeur.com> et `/privacy.html` répondent (vérifié le 28 octobre 2026), via Cloudflare devant GitHub Pages. Les boutons « Télécharger » pointent encore vers `#` (app non publiée).
- **Console** : <https://github.com/teiki5320/Kultiva/settings/pages>
- **Identifiants publics** : adresse du site.
- **Secrets** : aucun (jeton GitHub automatique du workflow).
- **Coût** : gratuit.

### 11. Nom de domaine

- **Rôle** : sous-domaine `kultiva.toakeur.com` du domaine commun `toakeur.com`, DNS chez Cloudflare (proxy actif devant GitHub Pages). Adresse de contact publique `kultiva@toakeur.com` (site, confidentialité, fiches des stores).
- **Console** : <https://dash.cloudflare.com> (compte de gestion `admin@toakeur.com`) ; bureau d'enregistrement du domaine à vérifier dans la console.
- **Identifiants publics** : `kultiva.toakeur.com`, `kultiva@toakeur.com`.
- **Secrets** : identifiants du compte → gestionnaire de mots de passe.
- **Coût** : domaine partagé entre toutes les apps.

### 12. Sentry (suivi des crashs)

- **Rôle** : crash reporting (erreurs + stack traces), échantillonnage des traces à 0,05 pour économiser la data (`lib/main.dart`).
- **Console** : <https://sentry.io> — org `o4511455467864064` (région UE, `ingest.de`), projet `4511455478808656`.
- **Identifiants publics** : DSN commité dans `lib/main.dart` (public par design).
- **Secrets** : identifiants du compte → gestionnaire de mots de passe.
- **Coût** : plan gratuit (développeur).

### 13. Avis in-app (StoreKit Review / In-App Review)

- **Rôle** : demande de note sur les stores via `in_app_review` (`lib/services/review_service.dart`), déclenchée après des moments positifs.
- **Console** : aucune — les notes apparaissent dans App Store Connect et la Play Console.
- **Identifiants publics** : —
- **Secrets** : aucun.
- **Coût** : gratuit.

### 14. Géolocalisation native

- **Rôle** : position de l'appareil (`geolocator`) et nom de ville (`geocoding`) pour la météo, la région de culture et la configuration du jardin (`lib/services/geolocation_service.dart`, `weather_service.dart`, `garden_plan_config_sheet.dart`). Permission demandée en français (`NSLocationWhenInUseUsageDescription` dans `Info.plist` ; la clé `NSLocationAlwaysAndWhenInUseUsageDescription`, réclamée par Apple depuis le build 95, manque encore), repli sur Paris ou la capitale du pays si refusée.
- **Console** : aucune — services du système.
- **Identifiants publics** : —
- **Secrets** : aucun.
- **Coût** : gratuit.

## Notes

- Valeur **publique par design** (sa présence dans le code est normale) : le DSN Sentry (`lib/main.dart`). Depuis le 30 octobre 2026, il n'y a plus ni URL Supabase, ni `anonKey`, ni client ID Google dans le code ; et plus aucun tag Amazon depuis le 20 octobre.
- E-mail de support public : `kultiva@toakeur.com` (site, politique de confidentialité en ligne et dans l'app).
- Reprise sur machine neuve : cloner le dépôt, Flutter ≥ 3.38, `flutter pub get` puis `flutter run` — aucun secret requis côté client ; release Android = keystore + `key.properties` depuis le coffre-fort ; release iOS = accès au compte Apple.
