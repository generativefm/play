import React from 'react';
import classnames from 'classnames';
import styles from './radio.module.scss';

const Radio = ({ label, isChecked, onCheck }) => {
  return (
    <div className={styles['radio']} onClick={onCheck}>
      <div
        className={classnames(styles['radio__control'], {
          [styles['radio__control--is-checked']]: isChecked,
        })}
      />
      {label}
    </div>
  );
};

export default Radio;
