import { Transport, Gain, getContext, now } from 'tone';
import { byId } from '@generative-music/pieces-alex-bainter';
import sampleLibrary from './sample-library';
import { USER_PLAYED_PIECE } from './user-played-piece';
import selectCurrentPieceId from '../queue/select-current-piece-id';
import pieceStartedPlaying from './piece-started-playing';
import { USER_STOPPED_PLAYBACK } from './user-stopped-playback';

const playbackMiddleware = (store) => (next) => {
  const activePieces = new Map();
  return (action) => {
    switch (action.type) {
      case USER_PLAYED_PIECE: {
        const { index, selectionPieceIds, destination } = action.payload;
        const pieceId = selectionPieceIds[index];
        const piece = byId[pieceId];
        const pieceGain = new Gain(0).connect(destination);
        Array.from(activePieces).forEach(
          ([pieceId, { schedule, deactivate, end, gainNode }]) => {
            if (end) {
              Transport.stop();
              Transport.cancel();
              gainNode.gain.cancelScheduledValues(now());
              gainNode.gain.setValueAtTime(gainNode.gain.value, now());
              gainNode.gain.linearRampToValueAtTime(0, now() + 0.1);
              Transport.scheduleOnce(end, now() + 0.1);
            }
            activePieces.set(pieceId, { deactivate, schedule });
          }
        );

        piece.loadActivate().then((activate) => {
          activate({
            context: getContext(),
            sampleLibrary,
            destination: pieceGain,
          }).then(([deactivate, schedule]) => {
            const currentPieceId = selectCurrentPieceId(store.getState());
            if (currentPieceId === pieceId) {
              const end = schedule();
              activePieces.set(pieceId, {
                deactivate,
                schedule,
                end,
                gainNode: pieceGain,
              });
              pieceGain.gain.setValueAtTime(0, now());
              pieceGain.gain.linearRampToValueAtTime(1, now() + 0.1);
              Transport.start();
              store.dispatch(pieceStartedPlaying());
            }
          });
        });
        break;
      }
      case USER_STOPPED_PLAYBACK: {
        Array.from(activePieces).forEach(
          ([pieceId, { schedule, deactivate, end, gainNode }]) => {
            if (end) {
              Transport.stop();
              Transport.cancel();
              gainNode.gain.cancelScheduledValues(now());
              gainNode.gain.setValueAtTime(gainNode.gain.value, now());
              gainNode.gain.linearRampToValueAtTime(0, now() + 0.1);
              Transport.scheduleOnce(end, now() + 0.1);
            }
            activePieces.set(pieceId, { deactivate, schedule, gainNode });
          }
        );
      }
    }

    return next(action);
  };
};

export default playbackMiddleware;
