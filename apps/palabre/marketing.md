# MARKETING — plan marketing & rémunération

Mis à jour le 14 octobre 2026. Compagnon de INFRA.md. Pour l'actualiser : relancer le même prompt.

## Positionnement

**L'angle.** Un jeu narratif de cartes à glisser, façon *Reigns* : on est président d'un pays d'Afrique de l'Ouest imaginaire, une carte par jour, gauche ou droite, cent jours jusqu'à l'élection. Quatre jauges — peuple, armée, caisses, presse — tuent à zéro comme à cent : gouverner, c'est empêcher les quatre de déborder en même temps.

**Ce qui le distingue.** Le genre est connu, le décor ne l'est pas. Les jeux de ce type se passent presque tous dans un royaume médiéval ou une dystopie ; celui-ci se passe dans un palais, avec un ministre des Finances, une rédactrice en chef, une marchande du marché et un général. Rien de réel n'y est nommé : ni pays, ni ville, ni monnaie, ni institution, ni religion — le pays est inventé de bout en bout, jusqu'à sa carte satellite.

Trois choses que les concurrents directs n'ont pas :

1. **La densité narrative.** 687 cartes, 59 histoires qui s'étalent sur plusieurs cartes et se souviennent de ce qu'on a répondu. Une réponse au jour 12 rouvre une carte au jour 40.
2. **Le palais.** On l'achète pièce par pièce avec l'argent de l'État, 24 objets, et ce qu'on achète reste d'un mandat à l'autre même après une chute. C'est la progression longue, par-dessus la partie.
3. **Les romances.** Dix personnes, six crans, et l'attache ne monte jamais toute seule : elle ne bouge que si une réponse la déclare. Ça conduit au mariage, ou à la rupture, et ça change la chambre.

**Les publics.** D'abord les joueurs de *Reigns* et de jeux narratifs courts, qui cherchent exactement cette boucle et n'en ont plus de neuve. Ensuite un public francophone, en Afrique de l'Ouest et dans la diaspora, à qui aucun jeu de ce genre ne parle aujourd'hui dans son décor. Enfin les curieux de politique-fiction, pour qui les arbitrages — payer la solde ou les enseignants, emprunter au fonds ou s'en passer — sont le sujet.

**Le ton.** Sobre, sec, adulte. Pas de caricature, pas de folklore. Le dépôt contient des scènes de chambre (`assets/contenu/chambre.json`, `assets/images/palais/pieces/chambre_lit/`) qui imposent une classification adulte : la cible retenue est **17+ App Store / 18 Play** — à confirmer par les questionnaires des deux consoles. Cela ferme la porte au public enfant et assume une écriture d'adulte.

## Points forts

- 🃏 **Un décor neuf** : un palais d'Afrique de l'Ouest inventé, quand le genre vit au Moyen Âge.
- 📜 **Des histoires qui se souviennent** : 687 cartes, 59 histoires ; une réponse du jour 12 rouvre une carte au jour 40.
- 🏛️ **Le palais et les romances** : 24 objets gardés d'un mandat à l'autre, dix romances qui ne bougent que sur réponse.

## Modèle de rémunération

**État réel du code au 13 octobre 2026 : aucune monétisation n'est implémentée.** Le scan est sans ambiguïté — `pubspec.yaml` ne déclare ni `google_mobile_ads`, ni `in_app_purchase`, ni aucun SDK publicitaire ou de paiement ; `lib/` ne contient aucun code de publicité ni d'achat intégré ; l'application ne fait aucun appel réseau. Le jeu est aujourd'hui **entièrement jouable hors ligne, sans aucune source de revenu**.

Le levier envisagé à ce stade est la paire habituelle du genre — publicité interstitielle plus un achat unique « Sans pub » — mais **la décision est explicitement reportée** : la question de la publicité mobile en Afrique de l'Ouest (remplissage, valeur du mille, moyens de paiement disponibles) n'est pas tranchée, et rien ne doit être câblé avant qu'elle le soit.

