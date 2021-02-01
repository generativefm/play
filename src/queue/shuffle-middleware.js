import { USER_PLAYED_PIECE } from '@generative.fm/user';
import { USER_ENABLED_SHUFFLE } from './user-enabled-shuffle';
import { USER_DISABLED_SHUFFLE } from './user-disabled-shuffle';
import selectQueue from './select-queue';
import selectCurrentPieceId from './select-current-piece-id';
import selectIsShuffleActive from './select-is-shuffle-active';

const shuffleArray = (arr) => {
  const arrCopy = arr.slice();
  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }
  return arrCopy;
};

const shuffleMiddleware = (store) => (next) => {
  let orderedPieceIds;
  let shuffledPieceIds;
  return (action) => {
    switch (action.type) {
      case USER_ENABLED_SHUFFLE: {
        const { index, pieceIds } = selectQueue(store.getState());
        orderedPieceIds = pieceIds;
        const currentPieceId = pieceIds[index];
        shuffledPieceIds = [currentPieceId].concat(
          shuffleArray(pieceIds.filter((_, i) => i !== index))
        );
        action.payload = Object.assign({}, action.payload, {
          shuffledPieceIds,
        });
        return next(action);
      }
      case USER_DISABLED_SHUFFLE: {
        const currentPieceId = selectCurrentPieceId(store.getState());
        action.payload = Object.assign({}, action.payload, {
          unshuffledPieceIds: orderedPieceIds,
          unshuffledIndex: orderedPieceIds.indexOf(currentPieceId),
        });
        orderedPieceIds = null;
        shuffledPieceIds = null;
        return next(action);
      }
      case USER_PLAYED_PIECE: {
        const isShuffleActive = selectIsShuffleActive(store.getState());
        if (
          !isShuffleActive ||
          action.payload.selectionPieceIds === shuffledPieceIds
        ) {
          return next(action);
        }
        const { index } = action.payload;
        orderedPieceIds = action.payload.selectionPieceIds;
        const currentPieceId = orderedPieceIds[index];
        shuffledPieceIds = [currentPieceId].concat(
          shuffleArray(orderedPieceIds.filter((_, i) => i !== index))
        );
        action.payload = Object.assign({}, action.payload, {
          selectionPieceIds: shuffledPieceIds,
          index: 0,
        });
        return next(action);
      }
    }
    return next(action);
  };
};

export default shuffleMiddleware;
