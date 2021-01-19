import { selectUserId as selectUserIdFromUser } from '@generative.fm/user';

const selectUserId = ({ user }) => selectUserIdFromUser(user);

export default selectUserId;
