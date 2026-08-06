# Avelor — Marketing & rémunération

> Fiche générée par **analyse du dépôt** `teiki5320/avelor` (commit `7d99443`, 2026‑08‑03).
> Elle sera remplacée automatiquement dès qu'un `docs/MARKETING.md` existera dans le
> dépôt de l'app (synchro pull quotidienne).

## Positionnement

- **Promesse** : orienter les chefs d'entreprise français en difficulté —
  comprendre sa situation (questionnaire + SIRET), trouver les aides et
  procédures, générer les courriers, protéger sa famille.
- **Cible** : dirigeants de TPE/PME en tension de trésorerie ou en procédure ;
  leurs **proches** (section dédiée) ; les **accompagnants** (section dédiée).
- **Ton** : public en situation de stress — sobriété, clarté, zéro
  culpabilisation ; la confiance est le produit.
- **Différenciation** : parcours guidé personnalisé (questionnaire → fiche
  reprise par lien magique), contenu français spécialisé, gratuité.

## Modèle de revenus par phases

| Phase | Modèle | Statut |
| --- | --- | --- |
| Phase 1 — Utilité | Gratuit intégral (construire la confiance et l'audience SEO) | ✅ **actuelle** |
| Phase 2 — Partenariats | Mise en relation qualifiée avec des accompagnants (annuaire premium, apport d'affaires encadré) | ⬜ |
| Phase 3 — Institutionnel | Sponsoring / conventions (CCI, régions, assureurs, experts-comptables) | ⬜ |

> ⚠️ Public vulnérable : toute monétisation devra préserver la gratuité du
> parcours d'orientation et être affichée en toute transparence.

## ASO / SEO

- Le « store » d'une webapp, c'est **Google** : `robots.ts` et `sitemap.ts`
  sont en place, contenu structuré par intentions de recherche
  (aides, procédures, glossaire, courriers).
- Mots-clés visés : *(à définir — ex. « entreprise en difficulté que faire »,
  « procédure de sauvegarde », « dettes URSSAF »)*.

## Canaux

| Canal | Action | Statut |
| --- | --- | --- |
| SEO / contenu | Pages aides, procédures, glossaire, FAQ, témoignages | ✅ |
| Domaine propre | avelor.fr en production | ✅ |
| E-mail | Rappels automatiques sur les fiches (cron quotidien) | ✅ |
| Réseaux pro | LinkedIn (dirigeants, experts-comptables, mandataires) | ⬜ |
| Partenaires prescripteurs | CCI, tribunaux de commerce, associations (60000 rebonds, APESA…) | ⬜ |
| Presse | Médias éco régionaux et spécialisés | ⬜ |

## KPIs

| Indicateur | Valeur actuelle | Objectif |
| --- | --- | --- |
| Visites organiques / mois | — | à mesurer (Search Console) |
| Questionnaires complétés | — | taux de complétion > 60 % |
| Fiches actives (retour via lien magique) | — | à suivre |

## Prochaines actions

- [ ] Créer `docs/INFRA.md` et `docs/MARKETING.md` dans le dépôt Avelor (prise de relais automatique)
- [ ] Brancher un suivi d'audience respectueux (Plausible / Vercel Analytics) et la Search Console
- [ ] Définir la liste des mots-clés SEO prioritaires
- [ ] Identifier 5 partenaires prescripteurs à contacter
