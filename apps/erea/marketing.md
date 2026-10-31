# Erea — plan marketing & rémunération

> Généré le 3 août 2026, mis à jour le 31 octobre 2026. Le modèle de
> rémunération est en ligne sur l'App Store depuis la 1.0.2 et sur Google
> Play depuis le 20 octobre 2026 (publicité + achat unique qui la retire). Pour le mettre à jour : relancer ce même prompt. Aucun secret
> ici.
>
> Légende : ✅ en place · ⬜ pas en place.

---

## Positionnement

**L'angle : « le GeoGuessr du temps ».** Un événement apparaît, on fait
défiler une frise de −3000 à aujourd'hui pour deviner l'année. Une phrase
suffit à l'expliquer, une capture suffit à le montrer — c'est l'atout
marketing n°1. Les points de différenciation face aux quiz d'histoire
classiques :

- **Le geste** : on ne choisit pas parmi 4 réponses, on *place* l'événement
  sur un ruban qui défile — satisfaisant à voir en vidéo courte.
- **Le défi du jour** : les 10 mêmes questions pour tout le monde, une
  tentative, une série 🔥 et une grille emoji à partager — la boucle
  virale de Wordle appliquée à l'histoire.
- **Sans friction** : hors ligne, sans compte, complet dès
  l'installation. La publicité est cantonnée à la sortie de l'écran de
  fin (jamais dans le Défi du jour), et un achat unique la retire —
  l'argument auprès des parents devient « 3,99 € une fois, et plus
  jamais rien », face aux jeux à abonnement.

**Les publics, par ordre de priorité :**

| Public | Pourquoi eux | Accroche |
|---|---|---|
| Familles francophones (parents + 8-15 ans) | Cœur de cible du ton et du mode Facile (268 faits « grand public ») | « Le jeu d'histoire pour toute la famille » |
| Collégiens / brevet | Le niveau 1 s'appuie sur les repères officiels du brevet | « Révise tes repères sans t'en rendre compte » |
| Afrique de l'Ouest francophone | Onboarding avec choix du pays (29 pays africains proposés, plus la France), mélange 50/50 avec le pack Afrique (202 faits) — rare dans le genre | « Enfin un jeu d'histoire qui parle de chez toi » |
| Amateurs de culture G / joueurs de quiz | Modes Difficile et Chrono, classements mondiaux | « Tu peux faire mieux que moi ? » |

---

## Rémunération par phases

- [fait] **Aujourd'hui** : pub AdMob une partie sur deux, achat unique 3,99 € qui la retire, sur iOS et sur Android depuis le 20 octobre 2026
- [en cours] **Statut trader (DSA)** : obligatoire sur les deux boutiques ; Jean a demandé à Apple le 29 octobre de lancer le passage en organisation, réponse d'Apple attendue
- **Premiers versements AdMob** : seuil de 70 €, puis code PIN postal et vérification d'identité
- **Licence éducation** : seulement si un établissement se présente de lui-même

## Points forts

- ⏳ **Le geste de la frise** : on place l'événement sur un ruban de −3000 à aujourd'hui, au lieu de choisir entre quatre réponses.
- 🔥 **Le Défi du jour** : dix questions identiques pour tous, une tentative, une série et une grille emoji à partager.
- 🌍 **1 830 faits, Afrique comprise** : hors ligne et sans compte, avec choix du pays et un pack Afrique rare dans le genre.

## Modèle de rémunération

**Modèle actuel : publicité pour tous, achat unique pour la retirer.**
Décidé et câblé en août 2026 (décision du développeur, le 16 août :
« monétiser aussitôt »). C'est le modèle le plus courant du jeu casual,
et le plus efficace — l'acheteur sait exactement ce qu'il achète, et la
publicité fait elle-même la promotion de l'achat.

| Pièce | Détail | Statut |
|---|---|---|
| Interstitielle AdMob | À la sortie de l'écran de fin, une partie sur deux, jamais dans le Défi du jour (`lib/core/pub.dart`) | ✅ en ligne sur iOS depuis la 1.0.2 (8 septembre 2026), sur Android depuis le 20 octobre 2026 |
| « Erea sans publicité » | Achat unique non consommable `com.teiki.erea.sanspub`, **3,99 €** — il ne débloque rien, le jeu est déjà complet | ✅ approuvé sur l'App Store le 8 septembre, actif sur Google Play |
| Consentement | Formulaire UMP de Google + ATT sur iOS, révocable depuis les réglages ; message RGPD et message IDFA publiés dans AdMob | ✅ |
| Android | Même modèle, sur Google Play depuis le 20 octobre 2026 (1.0.4) ; 1.0.7 en ligne (vérifié le 31 octobre 2026) | ✅ |

