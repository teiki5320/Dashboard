// Service worker « Gestion Pro » — mode hors-ligne.
//
// Deux stratégies, selon ce que le fichier contient.
//
// « Réseau d'abord » pour la coquille de l'app et ses données (index.html,
// script.js, style.css, dash-module.js, assets/dash-data.js) : une
// publication se voit au premier rechargement. Le cache reste le filet —
// hors ligne, ou réseau capricieux, il répond comme avant. Auparavant tout
// passait en stale-while-revalidate, ce qui donnait un tour de retard
// systématique : on voyait la version précédente, et il fallait recharger
// deux fois.
//
// « Cache d'abord, rafraîchi en fond » (stale-while-revalidate) pour le
// reste : icônes, images, CDN SheetJS — des fichiers qui ne changent
// pratiquement jamais et qu'on veut instantanés.
//
// JAMAIS mis en cache : Supabase (données vivantes), l'API Claude et Google
// Identity (auth) — toute requête hors liste part directement sur le réseau.
'use strict';

// ⚠️ Incrémenter à chaque changement de stratégie : « activate » supprime
// alors tous les anciens caches, ce qui force un rechargement complet chez
// les visiteurs qui avaient encore l'ancienne version en réserve.
const CACHE = 'gestion-pro-v2';

// Fichiers dont une version périmée se remarque tout de suite.
const VIVANTS = /(?:^|\/)(?:index\.html|script\.js|style\.css|dash-module\.js|dash-data\.js)$|\/$/;
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

  if (url.origin === self.location.origin && VIVANTS.test(url.pathname)) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

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
