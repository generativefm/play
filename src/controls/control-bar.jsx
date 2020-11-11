import React from 'react';
import PlaybackControls from './playback-controls';
import styles from './control-bar.module.scss';

const ControlBar = () => (
  <div className={styles['control-bar']}>
    <div>Left</div>
    <div>
      <PlaybackControls />
    </div>
    <div>Right</div>
  </div>
);

export default ControlBar;
