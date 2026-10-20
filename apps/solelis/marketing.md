# MARKETING — plan marketing & rémunération

> Mise à jour le 20 octobre 2026 (78 pages indexées sur 91 suivies, 21 articles Conseils publiés ; aucun compte TikTok ni YouTube rattaché à Solelis dans le Studio).
> Aucun chiffre inventé : les valeurs non mesurées sont marquées comme telles.

## Rémunération par phases

- [fait] **Aujourd'hui** : gratuit intégral, assumé dans les mentions légales
- [en cours] **Soutien non marchand** : subventions, appels à projets, fondations, mécénat
- **Prescripteurs (B2B)** : tableau multi-fiches pour experts-comptables, CIP, CCI-CMA
- **Partenariats qualifiés** : mise en relation transparente, cadre déontologique à valider
- **Affiliation éthique** : outils de rebond, jamais dans le parcours de crise

Le dirigeant final ne paie jamais. Exclusions par design : pas de publicité display, pas de paywall sur la fiche, pas de revente de données (engagement `/politique-donnees`).

## Points forts

- 🧭 **Une fiche sur mesure** : un SIRET et 18 questions donnent stratégie, priorités, courriers, échéances et aides adaptés.
- 🏛️ **Sources officielles seulement** : textes de loi et sites publics, organismes réels de 107 territoires, outre-mer compris.
- 🤝 **Gratuit et humain** : aucune publicité ni revente de données, mode « perdu » réduit à trois infos et renvoi vers le soutien psychologique.

## Canaux

| Canal | Détail | Statut |
|---|---|---|
| SEO organique | Métadonnées par page, sitemap (91 adresses), robots, JSON-LD (site, FAQ, articles), image OG dynamique ; pages longue traîne (17 courriers, 11 calculateurs, 4 annuaires, FAQ, glossaire) et rubrique Conseils (21 articles publiés, 9 programmés jusqu'au 9 novembre 2026, flux RSS) | ✅ base technique |
| Search Console | solelis.com déclaré, sitemap envoyé le 12 octobre 2026 et renvoyé le 19 octobre ; 78 pages indexées sur 91 suivies (onglet Indexation du Studio) | ✅ |
| Prescripteurs institutionnels | Référencement par CIP, greffes, CCI/CMA, URSSAF, APESA, 60 000 Rebonds — le canal au meilleur rendement | ⬜ |
| Experts-comptables & avocats | Page `/pro` + kit prescripteur (PDF + email type) | ⬜ |
| Partage in-app | « Envoyer cette fiche à un proche » (magic link ✅ existant) + partage natif sur les calculateurs | ⬜ |
| LinkedIn | Page entreprise + 2 posts pédagogiques/semaine (45 jours, caution, PGE…) | ⬜ |
| TikTok « Afrotok » / YouTube « toa.afrotok » | Le Studio range les chaînes par app depuis le 13 octobre 2026 : TikTok rattaché à aucune, YouTube à Erea seule — rien pour Solelis, aucune publication, aucune routine | ⬜ |
| Presse spécialisée | Les Échos Entrepreneurs, presse pro sectorielle — angle « outil gratuit » + chiffres du compteur | ⬜ |
| Newsletter prescripteurs | Actualité juridique mensuelle (non pertinente pour le public en crise, one-shot par nature) | ⬜ |
| SEA / réseaux grand public | Google Ads (coût/clic prohibitif), Instagram (inadapté au public) | — exclus |

## Mesures

- **Fiches créées** : à vérifier sur `/api/stats` (compteur câblé)
- **Visiteurs et sources de trafic** : à instrumenter (Plausible prévu, inactif)
- **Questionnaire mené jusqu'à la fiche** : à instrumenter
- **Liens magiques délivrés** : à vérifier dans la console Resend
- **Pages indexées par Google** : 78 sur 91 suivies (relevé du Studio, 19 octobre 2026)
- **Liens entrants de prescripteurs** : aucun connu

## Calendrier

| Période | Événement | Action |
|---|---|---|
| Janvier | Trésorerie post-fêtes | Contenus « faire le point », posts rebond |
| 15 mars & 15 juin | Acomptes IS + échéances URSSAF | Contenus « impossible de payer l'échéance » la semaine précédente |
| Avril–juin | Clôtures, dépôts des comptes | Kit prescripteur vers experts-comptables (leur pic de contact client) |
| Septembre | Rentrée, impayés d'été (HCR, saisonniers) | Campagne sectorielle HCR/commerce |
| Novembre–décembre | CFE (15 déc.), épuisement de fin d'année | Mise en avant sobre du volet soutien psy (APESA, 3114) |

## Les 3 priorités

- Vérifier en production le parcours complet : création d'une fiche, lien magique reçu (et pas en indésirables) depuis Resend, rappel du cron, avocats locaux — et confirmer que solelis@toakeur.com reçoit bien les messages, puisque c'est l'adresse de suppression des fiches (RGPD)
- Faire indexer par Google les 13 pages encore absentes sur 91 suivies : 8 découvertes mais non indexées, 5 inconnues (surtout des outils et des courriers, plus deux articles Conseils)
- Activer la mesure d'audience (Plausible : souscrire puis définir `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`) avant tout effort d'acquisition
