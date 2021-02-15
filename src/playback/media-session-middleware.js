import { byId } from '@generative-music/pieces-alex-bainter';
import selectCurrentPieceId from '../queue/select-current-piece-id';
import userPlayedPiece from './user-played-piece';
import userStoppedPlayback from './user-stopped-playback';
import selectQueue from '../queue/select-queue';
import playNext from '../queue/play-next';
import playPrevious from '../queue/play-previous';
import selectIsLoopActive from '../queue/select-is-loop-active';
import selectPlaybackStatus from './select-playback-status';

const playbackStatusStateMap = {
  playing: 'playing',
  stopped: 'paused',
  loading: 'none',
};

const mediaSessionMiddleware = (store) => (next) => {
  if (!navigator.mediaSession) {
    return (action) => next(action);
  }
  navigator.mediaSession.setActionHandler('play', () => {
    const { index, pieceIds } = selectQueue(store.getState());
    store.dispatch(
      userPlayedPiece({
        index,
        selectionPieceIds: pieceIds,
      })
    );
  });
  navigator.mediaSession.setActionHandler('pause', () => {
    store.dispatch(userStoppedPlayback());
  });
  try {
    navigator.mediaSession.setActionHandler('stop', () => {
      store.dispatch(userStoppedPlayback());
    });
  } catch (error) {
    // some browsers don't like this
  }
  navigator.mediaSession.setActionHandler('nexttrack', () => {
    const state = store.getState();
    const { index, pieceIds } = selectQueue(state);
    const isLoopActive = selectIsLoopActive(state);
    playNext({ dispatch: store.dispatch, index, pieceIds, isLoopActive });
  });
  navigator.mediaSession.setActionHandler('previoustrack', () => {
    const state = store.getState();
    const { index, pieceIds } = selectQueue(state);
    const isLoopActive = selectIsLoopActive(state);
    playPrevious({ dispatch: store.dispatch, index, pieceIds, isLoopActive });
  });
  return (action) => {
    const previousState = store.getState();
    const result = next(action);
    const nextState = store.getState();
    const previousPieceId = selectCurrentPieceId(previousState);
    const nextPieceId = selectCurrentPieceId(nextState);
    if (nextPieceId !== previousPieceId && byId[nextPieceId]) {
      const { title, imageSrc } = byId[nextPieceId];
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title,
        artist: 'Alex Bainter',
        album: '',
        artwork: [{ src: imageSrc, type: 'image/png' }],
      });
    }
    const previousPlaybackStatus = selectPlaybackStatus(previousState);
    const nextPlaybackStatus = selectPlaybackStatus(nextState);
    if (previousPlaybackStatus !== nextPlaybackStatus) {
      navigator.mediaSession.playbackState =
        playbackStatusStateMap[nextPlaybackStatus];
      if (
        nextPlaybackStatus !== 'loading' &&
        typeof navigator.mediaSession.setPositionState === 'function'
      ) {
        try {
          navigator.mediaSession.setPositionState({
            duration: Infinity,
            playbackRate: 1,
            position: 0,
          });
        } catch (err) {
          // Chrome complains about duration: Infinity even though it's
          // supposed to work according to https://developer.mozilla.org/en-US/docs/Web/API/MediaPositionState/duration#value
        }
      }
    }
    return result;
  };
};

export default mediaSessionMiddleware;
