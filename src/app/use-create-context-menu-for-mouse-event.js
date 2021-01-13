import { useCallback } from 'react';
import useCreateContextMenu from './use-create-context-menu';

const useCreateContextMenuForMouseEvent = (content) => {
  const createContextMenu = useCreateContextMenu();

  const createContextMenuForMouseEvent = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const { clientX, clientY } = event;
      const x = clientX + window.scrollX;
      const y = clientY + window.scrollY;
      createContextMenu({ x, y, content });
    },
    [createContextMenu, content]
  );

  return createContextMenuForMouseEvent;
};

export default useCreateContextMenuForMouseEvent;
