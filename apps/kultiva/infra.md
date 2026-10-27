# INFRA — fiche technique

Mis à jour le 25 octobre 2026 d'après le dépôt, la base Supabase et le site en ligne. Pour mettre à jour : relancer ce même prompt.

> Aucun secret, clé ni jeton dans ce fichier — uniquement des références
> (nom de variable, endroit où le secret vit, lien vers la console).

## En bref

- **Plateforme** : iOS + Android (Flutter), iPhone et iPad, portrait
- **Stack** : Flutter/Dart Material 3, local-first, hors ligne
- **Backend** : Supabase facultatif — en pause, connexion hors service
- **Distribution** : Xcode Cloud + App Bundle signé — jamais soumise
- **Site** : kultiva.toakeur.com sur GitHub Pages
- **IA et outils** : météo Open-Meteo, Sentry, aucune IA

## Parcours

- 🍎 **iOS** : 🐙 GitHub — main · CI au vert [ok] → ☁️ Xcode Cloud — builds 95 et 96 réussis le 25/10 [ok] → 🛍️ App Store Connect — fiche à remplir [à faire] → 📱 App Store — pas publiée [pas encore]
- 🤖 **Android** : 🐙 GitHub — CI construit l'App Bundle [ok] → 🔑 Keystore Android — clé locale, valable 2053 [ok] → 🛍️ Google Play Console — fiche à créer [à faire] → 📱 Google Play — pas publiée [pas encore]
- 🗄️ **Comptes** : 📱 App — mode invité sans compte [ok] → 🗄️ Supabase — projet en pause [bloquant] → 🔐 Connexion utilisateurs — clés Google à recréer [à faire]
- 🌐 **Web** : 🐙 GitHub — dossier landing/ [ok] → 📄 GitHub Pages — publié par site.yml [ok] → 🌐 Nom de domaine — kultiva.toakeur.com, HTTPS [ok] → ⬇️ Boutons « Télécharger » — encore sans lien [pas encore]

## Vue d'ensemble

