export const USER_PRESSED_LIKE = 'USER_PRESSED_LIKE';

const userPressedLike = ({ pieceId }) => ({
  type: USER_PRESSED_LIKE,
  payload: { pieceId },
  meta: {
    timestamp: Date.now(),
  },
});

export default userPressedLike;
