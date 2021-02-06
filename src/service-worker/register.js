const handleControllerChange = () => {
  navigator.serviceWorker.removeEventListener(
    'controllerchange',
    handleControllerChange
  );
  window.location.reload();
};

const handleStateChange = ({ newWorker, onUpdateInstalled }) => {
  if (newWorker.state !== 'installed' || !navigator.serviceWorker.controller) {
    return;
  }
  const upgrade = () => {
    navigator.serviceWorker.addEventListener(
      'controllerchange',
      handleControllerChange
    );
    newWorker.postMessage({ action: 'skipWaiting' });
  };
  onUpdateInstalled(upgrade);
};

const checkForUpdates = ({ registration, onUpdateInstalled }) => {
  registration.addEventListener('updatefound', () => {
    const newWorker = registration.installing;
    newWorker.addEventListener('statechange', () =>
      handleStateChange({ newWorker, onUpdateInstalled })
    );
  });
};

const register = ({ onUpdateInstalled } = {}) =>
  navigator.serviceWorker
    .register('/sw.js')
    .then((registration) =>
      checkForUpdates({ registration, onUpdateInstalled })
    );

export default register;
