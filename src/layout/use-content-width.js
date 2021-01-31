import { useState, useEffect } from 'react';
import useClientWidth from './use-client-width';
import useRemValue from './use-rem-value';

const MAX_WIDTH_REM = 100;

const useContentWidth = () => {
  const clientWidth = useClientWidth();
  const remValue = useRemValue();
  const [contentWidth, setContentWidth] = useState(
    Math.min(remValue * MAX_WIDTH_REM, clientWidth)
  );
  useEffect(() => {
    setContentWidth(Math.min(remValue * MAX_WIDTH_REM, clientWidth));
  }, [clientWidth, remValue]);
  return contentWidth;
};

export default useContentWidth;
