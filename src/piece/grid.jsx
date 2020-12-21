import React, { useRef, useCallback, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { byId } from '@generative-music/pieces-alex-bainter';
import useMasterGain from '../volume/use-master-gain';
import Preview from './preview';
import Select from '../select/select';
import useContentWidth from '../layout/use-content-width';
import userPlayedPiece from '../playback/user-played-piece';
import styles from './grid.module.scss';

const sortings = {
  atoz: (a, b) => a.title.localeCompare(b.title),
  ztoa: (a, b) => b.title.localeCompare(a.title),
  newest: (a, b) => b.releaseDate - a.releaseDate,
};

const Grid = ({ pieceIds, getSubtitle, title }) => {
  const ref = useRef(null);
  const contentWidth = useContentWidth();
  const masterGain = useMasterGain();
  const dispatch = useDispatch();
  const [sorting, setSorting] = useState('atoz');

  const handlePiecePlay = useCallback(
    (pieceId) => {
      dispatch(
        userPlayedPiece({
          selectionPieceIds: pieceIds,
          index: pieceIds.indexOf(pieceId),
          destination: masterGain,
        })
      );
    },
    [dispatch, pieceIds, masterGain]
  );

  const sortedPieceIds = useMemo(
    () =>
      pieceIds
        .map((pieceId) => byId[pieceId])
        .sort(sortings[sorting])
        .map(({ id }) => id),
    [sorting, pieceIds]
  );

  return (
    <div className={styles.grid} style={{ width: `${contentWidth}px` }}>
      <div className={styles['grid__header']}>
        <h1 className={styles['grid__header__title']}>{title}</h1>
        <div className={styles['grid__header__options']}>
          <Select
            options={[
              ['atoz', 'A to Z'],
              ['ztoa', 'Z to A'],
              ['newest', 'Newest'],
            ]}
            value={sorting}
            onChange={setSorting}
          />
        </div>
      </div>
      <div className={styles['grid__items']} ref={ref}>
        {sortedPieceIds.map((pieceId) => (
          <Preview
            key={pieceId}
            pieceId={pieceId}
            getSubtitle={getSubtitle}
            onPlay={handlePiecePlay}
            width={`calc((${contentWidth}px - 4rem) / 7)`}
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;
