import {
  createStore as _createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import queueReducer from '../queue/queue-reducer';
import playbackReducer from '../playback/playback-reducer';
import userReducer from '../user/user-reducer';
import pieceReducer from '../piece/piece-reducer';
import masterGainReducer from '../volume/master-gain-reducer';
import playbackMiddleware from '../playback/playback-middleware';

const createStore = (preloadedState = {}) =>
  _createStore(
    combineReducers({
      queue: queueReducer,
      playback: playbackReducer,
      user: userReducer,
      piece: pieceReducer,
      masterGain: masterGainReducer,
    }),
    preloadedState,
    applyMiddleware(playbackMiddleware)
  );

export default createStore;
