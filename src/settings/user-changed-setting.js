export const USER_CHANGED_SETTING = 'USER_CHANGED_SETTING';

const userChangedSetting = ({ setting, value }) => ({
  type: USER_CHANGED_SETTING,
  payload: { setting, value },
  meta: {
    snackbar: {
      message: 'Settings saved',
    },
  },
});

export default userChangedSetting;
