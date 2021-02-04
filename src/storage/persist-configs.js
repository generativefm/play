import selectMasterGain from '../volume/select-master-gain';
import assimilateMasterGain from '../volume/assimilate-master-gain';
import selectAnonymousImporting from '../settings/select-anonymous-importing';
import assimilateAnonymousImporting from '../settings/assimilate-anonymous-importing';
import { ANONYMOUS_IMPORTING } from '../settings/anonymous-importing-reducer';
import selectConfirmExitDuringPlayback from '../settings/select-confirm-exit-during-playback';
import assimilateConfirmExitDuringPlayback from '../settings/assimilate-confirm-exit-during-playback';
import { CONFIRM_EXIT_DURING_PLAYBACK } from '../settings/confirm-exit-during-playback-reducer';

const configs = [
  {
    key: 'masterGain',
    selector: selectMasterGain,
    assimilator: assimilateMasterGain,
  },
  {
    key: `settings.${ANONYMOUS_IMPORTING}`,
    selector: selectAnonymousImporting,
    assimilator: assimilateAnonymousImporting,
  },
  {
    key: `settings.${CONFIRM_EXIT_DURING_PLAYBACK}`,
    selector: selectConfirmExitDuringPlayback,
    assimilator: assimilateConfirmExitDuringPlayback,
  },
];

export default configs;
