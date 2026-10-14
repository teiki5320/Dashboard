# MARKETING — plan marketing & rémunération

Mis à jour le 14 octobre 2026. Compagnon de `INFRA.md` : là où INFRA répertorie
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

## Rémunération par phases

- [fait] **Aujourd'hui** : app gratuite, affiliation Amazon France câblée (tag `kultiva-21`, mention « Lien partenaire ») ; aucun revenu tant que l'app n'est pas publiée.
- [en cours] **Relance et lancement** : décider si Kultiva repart (backend en pause), publier, et trancher la vidéo récompensée AdMob liée au Tamassi (« une pub → un boost d'XP »).
- **Rétention prouvée** : abonnement Kultiva Plus via RevenueCat (jardins illimités, export PDF, variantes du Tamassi), France d'abord.
- **Afrique de l'Ouest** : sponsoring par des ONG et programmes agricoles qui financent la diffusion de conseils.

Statut DSA : les liens d'affiliation font de l'app un « trader » dans
l'UE (décidé le 24 août 2026) — coordonnées publiques sur la fiche App
Store. Écarté pour l'instant : bannières et interstitiels, vente de biens
physiques, dons.

## Points forts

- 🐣 **Tamassi** : une créature virtuelle animée (Poussia, Soleia, Spira) qui grandit avec l'activité réelle au jardin.
- 🌍 **France et Afrique de l'Ouest** : calendriers par pays et sous-zone climatique, noms locaux, marchés et prix en FCFA.
- 📴 **Tout hors ligne, sans compte** : 169 fiches, 33 tutoriels, potager et Poussidex utilisables en mode invité.

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
| TikTok / YouTube | « Afrotok » (TikTok) branché au Studio mais rattaché à aucune app, « toa.afrotok » (YouTube) à Erea seule ; rien de programmé pour Kultiva | ⬜ |
| Groupes Facebook | Jardinage FR + Sénégal/Côte d'Ivoire — apporter de la valeur avant de promouvoir | ⬜ |
| Micro-influenceurs | 3–5 créateurs potager FR (TikTok/YouTube), contact avec kit presse | ⬜ |
| Newsletter | « Que semer ce mois-ci » — fidélisation la moins chère | ⬜ |
| Presse | Rubriques « app du jour », magazines jardinage, featuring éditorial Apple/Google | ⬜ |

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
- **Clics d'affiliation** : à vérifier dans la console Amazon Partenaires
- **Visites du site** : à vérifier dans la console Cloudflare (aucun script de mesure sur la page)

## Calendrier

- **Février–mars (France)** : lancer / pousser — pic des recherches « que semer ».
- **Mai–juin (Afrique de l'Ouest)** : pousser avant l'hivernage.
- **En continu** : partage in-app, réseaux sociaux, itération ASO mensuelle.

## Les 3 priorités

- Décider si Kultiva repart : rallumer le projet Supabase (en pause) et recréer les clés Google « Se connecter », sinon la connexion et la synchronisation restent hors service.
- Remplir la fiche App Store avec les adresses de `kultiva.toakeur.com` et `kultiva@toakeur.com`, puis compte de démo, captures et coordonnées de trader, et soumettre.
- Créer la fiche Google Play et lancer tout de suite le test fermé (douze testeurs pendant quatorze jours si le compte est personnel).
