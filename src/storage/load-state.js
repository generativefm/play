import { promisifyRequest } from '@alexbainter/indexed-db';
import { getStoredState as getStoredUserState } from '@generative.fm/user';
import openDb from './open-db';
import STATE_OBJECT_STORE_NAME from './state-object-store-name';

const loadPlayState = async (persistConfigs) => {
  try {
    const db = await openDb();
    const transaction = db
      .transaction(STATE_OBJECT_STORE_NAME)
      .objectStore(STATE_OBJECT_STORE_NAME);

    const storedItems = await Promise.all(
      persistConfigs.map(({ key }) => promisifyRequest(transaction.get(key)))
    );

    return persistConfigs.reduce((loadedState, { assimilator }, i) => {
      const storedValue = storedItems[i];
      return assimilator(loadedState, storedValue);
    }, {});
  } catch (error) {
    console.error('Unable to load stored state', error);
    return undefined;
  }
};

const loadState = (persistConfigs) =>
  Promise.all([
    loadPlayState(persistConfigs),
    getStoredUserState(),
  ]).then(([storedPlayState, storedUserState]) =>
    Object.assign({}, storedPlayState, { user: storedUserState })
  );

export default loadState;
