import React from 'react';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import selectPlaybackStatus from '../playback/select-playback-status';
import styles from './soft-ad.module.scss';

const SoftAd = ({ children, href }) => {
  const isStopped = useSelector(selectPlaybackStatus) === 'stopped';
  return (
    <a
      className={styles['soft-ad']}
      href={href}
      target={isStopped ? '' : '_blank'}
      rel={isStopped ? '' : 'noreferrer noopener'}
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
