import { useCallback } from 'react';
import useCreateContextMenu from './use-create-context-menu';

const useCreateContextMenuForMouseEvent = (content) => {
  const createContextMenu = useCreateContextMenu();

  const createContextMenuForMouseEvent = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const { clientX: x, clientY: y } = event;
      createContextMenu({ x, y, content });
    },
    [createContextMenu, content]
  );

  return createContextMenuForMouseEvent;
};

export default useCreateContextMenuForMouseEvent;
