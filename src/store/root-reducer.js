import { combineReducers } from 'redux';
import { synchronizedUserReducer } from '@generative.fm/user';
import queueReducer from '../queue/queue-reducer';
import playbackReducer from '../playback/playback-reducer';
import pieceReducer from '../piece/piece-reducer';
import masterGainReducer from '../volume/master-gain-reducer';
import settingsReducer from '../settings/settings-reducer';
import timerReducer from '../scene/timer-reducer';
import autochangeReducer from '../scene/autochange-reducer';

const rootReducer = combineReducers({
  queue: queueReducer,
  playback: playbackReducer,
  user: synchronizedUserReducer,
  piece: pieceReducer,
  masterGain: masterGainReducer,
  settings: settingsReducer,
  timer: timerReducer,
  autochange: autochangeReducer,
});

export default rootReducer;
