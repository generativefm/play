import { USER_OPENED_PLAYBACK } from './user-opened-playback';
import { USER_CLOSED_PLAYBACK } from './user-closed-playback';

const playbackReducer = (state = { isOpen: false }, action) => {
  switch (action.type) {
    case USER_OPENED_PLAYBACK: {
      return Object.assign({}, state, { isOpen: true });
    }
    case USER_CLOSED_PLAYBACK: {
      return Object.assign({}, state, { isOpen: false });
    }
  }

  return state;
};

export default playbackReducer;
