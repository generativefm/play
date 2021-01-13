import { selectHistory as selectHistoryFromUser } from '@generative.fm/user';

const selectHistory = ({ user }) => selectHistoryFromUser(user);

export default selectHistory;
