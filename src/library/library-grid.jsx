import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '../piece/grid';
import useContentWidth from '../layout/use-content-width';
import useLibraryCategories from './use-library-categories';
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
  const page = useMemo(
    () =>
      location.pathname
        .substring(location.pathname.lastIndexOf('/') + 1)
        .toLowerCase(),
    [location]
  );
  const { orderedPieceIds, getSubtitle } = categories[page] || {};
  const title = titlesByPage[page];
  return (
    <>
      <div
        className={styles['library-grid__header']}
        style={{ width: `${contentWidth}px` }}
      >
        <h1 className={styles['library-grid__header__title']}>{title}</h1>
      </div>
      <Grid pieceIds={orderedPieceIds} getSubtitle={getSubtitle} />
    </>
  );
};

export default LibraryGrid;
