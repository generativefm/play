import { useRef } from 'react';
import { useStore } from 'react-redux';

const useSelectorOnce = (selector) => {
  const { getState } = useStore();
  const previousSelectorRef = useRef(null);
  const previousGetStateRef = useRef(null);
  const previousSelectionRef = useRef(null);
  if (
    previousSelectorRef.current === selector &&
    previousGetStateRef.current === getState
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
