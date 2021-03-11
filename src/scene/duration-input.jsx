import React, { useState, useCallback, useRef, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './duration-input.module.scss';

const DurationInputDigit = ({
  fullValue,
  reverseIndex,
  cursorIndex,
  onClick,
}) => {
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
      className={classnames(styles['duration-input__digit'], {
        [styles['duration-input__digit--is-user-input']]: isUserInput,
        [styles['duration-input__digit--has-cursor']]: hasCursor,
        [styles['duration-input__digit--has-cursor-before']]:
          reverseIndex === 3 && cursorIndex === 0 && fullValue.length === 4,
      })}
    >
      {currentValue}
    </div>
  );
};

DurationInputDigit.propTypes = {
  fullValue: PropTypes.string.isRequired,
  reverseIndex: PropTypes.number.isRequired,
  cursorIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

const convertDurationToStringValue = (duration) => {
  if (typeof duration !== 'number' || duration < 60 * 1000) {
    return '';
  }
  const hours = Math.min(Math.floor(duration / (60 * 60 * 1000)), 99);
  const minutes = Math.min(
    Math.floor((duration - hours * 60 * 60 * 1000) / (60 * 1000)),
    59
  );
  if (hours > 0) {
    return `${hours > 0 ? hours : ''}${minutes > 9 ? minutes : `0${minutes}`}`;
  }
  return `${minutes}`;
};

const convertStringValueToDuration = (value) => {
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

const DurationInput = (props) => {
  const { value, onChange, onFocus } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [cursorIndex, setCursorIndex] = useState(0);
  const inputRef = useRef(null);
  const [stringValue, setStringValue] = useState(
    convertDurationToStringValue(value)
  );

  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      event.preventDefault();
      if (/^\d$/.test(event.key)) {
        if (stringValue.length < 4) {
          setCursorIndex((previousIndex) => Math.min(previousIndex + 1, 4));
        }
        const chars = stringValue.split('');
        chars.splice(cursorIndex, 0, event.key);
        setStringValue(chars.join('').slice(-4));
        return;
      }
      if (event.key === 'Backspace' && cursorIndex > 0) {
        setCursorIndex((previousValue) => previousValue - 1);
        const chars = stringValue.split('');
        chars.splice(cursorIndex - 1, 1);
        setStringValue(chars.join(''));
        return;
      }
      if (event.key === 'Delete' && cursorIndex < stringValue.length) {
        const chars = stringValue.split('');
        chars.splice(cursorIndex, 1);
        setStringValue(chars.join(''));
        return;
      }
      if (event.key === 'ArrowLeft' && cursorIndex > 0) {
        setCursorIndex((previousIndex) => previousIndex - 1);
        return;
      }
      if (event.key === 'ArrowRight' && cursorIndex < stringValue.length) {
        setCursorIndex((previousIndex) => previousIndex + 1);
      }
    },
    [stringValue, setStringValue, cursorIndex]
  );

  const handleDigitClick = useCallback(
    (reverseIndex) => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      if (isEditing) {
        setCursorIndex(Math.max(stringValue.length - reverseIndex, 0));
        return;
      }
      setIsEditing(true);
      setCursorIndex(stringValue.length);
    },
    [stringValue.length, isEditing]
  );

  const handleClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setIsEditing(true);
    setCursorIndex(stringValue.length);
  }, [stringValue.length]);

  const handleMouseDown = useCallback((event) => {
    event.preventDefault();
  }, []);

  useEffect(() => {
    if (isEditing) {
      return;
    }
    setStringValue(convertDurationToStringValue(value));
  }, [value, isEditing]);

  useEffect(() => {
    onChange(convertStringValueToDuration(stringValue));
  }, [onChange, stringValue]);

  return (
    <div
      className={classnames(styles['duration-input'], {
        [styles['duration-input--is-editing']]: isEditing,
      })}
      onClick={handleClick}
      onBlur={handleBlur}
      onMouseDown={handleMouseDown}
    >
      <DurationInputDigit
        fullValue={stringValue}
        reverseIndex={3}
        cursorIndex={cursorIndex}
        onClick={handleDigitClick}
      />
      <DurationInputDigit
        fullValue={stringValue}
        reverseIndex={2}
        cursorIndex={cursorIndex}
        onClick={handleDigitClick}
      />
      <div
        className={classnames(styles['duration-input__unit'], {
          [styles['duration-input__unit--is-user-input']]:
            stringValue.length >= 3,
        })}
      >
        h
      </div>
      <DurationInputDigit
        fullValue={stringValue}
        reverseIndex={1}
        cursorIndex={cursorIndex}
        onClick={handleDigitClick}
      />
      <DurationInputDigit
        fullValue={stringValue}
        reverseIndex={0}
        cursorIndex={cursorIndex}
        onClick={handleDigitClick}
      />
      <div
        className={classnames(styles['duration-input__unit'], {
          [styles['duration-input__unit--is-user-input']]:
            stringValue.length >= 1,
        })}
      >
        m
      </div>
      <input
        className={styles['duration-input__input']}
        pattern="\d*"
        type="number"
        maxLength="4"
        ref={inputRef}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        data-cy={props['data-cy']}
      />
    </div>
  );
};

DurationInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
};

export default DurationInput;
