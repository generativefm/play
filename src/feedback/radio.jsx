import React, { useRef } from 'react';
import classnames from 'classnames';
import styles from './radio.module.scss';

const Radio = ({ label, isChecked, onCheck }) => {
  const inputRef = useRef(null);

  return (
    <div className={styles['radio']} onClick={onCheck}>
      <div
        className={classnames(styles['radio__control'], {
          [styles['radio__control--is-checked']]: isChecked,
        })}
      />
      {label}
      <input
        ref={inputRef}
        type="radio"
        className={styles['radio__input']}
        checked={isChecked}
      />
    </div>
  );
};

export default Radio;
