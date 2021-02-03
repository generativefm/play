import { useCallback, useMemo } from 'react';
import { byId } from '@generative-music/pieces-alex-bainter';
import usePlayTimePerDay from './use-play-time-per-day';
import usePlayTime from '../piece/use-play-time';
import formatReleaseDate from '../dates/format-release-date';
import formatPlayTime from '../piece/format-play-time';

const sortAlphabetically = (pieceIds) =>
  pieceIds.sort((a, b) => byId[a].title.localeCompare(byId[b].title));
const sortAlphabeticallyReverse = (pieceIds) =>
  pieceIds.sort((a, b) => byId[b].title.localeCompare(byId[a].title));
const sortByNewest = (pieceIds) =>
  pieceIds.sort((a, b) => byId[b].releaseDate - byId[a].releaseDate);

const useSortings = () => {
  const playTime = usePlayTime();

  const sortByPlayTime = useCallback(
    (pieceIds) =>
      pieceIds
        .filter((pieceId) => typeof playTime[pieceId] === 'number')
        .sort((a, b) => playTime[b] - playTime[a]),
    [playTime]
  );

  const playTimePerDay = usePlayTimePerDay();

  const sortByTrending = useCallback(
    (pieceIds) =>
      pieceIds
        .filter((pieceId) => typeof playTimePerDay[pieceId] === 'number')
        .sort((a, b) => playTimePerDay[b] - playTimePerDay[a]),
    [playTimePerDay]
  );

  const getNewestSubtitle = useCallback(
    (piece) => formatReleaseDate(piece.releaseDate),
    []
  );

  const getMostPlayedSubtitle = useCallback(
    (piece) => `${formatPlayTime(playTime[piece.id])} played`,
    [playTime]
  );

  const getTrendingSubtitle = useCallback(
    (piece) => `${formatPlayTime(playTimePerDay[piece.id])} played per day`,
    [playTimePerDay]
  );

  const sortings = useMemo(
    () => ({
      atoz: { isLoading: false, isAvailable: true, sort: sortAlphabetically },
      ztoa: {
        isLoading: false,
        isAvailable: true,
        sort: sortAlphabeticallyReverse,
      },
      newest: {
        isLoading: false,
        isAvailable: true,
        sort: sortByNewest,
        getSubtitle: getNewestSubtitle,
      },
      playtime: {
        isLoading: playTime === null,
        isAvailable: Boolean(playTime) && Object.keys(playTime).length > 0,
        sort: sortByPlayTime,
        getSubtitle: getMostPlayedSubtitle,
      },
      trending: {
        isLoading: playTimePerDay === null,
        isAvailable:
          Boolean(playTimePerDay) && Object.keys(playTimePerDay).length > 0,
        sort: sortByTrending,
        getSubtitle: getTrendingSubtitle,
      },
    }),
    [
      playTime,
      playTimePerDay,
      sortByPlayTime,
      sortByTrending,
      getNewestSubtitle,
      getMostPlayedSubtitle,
      getTrendingSubtitle,
    ]
  );

  return sortings;
};

export default useSortings;
