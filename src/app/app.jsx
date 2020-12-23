import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import createStore from '../store/create-store';
import Layout from '../layout/layout';
import MasterGainProvider from '../volume/master-gain-provider';
import ContextMenuProvider from './context-menu-provider';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';

const store = createStore();

const App = () => (
  <Auth0Provider
    domain="alexbainter.us.auth0.com"
    clientId="dVxdHNnv71wgV9Hfk7vQ6fCOPvwj173G"
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <MasterGainProvider>
        <Router>
          <ContextMenuProvider>
            <Layout />
          </ContextMenuProvider>
        </Router>
      </MasterGainProvider>
    </Provider>
  </Auth0Provider>
);

export default App;
