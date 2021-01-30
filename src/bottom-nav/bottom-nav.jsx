import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MusicNote as BrowseIcon,
  LibraryMusic as LibraryIcon,
  Favorite as DonateIcon,
} from '@material-ui/icons';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import selectCurrentPieceId from '../queue/select-current-piece-id';
import styles from './bottom-nav.module.scss';

const BottomNav = () => {
  const currentPieceId = useSelector(selectCurrentPieceId);
  return (
    <nav
      className={classnames(styles['bottom-nav'], {
        [styles['bottom-nav--has-controls-above']]: Boolean(currentPieceId),
      })}
    >
      <NavLink
        className={styles['bottom-nav__link']}
        activeClassName={styles['bottom-nav__link--is-active']}
        to="/browse"
      >
        <BrowseIcon />
        Browse
      </NavLink>
      <NavLink
        className={styles['bottom-nav__link']}
        activeClassName={styles['bottom-nav__link--is-active']}
        to="/library"
      >
        <LibraryIcon />
        Library
      </NavLink>
      <NavLink
        className={styles['bottom-nav__link']}
        activeClassName={styles['bottom-nav__link--is-active']}
        to="/donate"
      >
        <DonateIcon />
        Donate
      </NavLink>
    </nav>
  );
};

export default BottomNav;
