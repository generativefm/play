import { useState, useEffect } from 'react';
import { byId } from '@generative-music/pieces-alex-bainter';
import sampleLibrary from '../playback/sample-library';

const cache = new Map();

const useCanPlay = (pieceId) => {
  const [canPlay, setCanPlay] = useState(true);
  useEffect(() => {
    if (!pieceId || !byId[pieceId]) {
      setCanPlay(false);
      return;
    }
    let isCancelled = false;
    const { sampleNames = [] } = byId[pieceId];

    const checkAndUpdateStatus = () => {
      cache.delete(pieceId);
      return sampleLibrary.has(sampleNames).then((result) => {
        if (isCancelled) {
          return;
        }
        cache.set(pieceId, result);
        setCanPlay(result);
      });
    };

    window.addEventListener('offline', checkAndUpdateStatus);
    window.addEventListener('online', checkAndUpdateStatus);

    if (cache.has(pieceId)) {
      setCanPlay(cache.get(pieceId));
    } else {
      checkAndUpdateStatus();
    }
    return () => {
      isCancelled = true;
      window.removeEventListener('offline', checkAndUpdateStatus);
      window.removeEventListener('online', checkAndUpdateStatus);
    };
  }, [pieceId]);
  return canPlay;
};

export default useCanPlay;
