import makeAssimilator from '../store/make-assimilator';
import { CONFIRM_EXIT_DURING_PLAYBACK } from './confirm-exit-during-playback-reducer';

const assimilateConfirmExitDuringPlayback = makeAssimilator(
  'settings',
  CONFIRM_EXIT_DURING_PLAYBACK
);

export default assimilateConfirmExitDuringPlayback;
