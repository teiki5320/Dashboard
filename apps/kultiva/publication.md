# PUBLICATION — état des boutiques

> Généré le 6 septembre 2026 d'après les consoles. Pour mettre à jour :
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

## Vue d'ensemble

- **iOS** : jamais soumise — la fiche est rédigée et le build Xcode Cloud fonctionne, mais l'URL de confidentialité manque
- **Android** : jamais envoyée à Play — le bundle release est signé et vérifié localement ; l'existence d'une fiche Play reste à vérifier dans la console
- **Web** : site vitrine prêt, non déployé — c'est lui qui débloque les deux boutiques
- **Version commune** : `1.0.0+5` (`pubspec.yaml`) → `versionName 1.0.0` / `versionCode 5` côté Android, `CFBundleShortVersionString` et `CFBundleVersion` dérivés côté iOS
- **Identifiant** : `com.toa.kultiva`, identique sur les deux plateformes
- **Monétisation** : ni publicité ni achat intégré. 159 liens d'affiliation Amazon (tag `kultiva-21`), masqués en Afrique de l'Ouest — d'où le statut **trader** au sens du DSA, décidé le 24 août 2026
- **Classification attendue** : **4+** depuis le retrait du feed communautaire — plus aucun contenu généré par les utilisateurs
- **Chemin critique** : déployer la landing → récupérer l'URL de confidentialité → soumettre iOS

Les deux boutiques sont au même point de départ, et pour la même raison :
rien n'a jamais été envoyé. Ce n'est pas le code qui retient la
soumission — l'app compile, passe l'analyse, ses 187 tests sont verts et
elle a été vérifiée sur simulateur. Ce qui manque tient à quatre champs
de formulaire, dont trois attendent une URL qui n'existe pas encore.

---

### 1. iOS · App Store

| | |
|---|---|
| État | **Jamais soumise — bloquée sur l'URL de confidentialité** |
| Console | <https://appstoreconnect.apple.com> |
| Version publiée | aucune — l'app n'est jamais sortie |
| Version en cours | `1.0.0` (build `5`) — aucune soumission ; l'existence d'une fiche ASC est **à vérifier dans la console** |
| Distribution | Xcode Cloud, script `ios/ci_scripts/ci_post_clone.sh` — équipe `K597U7X3FZ` |
| Familles d'appareils | `TARGETED_DEVICE_FAMILY = "1,2"` → iPhone **et** iPad |
| Orientation | portrait seul, `UIRequiresFullScreen = true` (renonce au multitâche iPad) |

**Ce qui est prêt.** Le texte de la fiche est écrit et les décomptes sont
vérifiés : nom, sous-titre, texte promotionnel, description
(2 341/4 000 caractères), mots-clés (98/100 octets), notes au testeur
(1 645/4 000 caractères). Le questionnaire de confidentialité, celui de
la classification par âge et la déclaration de chiffrement ont leurs
réponses. Tout est rassemblé dans `docs/FICHE_APP_STORE.md`, prêt à
coller champ par champ.

**Ce qui bloque, dans l'ordre.** L'**URL de la politique de
confidentialité** est obligatoire et n'existe pas tant que la landing
n'est pas en ligne — elle alimente aussi l'URL d'assistance et l'URL
marketing, soit trois champs pour un seul déploiement. Viennent ensuite
le **numéro de téléphone** des informations de revue, les **captures
d'écran** (8 en iPhone 6,9″ et, l'iPad étant conservé, 8 en iPad 13″ au
format 2064 × 2752), et les **coordonnées de trader** à saisir dans
*Entreprise → Accords → Digital Services Act*. Ces coordonnées seront
publiques dans les 27 pays de l'UE : une boîte postale est acceptée.

**Sur l'iPad.** L'app se lance en plein écran portrait sur iPadOS 26.5 et
produit des captures au format exact attendu par Apple. Les mises en page
s'adaptent pour l'essentiel — le catalogue passe à 8 colonnes au-delà de
900 points, les grilles de badges et de défis se dimensionnent seules. Une
grille reste figée à 2 colonnes (`lib/screens/home/poussidex/poussidex_stats.dart:85`),
ce qui donne deux cartes très larges sur 13 pouces. L'allure générale des
écrans en 13 pouces n'a pas encore été jugée.

**Compte de démonstration.** Il n'est plus obligatoire depuis le mode
invité livré le 24 août 2026 : le testeur accède à tout via « Continuer
sans compte ». En fournir un reste utile pour qu'il vérifie la
synchronisation cloud et la suppression de compte.

