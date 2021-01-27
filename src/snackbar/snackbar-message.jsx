import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import useIsNarrowScreen from '../layout/use-is-narrow-screen';
import selectCurrentPieceId from '../queue/select-current-piece-id';

import styles from './snackbar-message.module.scss';

const TIMEOUT = 5000;

const SnackbarMessage = ({ message, shouldExitNow = false, onExited }) => {
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
      </div>
    </CSSTransition>
  );
};

export default SnackbarMessage;
