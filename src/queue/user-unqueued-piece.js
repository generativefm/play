export const USER_UNQUEUED_PIECE = 'USER_UNQUEUED_PIECE';

const userUnqueuedPiece = ({ pieceId, newIndex, isCurrent = false }) => ({
  type: USER_UNQUEUED_PIECE,
  payload: { pieceId, newIndex, isCurrent },
});

export default userUnqueuedPiece;
