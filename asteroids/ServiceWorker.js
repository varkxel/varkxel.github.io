const cacheName = "varkxel-Asteroids-1.0";
const contentToCache = [
    "Build/Asteroids_WebGL.loader.js",
    "Build/82fcf2b853709853e708831cb89028e2.js",
    "Build/cb79f20bf1a03f40eadef66600808885.data",
    "Build/1e1d16c64ae9b4dfcad545f0d48ddad8.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
