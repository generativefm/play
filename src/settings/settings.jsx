import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Switch from './switch';
import selectAnonymousImporting from './select-anonymous-importing';
import userChangedSetting from './user-changed-setting';
import { ANONYMOUS_IMPORTING } from './anonymous-importing-reducer';
import styles from './settings.module.scss';

const Setting = () => {
  const isActive = useSelector(selectAnonymousImporting);
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(
      userChangedSetting({ setting: ANONYMOUS_IMPORTING, value: !isActive })
    );
  }, [dispatch, isActive]);

  return (
    <button className={styles.setting} onClick={handleClick}>
      <div className={styles['setting__control']}>
        <div className={styles['setting__control__label']}>
          Move anonymous activity to the next user account
        </div>
        <Switch isActive={isActive} />
      </div>
      <div className={styles['setting__help']}>
        When anyone signs in, any anonymous activity stored on this device will
        be moved into their account. You probably want this enabled unless you
        share this device with someone who uses Generative.fm without an
        account.
      </div>
    </button>
  );
};

const Settings = () => {
  return (
    <div className={styles.settings}>
      <h1 className={styles['settings__header']}>Settings</h1>
      <Setting />
    </div>
  );
};

export default Settings;
