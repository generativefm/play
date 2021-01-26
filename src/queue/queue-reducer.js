import { combineReducers } from 'redux';
import index from './index-reducer';
import pieceIds from './piece-ids-reducer';
import isShuffleActive from './is-shuffle-active-reducer';
import isLoopActive from './is-loop-active-reducer';

const queueReducer = combineReducers({
  index,
  pieceIds,
  isShuffleActive,
  isLoopActive,
});

export default queueReducer;
