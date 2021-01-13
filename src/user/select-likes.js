import { selectLikes as selectLikesFromUser } from '@generative.fm/user';

const selectLikes = ({ user }) => selectLikesFromUser(user);

export default selectLikes;
