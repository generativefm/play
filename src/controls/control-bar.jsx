import React from 'react';
import { ExpandLess } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import PlaybackControls from './playback-controls';
import CurrentPiece from '../playback/current-piece';
import VolumeSlider from '../volume/volume-slider';
import IconButton from '../button/icon-button';
import selectIsPlaybackOpen from '../playback/select-is-playback-open';
import useIsNarrowScreen from '../layout/use-is-narrow-screen';
import CompactPlaybackControls from './compact-playback-controls';
import CastButton from '../cast/cast-button';
import styles from './control-bar.module.scss';

const stopPropagation = (event) => {
  event.stopPropagation();
};

const ControlBar = ({ onExpandCollapse }) => {
  const isPlaybackOpen = useSelector(selectIsPlaybackOpen);
  const isNarrowScreen = useIsNarrowScreen();

  if (isNarrowScreen) {
    return (
      <div
        className={styles['control-bar']}
        onClick={onExpandCollapse}
        data-cy="control-bar"
      >
        <div className={styles['control-bar__left']}>
          <CurrentPiece />
        </div>
        <div className={styles['control-bar__right']}>
          <CompactPlaybackControls />
        </div>
      </div>
    );
  }

  return (
    <div className={styles['control-bar']} onClick={onExpandCollapse}>
      <div className={styles['control-bar__left']} onClick={stopPropagation}>
        <CurrentPiece />
      </div>
      <div onClick={stopPropagation}>
        <PlaybackControls />
      </div>
      <div className={styles['control-bar__right']} onClick={stopPropagation}>
        <CastButton />
        <VolumeSlider />
        <IconButton
          onClick={onExpandCollapse}
          data-cy="toggle-playback"
          title={isPlaybackOpen ? 'Hide queue' : 'Show queue'}
        >
          <ExpandLess
            className={classnames(styles['flip-vertical'], {
              [styles['flip-vertical--is-flipping']]: isPlaybackOpen,
            })}
          />
        </IconButton>
      </div>
    </div>
  );
};

ControlBar.propTypes = {
  onExpandCollapse: PropTypes.func.isRequired,
};

export default ControlBar;
