import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SkipNext } from '@material-ui/icons';
import IconButton from '../button/icon-button';
import userPlayedPiece from '../playback/user-played-piece';
import userStoppedPlayback from '../playback/user-stopped-playback';
import selectQueue from './select-queue';

const NextButton = () => {
  const dispatch = useDispatch();
  const { index, pieceIds, isLoopActive } = useSelector(selectQueue);

  const handleClick = useCallback(() => {
    if (index < pieceIds.length - 1) {
      dispatch(
        userPlayedPiece({ index: index + 1, selectionPieceIds: pieceIds })
      );
      return;
    }
    if (isLoopActive) {
      dispatch(userPlayedPiece({ index: 0, selectionPieceIds: pieceIds }));
      return;
    }
    dispatch(userStoppedPlayback());
  }, [dispatch, index, pieceIds, isLoopActive]);

  const isDisabled = !isLoopActive && index >= pieceIds.length - 1;

  return (
    <IconButton isDisabled={isDisabled} onClick={handleClick}>
      <SkipNext />
    </IconButton>
  );
};

export default NextButton;
