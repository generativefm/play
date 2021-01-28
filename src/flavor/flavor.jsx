import React, { useMemo } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import pieces from '@generative-music/pieces-alex-bainter';
import BrowseGrid from '../browse/browse-grid';

const Flavor = () => {
  const { flavor } = useParams();

  const pieceIds = useMemo(
    () =>
      pieces.filter(({ tags }) => tags.includes(flavor)).map(({ id }) => id),
    [flavor]
  );

  if (pieceIds.length === 0) {
    return <Redirect to="/" />;
  }

  return <BrowseGrid pieceIds={pieceIds} title={flavor} />;
};

export default Flavor;
