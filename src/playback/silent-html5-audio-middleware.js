import silence from './silence.mp3';
import selectPlaybackStatus from './select-playback-status';

const selectIsStopped = (state) => selectPlaybackStatus(state) === 'stopped';

const silentHtml5AudioMiddleware = (store) => (next) => {
  const audioEl = document.createElement('audio');
  audioEl.src = silence;
  audioEl.loop = true;
  return (action) => {
    const wasStopped = selectIsStopped(store.getState());
    const result = next(action);
    const isStopped = selectIsStopped(store.getState());
    if (wasStopped === isStopped) {
      return result;
    }
    if (isStopped) {
      audioEl.pause();
      return result;
    }
    audioEl.play();
    return result;
  };
};

export default silentHtml5AudioMiddleware;
