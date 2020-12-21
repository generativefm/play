import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './context-menu-option.module.scss';
import useCreateContextMenu from './use-create-context-menu';

const ContextMenuOption = ({ children, onClick, href, linkTo }) => {
  const createContextMenu = useCreateContextMenu();
  const handleClick = useCallback(() => {
    if (typeof onClick === 'function') {
      onClick();
    }
    createContextMenu(null);
  }, [onClick, createContextMenu]);

  if (linkTo) {
    return (
      <Link
        className={styles['context-menu-option']}
        to={linkTo}
        onClick={handleClick}
      >
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        className={styles['context-menu-option']}
        href={href}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <div className={styles['context-menu-option']} onClick={handleClick}>
      {children}
    </div>
  );
};

export default ContextMenuOption;
