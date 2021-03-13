export const USER_ENABLED_AUTOCHANGE = 'USER_ENABLED_AUTOCHANGE';

const userEnabledAutochange = ({ interval }) => ({
  type: USER_ENABLED_AUTOCHANGE,
  payload: { interval },
});

export default userEnabledAutochange;