**Ce que ça a coûté, en connaissance de cause :** le badge « Aucune
donnée collectée » (la fiche de confidentialité de l'App Store a changé
avec la 1.0.2), l'argument « sans pub » de la description, et le statut
**trader** du DSA — coordonnées publiques sur la fiche UE, déclaration
pas encore faite.

**Modèles écartés, et pourquoi :**
- **Abonnement** — le rythme de production de contenu (1 830 faits, mais
  pas de flux hebdomadaire) ne justifie pas un récurrent ; un abonnement
  mal nourri détruit les notes.
- **Packs payants / « Erea + » à 4,99 €** (l'ancien plan en phases) —
  contredirait la promesse de l'achat : « rien ne se débloque, il n'y a
  rien à débloquer ». Le jeu entier gratuit est aussi ce qui nourrit le
  bouche-à-oreille du Défi du jour.

**Piste redimensionnée :**
- **Licence éducation** — l'Éducation nationale n'achète pas d'apps sur
  l'App Store : les budgets passent par les marchés publics, les ENT et
  les manuels numériques. L'achat en volume Apple School Manager reste
  possible dans le privé, l'international et quelques établissements
  bien dotés, mais ce n'est pas un canal à structurer tant qu'un
  établissement n'est pas venu de lui-même.

---

## ASO (App Store Optimization)

| Élément | Contenu proposé | Statut |
|---|---|---|
| Nom | `Erea : Quiz d'histoire & frise` (30 caractères) depuis la 1.0.4, en ligne le 15 octobre 2026 ; la 1.0.2 s'appelait `Erea` | ✅ |
| Sous-titre | `Le jeu d'histoire en famille` | ✅ |
| Mots-clés (100 **octets**, accents comptés double) | 1.0.2 : `quiz,frise,chronologie,date,culture,générale,brevet,éducatif,afrique,collège,révision,enfant` (97 octets) ; 1.0.4 : `chronologie,culture,générale,brevet,éducatif,afrique,collège,révision,trivia,siècle,année` (96 octets), sans « quiz », « frise », « histoire », déjà dans le nom | ✅ |
| Description | corrigée le 7 septembre 2026 avec la 1.0.2 : plus de « sans publicité », plus de mode Duel | ✅ |
| Captures | App Store : sept captures iPhone légendées avec la 1.0.4 (écran moyen 1206 × 2622 et 6,9″ 1260 × 2736), iPad 13″ (2064 × 2752) du 9 août ; Play : sept captures légendées en place depuis le 16 septembre | ✅ |
| Vidéo de preview | 15-20 s : le geste de défilement, une révélation, la grille copiée — pas encore déposée dans les boutiques | ⬜ (optionnel mais le geste est notre meilleur argument) |
| Notes & avis | Demande de note in-app (`lib/core/avis.dart`) : après un PERFECT, un record ou 3 défis d'affilée, une seule fois, jamais au lancement | ✅ fait le 5 août 2026 |
| Fiche confidentialité | refaite le 7 septembre 2026 : six types déclarés, collectes du SDK AdMob | ✅ |
| Localisation fiche | Français d'abord ; anglais plus tard seulement si le contenu du jeu est traduit | ⬜ |

---

## Canaux

| Canal | Détail | Statut |
|---|---|---|
| Partage de grille (bouche-à-oreille) | Grille emoji sans spoiler + série 🔥, feuille de partage native, lien de la boutique de l'appareil dans le texte (`lib/ui/game/verdict_textes.dart`, lien Play depuis la 1.0.4) | ✅ |
| Défi du jour + rappel | Mêmes questions pour tous, une tentative/jour, rappel local 18 h 30 (`lib/core/rappels.dart`) — le moteur de rétention qui alimente le partage | ✅ |
| Classements mondiaux | Game Center : défi, série, Classique ×3, Chrono (`lib/core/classement.dart`) — actifs sur iOS ; Play Games pas configuré, classements masqués sur Android | ✅ iOS · ⬜ Android |
| Vitrine web | `erea.toakeur.com` (depuis le 7 octobre 2026) : page de présentation dédiée, le jeu jouable sur `/jeu.html`, Smart App Banner sur les pages | ✅ |
| Badges des boutiques | Badge officiel d'Apple sur la vitrine, en tête et en bas de page, vers la fiche `id6794918301`, depuis le 12 octobre 2026 ; badge officiel Google Play à côté et page `/telecharger/` ouverte à Android depuis le 21 octobre 2026 | ✅ |
| Enseignants & parents | Dossier d'une page « Erea en classe » (repères du brevet couverts, mode Facile, sans compte ni inscription) à envoyer aux profs d'histoire-géo, groupes Facebook de profs, La Salle des Maîtres | ⬜ |
| Afrique de l'Ouest | Mise en avant du pack Afrique auprès des communautés éducatives francophones (Sénégal, Côte d'Ivoire…) ; presse tech locale ; créateurs de contenu éducation | ⬜ |
| Réseaux sociaux | TikTok « erea.jeu » est le seul compte rattaché à Erea dans le Studio ; YouTube « toa.afrotok » et TikTok « Afrotok » sont branchés mais rattachés à aucune app. Pubs vidéo produites par le Studio depuis le 5 octobre 2026 : le format « documentaire qui déraille » validé par Jean le 5 octobre, puis, depuis le 26 octobre, « Avant ou après ? », « Interro surprise », « Petite histoire » et « Le défi en famille » ; 27 sont validées et aucune n'attend de validation (vérifié le 30 octobre 2026). Publication en public par le Planning via Buffer depuis le 29 octobre 2026 : « Blériot, le saut de la Manche » et « Henry Dunant, la naissance de la Croix-Rouge » publiées ce soir-là, les 25 autres programmées du 30 octobre au 6 novembre (vérifié le 30 octobre 2026) | ✅ |
| Presse & sites spécialisés | App du jour (iPhon.fr, iGen, Frandroid), sites parents (Geek Junior, Super Julie — références du jeu éducatif) | ⬜ |
| Featuring Apple | Formulaire « App Store featuring » : app famille, française, hors ligne, avec Game Center — bon dossier, même si l'argument « sans pub » est tombé avec la 1.0.2 | ⬜ |
| Play Store | Second magasin, donc second public : les douze testeurs ont tenu quatorze jours (22 septembre), l'accès à la production a été accordé le 17 octobre 2026, la 1.0.4 a été mise en ligne le 20 octobre, la 1.0.6 le 22 octobre, et la 1.0.7 est en ligne (vérifié le 31 octobre 2026) (`docs/PUBLICATION.md`) | ✅ |

