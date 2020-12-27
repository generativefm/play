import { promisifyRequest } from '@alexbainter/indexed-db';
import openDb from './open-db';
import STATE_OBJECT_STORE_NAME from './state-object-store-name';

const loadState = async (persistConfigs) => {
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
};

export default loadState;
