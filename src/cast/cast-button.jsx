import React from 'react';
import IconButton from '../button/icon-button';
import styles from './cast-button.module.scss';

const CastButton = () => {
  if (
    !window.chrome ||
    !window.chrome.cast ||
    !window.chrome.cast.isAvailable
  ) {
    return null;
  }

  return (
    <IconButton>
      <div className={styles['cast-button']}>
        <google-cast-launcher />
      </div>
    </IconButton>
  );
};

export default CastButton;
