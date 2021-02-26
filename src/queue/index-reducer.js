import { USER_PLAYED_PIECE } from '../playback/user-played-piece';
import { USER_ENABLED_SHUFFLE } from './user-enabled-shuffle';
import { USER_DISABLED_SHUFFLE } from './user-disabled-shuffle';
import { USER_UNQUEUED_PIECE } from './user-unqueued-piece';

const indexReducer = (state = null, action) => {
  switch (action.type) {
    case USER_PLAYED_PIECE: {
      return action.payload.index;
    }
    case USER_ENABLED_SHUFFLE: {
      if (action.payload.shuffledPieceIds.length) {
        return 0;
      }
      return null;
    }
    case USER_DISABLED_SHUFFLE: {
      if (typeof action.payload.unshuffledIndex === 'number') {
        return action.payload.unshuffledIndex;
      }
      return null;
    }
    case USER_UNQUEUED_PIECE: {
      const { newIndex } = action.payload;
      return newIndex;
    }
  }
  return state;
};

export default indexReducer;
