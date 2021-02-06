import React, { useState, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
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
  const isNarrowScreen = useIsNarrowScreen();
  const currentPieceId = useSelector(selectCurrentPieceId);

  useEffect(() => {
    if (!message || shouldExitNow) {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, TIMEOUT);
    return () => {
      clearTimeout(timeout);
    };
  }, [message, shouldExitNow]);

  const handleActionClick = useCallback(() => {
    if (!action.onClick) {
      return;
    }
    setIsVisible(false);
    action.onClick();
  }, [action]);

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
      >
        {message}
        {action && (
          <TextButton
            className={styles['snackbar-message__button']}
            onClick={action.onClick}
          >
            {action.label}
          </TextButton>
        )}
      </div>
    </CSSTransition>
  );
};

export default SnackbarMessage;
