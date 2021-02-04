import userPlayedPiece from '../playback/user-played-piece';
import userStoppedPlayback from '../playback/user-stopped-playback';

const playNext = ({ index, pieceIds, dispatch, isLoopActive }) => {
  if (index < pieceIds.length - 1) {
    dispatch(
      userPlayedPiece({ index: index + 1, selectionPieceIds: pieceIds })
    );
    return;
  }
  if (isLoopActive) {
    dispatch(userPlayedPiece({ index: 0, selectionPieceIds: pieceIds }));
    return;
  }
  dispatch(userStoppedPlayback());
};

export default playNext;
