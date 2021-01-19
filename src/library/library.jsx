import React from 'react';
import Category from '../piece/category';
import useLibraryCategories from './use-library-categories';

const Library = () => {
  const categories = useLibraryCategories();
  return (
    <>
      <Category
        title={'Recently played'}
        pieceIds={categories.history.orderedPieceIds}
        getSubtitle={categories.history.getSubtitle}
        linkTo={'/library/history'}
      />
      <Category
        title={'Your most played'}
        pieceIds={categories.playtime.orderedPieceIds}
        getSubtitle={categories.playtime.getSubtitle}
        linkTo={'/library/playtime'}
      />
      <Category
        title={'Likes'}
        pieceIds={categories.likes.orderedPieceIds}
        linkTo={'/library/likes'}
      />
    </>
  );
};

export default Library;
