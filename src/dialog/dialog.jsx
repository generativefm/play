import React, { useState, useCallback, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import TextButton from '../button/text-button';
import styles from './dialog.module.scss';

const Dialog = ({ title, actions, children, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);

  const wrapOnClick = useCallback(
    (onClick) => () => {
      setIsVisible(false);
      if (typeof onClick === 'function') {
        onClick();
      }
    },
    []
  );

  const makeClickHandlers = useCallback(
    () => actions.map(({ onClick }) => wrapOnClick(onClick)),
    [actions, wrapOnClick]
  );

  const [clickHandlers, setClickHandlers] = useState(makeClickHandlers());

  useEffect(() => {
    setClickHandlers(makeClickHandlers());
  }, [makeClickHandlers]);

  return (
    <CSSTransition
      classNames={{
        appear: styles['dialog-container--will-appear'],
        appearActive: styles['dialog-container--is-appearing'],
        exit: styles['dialog-container--will-exit'],
        exitActive: styles['dialog-container--is-exiting'],
      }}
      timeout={200}
      in={isVisible}
      appear
      unmountOnExit
      onExited={onDismiss}
    >
      <div className={styles['dialog-container']}>
        <div className={styles.dialog}>
          <h1 className={styles['dialog__header']}>
            Anonymous activity moved to your account
          </h1>
          <div className={styles['dialog__body']}>{children}</div>
          <div className={styles['dialog__footer']}>
            {actions.map(({ text }, i) => (
              <TextButton key={i} onClick={clickHandlers[i]}>
                {text}
              </TextButton>
            ))}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Dialog;
