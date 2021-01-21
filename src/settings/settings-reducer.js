import { combineReducers } from 'redux';
import anonymousImportingReducer, {
  ANONYMOUS_IMPORTING,
} from './anonymous-importing-reducer';

const settingsReducer = combineReducers({
  [ANONYMOUS_IMPORTING]: anonymousImportingReducer,
});

export default settingsReducer;
