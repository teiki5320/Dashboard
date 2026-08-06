// =============================================================================
// Catalogue COMMUN des services externes utilisables par mes applications.
// Chaque service a un identifiant stable (`id`) référencé par apps/<id>/app.json.
//
// ⚠️ SÉCURITÉ : aucune valeur secrète ici — uniquement des descriptions et des
// références. Les champs « consigner » listent ce qu'il faut noter dans la
// fiche infra.md d'une app : toujours des NOMS (de variables, de projets,
// de consoles), jamais des valeurs.
//
// Badges : "requis"    → indispensable dès qu'on est concerné par la famille
//          "optionnel" → selon les besoins de l'app
//          "gratuit"   → utilisable gratuitement (offre gratuite suffisante
//                        pour démarrer)
// =============================================================================
'use strict';

const CATEGORIES = [
  'Développement & CI',
  'Backend & données',
  'Authentification',
  'APIs externes',
  'Publication iOS',
  'Publication Android',
  'Web & domaine',
  'Suivi & qualité',
  'Design & visuels',
  'Jeux & engagement',
  'Rémunération',
  'Marketing & lancement',
  'Notifications push',
  'Analytics',
  'Cartes & géolocalisation',
  'Communication',
  'IA',
  'Stockage & médias',
];

const SERVICES = [
  // ── Développement & CI ─────────────────────────────────────────────────────
  {
    id: 'github',
    nom: 'GitHub',
    emoji: '🐙',
    categorie: 'Développement & CI',
    badge: 'gratuit',
    resume: "Hébergement du code, versions, issues et automatisations (Actions).",
    role:
      "GitHub héberge le code source de l'app, garde l'historique complet des modifications (Git), " +
      "et sert de centre de pilotage : tickets (issues), demandes de fusion (pull requests) et " +
      "automatisations (GitHub Actions) qui lancent tests, builds ou synchronisations à chaque push.",
    concepts: [
      { terme: 'Dépôt (repo)', def: "Le dossier versionné qui contient tout le code d'un projet." },
      { terme: 'Branche / Pull request', def: "On développe sur une branche, puis on propose la fusion vers la branche principale — avec relecture possible." },
      { terme: 'GitHub Actions', def: "Des robots qui exécutent des scripts à chaque événement (push, tag…) : tests, build, déploiement." },
      { terme: 'Fine-grained PAT', def: "Jeton d'accès personnel limité à un dépôt et à des permissions précises — le bon outil pour les automatisations entre dépôts." },
    ],
    cout: "Gratuit pour les dépôts publics et privés personnels ; minutes Actions gratuites largement suffisantes pour de petits projets.",
    quand: "Toujours — chaque app a son dépôt GitHub dès le premier jour.",
    alternatives: "GitLab, Bitbucket, Codeberg.",
    consigner: [
      "URL du dépôt (owner/repo) et branche par défaut",
      "Workflows Actions présents et ce qu'ils font",
      "Noms des secrets Actions utilisés (jamais leurs valeurs)",
    ],
  },

  // ── Backend & données ──────────────────────────────────────────────────────
  {
    id: 'supabase',
    nom: 'Supabase',
    emoji: '⚡',
    categorie: 'Backend & données',
    badge: 'gratuit',
    resume: "Backend clé en main : base Postgres, auth, stockage, API auto-générée.",
    role:
      "Supabase fournit un backend complet sans serveur à administrer : une vraie base de données " +
      "PostgreSQL, une API REST/Realtime générée automatiquement, l'authentification des " +
      "utilisateurs, le stockage de fichiers et des fonctions serveur (Edge Functions).",
    concepts: [
      { terme: 'PostgreSQL', def: "Base de données relationnelle (tables, colonnes, relations) — le standard open source." },
      { terme: 'Row Level Security (RLS)', def: "Règles écrites dans la base qui décident ligne par ligne qui peut lire/écrire — LA sécurité côté Supabase, à activer sur chaque table." },
      { terme: 'Clé anon / service_role', def: "La clé `anon` est publique (embarquée dans l'app, protégée par RLS) ; la clé `service_role` est SECRÈTE et ne doit jamais quitter le serveur." },
      { terme: 'Edge Functions', def: "Petites fonctions serveur (TypeScript) pour la logique qui ne doit pas vivre dans l'app (paiements, webhooks…)." },
    ],
    cout: "Offre gratuite généreuse (500 Mo de base, 1 Go de stockage) ; Pro à ~25 $/mois quand l'app grossit. Attention : les projets gratuits inactifs 7 jours sont mis en pause.",
    quand: "Dès que l'app a besoin de données partagées entre appareils, de comptes utilisateurs ou de synchronisation.",
    alternatives: "Firebase (NoSQL), PocketBase (auto-hébergé), CloudKit (100 % Apple).",
    consigner: [
      "URL du projet (https://<ref>.supabase.co) et région",
      "Tables principales et état de la RLS (activée où ?)",
      "Noms des variables d'environnement (SUPABASE_URL, SUPABASE_ANON_KEY…)",
      "Edge Functions déployées et leur rôle",
    ],
  },
  {
    id: 'firebase',
    nom: 'Firebase',
    emoji: '🔥',
    categorie: 'Backend & données',
    badge: 'gratuit',
    resume: "La plateforme backend de Google : Firestore, Auth, FCM, Analytics…",
    role:
      "Firebase regroupe de nombreux services Google pour apps mobiles : base de données NoSQL " +
      "(Firestore), authentification, notifications push (FCM), analytics, crash reporting " +
      "(Crashlytics), configuration à distance… On peut n'utiliser qu'une brique (souvent FCM).",
    concepts: [
      { terme: 'Firestore', def: "Base NoSQL orientée documents : des collections de documents JSON, synchronisés en temps réel." },
      { terme: 'GoogleService-Info.plist / google-services.json', def: "Fichier de configuration à embarquer dans l'app — il contient des identifiants publics, pas des secrets." },
      { terme: 'Règles de sécurité', def: "Équivalent Firebase de la RLS : qui peut lire/écrire quoi, écrit dans la console." },
    ],
    cout: "Plan Spark gratuit très large ; facturation à l'usage (Blaze) au-delà.",
    quand: "Si on veut FCM (push), Crashlytics, ou un backend NoSQL temps réel — souvent en complément d'un autre backend.",
    alternatives: "Supabase (SQL), CloudKit, AWS Amplify.",
    consigner: [
      "Nom et ID du projet Firebase",
      "Briques utilisées (FCM ? Firestore ? Crashlytics ?)",
      "Emplacement des fichiers de config dans le dépôt de l'app",
    ],
  },

  // ── Authentification ───────────────────────────────────────────────────────
  {
    id: 'auth',
    nom: 'Connexion utilisateurs (Apple / Google / e-mail)',
    emoji: '🔐',
    categorie: 'Authentification',
    badge: 'gratuit',
    resume: "Comptes utilisateurs : Sign in with Apple, Google, magic link e-mail…",
    role:
      "L'authentification identifie chaque utilisateur pour lui associer ses données. En pratique " +
      "on branche un fournisseur d'identité (Apple, Google, e-mail) sur le backend (Supabase Auth, " +
      "Firebase Auth), qui gère la création de session et les jetons.",
    concepts: [
      { terme: 'Sign in with Apple', def: "OBLIGATOIRE sur iOS dès que l'app propose une connexion sociale tierce (règle App Store). Simple et respectueux de la vie privée." },
      { terme: 'OAuth', def: "Le protocole standard : l'app redirige vers le fournisseur (Google…), qui renvoie un jeton prouvant l'identité." },
      { terme: 'Magic link / OTP', def: "Connexion sans mot de passe : un lien ou un code envoyé par e-mail/SMS." },
      { terme: 'Anonyme → compte', def: "Laisser l'utilisateur essayer l'app sans compte, puis convertir sa session anonyme en vrai compte plus tard : meilleur taux d'adoption." },
    ],
    cout: "Gratuit via Supabase/Firebase Auth (quotas très larges).",
    quand: "Dès que des données doivent suivre l'utilisateur d'un appareil à l'autre, ou qu'il y a du contenu personnel.",
    alternatives: "Clerk, Auth0 (payants, plus riches), ou pas de compte du tout si l'app est locale.",
    consigner: [
      "Fournisseurs activés (Apple, Google, e-mail…)",
      "Où est configurée la redirection OAuth (URL de callback)",
      "Règle de suppression de compte (obligatoire sur les stores)",
    ],
  },

  // ── APIs externes ──────────────────────────────────────────────────────────
  {
    id: 'api-tierce',
    nom: 'API tierce (météo, données publiques…)',
    emoji: '🔌',
    categorie: 'APIs externes',
    badge: 'optionnel',
    alias: ['API externe', 'APIs externes'],
    resume: "Toute API externe qui fournit des données ou un service à l'app.",
    role:
      "Une API tierce fournit à l'app des données qu'on ne produit pas soi-même : météo, taux de " +
      "change, données publiques, traduction… On l'appelle en HTTPS, souvent avec une clé d'API, " +
      "et on respecte ses quotas.",
    concepts: [
      { terme: "Clé d'API", def: "Identifiant qui authentifie l'app auprès du service. À stocker côté serveur (Edge Function) si elle est payante ou sensible — jamais en clair dans le dépôt." },
      { terme: 'Quota / rate limit', def: "Nombre d'appels autorisés par minute/jour. À surveiller pour ne pas casser l'app ou payer trop." },
      { terme: 'Cache', def: "Garder la dernière réponse en local pour limiter les appels et fonctionner hors ligne." },
    ],
    cout: "Très variable : beaucoup d'APIs ont une offre gratuite avec quota.",
    quand: "Quand l'app a besoin de données externes vivantes (météo, prix, actualités…).",
    alternatives: "Données embarquées dans l'app (si statiques), open data téléchargé périodiquement.",
    consigner: [
      "Nom de l'API, URL de base, documentation",
      "Nom de la variable qui porte la clé (ex. WEATHER_API_KEY) et où elle vit",
      "Quota de l'offre utilisée et stratégie de cache",
    ],
  },

  // ── Publication iOS ────────────────────────────────────────────────────────
  {
    id: 'apple-developer',
    nom: 'Apple Developer Program',
    emoji: '🍎',
    categorie: 'Publication iOS',
    badge: 'requis',
    resume: "L'adhésion annuelle indispensable pour publier sur l'App Store.",
    role:
      "Le programme développeur Apple donne le droit de signer et distribuer des apps iOS : accès à " +
      "App Store Connect, TestFlight, certificats de signature, notifications push (APNs) et " +
      "capacités système (Sign in with Apple, iCloud…).",
    concepts: [
      { terme: 'Certificat de signature', def: "Prouve que l'app vient bien de vous. Géré aujourd'hui presque automatiquement par Xcode (« Automatically manage signing »)." },
      { terme: 'Identifiants (App ID)', def: "L'identifiant unique de l'app (ex. com.teiki.kultiva) auquel on rattache les capacités (push, iCloud…)." },
      { terme: 'Profil de provisionnement', def: "Le fichier qui relie app + certificat + appareils autorisés (pour les tests) ou la distribution App Store." },
    ],
    cout: "99 $ / an (compte individuel). Sans lui : pas de publication, TestFlight, ni push.",
    quand: "Obligatoire dès qu'on veut distribuer une app iOS au-delà de son propre appareil.",
    alternatives: "Aucune pour l'App Store. (Distribution interne limitée possible avec un compte gratuit, 7 jours, appareil personnel uniquement.)",
    consigner: [
      "Team ID et type de compte (individuel/organisation)",
      "App ID (bundle identifier) de chaque app",
      "Capacités activées (push, Sign in with Apple, iCloud…)",
    ],
  },
  {
    id: 'app-store-connect',
    nom: 'App Store Connect',
    emoji: '🛒',
    categorie: 'Publication iOS',
    badge: 'requis',
    resume: "La console où l'on gère la fiche App Store, TestFlight et les ventes.",
    role:
      "App Store Connect est le tableau de bord Apple : création de la fiche de l'app (nom, " +
      "captures, description, mots-clés), envoi des builds, bêta-tests TestFlight, soumission à la " +
      "review, prix et achats intégrés, statistiques de ventes et rapports financiers.",
    concepts: [
      { terme: 'TestFlight', def: "La bêta d'Apple : jusqu'à 10 000 testeurs externes reçoivent les builds avant la sortie publique." },
      { terme: 'Review Apple', def: "Chaque version est relue par Apple (24–48 h en général). Anticiper les règles : confidentialité, achat intégré, suppression de compte…" },
      { terme: 'Fiche produit', def: "Nom (30 car.), sous-titre (30 car.), mots-clés (100 car.), captures par taille d'écran — la matière première de l'ASO." },
      { terme: 'App Privacy', def: "Le questionnaire « étiquette de confidentialité » : quelles données l'app collecte et pourquoi." },
    ],
    cout: "Inclus dans l'Apple Developer Program.",
    quand: "Dès la première distribution TestFlight, puis à chaque version.",
    alternatives: "Aucune — passage obligé de l'écosystème iOS.",
    consigner: [
      "Apple ID de l'app (numéro) et SKU",
      "Langues de la fiche, mots-clés ASO retenus",
      "Groupes TestFlight actifs",
      "Achats intégrés déclarés (identifiants de produits)",
    ],
  },
  {
    id: 'xcode-cloud',
    nom: 'Xcode Cloud',
    emoji: '☁️',
    categorie: 'Publication iOS',
    badge: 'optionnel',
    resume: "La CI/CD d'Apple : build, tests et envoi TestFlight automatiques.",
    role:
      "Xcode Cloud compile l'app sur les serveurs d'Apple à chaque push ou tag, lance les tests, " +
      "et peut envoyer automatiquement le build vers TestFlight — plus besoin de builder sur son " +
      "Mac ni de gérer les certificats à la main.",
    concepts: [
      { terme: 'Workflow', def: "Une recette : « à chaque push sur main → build + tests → TestFlight ». Configurée dans Xcode ou App Store Connect." },
      { terme: 'Heures de calcul', def: "Le quota mensuel de temps de build : 25 h/mois incluses avec le compte développeur." },
    ],
    cout: "25 h/mois incluses dans l'Apple Developer Program ; paliers payants au-delà.",
    quand: "Quand on veut des TestFlight automatiques et reproductibles, sans dépendre de sa machine.",
    alternatives: "Fastlane + GitHub Actions (runners macOS), Bitrise, Codemagic.",
    consigner: [
      "Workflows configurés (déclencheur → actions)",
      "Branche/tag surveillés et cible (TestFlight interne/externe)",
      "Consommation d'heures si proche du quota",
    ],
  },

  // ── Publication Android ────────────────────────────────────────────────────
  {
    id: 'play-console',
    nom: 'Google Play Console',
    emoji: '🤖',
    categorie: 'Publication Android',
    badge: 'requis',
    resume: "La console de publication Android : fiche Play Store, tests, sorties.",
    role:
      "La Play Console est l'équivalent Android d'App Store Connect : création de la fiche Play " +
      "Store, envoi des builds (AAB), pistes de test (interne, fermée, ouverte), déploiement " +
      "progressif, statistiques et rapports.",
    concepts: [
      { terme: 'AAB (Android App Bundle)', def: "Le format d'envoi obligatoire : Google génère les APK optimisés par appareil." },
      { terme: 'Pistes de test', def: "Interne (rapide, 100 testeurs) → fermée → ouverte → production. On promeut un build de piste en piste." },
      { terme: 'Exigence des 12 testeurs', def: "Pour un nouveau compte personnel : 12 testeurs pendant 14 jours en test fermé avant de pouvoir passer en production." },
      { terme: 'Déploiement progressif', def: "Sortir la mise à jour sur 5 %, 20 %, 100 % des utilisateurs pour limiter les dégâts d'un bug." },
    ],
    cout: "25 $ une seule fois (à vie).",
    quand: "Obligatoire pour distribuer sur le Play Store.",
    alternatives: "F-Droid (open source), APK direct (hors store), Amazon Appstore.",
    consigner: [
      "Nom du compte développeur et ID de l'app (package name)",
      "Piste de test active et état de l'exigence des 12 testeurs",
      "Pays de diffusion et fiche (langues)",
    ],
  },
  {
    id: 'android-keystore',
    nom: 'Keystore Android (signature)',
    emoji: '🔑',
    categorie: 'Publication Android',
    badge: 'requis',
    resume: "La clé qui signe l'app Android — à sauvegarder précieusement.",
    role:
      "Chaque app Android est signée par une clé cryptographique (keystore). Elle prouve que les " +
      "mises à jour viennent du même auteur : la perdre, c'est perdre la possibilité de mettre à " +
      "jour l'app (sauf si Google la gère pour vous — recommandé).",
    concepts: [
      { terme: 'Play App Signing', def: "Google garde la clé de signature finale, vous ne gérez qu'une « upload key » — remplaçable en cas de perte. À activer systématiquement." },
      { terme: 'Upload key', def: "La clé locale qui signe ce que vous envoyez à Google. À stocker dans un gestionnaire de mots de passe / coffre, JAMAIS dans un dépôt Git." },
      { terme: 'SHA-1 / SHA-256', def: "Les empreintes publiques de la clé — demandées par Firebase, Google Sign-In, deep links… Elles, on peut les noter." },
    ],
    cout: "Gratuit.",
    quand: "Créée une fois par app, au premier envoi vers la Play Console.",
    alternatives: "Aucune — la signature est obligatoire. Play App Signing est l'option de gestion recommandée.",
    consigner: [
      "Play App Signing activé ? (oui espéré)",
      "OÙ est sauvegardée l'upload key (nom du coffre — pas la clé !)",
      "Empreintes SHA-1/SHA-256 publiques si des services en dépendent",
    ],
  },

  // ── Web & domaine ──────────────────────────────────────────────────────────
  {
    id: 'hebergement-web',
    nom: 'Hébergement web (Vercel / Netlify / GitHub Pages)',
    emoji: '🌐',
    categorie: 'Web & domaine',
    badge: 'gratuit',
    resume: "Héberger le site vitrine, la page support ou la webapp.",
    role:
      "Chaque app a besoin d'au moins une page web : site vitrine, page support (exigée par les " +
      "stores), politique de confidentialité, fichiers de deep links. Vercel, Netlify ou GitHub " +
      "Pages déploient automatiquement un site statique depuis le dépôt Git.",
    concepts: [
      { terme: 'Site statique', def: "Des fichiers HTML/CSS/JS servis tels quels — rapide, gratuit, sans serveur à maintenir. (Ce dashboard en est un !)" },
      { terme: 'Déploiement continu', def: "Chaque push sur la branche principale met le site à jour automatiquement." },
      { terme: 'HTTPS', def: "Fourni automatiquement par ces plateformes — indispensable (les stores et les deep links l'exigent)." },
    ],
    cout: "Gratuit pour un usage personnel (quotas très larges).",
    quand: "Dès la préparation de la sortie : page support + politique de confidentialité sont demandées à la soumission.",
    alternatives: "Cloudflare Pages, OVH mutualisé, serveur perso.",
    consigner: [
      "Plateforme utilisée et dépôt source du site",
      "URLs : vitrine, support, politique de confidentialité",
      "Emplacement des fichiers de deep links (.well-known/…)",
    ],
  },
  {
    id: 'nom-de-domaine',
    nom: 'Nom de domaine',
    emoji: '🏷️',
    categorie: 'Web & domaine',
    badge: 'optionnel',
    resume: "L'adresse propre de l'app (monapp.com) — image pro et deep links.",
    role:
      "Un domaine à soi donne une adresse mémorisable et professionnelle, des e-mails dédiés " +
      "(contact@monapp.com) et sert de base aux liens universels (deep links) qui ouvrent " +
      "directement l'app.",
    concepts: [
      { terme: 'Registrar', def: "Le vendeur du domaine (OVH, Namecheap, Cloudflare…). Le domaine se loue à l'année." },
      { terme: 'DNS', def: "L'annuaire qui fait pointer le domaine vers l'hébergeur (enregistrements A, CNAME, TXT…)." },
      { terme: 'Sous-domaines', def: "app.monapp.com, api.monapp.com… gratuits une fois le domaine possédé." },
    ],
    cout: "≈ 10–15 € / an (.com) ; certaines extensions plus chères.",
    quand: "Quand l'app devient sérieuse : image de marque, deep links, e-mail pro.",
    alternatives: "Sous-domaine gratuit de l'hébergeur (monapp.vercel.app) pour démarrer.",
    consigner: [
      "Domaine, registrar, date de renouvellement",
      "Où est géré le DNS et enregistrements importants",
      "Adresses e-mail liées au domaine",
    ],
  },
  {
    id: 'deep-links',
    nom: 'Deep links (Universal Links / App Links)',
    emoji: '🔗',
    categorie: 'Web & domaine',
    badge: 'gratuit',
    resume: "Des liens web qui ouvrent directement la bonne page DANS l'app.",
    role:
      "Un deep link transforme une URL (https://monapp.com/plante/42) en ouverture directe de " +
      "l'écran correspondant dans l'app si elle est installée — sinon le site web s'ouvre. " +
      "Indispensable pour le partage, les campagnes marketing et les e-mails.",
    concepts: [
      { terme: 'Universal Links (iOS)', def: "Apple vérifie un fichier apple-app-site-association hébergé sur le domaine, qui déclare quelles URLs ouvrent l'app." },
      { terme: 'App Links (Android)', def: "Même principe avec le fichier assetlinks.json (contenant l'empreinte SHA-256 de la clé de signature)." },
      { terme: 'Lien différé (deferred)', def: "L'utilisateur clique, installe l'app, et arrive quand même sur la bonne page au premier lancement — nécessite un service tiers (Branch…)." },
    ],
    cout: "Gratuit (il faut juste un domaine en HTTPS).",
    quand: "Dès qu'on partage du contenu de l'app ou qu'on fait des campagnes qui doivent atterrir dans l'app.",
    alternatives: "Schémas d'URL personnalisés (monapp://) — plus simples mais moins fiables ; Branch.io pour les liens différés.",
    consigner: [
      "Domaine associé et chemins couverts",
      "Emplacement des fichiers .well-known (AASA / assetlinks.json)",
      "Écrans de destination gérés par l'app",
    ],
  },

  // ── Suivi & qualité ────────────────────────────────────────────────────────
  {
    id: 'sentry',
    nom: 'Sentry (suivi des crashs)',
    emoji: '🚨',
    categorie: 'Suivi & qualité',
    badge: 'optionnel',
    resume: "Alerte et détail complet à chaque crash ou erreur en production.",
    role:
      "Sentry capture automatiquement les crashs et erreurs chez les vrais utilisateurs, avec la " +
      "pile d'appels, l'appareil, la version de l'app… et envoie une alerte. On corrige les bugs " +
      "qu'on n'aurait jamais vus autrement.",
    concepts: [
      { terme: 'DSN', def: "L'identifiant public du projet Sentry embarqué dans l'app (ce n'est pas un secret)." },
      { terme: 'Symbolication (dSYM)', def: "L'envoi des symboles de debug pour que les piles d'appels soient lisibles (noms de fonctions au lieu d'adresses mémoire)." },
      { terme: 'Release health', def: "Le taux de sessions sans crash par version — l'indicateur qualité n° 1." },
    ],
    cout: "Offre gratuite : 5 000 événements/mois — suffisant pour démarrer.",
    quand: "Dès la première bêta TestFlight : c'est là que les crashs commencent.",
    alternatives: "Firebase Crashlytics (gratuit), les rapports de crash intégrés d'App Store Connect (basiques).",
    consigner: [
      "Nom de l'organisation et du projet Sentry, DSN",
      "Upload des dSYM automatisé ? (où, comment)",
      "Seuils d'alerte configurés",
    ],
  },
  {
    id: 'in-app-review',
    nom: 'Avis in-app (StoreKit Review / In-App Review)',
    emoji: '⭐',
    categorie: 'Suivi & qualité',
    badge: 'gratuit',
    resume: "Demander une note sans quitter l'app, au bon moment.",
    role:
      "Les APIs natives (SKStoreReviewController sur iOS, In-App Review sur Android) affichent la " +
      "popup de notation directement dans l'app. Bien déclenchée (après un moment de succès de " +
      "l'utilisateur), elle multiplie les notes — carburant de l'ASO.",
    concepts: [
      { terme: 'Moment de bonheur', def: "Déclencher la demande juste après une action réussie (3e récolte enregistrée, objectif atteint…), jamais au démarrage." },
      { terme: 'Quota système', def: "iOS limite l'affichage à ~3 fois par an et par utilisateur — le système décide, on ne peut que « proposer »." },
    ],
    cout: "Gratuit (API native).",
    quand: "Dès la v1 : les premières notes comptent double pour le classement.",
    alternatives: "Lien direct vers la page de notation du store (moins efficace).",
    consigner: [
      "Événement déclencheur choisi et garde-fous (fréquence)",
      "Note moyenne actuelle et nombre d'avis par store",
    ],
  },

  // ── Design & visuels ───────────────────────────────────────────────────────
  {
    id: 'figma',
    nom: 'Figma',
    emoji: '🎨',
    categorie: 'Design & visuels',
    badge: 'gratuit',
    resume: "Maquettes d'écrans, icône, exploration visuelle — dans le navigateur.",
    role:
      "Figma sert à dessiner les écrans avant de les coder, à concevoir l'icône de l'app et à " +
      "garder une bibliothèque de composants cohérente (couleurs, typos, espacements).",
    concepts: [
      { terme: 'Frame', def: "Un « écran » à la taille d'un iPhone/Android sur lequel on dessine." },
      { terme: 'Composant', def: "Un élément réutilisable (bouton, carte) : on le modifie une fois, tout se met à jour." },
      { terme: 'Export', def: "Icônes et images exportées en @1x/@2x/@3x (iOS) ou par densité (Android)." },
    ],
    cout: "Gratuit pour un usage personnel (3 fichiers en édition).",
    quand: "Avant de coder un écran complexe, et pour tous les visuels du store.",
    alternatives: "Sketch (Mac, payant), Penpot (open source), papier + crayon pour démarrer.",
    consigner: [
      "Lien du fichier Figma principal de l'app",
      "Où sont les sources de l'icône et des captures store",
    ],
  },
  {
    id: 'visuels-store',
    nom: 'Visuels du store (icône, captures)',
    emoji: '🖼️',
    categorie: 'Design & visuels',
    badge: 'requis',
    resume: "Icône et captures d'écran : la première impression sur le store.",
    role:
      "L'icône et les captures d'écran déterminent une grande partie du taux de conversion " +
      "(visiteurs de la fiche → installations). Les stores imposent des tailles précises ; les " +
      "captures gagnent à raconter une histoire (bandeaux de texte, ordre réfléchi).",
    concepts: [
      { terme: 'Tailles requises', def: "iOS : captures 6,9″ et 6,5″ minimum ; icône 1024×1024. Android : téléphone + éventuellement tablette, bannière « feature graphic » 1024×500." },
      { terme: 'Taux de conversion de fiche', def: "% de visiteurs qui installent — visible dans les consoles ; les captures sont le levier n° 1." },
      { terme: 'A/B test de fiche', def: "La Play Console (et App Store depuis iOS 15) permettent de tester plusieurs jeux de captures." },
    ],
    cout: "Gratuit si fait soi-même (Figma) ; 50–300 € si délégué.",
    quand: "Obligatoire à la première soumission ; à retravailler quand la conversion stagne.",
    alternatives: "Générateurs de mockups (AppMockUp, Previewed), captures brutes pour commencer.",
    consigner: [
      "Où sont les sources des visuels (Figma, dossier…)",
      "Jeux de captures par langue et par taille",
      "Résultats d'A/B tests éventuels",
    ],
  },

  // ── Jeux & engagement ──────────────────────────────────────────────────────
  {
    id: 'game-services',
    nom: 'Game Center / Play Games',
    emoji: '🏆',
    categorie: 'Jeux & engagement',
    badge: 'gratuit',
    resume: "Classements, succès et sauvegarde de progression fournis par les stores.",
    role:
      "Les services de jeu natifs (Game Center sur iOS, Play Games sur Android) offrent " +
      "gratuitement classements, succès/trophées, défis entre amis et sauvegarde de progression " +
      "dans le cloud — de puissants moteurs de rétention, pas réservés aux « vrais » jeux.",
    concepts: [
      { terme: 'Leaderboard', def: "Classement global ou entre amis sur un score. Déclaré dans App Store Connect / Play Console." },
      { terme: 'Achievements', def: "Succès débloqués par des actions (« 7 jours d'affilée ! ») — donnent des objectifs et des raisons de revenir." },
      { terme: 'Gamification', def: "Appliquer ces mécaniques à une app non-jeu : séries (streaks), badges, niveaux." },
    ],
    cout: "Gratuit.",
    quand: "Si l'app a une dimension de progression, de score ou de défi.",
    alternatives: "Système maison dans le backend (plus de contrôle, plus de travail).",
    consigner: [
      "Classements et succès déclarés (identifiants)",
      "Mécaniques de gamification actives dans l'app",
    ],
  },

  // ── Rémunération ───────────────────────────────────────────────────────────
  {
    id: 'storekit',
    nom: 'StoreKit / Play Billing (achats intégrés)',
    emoji: '💳',
    categorie: 'Rémunération',
    badge: 'requis',
    resume: "Le système OBLIGATOIRE des stores pour vendre du contenu numérique.",
    role:
      "Pour vendre dans l'app du contenu numérique (premium, abonnement, pièces…), les stores " +
      "imposent leur système de paiement : StoreKit sur iOS, Play Billing sur Android. Ils gèrent " +
      "le paiement, les reçus, les remboursements et le partage de revenus.",
    concepts: [
      { terme: 'Types de produits', def: "Consommable (pack de pièces), non-consommable (déblocage premium à vie), abonnement auto-renouvelable." },
      { terme: 'Commission', def: "15 % pour les petits développeurs (< 1 M$ / an via le Small Business Program Apple ou l'équivalent Google), sinon 30 %." },
      { terme: 'Restauration des achats', def: "Bouton obligatoire : l'utilisateur qui réinstalle doit retrouver ses achats." },
      { terme: 'Sandbox', def: "Environnement de test : on teste les achats sans payer réellement." },
    ],
    cout: "Pas d'abonnement, mais commission de 15–30 % sur chaque vente.",
    quand: "Dès qu'on vend du NUMÉRIQUE dans l'app. (Biens physiques et services réels : Stripe autorisé.)",
    alternatives: "Aucune pour le numérique in-app (règle des stores). RevenueCat simplifie l'implémentation par-dessus.",
    consigner: [
      "Liste des produits (identifiants, type, prix)",
      "Statut Small Business Program (15 %)",
      "Comment sont validés les reçus (local, serveur, RevenueCat)",
    ],
  },
  {
    id: 'revenuecat',
    nom: 'RevenueCat',
    emoji: '🐱',
    categorie: 'Rémunération',
    badge: 'optionnel',
    resume: "Sur-couche qui simplifie abonnements et achats sur iOS + Android.",
    role:
      "RevenueCat enveloppe StoreKit et Play Billing dans un SDK unique : validation des reçus " +
      "côté serveur, statut d'abonnement synchronisé entre plateformes, écrans de paywall, " +
      "statistiques de revenus — sans écrire de backend de facturation.",
    concepts: [
      { terme: 'Entitlement', def: "Le « droit » abstrait (ex. premium) : l'app teste « a-t-il premium ? » sans se soucier du produit acheté." },
      { terme: 'Offering / Paywall', def: "Le groupe de produits présenté à l'utilisateur — modifiable depuis la console sans mise à jour de l'app." },
      { terme: 'Webhooks', def: "RevenueCat notifie le backend (Supabase…) à chaque événement d'abonnement (achat, renouvellement, churn)." },
    ],
    cout: "Gratuit jusqu'à 2 500 $ de revenus mensuels suivis — largement de quoi voir venir.",
    quand: "Dès qu'on met en place un abonnement, surtout multi-plateforme.",
    alternatives: "StoreKit 2 en direct (iOS seul, plus simple qu'avant), Adapty, Qonversion.",
    consigner: [
      "ID du projet RevenueCat et entitlements définis",
      "Offerings actifs et produits liés par store",
      "Webhooks branchés (vers quoi ?)",
    ],
  },
  {
    id: 'admob',
    nom: 'AdMob (publicité intégrée)',
    emoji: '📺',
    categorie: 'Rémunération',
    badge: 'optionnel',
    resume: "Afficher des pubs dans l'app et être payé à l'affichage/clic.",
    role:
      "AdMob (Google) insère des publicités dans l'app : bannières, interstitiels (plein écran), " +
      "ou vidéos récompensées. Les revenus dépendent surtout du volume d'utilisateurs et du pays " +
      "de l'audience (eCPM).",
    concepts: [
      { terme: 'eCPM', def: "Revenu pour 1 000 affichages. Très variable : de quelques centimes à plusieurs euros selon pays et format." },
      { terme: 'Vidéo récompensée', def: "L'utilisateur choisit de regarder une pub contre un bonus — le format le mieux accepté et le mieux payé." },
      { terme: 'ATT (iOS)', def: "La popup de consentement au pistage : sans accord, les pubs sont moins ciblées et moins payées." },
      { terme: 'Seuil de paiement', def: "AdMob paie à partir de 100 € de revenus cumulés." },
    ],
    cout: "Gratuit — c'est AdMob qui paie (moins la part Google).",
    quand: "Modèle gratuit avec beaucoup d'utilisateurs actifs ; sinon les revenus restent symboliques.",
    alternatives: "Unity Ads, AppLovin ; ou pas de pub (abonnement/sponsoring) pour préserver l'expérience.",
    consigner: [
      "ID d'application AdMob et ID des blocs d'annonces",
      "Formats utilisés et emplacements dans l'app",
      "Configuration du consentement (ATT / UMP)",
    ],
  },
  {
    id: 'stripe',
    nom: 'Stripe',
    emoji: '💰',
    categorie: 'Rémunération',
    badge: 'optionnel',
    resume: "Paiement par carte pour biens physiques, services réels ou web.",
    role:
      "Stripe encaisse des paiements par carte (et wallets) hors du circuit des stores : vente de " +
      "biens physiques, réservations, prestations réelles, ou abonnements souscrits sur le site " +
      "web. Interdit pour du contenu numérique consommé DANS l'app mobile (règle des stores).",
    concepts: [
      { terme: 'Checkout', def: "La page de paiement hébergée par Stripe — le plus simple et le plus sûr pour démarrer." },
      { terme: 'Clés API', def: "Clé publiable (côté client, ok) et clé secrète (serveur UNIQUEMENT — Edge Function Supabase par exemple)." },
      { terme: 'Webhook', def: "Stripe notifie le serveur des paiements réussis — c'est là qu'on déclenche la livraison." },
    ],
    cout: "Pas d'abonnement ; ≈ 1,5–2,9 % + 0,25 € par transaction.",
    quand: "Biens/services réels, ou vente web-first pour éviter la commission des stores (autorisé si l'achat se fait hors app).",
    alternatives: "PayPal, Lemon Squeezy (gère la TVA à votre place), paiement mobile money local.",
    consigner: [
      "Compte Stripe et produits/tarifs créés",
      "Noms des variables de clés (STRIPE_SECRET_KEY côté serveur…)",
      "Webhooks configurés et endpoint récepteur",
    ],
  },
  {
    id: 'affiliation',
    nom: 'Affiliation',
    emoji: '🤝',
    categorie: 'Rémunération',
    badge: 'optionnel',
    resume: "Commission touchée quand un utilisateur achète via vos liens.",
    role:
      "L'affiliation consiste à recommander des produits d'autres marchands (matériel de " +
      "jardinage, livres, équipement…) via des liens traqués : à chaque achat, l'app touche une " +
      "commission. Zéro friction pour l'utilisateur, revenus proportionnels à la confiance.",
    concepts: [
      { terme: 'Lien affilié', def: "Une URL contenant votre identifiant de partenaire — le marchand attribue la vente." },
      { terme: "Cookie / fenêtre d'attribution", def: "Durée pendant laquelle l'achat vous est crédité après le clic (24 h chez Amazon, souvent 30 jours ailleurs)." },
      { terme: 'Divulgation', def: "Obligation légale d'indiquer que les liens sont affiliés." },
    ],
    cout: "Gratuit — commissions de 1 à 20 % selon les programmes.",
    quand: "Quand l'app recommande naturellement des produits (contexte e-commerce pertinent).",
    alternatives: "Partenariats directs avec des marchands locaux, sponsoring.",
    consigner: [
      "Programmes rejoints (Amazon Partenaires, Awin…) et identifiants de partenaire",
      "Emplacements des liens dans l'app",
      "Revenus par programme dans les KPIs",
    ],
  },
  {
    id: 'mobile-money',
    nom: 'Mobile money (Wave / Orange Money / agrégateurs)',
    emoji: '📱',
    categorie: 'Rémunération',
    badge: 'optionnel',
    resume: "Encaisser via les portefeuilles mobiles dominants en Afrique / Pacifique.",
    role:
      "Dans beaucoup de marchés (Afrique de l'Ouest, Pacifique…), la carte bancaire est rare : le " +
      "paiement passe par le mobile money (Wave, Orange Money, MTN MoMo…). Un agrégateur permet " +
      "d'accepter plusieurs portefeuilles avec une seule intégration API.",
    concepts: [
      { terme: 'Portefeuille mobile', def: "De l'argent stocké sur le numéro de téléphone, rechargé en espèces chez des agents — pas besoin de compte bancaire." },
      { terme: 'Agrégateur', def: "Un service (CinetPay, PawaPay, Bizao, Semoa…) qui unifie Wave + Orange Money + autres derrière une seule API et un seul contrat." },
      { terme: 'USSD / Push payment', def: "Le client valide le paiement par un code sur son téléphone — le webhook confirme ensuite côté serveur." },
      { terme: 'Règle des stores', def: "Comme Stripe : réservé aux biens/services réels, pas au contenu numérique in-app." },
    ],
    cout: "Commission par transaction (≈ 1–3 % + frais agrégateur) ; contrat marchand à ouvrir.",
    quand: "Si l'audience cible paie en mobile money (Sénégal, Côte d'Ivoire, Polynésie avec solutions locales…).",
    alternatives: "Stripe (si cartes disponibles), paiement en espèces à la livraison, virement.",
    consigner: [
      "Agrégateur choisi, portefeuilles couverts, pays",
      "Compte marchand (nom du compte, pas les accès)",
      "Endpoint webhook de confirmation et logique de livraison",
    ],
  },
  {
    id: 'sponsoring',
    nom: 'Sponsoring & partenariats',
    emoji: '🤲',
    categorie: 'Rémunération',
    badge: 'optionnel',
    resume: "Une marque ou institution finance l'app en échange de visibilité.",
    role:
      "Le sponsoring consiste à faire financer l'app par une marque, une collectivité ou une " +
      "institution en phase avec son public (ex. une app de jardinage sponsorisée par une " +
      "enseigne de jardinerie ou une chambre d'agriculture) : présence discrète du sponsor contre " +
      "un financement stable.",
    concepts: [
      { terme: 'Kit sponsor', def: "Un document d'une page : audience, chiffres clés (téléchargements, utilisateurs actifs), emplacements offerts, tarifs." },
      { terme: 'Contreparties', def: "Logo « avec le soutien de », écran sponsorisé, contenu co-brandé — sans dégrader l'expérience." },
      { terme: 'Subventions', def: "Piste cousine : appels à projets publics (numérique, agriculture, culture…) qui financent sans contrepartie commerciale." },
    ],
    cout: "Gratuit — du temps de prospection ; revenus par contrat (forfait mensuel/annuel).",
    quand: "Quand l'app a une audience nichée et mesurable qui intéresse des acteurs locaux.",
    alternatives: "Dons (Buy Me a Coffee, Tipeee), financement participatif, subventions.",
    consigner: [
      "Sponsors actuels et durée des contrats",
      "Emplacements sponsorisés dans l'app",
      "Kit sponsor à jour (lien) et chiffres partagés",
    ],
  },

  // ── Marketing & lancement ──────────────────────────────────────────────────
  {
    id: 'aso',
    nom: 'ASO (référencement sur les stores)',
    emoji: '🔍',
    categorie: 'Marketing & lancement',
    badge: 'gratuit',
    resume: "Optimiser la fiche store pour être trouvé : mots-clés, visuels, notes.",
    role:
      "L'ASO (App Store Optimization) est le SEO des stores : choisir les bons mots-clés dans le " +
      "titre/sous-titre/champ mots-clés, soigner icône et captures, obtenir des notes — pour " +
      "apparaître dans les recherches et convertir les visiteurs en installations.",
    concepts: [
      { terme: 'Champs indexés', def: "iOS : titre (30 car.), sous-titre (30 car.), champ mots-clés (100 car., invisible). Android : titre, description courte ET longue (indexée)." },
      { terme: 'Volume vs difficulté', def: "Viser des mots-clés recherchés mais peu concurrentiels — surtout au début (longue traîne)." },
      { terme: 'Localisation', def: "Traduire la fiche par pays multiplie les mots-clés indexés (et les fiches FR/EN peuvent cumuler leurs mots-clés)." },
      { terme: 'Vélocité des avis', def: "Le rythme de nouvelles notes influence le classement — d'où l'importance de l'avis in-app." },
    ],
    cout: "Gratuit (son propre temps) ; outils payants optionnels (AppTweak, Astro…).",
    quand: "À chaque version : l'ASO est un travail continu, pas un one-shot.",
    alternatives: "Aucune — c'est une pratique, pas un service. Les outils ne font qu'aider.",
    consigner: [
      "Mots-clés visés par langue et position actuelle",
      "Historique des changements de fiche (et effets)",
      "Note moyenne et nombre d'avis par store",
    ],
  },
  {
    id: 'pub-acquisition',
    nom: "Publicité d'acquisition (Apple Search Ads, Meta…)",
    emoji: '📢',
    categorie: 'Marketing & lancement',
    badge: 'optionnel',
    resume: "Payer pour acquérir des utilisateurs : Search Ads, Meta, Google Ads.",
    role:
      "La publicité d'acquisition achète des installations : Apple Search Ads affiche l'app en " +
      "tête des recherches App Store, Meta (Facebook/Instagram) et Google App Campaigns diffusent " +
      "des annonces vers les profils les plus susceptibles d'installer.",
    concepts: [
      { terme: 'CPI', def: "Coût par installation — la métrique reine. De 0,5 € à plusieurs euros selon marché et ciblage." },
      { terme: 'LTV vs CAC', def: "La valeur d'un utilisateur (LTV) doit dépasser son coût d'acquisition (CAC), sinon on perd de l'argent en accélérant." },
      { terme: 'Apple Search Ads Basic', def: "Le format le plus simple : on paie à l'installation, Apple gère tout — bon premier test avec 100–200 €." },
    ],
    cout: "Budget libre — commencer petit (5–10 €/jour) et mesurer avant d'augmenter.",
    quand: "Quand l'app convertit et retient déjà bien (sinon on paie pour remplir un panier percé).",
    alternatives: "Croissance organique (ASO, réseaux sociaux, presse) — plus lente mais gratuite.",
    consigner: [
      "Canaux testés, budgets, CPI obtenus",
      "Campagnes actives et audiences ciblées",
      "LTV estimée pour cadrer le CPI maximal acceptable",
    ],
  },
  {
    id: 'reseaux-sociaux',
    nom: 'Réseaux sociaux & influenceurs',
    emoji: '📣',
    categorie: 'Marketing & lancement',
    badge: 'gratuit',
    resume: "Construire une audience organique et activer des relais de confiance.",
    role:
      "Les réseaux sociaux (TikTok, Instagram, YouTube, Facebook…) font connaître l'app " +
      "gratuitement : contenus montrant l'app en action, coulisses du développement (build in " +
      "public), et partenariats avec des influenceurs de la niche qui la recommandent.",
    concepts: [
      { terme: 'Contenu natif', def: "Des vidéos courtes qui apportent de la valeur (astuces, démos) plutôt que de la pub — l'algorithme fait le reste." },
      { terme: 'Micro-influenceurs', def: "1 000–50 000 abonnés dans la niche : plus accessibles, audience plus engagée, souvent contre un accès gratuit ou un petit forfait." },
      { terme: 'Build in public', def: "Partager l'avancement du développement — crée une communauté avant même la sortie." },
      { terme: 'UGC', def: "Contenu créé par les utilisateurs eux-mêmes — le plus crédible ; à encourager et republier." },
    ],
    cout: "Gratuit (temps) ; micro-influenceurs : de la gratuité au forfait négocié.",
    quand: "Dès avant le lancement (teasing), puis en continu — régularité > volume.",
    alternatives: "Communautés existantes (groupes Facebook, forums, Reddit) où participer honnêtement.",
    consigner: [
      "Comptes de l'app (liens) et rythme de publication",
      "Influenceurs contactés / partenariats et résultats",
      "Formats qui marchent (à répéter)",
    ],
  },
  {
    id: 'newsletter',
    nom: 'Newsletter (e-mail marketing)',
    emoji: '💌',
    categorie: 'Marketing & lancement',
    badge: 'optionnel',
    resume: "Le canal direct que personne ne peut vous retirer : l'e-mail.",
    role:
      "Une newsletter garde le contact avec les utilisateurs et prospects sans dépendre d'un " +
      "algorithme : annonces de versions, conseils d'usage, contenus de la niche. Une liste " +
      "e-mail se construit tôt (page d'attente avant le lancement) et se garde à vie.",
    concepts: [
      { terme: 'Liste de lancement', def: "Collecter des e-mails AVANT la sortie (« préviens-moi ») pour frapper fort le jour J." },
      { terme: 'Double opt-in & RGPD', def: "Confirmation par e-mail + désinscription facile : obligatoire en Europe." },
      { terme: "Taux d'ouverture", def: "≈ 30–40 % sur une petite liste engagée — imbattable comparé à la portée organique des réseaux." },
    ],
    cout: "Gratuit jusqu'à ~1 000 abonnés (Brevo, MailerLite, Buttondown…).",
    quand: "Dès la page d'attente pré-lancement, puis 1–2 envois/mois.",
    alternatives: "Notifications push (plus intrusives), communauté (Discord, WhatsApp).",
    consigner: [
      "Outil utilisé et taille de la liste",
      "Formulaires de collecte (où ?) et fréquence d'envoi",
      "Taux d'ouverture/clic moyens",
    ],
  },
  {
    id: 'presse-lancement',
    nom: 'Presse & lancement (Product Hunt, médias)',
    emoji: '🚀',
    categorie: 'Marketing & lancement',
    badge: 'gratuit',
    resume: "Orchestrer la sortie : Product Hunt, presse spécialisée, communautés.",
    role:
      "Un lancement réussi concentre l'attention sur quelques jours : fiche Product Hunt, e-mails " +
      "aux journalistes et blogs de la niche (avec un press kit propre), posts dans les " +
      "communautés pertinentes — pour générer un pic de téléchargements et des retombées durables (liens, SEO).",
    concepts: [
      { terme: 'Press kit', def: "Une page avec logo, captures, description courte/longue, contact — tout ce qu'un journaliste doit pouvoir copier en 2 minutes." },
      { terme: 'Product Hunt', def: "La vitrine mondiale des nouveaux produits tech — un bon rang y apporte visibilité et premiers utilisateurs." },
      { terme: 'Embargo', def: "Proposer l'info aux médias avant la sortie, publiable le jour J — tout le monde en parle en même temps." },
      { terme: 'Featuring stores', def: "On peut se signaler aux équipes éditoriales d'Apple/Google (formulaire dédié) pour espérer une mise en avant." },
    ],
    cout: "Gratuit (temps de préparation).",
    quand: "À la v1 publique, et aux grosses versions (une v2 majeure se relance).",
    alternatives: "Lancement discret (soft launch) pour roder l'app avant le vrai lancement.",
    consigner: [
      "Date de lancement et canaux activés",
      "Press kit (lien), médias contactés, retombées",
      "Résultats chiffrés du pic de lancement",
    ],
  },

  // ── Notifications push ─────────────────────────────────────────────────────
  {
    id: 'fcm',
    nom: 'Notifications push (FCM + APNs)',
    emoji: '🔔',
    categorie: 'Notifications push',
    badge: 'gratuit',
    resume: "Envoyer des notifications aux appareils, même app fermée.",
    role:
      "Les notifications push passent par les serveurs des plateformes : APNs chez Apple, FCM " +
      "chez Google (FCM peut d'ailleurs servir de passerelle unique vers les deux). On les " +
      "utilise pour les rappels, les alertes et la ré-activation — avec parcimonie.",
    concepts: [
      { terme: "Token d'appareil", def: "L'adresse unique d'un appareil pour le push — collectée par l'app et stockée côté backend." },
      { terme: 'Clé APNs (.p8)', def: "La clé qui autorise l'envoi vers les appareils Apple — un SECRET à garder côté serveur (Supabase/FCM), jamais dans un dépôt." },
      { terme: 'Permission', def: "L'utilisateur doit accepter les notifications — demander au bon moment (pas au premier écran) avec un pré-écran expliquant l'intérêt." },
      { terme: 'Push silencieux', def: "Notification invisible qui réveille l'app pour rafraîchir des données." },
    ],
    cout: "Gratuit, sans limite de volume.",
    quand: "Dès que l'app a une raison légitime de rappeler l'utilisateur (rappel d'arrosage, alerte météo…).",
    alternatives: "OneSignal (console marketing au-dessus du push), notifications locales (programmées dans l'app, sans serveur).",
    consigner: [
      "Passerelle utilisée (FCM seul ? APNs direct ?)",
      "Où est stockée la clé APNs (nom du coffre/console, pas la clé)",
      "Types de notifications envoyées et déclencheurs",
    ],
  },

  // ── Analytics ──────────────────────────────────────────────────────────────
  {
    id: 'analytics',
    nom: "Analytics (mesure d'usage)",
    emoji: '📈',
    categorie: 'Analytics',
    badge: 'gratuit',
    resume: "Savoir combien d'utilisateurs, quels écrans, quelle rétention.",
    role:
      "L'analytics mesure l'usage réel : utilisateurs actifs (DAU/MAU), écrans vus, événements " +
      "clés (inscription, achat…), rétention par cohorte. Sans mesure, impossible de savoir si " +
      "une version ou une campagne a marché.",
    concepts: [
      { terme: 'Événement', def: "Une action nommée envoyée par l'app (ex. recolte_ajoutee) avec des propriétés — à définir en petit nombre et documenter." },
      { terme: 'Rétention', def: "% d'utilisateurs qui reviennent à J+1, J+7, J+30 — LA métrique de santé d'une app." },
      { terme: 'Cohorte', def: "Groupe d'utilisateurs arrivés en même temps, qu'on suit dans le temps pour comparer les versions." },
      { terme: 'Respect de la vie privée', def: "Des outils comme TelemetryDeck ou Plausible mesurent sans identifier les personnes — simplifie la conformité (et l'App Privacy)." },
    ],
    cout: "Gratuit : Firebase Analytics (complet), TelemetryDeck (offre gratuite), consoles des stores (basique).",
    quand: "Dès la v1 — les données de la première semaine sont précieuses et irrécupérables.",
    alternatives: "Amplitude/Mixpanel (puissants, gratuits au début), ou juste les stats des stores pour commencer.",
    consigner: [
      "Outil choisi et identifiant du projet",
      "Liste des événements traqués (le « plan de taggage »)",
      "KPIs suivis et où les lire",
    ],
  },

  // ── Cartes & géolocalisation ───────────────────────────────────────────────
  {
    id: 'cartes',
    nom: 'Cartes (MapKit / Google Maps / Mapbox)',
    emoji: '🗺️',
    categorie: 'Cartes & géolocalisation',
    badge: 'gratuit',
    resume: "Afficher des cartes, des marqueurs, des itinéraires dans l'app.",
    role:
      "Les SDK cartographiques affichent des fonds de carte interactifs avec marqueurs, tracés et " +
      "calculs d'itinéraires. Sur iOS, MapKit est gratuit et natif ; Google Maps et Mapbox offrent " +
      "plus d'options de style et le multi-plateforme.",
    concepts: [
      { terme: 'MapKit', def: "La carte native Apple : gratuite, sans clé d'API, intégration SwiftUI directe — le choix par défaut sur iOS." },
      { terme: 'Tuiles', def: "La carte est découpée en images chargées à la volée — la facturation des services payants se fait souvent au chargement de carte." },
      { terme: 'Géocodage', def: "Adresse → coordonnées (et l'inverse). Inclus dans MapKit ; quotas chez Google/Mapbox." },
      { terme: 'Clustering', def: "Regrouper les marqueurs proches quand on dézoome — indispensable au-delà de quelques dizaines de points." },
    ],
    cout: "MapKit : gratuit. Google Maps / Mapbox : crédits gratuits mensuels puis paiement à l'usage.",
    quand: "Dès que l'app montre des lieux (parcelles, points d'intérêt, itinéraires).",
    alternatives: "OpenStreetMap via MapLibre (open source, gratuit, à héberger ou via fournisseur).",
    consigner: [
      "SDK choisi et pourquoi",
      "Si payant : nom de la variable de clé et quotas",
      "Fonctions utilisées (marqueurs, itinéraires, géocodage…)",
    ],
  },
  {
    id: 'geolocalisation',
    nom: 'Géolocalisation native',
    emoji: '📍',
    categorie: 'Cartes & géolocalisation',
    badge: 'gratuit',
    resume: "Obtenir la position de l'utilisateur via le GPS de l'appareil.",
    role:
      "Les APIs natives (Core Location sur iOS, Fused Location sur Android) donnent la position " +
      "de l'appareil avec la précision choisie. Tout tourne autour de la permission : ne demander " +
      "que le niveau nécessaire, au moment où l'utilisateur comprend pourquoi.",
    concepts: [
      { terme: "« Pendant l'utilisation » vs « Toujours »", def: "Deux niveaux de permission — « Toujours » (arrière-plan) est plus dur à obtenir et à justifier en review." },
      { terme: 'Précision', def: "Du kilomètre (économe) au mètre (GPS plein) — choisir selon le besoin pour préserver la batterie." },
      { terme: 'Geofencing', def: "Déclencher une action à l'entrée/sortie d'une zone (ex. rappel en arrivant au jardin)." },
      { terme: "Chaîne d'explication", def: "Le texte de la popup de permission (InfoPlist) doit expliquer concrètement l'usage — Apple le vérifie." },
    ],
    cout: "Gratuit (API système).",
    quand: "Quand la position apporte un vrai service (météo locale, lieux proches, suivi de parcelles).",
    alternatives: "Saisie manuelle d'un lieu / code postal (moins de friction de permission).",
    consigner: [
      "Niveau de permission demandé et justification",
      "Textes des popups de permission",
      "Usages de la position dans l'app",
    ],
  },

  // ── Communication ──────────────────────────────────────────────────────────
  {
    id: 'email-transactionnel',
    nom: 'E-mail transactionnel (Resend / Brevo / Postmark)',
    emoji: '📧',
    categorie: 'Communication',
    badge: 'optionnel',
    resume: "Les e-mails automatiques : confirmation, magic link, reçus…",
    role:
      "L'e-mail transactionnel est envoyé par le système à un utilisateur précis (confirmation " +
      "d'inscription, lien de connexion, reçu d'achat, alerte). Un service dédié garantit la " +
      "délivrabilité (arriver en boîte de réception, pas en spam).",
    concepts: [
      { terme: 'Transactionnel vs marketing', def: "Deux circuits séparés : le transactionnel (1 destinataire, déclenché par une action) ne doit pas être pollué par la réputation des envois en masse." },
      { terme: 'SPF / DKIM / DMARC', def: "Trois enregistrements DNS qui prouvent que vous avez le droit d'envoyer depuis votre domaine — indispensables à la délivrabilité." },
      { terme: 'Templates', def: "Modèles d'e-mails avec variables, gérés dans le service ou dans le code." },
    ],
    cout: "Gratuit pour de petits volumes (Resend : 3 000/mois, Brevo : 300/jour).",
    quand: "Dès qu'il y a des comptes utilisateurs (Supabase peut déléguer ses e-mails d'auth à un SMTP dédié).",
    alternatives: "SMTP intégré de Supabase (limité, pour tester), Amazon SES (très bon marché, plus technique).",
    consigner: [
      "Service choisi, domaine d'envoi, DNS configurés (SPF/DKIM)",
      "Nom de la variable de clé API",
      "Liste des e-mails automatiques envoyés",
    ],
  },
  {
    id: 'sms-whatsapp',
    nom: 'SMS / WhatsApp (Twilio & co)',
    emoji: '💬',
    categorie: 'Communication',
    badge: 'optionnel',
    resume: "Toucher l'utilisateur par SMS ou WhatsApp : codes, alertes, échanges.",
    role:
      "Les APIs SMS/WhatsApp (Twilio, Vonage, l'API WhatsApp Business…) envoient des messages là " +
      "où l'e-mail ne suffit pas : codes de vérification (OTP), alertes urgentes, et conversation " +
      "client sur WhatsApp — canal dominant dans beaucoup de pays.",
    concepts: [
      { terme: 'OTP par SMS', def: "Le code à 6 chiffres de vérification du numéro — simple pour l'utilisateur, mais chaque SMS coûte." },
      { terme: 'WhatsApp Business API', def: "Messages via WhatsApp avec modèles pré-approuvés ; conversation gratuite quand c'est le client qui écrit en premier (fenêtre de 24 h)." },
      { terme: 'Sender ID', def: "Le nom d'expéditeur affiché — soumis à des règles par pays." },
    ],
    cout: "À l'usage : ≈ 0,05–0,15 € par SMS selon pays ; WhatsApp par conversation.",
    quand: "Vérification de numéro, alertes critiques, ou support là où WhatsApp est le canal naturel.",
    alternatives: "Push (gratuit) quand l'app est installée, e-mail, connexion sans numéro.",
    consigner: [
      "Fournisseur et numéros/expéditeurs utilisés",
      "Types de messages et modèles WhatsApp approuvés",
      "Coût mensuel estimé",
    ],
  },
  {
    id: 'support-client',
    nom: 'Support client',
    emoji: '🛟',
    categorie: 'Communication',
    badge: 'optionnel',
    resume: "Recueillir et traiter les demandes des utilisateurs.",
    role:
      "Le support commence simple : une adresse e-mail dédiée et une page FAQ suffisent au début. " +
      "L'important est le circuit : que les demandes arrivent, soient traitées, et nourrissent la " +
      "feuille de route. Les stores exigent une URL de support sur la fiche.",
    concepts: [
      { terme: 'URL de support', def: "Obligatoire sur l'App Store et le Play Store — une simple page avec FAQ + moyen de contact suffit." },
      { terme: 'Formulaire in-app', def: "Un écran « Nous contacter » qui joint automatiquement version de l'app et modèle d'appareil — divise le temps de diagnostic par deux." },
      { terme: 'Boucle de feedback', def: "Étiqueter les demandes (bug, idée, question) et les relier aux issues GitHub." },
    ],
    cout: "Gratuit au début (e-mail + FAQ) ; outils dédiés (Crisp, Zendesk) payants plus tard.",
    quand: "Obligatoire (URL) dès la première soumission ; formaliser quand le volume monte.",
    alternatives: "Communauté d'entraide (Discord, groupe WhatsApp), FAQ seule.",
    consigner: [
      "Adresse de support et URL de la page support",
      "Canal de traitement (boîte mail, outil) et délai visé",
      "FAQ à jour (lien)",
    ],
  },

  // ── IA ─────────────────────────────────────────────────────────────────────
  {
    id: 'api-ia',
    nom: "API d'IA (Claude / OpenAI / Gemini)",
    emoji: '🤖',
    categorie: 'IA',
    badge: 'optionnel',
    resume: "Intégrer un modèle de langage ou de vision dans l'app.",
    role:
      "Les APIs d'IA ajoutent des capacités impossibles à coder à la main : répondre à des " +
      "questions, analyser une photo (ex. reconnaître une plante ou une maladie), résumer, " +
      "traduire, générer du texte. On paie au volume de tokens.",
    concepts: [
      { terme: 'Token', def: "L'unité de facturation (~¾ de mot). Un appel = tokens d'entrée (prompt) + tokens de sortie (réponse)." },
      { terme: 'Proxy serveur OBLIGATOIRE', def: "La clé API ne doit JAMAIS être dans l'app (extractible) : les appels passent par une Edge Function qui porte la clé et impose des quotas par utilisateur." },
      { terme: 'Prompt système', def: "Les instructions fixes qui cadrent le modèle (rôle, ton, format de réponse) — versionnées dans le dépôt." },
      { terme: 'Choix du modèle', def: "Petit modèle rapide et pas cher pour les tâches simples, gros modèle pour le raisonnement — le coût varie d'un facteur 10-100." },
    ],
    cout: "À l'usage (par million de tokens). Un usage modéré se chiffre en quelques €/mois ; à plafonner par utilisateur.",
    quand: "Quand une fonctionnalité IA apporte une vraie valeur différenciante — souvent la brique « magique » qui justifie un abonnement.",
    alternatives: "Modèles embarqués sur l'appareil (Core ML, Apple Intelligence, Gemini Nano) : gratuits et privés mais moins capables.",
    consigner: [
      "Fournisseur et modèles utilisés (et pour quelles fonctions)",
      "Nom de la variable de clé et fonction serveur qui la porte",
      "Quotas par utilisateur et coût mensuel observé",
    ],
  },

  // ── Stockage & médias ──────────────────────────────────────────────────────
  {
    id: 'stockage-cdn',
    nom: 'Stockage & CDN (Supabase Storage / S3 / Cloudinary)',
    emoji: '🗄️',
    categorie: 'Stockage & médias',
    badge: 'optionnel',
    resume: "Héberger les fichiers des utilisateurs : photos, documents, médias.",
    role:
      "Dès que les utilisateurs envoient des photos ou fichiers, il faut un stockage objet : " +
      "Supabase Storage (intégré au backend), Amazon S3 / Cloudflare R2 (bruts), ou Cloudinary " +
      "(qui redimensionne et optimise les images à la volée). Un CDN sert les fichiers vite partout.",
    concepts: [
      { terme: 'Bucket', def: "Un « seau » de fichiers avec ses règles d'accès (public / privé par utilisateur)." },
      { terme: 'URL signée', def: "Lien temporaire vers un fichier privé — la bonne façon de servir les contenus personnels." },
      { terme: "Transformation d'images", def: "Générer miniatures et formats modernes (WebP/AVIF) à la volée — ce que fait Cloudinary, ou Supabase en option." },
      { terme: 'CDN', def: "Réseau de serveurs qui met les fichiers en cache près des utilisateurs — vitesse et coût réduits." },
    ],
    cout: "Supabase : 1 Go inclus. Cloudinary : offre gratuite correcte. R2/S3 : centimes par Go.",
    quand: "Dès que l'app manipule des photos utilisateur (éviter de les stocker en base de données).",
    alternatives: "Stockage local sur l'appareil + iCloud/Google Drive de l'utilisateur (zéro coût serveur).",
    consigner: [
      "Service, buckets et règles d'accès",
      "Politique de taille/format des uploads",
      "Volume stocké et coût mensuel",
    ],
  },
];

module.exports = { CATEGORIES, SERVICES };
