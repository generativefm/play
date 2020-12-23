import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { byId } from '@generative-music/pieces-alex-bainter';
import selectPlayTime from '../piece/select-play-time';

const usePlayTimePerDay = () => {
  const playTime = useSelector(selectPlayTime);
  return useMemo(
    () =>
      Object.keys(playTime)
        .filter((pieceId) => Boolean(byId[pieceId]))
        .map((pieceId) => [
          pieceId,
          playTime[pieceId] /
            ((Date.now() - byId[pieceId].releaseDate.getTime()) /
              (1000 * 60 * 60 * 24)),
        ])
        .reduce((o, [pieceId, hoursPerDay]) => {
          o[pieceId] = hoursPerDay;
          return o;
        }, {}),
    [playTime]
  );
};

export default usePlayTimePerDay;
