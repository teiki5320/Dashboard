#!/usr/bin/env node
// =============================================================================
// Synchronisation PULL : Dash va chercher lui-même les fiches de chaque app.
//
//   node tool/sync.js            → synchronise toutes les apps ayant un "repo"
//   node tool/sync.js kultiva    → synchronise seulement apps/kultiva/
//
// Pour chaque apps/<id>/app.json contenant un champ "repo" (owner/nom),
// le script télécharge depuis ce dépôt GitHub (branche par défaut) :
//   docs/INFRA.md     → apps/<id>/infra.md
//   docs/MARKETING.md → apps/<id>/marketing.md
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

const ROOT = path.join(__dirname, '..');
const APPS_DIR = path.join(ROOT, 'apps');
const TOKEN = process.env.APPS_READ_TOKEN || process.env.GITHUB_TOKEN || '';

const FILES = [
  { distant: 'docs/INFRA.md', local: 'infra.md' },
  { distant: 'docs/MARKETING.md', local: 'marketing.md' },
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
        console.warn(`   ⚠️  ${f.distant} : introuvable dans ${manifest.repo} — fichier local conservé`);
        continue;
      }
      if (r.status !== 200) {
        console.warn(`   ⚠️  ${f.distant} : HTTP ${r.status} — fichier local conservé`);
        continue;
      }
      const localPath = path.join(APPS_DIR, id, f.local);
      const avant = fs.existsSync(localPath) ? fs.readFileSync(localPath, 'utf8') : null;
      if (avant === r.contenu) {
        console.log(`   ✔️  ${f.local} : déjà à jour`);
      } else {
        fs.writeFileSync(localPath, r.contenu);
        console.log(`   ✅ ${f.local} : mis à jour (${(r.contenu.length / 1024).toFixed(1)} Ko)`);
        modifies++;
      }
    }
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
