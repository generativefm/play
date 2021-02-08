import React, {
  useRef,
  useCallback,
  useLayoutEffect,
  useState,
  useEffect,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import useDismissable from '../app/use-dismissable';
import useCreateContextMenu from './use-create-context-menu';
import useIsNarrowScreen from '../layout/use-is-narrow-screen';
import styles from './context-menu.module.scss';

const ContextMenu = ({ x, y, children }) => {
  const ref = useRef(null);
  const [isTooFarRight, setIsTooFarRight] = useState(false);
  const [isTooFarDown, setIsTooFarDown] = useState(false);
  const createContextMenu = useCreateContextMenu();
  const isNarrowScreen = useIsNarrowScreen();
  const handleDismiss = useCallback(() => {
    createContextMenu(null);
  }, [createContextMenu]);
  useDismissable({ dismissableRef: ref, onDismiss: handleDismiss });

  useEffect(() => {}, []);

  useLayoutEffect(() => {
    const { width, height } = ref.current.getBoundingClientRect();
    const { scrollY, scrollX } = window;
    const { clientWidth, clientHeight } = document.body;
    setIsTooFarRight(x - scrollX + width > clientWidth);
    setIsTooFarDown(y - scrollY + height > clientHeight);
  }, [x, y, children]);

  const left = isTooFarRight && ref.current ? x - ref.current.offsetWidth : x;
  const top = isTooFarDown && ref.current ? y - ref.current.offsetHeight : y;

  if (isNarrowScreen) {
    return (
      <CSSTransition
        classNames={{
          appear: styles['context-menu--will-appear'],
          appearActive: styles['context-menu--is-appearing'],
          exit: styles['context-menu--will-exit'],
          exitActive: styles['context-menu--is-exiting'],
        }}
        in={true}
        appear={true}
        timeout={200}
      >
        <div className={styles['context-menu']}>
          <div ref={ref} className={styles['context-menu__content']}>
            {children}
          </div>
        </div>
      </CSSTransition>
    );
  }
  return (
    <div className={styles['context-menu']} style={{ left, top }} ref={ref}>
      {children}
    </div>
  );
};

ContextMenu.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default ContextMenu;
