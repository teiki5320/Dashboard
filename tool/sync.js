#!/usr/bin/env node
// =============================================================================
// Synchronisation PULL : Dash va chercher lui-même les fiches de chaque app.
//
//   node tool/sync.js            → synchronise toutes les apps ayant un "repo"
//   node tool/sync.js kultiva    → synchronise seulement apps/kultiva/
//
// Pour chaque apps/<id>/app.json contenant un champ "repo" (owner/nom),
// le script télécharge depuis ce dépôt GitHub (branche par défaut) :
//   docs/INFRA.md       → apps/<id>/infra.md
//   docs/MARKETING.md   → apps/<id>/marketing.md
//   docs/PUBLICATION.md → apps/<id>/publication.md   (facultative)
// … et interroge l'API GitHub pour deux indicateurs vivants, écrits dans
// apps/<id>/status.json (lu par tool/build.js, affiché par dash-module.js) :
//   - dernière release (tag, date, lien)
//   - dernier run CI/Actions (statut, conclusion, lien)
// "Nombre d'utilisateurs" n'est PAS remonté ici : aucune source de données
// commune aux 4 apps (dépendrait de l'analytics propre à chacune).
//
// Authentification : variable d'environnement APPS_READ_TOKEN (ou GITHUB_TOKEN)
// — un fine-grained PAT en LECTURE SEULE (Contents: Read) sur les dépôts d'apps.
// Sans jeton, seuls les dépôts publics sont accessibles.
//
// ⚠️ SÉCURITÉ : le jeton vit dans les secrets GitHub Actions de Dash ou dans
// l'environnement local — JAMAIS dans un fichier du dépôt.
// Aucune dépendance : utilise le fetch natif de Node (≥ 18).
// =============================================================================
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const APPS_DIR = path.join(ROOT, 'apps');
const TOKEN = process.env.APPS_READ_TOKEN || process.env.GITHUB_TOKEN || '';

// Les fiches peuvent aussi être régénérées CÔTÉ DASHBOARD (Routine quotidienne
// Claude) : la copie du dépôt d'app ne doit donc écraser apps/<id>/*.md que si
// elle a réellement changé depuis la dernière synchro — pas simplement parce
// qu'elle diffère de la version locale. On mémorise pour cela le hachage de la
// dernière version rapatriée de chaque fiche.
const STATE_PATH = path.join(APPS_DIR, '.sync-state.json');
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');

function lireEtat() {
  try {
    return JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  } catch {
    return {};
  }
}

const FILES = [
  { distant: 'docs/INFRA.md', local: 'infra.md' },
  { distant: 'docs/MARKETING.md', local: 'marketing.md' },
  // Facultative : une app sans fiche de publication reste parfaitement valide,
  // le volet correspondant ne s'affiche simplement pas.
  { distant: 'docs/PUBLICATION.md', local: 'publication.md', facultatif: true },
];

async function fetchFile(repo, filePath) {
  const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;
  const headers = {
    Accept: 'application/vnd.github.raw+json',
    'User-Agent': 'dash-sync',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  const res = await fetch(url, { headers });
  if (res.status === 404) return { status: 404 };
  if (res.status === 401 || res.status === 403) {
    return { status: res.status, fatal: true };
  }
  if (!res.ok) return { status: res.status };
  return { status: 200, contenu: await res.text() };
}

async function fetchJson(url) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'dash-sync',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  const res = await fetch(url, { headers });
  if (!res.ok) return null; // 404 (pas de release/run), rate-limit, dépôt privé sans jeton… : silencieux
  return res.json();
}

// Indicateurs vivants : aucune erreur ici ne fait échouer la synchro (contrairement
// aux fiches infra/marketing) — une release ou un run CI absent est un état normal,
// pas une erreur de configuration.
async function fetchStatus(repo) {
  const [release, runs] = await Promise.all([
    fetchJson(`https://api.github.com/repos/${repo}/releases/latest`),
    fetchJson(`https://api.github.com/repos/${repo}/actions/runs?per_page=1`),
  ]);
  const run = runs && Array.isArray(runs.workflow_runs) ? runs.workflow_runs[0] : null;
  return {
    release: release ? { tag: release.tag_name, name: release.name || release.tag_name, publishedAt: release.published_at, url: release.html_url } : null,
    ci: run ? { status: run.status, conclusion: run.conclusion, updatedAt: run.updated_at, url: run.html_url } : null,
    fetchedAt: new Date().toISOString(),
  };
}

// Compare deux statuts en ignorant fetchedAt : évite un commit quotidien pour
// un simple horodatage quand rien n'a réellement changé côté release/CI.
function statusEqual(a, b) {
  if (!a || !b) return a === b;
  const strip = (s) => JSON.stringify({ release: s.release, ci: s.ci });
  return strip(a) === strip(b);
}

