import { ANONYMOUS_IMPORTING } from './anonymous-importing-reducer';

const selectAnonymousImporting = ({ settings }) =>
  settings[ANONYMOUS_IMPORTING];

export default selectAnonymousImporting;
