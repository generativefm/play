export const PIECE_PLAYBACK_FAILED = 'PIECE_PLAYBACK_FAILED';

const piecePlaybackFailed = () => ({
  type: PIECE_PLAYBACK_FAILED,
  meta: {
    snackbar: {
      message: 'Unable to play generator.',
    },
  },
});

export default piecePlaybackFailed;
