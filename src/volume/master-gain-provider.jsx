import React, { useRef, useEffect } from 'react';
import { Gain, now } from 'tone';
import { useSelector } from 'react-redux';
import selectCurrentGainValue from './select-current-gain-value';
import masterGainContext from './master-gain-context';

const MasterGainProvider = ({ children }) => {
  const currentGainValue = useSelector(selectCurrentGainValue);
  const gainNodeRef = useRef(new Gain(currentGainValue).toDestination());

  useEffect(() => {
    const { gain } = gainNodeRef.current;
    if (gain.value === currentGainValue) {
      return;
    }
    gain.setValueAtTime(currentGainValue, now());
  }, [currentGainValue]);

  return (
    <masterGainContext.Provider value={gainNodeRef.current}>
      {children}
    </masterGainContext.Provider>
  );
};

export default MasterGainProvider;
