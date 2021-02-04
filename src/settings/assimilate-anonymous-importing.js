import makeAssimilator from '../store/make-assimilator';
import { ANONYMOUS_IMPORTING } from './anonymous-importing-reducer';

const assimilateAnonymousImporting = makeAssimilator(
  'settings',
  ANONYMOUS_IMPORTING
);

export default assimilateAnonymousImporting;
