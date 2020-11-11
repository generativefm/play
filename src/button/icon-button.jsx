import React from 'react';
import styles from './icon-button.module.scss';

const IconButton = ({ children }) => (
  <button type="button" className={styles['icon-button']}>
    {children}
  </button>
);

export default IconButton;
