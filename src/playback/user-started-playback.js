export const USER_STARTED_PLAYBACK = 'USER_STARTED_PLAYBACK';

const userStartedPlayback = ({ destination }) => ({
  type: USER_STARTED_PLAYBACK,
  payload: { destination },
});

export default userStartedPlayback;
