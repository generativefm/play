import React, { useState, useCallback } from 'react';
import classnames from 'classnames';
import styles from './text-button.module.scss';

const TextButton = ({
  children,
  onClick,
  isPrimary,
  isDisabled,
  className,
}) => {
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  const handleTouchStart = useCallback(() => {
    setHasBeenTouched(true);
  }, []);

  return (
    <button
      className={classnames(styles['text-button'], className, {
        [styles['text-button--is-primary']]: isPrimary,
        [styles['text-button--is-disabled']]: isDisabled,
        [styles['text-button--is-not-touched']]: !hasBeenTouched,
      })}
      type="button"
      onClick={onClick}
      onTouchStart={handleTouchStart}
    >
      {children}
    </button>
  );
};

export default TextButton;
