# INFRA.md — Fiche technique des services externes de Kultiva

> Registre de l'infrastructure du projet, généré par scan du dépôt le
> 2026-08-03. **Aucun secret dans ce fichier** — uniquement des
> références publiques et des pointeurs vers l'endroit où vit chaque
> secret (coffre-fort, secrets GitHub, dashboard, fichier non commité).
> Pour le mettre à jour : demander à Claude Code de re-scanner le dépôt.

## 📱 L'application

| Info | Valeur |
| --- | --- |
| Nom | Kultiva |
| Bundle ID / applicationId | `com.toa.kultiva` |
| Plateformes | iOS + Android (Flutter ≥ 3.38, CI épinglée 3.41.6) |
| Version courante | 1.0.0+5 |
| Dépôt | `github.com/teiki5320/Kultiva` (branche principale : `main`) |
| Marchés | France + 8 pays francophones d'Afrique de l'Ouest |
| Projet sœur | Kultivaprix (comparateur de prix, partage le catalogue) |

## 🧑‍💻 GitHub (code + CI)

- **Console** : <https://github.com/teiki5320/Kultiva>
- **CI** (`.github/workflows/`) :
  - `ci.yml` — `flutter analyze` + `flutter test` + build appbundle /
    APK `--split-per-abi` sur push `main` et PR.
  - `sync-catalog.yml` — exporte le catalogue (`tool/export_catalog.dart`)
    et le POST vers l'edge function Supabase `seed-species` quand les
    fichiers source du catalogue changent sur `main`.
- **Secret GitHub Actions** : `KULTIVA_SEED_SECRET` (repo → Settings →
  Secrets and variables → Actions). Même valeur configurée côté edge
  function `seed-species`.

## 🗄️ Supabase (backend)

- **Projet** : `vkiwkeknfzwdvufcqbrp`
- **URL** : `https://vkiwkeknfzwdvufcqbrp.supabase.co`
- **Console** : <https://supabase.com/dashboard/project/vkiwkeknfzwdvufcqbrp>
- **Clés** :
  - `anonKey` — **publique par design**, commitée dans
    `lib/config/supabase_config.dart` (la sécurité repose sur les
    policies RLS, pas sur le secret de cette clé).
  - `service_role` — **JAMAIS commitée**. Vit uniquement dans le
    dashboard (Settings → API) et dans l'environnement des edge functions.
- **Tables** : `profiles`, `plantations`, `unlocked_badges`,
  `preferences`, `challenge_posts`, `post_likes`, `user_xp`,
  `news_items`, `species` (partagée avec Kultivaprix). Toutes sous RLS.
- **Buckets Storage** : `plant-photos` (photos des plants,
  `{user_id}/{plantation_id}/{filename}`), `news-images` (public).
- **Edge functions** (`supabase/functions/`) :
  - `seed-species` — réception du catalogue depuis GitHub Actions
    (header `x-seed-secret`).
  - `delete-account` — suppression de compte in-app (**à déployer
    manuellement** : `supabase functions deploy delete-account`).
- **Migrations** : `supabase/migrations/001 → 016`, appliquées **à la
  main** via SQL Editor (pas de CLI liée). ⚠️ 012 → 016 à appliquer
  avant publication (voir `_plans/rapport-corrections-2026-07-24.md`).
- **Auth providers** : email + Google + Apple (voir sections suivantes).

## 🔑 Google Cloud (OAuth « Sign in with Google »)

- **Console** : <https://console.cloud.google.com> (compte propriétaire
  du projet OAuth).
- **Client IDs** (publics, commités dans `lib/config/supabase_config.dart`) :
  - Web : `56977548622-l52olnkn81icjbo6aqk6b5trssjpbqiu.apps.googleusercontent.com`
    (aussi collé dans Supabase → Authentication → Providers → Google).
  - iOS : `56977548622-fokr6eq79msehbmphcler1pldmokg8fv.apps.googleusercontent.com`
    (le `REVERSED_CLIENT_ID` correspondant est dans `ios/Runner/Info.plist`).
- **Secret client OAuth** : vit dans le dashboard Supabase (provider
  Google), jamais dans le code.
- **À faire pour Android** : déclarer un client OAuth Android avec le
  SHA-1 de la clé de signature release.

## 🍏 Apple Developer + App Store Connect

- **Consoles** : <https://developer.apple.com> et
  <https://appstoreconnect.apple.com> (compte développeur payant, 99 $/an).
- **Sign in with Apple** : entitlement actif
  (`ios/Runner/Runner.entitlements`), nonce SHA-256 côté app.
