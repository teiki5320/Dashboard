# PUBLICATION — état des boutiques

> Mis à jour le 21 octobre 2026 d'après l'App Store, la fiche publique
> Google Play et l'historique du dépôt ; ce que seules les consoles savent
> est marqué « à vérifier dans la console ». Une ligne par système d'exploitation, dans un format
> réutilisable d'une application à l'autre. Pour mettre à jour :
> relancer ce même prompt.
>
> **Aucun secret ici** — uniquement des références publiques :
> identifiants d'app, numéros de version, liens de console.

## En bref

- **Version commune** : `1.0.4` sur les deux boutiques (App Store le 15 octobre, Google Play le 20 octobre 2026) ; `1.0.5+6` dans le code
- **Identifiant de bundle** : `com.teiki.erea`, identique sur iOS et Android
- **Monétisation** : pub AdMob + achat unique « Erea sans publicité », 3,99 €
- **Confidentialité** : six types déclarés (SDK AdMob), consentement RGPD et ATT
- **Contact** : `erea@toakeur.com` · site `erea.toakeur.com`

## Boutiques

| | 🍎 App Store | 🤖 Google Play |
|---|---|---|
| État | [ok] 1.0.4 en ligne depuis le 15 octobre 2026 | [ok] 1.0.4 en ligne depuis le 20 octobre 2026 |
| Construction | [ok] Xcode Cloud, à chaque poussée sur `main` | [ok] App Bundle construit sur le Mac |
| Signature | [ok] automatique, gérée par Apple | [ok] keystore `CN=Toa`, copie de secours |
| Classification | [ok] 4+ | [ok] questionnaire rempli, note à vérifier dans la console |
| Cible | [ok] iOS 15.0 minimum | [ok] public de 13 ans et plus |
| Permissions | [ok] suivi publicitaire (ATT) | [ok] notifications, identifiant publicitaire (`AD_ID`) |
| Poids | [ok] 30,6 Mo sur l'App Store | [ok] 56 Mo de bundle, 13,6 Mo installé |

## Vue d'ensemble

- **iOS** : **1.0.4 (build 182) en ligne depuis le 15 octobre 2026 à 14 h 01**, soumise à 12 h 51 et publiée automatiquement à l'approbation ; nouveau nom « Erea : Quiz d'histoire & frise »
- **Android** : **accès à la production accordé le 17 octobre 2026** (demandé le 14 octobre à 18 h 39) ; **release de production `5 (1.0.4)` envoyée pour examen le 17 octobre vers 8 h 25**, promue depuis la piste Alpha, déploiement complet, publication gérée désactivée ; **en ligne sur Google Play depuis le 20 octobre 2026 à 16 h 07**
- **Version dans le code** : `1.0.5+6` depuis le 16 octobre 2026, pour que Xcode Cloud ne bute plus sur la 1.0.4 approuvée (build 187 refusé, ITMS-90186) ; même code que la 1.0.4, envoyée à Google le 14 octobre et à Apple le 15 octobre ; le bundle Android de production reste celui de la 1.0.4 (`versionCode 5`)
- **Identifiant** : `com.teiki.erea`, identique sur les deux plateformes
- **Achat intégré** : `com.teiki.erea.sanspub` « Erea sans publicité », 3,99 €, non consommable — **approuvé** sur l'App Store, **actif** sur Google Play
- **Monétisation** : interstitielle AdMob une partie sur deux, consentement RGPD publié le 3 septembre 2026
- **Web** : vitrine `https://erea.toakeur.com/` en ligne, contact `erea@toakeur.com`

La 1.0.4 est en ligne sur l'App Store depuis le 15 octobre, avec le nom
long et les captures légendées, après deux builds refusés à l'import pour
le manifeste de confidentialité. Sur Google Play, la même 1.0.4
est en production depuis le 20 octobre. Erea est disponible sur les deux
boutiques.

---

### 1. iOS · App Store

