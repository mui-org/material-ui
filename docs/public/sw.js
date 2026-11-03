/* global self, caches */

// Unregisters itself and clears the caches left by previous service workers.
// See https://developer.chrome.com/docs/workbox/remove-buggy-service-workers/
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
    })(),
  );
});
