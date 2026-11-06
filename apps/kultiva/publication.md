# PUBLICATION — état des boutiques

> Mis à jour le 6 novembre 2026. Pour mettre à jour :
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

- **Version commune** : `1.0.0+5` (`pubspec.yaml`), jamais soumise — projet en pause (choix de Jean)
- **Identifiant de bundle** : `com.toa.kultiva` (iOS et Android)
- **Monétisation** : gratuite ; ni pub ni achat intégré, mais affiliation Amazon en France (liens remis le 30 octobre 2026, tag `kultiva1-21`)
- **Comptes** : **aucun** depuis le 30 octobre 2026 — ni connexion, ni serveur, ni synchronisation
- **Confidentialité** : <https://kultiva.toakeur.com/privacy.html> — **en ligne** (200, vérifié le 6 novembre 2026) ; exigée par les deux boutiques
- **Contact** : `kultiva@toakeur.com`

## Boutiques

| | 🍎 App Store | 🤖 Google Play |
|---|---|---|
| État | [pas encore] jamais soumise ; fiche App Store Connect (Apple ID `6762550020`) remplie le 4 novembre 2026, build impossible à rattacher ; dernier build reçu : 233 (5 novembre 2026) | [pas encore] jamais envoyée ; app créée et fiche Play Store remplie le 4 novembre 2026, rien de téléversé |
| Construction | [ok] Xcode Cloud (`ci_post_clone.sh`, Flutter 3.47.3) : **build 233 réussi le 5 novembre 2026** (9 h 21 UTC), disponible en TestFlight (vérifié le 6 novembre 2026 dans les mails d'Apple) ; le build 231 avait réussi le 4 novembre 2026 (15 h 58 UTC), comme tous les builds du 4 novembre depuis le 222 ; le build 220 avait réussi le 3 novembre 2026 au soir ; le build 195 avait réussi dans la nuit du 2 au 3 novembre 2026 ; tous les builds du 2 novembre, du 166 au 195, ont réussi ; le build 165 avait échoué le 1er novembre 2026 au soir dans `ci_post_clone.sh`, les autres builds du 1er novembre (dont le 152 et le 164) avaient réussi, comme ceux depuis le 31 octobre (dont le 134) ; build 127 réussi le 30 octobre 2026, après deux échecs le même soir (122 et 125, pin Flutter devenu plus ancien que le code). Auparavant : builds 95 et 96 réussis le 25 octobre 2026, build 97 le 27 octobre, avec l'étape « TestFlight internes - iOS » (vérifié le 28 octobre 2026) ; le build 94 avait échoué le 24 octobre | [ok] App Bundle construit par la CI GitHub Actions ; plantage au lancement en release corrigé le 3 novembre 2026 |
| Signature | [ok] gérée par Xcode Cloud, équipe `K597U7X3FZ` | [ok] keystore local, valable jusqu'en 2053 |
| Classification | [ok] 4+ posée le 4 novembre 2026 (172 pays) | [à faire] classification IARC, qui exige une acceptation de Jean |
| Cible | [ok] iOS 15.0 et plus (depuis le 25 octobre 2026 : Xcode et les pods, dont Sentry, l’exigent ; avant : 13.0), iPhone en portrait, iPad dans les quatre sens | [ok] valeurs par défaut de Flutter, rien de figé dans le dépôt |
| Permissions | [ok] caméra, photos, localisation en français ; clé `NSLocationAlwaysAndWhenInUseUsageDescription` ajoutée le 30 octobre 2026 (fin de l'avertissement ITMS-90683) | [ok] localisation, notifications, alarmes exactes |
| Poids | [pas encore] à mesurer au premier envoi (21 Mo d'assets depuis le ménage du 2 novembre 2026, contre 37 Mo avant) | [ok] 48,6 Mio au téléchargement (release arm64, mesuré le 1er novembre 2026, avant l'ajout des 130 légumes détourés et le retrait de 16 Mo d'images inutilisées, tous deux le 2 novembre) |

## Vue d'ensemble

- **État du projet** : **en pause** (choix de Jean) — rien n'est soumis aux boutiques
- **iOS** : jamais soumise — la fiche App Store Connect (Apple ID `6762550020`) a été **remplie le 4 novembre 2026** (16 captures, textes, URL, classification 4+, déclaration DSA déjà faite), mais le build reste impossible à rattacher. Dernier build : le **233**, réussi le 5 novembre 2026 et disponible en TestFlight (vérifié le 6 novembre 2026 dans les mails d'Apple) ; le 231 avait réussi le 4 novembre 2026 ; avant lui, de nombreux builds depuis le 95 du 25 octobre 2026 (le 94 avait échoué le 24 octobre, cible iOS trop basse ; le 165 le 1er novembre au soir). La clé de localisation que réclamait Apple (ITMS-90683) a été ajoutée le 30 octobre 2026
- **Android** : jamais envoyée à Play. L'app `Kultiva : potager kawaii` a été **créée dans la console le 4 novembre 2026** (aucune fiche Kultiva n'existait avant, `com.toa.kultiva` était disponible) et sa fiche Play Store remplie le même jour. Restent la classification IARC, la cible, la sécurité des données (en brouillon), le statut de professionnel et le test fermé de 14 jours. App Bundle signé reconstruit le 4 novembre 2026 — premier à porter le correctif du plantage au lancement en release. Marche à suivre complète : `docs/FICHE_PLAY.md`
- **Web** : site de présentation <https://kultiva.toakeur.com>, en ligne depuis le 7 octobre 2026. Il a répondu **404 du 3 au 4 novembre 2026**, le dépôt étant passé en privé : GitHub avait alors **supprimé** le site Pages. Dépôt repassé en public et site recréé le 4 novembre 2026 ; `/privacy.html` répond aussi (200, vérifié)
- **Backend** : **aucun**. Les comptes ont été retirés de la v1 le 30 octobre 2026 — le jardin vit sur l'appareil. Le projet Supabase reste inactif (vérifié le 4 novembre 2026), inutilisé, et ne bloque plus rien
- **Monétisation** : affiliation Amazon en France. Les 159 liens, retirés le 20 octobre 2026 (compte fermé le 18), sont **revenus le 30 octobre 2026** sous le tag `kultiva1-21`. ⚠️ Le statut **trader** au sens du DSA, décidé le 24 août 2026 à cause de ces liens, redevient donc applicable : déjà déclaré dans App Store Connect (constaté le 4 novembre 2026), reste à déclarer dans la Play Console
- **Classification attendue** : **4+** depuis le retrait du feed communautaire — plus aucun contenu généré par les utilisateurs
- **Chemin critique** : la fiche App Store est remplie au 4 novembre 2026 (16 captures, textes, URL, version 1.0.0, droits d'auteur, sous-titre, catégories, classification **4+**, notes au testeur, publication manuelle). Restent **le numéro de téléphone de revue** — seule erreur affichée par la page — le **questionnaire de confidentialité**, les **tarifs et la disponibilité**, et le **build**, que la console refuse de rattacher (voir `docs/FICHE_APP_STORE.md`) → soumettre iOS. Côté Play, la fiche est remplie depuis le 4 novembre 2026 ; restent IARC → cible → sécurité des données, le statut de professionnel et le test fermé (`docs/FICHE_PLAY.md`). Les captures Apple ont été **refaites le 4 novembre 2026** : 10 en iPhone 6,9″ et 6 en iPad 13″, dans `captures/`

Aucune boutique n'a reçu de soumission : côté Apple, seuls des builds
TestFlight internes sont arrivés dans la fiche ; côté Google, rien n'a
été téléversé. Ce n'est pas le code qui retient la soumission — l'app compile,
passe l'analyse et ses tests sont verts. L'URL de confidentialité est
revenue en ligne le 4 novembre 2026 ; les captures Google Play et Apple
sont prises et posées dans les deux fiches (4 novembre 2026) ;
restent des champs de formulaire, le rattachement du build iOS et le test fermé Play (le backend ne bloque plus rien depuis le 30 octobre 2026).

---

### 1. iOS · App Store

| | |
|---|---|
| État | **Jamais soumise** — fiche remplie le 4 novembre 2026 (16 captures, textes, classification 4+) ; restent le téléphone de revue, le questionnaire de confidentialité, les tarifs et le rattachement du build, impossible au 4 novembre 2026 |
| Console | <https://appstoreconnect.apple.com> |
| Version publiée | aucune — l'app n'est jamais sortie |
| Version en cours | `1.0.0` — fiche App Store Connect créée (Apple ID `6762550020`), builds Xcode Cloud 95, 96, 97, 127 (30 octobre 2026), 134 (31 octobre 2026), 152 (1er novembre 2026), 166 (2 novembre 2026), 195 (nuit du 2 au 3 novembre 2026), 220 (3 novembre 2026 au soir) puis 222 à 231 (4 novembre 2026) et **233 (5 novembre 2026)** reçus ; aucune soumission |
| Distribution | Xcode Cloud, script `ios/ci_scripts/ci_post_clone.sh` — équipe `K597U7X3FZ` ; build 94 en échec le 24 octobre 2026, cible iOS relevée à 15.0 le 25 octobre ; builds 95 et 96 réussis le 25 octobre 2026, build 97 le 27 octobre, builds 122 et 125 en échec le 30 octobre (pin Flutter périmé), build 127 réussi le 30 octobre 2026, build 134 le 31 octobre 2026, build 152 le 1er novembre 2026, build 165 en échec le 1er novembre au soir (`ci_post_clone.sh`), build 166 réussi le 2 novembre 2026, build 195 dans la nuit du 2 au 3 novembre 2026, build 220 le 3 novembre 2026 au soir, build 231 le 4 novembre 2026 et **build 233 réussi le 5 novembre 2026**, disponible en TestFlight |
| Familles d'appareils | `TARGETED_DEVICE_FAMILY = "1,2"` → iPhone **et** iPad |
| Orientation | iPhone en portrait seul ; iPad dans les quatre sens depuis le 30 octobre 2026 ; `UIRequiresFullScreen = true` (renonce au multitâche iPad) |

**Ce qui est prêt.** Le texte de la fiche est écrit et les décomptes sont
vérifiés : nom, sous-titre, texte promotionnel, description
(2 341/4 000 caractères), mots-clés (98/100 octets), notes au testeur
(1 510/4 000 caractères). Le questionnaire de confidentialité, celui de
la classification par âge et la déclaration de chiffrement ont leurs
réponses. Tout est rassemblé dans `docs/FICHE_APP_STORE.md`, prêt à
coller champ par champ.

**Ce qui bloque, dans l'ordre.** Les trois URL de la fiche —
assistance et marketing `https://kultiva.toakeur.com`, confidentialité
`https://kultiva.toakeur.com/privacy.html` — répondent (vérifié le
5 novembre 2026) et ont été collées dans App Store Connect le
4 novembre 2026. Le testeur Apple n'a plus ni connexion ni suppression de compte à
essayer : l'app n'en a plus depuis le 30 octobre 2026. Les **captures d'écran** sont faites
**refaites le 4 novembre 2026** : 10 en iPhone 6,9″ (1320 × 2868)
et 6 en iPad 13″ (2064 × 2752), dans `captures/`. Les 14 du
3 novembre avaient été effacées le matin même par un `flutter clean`,
qui vide `build/`. Elles ont été posées dans la fiche le 4 novembre 2026, comme la
classification 4+ ; la déclaration DSA de commerçant était déjà faite.
Restent le **numéro de téléphone** des informations de revue, le
questionnaire de confidentialité, les tarifs et la disponibilité, et
surtout le **build**, que la console refuse de rattacher : tous, jusqu'au
231, étaient grisés (constaté le 4 novembre 2026, cause non trouvée — voir
`docs/FICHE_APP_STORE.md`) ; le 233, reçu le 5 novembre 2026, reste à
essayer — à vérifier dans la console.

**Sur l'iPad.** L'app se lance en plein écran portrait sur iPadOS 26.5 et
produit des captures au format exact attendu par Apple. Les mises en page
s'adaptent — le catalogue passe à 8 colonnes au-delà de 900 points, les
grilles de badges et de défis se dimensionnent seules.

Les écrans ont été **regardés sur un iPad Pro 13″ le 3 novembre 2026**,
et l'ergonomie y a été corrigée le même jour. Avant : les six cartes du
tableau de bord mesuraient 510 points de large pour 138 de haut, une
phrase traversait l'écran d'un bord à l'autre, et une feuille modale
occupait les 1 032 points. Depuis : le contenu est borné et centré
(720 points, 560 pour le tableau de bord et les feuilles modales), avec
**une exception voulue**, l'Étal, dont la grille se répartit toute seule
et profite de la largeur. Le bandeau de saison reste dans la colonne.

Restent deux défauts d'allure, connus et non bloquants : le logo du
splash natif s'affiche à sa taille de téléphone au milieu d'un écran de
13 pouces, et le bas de l'écran est vide sur les pages courtes.

**Compte de démonstration.** Sans objet depuis le retrait des comptes :
laisse la case « Connexion requise » décochée dans App Store Connect.

**Garnir une installation pour les captures** ne se fait plus à la
main : `tool/garnir_simulateur.py` écrit le jardin dans les
préférences du simulateur — 6 plants avec leurs arrosages et récoltes
datés, un potager 4×4 à six cases, 13 badges débloqués. ⚠️ Redémarrer
le simulateur après l'écriture, sinon iOS sert ses préférences depuis
son cache et rien ne change à l'écran.

~~Il n'était plus obligatoire depuis le mode
invité livré le 24 août 2026 : le testeur accède à tout via « Continuer
sans compte ».~~

**Avertissement d'Apple corrigé.** Les builds 95, 96 et 97 ont été
acceptés, mais Apple signalait à chaque envoi l'erreur ITMS-90683 : la
clé `NSLocationAlwaysAndWhenInUseUsageDescription` manquait dans
`ios/Runner/Info.plist`. Elle a été ajoutée le 30 octobre 2026 —
`geolocator` embarque les APIs « Always » même si l'app ne s'en sert
pas, d'où la réclamation. Les builds 127, 134 et suivants (jusqu'au 233) ont été envoyés après
l'ajout de la clé.

**Vérifié le 1er novembre 2026** (mails d'Apple) : la fiche existe pour
`com.toa.kultiva` (Apple ID `6762550020`) et reçoit les builds de Xcode
Cloud. **À vérifier dans la console** : l'état du contrat *Contenu
payant* si la distribution doit couvrir tous les pays.

---

### 2. Android · Google Play

| | |
|---|---|
| État | **Jamais envoyée.** App créée le 4 novembre 2026 (`Kultiva : potager kawaii`) ; fiche Play Store remplie — nom, descriptions, icône, bannière, 8 captures, catégorie Style de vie, coordonnées |
| Console | <https://play.google.com/console> — compte **Toa**, ID `4741246028443998966`, **compte personnel** (lu dans la console le 4 novembre 2026) |
| Version publiée | aucune |
| Version en cours | App Bundle `1.0.0` (`versionCode 5`) — construit par la CI à chaque envoi, et **reconstruit en local le 4 novembre 2026** : c'est le premier à porter le correctif R8 du 3 novembre, qui répare le plantage au lancement en release. ⚠️ Celui du 23 août 2026 ne l'a pas : ne pas le téléverser |
| Distribution | App Bundle signé localement via `android/key.properties` (non commité, ignoré par git) |
| Signature | certificat RSA 2048 / SHA384 au nom de l'organisation `Kultiva`, créé le 21 avril 2026, valable jusqu'au **6 septembre 2053** |
| Niveaux d'API | valeurs par défaut de Flutter, lues dans le bundle livré le 4 novembre 2026 : `minSdk` **24**, `targetSdk` **36** — au-delà du minimum exigé par Play |
| Poids | 48,6 Mio au téléchargement (release arm64, mesuré le 1er novembre 2026, avant l'ajout des 130 légumes détourés du 2 novembre) ; 21 Mo d'assets depuis le retrait de 16 Mo d'images inutilisées le 2 novembre 2026 (37 Mo avant) ; la CI produit aussi des APK `--split-per-abi` |

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

**Ce qui bloque.** Rien côté code. L'app est créée et la fiche remplie
depuis le 4 novembre 2026, « annonces » déclaré **Non**. Restent, dans
l'ordre imposé par la console, la classification **IARC** (conditions
d'un tiers à accepter par Jean), « Cible et contenu », puis « Sécurité
des données » (réponses en brouillon) ; le statut de professionnel
(acceptation de Jean) ; et le test fermé. `docs/FICHE_PLAY.md` donne
les réponses page par page.

⚠️ **L'identifiant publicitaire est réglé, et c'est une mesure.** Cette
fiche disait qu'aucune permission `AD_ID` « ne devrait » figurer. Le
manifeste du bundle livré le 4 novembre 2026 a été lu : il demande
exactement sept permissions — `INTERNET`, `VIBRATE`,
`POST_NOTIFICATIONS`, `RECEIVE_BOOT_COMPLETED`, `SCHEDULE_EXACT_ALARM`,
`ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION` — et **pas `AD_ID`**.

**Le délai à anticiper.** Le compte **est** personnel (lu dans la
console le 4 novembre 2026), et Google impose alors **douze testeurs
pendant quatorze jours consécutifs** avant toute mise en production.

⚠️ **Et ce n'est pas purgé — ma déduction était fausse.** J'avais
écrit que l'obligation visant le compte et non l'application, Erea
étant déjà en production, Kultiva n'aurait rien à attendre. Le
tableau de bord de Kultiva dit le contraire, noir sur blanc :
« Publier une version de test fermé », « Avoir au moins 12 testeurs
inscrits — *0 testeur actuellement inscrit* », « Exécuter votre test
fermé avec au moins 12 testeurs pour au moins 14 jours ».
**Mesurer avant de citer** : la page existait, il suffisait de
l'ouvrir. Le décompte
ne démarre qu'au douzième inscrit, et s'inscrire veut dire ouvrir le lien
reçu et l'accepter — pas figurer sur une liste. C'est le seul délai
qu'aucune décision ne raccourcit : il mérite d'être lancé tôt, en
parallèle de la soumission iOS.

**Vérifié dans la console le 4 novembre 2026** : aucune fiche
`com.toa.kultiva` n'existait encore (le compte ne portait qu'Erea, en
production, et Palabre, en brouillon), le compte est **personnel** ;
l'app a été créée le même jour. **Reste à vérifier** : que la
signature d'application par Play soit activée à la création de la
première version — sans elle, perdre le keystore rendrait toute mise à
jour impossible.

---

### 3. Web · site de présentation

| | |
|---|---|
| Production | **En ligne** — <https://kultiva.toakeur.com> et `/privacy.html` répondent 200 (vérifié le 6 novembre 2026). Interruption du 3 au 4 novembre 2026, le temps que le dépôt soit repassé en public |
| Domaine & SSL | `kultiva.toakeur.com`, DNS chez Cloudflare (proxy actif), HTTPS valide ; le domaine est porté par **`landing/CNAME`** depuis le 4 novembre 2026, et non plus par un réglage de la console ; contact du site `kultiva@toakeur.com` (dans `landing/`) |
| Visibilité | publié par GitHub Pages via `.github/workflows/site.yml` (dossier `landing/`) depuis le 7 octobre 2026. ⚠️ Passer le dépôt en **privé** ne suspend pas le site : GitHub le **supprime** (l'API `/pages` répondait 404). Il a fallu repasser le dépôt en public et recréer le site, le 4 novembre 2026 |
| Mesure d'audience | Umami (offre gratuite, UE, sans cookie) sur l'accueil et la confidentialité depuis le 5 novembre 2026 (balise en ligne, vérifié le 6 novembre 2026) ; l'app, elle, n'a aucune mesure |

**Ce n'est pas une version web de l'app.** Le projet ne comporte que les
cibles `android` et `ios`. Le site compte parce qu'il fournit les URL
d'assistance, marketing et de confidentialité exigées par les boutiques.
`privacy.html` est tenue identique à la politique embarquée dans l'app
(`assets/tutos/privacy_policy.html`).

**Ce qui reste.** Remplacer
les deux boutons *Télécharger* de `landing/index.html`, inertes
(« Bientôt sur l'App Store » / « Bientôt sur Google Play »), par les
liens des boutiques une fois l'app publiée.

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
| Projet Supabase | `vkiwkeknfzwdvufcqbrp` — **inactif, inutilisé** (vérifié le 4 novembre 2026). Données et migrations conservées un an : **ne pas le supprimer**, il ne bloque plus rien |
| Retiré de l'app | `supabase_flutter`, `google_sign_in`, `sign_in_with_apple`, `crypto` (−36 paquets), l'entitlement Apple Sign-In et le schéma d'URL Google |
| Si la synchro revient | **Cloudflare** (Worker + D1 + R2) plutôt que Supabase : gratuit, ne s'endort jamais, juridiction EU disponible. Avec Google + Apple seulement, le Worker se contente de vérifier le jeton d'identité — aucun mot de passe à manipuler |

---

## Ce qui reste, dans l'ordre

1. ✅ **Site et confidentialité** : remis en ligne le 4 novembre 2026 — dépôt repassé en public, site Pages recréé, et le domaine fixé dans `landing/CNAME` pour qu'il ne se reperde plus.
2. ✅ **Adresse de contact** : `kultiva@toakeur.com` sur le site, la confidentialité et les textes des fiches.
3. ✅ **Backend supprimé** : les comptes ont été retirés de la v1 le 30 octobre 2026. Plus rien à rallumer, plus de clés Google à recréer.
4. **Compléter la fiche App Store** : remplie le 4 novembre 2026 — URL, textes, 16 captures, classification 4+, notes au testeur, publication manuelle, déclaration DSA. Restent le **téléphone de revue**, le questionnaire de confidentialité, les tarifs, et le **build** (impossible à rattacher jusqu'au 231 le 4 novembre 2026 ; le 233 reste à essayer).
5. ✅ **Garnir une installation pour les captures** : fait, et outillé — `tool/garnir_simulateur.py`.
6. ✅ **Captures d'écran Apple — refaites le 4 novembre 2026.**
    **10 en iPhone 6,9″** (1320 × 2868) : tableau de bord, cahier de
    culture, potager carré, Étal, fiche tomate, Garder ta récolte,
    **météo**, à semer en novembre, badges, journal. **6 en
    iPad 13″** (2064 × 2752) : tableau de bord, cahier, potager
    carré, Étal, Garder ta récolte, tutos. Dans `captures/`.

    Les 14 du 3 novembre étaient dans `build/captures/`, qu'un
    `flutter clean` a vidé le matin du 4. ⚠️ **`build/` est le
    dossier de travail du compilateur** : une livraison n'y a rien à
    faire. `captures/` est ignoré par git mais hors de portée d'un
    `clean`.

    ⚠️ **Et les simulateurs avaient disparu avec**, tous :
    `~/Library/Developer/CoreSimulator` pesait 0 octet, les appareils
    étaient déclarés par `simctl` sans données sur le disque. Le
    runtime iOS 27.2, lui, était intact — deux appareils neufs
    recréés en une commande.

    ⚠️ **Deux pièges du pilotage par `simctl`**, tous deux rencontrés :
    le **collage de texte échoue en silence** (la recherche d'un
    légume est donc inatteignable, il faut filtrer par catégorie), et
    une **fiche poussée n'a pas de barre d'onglets** — taper à
    l'emplacement habituel touche le bouton flottant « Je l'ai
    planté », ce qui ajoute un plant et fausse les captures
    suivantes.
6 bis. ✅ **Captures d'écran Google Play — faites le 4 novembre 2026.** Dix captures en **1080 × 1920** (dans `captures/`, ignoré par git, depuis le 4 novembre 2026), dont huit posées dans la fiche Play : tableau de bord, « à semer en novembre », cahier de culture, potager carré, journal, « Garder ta récolte », fiche tomate, badges, plus l'Étal et « au jardin en ce moment » en réserve. Play en accepte huit par type d'appareil.

    **Pourquoi il a fallu un émulateur Android** : aucune des 14 captures Apple ne convenait. Play exige que le côté le plus long fasse **moins du double** du côté le plus court, et l'iPhone 6,9″ est à 2,17 (1320 × 2868). Celles-ci sont à **1,78**, le 9:16 que Play recommande.

    ⚠️ **L'alpha** : `adb screencap` rend du PNG **RGBA**, que Play peut refuser (« PNG 24 bits sans canal alpha »). `tool/sans_alpha.py` le retire sans recompresser — passer par du JPEG abîmerait le texte, qui est ce qu'une capture de boutique montre le plus.

    ⬜ **Il manque l'écran Météo 7 jours**, qui était prévu. Il ne s'ouvre que si la météo a chargé, donc il faut la localisation ; et l'accorder dans l'émulateur déclenche en boucle la boîte « Location Accuracy » de Google Play Services, qui reste au premier plan. À prendre sur un vrai téléphone Android.

    ✅ **Et cette installation a servi à autre chose** : elle a trouvé que l'app **plantait au lancement en release sur Android**, pour tout le monde. Corrigé le 3 novembre 2026 (`android/app/proguard-rules.pro`), détail dans l'alerte 26 de `CLAUDE.md`.
7. ✅ **Liens Amazon remis** : ôtés le 20 octobre 2026 (compte fermé), les 159 liens sont revenus le 30 octobre 2026 sous le tag `kultiva1-21`. ⚠️ Pense au statut trader (DSA) à la soumission.
8. ✅ **Clé de localisation** : `NSLocationAlwaysAndWhenInUseUsageDescription` ajoutée le 30 octobre 2026 (avertissement ITMS-90683) ; builds 127 à 220 envoyés depuis.
9. **Soumettre iOS** : le build le plus récent (233, 5 novembre 2026, en TestFlight) depuis `docs/FICHE_APP_STORE.md`, une fois le rattachement débloqué.
10. **Finir la fiche Google Play** : ✅ app créée et fiche Play Store
    remplie le 4 novembre 2026 (textes, icône 512, bannière 1024 × 500,
    huit captures). Restent la classification IARC et le statut de
    professionnel, que seul Jean peut accepter, puis « Cible et
    contenu » et « Sécurité des données » (en brouillon). Lancer ensuite
    le test fermé : 12 testeurs pendant 14 jours, obligatoires pour ce
    compte personnel (§ Android).
11. **Relier les boutons « Télécharger »** : le site n'a plus de `href="#"` — les deux boutons sont inertes et disent « Bientôt sur l'App Store » / « Bientôt sur Google Play ». À remplacer par de vrais liens une fois l'app en ligne.
12. ⬜ **Le disque du Mac est plein** : **5 Go libres** le 4 novembre 2026, et l'émulateur refuse de démarrer sous 1 Go. Le swap monte à 16 Go pendant une session d'émulateur, puis se résorbe.

    ⚠️ **Correction d'une erreur de cette fiche** : elle annonçait 82 Go récupérables dans `~/Library/Developer/CoreDevice/DeviceFS`. C'est **faux**. Ce chemin est un **point de montage** (`devicefs`), pas un dossier : `du` y mesure le contenu des iPhone vus à travers le montage. Le dossier réel pèse **4 Ko**, et l'effacer n'aurait rien libéré. Mesuré avec `mount` et `du -x`, qui ne traverse pas les montages.

    **Les vrais gros postes, mesurés** : `~/Library/Developer/CoreSimulator` 11 Go (les runtimes et appareils iOS), `~/Dev` 18 Go, `~/Pictures` 9,7 Go. Rien n'a été supprimé.


---

## Ce qui a été réglé depuis

- **Builds iOS reçus par App Store Connect** (25, 27, 30, 31 octobre et
  1er, 2 et 3 novembre) — les builds Xcode Cloud 95, 96, 97, 127, 134, 152, 166 puis 195 sont
  arrivés dans la fiche `6762550020`, puis le 220 le 3 novembre au soir,
  du 222 au 231 le 4 novembre, et le 233 le 5 novembre, disponibles en TestFlight.
- **Liens Amazon remis** (30 octobre) — sous le tag `kultiva1-21`.
- **Site en ligne** (7 octobre) — `landing/` publié sur GitHub Pages à
  l'adresse `kultiva.toakeur.com`. Coupé du 3 au 4 novembre (dépôt
  privé), rétabli le 4 novembre.
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
  donc statut **trader**. Ces liens, retirés le 20 octobre 2026, sont
  revenus le 30 octobre 2026 : le statut de trader reste celui à déclarer
  (fait dans App Store Connect, constaté le 4 novembre 2026).
- **Chiffres marketing corrigés** (24 août) — une passe antérieure avait
  gonflé défis et badges de 50 à 51 dans toutes les fiches. Le catalogue
  en contient bien 50 et 50. Le chiffre de 33 tutoriels, lui, était
  juste.
