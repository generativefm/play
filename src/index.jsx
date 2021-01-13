import React from 'react';
import { render } from 'react-dom';
import App from './app/app';
import './styles/base.scss';

const rootElement = document.getElementById('root');

render(<App />, rootElement);

if (process.env.NODE_ENV === 'production' && navigator.serviceWorker) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((registration) => {
      console.log('SW registered!', registration);
    })
    .catch((error) => {
      console.error('SW registration failed', error);
    });
}
