import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SkipPrevious } from '@material-ui/icons';
import IconButton from '../button/icon-button';
import userPlayedPiece from '../playback/user-played-piece';
import userStoppedPlayback from '../playback/user-stopped-playback';
import selectQueue from './select-queue';

const PreviousButton = () => {
  const dispatch = useDispatch();
  const { index, pieceIds, isLoopActive } = useSelector(selectQueue);

  const handleClick = useCallback(() => {
    if (index > 0) {
      dispatch(
        userPlayedPiece({ index: index - 1, selectionPieceIds: pieceIds })
      );
      return;
    }
    if (isLoopActive) {
      dispatch(
        userPlayedPiece({
          index: pieceIds.length - 1,
          selectionPieceIds: pieceIds,
        })
      );
      return;
    }
    dispatch(userStoppedPlayback());
  }, [dispatch, index, pieceIds, isLoopActive]);

  const isDisabled = !isLoopActive && index <= 0;

  return (
    <IconButton isDisabled={isDisabled} onClick={handleClick}>
      <SkipPrevious />
    </IconButton>
  );
};

export default PreviousButton;
