import { makeSynchronizeUserMiddleware } from '@generative.fm/user';
import selectUser from './select-user';

const synchronizeUserMiddleware = makeSynchronizeUserMiddleware({ selectUser });

export default synchronizeUserMiddleware;
