import { applyMiddleware } from 'redux';
import { snackbarMiddleware } from '@generative.fm/web-ui';
import playbackMiddleware from '../playback/playback-middleware';
import storeUserStateMiddleware from '../user/store-user-state-middleware';
import synchronizeUserMiddleware from '../user/synchronize-user-middleware';
import persistStateMiddleware from '../storage/persist-state-middleware';
import anonymousImportMiddleware from '../settings/anonymous-import-middleware';
import timerMiddleware from '../scene/timer-middleware';
import autochangeMiddleware from '../scene/autochange-middleware';
import shuffleMiddleware from '../queue/shuffle-middleware';
import mediaSessionMiddleware from '../playback/media-session-middleware';
import confirmExitMiddleware from '../settings/confirm-exit-middleware';
import sentryMiddleware from '../sentry/sentry-middleware';
import silentHtml5AudioMiddleware from '../playback/silent-html5-audio-middleware';
import castMiddleware from '../cast/cast-middleware';

const middlewares = [
  sentryMiddleware,
  anonymousImportMiddleware,
  playbackMiddleware,
  castMiddleware,
  silentHtml5AudioMiddleware,
  storeUserStateMiddleware,
  synchronizeUserMiddleware,
  persistStateMiddleware,
  timerMiddleware,
  autochangeMiddleware,
  shuffleMiddleware,
  snackbarMiddleware,
  mediaSessionMiddleware,
  confirmExitMiddleware,
];

const applyMiddlewareEnhancer = applyMiddleware(...middlewares);

export default applyMiddlewareEnhancer;
