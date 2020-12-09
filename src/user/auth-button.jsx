import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AccountCircle } from '@material-ui/icons';
import TextButton from '../button/text-button';
import IconButton from '../button/icon-button';
import styles from './auth-button.module.scss';

const AuthButton = () => {
  const {
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    user,
    logout,
  } = useAuth0();
  if (isLoading) {
    return <div></div>;
  }

  if (!isAuthenticated) {
    return <TextButton onClick={loginWithRedirect}>Sign In</TextButton>;
  }

  if (user.picture) {
    return (
      <button className={styles['auth-button']} type="button" onClick={logout}>
        <img className={styles['auth-button__image']} src={user.picture}></img>
      </button>
    );
  }

  return (
    <IconButton onClick={logout}>
      <AccountCircle />
    </IconButton>
  );
};

export default AuthButton;
