import React, { useEffect } from 'react';
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
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    getAccessTokenSilently().then((token) => {
      console.log('sending request with jwt');

      fetch(`http://localhost:3000/v1/user/${user.sub}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.sub,
          testing: 'goodbye',
          wow: 'yup',
        }),
      })
        .then((response) => {
          if (!response.ok) {
            console.log('not okay');
            return;
          }
          return response.json();
        })
        .then((user) => {
          console.log(user);
        });
    });
  }, [isAuthenticated, getAccessTokenSilently, user]);

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
