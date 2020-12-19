import React, { useCallback, useState } from 'react';
import { Feedback } from '@material-ui/icons';
import contextMenuContext from './context-menu-context';
import ContextMenu from './context-menu';
import ContextMenuOption from './context-menu-option';
import styles from './context-menu-provider.module.scss';
import optionStyles from './context-menu-option.module.scss';

const ContextMenuProvider = ({ children }) => {
  const [currentMenu, setCurrentMenu] = useState(null);
  const createContextMenu = useCallback((contextMenuOptions) => {
    setCurrentMenu(contextMenuOptions);
  }, []);
  const handleContextMenu = useCallback((event) => {
    event.preventDefault();
    const { clientX: x, clientY: y } = event;
    setCurrentMenu({ x, y, content: null });
  }, []);
  return (
    <contextMenuContext.Provider value={createContextMenu}>
      <div
        className={styles['context-menu-provider']}
        onContextMenu={handleContextMenu}
      >
        {children}
        {currentMenu && (
          <ContextMenu x={currentMenu.x} y={currentMenu.y}>
            {currentMenu.content}
            <ContextMenuOption href="beepboop">
              <Feedback className={optionStyles['context-menu-option__icon']} />
              Send feedback
            </ContextMenuOption>
          </ContextMenu>
        )}
      </div>
    </contextMenuContext.Provider>
  );
};

export default ContextMenuProvider;
