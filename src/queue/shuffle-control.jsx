import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Shuffle } from '@material-ui/icons';
import { IconButton } from '@generative.fm/web-ui';
import selectIsShuffleActive from './select-is-shuffle-active';
import userEnabledShuffle from './user-enabled-shuffle';
import userDisabledShuffle from './user-disabled-shuffle';

const ShuffleControl = () => {
  const dispatch = useDispatch();
  const isActive = useSelector(selectIsShuffleActive);
  const handleClick = useCallback(() => {
    const action = isActive ? userDisabledShuffle() : userEnabledShuffle();
    dispatch(action);
  }, [dispatch, isActive]);
  return (
    <IconButton
      isActive={isActive}
      onClick={handleClick}
      title={isActive ? 'Shuffle off' : 'Shuffle on'}
    >
      <Shuffle />
    </IconButton>
  );
};

export default ShuffleControl;
