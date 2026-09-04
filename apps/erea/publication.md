# PUBLICATION — état des boutiques

> Généré le 4 septembre 2026 d'après les consoles App Store Connect et
> Google Play. Une ligne par système d'exploitation, dans un format
> réutilisable d'une application à l'autre. Pour mettre à jour :
> relancer ce même prompt.
>
> **Aucun secret ici** — uniquement des références publiques :
> identifiants d'app, numéros de version, liens de console.

## Vue d'ensemble

- **iOS** : 1.0.0 approuvée le 21 août 2026, jamais publiée — son build `90` est périmé
- **Android** : test fermé envoyé pour examen le 3 septembre 2026
- **Chemin critique** : 12 testeurs pendant 14 jours consécutifs, imposés par le compte Play personnel
- **Version commune** : `1.0.0` (`pubspec.yaml`) — versionCode Android `1`, build iOS du 3 septembre
- **Identifiant** : `com.teiki.erea`, identique sur les deux plateformes
- **Monétisation** : interstitielle AdMob, consentement RGPD publié le 3 septembre 2026

Les deux boutiques n'avancent pas à la même vitesse et ne bloquent pas
pour les mêmes raisons. Android attend Google et ne demande plus rien.
iOS attend une décision : une version approuvée mais dépassée occupe la
place de celle qui la vaut.

---

### 1. iOS · App Store

| | |
|---|---|
| État | **Bloqué sur une décision, pas sur un travail** |
| Console | <https://appstoreconnect.apple.com> |
| Version publiée | aucune — l'app n'est jamais sortie |
| Version approuvée | `1.0.0`, build `90`, acceptée le 21 août 2026, sortie *manuelle* jamais déclenchée |
| Build à soumettre | celui du 3 septembre 2026, produit par Xcode Cloud |
| Distribution | Xcode Cloud, action *Archiver*, préparation **App Store Connect** |

**Pourquoi le build 90 ne convient plus.** Cinq commits de code lui sont
postérieurs : les 1831 faits de la base, le mode Facile qui cessait
d'être un mode « XXᵉ siècle », VoiceOver sur la frise, le découpage de
l'écran de jeu et la pondération d'époque. Le build du 3 septembre les
porte tous, plus les cinquante identifiants `SKAdNetworkItems`.

**Ce qui bloque.** Une version « Prête pour la distribution » a tous ses
champs verrouillés et n'offre que *Publier* : ni suppression de build, ni
modification. Deux issues — trouver un lien de suppression au bas de sa
page, ou la publier et enchaîner sur une `1.0.1`, personne ne l'ayant
jamais vue.

**Avant toute soumission.** La section *Confidentialité de l'app* doit
déclarer les collectes du SDK de Google : le nouveau build contient la
publicité, active depuis le 17 août 2026.

**En instance.** Une demande de changement de nom de développeur a été
déposée le 3 septembre 2026 — un compte individuel affiche le nom légal
du titulaire, et seule une conversion en organisation le change. On
ignore si une telle demande gèle les soumissions.

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
3. **iOS** — chercher un lien de suppression au bas de la page de la
   version 1.0.0 ; sinon la publier et préparer une `1.0.1`.
4. **iOS** — mettre *Confidentialité de l'app* en accord avec la
   publicité embarquée.
5. **iOS** — soumettre en sélectionnant le build du 3 septembre.
6. **Les deux** — vérifier sur appareil que le formulaire de consentement
   s'affiche et que le journal ne dit plus
   `no form(s) configured for the input app ID`.

---

## Ce qui a été réglé le 3 septembre 2026

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
