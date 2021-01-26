import { USER_ENABLED_LOOP } from './user-enabled-loop';
import { USER_DISABLED_LOOP } from './user-disabled-loop';

const isLoopActiveReducer = (state = false, action) => {
  switch (action.type) {
    case USER_ENABLED_LOOP: {
      return true;
    }
    case USER_DISABLED_LOOP: {
      return false;
    }
  }
  return state;
};

export default isLoopActiveReducer;
