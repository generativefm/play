import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { byId } from '@generative-music/pieces-alex-bainter';
import classnames from 'classnames';
import { useHistory, Link } from 'react-router-dom';
import selectCurrentPieceId from '../queue/select-current-piece-id';
import selectQueuedPieceIds from '../queue/select-queued-piece-ids';
import userClosedPlayback from './user-closed-playback';
import MoreButton from '../piece/more-button';
import LikeButton from '../piece/like-button';
import DislikeButton from '../piece/dislike-button';
import PieceContextMenu from '../piece/piece-context-menu';
import useCreateContextMenuForMouseEvent from '../context-menu/use-create-context-menu-for-mouse-event';
import styles from './playback.module.scss';

const QueuedPiece = ({ pieceId, isCurrentPiece }) => {
  const queuedPiece = byId[pieceId];
  const createContextMenuForMouseEvent = useCreateContextMenuForMouseEvent(
    <PieceContextMenu pieceId={pieceId} />
  );
  return (
    <div
      key={pieceId}
      className={classnames(styles['queued-piece'], {
        [styles['queued-piece--is-selected']]: isCurrentPiece,
      })}
      onContextMenu={createContextMenuForMouseEvent}
    >
      <img
        className={styles['queued-piece__image']}
        src={queuedPiece.imageSrc}
      />
      <div className={styles['queued-piece__title']}>{queuedPiece.title}</div>
      <MoreButton pieceId={pieceId} />
    </div>
  );
};

const Playback = () => {
  const currentPieceId = useSelector(selectCurrentPieceId);
  const queuedPieceIds = useSelector(selectQueuedPieceIds);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(
    () =>
      history.listen(() => {
        dispatch(userClosedPlayback());
      }),
    [history, dispatch]
  );

  if (!currentPieceId || !byId[currentPieceId]) {
    return null;
  }

  const piece = byId[currentPieceId];

  return (
    <div className={styles.playback}>
      <div className={styles['playback__current-piece']}>
        <img
          className={styles['playback__current-piece__image']}
          src={piece.imageSrc}
        />
        <div className={styles['playback__current-piece__info']}>
          <DislikeButton pieceId={currentPieceId} />
          <Link
            className={styles['playback__current-piece__info__title']}
            to={`/generator/${currentPieceId}`}
          >
            {piece.title}
          </Link>
          <LikeButton pieceId={currentPieceId} />
        </div>
      </div>
      <div className={styles['playback__queue']}>
        <div className={styles['playback__queue__title']}>Now playing</div>
        <div className={styles['playback__queue__list']}>
          {queuedPieceIds
            .filter((pieceId) => pieceId && Boolean(byId[pieceId]))
            .map((pieceId) => (
              <QueuedPiece
                key={pieceId}
                pieceId={pieceId}
                isCurrentPiece={pieceId === currentPieceId}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Playback;
