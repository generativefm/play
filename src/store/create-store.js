import {
  createStore as _createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { synchronizedUserReducer } from '@generative.fm/user';
import queueReducer from '../queue/queue-reducer';
import playbackReducer from '../playback/playback-reducer';
import pieceReducer from '../piece/piece-reducer';
import masterGainReducer from '../volume/master-gain-reducer';
import playbackMiddleware from '../playback/playback-middleware';
import storeUserStateMiddleware from '../user/store-user-state-middleware';
import synchronizeUserMiddleware from '../user/synchronize-user-middleware';
import persistStateMiddleware from '../storage/persist-state-middleware';
import settingsReducer from '../settings/settings-reducer';
import anonymousImportMiddleware from '../settings/anonymous-import-middleware';
import timerMiddleware from '../timer/timer-middleware';
import timerReducer from '../timer/timer-reducer';
import shuffleMiddleware from '../queue/shuffle-middleware';
import snackbarMiddleware from '../snackbar/snackbar-middleware';
import mediaSessionMiddleware from '../playback/media-session-middleware';
import silentHtml5AudioMiddleware from '../playback/silent-html5-audio-middleware';
import confirmExitMiddleware from '../settings/confirm-exit-middleware';
import sentryMiddleware from '../sentry/sentry-middleware';

const createStore = (preloadedState) =>
  _createStore(
    combineReducers({
      queue: queueReducer,
      playback: playbackReducer,
      user: synchronizedUserReducer,
      piece: pieceReducer,
      masterGain: masterGainReducer,
      settings: settingsReducer,
      timer: timerReducer,
    }),
    preloadedState,
    applyMiddleware(
      sentryMiddleware,
      anonymousImportMiddleware,
      playbackMiddleware,
      storeUserStateMiddleware,
      synchronizeUserMiddleware,
      persistStateMiddleware,
      timerMiddleware,
      shuffleMiddleware,
      snackbarMiddleware,
      mediaSessionMiddleware,
      silentHtml5AudioMiddleware,
      confirmExitMiddleware
    )
  );

export default createStore;
