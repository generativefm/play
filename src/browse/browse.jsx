import React from 'react';
import pieces from '@generative-music/pieces-alex-bainter';
import Category from '../piece/category';
import formatReleaseDate from '../dates/format-release-date';
import styles from './browse.module.scss';

const newest = pieces
  .sort((a, b) => b.releaseDate - a.releaseDate)
  .slice(0, 24);

const mostPopular = pieces
  .filter(() => Math.random() < 0.5)
  .sort(() => Math.random() - 0.5)
  .slice(0, 24);

const mostLiked = pieces
  .filter(() => Math.random() < 0.5)
  .sort(() => Math.random() - 0.5)
  .slice(0, 24);

const Browse = () => {
  return (
    <div className={styles.browse}>
      <Category
        title={'Most played'}
        pieceIds={mostPopular.map(({ id }) => id)}
        getSubtitle={(piece) => {
          const index = mostPopular.indexOf(piece);
          return `played for ${
            (24 - index) * 10 + Math.floor(Math.random() * 5)
          } hours`;
        }}
      />
      <Category
        title={'Most liked'}
        pieceIds={mostLiked.map(({ id }) => id)}
        getSubtitle={(piece) => {
          const index = mostLiked.indexOf(piece);
          return `${Math.round(
            Math.min(((24 - index) / 24) * 100 + Math.random() * 3, 100)
          )}% liked`;
        }}
      />
      <Category
        title={'Newest'}
        pieceIds={newest.map(({ id }) => id)}
        getSubtitle={(piece) => formatReleaseDate(piece.releaseDate)}
      />
    </div>
  );
};

export default Browse;
