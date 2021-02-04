const humanNumbers = {
  1: 'a',
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
    denominator: 1000 * 60 * 60 * 24 * 365,
    label: 'year',
  },
  {
    denominator: 1000 * 60 * 60 * 24 * (365 / 12),
    label: 'month',
  },
  {
    denominator: 1000 * 60 * 60 * 24 * 7,
    label: 'week',
  },
  {
    denominator: 1000 * 60 * 60 * 24,
    label: 'day',
    last: 'yesterday',
  },
];

// complete the sentence "I last listened to this _______"
const getHumanReadableTimeSince = (timestamp) => {
  const today = new Date();
  const fullPreviousDate = new Date(timestamp);
  if (fullPreviousDate > today) {
    return 'today';
  }
  // because "less than 24 hours ago" is not the same thing as "today"
  const previousDate = new Date(
    fullPreviousDate.getFullYear(),
    fullPreviousDate.getMonth(),
    fullPreviousDate.getDay()
  );
  const elapsedTime = today.getTime() - previousDate.getTime();
  const duration = elapsedDurations.find(
    ({ denominator }) => elapsedTime / denominator >= 1
  );
  if (duration) {
    const { denominator, label, last } = duration;
    const count = Math.floor(elapsedTime / denominator);
    if (count === 1 && last) {
      return last;
    }
    return `${humanNumbers[count]} ${label}${count >= 2 ? 's' : ''} ago`;
  }
  return 'today';
};

export default getHumanReadableTimeSince;
