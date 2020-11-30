import React, { useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ExpandLess } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import PlaybackControls from './playback-controls';
import CurrentPiece from '../playback/current-piece';
import VolumeSlider from '../volume/volume-slider';
import IconButton from '../button/icon-button';
import selectIsPlaybackOpen from '../playback/select-is-playback-open';
import userOpenedPlayback from '../playback/user-opened-playback';
import userClosedPlayback from '../playback/user-closed-playback';
import styles from './control-bar.module.scss';

const ControlBar = () => {
  const dispatch = useDispatch();
  const isPlaybackOpen = useSelector(selectIsPlaybackOpen);

  const handleExpansionClick = useCallback(() => {
    if (isPlaybackOpen) {
      return dispatch(userClosedPlayback());
    }
    dispatch(userOpenedPlayback());
  }, [isPlaybackOpen, dispatch]);

  return (
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
          <IconButton onClick={handleExpansionClick}>
            <ExpandLess />
          </IconButton>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ControlBar;
