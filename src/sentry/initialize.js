import { init } from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { version } from '../../package.json';

const initializeSentry = () => {
  init({
    dsn:
      'https://83203db44b19460d99745275e40fa6db@o461193.ingest.sentry.io/5626048',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1,
    release: version,
  });
};

export default initializeSentry;
