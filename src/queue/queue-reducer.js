import { USER_PLAYED_PIECE } from '@generative.fm/user';

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
