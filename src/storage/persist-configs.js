import selectMasterGain from '../volume/select-master-gain';
import assimilateMasterGain from '../volume/assimilate-master-gain';
import selectAnonymousImporting from '../settings/select-anonymous-importing';
import assimilateAnonymousImporting from '../settings/assimilate-anonymous-importing';
import { ANONYMOUS_IMPORTING } from '../settings/anonymous-importing-reducer';

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
];

export default configs;
