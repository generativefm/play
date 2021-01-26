import selectQueue from './select-queue';

const selectIsLoopActive = (state) => selectQueue(state).isLoopActive;

export default selectIsLoopActive;
