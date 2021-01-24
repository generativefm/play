import { selectAnonymousDataBackup } from '@generative.fm/user';

const selectAnonymousData = ({ user }) => selectAnonymousDataBackup(user);

export default selectAnonymousData;
