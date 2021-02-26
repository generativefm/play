import React, { lazy, Suspense } from 'react';
import retryable from './retryable';

const withSpinner = (loadComponent) => {
  const LazyComponent = lazy(retryable(loadComponent));
  const ComponentWithFallback = (props) => (
    <Suspense fallback={null}>
      <LazyComponent {...props} />
    </Suspense>
  );

  return ComponentWithFallback;
};

export default withSpinner;
