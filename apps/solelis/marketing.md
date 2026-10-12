# MARKETING — plan marketing & rémunération

> Mise à jour le 12 octobre 2026 (projet en pause, site en ligne sur solelis.com ; canaux et priorités revus).
> Aucun chiffre inventé : les valeurs non mesurées sont marquées comme telles.

## Modèle de rémunération

| Phase | Modèle | Détail | Statut |
|---|---|---|---|
| 0 | **Gratuit intégral** | Aucune monétisation ; assumé dans les mentions légales (« projet d'accompagnement gratuit »). Coûts d'infra quasi nuls (free tiers) | **actuel** |
| 1 | Soutien non marchand | Subventions, appels à projets, fondations (Entreprendre, MMA des Entrepreneurs du Futur), mécénat | ⬜ |
| 2 | B2B prescripteurs | Tableau de bord multi-fiches / marque blanche pour experts-comptables, CIP, CCI-CMA — le dirigeant final ne paie jamais | ⬜ |
| 3 | Partenariats qualifiés | Mise en relation transparente vers des professionnels vérifiés — ⚠️ encadrement déontologique à valider avec un avocat avant lancement | ⬜ |
| 4 | Affiliation éthique | Outils de rebond (compta, assurance pro) avec lien d'affiliation affiché — jamais dans le parcours de crise | ⬜ |

Exclusions par design : pas de publicité display, pas de paywall sur la fiche, pas de revente de données (engagement `/politique-donnees`).

## Canaux

| Canal | Détail | Statut |
|---|---|---|
| SEO organique | 48 pages avec métadonnées, sitemap, robots, JSON-LD (site + FAQ), image OG dynamique, ~50 pages longue traîne (17 courriers, 11 calculateurs, 4 annuaires, FAQ, glossaire) | ✅ base technique |
| Search Console | Déclaration de solelis.com + du sitemap (138 adresses) et suivi des positions | ⬜ |
| Prescripteurs institutionnels | Référencement par CIP, greffes, CCI/CMA, URSSAF, APESA, 60 000 Rebonds — le canal au meilleur rendement | ⬜ |
| Experts-comptables & avocats | Page `/pro` + kit prescripteur (PDF + email type) | ⬜ |
| Partage in-app | « Envoyer cette fiche à un proche » (magic link ✅ existant) + partage natif sur les calculateurs | ⬜ |
| LinkedIn | Page entreprise + 2 posts pédagogiques/semaine (45 jours, caution, PGE…) | ⬜ |
| TikTok « Afrotok » / YouTube « toa.afrotok » | Comptes communs à toutes les apps, branchés au Planning du Studio — aucune publication Solelis, aucune routine | ⬜ |
| Presse spécialisée | Les Échos Entrepreneurs, presse pro sectorielle — angle « outil gratuit » + chiffres du compteur | ⬜ |
| Newsletter prescripteurs | Actualité juridique mensuelle (non pertinente pour le public en crise, one-shot par nature) | ⬜ |
| SEA / réseaux grand public | Google Ads (coût/clic prohibitif), Instagram/TikTok (inadaptés au public) | — exclus |

## KPIs

| Métrique | Valeur | Objectif |
|---|---|---|
| Fiches créées | à vérifier sur `/api/stats` (compteur ✅ câblé) | à définir après première mesure |
| Visiteurs / sources de trafic | non mesuré (Plausible câblé dans le code, inactif en production, compte non souscrit) | activer la mesure |
| Taux de complétion questionnaire → fiche | non mesuré | instrumenter (événements Plausible) |
| Magic links envoyés / délivrés | à vérifier dans le dashboard Resend | surveiller la délivrabilité (< 5 % d'échecs) |
| Pages indexées Google | non vérifié | 100 % du sitemap après Search Console |
| Backlinks prescripteurs | 0 connu | 3 liens institutionnels au premier trimestre |

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
- Faire indexer par Google les pages encore absentes : solelis.com est déclaré dans Search Console, mais seules 28 pages sur 69 y figurent (suivi dans l'onglet Indexation du Studio)
- Activer la mesure d'audience (Plausible : souscrire puis définir `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`) avant tout effort d'acquisition
