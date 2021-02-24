export const USER_QUEUED_PIECE = 'USER_QUEUED_PIECE';

const userQueuedPiece = ({ pieceId, index }) => ({
  type: USER_QUEUED_PIECE,
  payload: { pieceId, index },
});

export default userQueuedPiece;
