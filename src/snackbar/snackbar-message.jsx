import React, { useState, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useIsNarrowScreen from '../layout/use-is-narrow-screen';
import selectCurrentPieceId from '../queue/select-current-piece-id';
import TextButton from '../button/text-button';

import styles from './snackbar-message.module.scss';

const TIMEOUT = 5000;

const SnackbarMessage = ({
  message,
  action,
  shouldExitNow = false,
  onExited,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const isNarrowScreen = useIsNarrowScreen();
  const currentPieceId = useSelector(selectCurrentPieceId);

  useEffect(() => {
    if (!message || shouldExitNow) {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);
    if (isHovering) {
      return;
    }
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, TIMEOUT);
    return () => {
      clearTimeout(timeout);
    };
  }, [message, shouldExitNow, isHovering]);

  const handleActionClick = useCallback(() => {
    setIsVisible(false);
    if (!action.onClick) {
      return;
    }
    action.onClick();
  }, [action]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  if (!message) {
    return null;
  }

  return (
    <CSSTransition
      classNames={{
        appear: styles['snackbar-message--will-appear'],
        appearActive: styles['snackbar-message--is-appearing'],
        appearDone: styles['snackbar-message--has-appeared'],
        exit: styles['snackbar-message--will-exit'],
        exitActive: styles['snackbar-message--is-exiting'],
      }}
      in={isVisible && !shouldExitNow}
      timeout={200}
      appear
      unmountOnExit
      onExited={onExited}
    >
      <div
        className={classnames(styles['snackbar-message'], {
          [styles['snackbar-message--is-above-controls']]: currentPieceId,
          [styles['snackbar-message--is-above-bottom-nav']]: isNarrowScreen,
        })}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {message}
        {action && (
          <TextButton
            className={styles['snackbar-message__button']}
            onClick={handleActionClick}
          >
            {action.label}
          </TextButton>
        )}
      </div>
    </CSSTransition>
  );
};

SnackbarMessage.propTypes = {
  message: PropTypes.string.isRequired,
  action: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  }),
  shouldExitNow: PropTypes.bool,
  onExited: PropTypes.func,
};

export default SnackbarMessage;
