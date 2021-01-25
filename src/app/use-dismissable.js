import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const useDismissable = ({ isOpen = true, dismissableRef, onDismiss }) => {
  const history = useHistory();
  const [isOpening, setIsOpening] = useState(isOpen);
  useEffect(() => {
    if (isOpening || !isOpen || !dismissableRef.current) {
      return;
    }

    const handleDocumentClick = (event) => {
      if (isOpening.current || !dismissableRef.current) {
        return;
      }
      if (!dismissableRef.current.contains(event.target)) {
        onDismiss();
      }
    };

    const unlisten = history.listen(() => {
      onDismiss();
    });

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      unlisten();
    };
  }, [isOpen, dismissableRef, onDismiss, history, isOpening]);
  useEffect(() => {
    setIsOpening(false);
  }, [isOpen]);
  return dismissableRef;
};

export default useDismissable;
