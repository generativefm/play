import React from 'react';
import { Link } from 'react-router-dom';
import Category from '../piece/category';
import useLibraryCategories from './use-library-categories';
import SoftAd from '../soft-ad/soft-ad';
import styles from './library.module.scss';

const Library = () => {
  const categories = useLibraryCategories();
  return (
    <>
      <SoftAd href="https://alexbainter.gumroad.com/l/generative-music-systems">
        &ldquo;Building Generative Music Systems&rdquo; course available now
      </SoftAd>
      <Category
        title={'Recently played'}
        pieceIds={categories.history.orderedPieceIds}
        getSubtitle={categories.history.getSubtitle}
        linkTo={'/library/history'}
        placeholder={
          <div className={styles['category-placeholder']}>
            <span>
              This is where you&apos;ll find the generators you played recently.
              Find one to listen to from the{' '}
              <Link to="/browse">Browse page</Link>.
            </span>
          </div>
        }
      />
      <Category
        title={'Your most played'}
        pieceIds={categories.playtime.orderedPieceIds}
        getSubtitle={categories.playtime.getSubtitle}
        linkTo={'/library/playtime'}
        placeholder={
          <div className={styles['category-placeholder']}>
            <span>
              This is where you&apos;ll find the generators you played the most.
              Find one to listen to from the{' '}
              <Link to="/browse">Browse page</Link>.
            </span>
          </div>
        }
      />
      <Category
        title={'Likes'}
        pieceIds={categories.likes.orderedPieceIds}
        linkTo={'/library/likes'}
        placeholder={
          <div className={styles['category-placeholder']}>
            Liked generators are saved here so you can find them again.
          </div>
        }
      />
    </>
  );
};

export default Library;
