import React, { useCallback, useState } from 'react';
import pieces, { byId } from '@generative-music/pieces-alex-bainter';
import userPlayedPiece from '../playback/user-played-piece';
import { useDispatch, useSelector } from 'react-redux';
import { VolumeUp, CloudOff } from '@material-ui/icons';
import classnames from 'classnames';
import selectPlaybackStatus from '../playback/select-playback-status';
import selectCurrentPieceId from '../queue/select-current-piece-id';
import MoreButton from './more-button';
import CircularLoadingIndicator from '../loading/circular-loading-indicator';
import IconButton from '../button/icon-button';
import useCanPlay from './use-can-play';
import Skeleton from '../loading/skeleton';
import styles from './list.module.scss';

const getReleaseDate = ({ releaseDate }) => releaseDate.getFullYear();

const ListItem = ({
  pieceId,
  getSubtitle = getReleaseDate,
  onClick,
  isLoading,
  isPlaying,
  isCurrentPiece,
}) => {
  const piece = byId[pieceId];
  const { title, imageSrc } = piece;
  const handleClick = useCallback(() => {
    onClick(pieceId);
  }, [pieceId, onClick]);
  const canPlay = useCanPlay(pieceId);

  return (
    <div
      className={classnames(styles['list-item'], {
        [styles['list-item--is-current']]: isCurrentPiece,
      })}
      onClick={handleClick}
    >
      <div
        className={styles['list-item__image']}
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        {!canPlay && !isLoading && !isPlaying && (
          <IconButton withBackground isTouched>
            <CloudOff />
          </IconButton>
        )}
        {isLoading && <CircularLoadingIndicator />}
        {isPlaying && (
          <IconButton withBackground isTouched>
            <VolumeUp />
          </IconButton>
        )}
      </div>
      <div className={styles['list-item__info']}>
        <div className={styles['list-item__info__title']}>{title}</div>
        <div className={styles['list-item__info__subtitle']}>
          {getSubtitle(piece)}
        </div>
      </div>
      <div className={styles['list-item__more']}>
        <MoreButton pieceId={pieceId} />
      </div>
    </div>
  );
};

const ListItemSkeleton = () => (
  <div className={styles['list-item']}>
    <Skeleton className={styles['list-item__image']} useDiv={true} />
    <div className={styles['list-item__info']}>
      <div className={styles['list-item__info__title']}>
        <Skeleton>Loading title...</Skeleton>
      </div>
      <div className={styles['list-item__info__subtitle']}>
        <Skeleton>Loading subtitle...</Skeleton>
      </div>
    </div>
    <div className={styles['list-item__more']}></div>
  </div>
);

const List = ({ pieceIds, getSubtitle }) => {
  const dispatch = useDispatch();
  const currentPieceId = useSelector(selectCurrentPieceId);
  const playbackStatus = useSelector(selectPlaybackStatus);
  const [isNotTouched, setIsNotTouched] = useState(true);

  const handlePieceClick = useCallback(
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

  const handleTouchStart = useCallback(() => {
    setIsNotTouched(false);
  }, []);

  if (!Array.isArray(pieceIds)) {
    return (
      <div
        className={classnames(styles.list, {
          [styles['list--is-not-touched']]: isNotTouched,
        })}
        onTouchStart={handleTouchStart}
      >
        {pieces.map((_, i) => (
          <ListItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={classnames(styles.list, {
        [styles['list--is-not-touched']]: isNotTouched,
      })}
      onTouchStart={handleTouchStart}
    >
      {pieceIds.map((pieceId) => {
        const isCurrentPiece = pieceId === currentPieceId;
        return (
          <ListItem
            key={pieceId}
            pieceId={pieceId}
            getSubtitle={getSubtitle}
            isCurrentPiece={isCurrentPiece}
            isLoading={isCurrentPiece && playbackStatus === 'loading'}
            isPlaying={isCurrentPiece && playbackStatus === 'playing'}
            onClick={handlePieceClick}
          />
        );
      })}
    </div>
  );
};

export default List;
