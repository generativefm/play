import React from 'react';
import styles from './preview-skeleton.module.scss';

const PreviewSkeleton = ({ width }) => (
  <div className={styles['preview-skeleton']} style={{ width }}>
    <div
      className={styles['preview-skeleton__image']}
      style={{
        width: `calc(${width} - 2rem)`,
        height: `calc(${width} - 2rem)`,
      }}
    />
    <div className={styles['preview-skeleton__title']} />
    <div className={styles['preview-skeleton__subtitle']} />
  </div>
);

export default PreviewSkeleton;
