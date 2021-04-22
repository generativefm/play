import React from 'react';
import PropTypes from 'prop-types';
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

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default Checkbox;
