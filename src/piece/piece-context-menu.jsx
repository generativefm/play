import React, { useCallback } from 'react';
import { Share, ArtTrack, FiberManualRecord } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { userLikedPiece, userUnlikedPiece } from '@generative.fm/user';
import { byId } from '@generative-music/pieces-alex-bainter';
import selectLikes from '../user/select-likes';
import ContextMenuOption from '../context-menu/context-menu-option';
import LikeIcon from './like-icon';
import selectIsPlaybackOpen from '../playback/select-is-playback-open';
import copyToClipboard from '../app/copy-to-clipboard';
import useShowSnackbarMessage from '../snackbar/use-show-snackbar-message';
import contextMenuOptionStyles from '../context-menu/context-menu-option.module.scss';

const PieceContextMenu = ({ pieceId, shouldEnableLike = true }) => {
  const dispatch = useDispatch();
  const likes = useSelector(selectLikes);
  const isLiked = Boolean(likes[pieceId]);
  const isPlaybackOpen = useSelector(selectIsPlaybackOpen);
  const showSnackbarMessage = useShowSnackbarMessage();

  const pieceRoute = `/piece/${pieceId}`;
  const { pathname } = useLocation();

  const handleLikeClick = useCallback(() => {
    const actionCreator = isLiked ? userUnlikedPiece : userLikedPiece;
    dispatch(actionCreator({ pieceId }));
  }, [dispatch, pieceId, isLiked]);

  const handleShareClick = useCallback(async () => {
    const url = `https://play.generative.fm${pieceRoute}`;
    if (navigator.share) {
      try {
        navigator.share({
          url,
          text: `Listen to ${byId[pieceId].title} on Generative.fm`,
          title: `Generative.fm - ${byId[pieceId].title}`,
        });
        return;
      } catch (err) {
        // fallback
      }
    }
    await copyToClipboard(url);
    showSnackbarMessage('Link copied');
  }, [pieceRoute, pieceId, showSnackbarMessage]);

  return (
    <>
      {shouldEnableLike && (
        <ContextMenuOption onClick={handleLikeClick}>
          <LikeIcon
            className={contextMenuOptionStyles['context-menu-option__icon']}
            pieceId={pieceId}
          />
          {isLiked ? 'Remove from liked generators' : 'Add to liked generators'}
        </ContextMenuOption>
      )}
      <ContextMenuOption onClick={handleShareClick}>
        <Share
          className={contextMenuOptionStyles['context-menu-option__icon']}
        />
        {navigator.share ? 'Share' : 'Copy link'}
      </ContextMenuOption>
      {(pathname !== pieceRoute || isPlaybackOpen) && (
        <ContextMenuOption linkTo={pieceRoute}>
          <ArtTrack
            className={contextMenuOptionStyles['context-menu-option__icon']}
          />
          Go to generator
        </ContextMenuOption>
      )}
      <ContextMenuOption
        href={`https://record.generative.fm/browse?new-recording=${pieceId}`}
      >
        <FiberManualRecord
          className={contextMenuOptionStyles['context-menu-option__icon']}
        />
        Record with Generative.fm Record
      </ContextMenuOption>
    </>
  );
};

export default PieceContextMenu;
