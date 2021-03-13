import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Repeat } from '@material-ui/icons';
import IconButton from '../button/icon-button';
import selectIsLoopActive from './select-is-loop-active';
import userEnabledLoop from './user-enabled-loop';
import userDisabledLoop from './user-disabled-loop';

const LoopControl = () => {
  const dispatch = useDispatch();
  const isActive = useSelector(selectIsLoopActive);
  const handleClick = useCallback(() => {
    const action = isActive ? userDisabledLoop() : userEnabledLoop();
    dispatch(action);
  }, [dispatch, isActive]);
  return (
    <IconButton
      isActive={isActive}
      onClick={handleClick}
      title={isActive ? 'Loop off' : 'Loop on'}
    >
      <Repeat />
    </IconButton>
  );
};

export default LoopControl;
