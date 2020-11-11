import React from 'react';
import styles from './text-button.module.scss';

const TextButton = ({ children }) => (
  <button className={styles['text-button']} type="button">
    {children}
  </button>
);

export default TextButton;
