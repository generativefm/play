import { USER_PLAYED_PIECE } from '../playback/user-played-piece';
import { USER_ENABLED_SHUFFLE } from './user-enabled-shuffle';
import { USER_DISABLED_SHUFFLE } from './user-disabled-shuffle';
import { USER_QUEUED_PIECE } from './user-queued-piece';
import { USER_UNQUEUED_PIECE } from './user-unqueued-piece';
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

const areShallowEqual = (arr1 = [], arr2 = []) =>
  arr1.length === arr2.length && arr1.every((el, i) => el === arr2[i]);

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
          action.payload.selectionPieceIds === shuffledPieceIds ||
          areShallowEqual(action.payload.selectionPieceIds, shuffledPieceIds)
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
      case USER_QUEUED_PIECE: {
        const isShuffleActive = selectIsShuffleActive(store.getState());
        if (!isShuffleActive) {
          return next(action);
        }
        const { pieceId } = action.payload;
        let { index } = action.payload;
        if (Array.isArray(orderedPieceIds)) {
          if (typeof index !== 'number') {
            index = orderedPieceIds.length;
          }
          orderedPieceIds = orderedPieceIds
            .slice(0, index)
            .concat([pieceId])
            .concat(orderedPieceIds.slice(index));
        }
        if (Array.isArray(shuffledPieceIds)) {
          if (typeof index !== 'number') {
            index = shuffledPieceIds.length;
          }
          shuffledPieceIds = shuffledPieceIds
            .slice(0, index)
            .concat([pieceId])
            .concat(shuffledPieceIds.slice(index));
        }
        return next(action);
      }
      case USER_UNQUEUED_PIECE: {
        const { pieceId } = action.payload;
        if (Array.isArray(orderedPieceIds)) {
          orderedPieceIds = orderedPieceIds.filter(
            (otherPieceId) => otherPieceId !== pieceId
          );
        }
        if (Array.isArray(shuffledPieceIds)) {
          shuffledPieceIds = shuffledPieceIds.filter(
            (otherPieceId) => otherPieceId !== pieceId
          );
        }
        return next(action);
      }
    }

    return next(action);
  };
};

export default shuffleMiddleware;
