import { useContext } from 'react';
import masterGainContext from './master-gain-context';

const useMasterGain = () => useContext(masterGainContext);

export default useMasterGain;
