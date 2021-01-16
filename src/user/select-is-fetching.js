import { selectIsFetching as selectIsFetchingFromUserState } from '@generative.fm/user';

const selectIsFetching = ({ user }) => selectIsFetchingFromUserState(user);

export default selectIsFetching;
