import React, { useRef } from 'react';
import classnames from 'classnames';
import styles from './checkbox.module.scss';

const Checkbox = ({ label, isChecked, onCheck }) => {
  const inputRef = useRef(null);

  return (
    <div className={styles['checkbox']} onClick={onCheck}>
      <div
        className={classnames(styles['checkbox__control'], {
          [styles['checkbox__control--is-checked']]: isChecked,
        })}
      />
      {label}
      <input
        ref={inputRef}
        type="checkbox"
        className={styles['checkbox__input']}
        checked={isChecked}
        readOnly
      />
    </div>
  );
};

export default Checkbox;
