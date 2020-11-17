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
import IconButton from '../button/icon-button';
import styles from './playback-controls.module.scss';

const PlaybackControls = () => {
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
      <IconButton>
        <PlayArrow className={styles['icon--primary']} />
      </IconButton>
      <IconButton>
        <SkipNext />
      </IconButton>
    </div>
  );
};

export default PlaybackControls;
