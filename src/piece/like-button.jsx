import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLikedPiece, userUnlikedPiece } from '@generative.fm/user';
import PropTypes from 'prop-types';
import selectLikes from '../user/select-likes';
import IconButton from '../button/icon-button';
import LikeIcon from './like-icon';

const LikeButton = ({ pieceId }) => {
  const dispatch = useDispatch();
  const likes = useSelector(selectLikes);
  const isLiked = Boolean(likes[pieceId]);
  const handleClick = useCallback(() => {
    const actionCreator = isLiked ? userUnlikedPiece : userLikedPiece;
    dispatch(actionCreator({ pieceId }));
  }, [pieceId, dispatch, isLiked]);

  return (
    <IconButton onClick={handleClick}>
      <LikeIcon pieceId={pieceId} />
    </IconButton>
  );
};

LikeButton.propTypes = {
  pieceId: PropTypes.string.isRequired,
};

export default LikeButton;
