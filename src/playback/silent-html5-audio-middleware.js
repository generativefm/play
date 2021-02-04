import silence from './silence.mp3';
import selectPlaybackStatus from './select-playback-status';

const selectIsPlaying = (state) => selectPlaybackStatus(state) === 'playing';

const silentHtml5AudioMiddleware = (store) => (next) => {
  const audioEl = document.createElement('audio');
  audioEl.src = silence;
  audioEl.loop = true;
  return (action) => {
    const wasPreviouslyPlaying = selectIsPlaying(store.getState());
    const result = next(action);
    const isPlaying = selectIsPlaying(store.getState());
    if (wasPreviouslyPlaying === isPlaying) {
      return result;
    }
    if (isPlaying) {
      audioEl.play();
      return result;
    }
    // no longer playing
    audioEl.pause();
    return result;
  };
};

export default silentHtml5AudioMiddleware;
