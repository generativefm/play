import { USER_PLAYED_PIECE } from '@generative.fm/user';
import { USER_ENABLED_SHUFFLE } from './user-enabled-shuffle';
import { USER_DISABLED_SHUFFLE } from './user-disabled-shuffle';

const pieceIdsReducer = (state = [], action) => {
  switch (action.type) {
    case USER_PLAYED_PIECE: {
      return action.payload.selectionPieceIds;
    }
    case USER_ENABLED_SHUFFLE: {
      return action.payload.shuffledPieceIds;
    }
    case USER_DISABLED_SHUFFLE: {
      return action.payload.unshuffledPieceIds;
    }
  }
  return state;
};

export default pieceIdsReducer;
