import { promisifyRequest } from '@alexbainter/indexed-db';
import openDb from '../storage/open-db';
import STORAGE_KEY from './has-imported-legacy-data-storage-key';
import STATE_OBJECT_STORE_NAME from '../storage/state-object-store-name';

const setImported = async () => {
  const db = await openDb();
  return promisifyRequest(
    db
      .transaction(STATE_OBJECT_STORE_NAME, 'readwrite')
      .objectStore(STATE_OBJECT_STORE_NAME)
      .put(true, STORAGE_KEY)
  );
};

export default setImported;
