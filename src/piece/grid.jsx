import React, {
  useRef,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import useMasterGain from '../volume/use-master-gain';
import Preview from './preview';
import PreviewSkeleton from './preview-skeleton';
import Select from '../select/select';
import useContentWidth from '../layout/use-content-width';
import userPlayedPiece from '../playback/user-played-piece';
import useSortings from './use-sortings';
import styles from './grid.module.scss';

const SORT_LABELS = {
  atoz: 'A to Z',
  ztoa: 'Z to A',
  newest: 'Newest',
  playtime: 'Most played',
  trending: 'Trending',
};

const SORT_REGEX = /sort=([\w\d]+)/i;

const Grid = ({ pieceIds, getSubtitle, title }) => {
  const ref = useRef(null);
  const contentWidth = useContentWidth();
  const masterGain = useMasterGain();
  const dispatch = useDispatch();
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
    [sorting, pieceIds, sortings]
  );

  useEffect(() => {
    if (
      !sortings[sorting] ||
      (!sortings[sorting].isLoading && !sortings[sorting].isAvailable)
    ) {
      handleSortingChange('atoz');
    }
  }, [sorting, sortings, handleSortingChange]);

  const handlePiecePlay = useCallback(
    (pieceId) => {
      dispatch(
        userPlayedPiece({
          selectionPieceIds: sortedPieceIds,
          index: sortedPieceIds.indexOf(pieceId),
          destination: masterGain,
        })
      );
    },
    [dispatch, sortedPieceIds, masterGain]
  );

  const handleSortingChange = useCallback(
    (newSorting) => {
      setSorting(newSorting);
      history.replace(`?sort=${newSorting}`);
    },
    [history]
  );

  return (
    <div className={styles.grid} style={{ width: `${contentWidth}px` }}>
      <div className={styles['grid__header']}>
        <h1 className={styles['grid__header__title']}>{title}</h1>
        <div className={styles['grid__header__options']}>
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
      <div className={styles['grid__items']} ref={ref}>
        {!Array.isArray(sortedPieceIds)
          ? pieceIds.map((pieceId) => (
              <PreviewSkeleton
                key={pieceId}
                width={`calc((${contentWidth}px - 4rem) / 8)`}
              />
            ))
          : sortedPieceIds.map((pieceId) => (
              <Preview
                key={pieceId}
                pieceId={pieceId}
                getSubtitle={getSubtitle}
                onPlay={handlePiecePlay}
                width={`calc((${contentWidth}px - 4rem) / 8)`}
              />
            ))}
      </div>
    </div>
  );
};

export default Grid;
