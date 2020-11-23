import React, { useState, useCallback, useRef } from 'react';
import { byId } from '@generative-music/pieces-alex-bainter';
import { ChevronRight, ChevronLeft } from '@material-ui/icons';
import IconButton from '../button/icon-button';
import Preview from '../piece/preview';
import useContentWidth from '../layout/use-content-width';
import styles from './category.module.scss';

const Category = ({ title, pieceIds }) => {
  const listRef = useRef(null);
  const contentWidth = useContentWidth();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handlePreviousClick = useCallback(() => {
    const { width } = listRef.current.getBoundingClientRect();
    const currentPosition = Math.floor(listRef.current.scrollLeft / width);
    listRef.current.scroll((currentPosition - 1) * width, 0);
  }, []);

  const handleNextClick = useCallback(() => {
    const { width } = listRef.current.getBoundingClientRect();
    const currentPosition = Math.floor(listRef.current.scrollLeft / width);
    listRef.current.scroll((currentPosition + 1) * width, 0);
  }, []);

  const handleScroll = useCallback(() => {
    const { width } = listRef.current.getBoundingClientRect();
    setCanScrollLeft(listRef.current.scrollLeft > 0);
    setCanScrollRight(
      listRef.current.scrollLeft + width < listRef.current.scrollWidth
    );
  }, []);

  return (
    <div className={styles.category}>
      <h1 className={styles['category__title']}>{title}</h1>
      <div className={styles['category__list']}>
        <div
          className={styles['category__list__button-container']}
          style={{
            visibility: canScrollLeft ? 'visible' : 'hidden',
          }}
        >
          <IconButton onClick={handlePreviousClick}>
            <ChevronLeft />
          </IconButton>
        </div>
        <div
          className={styles['category__list__pieces']}
          style={{ width: `calc(${contentWidth}px - 4rem)` }}
          ref={listRef}
          onScroll={handleScroll}
        >
          {pieceIds
            .filter((pieceId) => Boolean(byId[pieceId]))
            .map((pieceId) => (
              <Preview
                key={pieceId}
                pieceId={pieceId}
                width={`calc((${contentWidth}px - 4rem) / 6)`}
              />
            ))}
        </div>
        <div
          className={styles['category__list__button-container']}
          style={{
            visibility: canScrollRight ? 'visible' : 'hidden',
          }}
        >
          <IconButton onClick={handleNextClick}>
            <ChevronRight />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Category;
