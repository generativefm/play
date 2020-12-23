import { useCallback, useMemo } from 'react';
import usePlayTimePerDay from './use-play-time-per-day';
import usePlayTime from '../piece/use-play-time';

const sortAlphabetically = (a, b) => a.title.localeCompare(b.title);
const sortAlphabeticallyReverse = (a, b) => b.title.localeCompare(a.title);
const sortByNewest = (a, b) => b.releaseDate - a.releaseDate;

const useSortings = () => {
  const playTime = usePlayTime();

  const sortByPlayTime = useCallback(
    (a, b) => playTime[b.id] - playTime[a.id],
    [playTime]
  );

  const playTimePerDay = usePlayTimePerDay();

  const sortByTrending = useCallback(
    (a, b) => playTimePerDay[b.id] - playTimePerDay[a.id],
    [playTimePerDay]
  );

  const sortings = useMemo(
    () => ({
      atoz: sortAlphabetically,
      ztoa: sortAlphabeticallyReverse,
      newest: sortByNewest,
      playtime: Object.keys(playTime).length ? sortByPlayTime : null,
      trending: Object.keys(playTimePerDay).length ? sortByTrending : null,
    }),
    [playTime, playTimePerDay, sortByPlayTime, sortByTrending]
  );

  return sortings;
};

export default useSortings;
