import React from 'react';
import { byId } from '@generative-music/pieces-alex-bainter';
import { Link } from 'react-router-dom';
import { MoreVert, PlayArrow } from '@material-ui/icons';
import IconButton from '../button/icon-button';
import styles from './element.module.scss';

const Element = ({ id, getSubtitle }) => {
  const piece = byId[id];
  const subtitle = getSubtitle(piece);
  return (
    <div className={styles['element']}>
      <Link to={`/piece/${id}`}>
        <div
          className={styles['element__image']}
          style={{ backgroundImage: `url(${piece.imageSrc})` }}
        >
          <div className={styles['element__image__more']}>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
          <div className={styles['element__image__action']}>
            <IconButton>
              <PlayArrow />
            </IconButton>
          </div>
        </div>
      </Link>

      <Link to={`/piece/${id}`} className={styles['element__title']}>
        {piece.title}
      </Link>
      <div className={styles['element__subtitle']}>{subtitle}</div>
    </div>
  );
};

export default Element;
