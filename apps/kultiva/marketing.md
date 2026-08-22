# MARKETING — plan marketing & rémunération

Mis à jour le 2026-08-21. Compagnon de `INFRA.md` : là où INFRA répertorie
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

| Canal | Détail | Statut |
| --- | --- | --- |
| ASO (fiches stores) | Fiches par pays rédigées (`docs/store-listings.md`) ; `in_app_review` branché ; captures à refaire à chaque grosse version | ✅ |
| Partage in-app | Cartes de partage (défis, Tamassi) = pub gratuite portée par les utilisateurs | ✅ |
| Partage WhatsApp prioritaire (AO) | Mettre WhatsApp en avant sur les écrans de partage — canal dominant en Afrique de l'Ouest | ⬜ |
| Instagram | `@toa.kultiva`, lien câblé dans l'app | ✅ |
| TikTok / Reels | Vidéos courtes potager (#PotagerTok) | ⬜ |
| Groupes Facebook | Jardinage FR + Sénégal/Côte d'Ivoire — apporter de la valeur avant de promouvoir | ⬜ |
| Micro-influenceurs | 3–5 créateurs potager FR (TikTok/YouTube), contact avec kit presse | ⬜ |
| Newsletter | « Que semer ce mois-ci » (Brevo, gratuit ≤ 300/j) — fidélisation la moins chère | ⬜ |
| Landing | Site vitrine + page privacy prêts dans `landing/` ; déploiement Vercel et vrais liens stores | ⬜ |
| Presse | Rubriques « app du jour », magazines jardinage (Rustica…), featuring éditorial Apple/Google | ⬜ |

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

- **Avant publication** : déployer la landing (Vercel), compte de démo, captures d'écran, décision DSA.
- **Février–mars (France)** : lancer / pousser — pic des recherches « que semer ».
- **Mai–juin (Afrique de l'Ouest)** : pousser avant l'hivernage.
- **En continu** : partage in-app, réseaux sociaux, itération ASO mensuelle.

## Prochaines actions

- Câbler les vrais liens stores dans `landing/index.html` (dès publication).
- Mettre le partage WhatsApp en avant sur les écrans de partage (AO).
- Créer le kit presse (pitch « l'appli kawaii qui fait pousser ton potager », visuels, contact).
- Ouvrir la newsletter Brevo + formulaire sur la landing.
- Rewarded video AdMob liée au Tamassi (consentement UMP inclus).
- Contacter 3–5 micro-influenceurs potager avant le pic février-mars.
