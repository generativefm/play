import React from 'react';
import styles from './circular-loading-indicator.module.scss';

const CircularLoadingIndicator = () => {
  return (
    <div className={styles['circular-loading-indicator']}>
      <div className={styles['circular-loading-indicator__ring']} />
    </div>
  );
};

export default CircularLoadingIndicator;
