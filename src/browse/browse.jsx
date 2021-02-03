import React, { useMemo } from 'react';
import pieces, { byId } from '@generative-music/pieces-alex-bainter';
import Category from '../piece/category';
import useSortings from './use-sortings';
import selectDislikes from '../user/select-dislikes';
import useSelectorOnce from '../app/use-selector-once';
import styles from './browse.module.scss';

const Browse = () => {
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

  return (
    <div className={styles.browse}>
      {(sortings.trending.isLoading || sortings.trending.isAvailable) && (
        <Category
          title={'Trending'}
          pieceIds={orderedTrendingPieceIds}
          getSubtitle={sortings.trending.getSubtitle}
          linkTo="/browse/all?sort=trending"
        />
      )}
      {(sortings.playtime.isLoading || sortings.playtime.isAvailable) && (
        <Category
          title={'Most played'}
          pieceIds={orderedMostPlayedPieceIds}
          getSubtitle={sortings.playtime.getSubtitle}
          linkTo="/browse/all?sort=playtime"
        />
      )}
      <Category
        title={'Newest'}
        pieceIds={orderedNewestPieceIds}
        getSubtitle={sortings.newest.getSubtitle}
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
