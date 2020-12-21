import selectQueue from './select-queue';

const selectCurrentPieceId = (state) => {
  const { index, pieceIds } = selectQueue(state);
  if (index === null || pieceIds.length === 0) {
    return null;
  }
  return pieceIds[index];
};

export default selectCurrentPieceId;
