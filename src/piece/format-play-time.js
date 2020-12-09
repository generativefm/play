const formatPlayTime = (piecePlayTime) => {
  if (!piecePlayTime) {
    return 'never played';
  }
  const hoursPlayed = piecePlayTime / (1000 * 60 * 60);
  if (hoursPlayed > 1) {
    return `${Math.floor(hoursPlayed)} hour${hoursPlayed >= 2 ? 's' : ''}`;
  }
  return 'less than an hour';
};

export default formatPlayTime;
