import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGlobalPlayTime, getPendingPlayTime } from '@generative.fm/stats';
import selectPlayTime from './select-play-time';
import playTimeLoaded from './play-time-loaded';

const usePlayTime = () => {
  const playTime = useSelector(selectPlayTime);
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([getGlobalPlayTime(), getPendingPlayTime()]).then(
      ([fetchedPlayTime, pendingPlayTime]) => {
        const totalPlayTime = Object.keys(pendingPlayTime).reduce(
          (o, pieceId) => {
            o[pieceId] = pendingPlayTime[pieceId] + (o[pieceId] || 0);
            return o;
          },
          Object.assign({}, fetchedPlayTime)
        );
        dispatch(playTimeLoaded(totalPlayTime));
      }
    );
  }, [dispatch]);

  return playTime;
};

export default usePlayTime;
