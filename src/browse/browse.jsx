import React, { useMemo, useCallback } from 'react';
import pieces from '@generative-music/pieces-alex-bainter';
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

  const pieceIdsByTag = useMemo(
    () =>
      sortings.trending
        ? pieces.sort(sortings.trending).reduce((map, piece) => {
            const { tags, id } = piece;
            tags.forEach((tag) => {
              const otherPieceIds = map.get(tag) || [];
              map.set(tag, otherPieceIds.concat([id]));
            });
            return map;
          }, new Map())
        : new Map(),
    [sortings]
  );

  const likedPieceIds = useMemo(
    () => pieces.filter(({ id }) => !dislikes[id]),
    [dislikes]
  );

  const orderedNewestPieceIds = useMemo(
    () => likedPieceIds.sort(sortings.newest).map(({ id }) => id),
    [sortings, likedPieceIds]
  );

  const orderedMostPlayedPieceIds = useMemo(
    () =>
      sortings.playtime &&
      likedPieceIds.sort(sortings.playtime).map(({ id }) => id),
    [sortings, likedPieceIds]
  );

  const playTimePerDay = usePlayTimePerDay();

  const orderedTrendingPieceIds = useMemo(
    () =>
      sortings.trending &&
      likedPieceIds.sort(sortings.trending).map(({ id }) => id),
    [sortings, likedPieceIds]
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
        title={'Trending'}
        pieceIds={orderedTrendingPieceIds}
        getSubtitle={getTrendingSubtitle}
        linkTo="/browse/all?sort=trending"
      />
      <Category
        title={'Most played'}
        pieceIds={orderedMostPlayedPieceIds}
        getSubtitle={getMostPlayedSubtitle}
        linkTo="/browse/all?sort=playtime"
      />
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
