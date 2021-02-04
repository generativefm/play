import userPlayedPiece from '../playback/user-played-piece';
import userStoppedPlayback from '../playback/user-stopped-playback';

const playPrevious = ({ index, pieceIds, dispatch, isLoopActive }) => {
  if (index > 0) {
    dispatch(
      userPlayedPiece({ index: index - 1, selectionPieceIds: pieceIds })
    );
    return;
  }
  if (isLoopActive) {
    dispatch(
      userPlayedPiece({
        index: pieceIds.length - 1,
        selectionPieceIds: pieceIds,
      })
    );
    return;
  }
  dispatch(userStoppedPlayback());
};

export default playPrevious;
