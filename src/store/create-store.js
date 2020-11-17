import { createStore as _createStore, combineReducers } from 'redux';
import queueReducer from '../playback/queue/queue-reducer';

const createStore = () =>
  _createStore(combineReducers({ queue: queueReducer }));

export default createStore;