| | |
|---|---|
| État | **1.0.4 (build 182) en ligne depuis le 15 octobre 2026 à 14 h 01** |
| Console | <https://appstoreconnect.apple.com> |
| Fiche publique | identifiant App Store `6794918301` |
| Version publiée | `1.0.4`, build `182`, en ligne depuis le 15 octobre 2026 à 14 h 01 — remplace la `1.0.2` (build `150`) du 8 septembre, qui remplaçait la `1.0.0` du 3 septembre |
| Dernier build connu | `182` (`1.0.4`), publié ; les builds suivants viennent de commits de documentation, même code |
| Dernière soumission | `1.0.4`, build `182`, le 15 octobre 2026 à 12 h 51, approuvée le jour même — les builds `176` et `180` ont été refusés à l'import (ITMS-91064) : le validateur n'accepte ni « suivi à vrai, liste de domaines vide » ni « suivi à vrai, sans clé » ; le 182 porte « suivi à faux, sans clé » (commit 6e981b6) ; nom « Erea : Quiz d'histoire & frise », mots-clés sans « quiz/frise/histoire » (déjà dans le nom), captures iPhone légendées écran moyen et grand écran (iPad : celles d'août), adresses passées sur `erea.toakeur.com` (assistance, site, confidentialité), notes App Review réécrites (AdMob, consentement, achat intégré) |
| Notes / avis | 0 / 0 au 21 octobre 2026 |
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

**Nom du compte.** Dans la console, le compte s'affiche **TOA CORP** ;
sur la fiche publique, le vendeur affiché est le nom civil de Jean
(vérifié le 13 octobre 2026). ⚠️ « TOA CORP » n'est qu'un nom
d'affichage — le compte reste **individuel**, ce qui compte pour le DSA
(voir plus bas).

**Nom de l'app.** `Erea : Quiz d'histoire & frise` (30 caractères)
depuis la 1.0.4, saisi le 15 octobre 2026. « Erea » seul n'occupait que 4
des 30 caractères du champ le plus indexé, et la recherche « erea » ne
le trouvait pas (Apple la confond avec « erase »).

**DSA.** Toujours déclaré **non-trader**, ce qui ne tient plus : Apple
range parmi les traders qui tire un revenu de son app, publicité
comprise. À traiter après nettoyage du complément d'adresse du compte.
Le contact public de l'app est `erea@toakeur.com` depuis le 7 octobre
2026.

---

### 2. Android · Google Play

| | |
|---|---|
| État | **Release de production `5 (1.0.4)` en ligne depuis le 20 octobre 2026 à 16 h 07** — envoyée le 17 octobre vers 8 h 25, accès accordé le 17 octobre (demandé le 14) ; fiche publique `https://play.google.com/store/apps/details?id=com.teiki.erea` |
| Console | <https://play.google.com/console> |
| Version publiée | `5 (1.0.4)`, en production depuis le 20 octobre 2026 à 16 h 07 |
| Canal en cours | production — release `5 (1.0.4)` (consentement attendu, achats restaurés, lien Play, classement masqué), promue depuis le test fermé « Alpha », qui servait la `4 (1.0.3)` depuis le 16 septembre |
| Accès à la production | demandable depuis le 22 septembre ; demandé le 14 octobre à 18 h 39, **accordé le 17 octobre 2026** |
| Examen | envoyé le 8 septembre 2026 à 9 h 07 (release 1.0.2, testeurs, description corrigée), approuvé à 9 h 38 |
| Testeurs | groupe Google `testers-community@googlegroups.com` — service **Testers Community**, plan Starter 14 €, 15 testeurs, souscrit le 8 septembre à 22 h ; **« 12 testeurs inscrits pour 1 jour » le 10 septembre**, compteur Google |
| Rapports | reçus le 15 septembre : rapport de test (aucun plantage, aucun bug ; trois « pistes » génériques : tutoriel dynamique, captures Play légendées, langues) et questionnaire d'accès à la production pré-rempli, à réécrire avec ce qui a réellement changé |
| Achat intégré | `com.teiki.erea.sanspub`, option d'achat `sans-pub`, **actif** depuis le 8 septembre — 3,99 € en France, 173 pays, profil de paiement créé le même jour |
| Distribution | App Bundle signé localement, certificat `CN=Toa` valable jusqu'en 2053 |
| Taille | 56 Mo de bundle, **13,6 Mo** à l'installation après découpage par Play |
| Pays | 176 ou 177 pays selon les relevés, plus le reste du monde — liste exacte à vérifier dans la console |

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

