import React from 'react';
import styles from './soft-ad.module.scss';

const SoftAd = ({ children, href }) => {
  return (
    <a
      className={styles['soft-ad']}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  );
};

export default SoftAd;
