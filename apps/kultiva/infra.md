# INFRA — fiche technique

Mis à jour le 3 novembre 2026 d'après le dépôt et le site en ligne. Pour mettre à jour : relancer ce même prompt.

> Aucun secret, clé ni jeton dans ce fichier — uniquement des références
> (nom de variable, endroit où le secret vit, lien vers la console).

## En bref

- **Plateforme** : iOS + Android (Flutter), iPhone en portrait, iPad dans les quatre sens
- **Stack** : Flutter/Dart Material 3, local-first, hors ligne
- **Backend** : **aucun** — l'app ne contacte plus aucun serveur
- **Distribution** : Xcode Cloud + App Bundle signé — jamais soumise
- **Site** : kultiva.toakeur.com sur GitHub Pages, derrière Cloudflare
- **IA et outils** : météo Open-Meteo, Sentry, aucune IA
- **Affiliation** : Amazon Partenaires, tag `kultiva1-21`, France seulement — liens dans l'appli seulement, le site n'en porte aucun (c'est normal)

## Parcours

- 🍎 **iOS** : 🐙 GitHub — main · CI au vert [ok] → ☁️ Xcode Cloud — build 195 réussi le 3/11, en TestFlight [ok] → 🛍️ App Store Connect — fiche créée, à compléter [à faire] → 📱 App Store — pas publiée [pas encore]
- 🤖 **Android** : 🐙 GitHub — CI construit l'App Bundle [ok] → 🔑 Keystore Android — clé locale, valable 2053 [ok] → 🛍️ Google Play Console — fiche à créer [à faire] → 📱 Google Play — pas publiée [pas encore]
- 🛒 **Affiliation** : 🥕 Fiche légume — bouton « Acheter » [ok] → 🛒 Amazon Partenaires (affiliation) — tag kultiva1-21 [ok] → 📱 Utilisateurs — app pas publiée [pas encore]
- 🌐 **Web** : 🐙 GitHub — dossier landing/ [ok] → 📄 GitHub Pages — publié par site.yml [ok] → 🌐 Nom de domaine — kultiva.toakeur.com, HTTPS [ok] → ⬇️ Boutons « Télécharger » — encore sans lien [pas encore]

## Vue d'ensemble

- **État du projet** : **en pause** (choix de Jean) — rien n'est soumis aux boutiques.
- **Plateforme** : iOS + Android (Flutter ≥ 3.47), iPhone en portrait, iPad dans les quatre sens depuis le 30 octobre 2026 — app `com.toa.kultiva`, v1.0.0+5. ⚠️ L'app a été **regardée sur un iPad Pro 13″ le 3 novembre 2026**, pour la première fois : le contenu y est désormais borné et centré (720 points, 560 pour le tableau de bord et les feuilles modales), sauf le catalogue, dont la grille profite volontairement de la largeur.
- **Stack** : Flutter/Dart Material 3, local-first (SharedPreferences + services singletons, `ValueNotifier`, sans framework d'état)
- **Backend** : **aucun depuis le 30 octobre 2026.** Les comptes ont été retirés de la v1 : le jardin, les photos et les badges vivent uniquement sur l'appareil. Les seuls appels sortants sont Open-Meteo (météo), Sentry (plantages) et, au toucher d'un bouton « Acheter », Amazon.fr.
- **Distribution** : App Store via Xcode Cloud + Play Store (AAB signé) — jamais soumise (un script local `update-testflight.command` construit aussi l'IPA à envoyer par Transporter), textes des fiches prêts (`docs/store-listings.md`)
- **Site** : <https://kultiva.toakeur.com> (présentation + confidentialité), en ligne depuis le 7 octobre 2026 (vérifié le 3 novembre 2026)
- **Marchés** : **73 pays sur six continents** depuis le 1er novembre 2026, France en priorité. Deux bases de calendrier (tempérée, tropicale), **neuf** zones climatiques depuis le 2 novembre 2026 — la neuvième, « tropical à hiver frais », couvre le nord de l'Inde et du Viêt Nam, seule zone tropicale où poussent chou et carotte — et un décalage de six mois pour l'hémisphère sud. Tout ce qui est climatique (saisons, seuil de canicule, médailles, alerte premières pluies) lit la zone et non la région depuis cette date. Détection automatique du pays et de la sous-zone, recherche dans le sélecteur. Les 8 pays francophones d'Afrique de l'Ouest gardent seuls leur contenu propre (noms locaux, achat au marché). Les calendriers méditerranéen, continental **et subtropical** sont **écrits culture par culture** (52, 53 et 58 depuis le 3 novembre 2026) ; les autres zones tempérées restent dérivées de la base française par décalage, et l'app l'indique sous chaque calendrier concerné. ⚠️ Passe de vérification du 2 novembre 2026 : **la base de calendrier suit désormais la zone climatique et non le pays** — São Paulo recevait un calendrier tropical, Darwin un calendrier français retourné — et **cinq zones ont été corrigées** (Croatie en continental, Égypte en méditerranéen, Nouvelle-Calédonie en tropical, Afrique du Sud et Australie en subtropical). Le détail et ce qui reste approximatif sont dans la fiche de couverture `https://claude.ai/artifact/Dpxa9TsY3QQ4Au3L56cLgF`.
- **Langues** : français (source), **anglais complet** depuis le 2 novembre 2026, **espagnol complet** le même jour. **Toute l'application est traduite dans les trois langues depuis le 2 novembre 2026 — 4 894 chaînes par langue** : 736 recettes, 33 tutos (1 267 phrases), 1 943 phrases de contenu (maladies, lexique, badges, défis, modes d'emploi des 39 accessoires, et **les textes des 169 fiches du catalogue**), 779 chaînes d'interface (`ui_en.dart`, `ui_es.dart`) et 169 noms de cultures et d'accessoires. ⚠️ Les fiches du catalogue — note, description et neuf champs techniques — n'étaient pas traduites du tout avant cette date : 1 032 chaînes en français sous une interface anglaise ou espagnole, trouvées en regardant l'écran et non le code. Les mois, les jours et les 73 noms de pays passent par des tables indexées et non par le dictionnaire, parce qu'une clé « juin » ne peut pas rendre à la fois « jun » et « june ». Les 33 clés ARB orphelines ont été retirées ; il en reste 7, celles qui servent vraiment. Tout passe par une surcouche par langue (`recipes_{en,es}.dart`, `tutos_{en,es}.dart`, `content_{en,es}.dart`) ; le français reste la source de vérité et sert de repli champ par champ. Les tutos restent **un seul fichier par tuto**, jamais dupliqué par langue : le dictionnaire est appliqué dans le DOM au chargement, et le français du fichier reste la source. Quatre suites de tests (recettes, tutos, contenu, interface) vérifient qu'aucune clé n'est orpheline, qu'aucune langue n'est à moitié traduite, et que les nombres des conseils sanitaires ne bougent pas. Voir `docs/traduction-recettes.md`.
- **Particularités** : météo Open-Meteo sans clé d'API, notifications locales uniquement, tutos, recettes animées et contenu 100 % hors ligne (aucun CDN, aucune police distante)
- **Navigation** : cinq onglets depuis le 1er novembre 2026 — Home, Cahier, Étal, **Conservation**, Tutos (l'onglet s'appelait « Recettes » jusqu'au 2 novembre 2026 : ce sont d'abord des conservations, pas un livre de cuisine) (Tutos passé en dernier le 1er novembre 2026). Un onglet Photo a été ajouté puis retiré le même jour (trop compliqué, et il doublait les photos du cahier de culture). Les tutos HTML naviguent par index : tout changement d'ordre passe par `tuto_fiche_screen.dart` et `test/onglets_test.dart`.
- **Monétisation** : affiliation Amazon Partenaires, France uniquement. Les 159 liens du catalogue, retirés le 20 octobre 2026 quand Amazon a fermé le compte du tag `kultiva-21`, ont été **remis le 30 octobre 2026** sous le nouveau tag `kultiva1-21`. Le tag ne vit plus qu'à un seul endroit (`kAmazonAffiliateTag`, `lib/data/vegetables_base.dart`) : le catalogue ne stocke que les mots cherchés. La mention « Partenaire Amazon » reste absente de `landing/index.html` — le site ne porte aucun lien ; l'app, elle, affiche « Lien partenaire » sous chaque bouton.

## Services externes

### 1. GitHub

- **Rôle** : dépôt du code + CI GitHub Actions — `ci.yml` (analyze + tests + builds Android AAB/APK) et `site.yml` (publication du dossier `landing/`, voir plus bas). Le workflow `sync-catalog.yml`, qui exportait le catalogue vers Kultivaprix, a été supprimé le 30 octobre 2026 : les deux projets n'ont plus de lien.
- **Console** : <https://github.com/teiki5320/Kultiva> (branche par défaut : `main`)
- **Identifiants publics** : —
- **Secrets** : aucun secret de CI n'est plus nécessaire. `KULTIVA_SEED_SECRET` ne sert plus depuis le retrait de la sync Kultivaprix (30 octobre 2026) et peut être supprimé dans repo → Settings → Secrets → Actions.
- **Coût** : gratuit.

### 2. API tierce (météo Open-Meteo)

- **Rôle** : météo 7 jours (`lib/services/weather_service.dart`), alertes arrosage/canicule. Fallback si géolocalisation refusée : Paris ou la capitale du pays sélectionné.
- **Console** : aucune — pas de compte.
- **Identifiants publics** : aucun, API sans clé.
- **Secrets** : aucun.
- **Coût** : gratuit.

### 3. Apple Developer Program

- **Rôle** : compte développeur (compte Apple Developer de Jean) — certificats et profils de signature gérés par Xcode Cloud (rien dans le dépôt). Sign in with Apple n'est plus utilisé depuis le retrait des comptes, le 30 octobre 2026.
- **Console** : <https://developer.apple.com>
- **Identifiants publics** : team `K597U7X3FZ`.
- **Secrets** : identifiants du compte Apple → gestionnaire de mots de passe.
- **Coût** : adhésion annuelle.

### 4. App Store Connect

- **Rôle** : fiche App Store, TestFlight, soumission à la review. Textes prêts à coller dans `docs/FICHE_APP_STORE.md` et `docs/store-listings.md`.
- **Console** : <https://appstoreconnect.apple.com>
- **État** : la fiche existe (App Apple ID `6762550020`) et reçoit les builds de Xcode Cloud — le dernier, le build 195, est disponible en TestFlight depuis la nuit du 2 au 3 novembre 2026 (vérifié le 3 novembre 2026 dans les mails d'Apple) ; aucune soumission à la review.
- **Identifiants publics** : bundle `com.toa.kultiva`, App Apple ID `6762550020`, version 1.0.0 (build 5 dans `pubspec.yaml`, numéros de build Xcode Cloud à part). Conformité chiffrement déclarée dans l'`Info.plist` (`ITSAppUsesNonExemptEncryption = false`).
- **Secrets** : — (accès via le compte Apple Developer).
- **Coût** : inclus dans l'adhésion Apple Developer.

### 5. Xcode Cloud

- **Rôle** : CI iOS — build automatique via `ios/ci_scripts/ci_post_clone.sh` (Flutter épinglé 3.47.3 depuis le 30 octobre 2026, auparavant 3.41.6 ; SPM désactivé, `flutter analyze` puis `--config-only` avant `pod install`). Cible minimale iOS 15.0 pour l'appli et tous les pods (`ios/Podfile`) depuis le 25 octobre 2026 ; avant : 13.0.
- **État** : le **build 195 a réussi dans la nuit du 2 au 3 novembre 2026** (2 novembre, 23 h 55 UTC) et est disponible en TestFlight (vérifié le 3 novembre 2026 dans les mails d'Apple) ; tous les builds du 2 novembre 2026, du 166 au 195, ont réussi. Le build 166 avait réussi le 2 novembre 2026 au matin. Le build 165 avait échoué le 1er novembre 2026 au soir dans `ci_post_clone.sh` (code de sortie 1, sur un envoi qui ne touchait que la documentation) ; le 166, lancé ensuite, est passé. Les autres builds du 1er novembre 2026 (dont le 152 et le 164) avaient réussi, comme ceux depuis le 31 octobre 2026 (dont le 134) aussi ; le build 127 avait réussi le 30 octobre 2026. Les builds 122 et 125 avaient échoué le même soir sur « Command PhaseScriptExecution failed », sans que le rapport dise pourquoi : le script de post-clone installait encore Flutter 3.41.6, où `pdf_service.dart` ne compile plus. Pin relevé à 3.47.3, et `flutter analyze` ajouté au post-clone pour que ce genre d'échec s'affiche en clair. Avant cela, les builds 95 et 96 avaient réussi le 25 octobre 2026 et le build 97 le 27 octobre 2026, chacun avec l'étape « TestFlight internes - iOS » (vérifié le 28 octobre 2026). Jusqu'au 30 octobre 2026, Apple signalait à chaque envoi l'avertissement ITMS-90683 (clé `NSLocationAlwaysAndWhenInUseUsageDescription` absente de `ios/Runner/Info.plist`) ; la clé a été ajoutée le 30 octobre 2026. Le build 94 avait échoué le 24 octobre 2026 (Sentry et d'autres pods visaient une version d'iOS trop basse), corrigé le 25 octobre.
- **Console** : App Store Connect → onglet Xcode Cloud.
- **Identifiants publics** : —
- **Secrets** : aucun secret dans le dépôt (signature gérée par Apple).
- **Coût** : inclus (25 h de build/mois gratuites).

### 6. Google Play Console

- **Rôle** : publication Android — AAB signé (Gradle 8.14, Java 17, min SDK 24, target SDK 36, desugaring activé).
- **Console** : <https://play.google.com/console>
- **Identifiants publics** : applicationId `com.toa.kultiva`.
- **Secrets** : voir « Keystore Android » ci-dessous.
- **Coût** : frais d'inscription unique.

### 7. Keystore Android (signature)

- **Rôle** : signe les builds release Android. `android/app/build.gradle.kts` lit `android/key.properties` (`storeFile`, `storePassword`, `keyAlias`, `keyPassword`) ; sans ce fichier, le build release n'est pas signé avec la clé de publication. Certificat valable jusqu'en 2053.
- **Console** : aucune — fichiers locaux.
- **Identifiants publics** : —
- **Secrets** : `android/key.properties` et le fichier `.jks`, tous deux ignorés par git. ⚠️ Les sauvegarder hors du dépôt : leur perte rend toute mise à jour sur Play impossible (sauf signature d'application par Play, à vérifier dans la console).
- **Coût** : gratuit.

### 8. Hébergement web (GitHub Pages)

- **Rôle** : site de présentation `landing/` (`index.html` + `privacy.html` + images WebP), publié sur **GitHub Pages** par le workflow `.github/workflows/site.yml` à chaque modification de `landing/`. Fournit l'URL d'assistance, l'URL marketing et l'URL de confidentialité exigées par les stores.
- **État** : en ligne — <https://kultiva.toakeur.com> répond, servi par GitHub Pages derrière le proxy Cloudflare (en-têtes `server: cloudflare` et `x-github-request-id`, vérifié le 3 novembre 2026). Les boutons « Télécharger » pointent encore vers `#` (app non publiée).
- **Console** : <https://github.com/teiki5320/Kultiva/settings/pages>
- **Identifiants publics** : adresse du site.
- **Secrets** : aucun (jeton GitHub automatique du workflow).
- **Coût** : gratuit.

### 9. Nom de domaine

- **Rôle** : sous-domaine `kultiva.toakeur.com` du domaine commun `toakeur.com`, DNS chez Cloudflare (proxy actif devant GitHub Pages). Adresse de contact publique `kultiva@toakeur.com` (site, confidentialité, fiches des stores).
- **Console** : <https://dash.cloudflare.com> (compte de gestion `admin@toakeur.com`) ; bureau d'enregistrement du domaine à vérifier dans la console.
- **Identifiants publics** : `kultiva.toakeur.com`, `kultiva@toakeur.com`.
- **Secrets** : identifiants du compte → gestionnaire de mots de passe.
- **Coût** : domaine partagé entre toutes les apps.

### 10. Sentry (suivi des crashs)

- **Rôle** : crash reporting (erreurs + stack traces), échantillonnage des traces à 0,05 pour économiser la data (`lib/main.dart`).
- **Console** : <https://sentry.io> — org `o4511455467864064` (région UE, `ingest.de`), projet `4511455478808656`.
- **Identifiants publics** : DSN commité dans `lib/main.dart` (public par design).
- **Secrets** : identifiants du compte → gestionnaire de mots de passe.
- **Coût** : plan gratuit (développeur).

### 11. Avis in-app (StoreKit Review / In-App Review)

- **Rôle** : demande de note sur les stores via `in_app_review` (`lib/services/review_service.dart`), déclenchée après des moments positifs.
- **Console** : aucune — les notes apparaissent dans App Store Connect et la Play Console.
- **Identifiants publics** : —
- **Secrets** : aucun.
- **Coût** : gratuit.

### 12. Géolocalisation native

- **Rôle** : position de l'appareil (`geolocator`) et nom de ville (`geocoding`) pour la météo, la région de culture et la configuration du jardin (`lib/services/geolocation_service.dart`, `weather_service.dart`, `garden_plan_config_sheet.dart`). Permission demandée en français (`NSLocationWhenInUseUsageDescription` et, depuis le 30 octobre 2026, `NSLocationAlwaysAndWhenInUseUsageDescription` dans `Info.plist`), repli sur Paris ou la capitale du pays si refusée.
- **Console** : aucune — services du système.
- **Identifiants publics** : —
- **Secrets** : aucun.
- **Coût** : gratuit.

### 13. Amazon Partenaires (affiliation)

- **Rôle** : les boutons « Acheter » des fiches du catalogue (`lib/screens/vegetable_detail_screen.dart`) ouvrent une recherche Amazon.fr portant le tag `kultiva1-21`, **France seulement — la condition est le pays, pas la région** (`amazonLinkVisible`, corrigée le 2 novembre 2026 : `Region.france` veut dire « base tempérée » depuis l'ouverture mondiale, donc 36 pays, dont le Japon et le Chili, voyaient le bouton — et la règle vivait **à deux endroits**, le bouton du bas et le panier des accessoires) ; Amazon encaisse et livre. Chacune des 39 fiches d'accessoires porte depuis le 2 novembre 2026 un mode d'emploi en cinq points, dont une version à fabriquer soi-même pour 22 d'entre elles : l'app ne se contente pas de renvoyer vers la boutique. Le tag vit à un seul endroit : `kAmazonAffiliateTag` dans `lib/data/vegetables_base.dart`. L'app affiche « Lien partenaire » sous chaque bouton ; le site, lui, ne porte aucun lien Amazon.
- **Historique** : l'ancien code `kultiva-21`, rattaché au compte fermé par Amazon le 18 octobre 2026, a été retiré le 20 octobre 2026 ; les liens sont revenus le 30 octobre 2026 sous `kultiva1-21`.
- **Console** : <https://partenaires.amazon.fr>
- **Identifiants publics** : tag `kultiva1-21`.
- **Secrets** : aucun.
- **Coût** : gratuit (commission sur les ventes).

## Notes

- **Supabase et connexion utilisateurs — plus utilisés depuis le 30 octobre 2026** : les comptes ont été retirés de la v1 (supprimés : `lib/screens/auth/`, `auth_service.dart`, `cloud_sync_service.dart`, `supabase_config.dart`, les dépendances `supabase_flutter`, `google_sign_in`, `sign_in_with_apple`, `crypto`). Le projet Supabase `vkiwkeknfzwdvufcqbrp` (région `eu-west-1`) existe toujours, inactif (vérifié le 3 novembre 2026) : **ne pas le supprimer**, il ne bloque rien. Les migrations restent dans `supabase/migrations/` à titre d'historique. Si la synchro revient, la piste retenue est Cloudflare (Worker + D1 + R2) plutôt que Supabase.

- Valeur **publique par design** (sa présence dans le code est normale) : le DSN Sentry (`lib/main.dart`). Depuis le 30 octobre 2026, il n'y a plus ni URL Supabase, ni `anonKey`, ni client ID Google dans le code ; et le tag Amazon Partenaires (`kultiva1-21`, remis le 30 octobre) est public par nature — c'est un identifiant d'affiliation, pas un secret.
- E-mail de support public : `kultiva@toakeur.com` (site, politique de confidentialité en ligne et dans l'app).
- Reprise sur machine neuve : cloner le dépôt, Flutter ≥ 3.47, `flutter pub get` puis `flutter run` — aucun secret requis côté client ; release Android = keystore + `key.properties` depuis le coffre-fort ; release iOS = accès au compte Apple.
