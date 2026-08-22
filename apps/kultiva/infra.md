# INFRA — fiche technique

Généré le 2026-08-21 par un scan du dépôt. Pour mettre à jour : relancer ce même prompt.

> Aucun secret, clé ni jeton dans ce fichier — uniquement des références
> (nom de variable, endroit où le secret vit, lien vers la console).

## Vue d'ensemble

- **Plateforme** : iOS + Android (Flutter ≥ 3.38), portrait, iPhone + iPad — app `com.toa.kultiva`, v1.0.0+5
- **Stack** : Flutter/Dart Material 3, local-first (SharedPreferences + services singletons, `ValueNotifier`, sans framework d'état)
- **Backend** : Supabase (auth, Postgres RLS, Storage, 2 edge functions) — facultatif, l'app fonctionne hors ligne
- **Distribution** : App Store via Xcode Cloud + Play Store (AAB signé) — en pré-publication, textes des fiches prêts (`docs/store-listings.md`)
- **Marchés** : bi-marché France + 8 pays francophones d'Afrique de l'Ouest, détection du pays et de la sous-zone climatique
- **Particularités** : météo Open-Meteo sans clé d'API, notifications locales uniquement, tutos et contenu 100 % hors ligne

## Services externes

### 1. GitHub

- **Rôle** : dépôt du code + CI GitHub Actions — `ci.yml` (analyze + tests + builds Android AAB/APK) et `sync-catalog.yml` (export du catalogue vers Supabase pour le projet sœur Kultivaprix).
- **Console** : <https://github.com/teiki5320/Kultiva> (branche par défaut : `main`)
- **Identifiants publics** : —
- **Secrets** : `KULTIVA_SEED_SECRET` dans repo → Settings → Secrets → Actions (même valeur configurée côté edge function `seed-species`).
- **Coût** : gratuit.

### 2. Supabase

- **Rôle** : backend — auth (e-mail + Google + Apple), Postgres sous RLS (`profiles`, `plantations`, `unlocked_badges`, `preferences`, `challenge_posts`, `post_likes`, `post_reports`, `user_xp`, `news_items`, `species`), Storage (`plant-photos`, `news-images`), edge functions `seed-species` et `delete-account` (suppression de compte in-app). Migrations `supabase/migrations/001 → 016`, appliquées manuellement via le SQL Editor.
- **Console** : <https://supabase.com/dashboard/project/vkiwkeknfzwdvufcqbrp>
- **Identifiants publics** : URL `https://vkiwkeknfzwdvufcqbrp.supabase.co` + `anonKey`, commitées dans `lib/config/supabase_config.dart` — publiques par design, la sécurité repose sur les policies RLS.
- **Secrets** : clé `service_role` — dashboard uniquement (Settings → API), jamais dans le code ni le dépôt.
- **Coût** : plan gratuit.

### 3. Google Cloud

- **Rôle** : OAuth « Sign in with Google ».
- **Console** : <https://console.cloud.google.com>
- **Identifiants publics** : client IDs Web et iOS dans `lib/config/supabase_config.dart` ; `REVERSED_CLIENT_ID` dans `ios/Runner/Info.plist`.
- **Secrets** : le client secret OAuth vit dans le dashboard Supabase (Authentication → Providers → Google).
- **Coût** : gratuit. À faire : créer le client OAuth Android (SHA-1 de la clé de signature release).

### 4. Apple Developer

- **Rôle** : compte développeur — Sign in with Apple (entitlement `ios/Runner/Runner.entitlements`, nonce SHA-256), certificats et profils de signature gérés par Xcode Cloud (rien dans le dépôt).
- **Console** : <https://developer.apple.com>
- **Identifiants publics** : team `K597U7X3FZ`.
- **Secrets** : identifiants du compte Apple → gestionnaire de mots de passe.
- **Coût** : 99 $/an.

### 5. App Store Connect

- **Rôle** : fiche App Store, TestFlight, soumission à la review. Textes prêts à coller dans `docs/store-listings.md` (fiches par pays).
- **Console** : <https://appstoreconnect.apple.com>
- **Identifiants publics** : bundle `com.toa.kultiva`, version 1.0.0 (build 5). Conformité chiffrement déjà déclarée dans l'`Info.plist` (`ITSAppUsesNonExemptEncryption = false`).
- **Secrets** : — (accès via le compte Apple Developer).
- **Coût** : inclus dans l'adhésion Apple Developer.

### 6. Xcode Cloud

- **Rôle** : CI iOS — build automatique via `ios/ci_scripts/ci_post_clone.sh` (Flutter épinglé 3.41.6, SPM désactivé, `--config-only` avant `pod install`).
- **Console** : App Store Connect → onglet Xcode Cloud.
- **Identifiants publics** : —
- **Secrets** : aucun secret dans le dépôt (signature gérée par Apple).
- **Coût** : inclus (25 h de build/mois gratuites).

### 7. Play Console

- **Rôle** : publication Android — AAB signé (Gradle 8.14, Java 17, min SDK 21, desugaring activé).
- **Console** : <https://play.google.com/console>
- **Identifiants publics** : applicationId `com.toa.kultiva`.
- **Secrets** : `android/key.properties` (non commité : storeFile, storePassword, keyAlias, keyPassword) + keystore `.jks` (non commité). ⚠️ Sauvegarder le keystore hors du dépôt : sa perte rend toute mise à jour impossible.
- **Coût** : 25 $ (une seule fois).

### 8. Sentry

- **Rôle** : crash reporting (erreurs + stack traces), échantillonnage traces à 0,05 pour économiser la data.
- **Console** : <https://sentry.io> — org `o4511455467864064` (région UE, `ingest.de`), projet `4511455478808656`.
- **Identifiants publics** : DSN commité dans `lib/main.dart` (public par design).
- **Secrets** : identifiants du compte → gestionnaire de mots de passe.
- **Coût** : plan gratuit (développeur).

### 9. Open-Meteo

- **Rôle** : météo 7 jours (`lib/services/weather_service.dart`), alertes arrosage/canicule. Fallback si géolocalisation refusée : Paris ou la capitale du pays sélectionné.
- **Console** : aucune — pas de compte.
- **Identifiants publics** : aucun, API sans clé.
- **Secrets** : aucun.
- **Coût** : gratuit.

### 10. Amazon Associates

- **Rôle** : affiliation — liens « graines » sur les fiches légumes, tag `kultiva-21` (`lib/data/vegetables_base.dart`), mention « Lien partenaire » affichée. Marché France uniquement (masqué en Afrique de l'Ouest, remplacé par les conseils d'achat au marché).
- **Console** : <https://partenaires.amazon.fr>
- **Identifiants publics** : tag `kultiva-21`.
- **Secrets** : identifiants du compte → gestionnaire de mots de passe.
- **Coût** : gratuit (rémunérateur). ⚠️ Implique a priori le statut « trader » (DSA) pour la distribution UE — décision en cours, voir `docs/MARKETING.md`.

### 11. Vercel

- **Rôle** : hébergement du site vitrine (`landing/index.html` + `landing/privacy.html`) — fournira l'URL d'assistance et l'URL de confidentialité exigées par les stores. Déploiement prévu (Root Directory = `landing`), URL à consigner ici une fois en ligne.
- **Console** : <https://vercel.com>
- **Identifiants publics** : URL publique du site — à consigner après déploiement.
- **Secrets** : compte (connexion via GitHub).
- **Coût** : gratuit (plan Hobby).

## Notes

- Valeurs **publiques par design** (leur présence dans le code est normale) : URL + `anonKey` Supabase, client IDs Google OAuth, DSN Sentry, tag Amazon.
- E-mail de support public : `kultiva.toa@gmail.com` (affiché sur la landing et dans la privacy policy).
- Reprise sur machine neuve : cloner le dépôt, Flutter ≥ 3.38, `flutter pub get` puis `flutter run` — aucun secret requis côté client ; release Android = keystore + `key.properties` depuis le coffre-fort ; release iOS = accès au compte Apple.
