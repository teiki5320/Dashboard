# Erea — plan marketing & rémunération

> Généré le 3 août 2026 après scan du dépôt (mécaniques de partage,
> fiche web, notifications, classements, monétisation). Pour le mettre à
> jour : relancer le même prompt dans Claude Code. Aucun secret ici.
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
- **Sans friction ni tracking** : hors ligne, sans compte, sans pub, sans
  collecte — argument fort auprès des parents et des enseignants.

**Les publics, par ordre de priorité :**

| Public | Pourquoi eux | Accroche |
|---|---|---|
| Familles francophones (parents + 8-15 ans) | Cœur de cible du ton et du mode Facile (191 faits « grand public ») | « Le jeu d'histoire pour toute la famille » |
| Collégiens / brevet | Le niveau 1 s'appuie sur les repères officiels du brevet | « Révise tes repères sans t'en rendre compte » |
| Afrique de l'Ouest francophone | Onboarding avec choix du pays (30 pays africains proposés), mélange 50/50 avec le pack Afrique (196 faits) — rare dans le genre | « Enfin un jeu d'histoire qui parle de chez toi » |
| Amateurs de culture G / joueurs de quiz | Modes Difficile et Chrono, classements mondiaux | « Tu peux faire mieux que moi ? » |

---

## 2. Rémunération, en phases

Aujourd'hui : **rien n'est câblé, et c'est volontaire** — d'abord une base
de joueurs, ensuite la monétisation. Aucune dépendance de paiement, de pub
ou d'abonnement dans `pubspec.yaml`.

| Phase | Modèle | Détail | Statut |
|---|---|---|---|
| 0 — Bêta | Gratuit intégral | TestFlight, tout ouvert, zéro pub | ✅ (état actuel) |
| 1 — Lancement | Gratuit intégral | Sortie App Store sans monétisation : viser les notes, les partages et un éventuel featuring Apple (une app famille sans pub ni tracking coche leurs cases) | ⬜ |
| 2 — Premium doux | Achat unique « Erea + » (in-app) | Les modes du quotidien restent gratuits (Classique, Défi du jour). L'achat débloque en une fois : packs thématiques supplémentaires, thèmes de frise cosmétiques, statistiques détaillées. Prix indicatif : 4,99 € | ⬜ |
| 3 — Contenu | Packs à l'unité (in-app) | Nouveaux packs (mythologie, sports, musique…) vendus 1,99 € pièce ou inclus dans Erea + | ⬜ |
| 4 — Institutionnel | Licence éducation | Offre écoles/médiathèques (achat en volume Apple School Manager) si la traction enseignants se confirme | ⬜ |

**Modèles écartés, et pourquoi :**
- **Publicité** — incompatible avec le positionnement famille/enfants
  (règles App Store strictes pour les moins de 13 ans) et avec l'argument
  « sans pub ni tracking » qui est notre meilleur différenciant.
- **Abonnement** — le rythme de production de contenu (1 738 faits, mais
  pas de flux hebdomadaire) ne justifie pas un récurrent ; un abonnement
  mal nourri détruit les notes.

---

## 3. ASO (App Store Optimization)

