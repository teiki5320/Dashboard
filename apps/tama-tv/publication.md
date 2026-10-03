# PUBLICATION — état des boutiques

> Généré le 6 septembre 2026 d'après les consoles. Pour mettre à jour :
> relancer ce même prompt.
>
> **Aucun secret ici** — uniquement des références publiques :
> identifiants d'app, numéros de version, liens de console.

## Vue d'ensemble

- **iOS** : distribué en TestFlight par Xcode Cloud ; aucune soumission App Store engagée
- **Android** : cible présente dans le dépôt mais non publiable — la release est signée avec la clé de debug
- **Web** : hors périmètre, décision du studio
- **Version commune** : `0.1.0` (`pubspec.yaml`) — le numéro de build est imposé par Xcode Cloud, pas par le `+1` du fichier
- **Identifiant** : `com.teiki.tama`, identique sur les deux plateformes
- **Nom** : « Tama » sous l'icône, « Tama TV » sur la fiche App Store — le nom « Tama » était déjà pris
- **Monétisation** : aucune, et c'est délibéré — le MVP ne mesure que la rétention et le taux de complétion
- **Chemin critique** : le contenu. La chaîne technique est complète depuis le 24 août 2026 ; ce qui manque est un catalogue à mesurer

Les deux plateformes ne sont pas au même stade et ne bloquent pas pour
les mêmes raisons. iOS livre à chaque poussée et n'attend qu'une
décision de soumission. Android n'a jamais été préparée pour la
distribution : ce n'est pas un blocage, c'est un chantier non ouvert.

---

### 1. iOS · App Store

| | |
|---|---|
| État | **En TestFlight, aucune soumission engagée** |
| Console | <https://appstoreconnect.apple.com> |
| Version publiée | à vérifier dans la console — aucune soumission n'a été engagée depuis ce dépôt |
| Version en cours | `0.1.0`, builds livrés en continu par Xcode Cloud |
| Distribution | Xcode Cloud, action *Archiver*, préparation **App Store Connect** |
| Schéma archivé | `TamaTV` depuis le 26 août 2026 |
| Dernier build constaté | `131`, vert, 26 août 2026 |
| Cible | iOS 13.0 minimum, portrait uniquement, iPhone et iPad |

**Ce qui fonctionne.** Chaque poussée sur `main` déclenche un build qui
arrive dans TestFlight. La conformité export est déclarée
(`ITSAppUsesNonExemptEncryption` à `false`), les icônes sont sans canal
alpha, le Team ID est posé. Depuis le 26 août, le processus archive avec
le schéma `TamaTV` et non plus `Runner` : c'est ce qui empêche une future
configuration de Train Cosy ou Drama de voler le produit Xcode Cloud de
Tama, comme cela s'était produit aux dépens d'Erea le 21 août.

**Ce qui bloque.** Rien de technique. La question est éditoriale : le
catalogue en ligne ne contient qu'une série de trois épisodes de test,
et une soumission App Store demande un contenu défendable, des captures
d'écran et une fiche renseignée.

**À vérifier dans la console avant toute soumission.** L'état exact de
la fiche — métadonnées, captures, catégorie, classification par âge — et
la section *Confidentialité de l'app*. Cette dernière doit refléter ce
que l'app collecte réellement : un identifiant d'appareil anonyme et des
événements de lecture, sans compte utilisateur ni publicité. Aucun SDK
tiers de suivi n'est embarqué.

**Prochaine action.** Décider si l'on soumet une première version avec
le catalogue actuel ou si l'on attend d'avoir des séries complètes. Tant
que la réponse n'est pas tranchée, TestFlight suffit.

---

### 2. Android · Google Play

| | |
|---|---|
| État | **Non publiable en l'état** |
| Console | <https://play.google.com/console> |
| Version publiée | aucune — à vérifier dans la console si une fiche existe |
| Version en cours | `0.1.0`, aucun bundle produit |
| Distribution | non configurée |
| Identifiant | `com.teiki.tama` |
| Signature | `signingConfig = signingConfigs.getByName("debug")` — clé de debug |

**Ce qui bloque.** Trois choses, dans cet ordre.

La release est signée avec la clé de debug, héritée du gabarit Flutter.
Google Play refuse un tel bundle. Il faut créer un magasin de clés,
le garder hors du dépôt, et brancher `key.properties`.

Les icônes adaptatives ne sont pas faites : le dossier
`mipmap-anydpi-v26` est absent. L'app afficherait une icône non
conforme aux lanceurs récents.

Aucune fiche Play n'a été préparée à notre connaissance — description,
icône 512, bandeau 1024 × 500, classification, questionnaire Sécurité
des données. **À vérifier dans la console.**

**À prévoir.** Un compte Play personnel impose douze testeurs pendant
quatorze jours consécutifs avant toute mise en production. Ce délai ne
se raccourcit pas et se déclenche au douzième inscrit — même contrainte
que celle rencontrée sur Erea.

**Prochaine action.** Aucune tant que la question iOS n'est pas
tranchée. Ouvrir ce chantier avant d'avoir un catalogue reviendrait à
payer deux fois le même travail éditorial.

---

### 3. Web · hors périmètre

| | |
|---|---|
| État | **Écarté par décision du studio** |
| Console | sans objet |
| Version publiée | aucune |
| Version en cours | aucune |
| Distribution | aucune |

Le dossier `web/` existe parce que Flutter le génère, pas parce qu'une
cible web est prévue. La question est tranchée dans `CLAUDE.md` : la
distribution passe par Xcode Cloud, et ni aperçu web ni APK ne sont à
proposer. Un lecteur vidéo vertical plein écran, pensé pour le pouce et
la 3G, n'a pas d'équivalent utile dans un navigateur de bureau.

Cette ligne existe pour que la question soit close, pas ouverte.

---

## Ce qui reste, dans l'ordre

1. **Contenu** — publier de vraies séries. Tout le reste en dépend : ni
   la fiche App Store, ni les captures, ni la mesure n'ont de sens sur un
   catalogue d'essai.
2. **iOS** — vérifier l'état de la fiche dans App Store Connect, puis
   décider de soumettre ou d'attendre.
3. **iOS** — renseigner *Confidentialité de l'app* : identifiant
   d'appareil anonyme et événements de lecture, sans compte ni publicité.
4. **Android** — créer le magasin de clés de release et le brancher hors
   du dépôt, si et quand Android devient une cible.
5. **Android** — icônes adaptatives, puis fiche Play complète.

---

## Repères de la chaîne technique

Ces points sont acquis et vérifiés ; ils ne bloquent aucune boutique.

- **Base de données** : projet Supabase `Tama` en service depuis le
  24 août 2026, catalogue chargé, RLS vérifiée depuis l'extérieur.
- **Vidéo** : bibliothèque Bunny Stream configurée, épisodes lisibles.
- **Mesure** : les événements de lecture arrivent en base sans compte
  utilisateur — ouverture, lancement de série, début, progression et fin
  d'épisode. Les vues `v_retention` et `v_completion` sont en place et
  refusent l'accès depuis l'app, comme prévu.
- **Clés** : `SUPABASE_URL` et `SUPABASE_ANON_KEY` sont posées dans les
  variables du processus Xcode Cloud. Les deux valeurs Bunny ont des
  valeurs par défaut dans `ios/ci_scripts/tama_env.sh`. Sans les clés
  Supabase, le build échoue franchement plutôt que de livrer une app
  muette.
