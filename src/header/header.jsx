import React from 'react';
import { NavLink } from 'react-router-dom';
import headerStyles from './header.module.scss';

console.log(headerStyles);

const Header = () => (
  <header className={headerStyles.header}>
    <div className={headerStyles.title}>Generative.fm Play</div>
    <nav className={headerStyles.nav}>
      <NavLink className={headerStyles.nav__link} to="/browse">
        Browse
      </NavLink>
      <NavLink className={headerStyles.nav__link} to="/library">
        Library
      </NavLink>
      <NavLink className={headerStyles.nav__link} to="/donate">
        Donate
      </NavLink>
    </nav>
  </header>
);

export default Header;
