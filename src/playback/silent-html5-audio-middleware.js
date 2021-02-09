import silence from './silence.mp3';
import selectPlaybackStatus from './select-playback-status';

const selectIsLoading = (state) => selectPlaybackStatus(state) === 'loading';

const silentHtml5AudioMiddleware = (store) => (next) => {
  const audioEl = document.createElement('audio');
  audioEl.src = silence;
  audioEl.loop = true;
  return (action) => {
    const wasPreviouslyLoading = selectIsLoading(store.getState());
    const result = next(action);
    const isLoading = selectIsLoading(store.getState());
    if (wasPreviouslyLoading === isLoading) {
      return result;
    }
    if (isLoading) {
      audioEl.play();
      return result;
    }
    // no longer playing
    audioEl.pause();
    return result;
  };
};

export default silentHtml5AudioMiddleware;
