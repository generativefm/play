import { createStore as _createStore, combineReducers } from 'redux';
import queueReducer from '../queue/queue-reducer';
import playbackReducer from '../playback/playback-reducer';

const createStore = () =>
  _createStore(
    combineReducers({ queue: queueReducer, playback: playbackReducer })
  );

export default createStore;
