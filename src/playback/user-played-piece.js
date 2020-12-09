export const USER_PLAYED_PIECE = 'USER_PLAYED_PIECE';

const userPlayedPiece = ({ selectionPieceIds, index }) => ({
  type: USER_PLAYED_PIECE,
  payload: {
    selectionPieceIds,
    index,
  },
  meta: {
    timestamp: Date.now(),
  },
});

export default userPlayedPiece;
