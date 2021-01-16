import React, { useEffect } from 'react';
import { now } from 'tone';
import { useSelector } from 'react-redux';
import selectCurrentGainValue from './select-current-gain-value';
import masterGainContext from './master-gain-context';
import masterGainNode from './master-gain-node';

const MasterGainProvider = ({ children }) => {
  const currentGainValue = useSelector(selectCurrentGainValue);

  useEffect(() => {
    const { gain } = masterGainNode;
    if (gain.value === currentGainValue) {
      return;
    }
    gain.setValueAtTime(currentGainValue, now());
  }, [currentGainValue]);

  return (
    <masterGainContext.Provider value={masterGainNode}>
      {children}
    </masterGainContext.Provider>
  );
};

export default MasterGainProvider;
