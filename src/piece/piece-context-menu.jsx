import React, { useCallback, useMemo } from 'react';
import {
  Share,
  ArtTrack,
  FiberManualRecord,
  Album,
  QueueMusic,
  PlaylistPlay,
  RemoveCircleOutline,
} from '@material-ui/icons';
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
import selectQueue from '../queue/select-queue';
import userQueuedPiece from '../queue/user-queued-piece';
import userPlayedPiece from '../playback/user-played-piece';
import userUnqueuedPiece from '../queue/user-unqueued-piece';
import styles from './piece-context-menu.module.scss';

const PieceContextMenu = ({ pieceId, shouldEnableLike = true }) => {
  const dispatch = useDispatch();
  const likes = useSelector(selectLikes);
  const isLiked = Boolean(likes[pieceId]);
  const isPlaybackOpen = useSelector(selectIsPlaybackOpen);
  const queue = useSelector(selectQueue);
  const showSnackbar = useShowSnackbar();
  const isNarrowScreen = useIsNarrowScreen();

  const pieceRoute = `/generator/${pieceId}`;
  const { pathname } = useLocation();

  const handlePlayNextClick = useCallback(() => {
    if (typeof queue.index !== 'number') {
      dispatch(userPlayedPiece({ index: 0, selectionPieceIds: [pieceId] }));
    }
    dispatch(userQueuedPiece({ pieceId, index: queue.index + 1 }));
  }, [dispatch, pieceId, queue]);

  const handleAddToQueueClick = useCallback(() => {
    if (typeof queue.index !== 'number') {
      dispatch(userPlayedPiece({ index: 0, selectionPieceIds: [pieceId] }));
      return;
    }
    dispatch(userQueuedPiece({ pieceId }));
  }, [dispatch, pieceId, queue]);

  const handleUnqueueClick = useCallback(() => {
    const unqueuedPieceIndex = queue.pieceIds.indexOf(pieceId);
    if (unqueuedPieceIndex < 0) {
      return;
    }
    if (queue.pieceIds.length === 1) {
      dispatch(userUnqueuedPiece({ pieceId, newIndex: null, isCurrent: true }));
      return;
    }
    if (unqueuedPieceIndex === queue.index) {
      const newIndex = queue.index;
      dispatch(
        userUnqueuedPiece({
          pieceId,
          newIndex,
          isCurrent: true,
        })
      );
      return;
    }
    if (unqueuedPieceIndex > queue.index) {
      const newIndex = queue.index;
      dispatch(
        userUnqueuedPiece({
          pieceId,
          newIndex,
        })
      );
      return;
    }
    const newIndex = queue.index - 1;
    dispatch(
      userUnqueuedPiece({
        pieceId,
        newIndex,
      })
    );
  }, [dispatch, pieceId, queue]);

  const handleLikeClick = useCallback(() => {
    const actionCreator = isLiked ? userUnlikedPiece : userLikedPiece;
    dispatch(actionCreator({ pieceId }));
  }, [dispatch, pieceId, isLiked]);

  const handleShareClick = useCallback(async () => {
    const url = `https://play.generative.fm${pieceRoute}`;
    if (navigator.share) {
      navigator
        .share({
          url,
          text: `Listen to ${byId[pieceId].title} on Generative.fm`,
          title: `Generative.fm - ${byId[pieceId].title}`,
        })
        .catch(() => {
          // canceled
        });
      return;
    }
    await copyToClipboard(url);
    showSnackbar('Link copied');
  }, [pieceRoute, pieceId, showSnackbar]);

  const isInQueue = useMemo(() => queue.pieceIds.indexOf(pieceId) >= 0, [
    queue.pieceIds,
    pieceId,
  ]);

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
      {!isInQueue && (
        <>
          <ContextMenuOption onClick={handleAddToQueueClick}>
            <QueueMusic
              className={contextMenuOptionStyles['context-menu-option__icon']}
            />
            Add to queue
          </ContextMenuOption>
          <ContextMenuOption onClick={handlePlayNextClick}>
            <PlaylistPlay
              className={contextMenuOptionStyles['context-menu-option__icon']}
            />
            Play next
          </ContextMenuOption>
        </>
      )}
      {isInQueue && (
        <ContextMenuOption onClick={handleUnqueueClick}>
          <RemoveCircleOutline
            className={contextMenuOptionStyles['context-menu-option__icon']}
          />
          Remove from queue
        </ContextMenuOption>
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
      {byId[pieceId].bandcampUrl && (
        <ContextMenuOption href={byId[pieceId].bandcampUrl}>
          <Album
            className={contextMenuOptionStyles['context-menu-option__icon']}
          />
          Download excerpts
        </ContextMenuOption>
      )}
      {byId[pieceId].isRecordable && (
        <ContextMenuOption
          href={`https://record.generative.fm/browse?new-recording=${pieceId}`}
        >
          <FiberManualRecord
            className={contextMenuOptionStyles['context-menu-option__icon']}
          />
          Make your own recording
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
