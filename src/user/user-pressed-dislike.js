export const USER_PRESSED_DISLIKE = 'USER_PRESSED_DISLIKE';

const userPressedDislike = ({ pieceId }) => ({
  type: USER_PRESSED_DISLIKE,
  payload: { pieceId },
  meta: {
    timestamp: Date.now(),
  },
});

export default userPressedDislike;
