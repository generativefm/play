import { USER_PLAYED_PIECE } from '../playback/user-played-piece';
import { USER_ENABLED_SHUFFLE } from './user-enabled-shuffle';
import { USER_DISABLED_SHUFFLE } from './user-disabled-shuffle';
import { USER_QUEUED_PIECE } from './user-queued-piece';
import { USER_UNQUEUED_PIECE } from './user-unqueued-piece';

const pieceIdsReducer = (state = [], action) => {
  switch (action.type) {
    case USER_PLAYED_PIECE: {
      return action.payload.selectionPieceIds.slice();
    }
    case USER_ENABLED_SHUFFLE: {
      return action.payload.shuffledPieceIds.slice();
    }
    case USER_DISABLED_SHUFFLE: {
      return action.payload.unshuffledPieceIds.slice();
    }
    case USER_QUEUED_PIECE: {
      const { pieceId, index = state.length } = action.payload;
      return state.slice(0, index).concat([pieceId]).concat(state.slice(index));
    }
    case USER_UNQUEUED_PIECE: {
      const { pieceId } = action.payload;
      return state.filter((otherPieceId) => otherPieceId !== pieceId);
    }
  }
  return state;
};

export default pieceIdsReducer;
