import { USER_PLAYED_PIECE } from '../user-played-piece';

const queueReducer = (
  state = {
    pieceIds: ['zed'],
    index: 0,
  },
  action
) => {
  if (action.type === USER_PLAYED_PIECE) {
    return {
      pieceIds: [action.payload],
      index: 0,
    };
  }
  return state;
};

export default queueReducer;
