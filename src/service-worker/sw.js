const ASSET_CACHE_NAME = '@generative.fm/play/assets';
const FONT_CACHE_NAME = '@generative.fm/play/fonts';
const FONT_STYLESHEET_URL =
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap';

const STATIC_FONT_URL = /url\((https:\/\/fonts.gstatic.com[^)\s]+)\)/g;

//eslint-disable-next-line no-undef
const assetPaths = __WEBPACK_ASSETS__
  .filter((filename) => filename !== 'sw.js')
  .concat([''])
  .map((path) => [self.location.origin, path].join('/'));

const assetPathSet = new Set(assetPaths);

const cacheFonts = () =>
  caches
    .open(FONT_CACHE_NAME)
    .then((cache) => {
      Promise.all([
        cache.keys(),
        cache
          .add(FONT_STYLESHEET_URL)
          .then(() => cache.match(FONT_STYLESHEET_URL))
          .then((response) => response.text())
          .then((content) =>
            Array.from(content.matchAll(STATIC_FONT_URL)).map(([, url]) => url)
          ),
      ]).then(([storedRequests, staticFontUrls]) => {
        const storedFontUrlSet = new Set(storedRequests.map(({ url }) => url));
        const newFontUrls = staticFontUrls.filter(
          (url) => !storedFontUrlSet.has(url)
        );
        if (newFontUrls.length === 0) {
          return;
        }
        return cache.addAll(newFontUrls);
      });
    })
    .catch((err) => {
      console.error(err);
      return;
    });

const cacheAssets = () =>
  caches.open(ASSET_CACHE_NAME).then((cache) =>
    cache.keys().then((storedRequests) => {
      const storedUrlSet = new Set(storedRequests.map(({ url }) => url));
      const newAssets = assetPaths.filter(
        (url) => !storedUrlSet.has(url) || url === `${self.location.origin}/`
      );
      return cache.addAll(newAssets);
    })
  );

self.addEventListener('install', (event) => {
  event.waitUntil(Promise.all([cacheAssets(), cacheFonts()]));
});

const CACHED_ORIGINS = [
  self.location.origin,
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
];

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(caches.match('/'));
    return;
  }
  if (
    event.request.method !== 'GET' ||
    CACHED_ORIGINS.every((origin) => !event.request.url.startsWith(origin))
  ) {
    return;
  }
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
        return Promise.all(
          storedRequests
            .filter((cachedRequest) => !assetPathSet.has(cachedRequest.url))
            .map((request) => cache.delete(request))
        );
      })
    )
  );
});

self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
