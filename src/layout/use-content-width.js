import { useState, useLayoutEffect } from 'react';
import useClientWidth from './use-client-width';

const MAX_WIDTH_REM = 100;

const getContentWidth = (clientWidth) => {
  const remPx = Number.parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  const maxWidthPx = MAX_WIDTH_REM * remPx;
  return Math.min(maxWidthPx, clientWidth);
};

const useContentWidth = () => {
  const clientWidth = useClientWidth();
  const [contentWidth, setContentWidth] = useState(
    getContentWidth(clientWidth)
  );
  useLayoutEffect(() => {
    setContentWidth(getContentWidth(clientWidth));
  }, [clientWidth]);
  return contentWidth;
};

export default useContentWidth;
