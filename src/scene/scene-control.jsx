import React, { useState, useCallback } from 'react';
import { HourglassEmpty, HourglassFull } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import IconButton from '../button/icon-button';
import selectTimer from './select-timer';
import SceneDialog from './scene-dialog';
import selectAutochange from './select-autochange';

const SceneControl = () => {
  const timer = useSelector(selectTimer);
  const autochange = useSelector(selectAutochange);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const handleClick = useCallback(() => {
    setIsDialogVisible(true);
  }, []);

  const handleDialogDismiss = useCallback(() => {
    setIsDialogVisible(false);
  }, []);

  const isRunning = Boolean(timer || autochange);

  return (
    <>
      {isDialogVisible && <SceneDialog onDismiss={handleDialogDismiss} />}
      <IconButton
        isActive={isRunning}
        isTicking={!isDialogVisible && isRunning}
        onClick={handleClick}
        data-cy="open-scene-dialog"
      >
        {isRunning ? <HourglassFull /> : <HourglassEmpty />}
      </IconButton>
    </>
  );
};

export default SceneControl;
