import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '../button/icon-button';
import LikeIcon from './like-icon';
import userPressedLike from '../user/user-pressed-like';

const LikeButton = ({ pieceId }) => {
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    dispatch(userPressedLike({ pieceId }));
  }, [pieceId, dispatch]);

  return (
    <IconButton onClick={handleClick}>
      <LikeIcon pieceId={pieceId} />
    </IconButton>
  );
};

export default LikeButton;
