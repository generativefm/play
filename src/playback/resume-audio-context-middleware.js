import { getContext, connect } from 'tone';
import selectPlaybackStatus from './select-playback-status';

const resumeAudioContextMiddleware = (store) => (next) => (action) => {
  const wasLoading = selectPlaybackStatus(store.getState()) === 'loading';
  const result = next(action);
  const isLoading = selectPlaybackStatus(store.getState()) === 'loading';
  if (!isLoading || wasLoading) {
    return result;
  }
  const context = getContext();
  // this accomplishes the iOS specific requirement
  const buffer = context.createBuffer(1, 1, context.sampleRate);
  const source = context.createBufferSource();
  source.buffer = buffer;
  connect(source, context.destination);
  source.start(0);
  if (context.state === 'running' || typeof context.resume !== 'function') {
    return result;
  }
  context.resume();
  return result;
};

export default resumeAudioContextMiddleware;
