import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import createStore from '../store/create-store';
import Layout from '../layout/layout';
import MasterGainProvider from '../volume/master-gain-provider';
import ContextMenuProvider from '../context-menu/context-menu-provider';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import importLegacyData from '../import/import-legacy-data';
import persistConfigs from '../storage/persist-configs';
import loadState from '../storage/load-state';
import hasImportedLegacyData from '../import/has-imported-legacy-data';
import IS_STORAGE_SUPPORTED from '../storage/is-supported';
import SnackbarProvider from '../snackbar/snackbar-provider';

const App = () => {
  const [reduxStore, setReduxStore] = useState(null);

  useEffect(() => {
    const storedStatePromise = IS_STORAGE_SUPPORTED
      ? loadState(persistConfigs)
      : Promise.resolve();
    storedStatePromise.then((storedState) => {
      const store = createStore(storedState);
      setReduxStore(store);
      const hasImportedLegacyDataPromise = IS_STORAGE_SUPPORTED
        ? hasImportedLegacyData()
        : Promise.resolve(false);
      hasImportedLegacyDataPromise.then((result) => {
        if (!result) {
          importLegacyData(store);
        }
      });
    });
  }, []);

  return (
    <Auth0Provider
      domain="alexbainter.us.auth0.com"
      clientId="dVxdHNnv71wgV9Hfk7vQ6fCOPvwj173G"
      redirectUri={window.location.origin}
      audience="https://api.generative.fm"
      useRefreshTokens={true}
    >
      {reduxStore && (
        <Provider store={reduxStore}>
          <SnackbarProvider>
            <MasterGainProvider>
              <Router>
                <ContextMenuProvider>
                  <Layout />
                </ContextMenuProvider>
              </Router>
            </MasterGainProvider>
          </SnackbarProvider>
        </Provider>
      )}
    </Auth0Provider>
  );
};

export default App;
