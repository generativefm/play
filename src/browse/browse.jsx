import React from 'react';
import pieces from '@generative-music/pieces-alex-bainter';
import Grid from '../grid/grid';
import styles from './browse.module.scss';

const Browse = () => {
  return (
    <div className={styles.browse}>
      <Grid pieceIds={pieces.map(({ id }) => id)} title={'All pieces'} />
    </div>
  );
};

export default Browse;
