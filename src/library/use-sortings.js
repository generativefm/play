import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import selectLikes from '../user/select-likes';
import selectPlayTime from '../user/select-play-time';
import selectHistory from '../user/select-history';

const useSortings = () => {
  const likes = useSelector(selectLikes);
  const playTime = useSelector(selectPlayTime);
  const history = useSelector(selectHistory);

  const filterAndSortByLikes = useCallback(
    (pieceIds) =>
      pieceIds
        .filter((pieceId) => Boolean(likes[pieceId]))
        .sort((a, b) => likes[b] - likes[a]),
    [likes]
  );

  const filterAndSortByPlayTime = useCallback(
    (pieceIds) =>
      pieceIds
        .filter((pieceId) => Boolean(playTime[pieceId]))
        .sort((a, b) => playTime[b] - playTime[a]),
    [playTime]
  );

  const filterAndSortByHistory = useCallback(
    (pieceIds) =>
      pieceIds
        .filter((pieceId) => Boolean(history[pieceId]))
        .sort((a, b) => history[b] - history[a]),
    [history]
  );

  const sortings = useMemo(
    () => ({
      likes: Object.keys(likes).length ? filterAndSortByLikes : null,
      yourPlayTime: Object.keys(playTime).length
        ? filterAndSortByPlayTime
        : null,
      history: Object.keys(history).length ? filterAndSortByHistory : null,
    }),
    [
      likes,
      filterAndSortByLikes,
      playTime,
      filterAndSortByPlayTime,
      history,
      filterAndSortByHistory,
    ]
  );

  return sortings;
};

export default useSortings;
