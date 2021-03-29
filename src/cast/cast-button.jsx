import React from 'react';
import IconButton from '../button/icon-button';
import styles from './cast-button.module.scss';

const CastButton = () => (
  <IconButton>
    <div className={styles['cast-button']}>
      <google-cast-launcher />
    </div>
  </IconButton>
);

export default CastButton;
