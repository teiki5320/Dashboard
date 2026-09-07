# PUBLICATION — état des boutiques

> Généré le 7 septembre 2026 d'après les consoles App Store Connect et
> Google Play. Une ligne par système d'exploitation, dans un format
> réutilisable d'une application à l'autre. Pour mettre à jour :
> relancer ce même prompt.
>
> **Aucun secret ici** — uniquement des références publiques :
> identifiants d'app, numéros de version, liens de console.

## Vue d'ensemble

- **iOS** : **1.0.0 publiée le 3 septembre 2026** · 1.0.1 en attente de vérification depuis le 7 septembre
- **Android** : test fermé envoyé pour examen le 3 septembre 2026
- **Chemin critique** : 12 testeurs pendant 14 jours consécutifs, imposés par le compte Play personnel
- **Version commune** : `1.0.1+2` (`pubspec.yaml`) — versionCode Android `2`, build iOS `143`
- **Identifiant** : `com.teiki.erea`, identique sur les deux plateformes
- **Monétisation** : interstitielle AdMob, consentement RGPD publié le 3 septembre 2026

Les deux boutiques n'avancent pas à la même vitesse et ne bloquent pas
pour les mêmes raisons. Android attend Google et ne demande plus rien.
iOS attend l'App Review : la version en boutique date d'août, celle qui
la remplace est partie le 7 septembre.

---

### 1. iOS · App Store

| | |
|---|---|
| État | **1.0.1 en attente de vérification depuis le 7 septembre 2026** |
| Console | <https://appstoreconnect.apple.com> |
| Version publiée | `1.0.0`, build `90`, en ligne depuis le 3 septembre 2026 à 23 h 57 |
| Version soumise | `1.0.1`, build `143`, envoyée le 7 septembre 2026 — publication **automatique** dès approbation |
| Achat intégré | `com.teiki.erea.sanspub` — dans le code, **absent des deux consoles** |
| Distribution | Xcode Cloud, action *Archiver*, préparation **App Store Connect** |

**Pourquoi le build 90 ne convenait plus.** Cinq commits de code lui
sont postérieurs : les 1831 faits de la base, le mode Facile qui cessait
d'être un mode « XXᵉ siècle », VoiceOver sur la frise, le découpage de
l'écran de jeu et la pondération d'époque. Le build 143 les porte tous,
plus les cinquante identifiants `SKAdNetworkItems`.

**Ce qui s'est passé.** La 1.0.0 a été publiée le 3 septembre au soir,
avec le build 90 d'août. Une version approuvée ne se supprimant pas, la
seule issue était une 1.0.1 — soumise le 7 septembre avec le build 143.

**Ce qui a failli la faire refuser.** La description en ligne promettait
« SANS PUBLICITÉ » et « ne collecte aucune donnée », alors que ce build
affiche des interstitielles ; elle annonçait aussi un **mode Duel qui
n'existe pas** dans le code. Les deux sont des motifs de refus classiques.
Corrigé avant l'envoi.

**Confidentialité.** Refaite et publiée le 7 septembre : six types
déclarés — identifiant de l'appareil, interaction avec le produit,
données publicitaires, emplacement approximatif, données sur les pannes,
données de performance. La page produit affiche désormais « Données
utilisées pour vous suivre ». Le badge « Aucune donnée collectée » est
perdu ; c'est le prix de la publicité.

**Nom du compte.** La demande déposée le 3 septembre a abouti : le compte
s'affiche **TOA CORP**. ⚠️ Ce n'est qu'un nom d'affichage — le compte
reste **individuel**, ce qui compte pour le DSA (voir plus bas).

**DSA.** Toujours déclaré **non-trader**, ce qui ne tient plus : Apple
range parmi les traders qui tire un revenu de son app, publicité
comprise. Reporté par choix le 7 septembre, à traiter avant de laisser
courir.

---

### 2. Android · Google Play

| | |
|---|---|
| État | **En attente de Google, rien à faire côté développeur** |
| Console | <https://play.google.com/console> |
| Version publiée | aucune |
| Canal en cours | test fermé « Alpha », bundle `1 (1.0.0)` |
| Envoyé pour examen | 3 septembre 2026 — 14 modifications d'un seul envoi |
| Distribution | App Bundle signé localement, certificat `CN=Toa` valable jusqu'en 2053 |
| Taille | 56 Mo de bundle, **13,6 Mo** à l'installation après découpage par Play |
| Pays | 176 pays plus le reste du monde |

**Ce qui est déclaré.** Fiche française complète avec icône 512 et
bandeau 1024 × 500, classification du contenu, cible 13 ans et plus,
questionnaire Sécurité des données, et déclaration d'identifiant
publicitaire portant les trois finalités que Google publie pour son
propre SDK : publicité, analyse, prévention des fraudes. La permission
`com.google.android.gms.permission.AD_ID` figure bien dans le manifeste
fusionné, ajoutée par le SDK Mobile Ads.

**Ce qui bloque.** Rien pour l'instant, sinon l'examen. Ensuite vient le
seul délai qu'aucune décision ne raccourcit : **douze testeurs pendant
quatorze jours consécutifs**, exigés d'un compte personnel avant toute
mise en production. Le décompte ne démarre qu'au douzième inscrit, et
s'inscrire veut dire ouvrir le lien reçu et l'accepter — pas figurer sur
la liste.

---

## Ce qui reste, dans l'ordre

1. **Android** — vérifier que la liste de diffusion « Perso » contient
   douze adresses, et que ce sont les comptes Google des téléphones.
2. **Android** — faire accepter les douze liens d'inscription. Le
   décompte des quatorze jours part de là.
3. **Android** — reporter dans la Play Console les corrections de
   description : le mode Duel, les « 1700 événements » et l'achat unique
   y figurent encore.
4. **iOS** — attendre l'App Review de la 1.0.1, envoyée le 7 septembre.
   Publication automatique : elle sort dès qu'Apple approuve.
5. **Les deux** — se déclarer **trader** au titre du DSA, après avoir
   nettoyé le complément d'adresse du compte, qui porte encore le nom
   d'une SARL sans rapport et deviendrait public.
6. **Les deux** — créer `com.teiki.erea.sanspub` dans les deux consoles.
   Côté Apple, un premier achat intégré doit accompagner une version : ce
   sera donc la 1.0.2 au plus tôt.
7. **Les deux** — vérifier sur appareil que le formulaire de consentement
   s'affiche et que le journal ne dit plus
   `no form(s) configured for the input app ID`.

---

## Ce qui a été réglé les 3 et 7 septembre 2026

- **Consentement RGPD** : aucun message n'était configuré dans AdMob, et
  le journal du Pixel le disait mot pour mot. Aucune annonce n'aurait été
  servie en Europe, sur aucune des deux plateformes. Le message couvre
  désormais les deux applications, s'affiche en français et laisse
  refuser aussi facilement qu'accepter.
- **Message IDFA** : créé pour iOS. Il n'a demandé aucun code —
  `NSUserTrackingUsageDescription` était dans `Info.plist` depuis août, et
  le même `loadAndShowConsentFormIfRequired` présente les deux messages.
- **SKAdNetwork** : les cinquante identifiants publiés par Google sont
  entrés dans `Info.plist`. Sans eux, l'installation d'un joueur ayant
  refusé le suivi ne remontait à personne.