- **Plateforme** : iOS + Android (Flutter ≥ 3.38), portrait, iPhone + iPad — app `com.toa.kultiva`, v1.0.0+5
- **Stack** : Flutter/Dart Material 3, local-first (SharedPreferences + services singletons, `ValueNotifier`, sans framework d'état)
- **Backend** : Supabase (auth, Postgres RLS, Storage, 2 edge functions) — facultatif, l'app fonctionne hors ligne. ⚠️ **Le projet est en pause** (état inactif, vérifié le 20 et le 27 octobre 2026) : tant qu'il n'est pas rallumé, ni connexion ni synchronisation ; le mode invité, lui, marche.
- **Distribution** : App Store via Xcode Cloud + Play Store (AAB signé) — jamais soumise (un script local `update-testflight.command` construit aussi l'IPA à envoyer par Transporter), textes des fiches prêts (`docs/store-listings.md`)
- **Site** : <https://kultiva.toakeur.com> (présentation + confidentialité), en ligne depuis le 7 octobre 2026
- **Marchés** : bi-marché France + 8 pays francophones d'Afrique de l'Ouest, détection du pays et de la sous-zone climatique
- **Particularités** : météo Open-Meteo sans clé d'API, notifications locales uniquement, tutos et contenu 100 % hors ligne
- **Monétisation** : aucune. Les liens Amazon du catalogue ont été retirés le 20 octobre 2026 ; le bouton « Acheter » reste dans le code (`amazonUrl`) mais ne s'affiche plus, faute de lien. La mention « Partenaire Amazon » a été ôtée de `landing/index.html` le 21 octobre 2026.

## Services externes

### 1. GitHub

- **Rôle** : dépôt du code + CI GitHub Actions — `ci.yml` (analyze + tests + builds Android AAB/APK), `sync-catalog.yml` (export du catalogue vers Supabase pour le projet sœur Kultivaprix, lancé quand le catalogue change — en échec le 20 octobre 2026, l'adresse Supabase en pause ne répondant pas) et `site.yml` (publication du dossier `landing/`, voir plus bas).
- **Console** : <https://github.com/teiki5320/Kultiva> (branche par défaut : `main`)
- **Identifiants publics** : —
- **Secrets** : `KULTIVA_SEED_SECRET` dans repo → Settings → Secrets → Actions (même valeur configurée côté edge function `seed-species`).
- **Coût** : gratuit.

### 2. Supabase

- **Rôle** : backend — auth (e-mail + Google + Apple), Postgres sous RLS (`profiles`, `plantations`, `unlocked_badges`, `preferences`, `challenge_posts`, `post_likes`, `post_reports`, `user_xp`, `news_items`, `species`), Storage (`plant-photos`, `news-images`), edge functions `seed-species` et `delete-account` (suppression de compte in-app). Migrations `supabase/migrations/001 → 016`, appliquées manuellement via le SQL Editor.
- **État** : ⏸️ **en pause, pas supprimé.** Le 27 octobre 2026 (comme le 20), l'API Supabase donne toujours le projet « Kultiva » (`vkiwkeknfzwdvufcqbrp`, région `eu-west-1`) avec l'état *inactif* ; son adresse ne résout toujours pas le 21 octobre ; il se rallume depuis la console. Pendant la pause, son adresse ne résout plus du tout — c'est ce qui avait fait croire, le 3 octobre, à une suppression. Conséquence : sans rallumage, pas de connexion, pas de synchronisation, pas de suppression de compte in-app. Le mode invité et tout le contenu hors ligne fonctionnent.
- **Console** : <https://supabase.com/dashboard/project/vkiwkeknfzwdvufcqbrp>
- **Identifiants publics** : adresse du projet `vkiwkeknfzwdvufcqbrp` (elle ne répond plus tant que le projet est en pause) + `anonKey`, commitées dans `lib/config/supabase_config.dart` — publiques par design, la sécurité repose sur les policies RLS.
- **Secrets** : clé `service_role` — dashboard uniquement (Settings → API), jamais dans le code ni le dépôt.
- **Coût** : plan gratuit.

### 3. Connexion utilisateurs (Apple / Google / e-mail)

- **Rôle** : comptes facultatifs, gérés par Supabase Auth (`lib/services/auth_service.dart`) — e-mail + mot de passe avec confirmation, « Se connecter avec Google » (`google_sign_in`), « Se connecter avec Apple » (`sign_in_with_apple`, nonce SHA-256, entitlement `ios/Runner/Runner.entitlements`). « Continuer sans compte » (mode invité) évite la connexion.
- **État** : inopérante tant que Supabase est en pause. Les clés Google « Se connecter » ont été laissées à supprimer le 9 octobre 2026 (app pas publiée) : à recréer si on relance l'app.
- **Console** : <https://console.cloud.google.com> (client OAuth Google) ; Supabase → Authentication → Providers.
- **Identifiants publics** : client IDs Web et iOS dans `lib/config/supabase_config.dart` ; `REVERSED_CLIENT_ID` dans `ios/Runner/Info.plist`.
- **Secrets** : le client secret OAuth Google vit dans le dashboard Supabase (Authentication → Providers → Google).
- **Coût** : gratuit. Client OAuth Android (empreinte SHA-1 de la clé de signature) jamais créé.

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
- **Identifiants publics** : bundle `com.toa.kultiva`, version 1.0.0 (build 5). Conformité chiffrement déclarée dans l'`Info.plist` (`ITSAppUsesNonExemptEncryption = false`).
- **Secrets** : — (accès via le compte Apple Developer).
- **Coût** : inclus dans l'adhésion Apple Developer.

### 7. Xcode Cloud

- **Rôle** : CI iOS — build automatique via `ios/ci_scripts/ci_post_clone.sh` (Flutter épinglé 3.41.6, SPM désactivé, `--config-only` avant `pod install`). Cible minimale iOS 15.0 pour l'appli et tous les pods (`ios/Podfile`) depuis le 25 octobre 2026 ; avant : 13.0.
- **État** : les builds 95 et 96 ont réussi le 25 octobre 2026, avec l'étape « TestFlight internes - iOS » (vérifié le 27 octobre 2026). Le build 94 avait échoué le 24 octobre 2026 (Sentry et d'autres pods visaient une version d'iOS trop basse), corrigé le 25 octobre.
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
- **État** : en ligne — <https://kultiva.toakeur.com> et `/privacy.html` répondent (vérifié le 21 octobre 2026). Les boutons « Télécharger » pointent encore vers `#` (app non publiée).
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

- **Rôle** : position de l'appareil (`geolocator`) et nom de ville (`geocoding`) pour la météo, la région de culture et la configuration du jardin (`lib/services/geolocation_service.dart`, `weather_service.dart`, `garden_plan_config_sheet.dart`). Permission demandée en français (`Info.plist`), repli sur Paris ou la capitale du pays si refusée.
- **Console** : aucune — services du système.
- **Identifiants publics** : —
- **Secrets** : aucun.
- **Coût** : gratuit.

## Notes

- Valeurs **publiques par design** (leur présence dans le code est normale) : URL + `anonKey` Supabase, client IDs Google OAuth, DSN Sentry. Plus aucun tag Amazon dans le code depuis le 20 octobre 2026.
- E-mail de support public : `kultiva@toakeur.com` (site, politique de confidentialité en ligne et dans l'app).
- Reprise sur machine neuve : cloner le dépôt, Flutter ≥ 3.38, `flutter pub get` puis `flutter run` — aucun secret requis côté client ; release Android = keystore + `key.properties` depuis le coffre-fort ; release iOS = accès au compte Apple.
