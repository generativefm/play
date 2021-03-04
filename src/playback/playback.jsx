import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { byId } from '@generative-music/pieces-alex-bainter';
import { useHistory, Link } from 'react-router-dom';
import selectCurrentPieceId from '../queue/select-current-piece-id';
import userClosedPlayback from './user-closed-playback';
import LikeButton from '../piece/like-button';
import DislikeButton from '../piece/dislike-button';
import Queue from '../queue/queue';
import selectQueuedPieceIds from '../queue/select-queued-piece-ids';
import styles from './playback.module.scss';

const Playback = () => {
  const currentPieceId = useSelector(selectCurrentPieceId);
  const history = useHistory();
  const dispatch = useDispatch();
  const queuedPieceIds = useSelector(selectQueuedPieceIds);

  useEffect(() => {
    history.push(
      [
        history.location.pathname,
        history.location.search,
        history.location.hash,
      ].join('')
    );
  }, [history]);

  useEffect(
    () =>
      history.listen(() => {
        dispatch(userClosedPlayback());
      }),
    [history, dispatch]
  );

  useEffect(() => {
    if (!queuedPieceIds.length) {
      history.goBack();
    }
  }, [queuedPieceIds.length, history]);

  if (!currentPieceId || !byId[currentPieceId]) {
    return null;
  }

  const piece = byId[currentPieceId];

  return (
    <div className={styles.playback} data-cy="playback-overlay">
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
        <Queue />
      </div>
    </div>
  );
};

export default Playback;
