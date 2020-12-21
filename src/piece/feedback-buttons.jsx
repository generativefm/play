import React from 'react';
import LikeButton from './like-button';
import DislikeButton from './dislike-button';

const FeedbackButtons = ({ pieceId }) => (
  <>
    <DislikeButton pieceId={pieceId} />
    <LikeButton pieceId={pieceId} />
  </>
);

export default FeedbackButtons;
