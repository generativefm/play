import React from 'react';
import classnames from 'classnames';
import styles from './text-skeleton.module.scss';

const TextSkeleton = ({ className, style = {} }) => (
  <div
    className={classnames(styles['text-skeleton'], className)}
    style={{ style }}
  ></div>
);

export default TextSkeleton;
