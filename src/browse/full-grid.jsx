import React from 'react';
import pieces from '@generative-music/pieces-alex-bainter';
import Grid from '../piece/grid';

const pieceIds = pieces.map(({ id }) => id);

const FullGrid = () => <Grid pieceIds={pieceIds} title="All generators" />;

export default FullGrid;