async function main() {
  const filtre = process.argv.slice(2);
  if (!fs.existsSync(APPS_DIR)) {
    console.error('🛑 Dossier apps/ introuvable');
    process.exit(1);
  }
  if (!TOKEN) {
    console.log('ℹ️  Pas de jeton (APPS_READ_TOKEN) : seuls les dépôts publics seront lisibles.');
  }

  let modifies = 0;
  let erreursAuth = false;
  const etat = lireEtat();
  let etatModifie = false;

  for (const entry of fs.readdirSync(APPS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const id = entry.name;
    if (filtre.length && !filtre.includes(id)) continue;

    const manifestPath = path.join(APPS_DIR, id, 'app.json');
    if (!fs.existsSync(manifestPath)) continue;
    let manifest;
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch (e) {
      console.warn(`⚠️  apps/${id}/app.json illisible (${e.message}) — ignoré`);
      continue;
    }
    if (!manifest.repo) {
      console.log(`⏭️  ${id} : pas de champ "repo" dans app.json — ignoré`);
      continue;
    }

    console.log(`\n📥 ${id} ← ${manifest.repo}`);
    for (const f of FILES) {
      const r = await fetchFile(manifest.repo, f.distant);
      if (r.fatal) {
        console.error(`   🛑 ${f.distant} : accès refusé (HTTP ${r.status}) — jeton manquant, expiré ou sans droit sur ce dépôt`);
        erreursAuth = true;
        continue;
      }
      if (r.status === 404) {
        if (f.facultatif) console.log(`   ⏭️  ${f.distant} : absent de ${manifest.repo} (facultatif)`);
        else console.warn(`   ⚠️  ${f.distant} : introuvable dans ${manifest.repo} — fichier local conservé`);
        continue;
      }
      if (r.status !== 200) {
        console.warn(`   ⚠️  ${f.distant} : HTTP ${r.status} — fichier local conservé`);
        continue;
      }
      const localPath = path.join(APPS_DIR, id, f.local);
      const avant = fs.existsSync(localPath) ? fs.readFileSync(localPath, 'utf8') : null;
      const cle = `${id}/${f.local}`;
      const hashDistant = sha(r.contenu);
      if (etat[cle] === hashDistant) {
        // La fiche du dépôt d'app n'a pas bougé depuis la dernière synchro :
        // on garde la version locale, même si elle diffère (régénérée ici).
        console.log(`   ✔️  ${f.local} : dépôt d'app inchangé — version locale conservée`);
        continue;
      }
      if (etat[cle] === undefined && avant === r.contenu) {
        // Première synchro avec mémoire : contenu identique, on enregistre juste le hachage.
        etat[cle] = hashDistant;
        etatModifie = true;
        console.log(`   ✔️  ${f.local} : déjà à jour`);
        continue;
      }
      fs.writeFileSync(localPath, r.contenu);
      etat[cle] = hashDistant;
      etatModifie = true;
      console.log(`   ✅ ${f.local} : mis à jour (${(r.contenu.length / 1024).toFixed(1)} Ko)`);
      modifies++;
    }

    try {
      const status = await fetchStatus(manifest.repo);
      const statusPath = path.join(APPS_DIR, id, 'status.json');
      const avantStatus = fs.existsSync(statusPath) ? JSON.parse(fs.readFileSync(statusPath, 'utf8')) : null;
      if (statusEqual(avantStatus, status)) {
        console.log(`   ✔️  status.json : déjà à jour`);
      } else {
        fs.writeFileSync(statusPath, JSON.stringify(status, null, 2) + '\n');
        console.log(`   ✅ status.json : mis à jour (release ${status.release ? status.release.tag : '—'}, CI ${status.ci ? status.ci.conclusion || status.ci.status : '—'})`);
        modifies++;
      }
    } catch (e) {
      console.warn(`   ⚠️  status.json : indicateurs vivants indisponibles (${e.message})`);
    }
  }

  if (etatModifie) {
    fs.writeFileSync(STATE_PATH, JSON.stringify(etat, null, 2) + '\n');
  }

  console.log(`\n${modifies} fichier(s) mis à jour.`);
  if (modifies > 0) {
    console.log('→ Lancer maintenant : node tool/build.js');
  }
  // Une erreur d'authentification fait échouer le job pour être visible dans Actions.
  if (erreursAuth) process.exit(1);
}

main().catch((e) => {
  console.error('🛑 Erreur de synchronisation :', e.message);
  process.exit(1);
});
