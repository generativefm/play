import React, { useState, useEffect } from 'react';
import importLegacyData from '../import/import-legacy-data';
import persistConfigs from '../storage/persist-configs';
import loadState from '../storage/load-state';
import hasImportedLegacyData from '../import/has-imported-legacy-data';
import IS_STORAGE_SUPPORTED from '../storage/is-supported';
import beforeInstallPromptContext from './before-install-prompt-context';
import withSuspense from '../loading/with-suspense';
import retryable from '../loading/retryable';

const getCreateStore = retryable(() =>
  import('../store/create-store').then(
    (createStoreModule) => createStoreModule.default
  )
);
const Auth0Provider = withSuspense(() =>
  import('@auth0/auth0-react').then(({ Auth0Provider }) => ({
    default: Auth0Provider,
  }))
);
const ReduxApp = withSuspense(() => import('./redux-app'));

const App = () => {
  const [reduxStore, setReduxStore] = useState(null);
  const [beforeInstallPromptEvent, setBeforeInstallPromptEvent] = useState(
    null
  );

  useEffect(() => {
    const storedStatePromise = IS_STORAGE_SUPPORTED
      ? loadState(persistConfigs).catch(() => undefined)
      : Promise.resolve();
    Promise.all([storedStatePromise, getCreateStore()]).then(
      ([storedState, createStore]) => {
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
      }
    );

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
    <beforeInstallPromptContext.Provider value={beforeInstallPromptEvent}>
      <Auth0Provider
        domain="alexbainter.us.auth0.com"
        clientId="dVxdHNnv71wgV9Hfk7vQ6fCOPvwj173G"
        redirectUri={window.location.origin}
        audience="https://api.generative.fm"
        useRefreshTokens={true}
        cacheLocation="localstorage"
      >
        <ReduxApp store={reduxStore} />
      </Auth0Provider>
    </beforeInstallPromptContext.Provider>
  );
};

export default App;
