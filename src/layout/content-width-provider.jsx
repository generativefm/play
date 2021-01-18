import React, { useState, useLayoutEffect } from 'react';
import contentWidthContext from './content-width-context';

const MAX_WIDTH_REM = 100;

const getContentWidth = () => {
  const remPx = Number.parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  const maxWidthPx = MAX_WIDTH_REM * remPx;
  return Math.min(maxWidthPx, window.innerWidth);
};

const ContentWidthProvider = ({ children }) => {
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
  return (
    <contentWidthContext.Provider value={contentWidth}>
      {children}
    </contentWidthContext.Provider>
  );
};

export default ContentWidthProvider;