**À vérifier dans la console** : qu'une fiche existe bien pour
`com.toa.kultiva`, qu'un build Xcode Cloud y est monté, et l'état du
contrat *Contenu payant* si la distribution doit couvrir tous les pays.

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
| Niveaux d'API | `minSdk 24`, `targetSdk 36`, `compileSdk 36` |
| Poids | 35 Mo d'assets ; la CI produit aussi des APK `--split-per-abi` |

**Ce qui est prêt.** Le build release fonctionne : il était cassé et a été
réparé le 23 août 2026 (Kotlin 2.1.20), puis vérifié par un
`flutter build appbundle --release` complet qui passe. Le *core library
desugaring* est actif, nécessaire à `flutter_local_notifications`. La CI
GitHub Actions construit l'App Bundle et les APK découpés par
architecture à chaque passage. Le `targetSdk 36` dépasse le minimum
qu'exige Play pour les nouvelles applications.

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

### 3. Web · site vitrine

| | |
|---|---|
| État | **Prêt, non déployé — bloque les deux boutiques** |
| Console | <https://vercel.com/dashboard> |
| Version publiée | aucune. GitHub Pages servait le dépôt à l'adresse `teiki5320.github.io/Kultiva/` ; coupé le 24 août 2026 |
| Version en cours | `landing/` — `index.html`, `privacy.html`, images WebP, `vercel.json` |
| Distribution | Vercel, racine `landing/` |

**Ce n'est pas une version web de l'app.** Le projet ne comporte que les
cibles `android` et `ios` — il n'y a pas de dossier `web/`. Cette section
existe parce que le site vitrine est une surface de distribution à part
entière, et surtout parce qu'il est **sur le chemin critique des deux
boutiques** : c'est lui qui fournit l'URL de politique de
confidentialité, sans laquelle aucune soumission n'aboutit.

**Ce qui est prêt.** Le site est complet et allégé : les images sont
passées en WebP le 22 août 2026, faisant tomber le dossier de 5,6 Mo à
0,2 Mo. `vercel.json` fixe déjà le cache immuable sur `/img/`.
`privacy.html` est la version publique de la politique de
confidentialité, tenue identique à celle embarquée dans l'app
(`assets/tutos/privacy_policy.html`) — les deux ont été réalignées le
24 août après le retrait du feed communautaire.

**Ce qui reste.** Deux points, une fois le site en ligne : coller la
vraie URL dans les trois champs de la fiche App Store, et remplacer les
boutons *Télécharger* de `landing/index.html`, qui pointent encore vers
`href="#"`, par les liens des boutiques.

---

## Dépendance commune · Supabase

Ce n'est pas une boutique, mais aucune soumission ne tient sans lui : le
backend porte l'authentification, la synchronisation et la suppression de
compte in-app exigée par Apple.

| | |
|---|---|
| État | **Actif et vérifié le 24 août 2026** |
| Console | <https://supabase.com/dashboard> |
| Projet | `vkiwkeknfzwdvufcqbrp` (région Europe) |
| Migrations | `001` → `016`, toutes appliquées — vérifié par appels API |
| Edge function | `delete-account` déployée |

La clé `anon` présente dans `lib/config/supabase_config.dart` est un JWT
public : c'est son usage normal, elle n'est pas un secret.

---

## Ce qui reste, dans l'ordre

1. **Web** — déployer `landing/` sur Vercel. Tout le reste en dépend.
2. **iOS** — coller l'URL obtenue dans les trois champs : assistance,
   marketing, et politique de confidentialité (`/privacy.html`).
3. **Les deux** — activer la redirection de `kultiva.toa@gmail.com`,
   adresse de support publiée partout.
4. **iOS** — saisir les coordonnées de trader dans *Accords → Digital
   Services Act* (boîte postale acceptée), puis le téléphone des
   informations de revue.
5. **Les deux** — créer un compte de démonstration avec 2 ou 3
   plantations, une photo et un Tamassi entamé : il sert au testeur
   Apple **et** aux captures.
6. **Les deux** — prendre les captures : 8 en iPhone 6,9″ (1320 × 2868)
   et 8 en iPad 13″ (2064 × 2752).
7. **iOS** — soumettre depuis `docs/FICHE_APP_STORE.md`.
8. **Android** — créer la fiche Play, puis lancer le test fermé sans
   attendre : les quatorze jours courent en arrière-plan.
9. **Web** — après publication, remplacer les `href="#"` des boutons
   *Télécharger* par les liens des boutiques.

---

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
  donc statut **trader**.
- **Chiffres marketing corrigés** (24 août) — une passe antérieure avait
  gonflé défis et badges de 50 à 51 dans toutes les fiches. Le catalogue
  en contient bien 50 et 50. Le chiffre de 33 tutoriels, lui, était
  juste.
