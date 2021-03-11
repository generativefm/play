import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '../dialog/dialog';
import DurationInput from './duration-input';
import selectTimer from './select-timer';
import userStartedScene from './user-started-scene';
import userStoppedScene from './user-stopped-scene';
import TextButton from '../button/text-button';
import selectAutochange from './select-autochange';
import styles from './scene-dialog.module.scss';

const SceneDialog = ({ onDismiss }) => {
  const timer = useSelector(selectTimer);
  const autochange = useSelector(selectAutochange);
  const dispatch = useDispatch();
  const [timerDuration, setTimerDuration] = useState(timer);
  const [autochangeDuration, setAutochangeDuration] = useState(autochange);
  const stopScene = useCallback(() => {
    dispatch(userStoppedScene());
  }, [dispatch]);
  const startScene = useCallback(() => {
    dispatch(userStartedScene({ timerDuration, autochangeDuration }));
  }, [dispatch, timerDuration, autochangeDuration]);
  useEffect(() => {
    setTimerDuration(timer);
  }, [timer]);
  useEffect(() => {
    setAutochangeDuration(autochange);
  }, [autochange]);
  const isRunning = Boolean(timer || autochange);
  return (
    <Dialog title="Control playback behavior" onDismiss={onDismiss}>
      <div className={styles['scene-dialog-body']}>
        <div className={styles['scene-dialog-body__input-rows']}>
          <div className={styles['scene-dialog-body__input-rows__row']}>
            <span>Switch to the next generator every</span>
            <DurationInput
              onChange={setAutochangeDuration}
              value={autochangeDuration}
              onFocus={stopScene}
            />
          </div>
          <div className={styles['scene-dialog-body__input-rows__row']}>
            <span>Stop playing after</span>
            <DurationInput
              onChange={setTimerDuration}
              value={timerDuration}
              onFocus={stopScene}
            />
          </div>
          <div className={styles['scene-dialog-body__input-rows__row']}>
            <TextButton
              isPrimary
              onClick={isRunning ? stopScene : startScene}
              isDisabled={!timerDuration && !autochangeDuration}
            >
              {isRunning ? 'Stop' : 'Start'}
            </TextButton>
          </div>
        </div>
        <div className={styles['scene-dialog-body__indicator']}>
          {isRunning && (
            <div className={styles['scene-dialog-body__indicator__pendulum']} />
          )}
        </div>
      </div>
    </Dialog>
  );
};

SceneDialog.propTypes = {
  onDismiss: PropTypes.func.isRequired,
};

export default SceneDialog;
