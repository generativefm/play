import React from 'react';
import { useSelector } from 'react-redux';
import { ThumbUpOutlined, ThumbUp } from '@material-ui/icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import selectLikes from '../user/select-likes';
import styles from './like-icon.module.scss';

const LikeIcon = ({ pieceId, className }) => {
  const likes = useSelector(selectLikes);
  const isLiked = Boolean(likes[pieceId]);

  if (isLiked) {
    return (
      <ThumbUp
        className={classnames(styles['like-icon--is-filled'], className)}
      />
    );
  }

  return <ThumbUpOutlined className={className} />;
};

LikeIcon.propTypes = {
  pieceId: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default LikeIcon;
