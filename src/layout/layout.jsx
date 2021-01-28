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
import BrowseGrid from '../browse/browse-grid';
import LibraryGrid from '../library/library-grid';
import Settings from '../settings/settings';
import AnonymousDataImportedBanner from '../settings/anonymous-data-imported-banner';
import About from '../about/about';
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
      <AnonymousDataImportedBanner />
      <div className={styles['layout__content']}>
        <div className={styles['layout__content__main']}>
          <Switch>
            <Route path="/browse" exact component={Browse} />
            <Route path="/browse/all" exact component={BrowseGrid} />
            <Route path="/browse/flavor/:flavor" exact component={Flavor} />
            <Route path="/generator/:id" exact component={Piece} />
            <Route path="/library" exact component={Library} />
            <Route path="/library/history" exact component={LibraryGrid} />
            <Route path="/library/likes" exact component={LibraryGrid} />
            <Route path="/library/playtime" exact component={LibraryGrid} />
            <Route path="/settings" component={Settings} />
            <Route path="/about" component={About} />
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
