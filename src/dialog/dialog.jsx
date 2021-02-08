import React, { useState, useCallback, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import TextButton from '../button/text-button';
import IconButton from '../button/icon-button';
import useDismissable from '../app/use-dismissable';
import styles from './dialog.module.scss';

const Dialog = ({ title, actions, children, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef(null);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
  }, []);

  useDismissable({
    isOpen: isVisible,
    dismissableRef: ref,
    onDismiss: handleDismiss,
  });

  const wrapOnClick = useCallback(
    (onClick) => () => {
      setIsVisible(false);
      if (typeof onClick === 'function') {
        onClick();
      }
    },
    []
  );

  const hasActions = Array.isArray(actions) && actions.length > 0;

  const makeClickHandlers = useCallback(
    () =>
      hasActions ? actions.map(({ onClick }) => wrapOnClick(onClick)) : [],
    [hasActions, actions, wrapOnClick]
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
        <div className={styles.dialog} ref={ref}>
          <h1 className={styles['dialog__header']}>
            {title}
            {!hasActions && (
              <IconButton onClick={handleDismiss}>
                <Close />
              </IconButton>
            )}
          </h1>
          <div className={styles['dialog__body']}>{children}</div>
          {hasActions && (
            <div className={styles['dialog__footer']}>
              {actions.map(({ text }, i) => (
                <TextButton key={i} onClick={clickHandlers[i]}>
                  {text}
                </TextButton>
              ))}
            </div>
          )}
        </div>
      </div>
    </CSSTransition>
  );
};

Dialog.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ),
  children: PropTypes.node.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default Dialog;
