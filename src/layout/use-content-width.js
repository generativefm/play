import { useState, useEffect } from 'react';
import useClientWidth from './use-client-width';
import useRemValue from './use-rem-value';
import useIsNarrowScreen from './use-is-narrow-screen';

const MAX_WIDTH_REM = 100;

const useContentWidth = () => {
  const clientWidth = useClientWidth();
  const remValue = useRemValue();
  const isNarrowScreen = useIsNarrowScreen();
  const [contentWidth, setContentWidth] = useState(
    Math.min(remValue * MAX_WIDTH_REM, clientWidth) -
      (isNarrowScreen ? 0 : remValue * 2)
  );
  useEffect(() => {
    setContentWidth(
      Math.min(remValue * MAX_WIDTH_REM, clientWidth) -
        (isNarrowScreen ? 0 : remValue * 2)
    );
  }, [clientWidth, remValue, isNarrowScreen]);
  return contentWidth;
};

export default useContentWidth;
