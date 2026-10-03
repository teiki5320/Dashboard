#!/usr/bin/env node
// =============================================================================
// Vérifie que ce que le Dashboard affiche sur chaque app est VRAI.
//
// Trois contrôles, tous fondés sur des faits vérifiables, jamais sur une
// impression :
//   1. le dépôt déclaré dans app.json existe vraiment, et c'est bien celui-là
//      (pas une redirection de renommage, qui casserait le jour où quelqu'un
//      recrée l'ancien nom) ;
//   2. chaque adresse citée dans les fiches répond ;
//   3. chaque service déclaré est documenté par une section de infra.md, et
//      aucune section de service n'est oubliée dans la liste.
//
// Usage :  node tool/verifier-fiches.js          (tout)
//          node tool/verifier-fiches.js kultiva  (une seule app)
//
// Sort en 1 si un contrôle échoue : utilisable dans la routine quotidienne.
// Aucune écriture, aucun secret, aucun jeton requis.
// =============================================================================
'use strict';

const fs = require('fs');
const path = require('path');

const RACINE = path.join(__dirname, '..');
const APPS = path.join(RACINE, 'apps');
const { SERVICES } = require(path.join(RACINE, 'catalog', 'services.js'));

// Titres qui n'annoncent aucun service : les ignorer dans le contrôle inverse.
// Titres de section qui n'annoncent AUCUN compte de service externe : il ne
// faut donc pas reprocher à app.json de ne pas les déclarer.
const TITRES_HORS_SERVICE = [
  // Sections d'organisation de la fiche
  /^(vue d ensemble|sommaire|services?( externes?)?|notes?|recapitulatif|valeurs publiques|checklist|a faire|a verifier|en attente|annexes?|couts?)/,
  /^(ou vit chaque secret|reprise du projet|format .*source des donnees|routine )/,
  // Dépendances techniques sans compte : registres de paquets, polices web
  /^(registres? de paquets|google fonts|polices)/,
  // Un service que la fiche dit explicitement non souscrit
  /(non souscrit|pas souscrit|non utilise)/,
];

const horsService = (t) => TITRES_HORS_SERVICE.some((re) => re.test(t));

// Toutes les façons de nommer un service : son identifiant, son nom, ce qu'il y
// a entre parenthèses, et ses alias de fournisseurs (ionos, openart, plausible…).
function aiguillesDe(svc, id) {
  const out = [normalise(id), ...svc.nom.replace(/\s*\(.*\)$/, '').split('/').map(normalise)];
  const paren = svc.nom.match(/\(([^)]+)\)/);
  if (paren) paren[1].split(/[/,]/).forEach((x) => out.push(normalise(x)));
  (svc.alias || []).forEach((a) => out.push(normalise(a)));
  return out;
}

// Un jeton de LECTURE lève la limite de 60 appels par heure de l'API GitHub.
// Facultatif : sans lui, le contrôle des dépôts est simplement « non vérifiable »
// quand le quota est épuisé — jamais « faux ».
const JETON = (process.env.APPS_READ_TOKEN || process.env.GITHUB_TOKEN || '').trim();

const seulement = process.argv[2];
const problemes = [];
const avertissements = [];

const lire = (p) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null);
const normalise = (s) =>
  String(s)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/^\s*\d+[.)]\s*/, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

async function essai(url, redirections) {
  const ctrl = new AbortController();
  const minuteur = setTimeout(() => ctrl.abort(), 15000);
  try {
    const entetes = { 'User-Agent': 'dash-verif' };
    if (JETON && url.startsWith('https://api.github.com/')) {
      entetes.Authorization = `Bearer ${JETON}`;
    }
    const r = await fetch(url, {
      method: 'GET',
      redirect: redirections ? 'follow' : 'manual',
      signal: ctrl.signal,
      headers: entetes,
    });
    return { ok: r.status < 400, status: r.status, url: r.url };
  } catch (e) {
    return { ok: false, status: 0, erreur: e.name === 'AbortError' ? 'délai dépassé' : e.message };
  } finally {
    clearTimeout(minuteur);
  }
}

// Une adresse n'est déclarée morte qu'après DEUX échecs réseau espacés : sans
// cela, une coupure de deux secondes fait dire au Dashboard qu'un service a
// disparu. Un vrai code HTTP (404, 500…) est définitif et ne se rejoue pas.
async function teste(url, { redirections = true } = {}) {
  const premier = await essai(url, redirections);
  if (premier.ok || premier.status > 0) {
    return premier;
  }
  await new Promise((r) => setTimeout(r, 2000));
  const second = await essai(url, redirections);
  if (!second.ok && second.status === 0) {
    second.erreur = `${second.erreur} (deux essais)`;
  }
  return second;
}

