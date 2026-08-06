# MARKETING — plan marketing & rémunération

> Généré le 3 août 2026 après scan du dépôt. **Pour le mettre à jour :
> relancer le même prompt.** Aucun secret dans ce fichier.
>
> État du scan : **rien n'est câblé aujourd'hui** côté marketing — pas de
> partage in-app, pas de demande d'avis, pas d'achat intégré, pas
> d'analytics, pas de liens sociaux, pas de newsletter. Le jeu est distribué
> en bêta TestFlight uniquement. Tout ce qui suit en ⬜ est une proposition.

## Positionnement

**L'angle** : *le drama qui se joue dans un vrai téléphone.* Pas un jeu qui
raconte une histoire — un téléphone qu'on fouille : les textos, la banque à
214 €, les photos, la musique. Un thriller romantique français, épisodique
comme une série, qui se lit en textos comme les siens.

**Une phrase** : « Tu es Shen, 24 ans, livreuse à vélo. Un milliardaire te
renverse. Il te propose 30 000 €. Ta mère est malade. Réponds. »

**Publics, du cœur vers l'extérieur** :
1. Lectrices/lecteurs de **romance-drama** 16-35 ans (Wattpad, Webtoon,
   BookTok) — le public des *chat stories* (Hooked, Yarn) mal servi en
   français ;
2. Joueurs de **fiction interactive** (Lifeline, SIMULACRA, Choices) qui
   cherchent de l'écriture soignée ;
3. Public **séries françaises** (le ton « Dix pour cent rencontre
   Plus belle la vie chez les milliardaires ») qui ne se dit pas joueur.

**Différenciateurs** : 100 % français d'origine (pas une traduction),
réalisme maniaque (photos crédibles, vraie appli bancaire, choix
chronométrés), gratuit du tracking (« aucune pub, aucun tracker » est un
argument), épisodes courts sur un rythme de série.

## Rémunération — en phases

| Phase | Modèle | Détail | Statut |
|---|---|---|---|
| 0 — Bêta | Gratuit (TestFlight) | Épisode 1 complet, retours qualitatifs | ✅ câblé (en cours) |
| 1 — Lancement | **Gratuit avec l'épisode 1** | Sortie App Store, l'épisode 1 entier gratuit = produit d'appel | ⬜ à faire |
| 2 — Saison | **Achat unique « Saison 1 »** (épisodes 2 → fin, ~4,99 €) via StoreKit (`in_app_purchase`) | Un seul achat, pas d'abonnement, pas d'énergie/attente payante — c'est un argument face à Episode/Choices | ⬜ à faire |
| 3 — Soutien | Pack « Coulisses » optionnel (~1,99 €) : fonds d'écran, planches, générique long, playlist complète | Cosmétique uniquement, ne touche jamais l'histoire | ⬜ à proposer |
| — | Publicité | **Écartée par design** : une pub dans une messagerie détruit l'illusion | ⛔ jamais |
| — | Affiliation | Rien de pertinent identifié | ⬜ non prévu |

## ASO (App Store)

- **Nom** : `Drama — l'histoire dans tes textos` ⬜
- **Sous-titre** : `Romance. Argent. Mensonges.` ⬜
- **Mots-clés FR** ⬜ : histoire interactive, jeu narratif, chat story,
  roman interactif, romance, drama, textos, thriller romantique, histoire
  d'amour, milliardaire, fiction, épisode.
- **Captures** ⬜ (le jeu est nativement vertical, avantage énorme) :
  1. le fil de Tristan (« On ne se quitte pas comme ça. ») ;
  2. un choix chronométré avec la barre rouge ;
  3. l'accueil du téléphone (5 apps) ;
  4. Ma Banque (le solde à 214,37 €) ;
  5. une photo plein écran (les pivoines / la tour).
- **Aperçu vidéo** ⬜ : le générique de fin (la livreuse dans le
  brouillard) + 3 bulles qui se répondent.
- **Notes & avis** ⬜ : demander l'avis via `in_app_review` **une seule
  fois, juste après la carte « FIN DE L'ÉPISODE 1 »** (pic émotionnel), et
  jamais en cours d'épisode.
- Déjà en place ✅ : `ITSAppUsesNonExemptEncryption` déclaré (pas de
  blocage export à la soumission), versionnement TestFlight propre.

