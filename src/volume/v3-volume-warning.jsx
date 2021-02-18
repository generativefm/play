import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useIsNarrowScreen from '../layout/use-is-narrow-screen';
import Dialog from '../dialog/dialog';
import userAdjustedMasterGain from './user-adjusted-master-gain';
import usePlayTime from '../user/use-play-time';
import styles from './v3-volume-warning.module.scss';

const STORAGE_KEY = 'skipv0.3VolumeWarning';

const V3VolumeWarning = () => {
  const isNarrowScreen = useIsNarrowScreen();
  const dispatch = useDispatch();
  const { isLoading, playTime } = usePlayTime();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const shouldSkip = localStorage.getItem(STORAGE_KEY);
    if (shouldSkip) {
      return;
    }
    if (Object.keys(playTime).length > 0) {
      setIsVisible(true);
    } else {
      try {
        localStorage.setItem(STORAGE_KEY, true);
      } catch (err) {
        console.error(err);
      }
    }
  }, [isLoading, playTime]);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, true);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleMuteClick = useCallback(() => {
    dispatch(userAdjustedMasterGain(0));
  }, [dispatch]);

  if (!isVisible) {
    return null;
  }

  const actions = isNarrowScreen
    ? [{ text: 'Dismiss' }]
    : [{ text: 'Dismiss' }, { text: 'Mute for now', onClick: handleMuteClick }];

  return (
    <Dialog
      title="Volume increased"
      actions={actions}
      onDismiss={handleDismiss}
    >
      <div className={styles['v3-volume-warning-body']}>
        The volume of most generators has been increased to match audio from
        other apps and services. You may need to readjust your volume settings
        to a comfortable level.
      </div>
    </Dialog>
  );
};

export default V3VolumeWarning;
