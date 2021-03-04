import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { byId } from '@generative-music/pieces-alex-bainter';
import { useHistory } from 'react-router-dom';
import { PlayArrow, Stop, ExpandMore, QueueMusic } from '@material-ui/icons';
import { CSSTransition } from 'react-transition-group';
import selectCurrentPieceId from '../queue/select-current-piece-id';
import userClosedPlayback from './user-closed-playback';
import LikeButton from '../piece/like-button';
import DislikeButton from '../piece/dislike-button';
import TimerControl from '../timer/timer-control';
import ShuffleControl from '../queue/shuffle-control';
import PreviousControl from '../queue/previous-control';
import NextControl from '../queue/next-control';
import LoopControl from '../queue/loop-control';
import IconButton from '../button/icon-button';
import userPlayedPiece from './user-played-piece';
import userStoppedPlayback from './user-stopped-playback';
import selectPlaybackStatus from './select-playback-status';
import CircularLoadingIndicator from '../loading/circular-loading-indicator';
import MoreButton from '../piece/more-button';
import Queue from '../queue/queue';
import ControlBar from '../controls/control-bar';
import selectQueue from '../queue/select-queue';
import styles from './playback-with-controls.module.scss';

const PlaybackWithControls = () => {
  const currentPieceId = useSelector(selectCurrentPieceId);
  const history = useHistory();
  const dispatch = useDispatch();
  const playbackStatus = useSelector(selectPlaybackStatus);
  const { index, pieceIds } = useSelector(selectQueue);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const handleOpenQueueClick = useCallback(() => {
    setIsQueueOpen(true);
    history.push(
      [
        history.location.pathname,
        history.location.search,
        history.location.hash,
      ].join(''),
      { isPlaybackOpen: true, isQueueOpen: true }
    );
    const unlisten = history.listen(() => {
      unlisten();
      setIsQueueOpen(false);
    });
  }, [history]);

  useEffect(() => {
    history.push(
      [
        history.location.pathname,
        history.location.search,
        history.location.hash,
      ].join(''),
      { isPlaybackOpen: true, isQueueOpen: false }
    );
  }, [history]);

  useEffect(
    () =>
      history.listen((location, action) => {
        if (
          action !== 'POP' ||
          (location.state && location.state.isPlaybackOpen)
        ) {
          return;
        }
        dispatch(userClosedPlayback());
      }),
    [history, dispatch]
  );

  useEffect(() => {
    if (pieceIds.length) {
      return;
    }
    if (history.location.state && history.location.state.isQueueOpen) {
      history.go(-2);
      return;
    }
    history.goBack();
  }, [pieceIds.length, history]);

  const handleCollapseClick = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleControlBarExpand = useCallback(() => {
    history.goBack();
  }, [history]);

  const isPlaying = playbackStatus === 'playing';
  const isLoading = playbackStatus === 'loading';

  const handlePrimaryClick = useCallback(() => {
    if (isPlaying) {
      dispatch(userStoppedPlayback());
      return;
    }
    dispatch(
      userPlayedPiece({
        index,
        selectionPieceIds: pieceIds,
      })
    );
  }, [dispatch, isPlaying, index, pieceIds]);

  if (!currentPieceId || !byId[currentPieceId]) {
    return null;
  }

  const { title, imageSrc } = byId[currentPieceId];

  return (
    <>
      <div className={styles['playback-with-controls']}>
        <CSSTransition
          timeout={200}
          in={!isQueueOpen}
          classNames={{
            enter: styles['playback-with-controls__current-piece--will-enter'],
            enterActive:
              styles['playback-with-controls__current-piece--is-entering'],
            exit: styles['playback-with-controls__current-piece--will-exit'],
            exitActive:
              styles['playback-with-controls__current-piece--is-exiting'],
          }}
          unmountOnExit
        >
          <div className={styles['playback-with-controls__current-piece']}>
            <div
              className={
                styles['playback-with-controls__current-piece__top-bar']
              }
            >
              <IconButton onClick={handleCollapseClick}>
                <ExpandMore />
              </IconButton>
              <MoreButton pieceId={currentPieceId} shouldEnableLike={false} />
            </div>
            <div
              className={styles['playback-with-controls__current-piece__title']}
            >
              {title}
            </div>
            <div
              className={styles['playback-with-controls__current-piece__row']}
            >
              <DislikeButton pieceId={currentPieceId} />
              <img
                className={
                  styles['playback-with-controls__current-piece__image']
                }
                src={imageSrc}
              />
              <LikeButton pieceId={currentPieceId} />
            </div>
            <TimerControl />
            <div
              className={
                styles['playback-with-controls__current-piece__controls']
              }
            >
              <ShuffleControl />
              <PreviousControl />
              {isLoading ? (
                <div
                  className={
                    styles[
                      'playback-with-controls__current-piece__controls__loader'
                    ]
                  }
                >
                  <CircularLoadingIndicator />
                </div>
              ) : (
                <IconButton isSecondary={true} onClick={handlePrimaryClick}>
                  {isPlaying ? <Stop /> : <PlayArrow />}
                </IconButton>
              )}
              <NextControl />
              <LoopControl />
            </div>
          </div>
        </CSSTransition>
        {isQueueOpen && (
          <div className={styles['playback-with-controls__control-bar']}>
            <ControlBar onExpandCollapse={handleControlBarExpand} />
          </div>
        )}
        <button
          type="button"
          className={styles['playback-with-controls__queue-button']}
          onClick={handleOpenQueueClick}
        >
          <QueueMusic /> Queue
        </button>
        <CSSTransition
          timeout={200}
          in={isQueueOpen}
          classNames={{
            appear: styles['playback-with-controls__queue--will-enter'],
            appearActive: styles['playback-with-controls__queue--is-entering'],
            enter: styles['playback-with-controls__queue--will-enter'],
            enterActive: styles['playback-with-controls__queue--is-entering'],
            exit: styles['playback-with-controls__queue--will-exit'],
            exitActive: styles['playback-with-controls__queue--is-exiting'],
          }}
          appear
          unmountOnExit
        >
          <div className={styles['playback-with-controls__queue']}>
            <Queue />
          </div>
        </CSSTransition>
      </div>
    </>
  );
};

export default PlaybackWithControls;
