import legacyDataImported from './legacy-data-imported';
import setImported from './set-imported';

const LEGACY_ORIGIN =
  process.env.NODE_ENV === 'production'
    ? 'https://generative.fm'
    : 'http://localhost:9999';

const importLegacyData = (store) => {
  const iframe = document.createElement('iframe');

  const closeIframe = () => {
    iframe.contentWindow.close();
    iframe.remove();
    iframe.src = 'about:blank';
  };

  iframe.onload = () => {
    iframe.contentWindow.postMessage({ type: 'export-request' }, LEGACY_ORIGIN);
    window.addEventListener('message', (event) => {
      const { data, origin, source } = event;
      if (origin !== LEGACY_ORIGIN) {
        return;
      }
      if (data.type === 'export') {
        try {
          const parsedState = JSON.parse(data.state);
          if (!parsedState.isImported) {
            store.dispatch(legacyDataImported(parsedState));
            source.postMessage({ type: 'set-import-request' }, origin);
          } else {
            closeIframe();
          }
          setImported().catch((error) => {
            console.error('Unable to store imported state:', error);
          });
        } catch (error) {
          console.error('Unable to import legacy state', error);
          closeIframe();
        }
      }
      if (data.type === 'import-set') {
        closeIframe();
      }
    });
  };
  iframe.src = LEGACY_ORIGIN;
  iframe.style.visibility = 'hidden';
  document.body.append(iframe);
};

export default importLegacyData;
