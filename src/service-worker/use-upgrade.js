import { useContext } from 'react';
import upgradeContext from './upgrade-context';

const useUpgrade = () => useContext(upgradeContext);

export default useUpgrade;
