# MARKETING — plan marketing & rémunération

Mis à jour le 4 novembre 2026. Un canal n'est coché que s'il est prouvé (compte branché et
publications réelles, ou routine qui publie).

## Positionnement

- **Angle** : faire connaître les livres et les BD d'auteurs d'Afrique subsaharienne et de leur
  diaspora, en français, avec des fiches et des articles écrits par nous.
- **Publics** : la diaspora africaine francophone, les lecteurs curieux, les enseignants et les
  libraires.
- **Différenciation** : une sélection éditoriale centrée sur les auteurs et les pays, là où les
  grandes plateformes noient ces titres dans leur catalogue.

## Rémunération par phases

- [fait] **Aujourd'hui** : affiliation Amazon Partenaires (tag `keurbookfr-21`, nouveau compte depuis le 18 octobre) ; le site ne vend rien.
- [en cours] **Validation AdSense** : refusée le 21 octobre (contenu jugé trop mince), fiches rallongées, nouvel examen demandé le 22 octobre, « En préparation » dans la console AdSense (vérifié le 4 novembre 2026) ; aucune annonce d'ici là.
- **Liens Amazon directs** : 436 livres et BD sur 796 mènent à leur fiche Amazon (29 octobre 2026) ; les autres (sans ISBN, ou seulement d'occasion) gardent une recherche.
- **Partenariats** : mises en avant payées par des éditeurs ou libraires, une fois l'audience mesurée.

## Points forts

- 📚 **Catalogue ciblé** : 675 livres et 121 BD d'auteurs d'Afrique subsaharienne et de la diaspora, introuvables ensemble ailleurs.
- 🌍 **Entrée par auteurs, pays et Top 10** : 92 fiches d'auteurs, 26 pages pays et 11 Top 10 thématiques relient chaque livre à son contexte.
- 📰 **Actus du livre africain** : prix, sorties, salons et BD, racontés par nous deux fois par jour dans un article complet sur le site, avec la source et le crédit de chaque image.

## Canaux

- ✅ Site en ligne sur `keurbook.com`.
- ✅ Référencement naturel : sitemap envoyé à Google Search Console (propriété `keurbook.com`),
  IndexNow après chaque publication et chaque lundi, articles Conseils publiés trois fois par semaine (lundi, mercredi,
  vendredi). Au 4 novembre 2026 : 44 articles publiés, 24 programmés ; le rythme régulier va
  jusqu'au 28 décembre (7 articles ajoutés le 30 octobre ; il s'arrêtait au 7 décembre avant), puis seuls des articles de saison sont programmés
  (1er et 8 février 2027). Depuis fin octobre 2026, la routine « Articles » du Studio vérifie chaque matin l'avance du site
  et complète la série quand il reste moins de 20 articles ou moins de 4 semaines (elle passait avant le 1er et le 15 de chaque mois).
- ✅ Actus : depuis le 27 octobre 2026, une rubrique « Actus du livre africain » (`/actus`, 20 actus),
  un bloc de 4 actus sur l'accueil et les actus de l'auteur sur chaque fiche auteur, mis à jour
  2 fois par jour (12 h et 19 h) par la veille actus. Depuis le 28 octobre 2026, chaque actu ouvre son
  article complet sur le site (300 à 450 mots, page `/actus/<adresse>` que Google peut trouver, dans le
  sitemap), avec la source et ses liens ; avant, la carte renvoyait directement vers la source. Contenu frais
  pour le référencement et pour donner une raison de revenir.
- ⬜ Pinterest : aucun compte Keurbook.
- ⬜ TikTok et YouTube : TikTok « Afrotok » et YouTube « toa.afrotok » sont branchés au Studio mais rattachés à aucune app (vérifié le 1er novembre 2026) ; une
  vidéo Keurbook est prête depuis le 5 octobre, mais aucune publication n'est constatée.
- ⬜ Newsletter : aucune.
- ✅ Mesure d'audience : Cloudflare Web Analytics, sans cookie, active depuis le 13 octobre 2026.

## Mesures

- **Pages indexées par Google** : 663 sur 993 (Search Console, onglet Indexation du Studio, 4 novembre 2026 ; 663 sur 991 le 2 novembre, 675 sur 988 le 1er novembre, 675 sur 987 le 31 octobre, 677 sur 984 le 30 octobre, 680 sur 982 le 29 octobre, 680 sur 980 le 28 octobre, 679 sur 975 le 27 octobre, 673 sur 971 le 20 octobre)
- **Pages pas encore indexées** : 330 (4 novembre 2026), dont 313 inconnues de Google et 17 explorées mais pas indexées (328 le 2 novembre, 313 le 1er novembre, 312 le 31 octobre, 307 le 30 octobre, 302 le 29 octobre)
- **Liens Amazon directs** : 436 livres et BD sur 796 (29 octobre 2026 ; 90 le 19 octobre, 91 jusqu'au 24 octobre). Fiches qui reçoivent des visites : 38 sur 81 en lien direct (17 avant)
- **Articles Conseils** : 44 publiés, 24 programmés (4 novembre 2026 ; 43 publiés et 25 programmés le 2 novembre, 42 publiés et 26 programmés le 1er novembre, 41 publiés et 20 programmés le 29 octobre)
- **Visites** : à vérifier dans la console Cloudflare Web Analytics (mesure active depuis le 13 octobre 2026)
- **Clics et revenus Amazon** : à vérifier dans la console
- **Revenus AdSense** : aucun ; site refusé le 21 octobre 2026, nouvel examen demandé le 22 octobre, « En préparation » dans la console (vérifié le 4 novembre 2026)

## Les 3 priorités

- Faire indexer par Google les 330 pages qui ne le sont pas encore (BD, pages auteurs, livres,
  pays et pages de liste) : renforcer les liens internes vers elles et suivre leur
  évolution dans l'onglet Indexation du Studio.
- Garder les liens Amazon directs justes : lancer `npm run verifier-produits -- --ecrire --lot 30`
  régulièrement sur le Mac ; pour les classiques retirés (seulement d'occasion dans l'édition de la fiche),
  chercher une édition neuve et mettre la fiche à jour.
- Ouvrir un premier canal social pour Keurbook — un compte Pinterest Keurbook pour les couvertures
  et les portraits d'auteurs, comme Keur Cook et Keur Déco — et le brancher au Planning du Studio.
