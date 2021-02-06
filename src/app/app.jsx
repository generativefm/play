import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MersenneTwister from 'mersenne-twister';
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
import beforeInstallPromptContext from './before-install-prompt-context';
import useActivePatrons from '../donate/use-active-patrons';
import UpgradeProvider from '../service-worker/upgrade-provider';

const App = () => {
  const [reduxStore, setReduxStore] = useState(null);
  const [beforeInstallPromptEvent, setBeforeInstallPromptEvent] = useState(
    null
  );
  const activePatrons = useActivePatrons({ isGreedy: true });

  useEffect(() => {
    if (!activePatrons) {
      return;
    }
    const seedNames = activePatrons
      .filter(({ creditScore }) => creditScore >= 0)
      .map(({ name }) => name.replace(/\s+/, ''));
    if (seedNames.length === 0) {
      return;
    }
    const seedString = seedNames.join('');
    let i = 0;
    let sum = 0;
    while (i < seedString.length) {
      sum += seedString.charCodeAt(i++);
    }
    const generator = new MersenneTwister(sum);
    window.generativeMusic = {
      rng: () => generator.random(),
    };
  }, [activePatrons]);

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

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      event.userChoice.then(() => {
        setBeforeInstallPromptEvent(null);
      });
      setBeforeInstallPromptEvent(event);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  return (
    <Auth0Provider
      domain="alexbainter.us.auth0.com"
      clientId="dVxdHNnv71wgV9Hfk7vQ6fCOPvwj173G"
      redirectUri={window.location.origin}
      audience="https://api.generative.fm"
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <beforeInstallPromptContext.Provider value={beforeInstallPromptEvent}>
        {reduxStore && (
          <Provider store={reduxStore}>
            <SnackbarProvider>
              <MasterGainProvider>
                <UpgradeProvider>
                  <Router>
                    <ContextMenuProvider>
                      <Layout />
                    </ContextMenuProvider>
                  </Router>
                </UpgradeProvider>
              </MasterGainProvider>
            </SnackbarProvider>
          </Provider>
        )}
      </beforeInstallPromptContext.Provider>
    </Auth0Provider>
  );
};

export default App;
