//const API_ENDPOINT = `${location.protocol}//stats.api.generative.fm/v1/global/playtime`;
const API_ENDPOINT = `http://localhost:8080/api/playtime`;
const CACHE_NAME = 'stats';
const IS_CACHE_SUPPORTED = Boolean(window.caches);

const fetchPlayTime = async () => {
  if (!IS_CACHE_SUPPORTED) {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
      return {};
    }
    return response.json();
  }
  const cache = await window.caches.open(CACHE_NAME);
  try {
    await cache.add(API_ENDPOINT);
  } catch (error) {
    // ignore
  }
  const response = await cache.match(API_ENDPOINT);
  if (!response) {
    return {};
  }
  return response.json();
};

export default fetchPlayTime;
