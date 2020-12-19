import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { byId } from '@generative-music/pieces-alex-bainter';
import {
  ThumbUpOutlined,
  ThumbDownOutlined,
  MoreVert,
} from '@material-ui/icons';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import selectCurrentPieceId from '../queue/select-current-piece-id';
import IconButton from '../button/icon-button';
import selectQueuedPieceIds from '../queue/select-queued-piece-ids';
import userClosedPlayback from './user-closed-playback';
import MoreButton from '../piece/more-button';
import styles from './playback.module.scss';

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
          <IconButton>
            <ThumbDownOutlined />
          </IconButton>
          <div className={styles['playback__current-piece__info__title']}>
            {piece.title}
          </div>
          <IconButton>
            <ThumbUpOutlined />
          </IconButton>
        </div>
      </div>
      <div className={styles['playback__queue']}>
        <div className={styles['playback__queue__title']}>Now playing</div>
        <div className={styles['playback__queue__list']}>
          {queuedPieceIds
            .filter((pieceId) => pieceId && Boolean(byId[pieceId]))
            .map((pieceId) => {
              const queuedPiece = byId[pieceId];
              return (
                <div
                  key={pieceId}
                  className={classnames(styles['playback__queue__list__item'], {
                    [styles['playback__queue__list__item--is-selected']]:
                      pieceId === currentPieceId,
                  })}
                >
                  <img
                    className={styles['playback__queue__list__item__image']}
                    src={queuedPiece.imageSrc}
                  />
                  <div className={styles['playback__queue__list__item__title']}>
                    {queuedPiece.title}
                  </div>
                  <MoreButton pieceId={pieceId} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Playback;
