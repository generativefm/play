import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './skeleton.module.scss';

const Skeleton = ({
  children,
  className,
  style,
  isLoading = true,
  useDiv = false,
  isAnimated = true,
}) => {
  if (!isLoading) {
    return children;
  }
  if (useDiv) {
    return (
      <div
        className={classnames(styles['skeleton'], className, {
          [styles['skeleton--is-animated']]: isAnimated,
        })}
        style={style}
      >
        {children}
      </div>
    );
  }
  return (
    <span
      className={classnames(styles['skeleton'], className, {
        [styles['skeleton--is-animated']]: isAnimated,
      })}
      style={style}
    >
      {children}
    </span>
  );
};

Skeleton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  isLoading: PropTypes.bool,
  useDiv: PropTypes.bool,
  isAnimated: PropTypes.bool,
};

export default Skeleton;
