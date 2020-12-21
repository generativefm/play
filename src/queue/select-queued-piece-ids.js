import selectQueue from './select-queue';

const selectQueuedPieceIds = (state) => selectQueue(state).pieceIds;

export default selectQueuedPieceIds;
