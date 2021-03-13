export const USER_STARTED_TIMER = 'USER_STARTED_TIMER';

const userStartedTimer = ({ duration }) => ({
  type: USER_STARTED_TIMER,
  payload: { duration },
});

export default userStartedTimer;