- **Xcode Cloud** : builds iOS automatiques via
  `ios/ci_scripts/ci_post_clone.sh` (Flutter épinglé **3.41.6**, SPM
  désactivé, `flutter build ios --config-only` avant `pod install`).
- **Signing iOS** : certificats et profils gérés par Xcode Cloud /
  le compte Apple (rien dans le dépôt).
- **Permissions Info.plist** : caméra, photos, localisation — textes en
  français, à maintenir factuels.

## 🤖 Google Play Console

- **Console** : <https://play.google.com/console>
  (compte développeur, 25 $ une fois).
- **Signing release** :
  - `android/key.properties` — **non commité** (`.gitignore`). Contient
    `storeFile`, `storePassword`, `keyAlias`, `keyPassword`.
  - Keystore `.jks` — **non commité**. ⚠️ À sauvegarder hors du dépôt
    (coffre-fort + copie hors machine) : sa perte = impossible de mettre
    à jour l'app.
- **Build** : Gradle 8.14, Java 17, min SDK 21, desugaring activé.

## 📡 Sentry (crash reporting)

- **Console** : <https://sentry.io> — org `o4511455467864064`
  (région **EU**, `ingest.de.sentry.io`), projet `4511455478808656`.
- **DSN** : public par design, commité dans `lib/main.dart`.
- Capture erreurs + stack traces Flutter en production.

## 🔌 APIs externes sans compte

- **Open-Meteo** — météo 7 jours. Aucune clé, aucun compte, gratuit.
  Appels dans `lib/services/weather_service.dart`. Fallback : Paris si
  géoloc refusée (capitale du pays sélectionné en AO).
- **Géolocalisation / géocodage natifs** — `geolocator` + `geocoding`
  (OS du téléphone), pas de service tiers.

## 💳 Amazon Associates (affiliation, France uniquement)

- **Console** : <https://partenaires.amazon.fr>
- **Tag partenaire** : `kultiva-21` (liens dans
  `lib/data/vegetables_base.dart`).
- Mention « Lien partenaire » affichée (conformité du programme).
- **Masqué en Afrique de l'Ouest** — remplacé par les conseils d'achat
  au marché (`lib/data/market_buying_tips.dart`).

## 🌐 Web & réseaux sociaux

- **Email de support** : `kultiva.toa@gmail.com` (Gmail dédiée) —
  adresse publique affichée sur la landing et dans la privacy policy,
  à renseigner comme contact dans App Store Connect / Play Console.
- **Landing** : `landing/index.html` + `landing/privacy.html`
  (statiques). ⚠️ Hébergement à choisir + liens stores encore en
  `href="#"`.
- **Instagram** : `@toa.kultiva` (lien câblé dans l'app).
- **Privacy policy** : HTML embarquée + lien dans les réglages (RGPD).

## 🔐 Récapitulatif — où vit chaque secret

| Secret | Où il vit | Jamais |
| --- | --- | --- |
| `service_role` Supabase | Dashboard Supabase uniquement | dans le code / le dépôt |
| `KULTIVA_SEED_SECRET` | Secrets GitHub Actions + env de l'edge function | dans le code |
| Keystore Android + mots de passe | `android/key.properties` local + coffre-fort ; `.jks` sauvegardé hors dépôt | dans le dépôt |
| Secret client Google OAuth | Supabase Dashboard (provider Google) | dans le code |
| Certificats / profils iOS | Compte Apple / Xcode Cloud | dans le dépôt |
| Comptes des consoles (Google, Apple, Supabase, Sentry, Amazon) | Gestionnaire de mots de passe (Bitwarden / 1Password…) | dans un fichier texte |

Valeurs **publiques par design** (normales dans le code) : URL + `anonKey`
Supabase, client IDs Google OAuth, DSN Sentry, tag Amazon.

## 🚀 Checklist « reprise du projet » (nouvelle machine / nouveau dev)

1. Cloner `github.com/teiki5320/Kultiva`, installer Flutter ≥ 3.38
   (idéalement 3.41.6 comme la CI).
2. `flutter pub get` puis `flutter run` — l'app fonctionne déjà
   (Supabase + Open-Meteo n'exigent aucun secret côté client).
3. Pour un build **release Android** : récupérer le keystore `.jks` et
   recréer `android/key.properties` depuis le coffre-fort.
4. Pour un build **release iOS** : accès au compte Apple Developer
   (Xcode Cloud fait le reste).
5. Pour administrer le backend : accès au dashboard Supabase
   (projet `vkiwkeknfzwdvufcqbrp`).
