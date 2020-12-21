import React, { useCallback } from 'react';
import { Share, ArtTrack } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import selectLikes from '../user/select-likes';
import ContextMenuOption from '../app/context-menu-option';
import userPressedLike from '../user/user-pressed-like';
import LikeIcon from './like-icon';
import selectIsPlaybackOpen from '../playback/select-is-playback-open';
import contextMenuOptionStyles from '../app/context-menu-option.module.scss';

const PieceContextMenu = ({ pieceId }) => {
  const dispatch = useDispatch();
  const likes = useSelector(selectLikes);
  const isLiked = Boolean(likes[pieceId]);
  const isPlaybackOpen = useSelector(selectIsPlaybackOpen);

  const pieceRoute = `/piece/${pieceId}`;
  const { pathname } = useLocation();

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
      {(pathname !== pieceRoute || isPlaybackOpen) && (
        <ContextMenuOption linkTo={pieceRoute}>
          <ArtTrack
            className={contextMenuOptionStyles['context-menu-option__icon']}
          />
          Go to generator
        </ContextMenuOption>
      )}
    </>
  );
};

export default PieceContextMenu;
