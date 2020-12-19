import { USER_PRESSED_LIKE } from './user-pressed-like';
import { USER_PRESSED_DISLIKE } from './user-pressed-dislike';

const undislikePiece = ({ state = {}, pieceId }) =>
  Object.keys(state).reduce((o, key) => {
    if (key === pieceId) {
      return o;
    }
    o[key] = state[key];
    return o;
  }, {});

const dislikesReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PRESSED_DISLIKE: {
      const { pieceId } = action.payload;
      if (!Object.prototype.hasOwnProperty.call(state, pieceId)) {
        return Object.assign({}, state, { [pieceId]: action.meta.timestamp });
      }
      return undislikePiece({ state, pieceId });
    }
    case USER_PRESSED_LIKE: {
      const { pieceId } = action.payload;
      if (!Object.prototype.hasOwnProperty.call(state, pieceId)) {
        return state;
      }
      return undislikePiece({ state, pieceId });
    }
  }
  return state;
};

export default dislikesReducer;
