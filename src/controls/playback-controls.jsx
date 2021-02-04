import React, { useCallback } from 'react';
import { PlayArrow, Stop } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import IconButton from '../button/icon-button';
import CircularLoadingIndicator from '../loading/circular-loading-indicator';
import selectPlaybackStatus from '../playback/select-playback-status';
import userStoppedPlayback from '../playback/user-stopped-playback';
import userPlayedPiece from '../playback/user-played-piece';
import TimerControl from '../timer/timer-control';
import ShuffleControl from '../queue/shuffle-control';
import LoopControl from '../queue/loop-control';
import PreviousControl from '../queue/previous-control';
import NextControl from '../queue/next-control';
import useHotkey from '../app/use-hotkey';
import selectQueue from '../queue/select-queue';
import useIsNarrowScreen from '../layout/use-is-narrow-screen';
import styles from './playback-controls.module.scss';

const PlaybackControls = () => {
  const dispatch = useDispatch();
  const playbackStatus = useSelector(selectPlaybackStatus);
  const isNarrowScreen = useIsNarrowScreen();
  const { index, pieceIds: queuedPieceIds } = useSelector(selectQueue);

  const handlePlayClick = useCallback(() => {
    dispatch(userPlayedPiece({ index, selectionPieceIds: queuedPieceIds }));
  }, [dispatch, index, queuedPieceIds]);

  const handleStopClick = useCallback(() => {
    dispatch(userStoppedPlayback());
  }, [dispatch]);

  const isLoading = playbackStatus === 'loading';
  const isPlaying = playbackStatus === 'playing';

  useHotkey(' ', isPlaying ? handleStopClick : handlePlayClick);

  return (
    <div className={styles['playback-controls']}>
      {!isNarrowScreen && <TimerControl />}
      {!isNarrowScreen && <ShuffleControl />}
      {!isNarrowScreen && <LoopControl />}
      {!isNarrowScreen && <PreviousControl />}
      <div
        className={classnames(styles['playback-controls__primary'], {
          [styles['playback-controls__primary--is-loading']]: isLoading,
        })}
      >
        {isLoading && (
          <div
            className={styles['playback-controls__primary__loading-indicator']}
          >
            <CircularLoadingIndicator />
          </div>
        )}
        <div className={styles['playback-controls__primary__button']}>
          <IconButton>
            {isPlaying ? (
              <Stop onClick={handleStopClick} />
            ) : (
              <PlayArrow onClick={handlePlayClick} />
            )}
          </IconButton>
        </div>
      </div>

      <NextControl />
    </div>
  );
};

export default PlaybackControls;
