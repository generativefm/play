import { USER_ENABLED_AUTOCHANGE } from './user-enabled-autochange';
import { USER_DISABLED_AUTOCHANGE } from './user-disabled-autochange';
import selectPlaybackStatus from '../playback/select-playback-status';
import selectQueue from '../queue/select-queue';
import playNext from '../queue/play-next';
import selectAutochange from './select-autochange';

const autochangeMiddleware = (store) => (next) => {
  let currentInterval;
  const scheduleAutochange = (delay) => {
    clearInterval(currentInterval);
    currentInterval = setInterval(() => {
      const { pieceIds, index, isLoopActive } = selectQueue(store.getState());
      playNext({ pieceIds, index, isLoopActive, dispatch: store.dispatch });
    }, delay);
  };
  return (action) => {
    if (action.type === USER_DISABLED_AUTOCHANGE) {
      clearInterval(currentInterval);
      return next(action);
    }
    if (
      action.type === USER_ENABLED_AUTOCHANGE &&
      typeof action.payload.interval === 'number'
    ) {
      scheduleAutochange(action.payload.interval);
      return next(action);
    }
    const previousState = store.getState();
    const result = next(action);
    const nextState = store.getState();
    const nextPlaybackStatus = selectPlaybackStatus(nextState);
    if (nextPlaybackStatus === 'stopped') {
      clearInterval(currentInterval);
      return result;
    }
    const previousPlaybackStatus = selectPlaybackStatus(previousState);
    if (previousPlaybackStatus !== 'stopped') {
      return result;
    }
    const { isEnabled, interval } = selectAutochange(nextState);
    if (!isEnabled || typeof interval !== 'number') {
      return result;
    }
    scheduleAutochange(interval);
    return result;
  };
};

export default autochangeMiddleware;
