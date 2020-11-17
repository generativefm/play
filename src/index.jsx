import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './store/create-store';
import App from './app/app';
import './styles/base.scss';

const rootElement = document.getElementById('root');

render(
  <Provider store={createStore()}>
    <App />
  </Provider>,
  rootElement
);