---

## Calendrier

| Période | Opportunité | Angle |
|---|---|---|
| Septembre | Rentrée scolaire + Journées du patrimoine | Campagne enseignants, clip « révise en jouant » |
| Novembre–décembre | Cadeaux, temps en famille | Mise en avant du Défi du jour à faire en famille, push presse « jeux pour les fêtes » |
| Janvier | Résolutions « culture générale » | Clip défi du jour, « 1 fait par jour » |
| Mai–juin | Révisions du brevet | Le pic naturel : dossier profs re-poussé, mots-clés « brevet » dans la fiche |
| Juillet–août | Vacances, trajets | « Le jeu de la voiture » ; anniversaires historiques de l'été (14 juillet, premiers pas sur la Lune le 21 juillet) |
| Toute l'année | Anniversaires d'événements du jeu | Le calendrier éditorial est déjà dans `assets/events.json` : 1 830 dates à célébrer |

---

## Mesures

- **Téléchargements** : à vérifier dans la console (App Store Connect et Play Console)
- **Note App Store** : aucune note au 30 octobre 2026
- **Note Google Play** : à vérifier dans la console (en ligne depuis le 20 octobre 2026)
- **Rétention J1 et J7** : à vérifier dans la console
- **Participants au Défi du jour** : à vérifier dans la console (classement `erea.daily`)
- **Ventes « Erea sans publicité »** : à vérifier dans la console
- **Revenus publicitaires AdMob** : à vérifier dans la console
- **Usage des modes dans l'app** : à instrumenter — aucun analytics propre, par choix

