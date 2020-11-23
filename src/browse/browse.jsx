import React from 'react';
import pieces from '@generative-music/pieces-alex-bainter';
import Category from '../piece/category';
import styles from './browse.module.scss';

const Browse = () => {
  return (
    <div className={styles.browse}>
      <Category title={'Everything'} pieceIds={pieces.map(({ id }) => id)} />
    </div>
  );
};

export default Browse;
