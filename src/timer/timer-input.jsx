import React, { useState, useCallback, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import selectTimer from './select-timer';
import userStoppedTimer from './user-stopped-timer';
import styles from './timer-input.module.scss';

const TimerInputDigit = ({ fullValue, reverseIndex, cursorIndex, onClick }) => {
  const isUserInput = fullValue.length >= reverseIndex + 1;
  const hasCursor = cursorIndex === fullValue.length - reverseIndex;
  const currentValue =
    fullValue.charAt(fullValue.length - (reverseIndex + 1)) || 0;
  const handleClick = useCallback(
    (event) => {
      event.stopPropagation();
      onClick(reverseIndex);
    },
    [onClick, reverseIndex]
  );
  return (
    <div
      onClick={handleClick}
      className={classnames(styles['timer-input__digit'], {
        [styles['timer-input__digit--is-user-input']]: isUserInput,
        [styles['timer-input__digit--has-cursor']]: hasCursor,
      })}
    >
      {currentValue}
    </div>
  );
};

const padZero = (num) => {
  const str = num.toString();
  if (str.length === 1) {
    return `0${str}`;
  }
  return str;
};

const convertDurationTo4DigitFormat = (duration) => {
  if (typeof duration !== 'number' || duration < 60 * 1000) {
    return '';
  }
  const hours = Math.min(Math.floor(duration / (60 * 60 * 1000)), 99);
  const minutes = Math.min(
    Math.floor((duration - hours * 60 * 60 * 1000) / (60 * 1000)),
    59
  );
  return `${padZero(hours)}${padZero(minutes)}`;
};

const convert4DigitFormatToDuration = (value) => {
  const minutes = Number.parseInt(value.substring(value.length - 2));
  const hours = Number.parseInt(
    value.substring(value.length - 4, value.length - 2)
  );
  let duration = 0;
  if (!Number.isNaN(hours)) {
    duration += hours * 60 * 60 * 1000;
  }
  if (!Number.isNaN(minutes)) {
    duration += minutes * 60 * 1000;
    return duration;
  }
  return null;
};

const TimerInput = ({ onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cursorIndex, setCursorIndex] = useState(0);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const timer = useSelector(selectTimer);
  const [currentValue, setCurrentValue] = useState(
    convertDurationTo4DigitFormat(timer)
  );

  useEffect(() => {
    setCurrentValue(convertDurationTo4DigitFormat(timer));
  }, [timer]);

  useEffect(() => {
    onChange(convert4DigitFormatToDuration(currentValue));
  }, [onChange, currentValue]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      event.preventDefault();
      if (currentValue.length < 4 && /^\d$/.test(event.key)) {
        setCurrentValue((value) => {
          const chars = value.split('');
          chars.splice(cursorIndex, 0, event.key);
          return chars.join('');
        });
        setCursorIndex((previousValue) => previousValue + 1);
      }
      if (event.key === 'Backspace' && cursorIndex > 0) {
        setCurrentValue((value) => {
          const chars = value.split('');
          chars.splice(cursorIndex - 1, 1);
          return chars.join('');
        });
        setCursorIndex((previousValue) => previousValue - 1);
      }
      if (event.key === 'Delete' && cursorIndex < currentValue.length) {
        setCurrentValue((value) => {
          const chars = value.split('');
          chars.splice(cursorIndex, 1);
          return chars.join('');
        });
      }
    },
    [currentValue, cursorIndex]
  );

  const handleDigitClick = useCallback(
    (reverseIndex) => {
      if (timer) {
        dispatch(userStoppedTimer());
      }
      if (inputRef.current) {
        inputRef.current.focus();
      }
      if (isEditing) {
        setCursorIndex(Math.max(currentValue.length - reverseIndex, 0));
        return;
      }
      setIsEditing(true);
      setCursorIndex(currentValue.length);
    },
    [currentValue.length, isEditing, timer, dispatch]
  );

  const handleClick = useCallback(() => {
    if (timer) {
      dispatch(userStoppedTimer());
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setIsEditing(true);
    setCursorIndex(currentValue.length);
  }, [currentValue.length, timer, dispatch]);

  const handleMouseDown = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <div
      className={classnames(styles['timer-input'], {
        [styles['timer-input--is-editing']]: isEditing,
      })}
      onClick={handleClick}
      onBlur={handleBlur}
      onMouseDown={handleMouseDown}
    >
      <TimerInputDigit
        fullValue={currentValue}
        reverseIndex={3}
        cursorIndex={cursorIndex}
        onClick={handleDigitClick}
      />
      <TimerInputDigit
        fullValue={currentValue}
        reverseIndex={2}
        cursorIndex={cursorIndex}
        onClick={handleDigitClick}
      />
      <div
        className={classnames(styles['timer-input__unit'], {
          [styles['timer-input__unit--is-user-input']]:
            currentValue.length >= 3,
        })}
      >
        h
      </div>
      <TimerInputDigit
        fullValue={currentValue}
        reverseIndex={1}
        cursorIndex={cursorIndex}
        onClick={handleDigitClick}
      />
      <TimerInputDigit
        fullValue={currentValue}
        reverseIndex={0}
        cursorIndex={cursorIndex}
        onClick={handleDigitClick}
      />
      <div
        className={classnames(styles['timer-input__unit'], {
          [styles['timer-input__unit--is-user-input']]:
            currentValue.length >= 1,
        })}
      >
        m
      </div>
      <input
        className={styles['timer-input__input']}
        pattern="\d*"
        type="number"
        maxLength="4"
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default TimerInput;
