import { useEffect, useState, useMemo } from 'react';
import { getPendingPlayTime } from '@generative.fm/stats';
import { useSelector } from 'react-redux';
import selectPlayTime from './select-play-time';
import useLatestUser from './use-latest-user';

const usePlayTime = () => {
  const [pendingPlayTime, setPendingPlayTime] = useState({});
  const isLoadingUser = useLatestUser();
  const [isLoading, setIsLoading] = useState(true);
  const syncedPlayTime = useSelector(selectPlayTime);

  useEffect(() => {
    if (isLoadingUser) {
      return;
    }
    let isCancelled = false;
    getPendingPlayTime().then((pendingPlayTime) => {
      if (isCancelled) {
        return;
      }
      setPendingPlayTime(pendingPlayTime);
      setIsLoading(false);
    });
    return () => {
      isCancelled = true;
    };
  }, [isLoadingUser]);

  const playTime = useMemo(
    () =>
      Object.keys(pendingPlayTime).reduce((o, pieceId) => {
        o[pieceId] = pendingPlayTime[pieceId] + (o[pieceId] || 0);
        return o;
      }, Object.assign({}, syncedPlayTime)),
    [syncedPlayTime, pendingPlayTime]
  );

  return { isLoading, playTime };
};

export default usePlayTime;
