import React, { useCallback } from 'react';
import { byId } from '@generative-music/pieces-alex-bainter';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { Stop, PlayArrow, VolumeUp } from '@material-ui/icons';
import IconButton from '../button/icon-button';
import selectCurrentPieceId from '../queue/select-current-piece-id';
import selectPlaybackStatus from '../playback/select-playback-status';
import CircularLoadingIndicator from '../loading/circular-loading-indicator';
import useCreateContextMenuForMouseEvent from '../context-menu/use-create-context-menu-for-mouse-event';
import MoreButton from './more-button';
import PieceContextMenu from './piece-context-menu';
import userStoppedPlayback from '../playback/user-stopped-playback';
import styles from './preview.module.scss';

const getReleaseDate = ({ releaseDate }) => releaseDate.getFullYear();

const Preview = ({ pieceId, width, onPlay, getSubtitle = getReleaseDate }) => {
  const piece = byId[pieceId];
  const dispatch = useDispatch();

  const createContextMenuForMouseEvent = useCreateContextMenuForMouseEvent(
    <PieceContextMenu pieceId={pieceId} />
  );

  const currentPieceId = useSelector(selectCurrentPieceId);
  const playbackStatus = useSelector(selectPlaybackStatus);

  const isCurrentPiece = currentPieceId === pieceId;
  const isCurrentlyLoading = isCurrentPiece && playbackStatus === 'loading';
  const isCurrentlyPlaying = isCurrentPiece && playbackStatus === 'playing';

  const handlePrimaryClick = useCallback(
    (event) => {
      event.preventDefault();
      if (!isCurrentlyPlaying) {
        onPlay(pieceId);
      } else {
        dispatch(userStoppedPlayback());
      }
    },
    [pieceId, onPlay, isCurrentlyPlaying, dispatch]
  );

  const subtitle = getSubtitle(piece);

  return (
    <div
      className={styles.preview}
      style={{ width }}
      onContextMenu={createContextMenuForMouseEvent}
    >
      <Link to={`/generator/${pieceId}`}>
        <div
          className={classnames(styles['preview__image'], {
            [styles['preview__image--is-loading']]: isCurrentlyLoading,
          })}
          style={{
            backgroundImage: `url(${piece.imageSrc})`,
            width: `calc((${width}) - 2rem)`,
            height: `calc((${width}) - 2rem)`,
          }}
        >
          <div className={styles['preview__image__more']}>
            <MoreButton pieceId={pieceId} />
          </div>
          <div className={styles['preview__image__action']}>
            {!isCurrentlyLoading && (
              <IconButton onClick={handlePrimaryClick} withBackground>
                {isCurrentlyPlaying ? <Stop /> : <PlayArrow />}
              </IconButton>
            )}
          </div>
          <div
            className={classnames(styles['preview__image__status'], {
              [styles[
                'preview__image__status--is-loading'
              ]]: isCurrentlyLoading,
            })}
          >
            {isCurrentlyLoading && <CircularLoadingIndicator />}
            {isCurrentlyPlaying && (
              <IconButton withBackground>
                <VolumeUp />
              </IconButton>
            )}
          </div>
        </div>
      </Link>

      <Link to={`/generator/${pieceId}`} className={styles['preview__title']}>
        {piece.title}
      </Link>
      <div className={styles['preview__subtitle']}>{subtitle}</div>
    </div>
  );
};

export default Preview;
