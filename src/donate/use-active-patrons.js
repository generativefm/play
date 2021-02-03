import useCachedJsonResponse from './use-cached-json-response';

const URL = 'https://api.alexbainter.com/v1/active-patrons';

const useActivePatrons = ({ isGreedy = false } = {}) =>
  useCachedJsonResponse({ url: URL, isGreedy });

export default useActivePatrons;
