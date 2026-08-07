// Service worker « Gestion Pro » — mode hors-ligne.
//
// Stratégie : stale-while-revalidate sur les ressources de l'app et le CDN
// SheetJS. On répond depuis le cache (instantané, marche sans réseau) tout en
// re-téléchargeant en arrière-plan — la version fraîche sera servie au
// prochain chargement, donc les déploiements se propagent tout seuls.
//
// JAMAIS mis en cache : Supabase (données vivantes), l'API Claude et Google
// Identity (auth) — toute requête hors liste part directement sur le réseau.
'use strict';

const CACHE = 'gestion-pro-v1';
const SHELL = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './dash-module.js',
  './assets/dash-data.js',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/icon-180.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      // addAll échoue en bloc si UN fichier manque — on tolère les absents
      // (ex : icônes pas encore déployées) pour ne pas casser l'installation.
      .then((c) => Promise.allSettled(SHELL.map((u) => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const cacheable = url.origin === self.location.origin || url.hostname === 'cdn.jsdelivr.net';
  if (!cacheable) return;

  e.respondWith(
    caches.match(req).then((cached) => {
      const refresh = fetch(req).then((res) => {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || refresh;
    })
  );
});
