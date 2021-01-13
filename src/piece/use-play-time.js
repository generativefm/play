import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPlayTime } from '@generative.fm/stats';
import selectPlayTime from './select-play-time';
import playTimeLoaded from './play-time-loaded';

const usePlayTime = () => {
  const playTime = useSelector(selectPlayTime);
  const dispatch = useDispatch();

  useEffect(() => {
    getPlayTime().then((fetchedPlayTime) => {
      dispatch(playTimeLoaded(fetchedPlayTime));
    });
  }, [dispatch]);

  return playTime;
};

export default usePlayTime;
