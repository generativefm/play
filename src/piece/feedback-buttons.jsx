import React from 'react';
import PropTypes from 'prop-types';
import LikeButton from './like-button';
import DislikeButton from './dislike-button';

const FeedbackButtons = ({ pieceId }) => (
  <>
    <DislikeButton pieceId={pieceId} />
    <LikeButton pieceId={pieceId} />
  </>
);

FeedbackButtons.propTypes = {
  pieceId: PropTypes.string.isRequired,
};

export default FeedbackButtons;
