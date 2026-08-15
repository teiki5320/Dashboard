# Erea — plan marketing & rémunération

> Généré le 3 août 2026, mis à jour le 5 août 2026 après scan du dépôt (mécaniques de partage,
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

## 2 bis. La publicité : option ouverte, décision à prendre

⚠️ Ce document a longtemps classé la publicité en « modèle écarté ». Ce
n'était pas une décision du développeur mais une conclusion écrite à sa
place. Elle est rouverte : **le choix lui revient, à la lumière des
chiffres de la phase 1.**

Le modèle envisagé est le plus courant du jeu casual, et le plus
efficace : **publicité pour tous, achat unique pour la retirer.** Il
convertit mieux qu'un déblocage de contenu — l'acheteur sait exactement
ce qu'il achète, et la publicité fait elle-même la promotion de l'achat.

**Ce qu'il en coûte, à mettre en balance :**

| Ce qu'on gagne | Ce qu'on perd |
|---|---|
| Un revenu proportionnel au nombre de parties, pas au nombre d'acheteurs | Le badge **« Aucune donnée collectée »** : les régies collectent, la fiche de confidentialité change |
| Une proposition d'achat limpide (« enlever la pub ») | L'argument « sans pub ni tracking » de la description, et du dossier featuring Apple |
| Un modèle qui monte avec l'audience | Un bandeau de consentement RGPD au premier lancement, plus App Tracking Transparency sur iOS — friction et chantier technique |

**Le point décisif : sans volume, la publicité ne rapporte rien.** Elle
se compte en milliers d'impressions. La brancher avant d'avoir des
joueurs, c'est payer le badge et le chantier pour zéro euro.

**Ordre recommandé** : sortir la 1.0 sans publicité (c'est fait),
mesurer trois mois, puis décider en 1.1 avec des chiffres plutôt qu'avec
des principes. Si le volume n'est pas au rendez-vous, le problème
n'était pas le modèle mais l'audience — et la publicité n'y aurait rien
changé.

**Modèle écarté, et pourquoi :**
- **Abonnement** — le rythme de production de contenu (1 738 faits, mais
  pas de flux hebdomadaire) ne justifie pas un récurrent ; un abonnement
  mal nourri détruit les notes.

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
| Mots-clés (100 **octets**, accents comptés double) | `quizz,frise,chronologie,date,culture,générale,brevet,éducatif,afrique,collège,révision,enfant` | ✅ |
| Description | rédigée et saisie — texte intégral dans `docs/FICHE_APP_STORE.md` | ✅ |
| Captures | 6 par taille (iPhone 6,5″ et iPad obligatoires — se fier au cadre de dépôt) : ① frise en pleine partie, ② révélation « PERFECT 🎯 », ③ défi du jour + série, ④ grille de partage, ⑤ Chrono, ⑥ Roulette des drapeaux. Textes courts par capture (« Fais défiler le temps ») | ⬜ |
| Vidéo de preview | 15-20 s : le geste de défilement, une révélation, la grille copiée | ⬜ (optionnel mais le geste est notre meilleur argument) |
| Notes & avis | Demande de note in-app (`lib/core/avis.dart`) : après un PERFECT, un record ou 3 défis d'affilée, une seule fois, jamais au lancement | ✅ fait le 5 août 2026 |
| Fiche confidentialité | « Aucune donnée collectée » — déclarée et publiée | ✅ |
| Localisation fiche | Français d'abord ; anglais plus tard seulement si le contenu du jeu est traduit | ⬜ |

---

## 4. Canaux d'acquisition

| Canal | Détail | Statut |
|---|---|---|
| Partage de grille (bouche-à-oreille) | Grille emoji sans spoiler + série 🔥, feuille de partage iOS native, lien App Store dans le texte (`lib/ui/game_screen.dart`) | ✅ fait le 5 août 2026 |
| Défi du jour + rappel | Mêmes questions pour tous, une tentative/jour, rappel local 18 h 30 (`lib/core/rappels.dart`) — le moteur de rétention qui alimente le partage | ✅ |
| Classements mondiaux | Game Center : défi, série, Classique ×3, Chrono (`lib/core/classement.dart`) | ✅ actif et attaché à la version 1.0.0 |
| Vitrine web | `teiki5320.github.io/erea` : page de présentation dédiée, le jeu jouable sur `/jeu.html` | ✅ · ⬜ bandeau « Disponible sur l'App Store » + Smart App Banner une fois l'app publiée |
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
3. ✅ **Partage en feuille native** avec le lien App Store — fait.
4. ✅ **Demande de note in-app** — faite.
5. ⬜ **Sortir en App Store** (phase 1, gratuit) et soumettre le dossier de
   featuring Apple. Il ne manque que les captures d'écran.
6. ⬜ **Relier la vitrine web à l'app** : Smart App Banner + bouton sur
   `teiki5320.github.io/erea`.
7. ⬜ **Dossier enseignants** une page + envois ciblés (timing : rentrée ou
   avant le brevet).
8. ⬜ **Ouvrir le compte social unique** et publier 2 clips tests du geste
   de frise.
9. ⬜ **Décider la phase 2** (Erea +) une fois ~1 000 joueurs actifs : ne
   rien monétiser avant d'avoir des notes solides.
