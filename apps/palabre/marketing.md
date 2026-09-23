# MARKETING — plan marketing & rémunération

Mis à jour le 22 septembre 2026. Compagnon de INFRA.md. Pour l'actualiser : relancer le même prompt.

## Positionnement

**L'angle.** Un jeu narratif de cartes à glisser, façon *Reigns* : on est président d'un pays d'Afrique de l'Ouest imaginaire, une carte par jour, gauche ou droite, cent jours jusqu'à l'élection. Quatre jauges — peuple, armée, caisses, presse — tuent à zéro comme à cent : gouverner, c'est empêcher les quatre de déborder en même temps.

**Ce qui le distingue.** Le genre est connu, le décor ne l'est pas. Les jeux de ce type se passent presque tous dans un royaume médiéval ou une dystopie ; celui-ci se passe dans un palais, avec un ministre des Finances, une rédactrice en chef, une marchande du marché et un général. Rien de réel n'y est nommé : ni pays, ni ville, ni monnaie, ni institution, ni religion — le pays est inventé de bout en bout, jusqu'à sa carte satellite.

Trois choses que les concurrents directs n'ont pas :

1. **La densité narrative.** 687 cartes, 59 histoires qui s'étalent sur plusieurs cartes et se souviennent de ce qu'on a répondu. Une réponse au jour 12 rouvre une carte au jour 40.
2. **Le palais.** On l'achète pièce par pièce avec l'argent de l'État, 24 objets, et ce qu'on achète reste d'un mandat à l'autre même après une chute. C'est la progression longue, par-dessus la partie.
3. **Les romances.** Dix personnes, six crans, et l'attache ne monte jamais toute seule : elle ne bouge que si une réponse la déclare. Ça conduit au mariage, ou à la rupture, et ça change la chambre.

**Les publics.** D'abord les joueurs de *Reigns* et de jeux narratifs courts, qui cherchent exactement cette boucle et n'en ont plus de neuve. Ensuite un public francophone, en Afrique de l'Ouest et dans la diaspora, à qui aucun jeu de ce genre ne parle aujourd'hui dans son décor. Enfin les curieux de politique-fiction, pour qui les arbitrages — payer la solde ou les enseignants, emprunter au fonds ou s'en passer — sont le sujet.

**Le ton.** Sobre, sec, adulte. Pas de caricature, pas de folklore. Le dépôt contient des scènes de chambre (`assets/contenu/chambre.json`, `assets/images/palais/pieces/chambre_lit/`) qui imposent une classification adulte : la cible retenue est **17+ App Store / 18 Play** — à confirmer par les questionnaires des deux consoles. Cela ferme la porte au public enfant et assume une écriture d'adulte.

## Modèle de rémunération

**État réel du code au 22 septembre 2026 : aucune monétisation n'est implémentée.** Le scan est sans ambiguïté — `pubspec.yaml` ne déclare ni `google_mobile_ads`, ni `in_app_purchase`, ni aucun SDK publicitaire ou de paiement ; `lib/` ne contient aucun code de publicité ni d'achat intégré ; l'application ne fait aucun appel réseau. Le jeu est aujourd'hui **entièrement jouable hors ligne, sans aucune source de revenu**.

Le levier envisagé à ce stade est la paire habituelle du genre — publicité interstitielle plus un achat unique « Sans pub » — mais **la décision est explicitement reportée** : la question de la publicité mobile en Afrique de l'Ouest (remplissage, valeur du mille, moyens de paiement disponibles) n'est pas tranchée, et rien ne doit être câblé avant qu'elle le soit.

