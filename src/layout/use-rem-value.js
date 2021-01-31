import { useState, useEffect, useMemo } from 'react';

const useRemValue = () => {
  const documentStyle = useMemo(
    () => window.getComputedStyle(document.documentElement),
    []
  );
  const [remValue, setRemValue] = useState(
    Number.parseInt(documentStyle.getPropertyValue('font-size'))
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setRemValue(Number.parseInt(documentStyle.getPropertyValue('font-size')));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class', 'id'],
    });

    return () => {
      observer.disconnect();
    };
  }, [documentStyle]);

  return remValue;
};

export default useRemValue;
