export const USER_PLAYED_PIECE = 'USER_PLAYED_PIECE';

const userPlayedPiece = ({ pieceId }) => ({
  type: USER_PLAYED_PIECE,
  payload: pieceId,
});

export default userPlayedPiece;
