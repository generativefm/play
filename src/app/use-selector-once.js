import { useRef } from 'react';
import { useStore } from 'react-redux';

const useSelectorOnce = (selector, dependencies = []) => {
  const { getState } = useStore();
  const previousSelectorRef = useRef(null);
  const previousGetStateRef = useRef(null);
  const previousSelectionRef = useRef(null);
  const previousDependenciesRef = useRef(dependencies);
  const previousDependencyValues = previousDependenciesRef.current.slice();
  previousDependenciesRef.current = dependencies;
  if (
    previousSelectorRef.current === selector &&
    previousGetStateRef.current === getState &&
    previousDependencyValues.every((val, i) => dependencies[i] === val)
  ) {
    return previousSelectionRef.current;
  }
  const state = getState();
  previousSelectorRef.current = selector;
  previousGetStateRef.current = getState;
  const selection = selector(state);
  previousSelectionRef.current = selection;
  return selection;
};

export default useSelectorOnce;
