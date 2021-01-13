import { promisifyRequest } from '@alexbainter/indexed-db';
import openDb from './open-db';
import STATE_OBJECT_STORE_NAME from './state-object-store-name';
import persistConfigs from './persist-configs';
import IS_SUPPORTED from './is-supported';

const persistStateMiddleware = IS_SUPPORTED
  ? (store) => (next) => (action) => {
      const preState = store.getState();
      const result = next(action);
      const postState = store.getState();
      const updatedValues = persistConfigs
        .filter(({ selector }) => selector(preState) !== selector(postState))
        .map(({ key, selector }) => ({
          key,
          value: selector(postState),
        }));
      if (updatedValues.length === 0) {
        return result;
      }
      openDb().then((db) => {
        const objectStore = db
          .transaction(STATE_OBJECT_STORE_NAME, 'readwrite')
          .objectStore(STATE_OBJECT_STORE_NAME);
        return Promise.all(
          updatedValues.map(({ key, value }) =>
            promisifyRequest(objectStore.put(value, key))
          )
        ).catch((err) => {
          console.error('Error while attempting to persist state:', err);
        });
      });
      return result;
    }
  : () => (next) => (action) => next(action);

export default persistStateMiddleware;
