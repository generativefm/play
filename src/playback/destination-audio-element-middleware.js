import destinationAudioElement from './destination-audio-element';
import selectPlaybackStatus from './select-playback-status';

const selectIsStopped = (state) => selectPlaybackStatus(state) === 'stopped';

const destinationAudioElementMiddleware = (store) => (next) => (action) => {
  const wasStopped = selectIsStopped(store.getState());
  const result = next(action);
  const isStopped = selectIsStopped(store.getState());
  if (wasStopped === isStopped) {
    return result;
  }
  if (isStopped) {
    destinationAudioElement.pause();
    return result;
  }
  destinationAudioElement.play();
  return result;
};

export default destinationAudioElementMiddleware;
