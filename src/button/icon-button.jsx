import React from 'react';
import styles from './icon-button.module.scss';

const IconButton = ({ children, onClick }) => (
  <button type="button" className={styles['icon-button']} onClick={onClick}>
    {children}
  </button>
);

export default IconButton;
