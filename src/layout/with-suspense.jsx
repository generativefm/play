import React, { lazy, Suspense } from 'react';

const withSpinner = (loadComponent) => {
  const LazyComponent = lazy(loadComponent);
  const ComponentWithFallback = () => (
    <Suspense fallback={null}>
      <LazyComponent />
    </Suspense>
  );
  return ComponentWithFallback;
};

export default withSpinner;
