import React, { useCallback } from 'react';
import { Share } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import selectLikes from '../user/select-likes';
import ContextMenuOption from '../app/context-menu-option';
import userPressedLike from '../user/user-pressed-like';
import LikeIcon from './like-icon';
import contextMenuOptionStyles from '../app/context-menu-option.module.scss';

const PieceContextMenu = ({ pieceId }) => {
  const dispatch = useDispatch();
  const likes = useSelector(selectLikes);
  const isLiked = Boolean(likes[pieceId]);

  const handleLikeClick = useCallback(() => {
    dispatch(userPressedLike({ pieceId }));
  }, [dispatch, pieceId]);

  return (
    <>
      <ContextMenuOption onClick={handleLikeClick}>
        <LikeIcon
          className={contextMenuOptionStyles['context-menu-option__icon']}
          pieceId={pieceId}
        />
        {isLiked ? 'Remove from liked generators' : 'Add to liked generators'}
      </ContextMenuOption>
      <ContextMenuOption>
        <Share
          className={contextMenuOptionStyles['context-menu-option__icon']}
        />
        Share
      </ContextMenuOption>
    </>
  );
};

export default PieceContextMenu;
