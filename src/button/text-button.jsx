import React from 'react';
import styles from './text-button.module.scss';

const TextButton = ({ children, onClick }) => (
  <button className={styles['text-button']} type="button" onClick={onClick}>
    {children}
  </button>
);

export default TextButton;
