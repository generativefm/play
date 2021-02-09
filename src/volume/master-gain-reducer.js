import { USER_ADJUSTED_MASTER_GAIN } from './user-adjusted-master-gain';
import { USER_CLICKED_VOLUME_BUTTON } from './user-clicked-volume-button';

const DEFAULT_STATE = {
  currentGain: 1,
  swapValue: 0,
};

const swapValues = ({ currentGain, swapValue }) => ({
  currentGain: swapValue,
  swapValue: currentGain,
});

const masterGainReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case USER_ADJUSTED_MASTER_GAIN: {
      const newGain = action.payload;
      const { currentGain } = state;
      if (newGain === currentGain) {
        return state;
      }
      if (newGain === 0) {
        return swapValues(state);
      }
      return {
        currentGain: newGain,
        swapValue: 0,
      };
    }
    case USER_CLICKED_VOLUME_BUTTON: {
      return swapValues(state);
    }
  }
  return state;
};

export default masterGainReducer;
