import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '../dialog/dialog';
import TextButton from '../button/text-button';
import TimerInput from './timer-input';
import selectTimer from './select-timer';
import userStartedTimer from './user-started-timer';
import userStoppedTimer from './user-stopped-timer';
import styles from './timer-dialog.module.scss';

const TimerDialog = ({ onDismiss }) => {
  const timer = useSelector(selectTimer);
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(null);
  const handleButtonClick = useCallback(() => {
    if (timer) {
      dispatch(userStoppedTimer());
      return;
    }
    dispatch(userStartedTimer({ duration }));
  }, [dispatch, timer, duration]);
  return (
    <Dialog title="Timer" onDismiss={onDismiss}>
      <div className={styles['timer-dialog-body']}>
        <div className={styles['timer-dialog-body__controls']}>
          <TimerInput onChange={setDuration} />
          <TextButton
            isPrimary
            onClick={handleButtonClick}
            isDisabled={!duration}
          >
            {timer ? 'Stop' : 'Start'}
          </TextButton>
        </div>
        <div className={styles['timer-dialog-body__indicator']}>
          {timer && (
            <div className={styles['timer-dialog-body__indicator__pendulum']} />
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default TimerDialog;
