import React, { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import pieces from '@generative-music/pieces-alex-bainter';
import Grid from '../piece/grid';

const Flavor = () => {
  const { flavor } = useParams();

  const pieceIds = useMemo(
    () =>
      pieces.filter(({ tags }) => tags.includes(flavor)).map(({ id }) => id),
    [flavor]
  );

  return <Grid pieceIds={pieceIds} title={flavor} />;
};

export default Flavor;
