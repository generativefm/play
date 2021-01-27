export const TIMER_PROGRESSED = 'TIMER_PROGRESSED';

const timerProgressed = ({ durationRemaining }) => {
  const action = {
    type: TIMER_PROGRESSED,
    payload: { durationRemaining },
  };

  if (durationRemaining === 0) {
    action.meta = { snackbar: { message: 'Timer ended' } };
  }

  return action;
};

export default timerProgressed;
