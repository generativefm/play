import { USER_STARTED_TIMER } from './user-started-timer';
import { USER_STOPPED_TIMER } from './user-stopped-timer';
import { TIMER_PROGRESSED } from './timer-progressed';

const timerReducer = (state = null, action) => {
  switch (action.type) {
    case USER_STARTED_TIMER: {
      return action.payload.duration;
    }
    case USER_STOPPED_TIMER: {
      return null;
    }
    case TIMER_PROGRESSED: {
      return action.payload.durationRemaining || null;
    }
  }
  return state;
};

export default timerReducer;
