# MARKETING — plan marketing & rémunération

> Généré le 20/07/2026 par un scan du dépôt. Pour mettre à jour : relancer ce même prompt.
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
| Search Console | Déclaration du site + suivi des positions | ⬜ (après domaine définitif) |
| Prescripteurs institutionnels | Référencement par CIP, greffes, CCI/CMA, URSSAF, APESA, 60 000 Rebonds — le canal au meilleur rendement | ⬜ |
| Experts-comptables & avocats | Page `/pro` + kit prescripteur (PDF + email type) | ⬜ |
| Partage in-app | « Envoyer cette fiche à un proche » (magic link ✅ existant) + partage natif sur les calculateurs | ⬜ |
| LinkedIn | Page entreprise + 2 posts pédagogiques/semaine (45 jours, caution, PGE…) | ⬜ |
| Presse spécialisée | Les Échos Entrepreneurs, presse pro sectorielle — angle « outil gratuit » + chiffres du compteur | ⬜ |
| Newsletter prescripteurs | Actualité juridique mensuelle (non pertinente pour le public en crise, one-shot par nature) | ⬜ |
| SEA / réseaux grand public | Google Ads (coût/clic prohibitif), Instagram/TikTok (inadaptés au public) | — exclus |

## KPIs

| Métrique | Valeur | Objectif |
|---|---|---|
| Fiches créées | à vérifier sur `/api/stats` (compteur ✅ câblé) | à définir après première mesure |
| Visiteurs / sources de trafic | non mesuré (Plausible câblé, compte non souscrit) | activer la mesure au lancement |
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

## Prochaines actions

- Mettre en ligne sur le domaine définitif (préalable à tout — plan : `_plans/roadmap.md` § MISE EN LIGNE)
- Activer la mesure : Plausible (ou Vercel Analytics) + Google Search Console
- Ajouter le partage in-app (fiche → proche, calculateurs → partage natif)
- Créer la page `/pro` + kit prescripteur, puis contacter 10 prescripteurs (objectif : 3 backlinks)
- Ouvrir la page LinkedIn et tenir 2 posts/semaine pendant 8 semaines
- Explorer les subventions/fondations (phase 1) dès les premiers chiffres d'usage
