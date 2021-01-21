import makeAssimilator from '../store/make-assimilator';
import { ANONYMOUS_IMPORTING } from './anonymous-importing-reducer';

const assimilateSettings = makeAssimilator('settings', ANONYMOUS_IMPORTING);

export default assimilateSettings;
