import React, { useCallback } from 'react';
import { byId } from '@generative-music/pieces-alex-bainter';
import { Link } from 'react-router-dom';
import { MoreVert, PlayArrow, Stop } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import IconButton from '../button/icon-button';
import selectCurrentPieceId from '../queue/select-current-piece-id';
import selectPlaybackStatus from '../playback/select-playback-status';
import CircularLoadingIndicator from '../playback/circular-loading-indicator';
import styles from './preview.module.scss';

const getReleaseDate = ({ releaseDate }) => releaseDate.getFullYear();

const Preview = ({
  pieceId,
  width,
  onPlay,
  onStop,
  getSubtitle = getReleaseDate,
}) => {
  const piece = byId[pieceId];

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
        onStop(pieceId);
      }
    },
    [pieceId, onPlay, isCurrentlyPlaying, onStop]
  );

  const subtitle = getSubtitle(piece);

  return (
    <div className={styles.preview} style={{ width }}>
      <Link to={`/piece/${pieceId}`}>
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
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
          <div
            className={classnames(styles['preview__image__action'], {
              [styles['preview__image__action--is-visible']]:
                isCurrentlyLoading || isCurrentlyPlaying,
            })}
          >
            {isCurrentlyLoading ? (
              <CircularLoadingIndicator withBackground />
            ) : (
              <IconButton onClick={handlePrimaryClick}>
                {isCurrentlyPlaying ? <Stop /> : <PlayArrow />}
              </IconButton>
            )}
          </div>
        </div>
      </Link>

      <Link to={`/piece/${pieceId}`} className={styles['preview__title']}>
        {piece.title}
      </Link>
      <div className={styles['preview__subtitle']}>{subtitle}</div>
    </div>
  );
};

export default Preview;
