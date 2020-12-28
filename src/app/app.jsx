import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import createStore from '../store/create-store';
import Layout from '../layout/layout';
import MasterGainProvider from '../volume/master-gain-provider';
import ContextMenuProvider from './context-menu-provider';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import importLegacyData from '../import/import-legacy-data';
import persistConfigs from '../storage/persist-configs';
import loadState from '../storage/load-state';
import persistStore from '../storage/persist-store';
import hasImportedLegacyData from '../import/has-imported-legacy-data';

const App = () => {
  const [reduxStore, setReduxStore] = useState(null);

  useEffect(() => {
    loadState(persistConfigs).then((storedState) => {
      console.log(storedState);
      const store = createStore(storedState);
      persistStore(store, persistConfigs);
      setReduxStore(store);
      hasImportedLegacyData().then((result) => {
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
    >
      {reduxStore && (
        <Provider store={reduxStore}>
          <MasterGainProvider>
            <Router>
              <ContextMenuProvider>
                <Layout />
              </ContextMenuProvider>
            </Router>
          </MasterGainProvider>
        </Provider>
      )}
    </Auth0Provider>
  );
};

export default App;
