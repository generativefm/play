import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './switch.module.scss';

const Switch = ({ isActive }) => {
  return (
    <div
      className={classnames(styles.switch, {
        [styles['switch--is-active']]: isActive,
      })}
    >
      <div className={styles['switch__rail']} />
      <div className={styles['switch__cap']} />
    </div>
  );
};

Switch.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default Switch;