| Élément | Contenu proposé | Statut |
|---|---|---|
| Nom | `Erea — Devine l'année !` | ⬜ (à saisir dans App Store Connect) |
| Sous-titre | `Le jeu d'histoire en famille` | ⬜ |
| Mots-clés (100 car.) | `histoire,quiz,frise,chronologie,date,année,culture,générale,brevet,famille,éducatif,afrique` | ⬜ |
| Description | Reprendre le pitch du `README.md` (modes, frise non linéaire, défi du jour, 1 738 faits vérifiés) en ouvrant sur l'angle famille | ⬜ |
| Captures | 6 par taille (6,9″ et iPad obligatoires) : ① frise en pleine partie, ② révélation « PERFECT 🎯 », ③ défi du jour + série, ④ grille de partage, ⑤ Chrono, ⑥ collection. Textes courts par capture (« Fais défiler le temps ») | ⬜ |
| Vidéo de preview | 15-20 s : le geste de défilement, une révélation, la grille copiée | ⬜ (optionnel mais le geste est notre meilleur argument) |
| Notes & avis | Demande de note in-app (plugin `in_app_review`) déclenchée au bon moment : après une série de 3 défis du jour ou un PERFECT — jamais au premier lancement | ⬜ |
| Fiche confidentialité | « Aucune donnée collectée » (voir `docs/INFRA.md`) — un badge rare qui rassure les parents | ⬜ (à déclarer, l'app le permet déjà) |
| Localisation fiche | Français d'abord ; anglais plus tard seulement si le contenu du jeu est traduit | ⬜ |

---

## 4. Canaux d'acquisition

| Canal | Détail | Statut |
|---|---|---|
| Partage de grille (bouche-à-oreille) | Grille emoji sans spoiler + série 🔥, bouton « 📋 Copier ma grille » (`lib/ui/game_screen.dart`) | ✅ copie presse-papiers · ⬜ feuille de partage native (`share_plus`) avec lien App Store dans le texte |
| Défi du jour + rappel | Mêmes questions pour tous, une tentative/jour, rappel local 18 h 30 (`lib/core/rappels.dart`) — le moteur de rétention qui alimente le partage | ✅ |
| Classements mondiaux | Game Center : défi, série, Classique ×3, Chrono (`lib/core/classement.dart`) | ✅ actif depuis le 4 août 2026, vérifié sur appareil réel · ⬜ attacher les classements à la version avant soumission |
| Prototype web comme vitrine | `teiki5320.github.io/erea` : jouable sans installer, balises OpenGraph/Twitter + schema.org déjà en place (`index.html`) | ✅ vitrine · ⬜ bandeau « Disponible sur l'App Store » + Smart App Banner une fois l'app publiée |
| Enseignants & parents | Dossier d'une page « Erea en classe » (repères du brevet couverts, mode Facile, zéro pub/collecte) à envoyer aux profs d'histoire-géo, groupes Facebook de profs, La Salle des Maîtres | ⬜ |
| Afrique de l'Ouest | Mise en avant du pack Afrique auprès des communautés éducatives francophones (Sénégal, Côte d'Ivoire…) ; presse tech locale ; créateurs de contenu éducation | ⬜ |
| Réseaux sociaux | Compte unique (TikTok ou Instagram) : clips « saurez-vous dater cet événement ? » — le geste de frise est fait pour le format court. Marronniers : anniversaires d'événements du jeu | ⬜ |
| Presse & sites spécialisés | App du jour (iPhon.fr, iGen, Frandroid), sites parents (Geek Junior, Super Julie — références du jeu éducatif) | ⬜ |
| Featuring Apple | Formulaire « App Store featuring » après la sortie : app famille, française, sans pub, avec Game Center — bon dossier | ⬜ |

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
| Erea + (phase 2) | App Store Connect → ventes | conversion 2-5 % des actifs |

⬜ Si un besoin plus fin apparaît (entonnoir d'onboarding, usage des
modes), trancher alors pour un analytics respectueux (TelemetryDeck ou
équivalent, sans identifiant) — décision explicite à prendre, car elle
ferait perdre le « aucune donnée collectée » de la fiche.

---

## 7. Prochaines actions, dans l'ordre

1. ✅ **Game Center** (capacité App ID + 6 classements + entitlement) —
   fait le 4 août 2026, vérifié sur appareil réel. Le défi du jour
   mondial, moteur de tout le plan, est en service.
2. ⬜ **Préparer la fiche App Store** : nom, sous-titre, mots-clés,
   description, captures (§3) + déclaration « aucune donnée collectée ».
3. ⬜ **Passer le partage en feuille native** (`share_plus`) en gardant la
   copie, et ajouter le lien App Store au texte partagé — chaque grille
   devient une pub.
4. ⬜ **Ajouter la demande de note in-app** (`in_app_review`) après une
   série de 3 ou un PERFECT.
5. ⬜ **Sortir en App Store** (phase 1, gratuit) et soumettre le dossier de
   featuring Apple.
6. ⬜ **Relier la vitrine web à l'app** : Smart App Banner + bouton sur
   `teiki5320.github.io/erea`.
7. ⬜ **Dossier enseignants** une page + envois ciblés (timing : rentrée ou
   avant le brevet).
8. ⬜ **Ouvrir le compte social unique** et publier 2 clips tests du geste
   de frise.
9. ⬜ **Décider la phase 2** (Erea +) une fois ~1 000 joueurs actifs : ne
   rien monétiser avant d'avoir des notes solides.