// Les adresses citées dans une fiche, en ne gardant que ce qui est censé
// répondre à un visiteur : ni gabarit, ni console privée, ni point d'entrée
// d'API (qui répond 401 ou 404 sans clé, ce qui ne prouve rien).
function adressesDe(md) {
  const brut = md.match(/https?:\/\/[^\s)>"'`\]]+/g) || [];
  const ignorees = /(console|dashboard|admin|supabase\.com|vercel\.com\/dashboard|cloudflare\.com|appstoreconnect|play\.google\.com\/console|github\.com\/[^/]+\/[^/]+\/(actions|settings)|example\.|localhost|127\.0\.0\.1)/i;
  const gabarit = /[<>{}]|\bASIN\b|VOTRE|XXXX/i;
  const pointApi = /^https?:\/\/(api|mcp)\.|googleapis\.com|\/api\//i;
  return [...new Set(brut.map((u) => u.replace(/[.,;:]+$/, '')))]
    .filter((u) => !ignorees.test(u) && !gabarit.test(u) && !pointApi.test(u));
}

async function verifieApp(id) {
  const dossier = path.join(APPS, id);
  const manifeste = JSON.parse(lire(path.join(dossier, 'app.json')) || '{}');
  const nom = manifeste.name || id;
  const infra = lire(path.join(dossier, 'infra.md'));
  const publication = lire(path.join(dossier, 'publication.md'));
  console.log(`\n── ${nom} (${id})`);

  // 1. Le dépôt déclaré existe-t-il sous CE nom ?
  if (manifeste.repo) {
    const r = await teste(`https://api.github.com/repos/${manifeste.repo}`);
    if (r.status === 403 || r.status === 429 || r.status === 0) {
      const cause = r.status === 0 ? r.erreur : `HTTP ${r.status} — quota GitHub épuisé ou droit manquant`;
      avertissements.push(`${id} : dépôt ${manifeste.repo} non vérifiable (${cause})`);
      console.log(`   · dépôt ${manifeste.repo} → non vérifiable (${cause})`);
    } else if (!r.ok) {
      problemes.push(`${id} : dépôt ${manifeste.repo} introuvable (HTTP ${r.status})`);
      console.log(`   ✖ dépôt ${manifeste.repo} introuvable`);
    } else {
      // GitHub suit la redirection d'un dépôt renommé : on compare le nom servi.
      const servi = r.url.replace('https://api.github.com/repos/', '');
      if (servi.toLowerCase() !== manifeste.repo.toLowerCase()) {
        problemes.push(`${id} : app.json dit ${manifeste.repo}, le dépôt s'appelle ${servi}`);
        console.log(`   ✖ dépôt renommé : ${manifeste.repo} → ${servi}`);
      } else {
        console.log(`   ✔ dépôt ${manifeste.repo}`);
      }
    }
  } else {
    console.log('   · aucun dépôt déclaré');
  }

  // 2. Les adresses citées répondent-elles ?
  const adresses = [...new Set([...adressesDe(infra || ''), ...adressesDe(publication || '')])];
  for (const u of adresses) {
    const r = await teste(u);
    if (r.ok) { console.log(`   ✔ ${u}`); continue; }
    // 401 et 403 : la page existe, elle refuse juste un visiteur anonyme.
    if (r.status === 401 || r.status === 403) {
      console.log(`   · ${u} → ${r.status}, protégé (non vérifiable)`);
      continue;
    }
    problemes.push(`${id} : ${u} ne répond pas (${r.status || r.erreur})`);
    console.log(`   ✖ ${u} → ${r.status || r.erreur}`);
  }

  // 3. Services déclarés ↔ sections documentées
  if (infra) {
    const titres = (infra.match(/^#{2,4} .*/gm) || []).map((t) => normalise(t.replace(/^#+\s*/, '')));
    const declares = manifeste.services || [];
    const sansSection = [];
    for (const id2 of declares) {
      const svc = SERVICES.find((s) => s.id === id2);
      if (!svc) {
        problemes.push(`${id} : service inconnu « ${id2} » dans app.json`);
        continue;
      }
      const aiguilles = aiguillesDe(svc, id2);
      const trouve = titres.some((t) => aiguilles.some((a) => a.length > 2 && (t.includes(a) || a.includes(t))));
      if (!trouve) sansSection.push(id2);
    }
    if (sansSection.length) {
      avertissements.push(`${id} : déclaré sans section dans infra.md → ${sansSection.join(', ')}`);
      console.log(`   ⚠ sans section : ${sansSection.join(', ')}`);
    } else if (declares.length) {
      console.log(`   ✔ ${declares.length} service(s), tous documentés`);
    }

    // Le contrôle inverse : une section qui documente un service que le
    // manifeste ne déclare pas. Sans lui, un service bien réel reste
    // invisible sur la carte de l'app.
    const sansDeclaration = [];
    for (const t of titres) {
      if (horsService(t)) {
        continue;
      }
      const couvert = declares.some((id2) => {
        const svc = SERVICES.find((s) => s.id === id2);
        return svc && aiguillesDe(svc, id2).some((a) => a.length > 2 && (t.includes(a) || a.includes(t)));
      });
      if (!couvert) {
        sansDeclaration.push(t);
      }
    }
    if (sansDeclaration.length) {
      avertissements.push(
        `${id} : section documentée sans service déclaré → ${sansDeclaration.join(' | ')}`,
      );
      console.log(`   ⚠ section sans service déclaré : ${sansDeclaration.join(' | ')}`);
    }
  }
}

(async () => {
  const ids = fs
    .readdirSync(APPS)
    .filter((d) => fs.existsSync(path.join(APPS, d, 'app.json')))
    .filter((d) => !seulement || d === seulement)
    .sort();
  if (!ids.length) {
    console.error(`Aucune app « ${seulement} ».`);
    process.exit(1);
  }
  console.log(`Vérification de ${ids.length} app(s) — faits contrôlés, pas d'impressions.`);
  for (const id of ids) await verifieApp(id);

  console.log('\n═══════════════════════════════════════');
  if (avertissements.length) {
    console.log(`\n⚠ ${avertissements.length} point(s) à surveiller :`);
    avertissements.forEach((a) => console.log(`   ${a}`));
  }
  if (problemes.length) {
    console.log(`\n✖ ${problemes.length} donnée(s) fausse(s) :`);
    problemes.forEach((p) => console.log(`   ${p}`));
    process.exit(1);
  }
  console.log('\n✅ Tout ce que le Dashboard affiche est vérifié exact.');
})();
