import selectQueue from './select-queue';

const selectIsShuffleActive = (state) => selectQueue(state).isShuffleActive;

export default selectIsShuffleActive;
