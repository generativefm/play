export const USER_PRESSED_NEXT = 'USER_PRESSED_NEXT';

const userPressedNext = ({ destination }) => ({
  type: USER_PRESSED_NEXT,
  payload: destination,
});

export default userPressedNext;
