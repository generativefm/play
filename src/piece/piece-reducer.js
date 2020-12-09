import { combineReducers } from 'redux';
import playTime from './play-time-reducer';

const pieceReducer = combineReducers({ playTime });

export default pieceReducer;
