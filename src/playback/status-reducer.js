import { USER_PLAYED_PIECE } from './user-played-piece';
import { PIECE_STARTED_PLAYING } from './piece-started-playing';
import { USER_STOPPED_PLAYBACK } from './user-stopped-playback';
import { SCENE_TIMER_PROGRESSED } from '../scene/scene-timer-progressed';
import { PIECE_PLAYBACK_FAILED } from './piece-playback-failed';
import { USER_UNQUEUED_PIECE } from '../queue/user-unqueued-piece';

const statusReducer = (state = 'stopped', action) => {
  switch (action.type) {
    case USER_PLAYED_PIECE: {
      return 'loading';
    }
    case PIECE_STARTED_PLAYING: {
      return 'playing';
    }
    case PIECE_PLAYBACK_FAILED:
    case USER_STOPPED_PLAYBACK: {
      return 'stopped';
    }
    case SCENE_TIMER_PROGRESSED: {
      if (action.payload.timerDurationRemaining === 0) {
        return 'stopped';
      }
      return state;
    }
    case USER_UNQUEUED_PIECE: {
      const { isCurrent } = action.payload;
      if (!isCurrent || state === 'stopped') {
        return state;
      }
      return 'loading';
    }
  }

  return state;
};

export default statusReducer;
