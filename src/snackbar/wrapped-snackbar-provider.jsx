import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { SnackbarProvider, useIsNarrowScreen } from '@generative.fm/web-ui';
import selectCurrentPieceId from '../queue/select-current-piece-id';
import selectIsPlaybackOpen from '../playback/select-is-playback-open';

const WrappedSnackbarProvider = ({ children }) => {
  const currentPieceId = useSelector(selectCurrentPieceId);
  const isPlaybackOpen = useSelector(selectIsPlaybackOpen);
  const isNarrowScreen = useIsNarrowScreen();

  const isControlBarVisible =
    Boolean(currentPieceId) && !(isNarrowScreen && isPlaybackOpen);
  const isBottomNavVisible = isNarrowScreen && !isPlaybackOpen;

  let bottomOffset;
  if (isControlBarVisible && isBottomNavVisible) {
    bottomOffset = '8rem';
  } else if (isControlBarVisible) {
    bottomOffset = '5rem';
  } else if (isBottomNavVisible) {
    bottomOffset = '4rem';
  }

  return (
    <SnackbarProvider bottomOffset={bottomOffset}>{children}</SnackbarProvider>
  );
};

WrappedSnackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WrappedSnackbarProvider;
