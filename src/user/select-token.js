import { selectToken as selectTokenFromUser } from '@generative.fm/user';

const selectToken = ({ user }) => selectTokenFromUser(user);

export default selectToken;
