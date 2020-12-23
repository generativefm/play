import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import selectPlayTime from './select-play-time';
import fetchData from './fetch-data';
import playTimeLoaded from './play-time-loaded';

const usePlayTime = () => {
  const playTime = useSelector(selectPlayTime);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData().then((fetchedPlayTime) => {
      dispatch(playTimeLoaded(fetchedPlayTime));
    });
  }, [dispatch]);

  return playTime;
};

export default usePlayTime;
