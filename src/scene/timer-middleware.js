import timerProgressed from './timer-progressed';
import { USER_STARTED_TIMER } from './user-started-timer';
import { USER_STOPPED_TIMER } from './user-stopped-timer';
import selectTimer from './select-timer';

const TIMER_TICK_DURATION = 60 * 1000;

const timerMiddleware = (store) => (next) => {
  let currentTimerInterval;
  const updateTimer = () => {
    const previousDurationRemaining = selectTimer(store.getState());
    if (!previousDurationRemaining) {
      clearInterval(currentTimerInterval);
      return;
    }
    const durationRemaining = Math.max(
      0,
      previousDurationRemaining - TIMER_TICK_DURATION
    );
    if (durationRemaining <= 0) {
      clearInterval(currentTimerInterval);
    }
    store.dispatch(timerProgressed({ durationRemaining }));
  };
  return (action) => {
    if (action.type === USER_STARTED_TIMER) {
      clearInterval(currentTimerInterval);
      currentTimerInterval = setInterval(updateTimer, TIMER_TICK_DURATION);
    }
    if (action.type === USER_STOPPED_TIMER) {
      clearInterval(currentTimerInterval);
    }
    return next(action);
  };
};

export default timerMiddleware;
