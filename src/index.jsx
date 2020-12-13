import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import createStore from './store/create-store';
import fetchData from './piece/fetch-data';
import App from './app/app';
import MasterGainProvider from './volume/master-gain-provider';
import './styles/base.scss';

const rootElement = document.getElementById('root');
const store = createStore();

fetchData(store);

render(
  <Auth0Provider
    domain="alexbainter.us.auth0.com"
    clientId="dVxdHNnv71wgV9Hfk7vQ6fCOPvwj173G"
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <MasterGainProvider>
        <App />
      </MasterGainProvider>
    </Provider>
  </Auth0Provider>,
  rootElement
);
