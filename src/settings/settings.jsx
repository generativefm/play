import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Switch from './switch';
import selectAnonymousImporting from './select-anonymous-importing';
import userChangedSetting from './user-changed-setting';
import { ANONYMOUS_IMPORTING } from './anonymous-importing-reducer';
import { CONFIRM_EXIT_DURING_PLAYBACK } from './confirm-exit-during-playback-reducer';
import selectConfirmExitDuringPlayback from './select-confirm-exit-during-playback';
import styles from './settings.module.scss';

const Setting = ({ label, help, setting, selector }) => {
  const isActive = useSelector(selector);
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(userChangedSetting({ setting, value: !isActive }));
  }, [dispatch, isActive, setting]);

  return (
    <button className={styles.setting} onClick={handleClick}>
      <div className={styles['setting__control']}>
        <div className={styles['setting__control__label']}>{label}</div>
        <Switch isActive={isActive} />
      </div>
      <div className={styles['setting__help']}>{help}</div>
    </button>
  );
};

const Settings = () => {
  return (
    <div className={styles.settings}>
      <h1 className={styles['settings__header']}>Settings</h1>
      <Setting
        label={'Confirm exit during playback'}
        help={
          "If you try to close the app while music is playing, you'll get a chance to keep the app open in case you didn't actually mean to close it."
        }
        setting={CONFIRM_EXIT_DURING_PLAYBACK}
        selector={selectConfirmExitDuringPlayback}
      />
      <Setting
        label={'Move anonymous activity to the next user account'}
        help={
          'When anyone signs in, any anonymous activity stored on this device will be moved into their account. You probably want this enabled unless you share this device with someone who uses Generative.fm without an account.'
        }
        setting={ANONYMOUS_IMPORTING}
        selector={selectAnonymousImporting}
      />
    </div>
  );
};

export default Settings;