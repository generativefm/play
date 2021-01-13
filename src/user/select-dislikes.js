import { selectDislikes as selectDislikesFromUser } from '@generative.fm/user';

const selectDislikes = ({ user }) => selectDislikesFromUser(user);

export default selectDislikes;
