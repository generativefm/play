import React, { useState, useCallback } from 'react';
import classnames from 'classnames';
import styles from './icon-button.module.scss';

const IconButton = ({
  children,
  onClick,
  withBackground = false,
  isDisabled = false,
  isActive = false,
  isTicking = false,
  isFloating = false,
}) => {
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  const handleTouchStart = useCallback(() => {
    setHasBeenTouched(true);
  }, []);

  return (
    <button
      type="button"
      className={classnames(styles['icon-button'], {
        [styles['icon-button--has-background']]: withBackground,
        [styles['icon-button--is-disabled']]: isDisabled,
        [styles['icon-button--is-active']]: !isDisabled && isActive,
        [styles['icon-button--is-ticking']]:
          !isDisabled && isActive && isTicking,
        [styles['icon-button--is-floating']]: isFloating,
        [styles['icon-button--is-not-touched']]: !hasBeenTouched,
      })}
      onClick={onClick}
      onTouchStart={handleTouchStart}
    >
      {children}
    </button>
  );
};

export default IconButton;