Les leviers possibles, dans l'ordre où ils se poseraient : d'abord trancher le modèle pour le marché visé (pub, payant d'emblée ou mixte) ; en cas de gratuit avec publicité, un interstitiel entre deux mandats, jamais pendant une partie, et un achat unique « Sans pub » non consommable ; vérifier ce qui est réellement encaissable sur les marchés visés ; plus tard, des mandats ou parcours supplémentaires payants. Aucun n'est câblé.

Deux garde-fous à tenir quel que soit le modèle retenu : la publicité ne doit jamais s'intercaler entre une réponse et la carte suivante — c'est le cœur du rythme — et l'achat « Sans pub » doit rester un paiement unique, jamais un abonnement.

## Rémunération par phases

- [fait] **Aujourd'hui** : aucune monétisation, jeu complet et hors ligne
- [en cours] **Décision** : trancher pub, payant d'emblée ou mixte pour le marché visé
- **Gratuit avec pub** : interstitiel entre deux mandats, jamais pendant une partie
- **Achat unique** : « Sans pub » non consommable, jamais un abonnement
- **Contenu payant** : mandats ou parcours supplémentaires

## Canaux

Le jeu n'est publié sur aucune boutique et aucune publication ne le concerne à ce jour. Canal en place : la page d'accueil du site.

- ⬜ **Les fiches de boutique elles-mêmes.** Premier canal, et le seul gratuit qui compte au lancement. Textes et captures sont prêts (`docs/BOUTIQUE.md`, `docs/captures/`), rien n'est soumis — à vérifier dans la console. Les captures montrent une carte lisible, pas un écran-titre.
- ⬜ **Réseaux sociaux.** Depuis le 13 octobre 2026, le Studio range les chaînes par app : TikTok « Afrotok » n'est rattachée à aucune, YouTube « toa.afrotok » à Erea seule. Aucun compte n'est donc branché pour Palabre, et aucune publication n'est faite. Les portraits et les plaques du palais sont l'argument visuel : ils se partagent seuls, sans expliquer le jeu.
- ⬜ **Communautés de jeux narratifs**, en français et en anglais — les joueurs de *Reigns* sont identifiables et demandeurs.
- ⬜ **Presse et créateurs francophones**, d'abord spécialisés jeu vidéo, ensuite généralistes si l'angle du décor prend.
- ⬜ **TestFlight**, boucle de retours fermée avant l'ouverture publique : aucune build visible depuis le dépôt — à vérifier dans la console.
- ✅ **Site** `palabre.toakeur.com` : en ligne depuis le 12 octobre 2026, il présente le jeu mais ne renvoie vers aucune boutique.

Aucune campagne payante n'est prévue tant que le modèle de rémunération n'est pas tranché : on ne paie pas pour acquérir des joueurs qui ne rapportent rien.

## Mesures

- **Installations** : à vérifier dans la console
- **Rétention à J1 et J7** : à vérifier dans la console
- **Note moyenne et avis** : à vérifier dans la console
- **Mandats terminés par joueur** : à instrumenter
- **Joueurs qui atteignent le jour 100** : à instrumenter
- **Achèvement des 59 histoires** : mesuré par simulation (`outils/mesure_par_histoire.dart`)

L'application n'embarque aucun outil d'analyse et ne fait aucun appel réseau : les chiffres d'audience se liront dans les consoles une fois la distribution ouverte. Le seul chiffre mesuré aujourd'hui l'est hors application : `outils/mesure_par_histoire.dart` joue mille mandats et écrit le taux d'achèvement de chaque histoire — un indicateur d'équilibrage, pas d'audience. Revenu par mille affichages et conversion « Sans pub » sont sans objet tant qu'aucune régie ni aucun achat n'existe.

## Calendrier

Aucune date de sortie n'est arrêtée dans le dépôt. L'ordre est contraint par ce qui bloque quoi : la décision de monétisation conditionne la fiche, la classification et le questionnaire de confidentialité ; la première soumission passe par iOS, la seule chaîne de construction automatisée ; Android suit, une fois la vraie clé posée et le paquet ramené sous la limite de Play.

## Les 3 priorités

- Trancher le modèle de rémunération (pub, payant d'emblée ou mixte) : il décide de la fiche, de la classification et du questionnaire de confidentialité, et le changer après la soumission obligerait à tout reprendre.
- Remplir la fiche App Store avec `https://palabre.toakeur.com/` comme site et assistance, `palabre@toakeur.com` comme contact et la page de confidentialité déjà en ligne, répondre aux questionnaires 17+ et confidentialité, puis envoyer une première build Xcode Cloud sur TestFlight.
- Préparer Android : poser la vraie clé de publication (`android/key.properties`, sauvegardée hors du dépôt) et ramener le bundle sous 150 Mo — il en fait 143,3, avec une marge sous 5 %.
