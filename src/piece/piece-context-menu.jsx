import React, { useCallback } from 'react';
import { Share, ArtTrack, FiberManualRecord, Album } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { userLikedPiece, userUnlikedPiece } from '@generative.fm/user';
import { byId } from '@generative-music/pieces-alex-bainter';
import PropTypes from 'prop-types';
import selectLikes from '../user/select-likes';
import ContextMenuOption from '../context-menu/context-menu-option';
import LikeIcon from './like-icon';
import selectIsPlaybackOpen from '../playback/select-is-playback-open';
import copyToClipboard from '../app/copy-to-clipboard';
import useShowSnackbar from '../snackbar/use-show-snackbar';
import contextMenuOptionStyles from '../context-menu/context-menu-option.module.scss';
import useIsNarrowScreen from '../layout/use-is-narrow-screen';
import styles from './piece-context-menu.module.scss';

const PieceContextMenu = ({ pieceId, shouldEnableLike = true }) => {
  const dispatch = useDispatch();
  const likes = useSelector(selectLikes);
  const isLiked = Boolean(likes[pieceId]);
  const isPlaybackOpen = useSelector(selectIsPlaybackOpen);
  const showSnackbar = useShowSnackbar();
  const isNarrowScreen = useIsNarrowScreen();

  const pieceRoute = `/generator/${pieceId}`;
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
    showSnackbar('Link copied');
  }, [pieceRoute, pieceId, showSnackbar]);

  return (
    <>
      {isNarrowScreen && (
        <div className={styles['piece-context-menu__info']}>
          <img
            src={byId[pieceId].imageSrc}
            className={styles['piece-context-menu__info__image']}
          />
          <div className={styles['piece-context-menu__info__text']}>
            <div className={styles['piece-context-menu__info__text__title']}>
              {byId[pieceId].title}
            </div>
            <div className={styles['piece-context-menu__info__text__subtitle']}>
              {byId[pieceId].releaseDate.getFullYear()} • v
              {byId[pieceId].version}
            </div>
          </div>
        </div>
      )}
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
      {byId[pieceId].downloadUrl && (
        <ContextMenuOption href={byId[pieceId].downloadUrl}>
          <Album
            className={contextMenuOptionStyles['context-menu-option__icon']}
          />
          Download recordings
        </ContextMenuOption>
      )}
      {byId[pieceId].isRecordable && (
        <ContextMenuOption
          href={`https://record.generative.fm/browse?new-recording=${pieceId}`}
        >
          <FiberManualRecord
            className={contextMenuOptionStyles['context-menu-option__icon']}
          />
          Record with Generative.fm Record
        </ContextMenuOption>
      )}
    </>
  );
};

PieceContextMenu.propTypes = {
  pieceId: PropTypes.string.isRequired,
  shouldEnableLike: PropTypes.bool,
};

export default PieceContextMenu;
