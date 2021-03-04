import React, { useState, useCallback } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './text-button.module.scss';

const TextButton = (props) => {
  const {
    children,
    onClick,
    isPrimary = false,
    isDisabled = false,
    className,
  } = props;
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
      data-cy={props['data-cy']}
    >
      {children}
    </button>
  );
};

TextButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  isPrimary: PropTypes.bool,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
};

export default TextButton;
