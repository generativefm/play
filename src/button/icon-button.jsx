import React from 'react';
import classnames from 'classnames';
import styles from './icon-button.module.scss';

const IconButton = ({
  children,
  onClick,
  withBackground = false,
  isDisabled = false,
}) => (
  <button
    type="button"
    className={classnames(styles['icon-button'], {
      [styles['icon-button--has-background']]: withBackground,
      [styles['icon-button--is-disabled']]: isDisabled,
    })}
    onClick={onClick}
  >
    {children}
  </button>
);

export default IconButton;
