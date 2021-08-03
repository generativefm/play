import React from 'react';
import { MoreVert } from '@material-ui/icons';
import PropTypes from 'prop-types';
import {
  IconButton,
  useCreateContextMenuForTarget,
} from '@generative.fm/web-ui';
import PieceContextMenu from './piece-context-menu';

const MoreButton = ({ pieceId, shouldEnableLike = true }) => {
  const createContextMenuForTarget = useCreateContextMenuForTarget(
    <PieceContextMenu pieceId={pieceId} shouldEnableLike={shouldEnableLike} />
  );
  return (
    <IconButton onClick={createContextMenuForTarget} title="More actions">
      <MoreVert />
    </IconButton>
  );
};

MoreButton.propTypes = {
  pieceId: PropTypes.string.isRequired,
  shouldEnableLike: PropTypes.bool,
};

export default MoreButton;
