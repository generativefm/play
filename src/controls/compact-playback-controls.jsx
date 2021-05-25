import React, { useCallback } from 'react';
import { PlayArrow, Stop } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, CircularLoadingIndicator } from '@generative.fm/web-ui';
import selectPlaybackStatus from '../playback/select-playback-status';
import userStoppedPlayback from '../playback/user-stopped-playback';
import userPlayedPiece from '../playback/user-played-piece';
import NextControl from '../queue/next-control';
import useHotkey from '../app/use-hotkey';
import selectQueue from '../queue/select-queue';
import styles from './compact-playback-controls.module.scss';

const PlaybackControls = () => {
  const dispatch = useDispatch();
  const playbackStatus = useSelector(selectPlaybackStatus);
  const { index, pieceIds: queuedPieceIds } = useSelector(selectQueue);

  const handlePlayClick = useCallback(
    (event) => {
      event.stopPropagation();
      dispatch(userPlayedPiece({ index, selectionPieceIds: queuedPieceIds }));
    },
    [dispatch, index, queuedPieceIds]
  );

  const handleStopClick = useCallback(
    (event) => {
      event.stopPropagation();
      dispatch(userStoppedPlayback());
    },
    [dispatch]
  );

  const isLoading = playbackStatus === 'loading';
  const isPlaying = playbackStatus === 'playing';

  useHotkey(' ', isPlaying ? handleStopClick : handlePlayClick);
  return (
    <div className={styles['compact-playback-controls']}>
      {isLoading ? (
        <CircularLoadingIndicator />
      ) : (
        <IconButton>
          {isPlaying ? (
            <Stop
              className={styles['compact-playback-controls__icon--primary']}
              onClick={handleStopClick}
            />
          ) : (
            <PlayArrow
              className={styles['compact-playback-controls__icon--primary']}
              onClick={handlePlayClick}
            />
          )}
        </IconButton>
      )}
      <NextControl />
    </div>
  );
};

export default PlaybackControls;
