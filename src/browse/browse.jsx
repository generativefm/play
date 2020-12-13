import React, { useMemo, useCallback } from 'react';
import pieces, { byId } from '@generative-music/pieces-alex-bainter';
import { useSelector } from 'react-redux';
import Category from '../piece/category';
import formatReleaseDate from '../dates/format-release-date';
import formatPlayTime from '../piece/format-play-time';
import selectPlayTime from '../piece/select-play-time';
import CircularLoadingIndicator from '../playback/circular-loading-indicator';
import styles from './browse.module.scss';

const Browse = () => {
  const playTime = useSelector(selectPlayTime);

  const orderedNewestPieceIds = useMemo(
    () =>
      pieces.sort((a, b) => b.releaseDate - a.releaseDate).map(({ id }) => id),
    []
  );

  const orderedMostPlayedPieceIds = useMemo(
    () => Object.keys(playTime).sort((a, b) => playTime[b] - playTime[a]),
    [playTime]
  );

  const playTimePerDay = useMemo(
    () =>
      Object.keys(playTime)
        .map((pieceId) => [
          pieceId,
          playTime[pieceId] /
            ((Date.now() - byId[pieceId].releaseDate.getTime()) /
              (1000 * 60 * 60 * 24)),
        ])
        .reduce((o, [pieceId, hoursPerDay]) => {
          o[pieceId] = hoursPerDay;
          return o;
        }, {}),
    [playTime]
  );

  const orderedTrendingPieceIds = useMemo(
    () =>
      Object.keys(playTimePerDay).sort(
        (a, b) => playTimePerDay[b] - playTimePerDay[a]
      ),
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

  return (
    <div className={styles.browse}>
      <Category
        title={'Trending worldwide'}
        pieceIds={orderedTrendingPieceIds}
        getSubtitle={getTrendingSubtitle}
      />
      <Category
        title={'Most played worldwide'}
        pieceIds={orderedMostPlayedPieceIds}
        getSubtitle={getMostPlayedSubtitle}
      />
      <Category
        title={'Newest'}
        pieceIds={orderedNewestPieceIds}
        getSubtitle={getNewestSubtitle}
      />
    </div>
  );
};

export default Browse;
