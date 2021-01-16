import React from 'react';
import Category from '../piece/category';
import useLibraryCategories from './use-library-categories';
import useLatestUser from '../user/use-latest-user';

const Library = () => {
  const categories = useLibraryCategories();
  const isFetchingUser = useLatestUser();
  return (
    <>
      <Category
        title={'Recently played'}
        pieceIds={!isFetchingUser && categories.history.orderedPieceIds}
        getSubtitle={categories.history.getSubtitle}
        linkTo={'/library/history'}
      />
      <Category
        title={'Your most played'}
        pieceIds={!isFetchingUser && categories.playtime.orderedPieceIds}
        getSubtitle={categories.playtime.getSubtitle}
        linkTo={'/library/playtime'}
      />
      <Category
        title={'Likes'}
        pieceIds={!isFetchingUser && categories.likes.orderedPieceIds}
        linkTo={'/library/likes'}
      />
    </>
  );
};

export default Library;
