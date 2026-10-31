# PUBLICATION — état des boutiques

> Mis à jour le 31 octobre 2026. Pour mettre à jour :
> relancer ce même prompt.
>
> **Aucun secret ici** — uniquement des références publiques :
> identifiants d'app, numéros de version, liens de console.
>
> ⚠️ **Établi depuis le dépôt, pas depuis les consoles.** La session qui a
> produit cette fiche n'avait accès ni à App Store Connect ni à la Play
> Console. Tout ce qui figure ci-dessous vient du code, des fichiers de
> configuration et des documents du dépôt. Chaque ligne marquée
> « à vérifier dans la console » attend ta confirmation — aucun statut de
> boutique n'a été deviné.

## En bref

- **Version commune** : `1.0.0+5` (`pubspec.yaml`), jamais soumise
- **Identifiant de bundle** : `com.toa.kultiva` (iOS et Android)
- **Monétisation** : gratuite ; ni pub ni achat intégré, mais affiliation Amazon en France (liens remis le 30 octobre 2026, tag `kultiva1-21`)
- **Comptes** : **aucun** depuis le 30 octobre 2026 — ni connexion, ni serveur, ni synchronisation
- **Confidentialité** : <https://kultiva.toakeur.com/privacy.html> en ligne
- **Contact** : `kultiva@toakeur.com`

## Boutiques

