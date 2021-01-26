import selectQueue from './select-queue';

const selectQueuedIndex = (state) => selectQueue(state).index;

export default selectQueuedIndex;
