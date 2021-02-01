import React from 'react';
import Skeleton from './skeleton';
import styles from '../piece/preview.module.scss';

const PreviewSkeleton = ({ width, isAnimated = true }) => (
  <div
    className={styles.preview}
    style={{ width, height: `calc(${width} * 1.4)` }}
  >
    <Skeleton
      className={styles['preview__image']}
      style={{
        width: `calc(${width} - 1rem)`,
        height: `calc(${width} - 1rem)`,
      }}
      useDiv={true}
      isAnimated={isAnimated}
    />
    <div className={styles['preview__title']}>
      <Skeleton isAnimated={isAnimated}>Loading title...</Skeleton>
    </div>
    <div className={styles['preview__subtitle']}>
      <Skeleton isAnimated={isAnimated}>Loading subtitle...</Skeleton>
    </div>
  </div>
);

export default PreviewSkeleton;
