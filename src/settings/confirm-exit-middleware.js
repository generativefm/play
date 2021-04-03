import selectConfirmExitDuringPlayback from './select-confirm-exit-during-playback';
import selectPlaybackStatus from '../playback/select-playback-status';

const handleBeforeUnload = (event) => {
  event.preventDefault();
  event.returnValue = '';
  return '';
};

const confirmExitMiddleware = (store) => (next) => (action) => {
  if (process.env.IS_NATIVE_APP_HOST) {
    return next(action);
  }
  const previousState = store.getState();
  const wasEnabled = selectConfirmExitDuringPlayback(previousState);
  const wasPlaying = selectPlaybackStatus(previousState) === 'playing';
  const result = next(action);
  const nextState = store.getState();
  const isEnabled = selectConfirmExitDuringPlayback(nextState);
  const isPlaying = selectPlaybackStatus(nextState) === 'playing';
  if (
    (!wasEnabled && isEnabled && isPlaying) ||
    (!wasPlaying && isPlaying && isEnabled)
  ) {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return result;
  }
  if ((wasEnabled && !isEnabled) || (isEnabled && wasPlaying && !isPlaying)) {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    return result;
  }
  return result;
};

export default confirmExitMiddleware;
