# Erea — plan marketing & rémunération

> Généré le 3 août 2026, mis à jour le 18 août 2026 : **le modèle de
> rémunération est choisi et câblé** (publicité + achat unique qui la
> retire). Pour le mettre à jour : relancer le même prompt dans Claude
> Code. Aucun secret ici.
>
> Légende : ✅ câblé dans le code · ⬜ à faire (proposition).

---

## 1. Positionnement

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

## 2. Rémunération : le modèle choisi

**Décidé et câblé en août 2026** (décision du développeur, le 16 août :
« monétiser aussitôt ») : **publicité pour tous, achat unique pour la
retirer.** Le modèle le plus courant du jeu casual, et le plus
efficace — l'acheteur sait exactement ce qu'il achète, et la publicité
fait elle-même la promotion de l'achat.

| Pièce | Détail | Statut |
|---|---|---|
| Interstitielle AdMob | À la sortie de l'écran de fin, une partie sur deux, jamais dans le Défi du jour (`lib/core/pub.dart`) | ✅ câblée, identifiants réels, part avec la 1.1 |
| « Erea sans publicité » | Achat unique non consommable `com.teiki.erea.sanspub`, **3,99 €** — il ne débloque rien, le jeu est déjà complet | ✅ câblé, produit créé le 18 août |
| Consentement | Formulaire UMP de Google + ATT sur iOS, révocable depuis les réglages | ✅ câblé |
| Version 1.0 | Sortie **sans** publicité (build 90, antérieur au câblage) : la monétisation arrive avec la **1.1** | soumise |

**Ce que ça a coûté, en connaissance de cause :** le badge « Aucune
donnée collectée » (les fiches de confidentialité des deux boutiques
changent avec la 1.1), l'argument « sans pub » de la description, et le
statut **trader** du DSA — coordonnées publiques sur la fiche UE.

