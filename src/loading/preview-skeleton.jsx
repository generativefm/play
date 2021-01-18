import React from 'react';
import TextSkeleton from './text-skeleton';
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
    <TextSkeleton className={styles['preview-skeleton__title']} />
    <TextSkeleton className={styles['preview-skeleton__subtitle']} />
  </div>
);

export default PreviewSkeleton;