| | 🍎 App Store | 🤖 Google Play |
|---|---|---|
| État | [pas encore] jamais soumise ; fiche App Store Connect créée (Apple ID `6762550020`), dernier build reçu : 134 (31 octobre 2026) | [pas encore] jamais envoyée ; fiche à vérifier dans la console |
| Construction | [ok] Xcode Cloud (`ci_post_clone.sh`, Flutter 3.47.3) : **build 134 réussi le 31 octobre 2026**, disponible en TestFlight (vérifié le 31 octobre 2026 dans les mails d'Apple) ; build 127 réussi le 30 octobre 2026, après deux échecs le même soir (122 et 125, pin Flutter devenu plus ancien que le code). Auparavant : builds 95 et 96 réussis le 25 octobre 2026, build 97 le 27 octobre, avec l'étape « TestFlight internes - iOS » (vérifié le 28 octobre 2026) ; le build 94 avait échoué le 24 octobre | [ok] App Bundle construit par la CI GitHub Actions |
| Signature | [ok] gérée par Xcode Cloud, équipe `K597U7X3FZ` | [ok] keystore local, valable jusqu'en 2053 |
| Classification | [à faire] 4+ attendu, questionnaire prêt à reporter | [à faire] questionnaire de contenu à remplir |
| Cible | [ok] iOS 15.0 et plus (depuis le 25 octobre 2026 : Xcode et les pods, dont Sentry, l’exigent ; avant : 13.0), iPhone et iPad, portrait | [ok] valeurs par défaut de Flutter, rien de figé dans le dépôt |
| Permissions | [ok] caméra, photos, localisation en français ; clé `NSLocationAlwaysAndWhenInUseUsageDescription` ajoutée le 30 octobre 2026 (fin de l'avertissement ITMS-90683) | [ok] localisation, notifications, alarmes exactes |
| Poids | [pas encore] à mesurer au premier envoi (35 Mo d'assets) | [pas encore] à mesurer au premier envoi (35 Mo d'assets) |

## Vue d'ensemble

- **État du projet** : **en pause** (choix de Jean) — rien n'est soumis aux boutiques
- **iOS** : jamais soumise — la fiche App Store Connect existe (Apple ID `6762550020`), ses textes sont rédigés et l'URL de confidentialité existe ; le build Xcode Cloud 94 a échoué le 24 octobre 2026 (cible iOS trop basse), corrigé le 25 octobre ; les builds 95 et 96 ont réussi le 25 octobre 2026, le build 97 le 27 octobre 2026, le build 127 le 30 octobre 2026 et le **build 134 le 31 octobre 2026**, disponible en TestFlight. La clé de localisation que réclamait Apple (ITMS-90683) a été ajoutée le 30 octobre 2026
- **Android** : jamais envoyée à Play — le bundle release est signé et vérifié localement ; l'existence d'une fiche Play reste à vérifier dans la console
- **Web** : site de présentation en ligne sur <https://kultiva.toakeur.com> depuis le 7 octobre 2026 (vérifié le 31 octobre 2026)
- **Backend** : **aucun**. Les comptes ont été retirés de la v1 le 30 octobre 2026 — le jardin vit sur l'appareil. Le projet Supabase reste inactif (vérifié le 31 octobre 2026), inutilisé, et ne bloque plus rien
- **Monétisation** : affiliation Amazon en France. Les 159 liens, retirés le 20 octobre 2026 (compte fermé le 18), sont **revenus le 30 octobre 2026** sous le tag `kultiva1-21`. ⚠️ Le statut **trader** au sens du DSA, décidé le 24 août 2026 à cause de ces liens, redevient donc applicable : à déclarer dans App Store Connect et Play Console avant soumission
- **Classification attendue** : **4+** depuis le retrait du feed communautaire — plus aucun contenu généré par les utilisateurs
- **Chemin critique** : captures d'écran → trancher la déclaration DSA → compléter la fiche App Store → soumettre iOS

Aucune boutique n'a reçu de soumission : côté Apple, seuls des builds
TestFlight internes sont arrivés dans la fiche ; côté Google, rien n'a
été téléversé. Ce n'est pas le code qui retient la soumission — l'app compile,
passe l'analyse et ses tests sont verts. L'URL de confidentialité qui
bloquait tout existe depuis le 7 octobre 2026 ; restent les captures
et des champs de formulaire (le backend ne bloque plus rien depuis le 30 octobre 2026).

---

### 1. iOS · App Store

| | |
|---|---|
| État | **Jamais soumise** — restent l'installation à garnir, les captures et les champs de la fiche (le projet Supabase, inactif, ne bloque plus rien depuis le retrait des comptes le 30 octobre 2026) |
| Console | <https://appstoreconnect.apple.com> |
| Version publiée | aucune — l'app n'est jamais sortie |
| Version en cours | `1.0.0` — fiche App Store Connect créée (Apple ID `6762550020`), builds Xcode Cloud 95, 96, 97, 127 (30 octobre 2026) puis **134 (31 octobre 2026)** reçus ; aucune soumission |
| Distribution | Xcode Cloud, script `ios/ci_scripts/ci_post_clone.sh` — équipe `K597U7X3FZ` ; build 94 en échec le 24 octobre 2026, cible iOS relevée à 15.0 le 25 octobre ; builds 95 et 96 réussis le 25 octobre 2026, build 97 le 27 octobre, builds 122 et 125 en échec le 30 octobre (pin Flutter périmé) build 127 réussi le 30 octobre 2026 et **build 134 réussi le 31 octobre 2026**, disponible en TestFlight |
| Familles d'appareils | `TARGETED_DEVICE_FAMILY = "1,2"` → iPhone **et** iPad |
| Orientation | portrait seul, `UIRequiresFullScreen = true` (renonce au multitâche iPad) |

**Ce qui est prêt.** Le texte de la fiche est écrit et les décomptes sont
vérifiés : nom, sous-titre, texte promotionnel, description
(2 341/4 000 caractères), mots-clés (98/100 octets), notes au testeur
(1 510/4 000 caractères). Le questionnaire de confidentialité, celui de
la classification par âge et la déclaration de chiffrement ont leurs
réponses. Tout est rassemblé dans `docs/FICHE_APP_STORE.md`, prêt à
coller champ par champ.

**Ce qui bloque, dans l'ordre.** Les trois URL de la fiche existent
désormais — assistance et marketing `https://kultiva.toakeur.com`,
confidentialité `https://kultiva.toakeur.com/privacy.html` — et restent à
coller dans App Store Connect (à vérifier dans la console). Le testeur Apple n'a plus ni connexion ni suppression de compte à
essayer : l'app n'en a plus depuis le 30 octobre 2026. Restent
le **numéro de téléphone** des informations de revue, les **captures
d'écran** (8 en iPhone 6,9″ et, l'iPad étant conservé, 8 en iPad 13″ au
format 2064 × 2752), et la déclaration DSA dans *Entreprise → Accords →
Digital Services Act* : le statut de trader avait été choisi pour les
liens d'affiliation, retirés le 20 octobre 2026 puis revenus le 30 octobre
2026 ; il s'applique donc de nouveau, et les coordonnées seront publiques dans les 27 pays de l'UE (une boîte postale
est acceptée).

**Sur l'iPad.** L'app se lance en plein écran portrait sur iPadOS 26.5 et
produit des captures au format exact attendu par Apple. Les mises en page
s'adaptent — le catalogue passe à 8 colonnes au-delà de 900 points, les
grilles de badges et de défis se dimensionnent seules, et les tuiles de
statistiques du Poussidex passent de deux à quatre colonnes au-delà de
600 points. L'allure générale des écrans en 13 pouces n'a toujours pas
été jugée à l'œil : aucun simulateur iOS n'est installé sur le Mac, et
les tests ne voient qu'une chose, qu'une boîte ne déborde pas.

**Compte de démonstration.** Sans objet depuis le retrait des comptes :
laisse la case « Connexion requise » décochée dans App Store Connect. Il
reste à garnir une installation à la main pour les captures (deux ou
trois plants, une photo, un jardin dessiné) — des captures sur une app
vide ne vendent rien.

~~Il n'était plus obligatoire depuis le mode
invité livré le 24 août 2026 : le testeur accède à tout via « Continuer
sans compte ».~~

**Avertissement d'Apple corrigé.** Les builds 95, 96 et 97 ont été
acceptés, mais Apple signalait à chaque envoi l'erreur ITMS-90683 : la
clé `NSLocationAlwaysAndWhenInUseUsageDescription` manquait dans
`ios/Runner/Info.plist`. Elle a été ajoutée le 30 octobre 2026 —
`geolocator` embarque les APIs « Always » même si l'app ne s'en sert
pas, d'où la réclamation. Les builds 127 et 134 ont été envoyés après
l'ajout de la clé.

**Vérifié le 31 octobre 2026** (mails d'Apple) : la fiche existe pour
`com.toa.kultiva` (Apple ID `6762550020`) et reçoit les builds de Xcode
Cloud. **À vérifier dans la console** : l'état du contrat *Contenu
payant* si la distribution doit couvrir tous les pays.

---

### 2. Android · Google Play

| | |
|---|---|
| État | **Jamais envoyée — rien n'a été téléversé sur Play** |
| Console | <https://play.google.com/console> |
| Version publiée | aucune |
| Version en cours | App Bundle `1.0.0` (`versionCode 5`) — construit et vérifié localement le 23 août 2026, jamais téléversé |
| Distribution | App Bundle signé localement via `android/key.properties` (non commité, ignoré par git) |
| Signature | certificat RSA 2048 / SHA384 au nom de l'organisation `Kultiva`, créé le 21 avril 2026, valable jusqu'au **6 septembre 2053** |
| Niveaux d'API | valeurs par défaut de Flutter (`flutter.minSdkVersion`, `flutter.targetSdkVersion`, `flutter.compileSdkVersion` dans `android/app/build.gradle.kts`) — aucun chiffre figé dans le dépôt |
| Poids | 35 Mo d'assets ; la CI produit aussi des APK `--split-per-abi` |

**Ce qui est prêt.** Le build release fonctionne : il était cassé et a été
réparé le 23 août 2026 (Kotlin 2.1.20), puis vérifié par un
`flutter build appbundle --release` complet qui passe. Le *core library
desugaring* est actif, nécessaire à `flutter_local_notifications`. La CI
GitHub Actions construit l'App Bundle et les APK découpés par
architecture à chaque passage. Le `targetSdk` suit la version de
Flutter : à vérifier au premier envoi qu'il atteint le minimum exigé
par Play pour les nouvelles applications.

**Les textes existent déjà.** `docs/store-listings.md` contient la
description longue, la description courte (78/80 caractères) et des
variantes d'accroche par pays pour les storefronts d'Afrique de l'Ouest.

**Ce qui bloque.** Rien côté code. Tout le travail restant est dans la
console : créer la fiche, remplir la classification du contenu, le
questionnaire *Sécurité des données*, la déclaration d'identifiant
publicitaire — sur ce dernier point, l'app ne contient aucun SDK
publicitaire, donc aucune permission `AD_ID` ne devrait figurer au
manifeste fusionné.

**Le délai à anticiper.** Si le compte Play est un compte **personnel**
(à vérifier dans la console), Google impose **douze testeurs pendant
quatorze jours consécutifs** avant toute mise en production. Le décompte
ne démarre qu'au douzième inscrit, et s'inscrire veut dire ouvrir le lien
reçu et l'accepter — pas figurer sur une liste. C'est le seul délai
qu'aucune décision ne raccourcit : il mérite d'être lancé tôt, en
parallèle de la soumission iOS.

**À vérifier dans la console** : l'existence d'une fiche pour
`com.toa.kultiva`, le type de compte (personnel ou organisation), et si
la signature d'application par Play est activée.

---

### 3. Web · site de présentation

| | |
|---|---|
| Production | **En ligne** — <https://kultiva.toakeur.com> répond (vérifié le 31 octobre 2026) ; `/privacy.html` répondait le 28 octobre 2026 |
| Domaine & SSL | `kultiva.toakeur.com`, DNS chez Cloudflare (proxy actif), HTTPS valide ; contact affiché `kultiva@toakeur.com` |
| Visibilité | publié par GitHub Pages (derrière Cloudflare, vérifié le 31 octobre 2026) via `.github/workflows/site.yml` (dossier `landing/`) depuis le 7 octobre 2026 ; l'ancienne adresse `teiki5320.github.io/Kultiva/` sert la même page |

**Ce n'est pas une version web de l'app.** Le projet ne comporte que les
cibles `android` et `ios`. Le site compte parce qu'il fournit les URL
d'assistance, marketing et de confidentialité exigées par les boutiques.
`privacy.html` est tenue identique à la politique embarquée dans l'app
(`assets/tutos/privacy_policy.html`).

**Ce qui reste.** Remplacer les boutons *Télécharger* de
`landing/index.html`, qui pointent encore vers `href="#"`, par les liens
des boutiques une fois l'app publiée.

---

## Backend · aucun (décision du 30 octobre 2026)

**L'app ne contacte plus aucun serveur.** Les comptes ont été retirés de
la v1 : le jardin, les photos et les badges vivent uniquement sur
l'appareil. Les deux seuls appels sortants sont Open-Meteo
(météo, sans clé) et Sentry (plantages).

Le motif est factuel : le plan Supabase gratuit met en pause tout projet
après **une semaine sans trafic**. Une app non publiée n'a aucun trafic,
donc le projet se rendormait chaque semaine. Payer 25 $/mois pour zéro
utilisateur, ou passer deux jours à construire un backend que personne
n'utilise encore, n'avait pas de sens.

**Ce que ça débloque pour la soumission** : plus d'obligation Apple de
suppression de compte in-app, questionnaire de confidentialité réduit à
deux types (localisation, plantages), guideline 4.8 sans objet, et plus
de clés Google « Se connecter » à recréer.

**Ce que ça coûte** : changer de téléphone fait perdre le jardin.
Décision du 30 octobre : **pas d'export/import de fichier** — une
sauvegarde manuelle ne protège que ceux qui y pensent avant de casser
leur téléphone. Si la portabilité redevient un besoin, elle passera par
la synchro (Cloudflare, ci-dessous).

| | |
|---|---|
| Projet Supabase | `vkiwkeknfzwdvufcqbrp` — **inactif, inutilisé** (vérifié le 31 octobre 2026). Données et migrations conservées un an : **ne pas le supprimer**, il ne bloque plus rien |
| Retiré de l'app | `supabase_flutter`, `google_sign_in`, `sign_in_with_apple`, `crypto` (−36 paquets), l'entitlement Apple Sign-In et le schéma d'URL Google |
| Si la synchro revient | **Cloudflare** (Worker + D1 + R2) plutôt que Supabase : gratuit, ne s'endort jamais, juridiction EU disponible. Avec Google + Apple seulement, le Worker se contente de vérifier le jeton d'identité — aucun mot de passe à manipuler |

---

## Ce qui reste, dans l'ordre

1. ✅ **Site et confidentialité** : `kultiva.toakeur.com` et `/privacy.html` en ligne depuis le 7 octobre 2026.
2. ✅ **Adresse de contact** : `kultiva@toakeur.com` sur le site, la confidentialité et les textes des fiches.
3. ✅ **Backend supprimé** : les comptes ont été retirés de la v1 le 30 octobre 2026. Plus rien à rallumer, plus de clés Google à recréer.
4. **Compléter la fiche App Store** : fiche créée (Apple ID `6762550020`) ; restent les trois URL, l'adresse de contact, la déclaration DSA (trader) et le téléphone de revue.
5. **Garnir une installation pour les captures** : 2 ou 3 plants, une photo, un jardin dessiné. Plus de compte de démonstration à créer.
6. **Captures d'écran** : 8 en iPhone 6,9″ (1320 × 2868) et 8 en iPad 13″ (2064 × 2752).
7. ✅ **Liens Amazon remis** : ôtés le 20 octobre 2026 (compte fermé), les 159 liens sont revenus le 30 octobre 2026 sous le tag `kultiva1-21`. ⚠️ Pense au statut trader (DSA) à la soumission.
8. ✅ **Clé de localisation** : `NSLocationAlwaysAndWhenInUseUsageDescription` ajoutée le 30 octobre 2026 (avertissement ITMS-90683) ; builds 127 et 134 envoyés depuis.
9. **Soumettre iOS** : le build 134 (31 octobre 2026) depuis `docs/FICHE_APP_STORE.md`.
10. **Créer la fiche Google Play** : puis lancer le test fermé sans attendre, ses quatorze jours courent en arrière-plan.
11. **Relier les boutons « Télécharger »** : remplacer les `href="#"` du site par les liens des boutiques (la mention « Partenaire Amazon » a été ôtée le 21 octobre 2026).

---

## Ce qui a été réglé depuis

- **Builds iOS reçus par App Store Connect** (25, 27, 30 et 31 octobre) — les
  builds Xcode Cloud 95, 96, 97, 127 puis 134 sont arrivés dans la fiche
  `6762550020` ; le 134 est disponible en TestFlight depuis le 31 octobre.
- **Liens Amazon remis** (30 octobre) — sous le tag `kultiva1-21`.
- **Site en ligne** (7 octobre) — `landing/` publié sur GitHub Pages à
  l'adresse `kultiva.toakeur.com`.
- **Adresse de contact** (7 octobre) — `kultiva@toakeur.com` partout
  (site, confidentialité, fiches des stores) à la place de l'ancienne
  adresse Gmail.
- **Liens Amazon retirés** (20 octobre) — le tag `kultiva-21` dépendait
  du compte Amazon Partenaires fermé le 18 octobre : les 159 liens
  « Acheter » ont été ôtés du catalogue, le bouton ne s'affiche plus.
- **Mention « Partenaire Amazon » ôtée du site** (21 octobre) — dernière
  trace de l'affiliation, dans le pied de page de `landing/index.html`.

## Ce qui a été réglé fin août 2026

- **Mode invité** (24 août) — l'app exigeait un compte au premier
  lancement alors que le calendrier, le catalogue, le potager et les
  tutos n'en ont pas besoin : rejet probable au titre de la
  guideline 5.1.1. « Continuer sans compte » est livré et vérifié sur
  simulateur, persistance comprise.
- **Feed communautaire retiré** (24 août) — l'écran n'avait jamais été
  branché, mais les défis téléversaient quand même les photos. Personne
  ne les voyait et aucun signalement n'existait, contre une promesse de
  communauté modérée dans la fiche et les deux politiques de
  confidentialité : rejet probable au titre de la guideline 1.2. Les
  photos restent désormais locales, ou dans le cloud privé du compte.
  Conséquence utile : classification **4+ au lieu de 13+**.
- **Réglage de debug masqué** (24 août) — « Heure de test (debug) »
  n'avait aucun garde `kDebugMode` et serait apparu à tous les
  utilisateurs.
- **Build Android réparé** (23 août) — Kotlin 2.1.20 ; vérifié par un
  `flutter build appbundle --release` complet.
- **Décision DSA** (24 août) — les liens d'affiliation sont conservés,
  donc statut **trader**. Ces liens ont été retirés le 20 octobre 2026 :
  décision à revoir.
- **Chiffres marketing corrigés** (24 août) — une passe antérieure avait
  gonflé défis et badges de 50 à 51 dans toutes les fiches. Le catalogue
  en contient bien 50 et 50. Le chiffre de 33 tutoriels, lui, était
  juste.
