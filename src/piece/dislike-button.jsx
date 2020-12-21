import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThumbDownOutlined, ThumbDown } from '@material-ui/icons';
import IconButton from '../button/icon-button';
import userPressedDislike from '../user/user-pressed-dislike';
import selectDislikes from '../user/select-dislikes';

const DislikeButton = ({ pieceId }) => {
  const dislikes = useSelector(selectDislikes);
  const isDisliked = Boolean(dislikes[pieceId]);
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    dispatch(userPressedDislike({ pieceId }));
  }, [pieceId, dispatch]);

  return (
    <IconButton onClick={handleClick}>
      {isDisliked ? <ThumbDown /> : <ThumbDownOutlined />}
    </IconButton>
  );
};

export default DislikeButton;
