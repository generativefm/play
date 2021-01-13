import { makeStoreStateMiddleware } from '@generative.fm/user';
import selectUser from './select-user';

const storeUserStateMiddleware = makeStoreStateMiddleware({ selectUser });

export default storeUserStateMiddleware;
