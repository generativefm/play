import React, { useCallback, useState } from 'react';
// import { Feedback } from '@material-ui/icons';
import contextMenuContext from './context-menu-context';
import ContextMenu from './context-menu';
// import ContextMenuOption from './context-menu-option';
import styles from './context-menu-provider.module.scss';
// import optionStyles from './context-menu-option.module.scss';

// const fmo = (
//   <ContextMenuOption href="beepboop">
//     <Feedback className={optionStyles['context-menu-option__icon']} />
//     Send feedback
//   </ContextMenuOption>
// );

const ContextMenuProvider = ({ children }) => {
  const [currentMenu, setCurrentMenu] = useState(null);
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

export default ContextMenuProvider;
