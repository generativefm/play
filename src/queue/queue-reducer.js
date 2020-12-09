import { USER_PLAYED_PIECE } from '../playback/user-played-piece';

const queueReducer = (
  state = {
    pieceIds: [],
    index: null,
  },
  action
) => {
  if (action.type === USER_PLAYED_PIECE) {
    return {
      pieceIds: action.payload.selectionPieceIds,
      index: action.payload.index,
    };
  }
  return state;
};

export default queueReducer;
