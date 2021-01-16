import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import pieces from '@generative-music/pieces-alex-bainter';
import Select from '../select/select';
import useContentWidth from '../layout/use-content-width';
import useSortings from './use-sortings';
import Grid from '../piece/grid';
import styles from './browse-grid.module.scss';

const SORT_LABELS = {
  atoz: 'A to Z',
  ztoa: 'Z to A',
  newest: 'Newest',
  playtime: 'Most played',
  trending: 'Trending',
};

const SORT_REGEX = /sort=([\w\d]+)/i;

const BrowseGrid = ({
  pieceIds = pieces.map(({ id }) => id),
  title = 'All generators',
}) => {
  const contentWidth = useContentWidth();
  const sortings = useSortings();
  const { search: queryString } = useLocation();
  const history = useHistory();
  const queryStringSortMatch = queryString.match(SORT_REGEX);

  const [sorting, setSorting] = useState(
    (queryStringSortMatch &&
      queryStringSortMatch.length > 1 &&
      typeof queryStringSortMatch[1] === 'string' &&
      typeof sortings[queryStringSortMatch[1].toLowerCase()] !== 'undefined' &&
      queryStringSortMatch[1].toLowerCase()) ||
      'atoz'
  );

  const sortedPieceIds = useMemo(
    () =>
      sortings[sorting] &&
      !sortings[sorting].isLoading &&
      sortings[sorting].isAvailable &&
      sortings[sorting].sort(pieceIds),
    [sorting, sortings, pieceIds]
  );

  useEffect(() => {
    if (
      !sortings[sorting] ||
      (!sortings[sorting].isLoading && !sortings[sorting].isAvailable)
    ) {
      handleSortingChange('atoz');
    }
  }, [sorting, sortings, handleSortingChange]);

  const handleSortingChange = useCallback(
    (newSorting) => {
      setSorting(newSorting);
      history.replace(`?sort=${newSorting}`);
    },
    [history]
  );

  return (
    <>
      <div
        className={styles['browse-grid__header']}
        style={{ width: `${contentWidth}px` }}
      >
        <h1 className={styles['browse-grid__header__title']}>{title}</h1>
        <div className={styles['browse-grid__header__options']}>
          <Select
            options={Object.keys(sortings)
              .filter(
                (key) => sortings[key].isLoading || sortings[key].isAvailable
              )
              .map((key) => [key, SORT_LABELS[key]])}
            value={sorting}
            onChange={handleSortingChange}
          />
        </div>
      </div>
      <Grid pieceIds={sortedPieceIds} />
    </>
  );
};

export default BrowseGrid;
