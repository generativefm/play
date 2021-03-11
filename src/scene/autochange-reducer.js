import { USER_ENABLED_AUTOCHANGE } from './user-enabled-autochange';
import { USER_DISABLED_AUTOCHANGE } from './user-disabled-autochange';

const createDisabledState = () => ({ interval: null, isEnabled: false });

const autochangeReducer = (state = createDisabledState(), action) => {
  switch (action.type) {
    case USER_ENABLED_AUTOCHANGE: {
      return { interval: action.payload.interval, isEnabled: true };
    }
    case USER_DISABLED_AUTOCHANGE: {
      return createDisabledState();
    }
  }
  return state;
};

export default autochangeReducer;
