import React from 'react';
import classnames from 'classnames';
import styles from './checkbox.module.scss';

const Checkbox = ({ label, isChecked, onCheck }) => {
  return (
    <div className={styles['checkbox']} onClick={onCheck}>
      <div
        className={classnames(styles['checkbox__control'], {
          [styles['checkbox__control--is-checked']]: isChecked,
        })}
      />
      {label}
    </div>
  );
};

export default Checkbox;
