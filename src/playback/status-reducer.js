import { USER_PLAYED_PIECE } from '@generative.fm/user';
import { PIECE_STARTED_PLAYING } from './piece-started-playing';
import { USER_STOPPED_PLAYBACK } from './user-stopped-playback';

const statusReducer = (state = 'stopped', action) => {
  switch (action.type) {
    case USER_PLAYED_PIECE: {
      return 'loading';
    }
    case PIECE_STARTED_PLAYING: {
      return 'playing';
    }
    case USER_STOPPED_PLAYBACK: {
      return 'stopped';
    }
  }

  return state;
};

export default statusReducer;
