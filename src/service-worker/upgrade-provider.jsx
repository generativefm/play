import React, { useEffect, useState, useCallback } from 'react';
import upgradeContext from './upgrade-context';
import register from './register';
import useShowSnackbar from '../snackbar/use-show-snackbar';

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
    if (!navigator.serviceWorker) {
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

export default UpgradeProvider;
