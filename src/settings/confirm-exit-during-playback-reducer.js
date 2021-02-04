import { USER_CHANGED_SETTING } from './user-changed-setting';

export const CONFIRM_EXIT_DURING_PLAYBACK = 'CONFIRM_EXIT_DURING_PLAYBACK';

const confirmExitDuringPlaybackReducer = (state = true, action) => {
  if (
    action.type === USER_CHANGED_SETTING &&
    action.payload.setting === CONFIRM_EXIT_DURING_PLAYBACK
  ) {
    return action.payload.value;
  }
  return state;
};

export default confirmExitDuringPlaybackReducer;
