# Erea — plan marketing & rémunération

> Généré le 3 août 2026, mis à jour le 12 octobre 2026. Le modèle de
> rémunération est en ligne sur l'App Store depuis la 1.0.2 (publicité +
> achat unique qui la retire). Pour le mettre à jour : relancer ce même prompt. Aucun secret
> ici.
>
> Légende : ✅ fait · ⬜ à faire.

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
| Familles francophones (parents + 8-15 ans) | Cœur de cible du ton et du mode Facile (191 faits « grand public ») | « Le jeu d'histoire pour toute la famille » |
| Collégiens / brevet | Le niveau 1 s'appuie sur les repères officiels du brevet | « Révise tes repères sans t'en rendre compte » |
| Afrique de l'Ouest francophone | Onboarding avec choix du pays (30 pays africains proposés), mélange 50/50 avec le pack Afrique (196 faits) — rare dans le genre | « Enfin un jeu d'histoire qui parle de chez toi » |
| Amateurs de culture G / joueurs de quiz | Modes Difficile et Chrono, classements mondiaux | « Tu peux faire mieux que moi ? » |

---

## Modèle de rémunération

**Modèle actuel : publicité pour tous, achat unique pour la retirer.**
Décidé et câblé en août 2026 (décision du développeur, le 16 août :
« monétiser aussitôt »). C'est le modèle le plus courant du jeu casual,
et le plus efficace — l'acheteur sait exactement ce qu'il achète, et la
publicité fait elle-même la promotion de l'achat.

| Pièce | Détail | Statut |
|---|---|---|
| Interstitielle AdMob | À la sortie de l'écran de fin, une partie sur deux, jamais dans le Défi du jour (`lib/core/pub.dart`) | ✅ en ligne sur iOS depuis la 1.0.2 (8 septembre 2026) |
| « Erea sans publicité » | Achat unique non consommable `com.teiki.erea.sanspub`, **3,99 €** — il ne débloque rien, le jeu est déjà complet | ✅ approuvé sur l'App Store le 8 septembre, actif sur Google Play |
| Consentement | Formulaire UMP de Google + ATT sur iOS, révocable depuis les réglages ; message RGPD et message IDFA publiés dans AdMob | ✅ |
| Android | Même modèle, prêt dans le test fermé | ⬜ pas encore en production |

**Ce que ça a coûté, en connaissance de cause :** le badge « Aucune
donnée collectée » (la fiche de confidentialité de l'App Store a changé
avec la 1.0.2), l'argument « sans pub » de la description, et le statut
**trader** du DSA — coordonnées publiques sur la fiche UE, déclaration
pas encore faite.

**Modèles écartés, et pourquoi :**
- **Abonnement** — le rythme de production de contenu (1 831 faits, mais
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
| Nom | saisi : `Erea` (la variante `Erea — Devine l'année !` remonterait mieux en recherche) | ✅ |
| Sous-titre | `Le jeu d'histoire en famille` | ✅ |
| Mots-clés (100 **octets**, accents comptés double) | `quiz,frise,chronologie,date,culture,générale,brevet,éducatif,afrique,collège,révision,enfant` — 97 octets, saisis (le texte qui fait foi est dans `docs/FICHE_APP_STORE.md`) | ✅ |
| Description | corrigée le 7 septembre 2026 avec la 1.0.2 : plus de « sans publicité », plus de mode Duel | ✅ |
| Captures | App Store déposées le 9 août : iPhone 6,9″ (1260 × 2736) et iPad 13″ (2064 × 2752) ; Play : sept captures légendées envoyées le 16 septembre | ✅ |
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
| Badge « Télécharger dans l'App Store » | Badge officiel d'Apple sur la vitrine, en tête et en bas de page, vers la fiche `id6794918301` ; Android annoncé « bientôt sur Google Play » — depuis le 12 octobre 2026 | ✅ |
| Enseignants & parents | Dossier d'une page « Erea en classe » (repères du brevet couverts, mode Facile, zéro collecte) à envoyer aux profs d'histoire-géo, groupes Facebook de profs, La Salle des Maîtres | ⬜ |
| Afrique de l'Ouest | Mise en avant du pack Afrique auprès des communautés éducatives francophones (Sénégal, Côte d'Ivoire…) ; presse tech locale ; créateurs de contenu éducation | ⬜ |
| Réseaux sociaux | Comptes communs du Studio branchés au Planning : TikTok « Afrotok » et YouTube « toa.afrotok ». Pubs vidéo produites par le Studio le 5 octobre 2026 (« le temps qui bugue ») : une validée le 6 octobre, huit à valider. **Aucune publication** : le Planning est vide | ⬜ |
| Presse & sites spécialisés | App du jour (iPhon.fr, iGen, Frandroid), sites parents (Geek Junior, Super Julie — références du jeu éducatif) | ⬜ |
| Featuring Apple | Formulaire « App Store featuring » : app famille, française, hors ligne, avec Game Center — bon dossier, même si l'argument « sans pub » est tombé avec la 1.0.2 | ⬜ |
| Play Store | Second magasin, donc second public : les douze testeurs ont tenu quatorze jours (22 septembre), l'accès à la production reste à demander (`docs/PUBLICATION.md`) | ⬜ |

