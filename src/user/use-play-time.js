import { useEffect, useState } from 'react';
import { getPendingPlayTime } from '@generative.fm/stats';
import { useSelector } from 'react-redux';
import selectPlayTime from './select-play-time';
import useLatestUser from './use-latest-user';

const usePlayTime = () => {
  const [combinedPlayTime, setPlayTime] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingUser = useLatestUser();
  const syncedPlayTime = useSelector(selectPlayTime);

  useEffect(() => {
    if (isLoadingUser) {
      setIsLoading(true);
      return;
    }
    getPendingPlayTime().then((pendingPlayTime) => {
      const totalPlayTime = Object.keys(pendingPlayTime).reduce(
        (o, pieceId) => {
          o[pieceId] = pendingPlayTime[pieceId] + (o[pieceId] || 0);
          return o;
        },
        Object.assign({}, syncedPlayTime)
      );
      setPlayTime(totalPlayTime);
      setIsLoading(false);
    });
  }, [isLoadingUser, syncedPlayTime]);

  return { isLoading, playTime: combinedPlayTime };
};

export default usePlayTime;
