import React from 'react';
import Header from '../header/header';
import layoutStyles from './layout.module.scss';

const Layout = () => (
  <div className={layoutStyles.layout}>
    <Header />
  </div>
);

export default Layout;
