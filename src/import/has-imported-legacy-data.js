import { promisifyRequest } from '@alexbainter/indexed-db';
import openDb from '../storage/open-db';
import STATE_OBJECT_STORE_NAME from '../storage/state-object-store-name';
import KEY from './has-imported-legacy-data-storage-key';

const hasImportedLegacyData = async () => {
  const db = await openDb();
  try {
    const result = promisifyRequest(
      db
        .transaction(STATE_OBJECT_STORE_NAME)
        .objectStore(STATE_OBJECT_STORE_NAME)
        .get(KEY)
    );
    return result;
  } catch (error) {
    console.error(`Unable to read ${KEY} from storage`, error);
  }

  return false;
};

export default hasImportedLegacyData;
