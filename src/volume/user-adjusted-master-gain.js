export const USER_ADJUSTED_MASTER_GAIN = 'USER_ADJUSTED_MASTER_GAIN';

const userAdjustedMasterGain = (newValue) => ({
  type: USER_ADJUSTED_MASTER_GAIN,
  payload: newValue,
});

export default userAdjustedMasterGain;
