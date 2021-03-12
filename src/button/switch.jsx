import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './switch.module.scss';

const Switch = (props) => {
  const { isActive, onClick, isDisabled = false, title } = props;
  return (
    <button
      type="button"
      className={classnames(styles.switch, {
        [styles['switch--is-active']]: isActive,
        [styles['switch--is-disabled']]: isDisabled,
      })}
      onClick={onClick}
      disabled={isDisabled}
      data-cy={props['data-cy']}
      title={title}
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
  title: PropTypes.string,
};

export default Switch;
