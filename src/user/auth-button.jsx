import React, { useEffect, useCallback, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AccountCircle, MoreVert } from '@material-ui/icons';
import {
  userAuthenticated,
  userStartedAnonymousSession,
} from '@generative.fm/user';
import { useDispatch } from 'react-redux';
import TextButton from '../button/text-button';
import IconButton from '../button/icon-button';
import useCreateContextMenuForTarget from '../context-menu/use-create-context-menu-for-target';
import UserContextMenu from './user-context-menu';
import styles from './auth-button.module.scss';

const AuthButton = () => {
  const dispatch = useDispatch();
  const [imageFailed, setImageFailed] = useState(false);

  const {
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const createContextMenuForTarget = useCreateContextMenuForTarget(
    <UserContextMenu />
  );

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isAuthenticated) {
      dispatch(userStartedAnonymousSession());
      return;
    }
    getAccessTokenSilently().then((token) => {
      dispatch(userAuthenticated({ userId: user.sub, token }));
    });
  }, [isLoading, isAuthenticated, getAccessTokenSilently, user, dispatch]);

  const handleImageError = useCallback(() => {
    setImageFailed(true);
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  if (!isAuthenticated) {
    return (
      <>
        <IconButton onClick={createContextMenuForTarget}>
          <MoreVert />
        </IconButton>
        <TextButton onClick={loginWithRedirect} isPrimary>
          Sign In
        </TextButton>
      </>
    );
  }

  if (user.picture && !imageFailed) {
    return (
      <button
        className={styles['auth-button']}
        type="button"
        onClick={createContextMenuForTarget}
      >
        <img
          className={styles['auth-button__image']}
          src={user.picture}
          onError={handleImageError}
        ></img>
      </button>
    );
  }

  return (
    <IconButton onClick={createContextMenuForTarget}>
      <AccountCircle />
    </IconButton>
  );
};

export default AuthButton;
