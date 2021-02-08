import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThumbDownOutlined, ThumbDown } from '@material-ui/icons';
import { userDislikedPiece, userUndislikedPiece } from '@generative.fm/user';
import PropTypes from 'prop-types';
import IconButton from '../button/icon-button';
import selectDislikes from '../user/select-dislikes';

const DislikeButton = ({ pieceId }) => {
  const dislikes = useSelector(selectDislikes);
  const isDisliked = Boolean(dislikes[pieceId]);
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    const actionCreator = isDisliked ? userUndislikedPiece : userDislikedPiece;
    dispatch(actionCreator({ pieceId }));
  }, [pieceId, dispatch, isDisliked]);

  return (
    <IconButton onClick={handleClick}>
      {isDisliked ? <ThumbDown /> : <ThumbDownOutlined />}
    </IconButton>
  );
};

DislikeButton.propTypes = {
  pieceId: PropTypes.string.isRequired,
};

export default DislikeButton;
