import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './store/create-store';
import App from './app/app';
import { Auth0Provider } from '@auth0/auth0-react';
import './styles/base.scss';

const rootElement = document.getElementById('root');

render(
  <Auth0Provider
    domain="alexbainter.us.auth0.com"
    clientId="dVxdHNnv71wgV9Hfk7vQ6fCOPvwj173G"
    redirectUri={window.location.origin}
  >
    <Provider store={createStore()}>
      <App />
    </Provider>
  </Auth0Provider>,
  rootElement
);
