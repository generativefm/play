import { userPlayedPiece } from '@generative.fm/user';

const wrappedUserPlayedPiece = ({ selectionPieceIds, index }) => {
  const pieceId = selectionPieceIds[index];
  const action = userPlayedPiece({ pieceId });
  Object.assign(action.payload, { selectionPieceIds, index });
  return action;
};

export default wrappedUserPlayedPiece;
