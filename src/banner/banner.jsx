import React, { useState, useCallback, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import useContentWidth from '../layout/use-content-width';
import TextButton from '../button/text-button';
import styles from './banner.module.scss';

const Banner = ({ text, actions, icon = null, onDismiss }) => {
  const contentWidth = useContentWidth();
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

  const clickHandlers = useMemo(
    () => actions.map(({ onClick }) => wrapOnClick(onClick)),
    [actions, wrapOnClick]
  );

  return (
    <CSSTransition
      classNames={{
        appear: styles['banner--will-appear'],
        appearActive: styles['banner--is-appearing'],
        exit: styles['banner--will-exit'],
        exitActive: styles['banner--is-exiting'],
      }}
      timeout={2000}
      in={isVisible}
      appear
      unmountOnExit
      onExited={onDismiss}
    >
      <div className={styles.banner} style={{ width: `${contentWidth}px` }}>
        <div className={styles['banner__content']}>
          {icon && (
            <div className={styles['banner__content__icon']}>{icon}</div>
          )}
          {text}
        </div>
        <div className={styles['banner__buttons']}>
          {actions.map(({ text: actionText }, i) => (
            <TextButton onClick={clickHandlers[i]} key={actionText}>
              {actionText}
            </TextButton>
          ))}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Banner;
