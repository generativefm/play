import { combineReducers } from 'redux';
import isOpen from './is-open-reducer';
import status from './status-reducer';

const playbackReducer = combineReducers({ isOpen, status });

export default playbackReducer;
