import React, { lazy, Suspense } from 'react';

const withSpinner = (loadComponent) => {
  const LazyComponent = lazy(loadComponent);
  const ComponentWithFallback = (props) => (
    <Suspense fallback={null}>
      <LazyComponent {...props} />
    </Suspense>
  );

  return ComponentWithFallback;
};

export default withSpinner;