| Phase | Levier | Statut |
|---|---|---|
| 0 — aujourd'hui | Aucune monétisation, jeu complet hors ligne | ✅ |
| 1 — décision | Trancher le modèle pour le marché visé (pub, payant d'emblée, ou mixte) | ⬜ |
| 2 — gratuit + pub | Interstitiel entre deux mandats, jamais pendant une partie | ⬜ |
| 3 — achat unique | « Sans pub » en achat intégré non consommable | ⬜ |
| 4 — moyens de paiement | Vérifier ce qui est réellement encaissable sur les marchés visés | ⬜ |
| 5 — contenu payant | Mandats ou parcours supplémentaires | ⬜ |

Deux garde-fous à tenir quel que soit le modèle retenu : la publicité ne doit jamais s'intercaler entre une réponse et la carte suivante — c'est le cœur du rythme — et l'achat « Sans pub » doit rester un paiement unique, jamais un abonnement.

## Canaux

- **Les fiches de boutique elles-mêmes.** Premier canal, et le seul gratuit qui compte au lancement. Les captures doivent montrer une carte lisible, pas un écran-titre.
- **Le décor comme accroche.** Les portraits et les plaques du palais sont l'argument visuel : ils se partagent seuls, sans expliquer le jeu.
- **Communautés de jeux narratifs**, en français et en anglais — les joueurs de *Reigns* sont identifiables et demandeurs.
- **Presse et créateurs francophones**, d'abord spécialisés jeu vidéo, ensuite généralistes si l'angle du décor prend.
- **TestFlight** pour une boucle de retours fermée avant l'ouverture publique.

Aucune campagne payante n'est prévue tant que la phase 1 du tableau ci-dessus n'est pas tranchée : on ne paie pas pour acquérir des joueurs qui ne rapportent rien.

## KPIs

Aucune mesure n'existe à ce jour : l'application n'embarque aucun outil d'analyse et ne fait aucun appel réseau. Les chiffres ci-dessous sont donc **tous à relever dans les consoles** une fois la distribution ouverte, et aucun n'est renseigné ici.

| Indicateur | Où le lire | Valeur |
|---|---|---|
| Installations | App Store Connect / Play Console | à vérifier dans la console |
| Rétention à J1 et J7 | App Store Connect / Play Console | à vérifier dans la console |
| Mandats terminés par joueur | aucune mesure en place | à instrumenter |
| Part de joueurs qui atteignent le jour 100 | aucune mesure en place | à instrumenter |
| Note moyenne et avis | consoles des deux boutiques | à vérifier dans la console |
| Revenu par mille affichages | aucune régie branchée | sans objet en phase 0 |
| Taux de conversion « Sans pub » | aucun achat intégré | sans objet en phase 0 |

Le seul chiffre mesuré aujourd'hui l'est hors application, par simulation : `outils/mesure_par_histoire.dart` joue mille mandats et écrit le taux d'achèvement de chacune des 59 histoires. C'est un indicateur d'équilibrage, pas d'audience.

## Calendrier

Aucune date de sortie n'est arrêtée dans le dépôt. L'ordre est contraint par ce qui bloque quoi, pas par un calendrier.

1. **Maintenant** — le contenu est complet, relu, et l'audit est propre.
2. **Ensuite** — trancher la monétisation (phase 1), parce qu'elle décide de la fiche de boutique, de la classification et du questionnaire de confidentialité.
3. **Puis** — première soumission iOS par TestFlight, la seule chaîne déjà câblée.
4. **En parallèle** — câbler la signature Android de publication, qui n'existe pas encore.
5. **Enfin** — ouverture publique sur les deux boutiques.

## Prochaines actions

- ✅ Contenu complet : 687 cartes, 59 histoires, audit sans remarque
- ✅ Chaîne de construction iOS câblée sur Xcode Cloud
- ✅ Intégration continue : analyse et 423 tests à chaque poussée
- ✅ Relecture des 687 cartes — 214 réécrites
- ⬜ Trancher le modèle de rémunération pour le marché visé
- ✅ Câbler la signature de publication Android, vérifiée avec un keystore jetable — reste à poser la vraie clé
- ⬜ Ramener le paquet Android sous les 150 Mo : le bundle en fait 143,3, la marge est sous 5 %
- ✅ Rédiger les fiches de boutique : titre, sous-titre, descriptions française et anglaise, mots-clés — `docs/BOUTIQUE.md`
- ✅ Produire les captures d'écran aux deux formats, plus l'icône et l'image de présentation de Play — `docs/captures/`
- ⬜ Répondre aux questionnaires de classification 17+ / 18 et de confidentialité — réponses préparées dans `docs/BOUTIQUE.md`
- ✅ Écrire la politique de confidentialité — `docs/confidentialite.html`
- ⬜ L'héberger : activer GitHub Pages sur `docs/`, ou la poser ailleurs à une adresse stable
- ✅ Mettre le `README.md` à jour : il annonçait encore une élection au jour 30
