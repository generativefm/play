import { useState, useEffect } from 'react';

const IS_CACHE_SUPPORTED = Boolean(window.caches);
const CACHE_NAME = '@generative.fm/play';

const fetchFromNetwork = ({ url }) =>
  fetch(url)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      return null;
    });

const fetchFromNetworkAndCache = ({ url, cachePromise }) =>
  cachePromise.then((cache) =>
    cache
      .add(url)
      .then(() => cache.match(url))
      .then((response) => {
        if (typeof response === 'undefined') {
          return null;
        }
        return response.json();
      })
      .catch((err) => {
        console.error(err);
        return null;
      })
  );

const fetchFromCache = ({ url, cachePromise }) =>
  cachePromise.then((cache) =>
    cache.match(url).then((response) => {
      if (typeof response === 'undefined') {
        return null;
      }
      return response.json();
    })
  );

const useCachedJsonResponse = ({ url, isGreedy = false }) => {
  const [currentJson, setJson] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    if (!IS_CACHE_SUPPORTED) {
      fetchFromNetwork({ url }).then((json) => {
        if (isCancelled || json === null) {
          return;
        }
        setJson(json);
      });
      return;
    }
    const cachePromise = window.caches.open(CACHE_NAME);
    if (isGreedy) {
      let isAlreadyFresh = false;
      fetchFromCache({ url, cachePromise }).then((json) => {
        if (isCancelled || isAlreadyFresh || json === null) {
          return;
        }
        setJson(json);
      });
      fetchFromNetworkAndCache({ url, cachePromise }).then((json) => {
        isAlreadyFresh = true;
        if (isCancelled || json === null) {
          return;
        }
        setJson(json);
      });
      return;
    }
    Promise.all([
      fetchFromCache({ url, cachePromise }),
      fetchFromNetworkAndCache({ url, cachePromise }),
    ])
      .then(([cacheResult, networkResult]) => networkResult || cacheResult)
      .then((json) => {
        if (isCancelled || json === null) {
          return;
        }
        setJson(json);
      });
  }, [url, isGreedy]);

  return currentJson;
};

export default useCachedJsonResponse;
