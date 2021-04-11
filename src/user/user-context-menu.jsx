import React, { useCallback, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  ExitToApp,
  Settings,
  Help,
  Info,
  GetApp,
  Update,
} from '@material-ui/icons';
import { userLoggedOut } from '@generative.fm/user';
import { clearData } from '@generative.fm/stats';
import { useDispatch } from 'react-redux';
import ContextMenuOption from '../context-menu/context-menu-option';
import styles from './user-context-menu.module.scss';
import contextMenuOptionStyles from '../context-menu/context-menu-option.module.scss';
import beforeInstallPromptContext from '../app/before-install-prompt-context';
import useUpgrade from '../service-worker/use-upgrade';

export const HELP_URL =
  'https://www.notion.so/generativefm/Get-help-with-Generative-fm-0efd0280b87d4132a66d212f125d9f4f';

const UserContextMenu = () => {
  const { user, logout, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const beforeInstallPromptEvent = useContext(beforeInstallPromptContext);
  const upgrade = useUpgrade();

  const handleSignoutClick = useCallback(() => {
    clearData().then(() => {
      dispatch(userLoggedOut());
      logout({ returnTo: window.location.origin });
    });
  }, [logout, dispatch]);

  const handleInstallClick = useCallback(() => {
    if (!beforeInstallPromptEvent) {
      return;
    }
    beforeInstallPromptEvent.prompt();
  }, [beforeInstallPromptEvent]);

  return (
    <div className={styles['user-context-menu']}>
      {isAuthenticated && (
        <div className={styles['user-context-menu__email']}>{user.email}</div>
      )}
      {isAuthenticated && (
        <ContextMenuOption onClick={handleSignoutClick}>
          <ExitToApp
            className={contextMenuOptionStyles['context-menu-option__icon']}
          />
          Sign out
        </ContextMenuOption>
      )}
      <ContextMenuOption linkTo="/settings">
        <Settings
          className={contextMenuOptionStyles['context-menu-option__icon']}
        />
        Settings
      </ContextMenuOption>
      <ContextMenuOption href={HELP_URL}>
        <Help
          className={contextMenuOptionStyles['context-menu-option__icon']}
        />
        Help
      </ContextMenuOption>
      <ContextMenuOption linkTo="/about">
        <Info
          className={contextMenuOptionStyles['context-menu-option__icon']}
        />
        About
      </ContextMenuOption>
      {beforeInstallPromptEvent && (
        <ContextMenuOption onClick={handleInstallClick}>
          <GetApp
            className={contextMenuOptionStyles['context-menu-option__icon']}
          />
          Install
        </ContextMenuOption>
      )}
      {upgrade && (
        <ContextMenuOption onClick={upgrade} isHighlighted={true}>
          <Update
            className={contextMenuOptionStyles['context-menu-option__icon']}
          />
          Upgrade and reload
        </ContextMenuOption>
      )}
    </div>
  );
};

export default UserContextMenu;
