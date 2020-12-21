import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import TopNav from '../top-nav/top-nav';
import BottomNav from '../bottom-nav/bottom-nav';
import ControlBar from '../controls/control-bar';
import Piece from '../piece/piece';
import Browse from '../browse/browse';
import Flavor from '../flavor/flavor';
import Playback from '../playback/playback';
import Library from '../library/library';
import useIsNarrowScreen from './use-is-narrow-screen';
import selectCurrentPieceId from '../queue/select-current-piece-id';
import selectIsPlaybackOpen from '../playback/select-is-playback-open';
import styles from './layout.module.scss';

const Layout = () => {
  const isNarrowScreen = useIsNarrowScreen();
  const currentPieceId = useSelector(selectCurrentPieceId);
  const isPlaybackOpen = useSelector(selectIsPlaybackOpen);

  return (
    <div
      className={classnames(styles.layout, {
        [styles['layout--is-narrow']]: isNarrowScreen,
        [styles['layout--has-controls']]: currentPieceId !== null,
        [styles['layout--has-playback-content']]: isPlaybackOpen,
      })}
    >
      {!isNarrowScreen && <TopNav />}
      <div className={styles['layout__content']}>
        <div className={styles['layout__content__main']}>
          <Switch>
            <Route path="/browse" component={Browse} />
            <Route path="/piece/:id" component={Piece} />
            <Route path="/flavor/:flavor" component={Flavor} />
            <Route path="/library" component={Library} />
            <Redirect to="/browse" />
          </Switch>
        </div>
        <CSSTransition
          in={isPlaybackOpen}
          timeout={200}
          unmountOnExit
          classNames={{
            enter: styles['layout__content__playback--will-enter'],
            enterActive: styles['layout__content__playback--is-entering'],
            exit: styles['layout__content__playback--will-exit'],
            exitActive: styles['layout__content__playback--is-exiting'],
          }}
        >
          <div className={styles['layout__content__playback']}>
            <Playback />
          </div>
        </CSSTransition>
      </div>
      {currentPieceId && <ControlBar />}
      {isNarrowScreen && <BottomNav />}
    </div>
  );
};
export default Layout;
