const ASSET_CACHE_NAME = 'assets';

const assetPaths = __WEBPACK_ASSETS__
  .filter((filename) => filename !== 'sw.js')
  .concat(['/']);

self.addEventListener('install', (event) => {
  console.log('installing');
  event.waitUntil(
    caches.open(ASSET_CACHE_NAME).then((cache) => cache.addAll(assetPaths))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.open(ASSET_CACHE_NAME).then((cache) =>
      cache.keys().then((storedRequests) => {
        const assetPathSet = new Set(assetPaths);
        storedRequests
          .filter((cachedUrl) => !assetPathSet.has(cachedUrl))
          .forEach((request) => {
            cache.delete(request);
          });
      })
    )
  );
});
