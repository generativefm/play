import useCachedJsonResponse from './use-cached-json-response';

const URL = 'https://api.alexbainter.com/v1/pledge-sum';

const usePledgeSum = () => {
  const pledgeSum = useCachedJsonResponse({ url: URL, isGreedy: true });
  if (typeof pledgeSum === 'number') {
    return Math.round(pledgeSum / 100);
  }
  return null;
};

export default usePledgeSum;
