import { useContext } from 'react';
import contextMenuContext from './context-menu-context';

const useCreateContextMenu = () => {
  const createContextMenu = useContext(contextMenuContext);
  return createContextMenu;
};

export default useCreateContextMenu;
