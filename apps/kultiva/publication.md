# PUBLICATION — état des boutiques

> Mis à jour le 25 octobre 2026. Pour mettre à jour :
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
- **Monétisation** : gratuite ; ni pub, ni achat, ni affiliation (liens Amazon retirés le 20 octobre)
- **Confidentialité** : <https://kultiva.toakeur.com/privacy.html> en ligne
- **Contact** : `kultiva@toakeur.com`

## Boutiques

| | 🍎 App Store | 🤖 Google Play |
|---|---|---|
| État | [pas encore] jamais soumise ; fiche ASC à vérifier dans la console | [pas encore] jamais envoyée ; fiche à vérifier dans la console |
| Construction | [à faire] Xcode Cloud (`ci_post_clone.sh`, Flutter 3.41.6) : build 94 en échec le 24 octobre 2026, corrigé le 25 octobre ; build suivant à vérifier dans la console | [ok] App Bundle construit par la CI GitHub Actions |
| Signature | [ok] gérée par Xcode Cloud, équipe `K597U7X3FZ` | [ok] keystore local, valable jusqu'en 2053 |
| Classification | [à faire] 4+ attendu, questionnaire prêt à reporter | [à faire] questionnaire de contenu à remplir |
| Cible | [ok] iOS 15.0 et plus (depuis le 25 octobre 2026 : Xcode et les pods, dont Sentry, l’exigent ; avant : 13.0), iPhone et iPad, portrait | [ok] valeurs par défaut de Flutter, rien de figé dans le dépôt |
| Permissions | [ok] caméra, photos, localisation (textes en français) | [ok] localisation, notifications, alarmes exactes |
| Poids | [pas encore] à mesurer au premier envoi (35 Mo d'assets) | [pas encore] à mesurer au premier envoi (35 Mo d'assets) |

## Vue d'ensemble

- **iOS** : jamais soumise — la fiche est rédigée et l'URL de confidentialité existe ; le build Xcode Cloud 94 a échoué le 24 octobre 2026 (cible iOS trop basse), corrigé le 25 octobre, build suivant à vérifier dans la console
- **Android** : jamais envoyée à Play — le bundle release est signé et vérifié localement ; l'existence d'une fiche Play reste à vérifier dans la console
- **Web** : site de présentation en ligne sur <https://kultiva.toakeur.com> depuis le 7 octobre 2026
- **Backend** : projet Supabase **en pause** (état inactif, vérifié le 20 octobre 2026) — connexion et synchronisation hors service tant qu'il n'est pas rallumé
- **Monétisation** : aucune — les 159 liens d'affiliation Amazon (tag rattaché au compte fermé par Amazon le 18 octobre) ont été retirés le 20 octobre 2026. Le statut **trader** au sens du DSA, décidé le 24 août 2026 à cause de ces liens, est donc à revoir
- **Classification attendue** : **4+** depuis le retrait du feed communautaire — plus aucun contenu généré par les utilisateurs
- **Chemin critique** : rallumer Supabase → compléter la fiche App Store → soumettre iOS

Les deux boutiques sont au même point de départ : rien n'a jamais été
envoyé. Ce n'est pas le code qui retient la soumission — l'app compile,
passe l'analyse et ses tests sont verts. L'URL de confidentialité qui
bloquait tout existe depuis le 7 octobre 2026 ; restent le backend en
pause et des champs de formulaire.

---

### 1. iOS · App Store

