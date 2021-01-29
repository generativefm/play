import React from 'react';
import Skeleton from './skeleton';
import styles from '../piece/preview.module.scss';

const PreviewSkeleton = ({ width }) => (
  <div className={styles.preview} style={{ width }}>
    <Skeleton
      className={styles['preview__image']}
      style={{
        width: `calc(${width} - 1rem)`,
        height: `calc(${width} - 1rem)`,
      }}
      useDiv={true}
    />
    <div className={styles['preview__title']}>
      <Skeleton>Loading title...</Skeleton>
    </div>
    <div className={styles['preview__subtitle']}>
      <Skeleton>Loading subtitle...</Skeleton>
    </div>
  </div>
);

export default PreviewSkeleton;
