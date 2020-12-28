import React, { useMemo, useCallback } from 'react';
import pieces, { byId } from '@generative-music/pieces-alex-bainter';
import { useSelector } from 'react-redux';
import Category from '../piece/category';
import formatReleaseDate from '../dates/format-release-date';
import formatPlayTime from '../piece/format-play-time';
import selectPlayTime from '../piece/select-play-time';
import useSortings from './use-sortings';
import usePlayTimePerDay from './use-play-time-per-day';
import selectDislikes from '../user/select-dislikes';
import useSelectorOnce from '../app/use-selector-once';
import styles from './browse.module.scss';

const Browse = () => {
  const playTime = useSelector(selectPlayTime);
  const dislikes = useSelectorOnce(selectDislikes);
  const sortings = useSortings();

  const nonDislikedPieceIds = useMemo(
    () => pieces.filter(({ id }) => !dislikes[id]).map(({ id }) => id),
    [dislikes]
  );

  const orderedNewestPieceIds = useMemo(
    () => sortings.newest.sort(nonDislikedPieceIds),
    [sortings, nonDislikedPieceIds]
  );

  const orderedMostPlayedPieceIds = useMemo(
    () =>
      !sortings.playtime.isLoading &&
      sortings.playtime.isAvailable &&
      sortings.playtime.sort(nonDislikedPieceIds),
    [sortings, nonDislikedPieceIds]
  );

  const playTimePerDay = usePlayTimePerDay();

  const orderedTrendingPieceIds = useMemo(
    () =>
      !sortings.trending.isLoading &&
      sortings.trending.isAvailable &&
      sortings.trending.sort(nonDislikedPieceIds),
    [sortings, nonDislikedPieceIds]
  );

  const pieceIdsByTag = useMemo(() => {
    if (orderedTrendingPieceIds === null) {
      return new Map();
    }
    const orderedPieceIds =
      orderedTrendingPieceIds.length > 0
        ? orderedTrendingPieceIds
        : orderedNewestPieceIds;
    return orderedPieceIds.reduce((map, pieceId) => {
      const { tags } = byId[pieceId];
      tags.forEach((tag) => {
        const otherPieceIds = map.get(tag) || [];
        map.set(tag, otherPieceIds.concat([pieceId]));
      });
      return map;
    }, new Map());
  }, [orderedTrendingPieceIds, orderedNewestPieceIds]);

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
      {(sortings.trending.isLoading || sortings.trending.isAvailable) && (
        <Category
          title={'Trending'}
          pieceIds={orderedTrendingPieceIds}
          getSubtitle={getTrendingSubtitle}
          linkTo="/browse/all?sort=trending"
        />
      )}
      {(sortings.playtime.isLoading || sortings.playtime.isAvailable) && (
        <Category
          title={'Most played'}
          pieceIds={orderedMostPlayedPieceIds}
          getSubtitle={getMostPlayedSubtitle}
          linkTo="/browse/all?sort=playtime"
        />
      )}
      <Category
        title={'Newest'}
        pieceIds={orderedNewestPieceIds}
        getSubtitle={getNewestSubtitle}
        linkTo="/browse/all?sort=newest"
      />
      {Array.from(pieceIdsByTag).map(([tag, pieceIds]) => (
        <Category
          key={tag}
          title={tag}
          pieceIds={pieceIds}
          linkTo={`/browse/flavor/${tag}?sort=trending`}
        />
      ))}
    </div>
  );
};

export default Browse;
