import { USER_PLAYED_PIECE } from '../playback/user-played-piece';

const historyReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PLAYED_PIECE: {
      const { selectionPieceIds, index } = action.payload;
      const pieceId = selectionPieceIds[index];
      return Object.assign({}, state, {
        [pieceId]: action.meta.timestamp,
      });
    }
  }
  return state;
};

export default historyReducer;
