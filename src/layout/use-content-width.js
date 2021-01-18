import { useState, useLayoutEffect } from 'react';

const MAX_WIDTH_REM = 100;

const getContentWidth = () => {
  const remPx = Number.parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  const maxWidthPx = MAX_WIDTH_REM * remPx;
  return Math.min(maxWidthPx, window.innerWidth);
};

const useContentWidth = () => {
  const [contentWidth, setContentWidth] = useState(getContentWidth());
  useLayoutEffect(() => {
    setContentWidth(getContentWidth());
    const handleResize = () => {
      setContentWidth(getContentWidth());
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return contentWidth;
};

export default useContentWidth;