## Canaux d'acquisition

| Canal | Détail | Statut |
|---|---|---|
| TestFlight (bouche-à-oreille) | Lien d'invitation privé, retours de l'auteur | ✅ câblé |
| TikTok / BookTok FR | Extraits verticaux : une conversation qui dérape en 30 s, coupée au cliffhanger (« Il m'a proposé 30 000 €. J'ai répondu… ») — le jeu EST déjà au format TikTok | ⬜ prioritaire |
| Instagram Reels / YouTube Shorts | Republication des mêmes extraits | ⬜ |
| Wattpad / communautés Webtoon FR | Adapter le jour 1 en « chat story » à lire, avec lien vers l'app | ⬜ |
| Reddit (r/France, r/jeuxvideofr, r/otomegames en EN plus tard) | Post « J'ai fait un jeu qui se passe entièrement dans une messagerie » + captures | ⬜ |
| Featuring App Store | Pitch à l'équipe éditoriale Apple France : jeu narratif français original, sans pub ni tracker | ⬜ |
| Presse FR (jeuxvideo.com, Gamekult, Canard PC) + TouchArcade (EN) | Dossier presse : pitch, captures, accès TestFlight | ⬜ |
| Discord communautaire | À ouvrir seulement quand il y a >500 joueurs (un Discord vide dessert) | ⬜ plus tard |
| Partage in-app | Bouton « Partager cette histoire » sur la carte de fin d'épisode (`share_plus`) | ⬜ |

## Calendrier saisonnier

L'histoire se déroule du **15 au 20 juillet** — un lancement estival permet
de jouer « en même temps » que Shen, jour pour jour : angle marketing
gratuit (« l'histoire commence aujourd'hui »). Autres fenêtres :
- **Saint-Valentin** : la romance contractuelle, extraits « pas de
  baisers » ;
- **Nouvel An chinois** : le passé Fujian de la famille (épisodes 3+) ;
- **Rentrée de septembre** : « la série à lire dans le métro ».

## KPIs à suivre

| KPI | Source | Statut |
|---|---|---|
| Installations, sessions, crashs, conservation D1/D7 | App Store Connect (natif, **sans SDK**) | ✅ dispo dès la sortie |
| Taux de complétion de l'épisode 1 | Aucun analytics par design — soit l'assumer, soit un outil privacy-first (TelemetryDeck/Aptabase) en opt-in | ⬜ à décider |
| Conversion gratuit → achat Saison 1 | App Store Connect (ventes IAP) | ⬜ après phase 2 |
| Note moyenne & volume d'avis | App Store Connect | ⬜ après sortie |
| Vues → installs des vidéos TikTok | Stats TikTok + pic d'installs corrélé | ⬜ |

## Prochaines actions, dans l'ordre

1. ⬜ **Finir l'épisode 2** — aucun marketing avant d'avoir la suite : un
   joueur conquis sans épisode 2 est un joueur perdu.
2. ⬜ Câbler `in_app_review` (après la carte de fin) et `share_plus`
   (bouton partager) — deux petites briques à fort levier.
3. ⬜ Rédiger la fiche App Store (nom, sous-titre, mots-clés ci-dessus) et
   produire les 5 captures + l'aperçu vidéo.
4. ⬜ Décider du modèle (recommandation : épisode 1 gratuit + Saison 1 en
   achat unique) et câbler `in_app_purchase`.
5. ⬜ Sortir sur l'App Store, pitcher le featuring Apple le même jour.
6. ⬜ Produire 5 extraits TikTok à partir du jeu (captures d'écran
   animées), en poster 2/semaine.
7. ⬜ Dossier presse + accès aux médias FR.
8. ⬜ Réévaluer analytics/Discord une fois les premiers chiffres App Store
   Connect connus.

## À vérifier

- Le nom « Drama » est générique : vérifier sa disponibilité exacte sur
  l'App Store FR (risque de collision/SEO faible) — un sous-titre fort le
  compense, ou envisager « Drama : Shen » / « Drama — Quatorze pages ».
- Droits musique/images : les assets générés (OpenArt, Suno) doivent être
  couverts par les CGU commerciales de ces services avant toute
  monétisation — à confirmer sur les comptes de l'auteur.
