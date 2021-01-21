import React from 'react';
import classnames from 'classnames';
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

export default Switch;