**Modèles écartés, et pourquoi :**
- **Abonnement** — le rythme de production de contenu (1 738 faits, mais
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

## 3. ASO (App Store Optimization)

| Élément | Contenu proposé | Statut |
|---|---|---|
| Nom | saisi : `Erea` (la variante `Erea — Devine l'année !` remonterait mieux en recherche) | ✅ |
| Sous-titre | `Le jeu d'histoire en famille` | ✅ |
| Mots-clés (100 **octets**, accents comptés double) | `quiz,frise,chronologie,date,culture,générale,brevet,éducatif,afrique,collège,révision,enfant` — 97 octets, saisis (le texte qui fait foi est dans `docs/FICHE_APP_STORE.md`) | ✅ |
| Description | rédigée et saisie ; **à remplacer avec la 1.1** (elle promet encore « sans publicité ») — le texte corrigé est prêt dans `docs/FICHE_APP_STORE.md` | ✅ / ⬜ 1.1 |
| Captures | déposées le 9 août : iPhone 6,9″ (1260 × 2736) et iPad 13″ (2064 × 2752), les deux seules tailles obligatoires en 2026 | ✅ |
| Vidéo de preview | 15-20 s : le geste de défilement, une révélation, la grille copiée | ⬜ (optionnel mais le geste est notre meilleur argument) |
| Notes & avis | Demande de note in-app (`lib/core/avis.dart`) : après un PERFECT, un record ou 3 défis d'affilée, une seule fois, jamais au lancement | ✅ fait le 5 août 2026 |
| Fiche confidentialité | « Aucune donnée collectée » pour la 1.0 ; **à refaire pour la 1.1** (collectes du SDK AdMob — tableau prêt dans `docs/FICHE_APP_STORE.md`) | ✅ / ⬜ 1.1 |
| Localisation fiche | Français d'abord ; anglais plus tard seulement si le contenu du jeu est traduit | ⬜ |

---

## 4. Canaux d'acquisition

| Canal | Détail | Statut |
|---|---|---|
| Partage de grille (bouche-à-oreille) | Grille emoji sans spoiler + série 🔥, feuille de partage iOS native, lien App Store dans le texte (`lib/ui/game_screen.dart`) | ✅ fait le 5 août 2026 |
| Défi du jour + rappel | Mêmes questions pour tous, une tentative/jour, rappel local 18 h 30 (`lib/core/rappels.dart`) — le moteur de rétention qui alimente le partage | ✅ |
| Classements mondiaux | Game Center : défi, série, Classique ×3, Chrono (`lib/core/classement.dart`) | ✅ actif et attaché à la version 1.0.0 |
| Vitrine web | `teiki5320.github.io/erea` : page de présentation dédiée, le jeu jouable sur `/jeu.html`. Smart App Banner posé sur les quatre pages le 17 août (inerte jusqu'à la publication) | ✅ · ⬜ bandeau visible « Disponible sur l'App Store » à la sortie |
| Enseignants & parents | Dossier d'une page « Erea en classe » (repères du brevet couverts, mode Facile, zéro pub/collecte) à envoyer aux profs d'histoire-géo, groupes Facebook de profs, La Salle des Maîtres | ⬜ |
| Afrique de l'Ouest | Mise en avant du pack Afrique auprès des communautés éducatives francophones (Sénégal, Côte d'Ivoire…) ; presse tech locale ; créateurs de contenu éducation | ⬜ |
| Réseaux sociaux | Compte unique (TikTok ou Instagram) : clips « saurez-vous dater cet événement ? » — le geste de frise est fait pour le format court. Marronniers : anniversaires d'événements du jeu | ⬜ |
| Presse & sites spécialisés | App du jour (iPhon.fr, iGen, Frandroid), sites parents (Geek Junior, Super Julie — références du jeu éducatif) | ⬜ |
| Featuring Apple | Formulaire « App Store featuring » après la sortie : app famille, française, hors ligne, avec Game Center — bon dossier, même si l'argument « sans pub » est tombé avec la 1.1 | ⬜ |

---

## 5. Calendrier saisonnier

| Période | Opportunité | Action |
|---|---|---|
| Septembre | Rentrée scolaire + Journées du patrimoine | Campagne enseignants, clip « révise en jouant » |
| Novembre–décembre | Cadeaux, temps en famille | Mise en avant du mode Duel sur un téléphone, push presse « jeux pour les fêtes » |
| Janvier | Résolutions « culture générale » | Clip défi du jour, « 1 fait par jour » |
| Mai–juin | Révisions du brevet | Le pic naturel : dossier profs re-poussé, mots-clés « brevet » dans la fiche |
| Juillet–août | Vacances, trajets | « Le jeu de la voiture » ; anniversaires historiques de l'été (14 juillet, premiers pas sur la Lune le 21 juillet) |
| Toute l'année | Anniversaires d'événements du jeu | Le calendrier éditorial est déjà dans `assets/events.json` : 1 738 dates à célébrer |

---

## 6. KPIs à suivre

Contrainte assumée : **pas d'analytics tiers dans l'app** (c'est un
argument marketing). On suit donc ce que fournissent les plateformes :

| KPI | Source | Cible de départ |
|---|---|---|
| Téléchargements / pays | App Store Connect → Analytics | tendance, pas de seuil |
| Rétention J1 / J7 | App Store Connect (opt-in) | J1 > 30 %, J7 > 15 % |
| Participants au défi du jour | Nombre de scores sur `erea.daily` (Game Center) — c'est notre proxy de joueurs actifs quotidiens | croissance hebdo |
| Longueur des séries | Scores sur `erea.streak` | médiane ≥ 3 |
| Note App Store | Fiche | ≥ 4,5 |
| Taux de conversion fiche | App Store Connect (vues → installs) | > 30 % |
| Ventes « Erea sans publicité » | App Store Connect → ventes | conversion 2-5 % des actifs |
| Revenus publicitaires | AdMob → Rapports (eCPM, impressions) | tendance ; versement dès 70 € |

⬜ Si un besoin plus fin apparaît (entonnoir d'onboarding, usage des
modes), trancher alors pour un analytics respectueux (TelemetryDeck ou
équivalent, sans identifiant) — décision explicite à prendre, car elle
ferait perdre le « aucune donnée collectée » de la fiche.

---

## 7. Prochaines actions, dans l'ordre

1. ✅ **Game Center** (capacité App ID + 6 classements + entitlement) —
   fait le 4 août 2026, vérifié sur appareil réel. Le défi du jour
   mondial, moteur de tout le plan, est en service.
2. ✅ **Fiche App Store** complète — soumise le 14 août 2026 (build 90),
   complément vidéo envoyé le 18 août.
3. ✅ **Partage en feuille native** avec le lien App Store — fait.
4. ✅ **Demande de note in-app** — faite.
5. ✅ **Monétisation choisie et câblée** (publicité + achat 3,99 €, §2) —
   part avec la 1.1.
6. ✅ **Smart App Banner** sur les quatre pages de la vitrine — fait le
   17 août, visible dès la publication.
7. ⬜ **Publier la 1.0** (clic manuel après validation Apple), puis
   **sortir la 1.1** dans la foulée — c'est elle qui rapporte.
8. ⬜ **Dossier de featuring Apple** une fois l'app en ligne.
9. ⬜ **Dossier enseignants** une page + envois ciblés (timing : rentrée ou
   avant le brevet — la rentrée 2026 est dans deux semaines).
10. ⬜ **Ouvrir le compte social unique** et publier 2 clips tests du geste
    de frise.
