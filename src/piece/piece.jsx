import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { byId } from '@generative-music/pieces-alex-bainter';
import {
  PlayArrow,
  ThumbUpOutlined,
  ThumbDownOutlined,
  MoreVert,
} from '@material-ui/icons';
import formatReleaseDate from '../dates/format-release-date';
import TextButton from '../button/text-button';
import IconButton from '../button/icon-button';
import styles from './piece.module.scss';

const Piece = () => {
  const { id } = useParams();

  if (!id && !byId[id]) {
    return <Redirect to="/" />;
  }

  const piece = byId[id];

  return (
    <div className={styles.piece}>
      <div className={styles.info}>
        <img className={styles['info__image']} src={piece.imageSrc} />
        <div className={styles['info__other']}>
          <div className={styles['info__other__title']}>{piece.title}</div>
          <div className={styles['info__other__controls']}>
            <TextButton>
              <PlayArrow />
              Play
            </TextButton>
            <IconButton>
              <ThumbDownOutlined />
            </IconButton>
            <IconButton>
              <ThumbUpOutlined />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
          <div className={styles['info__other__stats']}>
            <p>{formatReleaseDate(piece.releaseDate)}</p>
            <p>{piece.tags.join('/')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Piece;
