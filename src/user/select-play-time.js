import { selectPlayTime as selectPlayTimeFromUser } from '@generative.fm/user';

const selectPlayTime = ({ user }) => selectPlayTimeFromUser(user);

export default selectPlayTime;
