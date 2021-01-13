import selectMasterGain from '../volume/select-master-gain';
import assimilateMasterGain from '../volume/assimilate-master-gain';

const configs = [
  {
    key: 'masterGain',
    selector: selectMasterGain,
    assimilator: assimilateMasterGain,
  },
];

export default configs;
