import { byId } from '@generative-music/pieces-alex-bainter';

const playTimeReducer = (
  state = {
    lemniscate: 101010,
    'agua-ravine':
      ((Date.now() - byId['agua-ravine'].releaseDate.getTime()) /
        (1000 * 60 * 60 * 24)) *
      2.001 *
      60 *
      60 *
      1000,
    enough: 29299992,
    zed:
      ((Date.now() - byId.zed.releaseDate.getTime()) / (1000 * 60 * 60 * 24)) *
      2.001 *
      60 *
      60 *
      1000,
  }
) => state;

export default playTimeReducer;
