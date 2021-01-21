import { USER_CHANGED_SETTING } from './user-changed-setting';

export const ANONYMOUS_IMPORTING = 'ANONYMOUS_IMPORTING';

const anonymousImportingReducer = (state = true, action) => {
  if (
    action.type === USER_CHANGED_SETTING &&
    action.payload.setting === ANONYMOUS_IMPORTING
  ) {
    return action.payload.value;
  }
  return state;
};

export default anonymousImportingReducer;
