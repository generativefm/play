import { Transport, Gain, getContext } from 'tone';
import { byId } from '@generative-music/pieces-alex-bainter';
import { startEmission, stopEmission } from '@generative.fm/stats';
import { USER_PLAYED_PIECE, playTimeIncreased } from '@generative.fm/user';
import MersenneTwister from 'mersenne-twister';
import getSampleLibrary from './get-sample-library';
import selectCurrentPieceId from '../queue/select-current-piece-id';
import pieceStartedPlaying from './piece-started-playing';
import { USER_STOPPED_PLAYBACK } from './user-stopped-playback';
import masterGainNode from '../volume/master-gain-node';
import selectUserId from '../user/select-user-id';
import selectToken from '../user/select-token';
import { TIMER_PROGRESSED } from '../timer/timer-progressed';
import piecePlaybackFailed from './piece-playback-failed';
import startAudioContext from './start-audio-context';

const playbackMiddleware = (store) => (next) => {
  const generator = new MersenneTwister();
  window.generativeMusic = {
    rng: generator.random.bind(generator),
  };

  const activatingPieces = new Set();
  const activePieces = new Map();

  const stopAll = () => {
    Transport.stop();
    Transport.cancel();
    const token = selectToken(store.getState());
    Array.from(activePieces).forEach(
      ([pieceId, { end, emissionIdPromise }]) => {
        activePieces.delete(pieceId);
        if (typeof end !== 'function') {
          return;
        }
        end();
        emissionIdPromise.then((emissionId) => {
          stopEmission({ token, emissionId }).then((additionalPlayTime) => {
            if (Object.keys(additionalPlayTime).length === 0) {
              return;
            }
            store.dispatch(playTimeIncreased({ additionalPlayTime }));
          });
        });
      }
    );
  };

  const playPiece = ({ pieceId }) => {
    startAudioContext();
    if (activatingPieces.has(pieceId)) {
      return;
    }
    const pieceGain = new Gain().connect(masterGainNode);
    const piece = byId[pieceId];
    activatingPieces.add(pieceId);
    Promise.all([getSampleLibrary(), piece.loadActivate()])
      .then(([sampleLibrary, activate]) =>
        activate({
          context: getContext(),
          sampleLibrary,
          destination: pieceGain,
        })
      )
      .then(([deactivate, schedule]) => {
        activatingPieces.delete(pieceId);
        const state = store.getState();
        const currentPieceId = selectCurrentPieceId(state);
        if (currentPieceId !== pieceId) {
          return;
        }
        const end = schedule();
        const userId = selectUserId(state) || 'ANONYMOUS_PLAY_USER';
        activePieces.set(pieceId, {
          deactivate,
          schedule,
          end,
          gainNode: pieceGain,
          emissionIdPromise: startEmission({ pieceId, userId }),
        });
        Transport.start();
        store.dispatch(pieceStartedPlaying());
      })
      .catch((err) => {
        console.error(err);
        store.dispatch(piecePlaybackFailed());
      });
  };

  return (action) => {
    const result = next(action);
    switch (action.type) {
      case USER_PLAYED_PIECE: {
        const { index, selectionPieceIds } = action.payload;
        const pieceId = selectionPieceIds[index];
        stopAll();
        playPiece({ pieceId });
        break;
      }
      case USER_STOPPED_PLAYBACK: {
        stopAll();
        break;
      }
      case TIMER_PROGRESSED: {
        if (action.payload.durationRemaining) {
          break;
        }
        stopAll();
        break;
      }
    }

    return result;
  };
};

export default playbackMiddleware;
