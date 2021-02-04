import { CONFIRM_EXIT_DURING_PLAYBACK } from './confirm-exit-during-playback-reducer';

const selectConfirmExitDuringPlayback = ({ settings }) =>
  settings[CONFIRM_EXIT_DURING_PLAYBACK];

export default selectConfirmExitDuringPlayback;
