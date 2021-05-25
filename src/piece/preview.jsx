import React, { useCallback, useState } from 'react';
import { byId } from '@generative-music/pieces-alex-bainter';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { Stop, PlayArrow, VolumeUp, CloudOff } from '@material-ui/icons';
import PropTypes from 'prop-types';
import {
  IconButton,
  useCreateContextMenuForMouseEvent,
  CircularLoadingIndicator,
} from '@generative.fm/web-ui';
import selectCurrentPieceId from '../queue/select-current-piece-id';
import selectPlaybackStatus from '../playback/select-playback-status';
import MoreButton from './more-button';
import PieceContextMenu from './piece-context-menu';
import userStoppedPlayback from '../playback/user-stopped-playback';
import useCanPlay from './use-can-play';
import styles from './preview.module.scss';

const getReleaseDate = ({ releaseDate }) => releaseDate.getFullYear();

const Preview = ({ pieceId, width, onPlay, getSubtitle = getReleaseDate }) => {
  const piece = byId[pieceId];
  const dispatch = useDispatch();
  const canPlay = useCanPlay(pieceId);
  const [isTouched, setIsTouched] = useState(false);

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

  const handleTouchStart = useCallback(() => {
    setIsTouched(true);
  }, []);

  const handleClick = useCallback(
    (event) => {
      if (!isTouched) {
        return;
      }
      event.preventDefault();
      onPlay(pieceId);
    },
    [isTouched, onPlay, pieceId]
  );

  const subtitle = getSubtitle(piece);

  return (
    <div
      className={classnames(styles.preview, {
        [styles['preview--is-not-touched']]: !isTouched,
      })}
      style={{ width, height: `calc(${width} * 1.4)` }}
      onContextMenu={createContextMenuForMouseEvent}
      onTouchStart={handleTouchStart}
      data-cy={`preview${isCurrentPiece ? ' preview--is-current' : ''}`}
      title={piece.title}
    >
      <Link to={`/generator/${pieceId}`} onClick={handleClick}>
        <div
          className={classnames(styles['preview__image'], {
            [styles['preview__image--is-loading']]: isCurrentlyLoading,
          })}
          style={{
            backgroundImage: `url(${piece.imageSrc})`,
            width: `calc((${width}) - 1rem)`,
            height: `calc((${width}) - 1rem)`,
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
            {!isCurrentlyLoading && !isCurrentlyPlaying && !canPlay && (
              <IconButton withBackground>
                <CloudOff />
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

Preview.propTypes = {
  pieceId: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  onPlay: PropTypes.func.isRequired,
  getSubtitle: PropTypes.func,
};

export default Preview;
