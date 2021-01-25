import React, { useState, useCallback } from 'react';
import { HourglassEmpty, HourglassFull } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import IconButton from '../button/icon-button';
import selectTimer from './select-timer';
import TimerDialog from './timer-dialog';

const TimerControl = () => {
  const timer = useSelector(selectTimer);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const handleClick = useCallback(() => {
    setIsDialogVisible(true);
  }, []);

  const handleDialogDismiss = useCallback(() => {
    setIsDialogVisible(false);
  }, []);

  const isRunning = Boolean(timer);

  return (
    <>
      {isDialogVisible && <TimerDialog onDismiss={handleDialogDismiss} />}
      <IconButton
        isActive={isRunning}
        isTicking={!isDialogVisible && isRunning}
        onClick={handleClick}
      >
        {isRunning ? <HourglassFull /> : <HourglassEmpty />}
      </IconButton>
    </>
  );
};

export default TimerControl;
