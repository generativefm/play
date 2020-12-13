export const USER_PLAYED_PIECE = 'USER_PLAYED_PIECE';

const userPlayedPiece = ({ selectionPieceIds, index, destination }) => ({
  type: USER_PLAYED_PIECE,
  payload: {
    selectionPieceIds,
    index,
    destination,
  },
  meta: {
    timestamp: Date.now(),
  },
});

export default userPlayedPiece;
