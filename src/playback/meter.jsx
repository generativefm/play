import React, { useEffect, useState } from 'react';
import { Meter as ToneMeter } from 'tone';
import useMasterGain from '../volume/use-master-gain';
import styles from './meter.module.scss';

const MIN_DB = -30;

const getHeight = (db) => `${(1 - db / MIN_DB) * 100}%`;

const Meter = () => {
  const masterGain = useMasterGain();
  const [currentDb, setCurrentDb] = useState(MIN_DB);

  useEffect(() => {
    const meter = new ToneMeter();
    masterGain.connect(meter);
    const interval = setInterval(() => {
      setCurrentDb(meter.getValue());
    }, 10);

    return () => {
      clearInterval(interval);
      meter.dispose();
    };
  }, [masterGain]);

  return (
    <div className={styles.meter}>
      <div className={styles['meter__bar']}>
        <div
          className={styles['meter__bar__fill']}
          style={{ height: getHeight(currentDb), willChange: 'height' }}
        />
      </div>
    </div>
  );
};

export default Meter;
