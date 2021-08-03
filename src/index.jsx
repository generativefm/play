import React from 'react';
import { render } from 'react-dom';
import '@generative.fm/web-ui/styles/base.scss';
import App from './app/app';
import initializeSentry from './sentry/initialize';

if (process.env.SENTRY_DSN) {
  initializeSentry();
}

const rootElement = document.getElementById('root');

render(<App />, rootElement);
