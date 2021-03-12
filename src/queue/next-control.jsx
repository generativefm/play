import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SkipNext } from '@material-ui/icons';
import IconButton from '../button/icon-button';
import playNext from './play-next';
import selectQueue from './select-queue';

const NextButton = () => {
  const dispatch = useDispatch();
  const { index, pieceIds, isLoopActive } = useSelector(selectQueue);

  const handleClick = useCallback(() => {
    playNext({ dispatch, index, pieceIds, isLoopActive });
  }, [dispatch, index, pieceIds, isLoopActive]);

  const isDisabled = !isLoopActive && index >= pieceIds.length - 1;

  return (
    <IconButton
      isDisabled={isDisabled}
      onClick={handleClick}
      title="Next generator"
    >
      <SkipNext />
    </IconButton>
  );
};

export default NextButton;
