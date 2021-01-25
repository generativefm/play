export const TIMER_PROGRESSED = 'TIMER_PROGRESSED';

const timerProgressed = ({ durationRemaining }) => ({
  type: TIMER_PROGRESSED,
  payload: { durationRemaining },
});

export default timerProgressed;
