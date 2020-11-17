import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { ExpandLess } from '@material-ui/icons';
import PlaybackControls from './playback-controls';
import CurrentPiece from '../playback/current-piece';
import VolumeSlider from '../volume/volume-slider';
import IconButton from '../button/icon-button';
import styles from './control-bar.module.scss';

const ControlBar = () => (
  <CSSTransition
    classNames={{
      appear: styles['control-bar--will-appear'],
      appearActive: styles['control-bar--is-appearing'],
    }}
    timeout={200}
    appear
    in
  >
    <div className={styles['control-bar']}>
      <div className={styles['control-bar__left']}>
        <CurrentPiece />
      </div>
      <div>
        <PlaybackControls />
      </div>
      <div className={styles['control-bar__right']}>
        <VolumeSlider />
        <IconButton>
          <ExpandLess />
        </IconButton>
      </div>
    </div>
  </CSSTransition>
);

export default ControlBar;
