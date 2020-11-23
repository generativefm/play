import React, { useCallback } from 'react';
import { byId } from '@generative-music/pieces-alex-bainter';
import { Link } from 'react-router-dom';
import { MoreVert, PlayArrow } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import userPlayedPiece from '../playback/user-played-piece';
import IconButton from '../button/icon-button';
import styles from './preview.module.scss';

const getReleaseDate = ({ releaseDate }) => releaseDate.getFullYear();

const Preview = ({ pieceId, width, getSubtitle = getReleaseDate }) => {
  const piece = byId[pieceId];
  const dispatch = useDispatch();

  const handlePrimaryClick = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(userPlayedPiece({ pieceId }));
    },
    [dispatch, pieceId]
  );

  const subtitle = getSubtitle(piece);

  return (
    <div className={styles.preview} style={{ width }}>
      <Link to={`/piece/${pieceId}`}>
        <div
          className={styles['preview__image']}
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
          <div className={styles['preview__image__action']}>
            <IconButton onClick={handlePrimaryClick}>
              <PlayArrow />
            </IconButton>
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
