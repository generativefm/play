import React, { useMemo, useCallback } from 'react';
import Category from '../piece/category';
import { useSelector } from 'react-redux';
import selectHistory from '../user/select-history';
import selectLikes from '../user/select-likes';
import selectPlayTime from '../user/select-play-time';
import formatPlayTime from '../piece/format-play-time';
import useSelectorOnce from '../app/use-selector-once';

const humanNumbers = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
};

const elapsedDurations = [
  {
    denominator: 1000 * 60 * 60 * 24 * (365 / 12),
    label: 'month',
    last: 'last month',
  },
  {
    denominator: 1000 * 60 * 60 * 24 * 7,
    label: 'week',
    last: 'last week',
  },
  {
    denominator: 1000 * 60 * 60 * 24,
    label: 'day',
    last: 'yesterday',
  },
];

// complete the sentence "I last listened to this _______"
const getHumanReadableElapsed = (elapsedMs) => {
  const elapsedYears = elapsedMs / (1000 * 60 * 60 * 24 * 365);
  if (elapsedYears >= 1) {
    return 'a year ago or more';
  }
  const duration = elapsedDurations.find(
    ({ denominator }) => elapsedMs / denominator >= 1
  );
  if (duration) {
    const { denominator, label, last } = duration;
    const count = Math.floor(elapsedMs / denominator);
    if (count === 1) {
      return last;
    }
    return `${humanNumbers[count]} ${label}${count >= 2 ? 's' : ''} ago`;
  }
  return 'today';
};

const Library = () => {
  const history = useSelectorOnce(selectHistory);
  const likes = useSelector(selectLikes);
  const playTime = useSelector(selectPlayTime);

  const orderedHistoryPieceIds = useMemo(
    () => Object.keys(history).sort((a, b) => history[b] - history[a]),
    [history]
  );

  const orderedLikesPieceIds = useMemo(
    () => Object.keys(likes).sort((a, b) => likes[b] - likes[a]),
    [likes]
  );

  const orderedPlayTimePieceIds = useMemo(
    () => Object.keys(playTime).sort((a, b) => playTime[b] - playTime[a]),
    [playTime]
  );

  const getHistorySubtitle = useCallback(
    (piece) => {
      const elapsedMs = Date.now() - history[piece.id];
      return getHumanReadableElapsed(elapsedMs);
    },
    [history]
  );

  const getPlayTimeSubtitle = useCallback(
    (piece) => {
      const playTimeMs = playTime[piece.id];
      return formatPlayTime(playTimeMs);
    },
    [playTime]
  );

  return (
    <>
      <Category
        title={'Recently played'}
        pieceIds={orderedHistoryPieceIds}
        getSubtitle={getHistorySubtitle}
      />
      <Category
        title={'Your most played'}
        pieceIds={orderedPlayTimePieceIds}
        getSubtitle={getPlayTimeSubtitle}
      />
      <Category title={'Likes'} pieceIds={orderedLikesPieceIds} />
    </>
  );
};

export default Library;
