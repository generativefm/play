import { makeOpenDb } from '@alexbainter/indexed-db';
import STATE_OBJECT_STORE_NAME from './state-object-store-name';

const DB_VERSION = 1;
const DB_NAME = '@generative.fm/play';

const onUpgradeNeeded = (event) => {
  const db = event.target.result;
  db.createObjectStore(STATE_OBJECT_STORE_NAME);
};

const openDb = makeOpenDb({
  dbName: DB_NAME,
  dbVersion: DB_VERSION,
  onUpgradeNeeded,
});

export default openDb;
