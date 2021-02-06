import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MersenneTwister from 'mersenne-twister';
import Layout from '../layout/layout';
import MasterGainProvider from '../volume/master-gain-provider';
import ContextMenuProvider from '../context-menu/context-menu-provider';
import { Provider } from 'react-redux';
import SnackbarProvider from '../snackbar/snackbar-provider';
import UpgradeProvider from '../service-worker/upgrade-provider';
import useActivePatrons from '../donate/use-active-patrons';

const ReduxApp = ({ store }) => {
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

  if (!store) {
    return null;
  }

  return (
    <Provider store={store}>
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
  );
};

export default ReduxApp;
