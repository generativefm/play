import React, { useState, useCallback, useRef } from 'react';
import { VolumeUp, VolumeOff } from '@material-ui/icons';
import IconButton from '../button/icon-button';
import styles from './volume-slider.module.scss';

const VolumeSlider = () => {
  const [value, setValue] = useState(0.75);
  const ref = useRef(null);
  const isPointerDownRef = useRef(false);
  const handleClick = useCallback(() => {
    setValue((previousValue) => (previousValue > 0 ? 0 : 0.75));
  }, []);

  const setValueFromXPosition = useCallback((xPosition) => {
    if (!ref.current) {
      return;
    }

    const { x, width } = ref.current.getBoundingClientRect();
    const xPercent = Math.min(Math.max((xPosition - x) / width, 0), 1);
    setValue(xPercent);
  }, []);

  const handlePointerDown = useCallback(
    (event) => {
      if (!ref.current) {
        return;
      }
      isPointerDownRef.current = true;
      ref.current.setPointerCapture(event.pointerId);
      setValueFromXPosition(event.clientX);
    },
    [setValueFromXPosition]
  );

  const handlePointerMove = useCallback(
    (event) => {
      if (!ref.current || !isPointerDownRef.current) {
        return;
      }
      setValueFromXPosition(event.clientX);
    },
    [setValueFromXPosition]
  );

  const handlePointerUp = useCallback(
    (event) => {
      if (!ref.current) {
        return;
      }
      isPointerDownRef.current = false;
      setValueFromXPosition(event.clientX);
    },
    [setValueFromXPosition]
  );

  return (
    <div className={styles['volume-slider']}>
      <div
        className={styles.slider}
        ref={ref}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className={styles['slider__rail']}></div>
        <div
          className={styles['slider__fill']}
          style={{ width: `${value * 100}%` }}
        ></div>
        <button
          className={styles['slider__cap']}
          style={{ left: `${value * 100}%` }}
        ></button>
      </div>
      <IconButton onClick={handleClick}>
        {value === 0 ? <VolumeOff /> : <VolumeUp />}
      </IconButton>
    </div>
  );
};

export default VolumeSlider;
