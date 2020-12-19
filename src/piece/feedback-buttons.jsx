import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThumbDownOutlined, ThumbDown } from '@material-ui/icons';
import selectDislikes from '../user/select-dislikes';
import userPressedLike from '../user/user-pressed-like';
import userPressedDislike from '../user/user-pressed-dislike';
import IconButton from '../button/icon-button';
import LikeIcon from './like-icon';

const FeedbackButtons = ({ pieceId }) => {
  const dispatch = useDispatch();
  const dislikes = useSelector(selectDislikes);
  const isDisliked = Boolean(dislikes[pieceId]);
  const handleLikeClick = useCallback(() => {
    dispatch(userPressedLike({ pieceId }));
  }, [dispatch, pieceId]);
  const handleDislikeClick = useCallback(() => {
    dispatch(userPressedDislike({ pieceId }));
  }, [dispatch, pieceId]);

  return (
    <>
      <IconButton onClick={handleDislikeClick}>
        {isDisliked ? <ThumbDown /> : <ThumbDownOutlined />}
      </IconButton>
      <IconButton onClick={handleLikeClick}>
        <LikeIcon pieceId={pieceId} />
      </IconButton>
    </>
  );
};

export default FeedbackButtons;
