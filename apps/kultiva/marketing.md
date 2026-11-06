# MARKETING — plan marketing & rémunération

Mis à jour le 6 novembre 2026. Compagnon de `INFRA.md` : là où INFRA répertorie
la technique, ce fichier suit la stratégie marketing et de rémunération.
Pour l'actualiser : relancer le même prompt.

## Positionnement

- **Angle** : « Le potager kawaii dans ta poche 🌱 » — l'appli de
  jardinage chaleureuse et ludique, native France **et** Afrique de
  l'Ouest (pas une déclinaison française).
- **Publics** : d'abord les jardiniers amateurs de France
  métropolitaine ; les jardiniers et maraîchers des 8 pays
  francophones d'AO (contenu local : noms locaux, achat au marché, zones climatiques,
  cultures locales) ; et, depuis le 1er novembre 2026, les jardiniers
  anglophones et francophones de 73 pays — Europe, Maghreb, Amériques,
  Asie, Océanie, outre-mer français.
- **Différenciation** : style kawaii + cahier de culture pleine terre,
  calendriers par pays ET sous-zone climatique, 100 % utilisable
  hors ligne.

## Rémunération par phases

- [fait] **Aujourd'hui** : app gratuite, rémunérée par l'affiliation Amazon en France. Les liens avaient été retirés le 20 octobre 2026 (tag rattaché au compte fermé par Amazon le 18 octobre) ; ils sont revenus le 30 octobre 2026 sous le tag `kultiva1-21`.
- [en cours] **Relance et lancement** : le projet est en pause (choix de Jean) ; décider s'il repart, puis publier — les fiches App Store et Google Play ont été remplies le 4 novembre 2026, et le site comme sa page de confidentialité sont en ligne (vérifié le 6 novembre 2026). L'app n'a plus de backend depuis le 30 octobre 2026, rien de ce côté ne bloque. La piste de vidéo récompensée AdMob est sans objet : elle reposait sur l'XP du Tamassi, supprimé le 31 octobre 2026.
- **Affiliation** : en place depuis le 30 octobre 2026, France seulement (Amazon ne livre pas en Afrique de l'Ouest). Changer de compte = changer une constante.
- **Rétention prouvée** : abonnement Kultiva Plus via RevenueCat (jardins illimités, export PDF), France d'abord.
- **Afrique de l'Ouest** : sponsoring par des ONG et programmes agricoles qui financent la diffusion de conseils.

Statut DSA : « trader » dans l'UE, décidé le 24 août 2026 à cause des
liens d'affiliation ; retirés le 20 octobre 2026, ces liens sont revenus
le 30 octobre 2026 : le statut de trader s'applique de nouveau — déjà déclaré
dans App Store Connect (constaté le 4 novembre 2026), reste à déclarer dans la Play Console. Écarté pour l'instant : bannières et interstitiels, vente de biens
physiques, dons.

## Points forts

- 🫙 **Garder ta récolte** : pour chaque légume, trois conservations (bocal, congélation, séchage, lacto-fermentation…) avec leur durée de garde et un pas-à-pas animé — 736 recettes, dont 448 déroulées étape par étape.
- 📔 **Cahier de culture** : « à faire aujourd'hui » dit qui a soif, qui est mûr et s'il va faire trop chaud, puis les jardins pleine terre, le suivi par plant et l'avertissement de rotation.
- 🌍 **73 pays, trois langues, hors ligne** : calendriers par pays et zone climatique (hémisphère sud compris), sans compte ni serveur. **Tout le contenu est traduit en français, en anglais et en espagnol** depuis le 2 novembre 2026 : recettes, tutos, maladies, lexique, badges et défis. **L'interface l'est aussi** depuis le 2 novembre 2026 : tableau de bord, onboarding, réglages, météo, notifications, et les 73 noms de pays. Un utilisateur anglophone ou hispanophone ne voit plus un mot de français.

## Canaux

✅ seulement avec une preuve de publication ; un compte ouvert ou branché
sans rien de publié reste ⬜.

| Canal | Détail | Statut |
| --- | --- | --- |
| Site de présentation | <https://kultiva.toakeur.com> (présentation + confidentialité, contact `kultiva@toakeur.com`) : en ligne depuis le 7 octobre 2026, coupé du 3 au 4 novembre, rétabli le 4 novembre 2026 | ✅ |
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
- **Visites du site** : mesurées par Umami (offre gratuite, sans cookie) depuis le 5 novembre 2026 — chiffres à vérifier dans la console Umami. Le site a été coupé du 3 au 4 novembre 2026

## Calendrier

- **Février–mars (France)** : lancer / pousser — pic des recherches « que semer ».
- **Mai–juin (Afrique de l'Ouest)** : pousser avant l'hivernage.
- **En continu** : partage in-app, réseaux sociaux, itération ASO mensuelle.

## Les 3 priorités

- Débloquer le rattachement du build dans App Store Connect (tous grisés jusqu'au 231 le 4 novembre 2026 ; essayer le 233, reçu le 5 novembre), remplir le téléphone de revue, le questionnaire de confidentialité et les tarifs, puis soumettre l'app.
- Finir les déclarations Google Play dans l'ordre imposé : classification IARC et statut de professionnel (à accepter par Jean), puis « Cible et contenu » et « Sécurité des données », déjà en brouillon.
- Lancer le test fermé Google Play avec 12 testeurs inscrits pendant 14 jours : le compte est personnel, c'est le seul délai qu'aucune décision ne raccourcit.
