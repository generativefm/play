import React from 'react';
import { render } from 'react-dom';
import App from './app/app';
import initializeSentry from './sentry/initialize';
import './styles/base.scss';

if (process.env.SENTRY_DSN) {
  initializeSentry();
}

const rootElement = document.getElementById('root');

render(<App />, rootElement);
