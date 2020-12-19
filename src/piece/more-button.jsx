import React from 'react';
import { MoreVert } from '@material-ui/icons';
import PieceContextMenu from './piece-context-menu';
import IconButton from '../button/icon-button';
import useCreateContextMenuForTarget from '../app/use-create-context-menu-for-target';

const MoreButton = ({ pieceId }) => {
  const createContextMenuForTarget = useCreateContextMenuForTarget(
    <PieceContextMenu pieceId={pieceId} />
  );
  return (
    <IconButton onClick={createContextMenuForTarget}>
      <MoreVert />
    </IconButton>
  );
};

export default MoreButton;
