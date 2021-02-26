import { piecePlaybackAction } from '@generative.fm/user';

export const USER_PLAYED_PIECE = 'USER_PLAYED_PIECE';

const userPlayedPiece = ({ selectionPieceIds, index }) =>
  piecePlaybackAction(
    {
      type: USER_PLAYED_PIECE,
      payload: { selectionPieceIds, index },
    },
    { pieceId: selectionPieceIds[index] }
  );

export default userPlayedPiece;
