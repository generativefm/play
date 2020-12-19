import React from 'react';
import classnames from 'classnames';
import styles from './icon-button.module.scss';

const IconButton = ({ children, onClick, withBackground }) => (
  <button
    type="button"
    className={classnames(styles['icon-button'], {
      [styles['icon-button--has-background']]: withBackground,
    })}
    onClick={onClick}
  >
    {children}
  </button>
);

export default IconButton;
