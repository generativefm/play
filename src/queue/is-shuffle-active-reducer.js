import { USER_ENABLED_SHUFFLE } from './user-enabled-shuffle';
import { USER_DISABLED_SHUFFLE } from './user-disabled-shuffle';

const isShuffleActiveReducer = (state = false, action) => {
  switch (action.type) {
    case USER_ENABLED_SHUFFLE: {
      return true;
    }
    case USER_DISABLED_SHUFFLE: {
      return false;
    }
  }
  return state;
};

export default isShuffleActiveReducer;
