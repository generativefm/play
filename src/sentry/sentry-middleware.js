import { addBreadcrumb } from '@sentry/react';

const sentryMidleware = () => (next) => (action) => {
  if (action.meta && action.meta.shouldSentryIgnore) {
    return next(action);
  }
  addBreadcrumb({
    data: action,
    category: 'redux.action',
    timestamp: Date.now(),
  });
  return next(action);
};

export default sentryMidleware;
