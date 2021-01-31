import React, { useMemo } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import Grid from '../piece/grid';
import useContentWidth from '../layout/use-content-width';
import useLibraryCategories from './use-library-categories';
import List from '../piece/list';
import useIsNarrowScreen from '../layout/use-is-narrow-screen';
import styles from './library-grid.module.scss';

const titlesByPage = {
  history: 'Recently played',
  likes: 'Likes',
  playtime: 'Your most played',
};

const LibraryGrid = () => {
  const contentWidth = useContentWidth();
  const location = useLocation();
  const categories = useLibraryCategories();
  const isNarrowScreen = useIsNarrowScreen();
  const page = useMemo(
    () =>
      location.pathname
        .substring(location.pathname.lastIndexOf('/') + 1)
        .toLowerCase(),
    [location]
  );
  const { orderedPieceIds, getSubtitle } = categories[page] || {};
  const title = titlesByPage[page];

  if (Array.isArray(orderedPieceIds) && orderedPieceIds.length === 0) {
    return <Redirect to="/browse" />;
  }

  return (
    <>
      <div
        className={styles['library-grid__header']}
        style={{ width: `${contentWidth}px` }}
      >
        <h1 className={styles['library-grid__header__title']}>{title}</h1>
      </div>
      {isNarrowScreen ? (
        <List pieceIds={orderedPieceIds} getSubtitle={getSubtitle} />
      ) : (
        <Grid pieceIds={orderedPieceIds} getSubtitle={getSubtitle} />
      )}
    </>
  );
};

export default LibraryGrid;
