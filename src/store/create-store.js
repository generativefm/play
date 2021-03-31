import { createStore as _createStore } from 'redux';
import rootReducer from './root-reducer';
import applyMiddlewareEnhancer from './apply-middleware-enhancer';

const createStore = (preloadedState) =>
  _createStore(rootReducer, preloadedState, applyMiddlewareEnhancer);

export default createStore;
