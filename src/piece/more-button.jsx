import React from 'react';
import { MoreVert } from '@material-ui/icons';
import PropTypes from 'prop-types';
import PieceContextMenu from './piece-context-menu';
import IconButton from '../button/icon-button';
import useCreateContextMenuForTarget from '../context-menu/use-create-context-menu-for-target';

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
