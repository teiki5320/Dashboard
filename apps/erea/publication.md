# PUBLICATION — état des boutiques

> Mis à jour le 8 septembre 2026 d'après les consoles App Store Connect et
> Google Play. Une ligne par système d'exploitation, dans un format
> réutilisable d'une application à l'autre. Pour mettre à jour :
> relancer ce même prompt.
>
> **Aucun secret ici** — uniquement des références publiques :
> identifiants d'app, numéros de version, liens de console.

## Vue d'ensemble

- **iOS** : **1.0.2 + achat intégré approuvés le 8 septembre 2026** à 12 h 18, publication automatique en cours (jusqu'à 24 h pour apparaître)
- **Android** : release 1.0.2 **approuvée le 8 septembre à 9 h 38**, disponible pour les testeurs · **12 testeurs inscrits le soir même**, les 14 jours courent jusqu'au **22 septembre**
- **Chemin critique** : 14 jours avec 12 testeurs inscrits sans interruption — démarré le 8 septembre, demande d'accès à la production possible le 22 septembre
- **Version commune** : `1.0.3+4` (`pubspec.yaml`) depuis le 8 septembre — la 1.0.2 (build iOS `150`, bundle Android `3 (1.0.2)`) est close côté Apple, tout nouveau build ira dans la 1.0.3
- **Identifiant** : `com.teiki.erea`, identique sur les deux plateformes
- **Achat intégré** : `com.teiki.erea.sanspub` « Erea sans publicité », 3,99 €, non consommable — soumis avec la 1.0.2 sur iOS, **actif** sur Google Play
- **Monétisation** : interstitielle AdMob une partie sur deux, consentement RGPD publié le 3 septembre 2026

Apple a tranché en une nuit : la 1.0.2 et l'achat intégré sont
approuvés ensemble le 8 septembre à midi, et remplacent la version
d'août dans les 24 heures. Côté Android, le tableau de bord coche le
soir même « au moins 12 testeurs inscrits » : les quatorze jours que
rien ne raccourcit ont commencé, la production devient demandable le
22 septembre.

---

### 1. iOS · App Store

| | |
|---|---|
| État | **1.0.2 et achat intégré approuvés le 8 septembre 2026** — « Prête à être distribuée », publication automatique |
| Console | <https://appstoreconnect.apple.com> |
| Version publiée | `1.0.2`, build `150`, approuvée le 8 septembre 2026 à 12 h 18 — remplace la `1.0.0` (build `90`) du 3 septembre ; l'API iTunes affichait encore 1.0.0 à 12 h 30 |
| Version soumise | aucune — la prochaine portera le nom long de l'app |
| Achat intégré | `com.teiki.erea.sanspub` « Erea sans publicité », non consommable, **approuvé** le 8 septembre avec la 1.0.2 |
| Distribution | Xcode Cloud, action *Archiver*, préparation **App Store Connect** |

**Pourquoi le build 90 ne convenait plus.** Cinq commits de code lui
sont postérieurs : les 1831 faits de la base, le mode Facile qui cessait
d'être un mode « XXᵉ siècle », VoiceOver sur la frise, le découpage de
l'écran de jeu et la pondération d'époque. Le build 150 les porte tous,
plus les cinquante identifiants `SKAdNetworkItems` et l'offre « sans
pub ».

**Ce qui s'est passé le 7 septembre.** Une 1.0.1 (build 143) est
partie le matin sans l'achat intégré, alors qu'Apple exige qu'un premier
achat intégré soit joint à une version. Retirée de la vérification le
soir même, remplacée par la 1.0.2 (build 150) qui porte l'offre là où la
pub se voit — après la pub, sur l'écran de fin, à l'accueil — et des
réglages débarrassés de leurs outils de mise au point. Les deux éléments
sont partis dans la même soumission.

**Ce qui a failli la faire refuser.** La description en ligne promettait
« SANS PUBLICITÉ » et « ne collecte aucune donnée », alors que ce build
affiche des interstitielles ; elle annonçait aussi un **mode Duel qui
n'existe pas** dans le code. Corrigé avant l'envoi, mots-clés compris.

**Confidentialité.** Refaite et publiée le 7 septembre : six types
déclarés — identifiant de l'appareil, interaction avec le produit,
données publicitaires, emplacement approximatif, données sur les pannes,
données de performance. La page produit affiche désormais « Données
utilisées pour vous suivre ». Le badge « Aucune donnée collectée » est
perdu ; c'est le prix de la publicité.

**Nom du compte.** Le compte s'affiche **TOA CORP**. ⚠️ Ce n'est qu'un
nom d'affichage — le compte reste **individuel**, ce qui compte pour le
DSA (voir plus bas).

**Nom de l'app.** « Erea » n'occupe que 4 des 30 caractères du champ le
plus indexé. À trancher pour la version suivante : `Erea — Devine
l'année !` (23) ou `Erea : Quiz d'histoire & frise` (30).

**DSA.** Toujours déclaré **non-trader**, ce qui ne tient plus : Apple
range parmi les traders qui tire un revenu de son app, publicité
comprise. À traiter après nettoyage du complément d'adresse du compte.

---

### 2. Android · Google Play

| | |
|---|---|
| État | **Test fermé en cours, 14 jours jusqu'au 22 septembre 2026** |
| Console | <https://play.google.com/console> |
| Version publiée | aucune |
| Canal en cours | test fermé « Alpha » — release `3 (1.0.2)` **disponible pour les testeurs depuis le 8 septembre à 9 h 38**, déploiement complet ; le bundle `1 (1.0.0)` est inactif |
| Examen | envoyé le 8 septembre 2026 à 9 h 07 (release 1.0.2, testeurs, description corrigée), approuvé à 9 h 38 |
| Testeurs | groupe Google `testers-community@googlegroups.com` — service **Testers Community**, plan Starter 14 €, 15 testeurs, souscrit le 8 septembre à 22 h ; **≥ 12 inscrits à 23 h 40**, coché par Google |
| Achat intégré | `com.teiki.erea.sanspub`, option d'achat `sans-pub`, **actif** depuis le 8 septembre — 3,99 € en France, 173 pays, profil de paiement créé le même jour |
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

**Ce qui a été corrigé le 8 septembre.** La description envoyée le
3 septembre annonçait un mode Duel absent, « 1700 événements » et un
achat unique qui n'existait pas encore. Le texte corrigé est parti avec
la release 1.0.2. L'achat intégré, lui, existe maintenant vraiment.

**Ce qui bloque.** Le seul délai qu'aucune décision ne raccourcit :
**douze testeurs pendant quatorze jours consécutifs**, exigés d'un
compte personnel avant toute mise en production. Le douzième s'est
inscrit le 8 septembre au soir ; le compteur court jusqu'au
22 septembre, et repart de zéro si les inscrits repassent sous douze.

---

## Ce qui reste, dans l'ordre

1. **Android** — laisser courir les quatorze jours (jusqu'au
   22 septembre) en vérifiant de temps en temps que le tableau de bord
   affiche toujours au moins douze inscrits, et que le nombre
   d'installations de la release décolle (0 le 9 septembre : inscrits
   ne veut pas dire installés, et les statistiques ont deux jours de
   retard). Pendant ce temps, **publier
   deux ou trois mises à jour** sur la piste (1.0.3 vers le 13, 1.0.4
   vers le 18) : le formulaire d'accès à la production demande ce qui a
   changé grâce aux retours des testeurs, et une piste figée se fait
   refuser. Le 22, « Demander un accès en production » et répondre aux
   questions (aperçu dans le tableau de bord).
