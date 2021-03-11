import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './switch.module.scss';

const Switch = ({ isActive, onClick, isDisabled = false }) => {
  return (
    <button
      type="button"
      className={classnames(styles.switch, {
        [styles['switch--is-active']]: isActive,
        [styles['switch--is-disabled']]: isDisabled,
      })}
      onClick={onClick}
      disabled={isDisabled}
    >
      <div className={styles['switch__rail']} />
      <div className={styles['switch__cap']} />
    </button>
  );
};

Switch.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

export default Switch;
