import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Preview from './preview';
import PreviewSkeleton from './preview-skeleton';
import useContentWidth from '../layout/use-content-width';
import userPlayedPiece from '../playback/user-played-piece';
import styles from './grid.module.scss';

const Grid = ({ pieceIds, getSubtitle }) => {
  const contentWidth = useContentWidth();
  const dispatch = useDispatch();

  const handlePiecePlay = useCallback(
    (pieceId) => {
      dispatch(
        userPlayedPiece({
          selectionPieceIds: pieceIds,
          index: pieceIds.indexOf(pieceId),
        })
      );
    },
    [dispatch, pieceIds]
  );

  return (
    <div className={styles.grid} style={{ width: `${contentWidth}px` }}>
      {!Array.isArray(pieceIds)
        ? Array.from({ length: 30 }, (_, i) => (
            <PreviewSkeleton
              key={i}
              width={`calc((${contentWidth}px - 4rem) / 8)`}
            />
          ))
        : pieceIds.map((pieceId) => (
            <Preview
              key={pieceId}
              pieceId={pieceId}
              getSubtitle={getSubtitle}
              onPlay={handlePiecePlay}
              width={`calc((${contentWidth}px - 4rem) / 8)`}
            />
          ))}
    </div>
  );
};

export default Grid;
