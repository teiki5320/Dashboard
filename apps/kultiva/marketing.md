# MARKETING — plan marketing & rémunération

Mis à jour le 31 octobre 2026. Compagnon de `INFRA.md` : là où INFRA répertorie
la technique, ce fichier suit la stratégie marketing et de rémunération.
Pour l'actualiser : relancer le même prompt.

## Positionnement

- **Angle** : « Le potager kawaii dans ta poche 🌱 » — l'appli de
  jardinage chaleureuse et ludique, native France **et** Afrique de
  l'Ouest (pas une déclinaison française).
- **Publics** : jardiniers amateurs de France métropolitaine ;
  jardiniers et maraîchers des 8 pays francophones d'AO (contenu
  local : FCFA, marchés, zones climatiques, cultures locales).
- **Différenciation** : style kawaii + cahier de culture pleine terre,
  calendriers par pays ET sous-zone climatique, 100 % utilisable
  hors ligne.

## Rémunération par phases

- [fait] **Aujourd'hui** : app gratuite, rémunérée par l'affiliation Amazon en France. Les liens avaient été retirés le 20 octobre 2026 (tag rattaché au compte fermé par Amazon le 18 octobre) ; ils sont revenus le 30 octobre 2026 sous le tag `kultiva1-21`.
- [en cours] **Relance et lancement** : le projet est en pause (choix de Jean) ; décider s'il repart, puis publier — d'abord garnir une installation pour les captures. L'app n'a plus de backend depuis le 30 octobre 2026, rien de ce côté ne bloque. La piste de vidéo récompensée AdMob est sans objet : elle reposait sur l'XP du Tamassi, supprimé le 31 octobre 2026.
- **Affiliation** : en place depuis le 30 octobre 2026, France seulement (Amazon ne livre pas en Afrique de l'Ouest). Changer de compte = changer une constante.
- **Rétention prouvée** : abonnement Kultiva Plus via RevenueCat (jardins illimités, export PDF), France d'abord.
- **Afrique de l'Ouest** : sponsoring par des ONG et programmes agricoles qui financent la diffusion de conseils.

Statut DSA : « trader » dans l'UE, décidé le 24 août 2026 à cause des
liens d'affiliation ; retirés le 20 octobre 2026, ces liens sont revenus
le 30 octobre 2026 : le statut de trader s'applique de nouveau, à déclarer
à la soumission. Écarté pour l'instant : bannières et interstitiels, vente de biens
physiques, dons.

## Points forts

- 📔 **Cahier de culture** : au réveil, « à faire aujourd'hui » dit qui a soif, qui est mûr et s'il va faire trop chaud, et un bouton note l'arrosage de tout le jardin. En dessous, les jardins pleine terre avec placement par glisser-déposer, suivi par plant et avertissement de rotation. Depuis le 31 octobre 2026, c'est le deuxième onglet de l'app, devant le catalogue.
- 📅 **Le calendrier de ta région** : quoi semer et récolter chaque mois, et une vue annuelle d'une ligne par légume — douze segments colorés, sans défilement latéral (refondue le 31 octobre 2026).
- 🌍 **France et Afrique de l'Ouest** : calendriers par pays et sous-zone climatique, noms locaux, marchés et prix en FCFA.
- 📴 **Tout hors ligne, sans compte** : 169 fiches, 33 tutoriels, potager et Poussidex. Aucune inscription, aucun serveur, aucune donnée qui sort du téléphone.

## Canaux

✅ seulement avec une preuve de publication ; un compte ouvert ou branché
sans rien de publié reste ⬜.

| Canal | Détail | Statut |
| --- | --- | --- |
| Site de présentation | <https://kultiva.toakeur.com> en ligne depuis le 7 octobre 2026 (présentation + confidentialité, contact `kultiva@toakeur.com`) ; boutons « Télécharger » encore sans lien, faute de publication | ✅ |
| ASO (fiches stores) | Fiches par pays rédigées (`docs/store-listings.md`, `docs/FICHE_APP_STORE.md`) ; `in_app_review` branché — mais l'app n'est publiée sur aucune boutique | ⬜ |
| Partage in-app | Cartes de partage (plants, défis) prêtes dans le code — sans utilisateurs tant que l'app n'est pas publiée | ⬜ |
| Partage WhatsApp (AO) | Pas de mise en avant particulière de WhatsApp sur les écrans de partage, alors que c'est le canal dominant en Afrique de l'Ouest | ⬜ |
| Instagram | `@toa.kultiva`, lien câblé dans l'app ; aucune publication vérifiable | ⬜ |
| TikTok / YouTube | « Afrotok » (TikTok) branché au Studio mais rattaché à aucune app, « toa.afrotok » (YouTube) à Erea seule ; rien de programmé pour Kultiva | ⬜ |
| Groupes Facebook | Jardinage FR + Sénégal/Côte d'Ivoire — aucune présence constatée | ⬜ |
| Micro-influenceurs | Créateurs potager FR (TikTok/YouTube) — aucun contact constaté | ⬜ |
| Newsletter | Aucune (idée : « Que semer ce mois-ci ») | ⬜ |
| Presse | Rubriques « app du jour », magazines jardinage, mise en avant Apple/Google — aucun contact constaté | ⬜ |

Publicité payante (Meta/TikTok Ads) : **pas avant** d'avoir prouvé la
rétention organique. À noter : CPI en AO ~10× moins cher qu'en France —
un petit budget Meta ciblé Sénégal/Côte d'Ivoire ira loin le moment venu.

## Mesures

L'app n'est publiée sur aucune boutique et aucun outil d'analytics produit
n'est branché (Sentry ne suit que les crashs).

- **Installations** : aucune — app pas publiée
- **Rétention J1 / J7 / J30** : à instrumenter
- **Note moyenne en boutique** : aucune — app pas publiée
- **Crashs** : à vérifier dans la console Sentry
- **Clics d'affiliation** : à suivre dans le Club Partenaires sous le tag `kultiva1-21` (liens remis le 30 octobre 2026)
- **Visites du site** : à vérifier dans la console Cloudflare (aucun script de mesure sur la page)

## Calendrier

- **Février–mars (France)** : lancer / pousser — pic des recherches « que semer ».
- **Mai–juin (Afrique de l'Ouest)** : pousser avant l'hivernage.
- **En continu** : partage in-app, réseaux sociaux, itération ASO mensuelle.

## Les 3 priorités

- Garnir une installation pour les captures (2-3 plants, une photo, un jardin dessiné) : il n'y a plus de compte de démonstration à créer.
- Compléter la fiche App Store déjà créée (adresses de `kultiva.toakeur.com` et `kultiva@toakeur.com`, captures, déclaration de trader DSA), puis soumettre le build 134 déjà en TestFlight.
- Créer la fiche Google Play et lancer tout de suite le test fermé (douze testeurs pendant quatorze jours si le compte est personnel).
