import { promisifyRequest } from '@alexbainter/indexed-db';
import openDb from './open-db';
import STATE_OBJECT_STORE_NAME from './state-object-store-name';

const persistStore = (store, persistConfigs) => {
  const initialState = store.getState();
  const persistedValues = persistConfigs.reduce((map, { key, selector }) => {
    map.set(key, selector(initialState));
    return map;
  }, new Map());
  store.subscribe(async () => {
    const state = store.getState();
    const updatedValues = persistConfigs
      .map(({ key, selector }) => ({
        key,
        value: selector(state),
      }))
      .filter(({ key, value }) => persistedValues.get(key) !== value);

    if (updatedValues.length === 0) {
      return;
    }

    const db = await openDb();
    const transaction = db
      .transaction(STATE_OBJECT_STORE_NAME, 'readwrite')
      .objectStore(STATE_OBJECT_STORE_NAME);

    try {
      await Promise.all(
        updatedValues.map(({ key, value }) =>
          promisifyRequest(transaction.put(value, key))
        )
      );
      updatedValues.forEach(({ key, value }) => {
        persistedValues.set(key, value);
      });
    } catch (error) {
      console.error('Error while attempting to persist state:', error);
    }
  });
};

export default persistStore;
