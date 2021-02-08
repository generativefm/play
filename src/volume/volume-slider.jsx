import React, { useCallback, useRef, useEffect } from 'react';
import { VolumeUp, VolumeOff } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '../button/icon-button';
import selectCurrentGainValue from './select-current-gain-value';
import userAdjustedMasterGain from './user-adjusted-master-gain';
import userClickedVolumeButton from './user-clicked-volume-button';
import useHotkey from '../app/use-hotkey';
import styles from './volume-slider.module.scss';

const VolumeSlider = () => {
  const currentGainValue = useSelector(selectCurrentGainValue);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const isPointerDownRef = useRef(false);
  const isMouseOverRef = useRef(false);
  const handleClick = useCallback(() => {
    dispatch(userClickedVolumeButton());
  }, [dispatch]);

  useHotkey('m', handleClick);

  const setValueFromXPosition = useCallback(
    (xPosition) => {
      if (!ref.current) {
        return;
      }

      const { x, width } = ref.current.getBoundingClientRect();
      const xPercent = Math.min(Math.max((xPosition - x) / width, 0), 1);
      dispatch(userAdjustedMasterGain(xPercent));
    },
    [dispatch]
  );

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

  const handleMouseEnter = useCallback(() => {
    isMouseOverRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isMouseOverRef.current = false;
  }, []);

  useEffect(() => {
    const handleWheel = (event) => {
      if (!isMouseOverRef.current) {
        return;
      }
      event.preventDefault();
      let gainDelta;
      if (event.deltaY < 0 || event.deltaX < 0) {
        gainDelta = 0.05;
      } else if (event.deltaY > 0 || event.deltaX > 0) {
        gainDelta = -0.05;
      }
      const adjustedGain = Math.min(
        Math.max(currentGainValue + gainDelta, 0),
        1
      );
      dispatch(userAdjustedMasterGain(adjustedGain));
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel, { passive: false });
    };
  });

  return (
    <div className={styles['volume-slider']}>
      <div
        className={styles.slider}
        ref={ref}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles['slider__rail']}></div>
        <div
          className={styles['slider__fill']}
          style={{ width: `${currentGainValue * 100}%` }}
        ></div>
        <button
          className={styles['slider__cap']}
          style={{ left: `${currentGainValue * 100}%` }}
        ></button>
      </div>
      <IconButton onClick={handleClick}>
        {currentGainValue === 0 ? <VolumeOff /> : <VolumeUp />}
      </IconButton>
    </div>
  );
};

export default VolumeSlider;
