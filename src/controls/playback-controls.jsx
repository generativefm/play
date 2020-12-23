import React, { useCallback } from 'react';
import {
  HourglassEmpty,
  Shuffle,
  Repeat,
  SkipPrevious,
  SkipNext,
  PlayArrow,
  Stop,
} from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '../button/icon-button';
import CircularLoadingIndicator from '../app/circular-loading-indicator';
import selectPlaybackStatus from '../playback/select-playback-status';
import userStartedPlayback from '../playback/user-started-playback';
import userStoppedPlayback from '../playback/user-stopped-playback';
import useMasterGain from '../volume/use-master-gain';
import selectQueue from '../queue/select-queue';
import userPlayedPiece from '../playback/user-played-piece';
import styles from './playback-controls.module.scss';

const PlaybackControls = () => {
  const dispatch = useDispatch();
  const playbackStatus = useSelector(selectPlaybackStatus);
  const queue = useSelector(selectQueue);
  const masterGain = useMasterGain();

  const handlePlayClick = useCallback(() => {
    dispatch(userStartedPlayback({ destination: masterGain }));
  }, [dispatch, masterGain]);

  const handleStopClick = useCallback(() => {
    dispatch(userStoppedPlayback());
  }, [dispatch]);

  const handlePreviousClick = useCallback(() => {
    if (queue.index === 0) {
      dispatch(userStoppedPlayback());
      return;
    }
    dispatch(
      userPlayedPiece({
        destination: masterGain,
        selectionPieceIds: queue.pieceIds,
        index: queue.index - 1,
      })
    );
  }, [dispatch, masterGain, queue]);

  const handleNextClick = useCallback(() => {
    if (queue.index + 1 === queue.pieceIds.length) {
      dispatch(userStoppedPlayback());
      return;
    }
    dispatch(
      userPlayedPiece({
        destination: masterGain,
        selectionPieceIds: queue.pieceIds,
        index: queue.index + 1,
      })
    );
  }, [dispatch, masterGain, queue]);

  const isLoading = playbackStatus === 'loading';
  const isPlaying = playbackStatus === 'playing';
  const hasPrevious = queue.index > 0;
  const hasNext = queue.index < queue.pieceIds.length - 1;

  return (
    <div className={styles['playback-controls']}>
      <IconButton>
        <HourglassEmpty />
      </IconButton>
      <IconButton>
        <Shuffle />
      </IconButton>
      <IconButton>
        <Repeat />
      </IconButton>
      <IconButton isDisabled={!hasPrevious} onClick={handlePreviousClick}>
        <SkipPrevious />
      </IconButton>
      {isLoading ? (
        <CircularLoadingIndicator />
      ) : (
        <IconButton>
          {isPlaying ? (
            <Stop
              className={styles['icon--primary']}
              onClick={handleStopClick}
            />
          ) : (
            <PlayArrow
              className={styles['icon--primary']}
              onClick={handlePlayClick}
            />
          )}
        </IconButton>
      )}

      <IconButton isDisabled={!hasNext} onClick={handleNextClick}>
        <SkipNext />
      </IconButton>
    </div>
  );
};

export default PlaybackControls;
