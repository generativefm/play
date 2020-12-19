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
import CircularLoadingIndicator from '../playback/circular-loading-indicator';
import selectPlaybackStatus from '../playback/select-playback-status';
import userStartedPlayback from '../playback/user-started-playback';
import userStoppedPlayback from '../playback/user-stopped-playback';
import useMasterGain from '../volume/use-master-gain';
import styles from './playback-controls.module.scss';

const PlaybackControls = () => {
  const dispatch = useDispatch();
  const playbackStatus = useSelector(selectPlaybackStatus);
  const masterGain = useMasterGain();

  const handlePlayClick = useCallback(() => {
    dispatch(userStartedPlayback({ destination: masterGain }));
  }, [dispatch, masterGain]);

  const handleStopClick = useCallback(() => {
    dispatch(userStoppedPlayback());
  }, [dispatch]);

  const isLoading = playbackStatus === 'loading';
  const isPlaying = playbackStatus === 'playing';

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
      <IconButton>
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

      <IconButton>
        <SkipNext />
      </IconButton>
    </div>
  );
};

export default PlaybackControls;
