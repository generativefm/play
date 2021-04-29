import React from 'react';
import AuthButton from '../user/auth-button';
import CastButton from '../cast/cast-button';
import SearchButton from '../search/search-button';
import styles from './top-bar.module.scss';

const TopBar = () => {
  return (
    <header className={styles['top-bar']}>
      <div className={styles['top-bar__title']}>
        Generative.fm{' '}
        <span className={styles['top-bar__title__product-name']}>Play</span>
      </div>
      <div className={styles['top-bar__auth']}>
        <CastButton />
        <SearchButton />
        <AuthButton />
      </div>
    </header>
  );
};

export default TopBar;
