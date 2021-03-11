import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '../dialog/dialog';
import DurationInput from './duration-input';
import selectTimer from './select-timer';
import userStartedTimer from './user-started-timer';
import userStoppedTimer from './user-stopped-timer';
import TextButton from '../button/text-button';
import selectAutochange from './select-autochange';
import userEnabledAutochange from './user-enabled-autochange';
import userDisabledAutochange from './user-disabled-autochange';
import Switch from '../button/switch';
import styles from './scene-dialog.module.scss';

const SceneDialog = ({ onDismiss }) => {
  const timer = useSelector(selectTimer);
  const autochange = useSelector(selectAutochange);
  const dispatch = useDispatch();
  const [timerDuration, setTimerDuration] = useState(timer);
  const [autochangeInterval, setAutochangeInterval] = useState(autochange);
  const stopTimer = useCallback(() => {
    dispatch(userStoppedTimer());
  }, [dispatch]);
  const startTimer = useCallback(() => {
    dispatch(userStartedTimer({ duration: timerDuration }));
  }, [dispatch, timerDuration]);
  const enableAutochange = useCallback(() => {
    dispatch(userEnabledAutochange({ interval: autochangeInterval }));
  }, [dispatch, autochangeInterval]);
  const disableAutochange = useCallback(() => {
    dispatch(userDisabledAutochange());
  }, [dispatch]);
  useEffect(() => {
    setTimerDuration(timer);
  }, [timer]);
  useEffect(() => {
    setAutochangeInterval(autochange.interval);
  }, [autochange.interval]);
  const isRunning = Boolean(timer);
  return (
    <Dialog title="Control playback behavior" onDismiss={onDismiss}>
      <div className={styles['scene-dialog-body']}>
        <div className={styles['scene-dialog-body__input-rows']}>
          <div className={styles['scene-dialog-body__input-rows__row']}>
            <span
              className={styles['scene-dialog-body__input-rows__row__label']}
            >
              Switch to the next generator every
            </span>
            <DurationInput
              onChange={setAutochangeInterval}
              value={autochangeInterval}
              onFocus={disableAutochange}
            />
            <Switch
              isActive={autochange.isEnabled}
              isDisabled={!autochangeInterval}
              onClick={
                autochange.isEnabled ? disableAutochange : enableAutochange
              }
            />
          </div>
          <div className={styles['scene-dialog-body__input-rows__row']}>
            <span
              className={styles['scene-dialog-body__input-rows__row__label']}
            >
              Stop playing after
            </span>
            <DurationInput
              onChange={setTimerDuration}
              value={timerDuration}
              onFocus={stopTimer}
            />
            <TextButton
              isPrimary
              onClick={isRunning ? stopTimer : startTimer}
              isDisabled={!timerDuration}
            >
              {isRunning ? 'Stop' : 'Start'}
            </TextButton>
          </div>
          <div className={styles['scene-dialog-body__input-rows__indicator']}>
            {isRunning && (
              <div
                className={
                  styles['scene-dialog-body__input-rows__indicator__pendulum']
                }
              />
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

SceneDialog.propTypes = {
  onDismiss: PropTypes.func.isRequired,
};

export default SceneDialog;
