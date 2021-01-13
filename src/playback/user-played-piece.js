import { userPlayedPiece } from '@generative.fm/user';

const wrappedUserPlayedPiece = ({ selectionPieceIds, index, destination }) => {
  const pieceId = selectionPieceIds[index];
  const action = userPlayedPiece({ pieceId });
  Object.assign(action.payload, { selectionPieceIds, index, destination });
  return action;
};

export default wrappedUserPlayedPiece;
