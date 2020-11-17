import React from 'react';
import { useSelector } from 'react-redux';
import { byId } from '@generative-music/pieces-alex-bainter';
import {
  ThumbDownOutlined,
  ThumbUpOutlined,
  MoreVert,
} from '@material-ui/icons';
import IconButton from '../button/icon-button';
import selectCurrentPieceId from './queue/select-current-piece-id';
import styles from './current-piece.module.scss';

const CurrentPiece = () => {
  const currentPieceId = useSelector(selectCurrentPieceId);

  if (!currentPieceId || !byId[currentPieceId]) {
    return null;
  }

  const piece = byId[currentPieceId];

  return (
    <div className={styles['current-piece']}>
      <img className={styles['current-piece__image']} src={piece.imageSrc} />
      <div className={styles['current-piece__more']}>
        <div className={styles['current-piece__more__title']}>
          {piece.title}
        </div>
        <div className={styles['current-piece__more__controls']}>
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
      </div>
    </div>
  );
};

export default CurrentPiece;
