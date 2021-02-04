import { combineReducers } from 'redux';
import anonymousImportingReducer, {
  ANONYMOUS_IMPORTING,
} from './anonymous-importing-reducer';
import confirmExitDuringPlaybackReducer, {
  CONFIRM_EXIT_DURING_PLAYBACK,
} from './confirm-exit-during-playback-reducer';

const settingsReducer = combineReducers({
  [ANONYMOUS_IMPORTING]: anonymousImportingReducer,
  [CONFIRM_EXIT_DURING_PLAYBACK]: confirmExitDuringPlaybackReducer,
});

export default settingsReducer;
