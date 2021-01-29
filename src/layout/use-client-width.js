import { useState, useLayoutEffect } from 'react';

const useClientWidth = () => {
  const [clientWidth, setClientWidth] = useState(document.body.clientWidth);
  useLayoutEffect(() => {
    setClientWidth(document.body.clientWidth);
    const handleResize = () => {
      setClientWidth(document.body.clientWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return clientWidth;
};

export default useClientWidth;
