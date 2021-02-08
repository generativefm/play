import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import contextMenuContext from './context-menu-context';
import ContextMenu from './context-menu';
import styles from './context-menu-provider.module.scss';

const ContextMenuProvider = ({ children }) => {
  const [
    currentMenu,
    setCurrentMenu,
  ] = useState(/*{
    x: 100,
    y: 100,
    content: <UserContextMenu />,
  }*/);
  const createContextMenu = useCallback((contextMenuOptions) => {
    setCurrentMenu(contextMenuOptions);
  }, []);
  return (
    <contextMenuContext.Provider value={createContextMenu}>
      <div className={styles['context-menu-provider']}>
        {children}
        {currentMenu && (
          <ContextMenu x={currentMenu.x} y={currentMenu.y}>
            {currentMenu.content}
          </ContextMenu>
        )}
      </div>
    </contextMenuContext.Provider>
  );
};

ContextMenuProvider.propTypes = {
  children: PropTypes.node,
};

export default ContextMenuProvider;
