import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthButton from '../user/auth-button';
import styles from './top-nav.module.scss';

const TopNav = () => {
  return (
    <header className={styles['top-nav']}>
      <div className={styles.title}>Generative.fm Play</div>
      <nav className={styles.nav}>
        <NavLink
          className={styles.nav__link}
          activeClassName={styles['nav__link--is-active']}
          to="/browse"
        >
          Browse
        </NavLink>
        <NavLink
          className={styles.nav__link}
          activeClassName={styles['nav__link--is-active']}
          to="/library"
        >
          Library
        </NavLink>
        <NavLink
          className={styles.nav__link}
          activeClassName={styles['nav__link--is-active']}
          to="/donate"
        >
          Donate
        </NavLink>
      </nav>

      <AuthButton />
    </header>
  );
};

export default TopNav;
