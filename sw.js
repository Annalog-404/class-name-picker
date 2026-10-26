// Saves the app on the device the first time it opens, so it keeps working without internet.
// Change VERSION whenever any file changes so devices pick up the update.
const VERSION = 'picker-v56';
const FILES = [
  './',
  './index.html',
  './spin.html',
  './groups.html',
  './privacy.html',
  './help.html',
  './lang.js',
  './themes.js',
  './store.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './fonts/andika-400-latin.woff2',
  './fonts/andika-400-latin-ext.woff2',
  './fonts/andika-700-latin.woff2',
  './fonts/andika-700-latin-ext.woff2'
];

self.addEventListener('install', e => {
  // cache: 'reload' skips the browser's own short-term copy, so a new version really gets the new files
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Pages and scripts: ask the website first, so a device never mixes a new page with old scripts;
// use the saved copy when offline or when the internet is too slow to answer.
// Fonts and pictures never change much: saved copy first (fast), refreshed in the background.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  const saved = () => caches.match(req, { ignoreSearch: true });
  const net = fetch(req, { cache: 'no-cache' });
  // keep a copy of what the website sent; waitUntil lets this finish after the page has its answer
  e.waitUntil(net.then(res => {
    if (!res.ok) return;
    const copy = res.clone();   // cloned before the page reads it
    return caches.open(VERSION).then(c => c.put(req, copy));
  }).catch(() => {}));

  if (/\/(fonts|icons)\//.test(url.pathname)) {
    e.respondWith(saved().then(hit => hit || net));
    return;
  }
  const slow = new Promise(r => setTimeout(r, 4000)).then(saved);   // weak internet: don't wait forever
  e.respondWith(
    Promise.race([net, slow]).then(res => res || net)
      .catch(() => saved().then(hit => hit || (req.mode === 'navigate' ? caches.match('./index.html') : Response.error())))
  );
});
