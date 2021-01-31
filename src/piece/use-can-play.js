import { useState, useEffect } from 'react';
import { byId } from '@generative-music/pieces-alex-bainter';
import sampleLibrary from '../playback/sample-library';

const cache = new Map();
const checksInProgress = new Map();

window.addEventListener('offline', () => {
  cache.clear();
  checksInProgress.clear();
});
window.addEventListener('online', () => {
  cache.clear();
  checksInProgress.clear();
});

const useCanPlay = (pieceId) => {
  const [canPlay, setCanPlay] = useState(
    cache.has(pieceId) ? cache.get(pieceId) : true
  );
  useEffect(() => {
    let isCancelled = false;
    const getResultFromPromise = (promise) =>
      promise.then((result) => {
        if (isCancelled || checksInProgress.get(pieceId) !== promise) {
          if (checksInProgress.get(pieceId) === promise) {
            checksInProgress.delete(pieceId);
          }
          return;
        }
        checksInProgress.delete(promise);
        cache.set(pieceId, result);
        setCanPlay(result);
      });

    const checkAndSetValue = () => {
      if (!pieceId || !byId[pieceId]) {
        setCanPlay(false);
        return;
      }
      if (cache.has(pieceId)) {
        setCanPlay(cache.get(pieceId));
        return;
      }
      const { sampleNames = [] } = byId[pieceId];
      if (sampleNames.length === 0) {
        cache.set(pieceId, true);
        setCanPlay(true);
        return;
      }
      if (checksInProgress.has(pieceId)) {
        const promise = checksInProgress.get(pieceId);
        getResultFromPromise(promise);
        return;
      }
      const promise = sampleLibrary.has(sampleNames);
      checksInProgress.set(pieceId, promise);
      getResultFromPromise(promise);
    };
    checkAndSetValue();
    window.addEventListener('offline', checkAndSetValue);
    window.addEventListener('online', checkAndSetValue);
    return () => {
      isCancelled = true;
      window.removeEventListener('offline', checkAndSetValue);
      window.removeEventListener('online', checkAndSetValue);
    };
  }, [pieceId]);
  return canPlay;
};

export default useCanPlay;
