import { byId } from '@generative-music/pieces-alex-bainter';
import { LEGACY_DATA_IMPORTED } from '../import/legacy-data-imported';

const playTimeReducer = (state = {}, action) => {
  switch (action.type) {
    case LEGACY_DATA_IMPORTED: {
      const { playTime } = action.payload;
      return Object.keys(playTime).reduce((o, legacyId) => {
        const pieceId = legacyId.replace('alex-bainter-', '');
        if (!byId[pieceId]) {
          return o;
        }
        o[pieceId] = playTime[legacyId];
        return o;
      }, {});
    }
  }

  return state;
};

export default playTimeReducer;
