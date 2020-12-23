export const USER_PRESSED_PREVIOUS = 'USER_PRESSED_PREVIOUS';

const userPressedPrevious = ({ destination }) => ({
  type: USER_PRESSED_PREVIOUS,
  payload: { destination },
});

export default userPressedPrevious;
