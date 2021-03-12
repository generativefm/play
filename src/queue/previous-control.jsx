import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SkipPrevious } from '@material-ui/icons';
import IconButton from '../button/icon-button';
import selectQueue from './select-queue';
import playPrevious from './play-previous';

const PreviousButton = () => {
  const dispatch = useDispatch();
  const { index, pieceIds, isLoopActive } = useSelector(selectQueue);

  const handleClick = useCallback(() => {
    playPrevious({ dispatch, index, pieceIds, isLoopActive });
  }, [dispatch, index, pieceIds, isLoopActive]);

  const isDisabled = !isLoopActive && index <= 0;

  return (
    <IconButton
      isDisabled={isDisabled}
      onClick={handleClick}
      title="Previous generator"
    >
      <SkipPrevious />
    </IconButton>
  );
};

export default PreviousButton;