2. **iOS** — vérifier dans les 24 heures que l'App Store affiche bien la
   1.0.2 (l'API `itunes.apple.com/lookup?id=6794918301` répond avec le
   numéro de version), puis que l'achat apparaît dans le jeu installé
   depuis la boutique, à 3,99 €.
3. **Les deux** — vérifier sur le Pixel que le formulaire de consentement
   s'affiche et que le journal ne dit plus
   `no form(s) configured for the input app ID`.
4. **Les deux** — se déclarer **trader** au titre du DSA, après avoir
   nettoyé le complément d'adresse du compte Apple, qui porte encore le
   nom d'une SARL sans rapport et deviendrait public.
5. **iOS** — choisir le nom long de l'app pour la version suivante.
6. **iOS** — élucider les builds Xcode Cloud 141 et 142, échoués le
   4 septembre sur des commits de documentation ; 143 à 150 sont verts.

---

## Ce qui a été réglé du 3 au 8 septembre 2026

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
- **Offre « sans pub »** (1.0.2) : proposée après la première pub puis
  une sur trois, jamais deux fois le même jour si elle a été refusée ;
  pastille sur l'écran de fin et à l'accueil. Les réglages ne contiennent
  plus « Revoir la présentation » ni « Tout remettre à zéro ».
- **Achat intégré** créé et actif dans les deux consoles, même
  identifiant, même prix. Approuvé par Apple le 8 septembre, sept jours
  après la première soumission ratée sans lui.
