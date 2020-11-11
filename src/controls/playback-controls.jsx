import React, { useState } from 'react';
import {
  HourglassEmpty,
  Shuffle,
  Repeat,
  SkipPrevious,
  SkipNext,
  PlayArrow,
  Stop,
} from '@material-ui/icons';
import styles from './playback-controls.module.scss';

const PlaybackControls = () => {
  return (
    <div className={styles['playback-controls']}>
      <HourglassEmpty />
      <Shuffle />
      <Repeat />
      <SkipPrevious />
      <PlayArrow className={styles['icon--primary']} />
      <SkipNext />
    </div>
  );
};

export default PlaybackControls;
