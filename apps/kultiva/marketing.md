# MARKETING — plan marketing & rémunération

Mis à jour le 12 octobre 2026. Compagnon de `INFRA.md` : là où INFRA répertorie
la technique, ce fichier suit la stratégie marketing et de rémunération.
Pour l'actualiser : relancer le même prompt.

## Positionnement

- **Angle** : « Le potager kawaii dans ta poche 🌱 » — l'appli de
  jardinage chaleureuse et ludique, native France **et** Afrique de
  l'Ouest (pas une déclinaison française).
- **Publics** : jardiniers amateurs de France métropolitaine ;
  jardiniers et maraîchers des 8 pays francophones d'AO (contenu
  local : FCFA, marchés, zones climatiques, cultures locales).
- **Différenciation** : style kawaii + Tamassi (attachement émotionnel),
  calendriers par pays ET sous-zone climatique, 100 % utilisable
  hors ligne.

## Modèle de rémunération

Modèle **actuel** : app gratuite + affiliation Amazon (France).

| Phase | Levier | Statut |
| --- | --- | --- |
| 1 — Lancement | App gratuite. Affiliation Amazon France (tag `kultiva-21`, mention « Lien partenaire ») | ✅ câblé |
| 1 — Lancement | Vidéo récompensée AdMob liée au Tamassi (« regarde une pub → boost d'XP ») — volontaire, compatible kawaii, adaptée à l'AO | ⬜ à faire |
| 2 — Rétention prouvée | Abonnement **Kultiva Plus** via RevenueCat (~2–3 €/mois, ~15 €/an) : jardins illimités, export PDF, variantes exclusives du Tamassi. France d'abord (friction de paiement stores en AO) | ⬜ à étudier |
| 3 — Spécifique AO | Sponsoring institutionnel : ONG et programmes agricoles (FAO, GIZ, projets maraîchage) financent la diffusion de conseils | ⬜ à démarcher |

⚠️ Décision en cours (DSA) : les liens d'affiliation classent a priori
l'app « trader » pour l'UE → coordonnées postales publiées sur la fiche
App Store. Alternative : masquer l'affiliation au lancement (comme en AO)
et se déclarer non-trader, réactiver plus tard.

Écarté pour l'instant : bannières/interstitiels (cassent l'expérience),
vente de biens physiques, dons.

## Canaux

✅ seulement avec une preuve de publication ; un compte ouvert ou branché
sans rien de publié reste ⬜.

| Canal | Détail | Statut |
| --- | --- | --- |
| Site de présentation | <https://kultiva.toakeur.com> en ligne depuis le 7 octobre 2026 (présentation + confidentialité, contact `kultiva@toakeur.com`) ; boutons « Télécharger » encore sans lien, faute de publication | ✅ |
| ASO (fiches stores) | Fiches par pays rédigées (`docs/store-listings.md`, `docs/FICHE_APP_STORE.md`) ; `in_app_review` branché — mais l'app n'est publiée sur aucune boutique | ⬜ |
| Partage in-app | Cartes de partage (défis, Tamassi) prêtes dans le code — sans utilisateurs tant que l'app n'est pas publiée | ⬜ |
| Partage WhatsApp prioritaire (AO) | Mettre WhatsApp en avant sur les écrans de partage — canal dominant en Afrique de l'Ouest | ⬜ |
| Instagram | `@toa.kultiva`, lien câblé dans l'app ; aucune publication vérifiable | ⬜ |
| TikTok / YouTube | Comptes communs « Afrotok » (TikTok) et « toa.afrotok » (YouTube) branchés au Planning du Studio ; rien de programmé pour Kultiva | ⬜ |
| Groupes Facebook | Jardinage FR + Sénégal/Côte d'Ivoire — apporter de la valeur avant de promouvoir | ⬜ |
| Micro-influenceurs | 3–5 créateurs potager FR (TikTok/YouTube), contact avec kit presse | ⬜ |
| Newsletter | « Que semer ce mois-ci » — fidélisation la moins chère | ⬜ |
| Presse | Rubriques « app du jour », magazines jardinage, featuring éditorial Apple/Google | ⬜ |

Publicité payante (Meta/TikTok Ads) : **pas avant** d'avoir prouvé la
rétention organique. À noter : CPI en AO ~10× moins cher qu'en France —
un petit budget Meta ciblé Sénégal/Côte d'Ivoire ira loin le moment venu.

## KPIs

L'app n'est pas encore publiée — aucun chiffre réel à ce jour. Aucun
analytics produit n'est branché (Sentry = crashs uniquement) ; outil à
décider (Firebase Analytics ou PostHog, avec consentement RGPD).

| Métrique | Valeur | Objectif |
| --- | --- | --- |
| Installs (par pays) | — (pas publiée) | à définir au lancement |
| Rétention J1 / J7 / J30 | — | à définir (base des décisions phase 2) |
| Note moyenne stores | — | ≥ 4,5 |
| Volume de partages | — | à définir |
| Abonnés newsletter | — | à définir |
| Revenus (affiliation, puis pub/abonnements) | — | à définir |

## Calendrier

- **Avant publication** : rallumer Supabase, compte de démo, captures d'écran, coordonnées de trader (DSA).
- **Février–mars (France)** : lancer / pousser — pic des recherches « que semer ».
- **Mai–juin (Afrique de l'Ouest)** : pousser avant l'hivernage.
- **En continu** : partage in-app, réseaux sociaux, itération ASO mensuelle.

## Les 3 priorités

- Décider si Kultiva repart : rallumer le projet Supabase (en pause) et recréer les clés Google « Se connecter », sinon la connexion et la synchronisation restent hors service.
- Remplir la fiche App Store avec les adresses de `kultiva.toakeur.com` et `kultiva@toakeur.com`, puis compte de démo, captures et coordonnées de trader, et soumettre.
- Créer la fiche Google Play et lancer tout de suite le test fermé (douze testeurs pendant quatorze jours si le compte est personnel).
