import makeAssimilator from '../store/make-assimilator';

const assimilateCurrentGainValue = (state, currentGain) => {
  if (typeof currentGain === 'undefined') {
    return state;
  }
  const assimilator = makeAssimilator('masterGain');
  const result = assimilator(state, { currentGain, swapValue: 0 });
  return result;
};

export default assimilateCurrentGainValue;
