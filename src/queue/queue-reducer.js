import { USER_PLAYED_PIECE } from '../playback/user-played-piece';
import { byId } from '@generative-music/pieces-alex-bainter';

const queueReducer = (
  state = {
    pieceIds: Object.keys(byId),
    index: Math.floor(Math.random() * 40),
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
