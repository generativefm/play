import React from 'react';
import classnames from 'classnames';
import styles from './skeleton.module.scss';

const Skeleton = ({
  children,
  isLoading = true,
  className,
  style,
  useDiv = false,
}) => {
  if (!isLoading) {
    return children;
  }
  if (useDiv) {
    return (
      <div className={classnames(styles['skeleton'], className)} style={style}>
        {children}
      </div>
    );
  }
  return (
    <span className={classnames(styles['skeleton'], className)} style={style}>
      {children}
    </span>
  );
};

export default Skeleton;
