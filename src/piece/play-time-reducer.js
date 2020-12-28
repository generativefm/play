import { PLAY_TIME_LOADED } from './play-time-loaded';

const playTimeReducer = (state = null, action) => {
  switch (action.type) {
    case PLAY_TIME_LOADED: {
      return action.payload;
    }
  }
  return state;
};

export default playTimeReducer;
