const makeAssimilator = (...propNames) => (state = {}, value) => {
  if (propNames.length === 0) {
    return value;
  }
  const [firstPropName, ...otherPropNames] = propNames;
  const subAssimilator = makeAssimilator(...otherPropNames);
  const subValue = subAssimilator(state[firstPropName], value);
  return Object.assign({}, state, {
    [firstPropName]: subValue,
  });
};

export default makeAssimilator;
