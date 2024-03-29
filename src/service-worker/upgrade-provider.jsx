import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useShowSnackbar } from '@generative.fm/web-ui';
import upgradeContext from './upgrade-context';
import register from './register';

const UpgradeProvider = ({ children }) => {
  const [upgrade, setUpgrade] = useState(null);
  const showSnackbar = useShowSnackbar();
  const handleUpdateInstalled = useCallback(
    (upgradeToNew) => {
      setUpgrade(() => upgradeToNew);
      showSnackbar({
        message: 'An update was installed',
        action: {
          label: 'Upgrade',
          onClick: upgradeToNew,
        },
      });
    },
    [showSnackbar]
  );

  useEffect(() => {
    if (
      !navigator.serviceWorker ||
      process.env.NODE_ENV !== 'production' ||
      window.Cypress
    ) {
      return;
    }
    //TODO this needs to be undone in a callback
    //that said, this will never actually run more than once
    register({ onUpdateInstalled: handleUpdateInstalled });
  }, [handleUpdateInstalled]);

  return (
    <upgradeContext.Provider value={upgrade}>
      {children}
    </upgradeContext.Provider>
  );
};

UpgradeProvider.propTypes = {
  children: PropTypes.node,
};

export default UpgradeProvider;
