const ASSET_CACHE_NAME = '@generative.fm/play/assets';
const FONT_STYLESHEET_URL =
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap';
const STATIC_FONT_URL_PATTERN = /url\((https:\/\/fonts.gstatic.com[^)\s]+)\)/g;

const getFontAssetUrls = async (cache) => {
  await cache.add(FONT_STYLESHEET_URL);
  const response = await cache.match(FONT_STYLESHEET_URL);
  const content = await response.text();
  const staticFontUrls = Array.from(
    content.matchAll(STATIC_FONT_URL_PATTERN)
  ).map(([, url]) => url);
  return [FONT_STYLESHEET_URL].concat(staticFontUrls);
};

const getAssetRequests = async (cache) => {
  const fontAssetUrls = await getFontAssetUrls(cache);
  //eslint-disable-next-line no-undef
  const ownAssetUrls = __WEBPACK_ASSETS__
    .filter((filename) => filename !== 'sw.js')
    .concat(['']) //root path
    .map((path) => [self.location.origin, path].join('/'));
  return fontAssetUrls.concat(ownAssetUrls).map((url) => new Request(url));
};

const cacheAssets = async () => {
  const cache = await caches.open(ASSET_CACHE_NAME);
  const [assetRequests, storedRequests] = await Promise.all([
    getAssetRequests(cache),
    cache.keys(),
  ]);
  const storedRequestUrls = new Set(storedRequests.map(({ url }) => url));
  const requestsToCache = assetRequests.filter(
    ({ url }) =>
      !storedRequestUrls.has(url) || url === `${self.location.origin}/`
  );
  return cache.addAll(requestsToCache);
};

self.addEventListener('install', (event) => {
  event.waitUntil(cacheAssets());
});

const CACHED_ORIGINS = [
  self.location.origin,
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://www.gstatic.com',
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

const cleanAssets = async () => {
  const cache = await caches.open(ASSET_CACHE_NAME);
  const [assetRequests, storedRequests] = await Promise.all([
    getAssetRequests(cache),
    cache.keys(),
  ]);
  const assetRequestUrlSet = new Set(assetRequests.map(({ url }) => url));
  const requestsToDelete = storedRequests.filter(
    (cachedRequest) => !assetRequestUrlSet.has(cachedRequest.url)
  );
  return Promise.all(
    requestsToDelete.map((cachedRequest) => cache.delete(cachedRequest))
  );
};

const cleanLegacyFontCache = () => caches.delete('@generative.fm/play/fonts');

self.addEventListener('activate', (event) => {
  event.waitUntil(Promise.all([cleanAssets(), cleanLegacyFontCache()]));
});

self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
