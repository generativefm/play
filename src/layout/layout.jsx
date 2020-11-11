import React from 'react';
import { Switch, Route } from 'react-router-dom';
import classnames from 'classnames';
import TopNav from '../top-nav/top-nav';
import BottomNav from '../bottom-nav/bottom-nav';
import ControlBar from '../controls/control-bar';
import Piece from '../piece/piece';
import Browse from '../browse/browse';
import useIsNarrowScreen from './use-is-narrow-screen';
import styles from './layout.module.scss';

const Layout = () => {
  const isNarrowScreen = useIsNarrowScreen();

  return (
    <div
      className={classnames(styles.layout, {
        [styles['layout--is-narrow']]: isNarrowScreen,
      })}
    >
      {!isNarrowScreen && <TopNav />}
      <div className={styles['layout__content']}>
        <Switch>
          <Route path="/" exact component={Browse} />
          <Route path="/piece/:id" component={Piece} />
        </Switch>
      </div>
      <ControlBar />
      {isNarrowScreen && <BottomNav />}
    </div>
  );
};
export default Layout;
