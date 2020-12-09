import { combineReducers } from 'redux';
import history from './history-reducer';
import playTime from './play-time-reducer';
import likes from './likes-reducer';
import dislikes from './dislikes-reducer';

const userReducer = combineReducers({ likes, dislikes, history, playTime });

export default userReducer;
