import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import selectPlayTime from './select-play-time';
import fetchPlayTime from './fetch-play-time';
import playTimeLoaded from './play-time-loaded';

const usePlayTime = () => {
  const playTime = useSelector(selectPlayTime);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPlayTime().then((fetchedPlayTime) => {
      dispatch(playTimeLoaded(fetchedPlayTime));
    });
  }, [dispatch]);

  return playTime;
};

export default usePlayTime;
