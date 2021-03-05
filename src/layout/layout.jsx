import React, { useCallback, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import TopNav from '../top-nav/top-nav';
import BottomNav from '../bottom-nav/bottom-nav';
import useIsNarrowScreen from './use-is-narrow-screen';
import selectCurrentPieceId from '../queue/select-current-piece-id';
import selectIsPlaybackOpen from '../playback/select-is-playback-open';
import userOpenedPlayback from '../playback/user-opened-playback';
import AnonymousDataImportedBanner from '../settings/anonymous-data-imported-banner';
import TopBar from '../top-bar/top-bar';
import withSuspense from '../loading/with-suspense';
import styles from './layout.module.scss';

const Browse = withSuspense(() => import('../browse/browse'));
const BrowseGrid = withSuspense(() => import('../browse/browse-grid'));
const Flavor = withSuspense(() => import('../flavor/flavor'));
const Piece = withSuspense(() => import('../piece/piece'));
const Library = withSuspense(() => import('../library/library'));
const LibraryGrid = withSuspense(() => import('../library/library-grid'));
const Settings = withSuspense(() => import('../settings/settings'));
const About = withSuspense(() => import('../about/about'));
const Donate = withSuspense(() => import('../donate/donate'));
const ControlBar = withSuspense(() => import('../controls/control-bar'));
const Playback = withSuspense(() => import('../playback/playback'));
const PlaybackWithControls = withSuspense(() =>
  import('../playback/playback-with-controls')
);

const Layout = () => {
  const isNarrowScreen = useIsNarrowScreen();
  const currentPieceId = useSelector(selectCurrentPieceId);
  const isPlaybackOpen = useSelector(selectIsPlaybackOpen);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleControlBarExpandCollapse = useCallback(() => {
    if (isPlaybackOpen) {
      history.goBack();
      return;
    }
    dispatch(userOpenedPlayback());
  }, [isPlaybackOpen, dispatch, history]);

  return (
    <div
      className={classnames(styles.layout, {
        [styles['layout--has-controls']]: currentPieceId !== null,
        [styles['layout--has-playback-content']]: isPlaybackOpen,
      })}
    >
      {!isNarrowScreen && <TopNav />}
      {isNarrowScreen && <TopBar />}
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
            <Route path="/donate" component={Donate} />
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
            {isNarrowScreen ? <PlaybackWithControls /> : <Playback />}
          </div>
        </CSSTransition>
      </div>
      <CSSTransition
        classNames={{
          appear: styles['layout__control-bar--will-enter'],
          appearActive: styles['layout__control-bar--is-entering'],
          enter: styles['layout__control-bar--will-enter'],
          enterActive: styles['layout__control-bar--is-entering'],
        }}
        timeout={200}
        appear
        unmountOnExit
        in={Boolean(currentPieceId)}
      >
        <div className={classnames(styles['layout__control-bar'])}>
          <ControlBar onExpandCollapse={handleControlBarExpandCollapse} />
        </div>
      </CSSTransition>
      {isNarrowScreen && <BottomNav />}
    </div>
  );
};
export default Layout;
