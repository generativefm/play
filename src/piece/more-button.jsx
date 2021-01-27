import React from 'react';
import { MoreVert } from '@material-ui/icons';
import PieceContextMenu from './piece-context-menu';
import IconButton from '../button/icon-button';
import useCreateContextMenuForTarget from '../context-menu/use-create-context-menu-for-target';

const MoreButton = ({ pieceId, shouldEnableLike }) => {
  const createContextMenuForTarget = useCreateContextMenuForTarget(
    <PieceContextMenu pieceId={pieceId} shouldEnableLike={shouldEnableLike} />
  );
  return (
    <IconButton onClick={createContextMenuForTarget}>
      <MoreVert />
    </IconButton>
  );
};

export default MoreButton;
