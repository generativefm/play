import { createStore as _createStore, combineReducers } from 'redux';
import queueReducer from '../queue/queue-reducer';
import playbackReducer from '../playback/playback-reducer';
import userReducer from '../user/user-reducer';
import pieceReducer from '../piece/piece-reducer';

const createStore = () =>
  _createStore(
    combineReducers({
      queue: queueReducer,
      playback: playbackReducer,
      user: userReducer,
      piece: pieceReducer,
    })
  );

export default createStore;
