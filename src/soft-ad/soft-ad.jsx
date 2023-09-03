import React from 'react';
import propTypes from 'prop-types';
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

SoftAd.propTypes = {
  children: propTypes.node.isRequired,
  href: propTypes.string.isRequired,
};

export default SoftAd;
