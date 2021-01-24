import { makeAnonymousImportMiddleware } from '@generative.fm/user';
import selectUser from '../user/select-user';
import selectAnonymousImporting from './select-anonymous-importing';

const anonymousImportMiddleware = makeAnonymousImportMiddleware({
  selectUser,
  selectIsAnonymousImportingEnabled: selectAnonymousImporting,
});

export default anonymousImportMiddleware;
