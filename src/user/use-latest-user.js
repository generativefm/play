import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@generative.fm/user';
import selectIsFetching from './select-is-fetching';

const useLatestUser = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const isFetchingUser = useSelector(selectIsFetching);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUser());
    }
  }, [isAuthenticated, dispatch]);
  return isLoading || isFetchingUser;
};

export default useLatestUser;
