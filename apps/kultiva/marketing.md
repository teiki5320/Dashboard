# MARKETING.md — Plan marketing & rémunération de Kultiva

> Compagnon de `INFRA.md` : là où INFRA.md répertorie la technique,
> ce fichier suit la stratégie marketing et de rémunération.
> Mis à jour le 2026-08-03. Pour l'actualiser : demander à Claude Code
> de re-scanner le dépôt et d'intégrer les avancées.

## 🎯 Positionnement

- **Angle** : « Le potager kawaii dans ta poche 🌱 » — l'appli de
  jardinage chaleureuse et ludique, native France **et** Afrique de
  l'Ouest (pas une déclinaison française).
- **Publics** : jardiniers amateurs de France métropolitaine ;
  jardiniers et maraîchers des 8 pays francophones d'AO (contenu
  local : FCFA, marchés, zones climatiques, cultures locales).
- **Différenciation** : style kawaii + Tamassi (attachement émotionnel),
  calendriers par pays ET sous-zone climatique, 100 % utilisable
  hors ligne.

## 💳 Rémunération — modèle en 3 phases

| Phase | Levier | Statut |
| --- | --- | --- |
| 1 — Lancement | App gratuite. Affiliation Amazon France (tag `kultiva-21`, mention « Lien partenaire ») | ✅ câblé |
| 1 — Lancement | Vidéo récompensée AdMob liée au Tamassi (« regarde une pub → boost d'XP ») — volontaire, compatible kawaii, adaptée à l'AO | ⬜ à faire |
| 2 — Rétention prouvée | Abonnement **Kultiva Plus** via RevenueCat (~2–3 €/mois, ~15 €/an) : jardins illimités, export PDF, variantes exclusives du Tamassi. France d'abord (friction de paiement stores en AO) | ⬜ à étudier |
| 3 — Spécifique AO | Sponsoring institutionnel : ONG et programmes agricoles (FAO, GIZ, projets maraîchage) financent la diffusion de conseils | ⬜ à démarcher |

Écarté pour l'instant : bannières/interstitiels (cassent l'expérience),
vente de biens physiques, dons.

## 🔎 ASO (visibilité sur les stores)

- Fiches par pays **rédigées** : `docs/store-listings.md`.
- Mots-clés France : potager, jardinage, calendrier de semis,
  « que semer », permaculture, balcon.
- Notes : `in_app_review` branché (demande au bon moment). Objectif ≥ 4,5.
- Captures d'écran : à refaire à chaque grosse version (les 2 premières
  font la décision).

## 📣 Canaux d'acquisition (organique d'abord)

| Canal | Détail | Statut |
| --- | --- | --- |
| Partage in-app | Cartes de partage (défis, Tamassi) = pub gratuite portée par les utilisateurs. Mettre **WhatsApp** en avant en AO (canal dominant) | ✅ câblé / ⬜ WhatsApp à prioriser |
| Instagram | `@toa.kultiva`, lien câblé dans l'app | ✅ actif |
| TikTok / Reels | Vidéos courtes potager (#PotagerTok) | ⬜ à créer |
| Groupes Facebook | Jardinage FR + Sénégal/Côte d'Ivoire — apporter de la valeur avant de promouvoir | ⬜ à investir |
| Micro-influenceurs | 3–5 créateurs potager FR (TikTok/YouTube), contact avec kit presse | ⬜ kit presse à faire |
| Newsletter | « Que semer ce mois-ci » (Brevo, gratuit ≤ 300/j) — fidélisation la moins chère | ⬜ à créer |
| Landing | `landing/index.html` — liens stores encore en `href="#"` | ⬜ à câbler |
| Presse | Rubriques « app du jour », magazines jardinage (Rustica…), featuring éditorial Apple/Google | ⬜ après lancement |

Publicité payante (Meta/TikTok Ads) : **pas avant** d'avoir prouvé la
rétention organique. Noter : CPI en AO ~10× moins cher qu'en France —
un petit budget Meta ciblé Sénégal/Côte d'Ivoire ira loin le moment venu.

## 🗓️ Calendrier saisonnier

- **France** : lancer/pousser en **février-mars** (pic des recherches
  « que semer »).
- **Afrique de l'Ouest** : pousser en **mai-juin** (avant l'hivernage).

## 📊 KPIs à suivre

- Installs par pays ; rétention J1 / J7 / J30 ; note moyenne par store ;
  volume de partages ; abonnés newsletter ; revenus (affiliation, pub,
  puis abonnements).
- ⚠️ Aucun analytics produit branché (Sentry = crashs uniquement).
  À décider : Firebase Analytics ou PostHog, avec consentement RGPD.

## ✅ Prochaines actions (ordre conseillé)

1. Câbler les vrais liens stores dans `landing/index.html` (dès publication).
2. Mettre le partage WhatsApp en avant sur les écrans de partage (AO).
3. Créer le kit presse (pitch « l'appli kawaii qui fait pousser ton
   potager », visuels, contact).
4. Ouvrir la newsletter Brevo + formulaire sur la landing.
5. Rewarded video AdMob liée au Tamassi (consentement UMP inclus).
6. Contacter 3–5 micro-influenceurs potager avant le pic février-mars.
