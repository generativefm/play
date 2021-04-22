import React from 'react';
import PropTypes from 'prop-types';
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

Radio.propTypes = {
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default Radio;
