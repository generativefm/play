import { init } from '@sentry/react';
import { Integrations } from '@sentry/tracing';

const initializeSentry = () => {
  init({
    dsn: process.env.SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.75,
    release: process.env.APP_VERSION,
  });
};

export default initializeSentry;