Contrainte assumée : **pas d'analytics à nous dans l'app**. Seul le SDK
publicitaire de Google collecte, et sa déclaration couvre publicité,
analyse et prévention des fraudes (déclaration Play) ; ces données
restent chez Google. On suit donc ce que fournissent les plateformes.
L'app est en ligne sur l'App Store depuis le 3 septembre 2026.

## Objectifs chiffrés

| Métrique | Objectif |
|---|---|
| Téléchargements | tendance, pas de seuil |
| Rétention J1 | > 30 % |
| Rétention J7 | > 15 % |
| Participants au Défi du jour (`erea.daily`) | croissance hebdomadaire |
| Longueur des séries (`erea.streak`) | médiane ≥ 3 |
| Note App Store | ≥ 4,5 |
| Conversion de la fiche (vues → installations) | > 30 % |
| Ventes « Erea sans publicité » | 2 à 5 % des actifs |
| Revenus publicitaires | premier versement au seuil de 70 € |

Si un besoin plus fin apparaît (entonnoir d'onboarding, usage des
modes), il faudra trancher pour un analytics respectueux (TelemetryDeck
ou équivalent, sans identifiant) : une décision explicite, qui ajouterait
une collecte à la fiche de confidentialité.

---

## Les 3 priorités

- **Booster par « Promouvoir » les pubs TikTok qui prennent le mieux** sur « erea.jeu » (deux publiées le 29 octobre, 25 programmées jusqu'au 6 novembre), avec le lien `https://erea.toakeur.com/telecharger/?src=tiktok` qui mène aux deux boutiques : aucune promotion payante n'a encore été lancée.
- **Envoyer le dossier « Erea en classe »** aux professeurs d'histoire-géographie et à leurs groupes : c'est le public naturel d'un jeu familial calé sur les repères du brevet, et rien ne lui a encore été adressé.
- **Se déclarer trader (DSA)** sur l'App Store et Google Play : l'app rapporte maintenant sur les deux boutiques, et la déclaration « non-trader » ne tient plus ; à faire dès que le compte Apple est converti en compte organisation (Jean a répondu à Apple le 29 octobre 2026 pour lancer la migration ; réponse d'Apple attendue au 30 octobre).

## Déjà fait

- ✅ **Game Center** — capacité App ID, six classements, entitlement : fait le 4 août 2026, vérifié sur appareil réel.
- ✅ **App Store** — 1.0.0 en ligne le 3 septembre 2026, 1.0.2 avec pub et achat le 8 septembre.
- ✅ **Partage en feuille native** avec le lien de la boutique.
- ✅ **Demande de note in-app.**
- ✅ **Monétisation en ligne** — publicité + achat 3,99 €, depuis la 1.0.2.
- ✅ **Smart App Banner** sur les pages de la vitrine.
- ✅ **Badge App Store sur la vitrine** — fini « Bientôt sur l'App Store », 12 octobre 2026.
- ✅ **Douze testeurs Android pendant quatorze jours** — du 8 au 22 septembre 2026.
- ✅ **Accès à la production Google Play demandé** — 14 octobre 2026, accordé le 17 octobre.
- ✅ **Première version sur Google Play** — la 1.0.4, envoyée le 17 octobre, mise en production le 20 octobre 2026.
- ✅ **Badge Google Play sur la vitrine et page `/telecharger/` ouverte à Android** — 21 octobre 2026.
- ✅ **1.0.4 sur l'App Store** sous le nom long, captures légendées — mise en ligne le 15 octobre 2026.
- ✅ **1.0.5 mise en ligne sur les deux boutiques** — le 21 octobre 2026 ; 1.0.6 (Android seul) mise en ligne sur Google Play le 22 octobre.
- ⏳ **1.0.7 envoyée aux deux boutiques** — 30 octobre 2026 au soir (Album, Classique en tête de l'accueil, icônes dessinées) : en ligne sur Google Play (vérifié le 31 octobre 2026), en examen chez Apple ; `app-ads.txt` publié le même jour sur `erea.toakeur.com`.
- ✅ **Adresse et contact propres** — `erea.toakeur.com` et `erea@toakeur.com`, 7 octobre 2026.
- ✅ **Premières pubs publiées sur TikTok « erea.jeu »** — 29 octobre 2026, par le Planning via Buffer.