---

## Calendrier

| Période | Opportunité | Action |
|---|---|---|
| Septembre | Rentrée scolaire + Journées du patrimoine | Campagne enseignants, clip « révise en jouant » |
| Novembre–décembre | Cadeaux, temps en famille | Mise en avant du Défi du jour à faire en famille, push presse « jeux pour les fêtes » |
| Janvier | Résolutions « culture générale » | Clip défi du jour, « 1 fait par jour » |
| Mai–juin | Révisions du brevet | Le pic naturel : dossier profs re-poussé, mots-clés « brevet » dans la fiche |
| Juillet–août | Vacances, trajets | « Le jeu de la voiture » ; anniversaires historiques de l'été (14 juillet, premiers pas sur la Lune le 21 juillet) |
| Toute l'année | Anniversaires d'événements du jeu | Le calendrier éditorial est déjà dans `assets/events.json` : 1 831 dates à célébrer |

---

## KPIs

Contrainte assumée : **pas d'analytics tiers dans l'app** (seul le SDK
publicitaire de Google collecte, pour la pub). On suit donc ce que
fournissent les plateformes. L'app est en ligne sur l'App Store depuis
le 3 septembre 2026 ; les chiffres d'usage sont à lire dans la console.

| Métrique | Valeur | Objectif |
|---|---|---|
| Téléchargements (App Store Connect) | à vérifier dans la console | tendance, pas de seuil |
| Rétention J1 (App Store Connect) | — | > 30 % |
| Rétention J7 (App Store Connect) | — | > 15 % |
| Participants au défi du jour (scores sur `erea.daily`) | — | croissance hebdomadaire |
| Longueur des séries (scores sur `erea.streak`) | — | médiane ≥ 3 |
| Note App Store | aucune note au 12 octobre 2026 | ≥ 4,5 |
| Taux de conversion de la fiche (vues → installs) | — | > 30 % |
| Ventes « Erea sans publicité » | — | 2 à 5 % des actifs |
| Revenus publicitaires (AdMob) | à vérifier dans la console | premier versement au seuil de 70 € |

⬜ Si un besoin plus fin apparaît (entonnoir d'onboarding, usage des
modes), trancher alors pour un analytics respectueux (TelemetryDeck ou
équivalent, sans identifiant) — décision explicite à prendre, car elle
ferait perdre le « aucune donnée collectée » de la fiche.

---

## Les 3 priorités

- **Demander l'accès à la production sur Google Play**, avec la 1.0.4 sur la piste : les quatorze jours sont tenus depuis le 22 septembre, et c'est tout un second public qui attend derrière.
- **Publier la pub vidéo validée** du Studio sur TikTok « Afrotok » et YouTube « toa.afrotok » par le Planning, puis trier les huit vidéos en attente : aucune publication n'a encore eu lieu.
- **Envoyer le dossier « Erea en classe »** aux professeurs d'histoire-géographie et à leurs groupes : c'est le public naturel d'un jeu familial calé sur les repères du brevet, et rien ne lui a encore été adressé.

## Déjà fait

- ✅ **Game Center** — capacité App ID, six classements, entitlement : fait le 4 août 2026, vérifié sur appareil réel.
- ✅ **App Store** — 1.0.0 en ligne le 3 septembre 2026, 1.0.2 avec pub et achat le 8 septembre.
- ✅ **Partage en feuille native** avec le lien de la boutique.
- ✅ **Demande de note in-app.**
- ✅ **Monétisation en ligne** — publicité + achat 3,99 €, depuis la 1.0.2.
- ✅ **Smart App Banner** sur les pages de la vitrine.
- ✅ **Badge App Store sur la vitrine** — fini « Bientôt sur l'App Store », 12 octobre 2026.
- ✅ **Douze testeurs Android pendant quatorze jours** — du 8 au 22 septembre 2026.
- ✅ **Adresse et contact propres** — `erea.toakeur.com` et `erea@toakeur.com`, 7 octobre 2026.
