import React from 'react';
import classnames from 'classnames';
import styles from './icon-button.module.scss';

const IconButton = ({
  children,
  onClick,
  withBackground = false,
  isDisabled = false,
  isActive = false,
  isTicking = false,
}) => (
  <button
    type="button"
    className={classnames(styles['icon-button'], {
      [styles['icon-button--has-background']]: withBackground,
      [styles['icon-button--is-disabled']]: isDisabled,
      [styles['icon-button--is-active']]: !isDisabled && isActive,
      [styles['icon-button--is-ticking']]: !isDisabled && isActive && isTicking,
    })}
    onClick={onClick}
  >
    {children}
  </button>
);

export default IconButton;
