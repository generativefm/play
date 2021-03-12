import { USER_ENABLED_AUTOCHANGE } from './user-enabled-autochange';
import { USER_DISABLED_AUTOCHANGE } from './user-disabled-autochange';

const autochangeReducer = (
  state = { interval: null, isEnabled: false },
  action
) => {
  switch (action.type) {
    case USER_ENABLED_AUTOCHANGE: {
      return { interval: action.payload.interval, isEnabled: true };
    }
    case USER_DISABLED_AUTOCHANGE: {
      return Object.assign({}, state, { isEnabled: false });
    }
  }
  return state;
};

export default autochangeReducer;
