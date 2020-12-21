import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MusicNote as BrowseIcon,
  LibraryMusic as LibraryIcon,
  Favorite as DonateIcon,
} from '@material-ui/icons';
import styles from './bottom-nav.module.scss';

const BottomNav = () => (
  <nav className={styles['bottom-nav']}>
    <NavLink className={styles['bottom-nav__link']} to="/browse">
      <BrowseIcon />
      Browse
    </NavLink>
    <NavLink className={styles['bottom-nav__link']} to="/library">
      <LibraryIcon />
      Library
    </NavLink>
    <NavLink className={styles['bottom-nav__link']} to="/donate">
      <DonateIcon />
      Donate
    </NavLink>
  </nav>
);

export default BottomNav;
