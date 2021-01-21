import React from 'react';
import classnames from 'classnames';
import styles from './text-button.module.scss';

const TextButton = ({ children, onClick, isPrimary }) => (
  <button
    className={classnames(styles['text-button'], {
      [styles['text-button--is-primary']]: isPrimary,
    })}
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
);

export default TextButton;
