const selectCurrentPieceId = ({ queue: { index, pieceIds } }) => {
  if (index === null || pieceIds.length === 0) {
    return null;
  }
  return pieceIds[index];
};

export default selectCurrentPieceId;
