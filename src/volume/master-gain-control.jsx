import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VolumeControl } from '@generative.fm/web-ui';
import selectCurrentGainValue from './select-current-gain-value';
import userAdjustedMasterGain from './user-adjusted-master-gain';
import userClickedVolumeButton from './user-clicked-volume-button';
import useHotkey from '../app/use-hotkey';

const MasterGainControl = () => {
  const currentGainValue = useSelector(selectCurrentGainValue);
  const dispatch = useDispatch();
  const handleMuteToggle = useCallback(() => {
    dispatch(userClickedVolumeButton());
  }, [dispatch]);

  useHotkey('m', handleMuteToggle);

  const handleChange = useCallback(
    (newGainValue) => {
      dispatch(userAdjustedMasterGain(newGainValue));
    },
    [dispatch]
  );

  return (
    <VolumeControl
      value={currentGainValue}
      onChange={handleChange}
      onMuteToggle={handleMuteToggle}
    />
  );
};

export default MasterGainControl;
