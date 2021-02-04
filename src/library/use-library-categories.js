import { useMemo, useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { byId } from '@generative-music/pieces-alex-bainter';
import { getPendingPlayTime } from '@generative.fm/stats';
import selectHistory from '../user/select-history';
import selectLikes from '../user/select-likes';
import selectPlayTime from '../user/select-play-time';
import formatPlayTime from '../piece/format-play-time';
import useSelectorOnce from '../app/use-selector-once';
import useLatestUser from '../user/use-latest-user';
import selectUserId from '../user/select-user-id';
import getHumanReadableTimeSince from './get-human-readable-time-since';

const useLibraryCategories = () => {
  const isLoadingUser = useLatestUser();
  const userId = useSelector(selectUserId);
  const history = useSelectorOnce(selectHistory, [isLoadingUser, userId]);
  const likes = useSelectorOnce(selectLikes, [isLoadingUser, userId]);
  const syncedPlayTime = useSelectorOnce(selectPlayTime, [
    isLoadingUser,
    userId,
  ]);
  const [combinedPlayTime, setCombinedPlayTime] = useState(syncedPlayTime);

  useEffect(() => {
    let isCancelled = false;
    getPendingPlayTime().then((pendingPlayTime) => {
      if (isCancelled) {
        return;
      }
      const totalPlayTime = Object.keys(pendingPlayTime).reduce(
        (o, pieceId) => {
          o[pieceId] = pendingPlayTime[pieceId] + (o[pieceId] || 0);
          return o;
        },
        Object.assign({}, syncedPlayTime)
      );
      setCombinedPlayTime(totalPlayTime);
    });
    return () => {
      isCancelled = true;
    };
  }, [syncedPlayTime, isLoadingUser]);

  const orderedHistoryPieceIds = useMemo(
    () =>
      Object.keys(history)
        .filter((pieceId) => byId[pieceId])
        .sort((a, b) => history[b] - history[a]),
    [history]
  );

  const orderedLikesPieceIds = useMemo(
    () =>
      Object.keys(likes)
        .filter((pieceId) => byId[pieceId])
        .sort((a, b) => likes[b] - likes[a]),
    [likes]
  );

  const orderedPlayTimePieceIds = useMemo(
    () =>
      Object.keys(combinedPlayTime)
        .filter((pieceId) => byId[pieceId])
        .sort((a, b) => combinedPlayTime[b] - combinedPlayTime[a]),
    [combinedPlayTime]
  );

  const getHistorySubtitle = useCallback(
    (piece) => getHumanReadableTimeSince(history[piece.id]),
    [history]
  );

  const getPlayTimeSubtitle = useCallback(
    (piece) => {
      const playTimeMs = combinedPlayTime[piece.id];
      return formatPlayTime(playTimeMs);
    },
    [combinedPlayTime]
  );

  return useMemo(
    () => ({
      history: {
        orderedPieceIds: !isLoadingUser && orderedHistoryPieceIds,
        getSubtitle: getHistorySubtitle,
      },
      likes: {
        orderedPieceIds: !isLoadingUser && orderedLikesPieceIds,
      },
      playtime: {
        orderedPieceIds: !isLoadingUser && orderedPlayTimePieceIds,
        getSubtitle: getPlayTimeSubtitle,
      },
    }),
    [
      orderedHistoryPieceIds,
      getHistorySubtitle,
      orderedLikesPieceIds,
      orderedPlayTimePieceIds,
      getPlayTimeSubtitle,
      isLoadingUser,
    ]
  );
};

export default useLibraryCategories;
