import useCachedJsonResponse from './use-cached-json-response';

const URL = 'https://api.alexbainter.com/v1/active-patrons';

const useActivePatrons = ({ isGreedy = false } = {}) => {
  const response = useCachedJsonResponse({ url: URL, isGreedy });
  if (!Array.isArray(response)) {
    return null;
  }
  return response;
};

export default useActivePatrons;
