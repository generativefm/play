import { USER_OPENED_PLAYBACK } from './user-opened-playback';
import { USER_CLOSED_PLAYBACK } from './user-closed-playback';

const isOpenReducer = (state = false, action) => {
  switch (action.type) {
    case USER_OPENED_PLAYBACK: {
      return true;
    }
    case USER_CLOSED_PLAYBACK: {
      return false;
    }
  }

  return state;
};

export default isOpenReducer;
