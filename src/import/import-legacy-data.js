import { mergeData } from '@generative.fm/user';
import { byId } from '@generative-music/pieces-alex-bainter';
import setImported from './set-imported';

const convertLegacyPieceId = (legacyPieceId) =>
  legacyPieceId.replace('alex-bainter-', '');

const convertLegacyStateToUserData = (legacyState) => {
  const { favorites, playTime: legacyPlayTime } = legacyState;
  const now = Date.now();
  const likes = favorites
    .map(convertLegacyPieceId)
    .filter((pieceId) => Boolean(byId[pieceId]))
    .reduce((o, pieceId) => {
      o[pieceId] = now;
      return o;
    }, {});
  const playTime = Object.keys(legacyPlayTime).reduce((o, legacyPieceId) => {
    const pieceId = convertLegacyPieceId(legacyPieceId);
    if (!byId[pieceId]) {
      return o;
    }
    o[pieceId] = legacyPlayTime[legacyPieceId];
    return o;
  }, {});
  return { likes, playTime };
};

const importLegacyData = (store) => {
  let legacyOrigin;
  switch (window.location.origin) {
    case 'https://play.generative.fm': {
      legacyOrigin = 'https://generative.fm';
      break;
    }
    case 'https://staging.play.generative.fm': {
      legacyOrigin = 'https://staging.generative.fm';
      break;
    }
    case 'http://localhost:8080': {
      legacyOrigin = 'http://localhost:3000';
      break;
    }
  }

  if (!legacyOrigin || window.Cypress) {
    return;
  }

  const iframe = document.createElement('iframe');

  const closeIframe = () => {
    iframe.contentWindow.close();
    iframe.remove();
    iframe.src = 'about:blank';
  };

  iframe.onload = () => {
    iframe.contentWindow.postMessage({ type: 'export-request' }, legacyOrigin);
    window.addEventListener('message', (event) => {
      const { data, origin, source } = event;
      if (origin !== legacyOrigin) {
        return;
      }
      if (data.type === 'export') {
        try {
          const parsedState = JSON.parse(data.state);
          if (parsedState === null || typeof parsedState !== 'object') {
            setImported().catch((error) => {
              console.error('Unable to store imported state:', error);
            });
            closeIframe();
            return;
          }
          if (!parsedState.isImported) {
            const action = mergeData(convertLegacyStateToUserData(parsedState));
            action.meta = Object.assign({}, action.meta, {
              snackbar: {
                message: 'Play time and favorites imported from the old player',
              },
            });
            store.dispatch(action);
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
  iframe.src = legacyOrigin;
  iframe.style.visibility = 'hidden';
  document.body.append(iframe);
};

export default importLegacyData;
