import { USER_OPENED_PLAYBACK } from './user-opened-playback';
import { USER_CLOSED_PLAYBACK } from './user-closed-playback';
import { USER_UNQUEUED_PIECE } from '../queue/user-unqueued-piece';

const isOpenReducer = (state = false, action) => {
  switch (action.type) {
    case USER_OPENED_PLAYBACK: {
      return true;
    }
    case USER_CLOSED_PLAYBACK: {
      return false;
    }
    case USER_UNQUEUED_PIECE: {
      return state && action.payload.newIndex !== null;
    }
  }

  return state;
};

export default isOpenReducer;
