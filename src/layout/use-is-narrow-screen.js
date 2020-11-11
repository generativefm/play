import { useState, useCallback, useEffect, useRef } from 'react';

const MAX_NARROW_WIDTH_PX = 600;

const useIsNarrowScreen = () => {
  const mediaQueryListenerRef = useRef(
    window.matchMedia(`(max-width: ${MAX_NARROW_WIDTH_PX}px)`)
  );
  const [isNarrowScreen, setIsNarrowScreen] = useState(
    mediaQueryListenerRef.current.matches
  );
  const handleMediaQueryChange = useCallback((event) => {
    setIsNarrowScreen(event.matches);
  }, []);
  useEffect(() => {
    const mediaQueryListener = mediaQueryListenerRef.current;
    mediaQueryListener.addListener(handleMediaQueryChange);
    return () => {
      mediaQueryListener.removeListener(handleMediaQueryChange);
    };
  }, [handleMediaQueryChange]);

  return isNarrowScreen;
};

export default useIsNarrowScreen;
