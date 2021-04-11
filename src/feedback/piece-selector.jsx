import React from 'react';
import pieces from '@generative-music/pieces-alex-bainter';
import { ArrowDropDown } from '@material-ui/icons';
import styles from './piece-selector.module.scss';

const PieceSelector = ({ selectedPieceId }) => {
  return (
    <div className={styles['piece-selector']}>
      {pieces.map(({ id, title, imageSrc }) => (
        <div className={styles['piece-selector__piece']} key={id}>
          <img
            src={imageSrc}
            className={styles['piece-selector__piece__image']}
          />
          <div className={styles['piece-selector__piece__title']}>{title}</div>
          <ArrowDropDown />
        </div>
      ))}
    </div>
  );
};

export default PieceSelector;