| | |
|---|---|
| État | **Jamais soumise — bloquée par le backend en pause** |
| Console | <https://appstoreconnect.apple.com> |
| Version publiée | aucune — l'app n'est jamais sortie |
| Version en cours | `1.0.0` (build `5`) — aucune soumission ; l'existence d'une fiche ASC est **à vérifier dans la console** |
| Distribution | Xcode Cloud, script `ios/ci_scripts/ci_post_clone.sh` — équipe `K597U7X3FZ` ; build 94 en échec le 24 octobre 2026, cible iOS relevée à 15.0 le 25 octobre, build suivant à vérifier dans la console |
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
coller dans App Store Connect (à vérifier dans la console). Le testeur
Apple essaiera la connexion et la suppression de compte : le projet
Supabase doit donc être rallumé avant la soumission. Viennent ensuite
le **numéro de téléphone** des informations de revue, les **captures
d'écran** (8 en iPhone 6,9″ et, l'iPad étant conservé, 8 en iPad 13″ au
format 2064 × 2752), et la déclaration DSA dans *Entreprise → Accords →
Digital Services Act* : le statut de trader avait été choisi pour les
liens d'affiliation, retirés le 20 octobre 2026 ; s'il est maintenu, les
coordonnées seront publiques dans les 27 pays de l'UE (une boîte postale
est acceptée).

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
| Production | **En ligne** — <https://kultiva.toakeur.com> et <https://kultiva.toakeur.com/privacy.html> répondent (vérifié le 21 octobre 2026) |
| Domaine & SSL | `kultiva.toakeur.com`, DNS chez Cloudflare (proxy actif), HTTPS valide ; contact affiché `kultiva@toakeur.com` |
| Visibilité | publié par GitHub Pages via `.github/workflows/site.yml` (dossier `landing/`) depuis le 7 octobre 2026 ; l'ancienne adresse `teiki5320.github.io/Kultiva/` sert la même page |

**Ce n'est pas une version web de l'app.** Le projet ne comporte que les
cibles `android` et `ios`. Le site compte parce qu'il fournit les URL
d'assistance, marketing et de confidentialité exigées par les boutiques.
`privacy.html` est tenue identique à la politique embarquée dans l'app
(`assets/tutos/privacy_policy.html`).

**Ce qui reste.** Remplacer les boutons *Télécharger* de
`landing/index.html`, qui pointent encore vers `href="#"`, par les liens
des boutiques une fois l'app publiée.

---

## Dépendance commune · Supabase

Ce n'est pas une boutique, mais aucune soumission ne tient sans lui : le
backend porte l'authentification, la synchronisation et la suppression de
compte in-app exigée par Apple.

| | |
|---|---|
| État | **En pause** — le 20 octobre 2026, le compte Supabase liste le projet avec l'état *inactif* ; il n'est pas supprimé et se rallume depuis la console |
| Console | <https://supabase.com/dashboard/project/vkiwkeknfzwdvufcqbrp> |
| Projet | `vkiwkeknfzwdvufcqbrp` (région Europe) |
| Adresse | ne résout plus pendant la pause — ce qui avait été pris, le 3 octobre, pour une suppression |
| Migrations | `001` → `016`, toutes appliquées au 24 août 2026 |
| Edge function | `delete-account` déployée au 24 août 2026 |

La clé `anon` présente dans `lib/config/supabase_config.dart` est un JWT
public : c'est son usage normal, elle n'est pas un secret. Les clés
Google « Se connecter » ont été laissées à supprimer le 9 octobre 2026 :
à recréer si on relance l'app.

---

## Ce qui reste, dans l'ordre

1. ✅ **Site et confidentialité** : `kultiva.toakeur.com` et `/privacy.html` en ligne depuis le 7 octobre 2026.
2. ✅ **Adresse de contact** : `kultiva@toakeur.com` sur le site, la confidentialité et les textes des fiches.
3. **Rallumer le backend** : relancer le projet Supabase et recréer les clés Google « Se connecter ».
4. **Compléter la fiche App Store** : les trois URL, l'adresse de contact, la déclaration DSA (statut de trader à revoir) et le téléphone de revue.
5. **Compte de démonstration** : 2 ou 3 plantations, une photo et un Tamassi entamé, pour le testeur et les captures.
6. **Captures d'écran** : 8 en iPhone 6,9″ (1320 × 2868) et 8 en iPad 13″ (2064 × 2752).
7. ✅ **Liens Amazon retirés** : les 159 liens au tag du compte fermé ont été ôtés du catalogue le 20 octobre 2026.
8. **Soumettre iOS** : depuis `docs/FICHE_APP_STORE.md`.
9. **Créer la fiche Google Play** : puis lancer le test fermé sans attendre, ses quatorze jours courent en arrière-plan.
10. **Relier les boutons « Télécharger »** : remplacer les `href="#"` du site par les liens des boutiques (la mention « Partenaire Amazon » a été ôtée le 21 octobre 2026).

---

## Ce qui a été réglé depuis

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
