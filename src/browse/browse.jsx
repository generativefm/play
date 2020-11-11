import React from 'react';
import pieces from '@generative-music/pieces-alex-bainter';
import GridElement from '../piece/grid-element';
import styles from './browse.module.scss';

const Browse = () => (
  <div className={styles.browse}>
    <div className={styles['browse__grid']}>
      {pieces.map(({ id, tags }) => (
        <GridElement key={id} id={id} subtitle={tags.join(' • ')} />
      ))}
    </div>
  </div>
);

export default Browse;
