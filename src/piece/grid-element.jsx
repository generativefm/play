import React from 'react';
import { byId } from '@generative-music/pieces-alex-bainter';
import { Link } from 'react-router-dom';
import { MoreVert, PlayArrow } from '@material-ui/icons';
import IconButton from '../button/icon-button';
import styles from './grid-element.module.scss';

const GridElement = ({ id, subtitle }) => {
  const piece = byId[id];
  return (
    <div className={styles['grid-element']}>
      <Link to={`/piece/${id}`}>
        <div
          className={styles['grid-element__image']}
          style={{ backgroundImage: `url(${piece.imageSrc})` }}
        >
          <div className={styles['grid-element__image__more']}>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
          <div className={styles['grid-element__image__action']}>
            <IconButton>
              <PlayArrow />
            </IconButton>
          </div>
        </div>
      </Link>

      <Link to={`/piece/${id}`} className={styles['grid-element__title']}>
        {piece.title}
      </Link>
      <div className={styles['grid-element__subtitle']}>{subtitle}</div>
    </div>
  );
};

export default GridElement;