**Comment on est arrivé en production.** Les **douze testeurs pendant
quatorze jours consécutifs**, exigés d'un compte personnel, ont été
tenus du 8 au 22 septembre. L'accès à la production, demandé le
14 octobre avec les vrais changements des 1.0.3 et 1.0.4, a été accordé
le 17 octobre ; la release de production est en ligne depuis le
20 octobre. La fiche publique Google Play répond (vérifié le 21 octobre
2026).

---

### 3. Web · vitrine

| | |
|---|---|
| Production | `https://erea.toakeur.com/` — vitrine, jeu web sur `/jeu.html`, `/support.html`, `/confidentialite.html` ; répond le 21 octobre 2026 |
| Domaine & SSL | sous-domaine de `toakeur.com` depuis le 7 octobre 2026, servi par GitHub Pages derrière Cloudflare, HTTPS valide ; l'ancienne adresse `teiki5320.github.io/erea/` répond toujours |
| Visibilité | Smart App Banner (`app-id=6794918301`) sur les pages ; badge officiel « Télécharger dans l'App Store » vers `https://apps.apple.com/fr/app/erea/id6794918301` depuis le 12 octobre 2026 ; badge officiel « Disponible sur Google Play » à côté depuis le 21 octobre 2026 ; page d'aiguillage `https://erea.toakeur.com/telecharger/` depuis le 15 octobre 2026 (iPhone et iPad vers l'App Store, Android vers Google Play depuis le 21 octobre 2026 (`PLAY_OUVERT` à vrai), `?src=` relayé aux boutiques) |

---

## Ce qui reste, dans l'ordre

1. ✅ **App Store** : la 1.0.4 est en ligne depuis le 15 octobre 2026 (après la 1.0.2 du 8 septembre, qui apportait l'achat intégré).
2. ✅ **Douze testeurs Android pendant quatorze jours** : tenus du 8 au 22 septembre 2026.
3. ✅ **Google Play** : la 1.0.4 est en production depuis le 20 octobre 2026 à 16 h 07 (notes de version : « Bienvenue dans Erea ! »).
4. ✅ **App Review de la 1.0.4** : approuvée et en ligne le 15 octobre 2026, le jour de l'envoi.
5. ✅ **Site et page d'aiguillage** passés sur Google Play le 21 octobre 2026 : badge sur la vitrine, `PLAY_OUVERT` à `true`.
6. **Lancer la pub TikTok** vers `https://erea.toakeur.com/telecharger/?src=tiktok` : les deux boutiques sont en ligne.
7. **DSA** : Jean a demandé le passage du compte Apple en compte entreprise (octobre 2026) ; se déclarer trader une fois le compte converti et le complément d'adresse nettoyé.
8. **Élucider les builds Xcode Cloud 141 et 142** : échoués le 4 septembre sur des commits de documentation.

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
  identifiant, même prix.
- **Consentement vérifié sur le Pixel** le 16 septembre, sous la 1.0.3
  installée par `adb` : le formulaire se charge (`load_complete ok`), un
  choix est enregistré (`IABTCF_TCString`), la ligne « Publicité
  personnalisée » apparaît dans les réglages. Douze jours après la
  configuration, le journal ne dit plus `no form(s) configured`.
- **Prix Play aligné** : le Pixel affichait 4,79 € (3,99 pris hors taxe
  par la saisie « toutes les régions », plus 20 % de TVA). Ressaisi sur
  la ligne France le 16 septembre : **3,99 €** affiché dans l'heure, comme
  sur l'App Store. Approuvé par Apple le 8 septembre, sept jours
  après la première soumission ratée sans lui.
