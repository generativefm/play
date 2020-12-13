export const PLAY_TIME_LOADED = 'PLAY_TIME_LOADED';

const playTimeLoaded = (playTime) => ({
  type: PLAY_TIME_LOADED,
  payload: playTime,
});

export default playTimeLoaded;
