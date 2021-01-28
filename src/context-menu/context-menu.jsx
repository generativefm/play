import React, {
  useRef,
  useCallback,
  useLayoutEffect,
  useState,
  useEffect,
} from 'react';
import useDismissable from '../app/use-dismissable';
import useCreateContextMenu from './use-create-context-menu';
import styles from './context-menu.module.scss';

const ContextMenu = ({ x, y, children }) => {
  const ref = useRef(null);
  const [isTooFarRight, setIsTooFarRight] = useState(false);
  const [isTooFarDown, setIsTooFarDown] = useState(false);
  const createContextMenu = useCreateContextMenu();
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

  return (
    <div className={styles['context-menu']} style={{ left, top }} ref={ref}>
      {children}
    </div>
  );
};

export default ContextMenu;
