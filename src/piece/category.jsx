import React, { useState, useCallback, useRef, useLayoutEffect } from 'react';
import { ChevronRight, ChevronLeft } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import IconButton from '../button/icon-button';
import Preview from '../piece/preview';
import useContentWidth from '../layout/use-content-width';
import userPlayedPiece from '../playback/user-played-piece';
import PreviewSkeleton from '../loading/preview-skeleton';
import useClientWidth from '../layout/use-client-width';
import useRemValue from '../layout/use-rem-value';
import styles from './category.module.scss';

const Category = ({
  title,
  pieceIds,
  getSubtitle,
  linkTo,
  placeholder = null,
}) => {
  const listRef = useRef(null);
  const contentWidth = useContentWidth();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const dispatch = useDispatch();
  const clientWidth = useClientWidth();
  const remPx = useRemValue();

  const numVisiblePieces = Math.min(Math.floor(clientWidth / 175), 6);
  const previewWidthPx = (contentWidth - remPx) / numVisiblePieces;

  const [renderedStartIndex, setRenderedStartIndex] = useState(0);
  const [renderedStopIndex, setRenderedStopIndex] = useState(
    numVisiblePieces * 2 - 1
  );

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
    setRenderedStartIndex(
      Math.floor(listRef.current.scrollLeft / previewWidthPx)
    );
    setRenderedStopIndex(
      Math.ceil((listRef.current.scrollLeft + width) / previewWidthPx)
    );
  }, [previewWidthPx]);

  useLayoutEffect(() => {
    if (!listRef.current) {
      return;
    }
    const { width } = listRef.current.getBoundingClientRect();
    setCanScrollRight(
      Math.ceil(listRef.current.scrollLeft + width) <
        listRef.current.scrollWidth
    );
  }, [pieceIds]);

  const handlePiecePlay = useCallback(
    (pieceId) => {
      dispatch(
        userPlayedPiece({
          selectionPieceIds: pieceIds,
          index: pieceIds.indexOf(pieceId),
        })
      );
    },
    [dispatch, pieceIds]
  );

  if (!Array.isArray(pieceIds)) {
    return (
      <div className={styles.category} style={{ width: contentWidth }}>
        <Link to={linkTo} className={styles['category__title']}>
          {title}
        </Link>
        <div
          className={classnames(
            styles['category__list'],
            styles['category__list--is-empty']
          )}
        >
          <div className={styles['category__list__pieces']}>
            {Array.from({ length: numVisiblePieces }, (_, i) => (
              <PreviewSkeleton key={i} width={`${previewWidthPx}px`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (pieceIds.length === 0) {
    if (!placeholder) {
      return null;
    }
    return (
      <div className={styles.category} style={{ width: contentWidth }}>
        <div className={styles['category__title']}>{title}</div>
        <div
          className={classnames(
            styles['category__list'],
            styles['category__list--is-empty']
          )}
        >
          <div className={styles['category__list__pieces']}>
            {Array.from({ length: numVisiblePieces }, (_, i) => (
              <PreviewSkeleton
                key={i}
                width={`${previewWidthPx}px`}
                isAnimated={false}
              />
            ))}
          </div>
          <div className={styles['category__list__placeholder']}>
            {placeholder}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.category} style={{ width: contentWidth }}>
      <Link to={linkTo} className={styles['category__title']}>
        {title}
      </Link>
      <div className={styles['category__list']}>
        <div
          className={styles['category__list__button-container']}
          style={{
            visibility: canScrollLeft ? 'visible' : 'hidden',
          }}
        >
          <IconButton onClick={handlePreviousClick} isFloating title="Previous">
            <ChevronLeft />
          </IconButton>
        </div>
        <div
          className={styles['category__list__pieces']}
          ref={listRef}
          onScroll={handleScroll}
        >
          <div
            style={{
              minWidth: `${previewWidthPx * renderedStartIndex}px`,
            }}
          />
          {pieceIds
            .filter((_, i) => i >= renderedStartIndex && i <= renderedStopIndex)
            .map((pieceId) => (
              <Preview
                key={pieceId}
                pieceId={pieceId}
                width={`${previewWidthPx}px`}
                getSubtitle={getSubtitle}
                onPlay={handlePiecePlay}
              />
            ))}
          <div
            style={{
              minWidth: `${
                previewWidthPx * (pieceIds.length - 1 - renderedStopIndex)
              }px`,
            }}
          />
        </div>
        <div
          className={styles['category__list__button-container']}
          style={{
            visibility: canScrollRight ? 'visible' : 'hidden',
          }}
        >
          <IconButton onClick={handleNextClick} isFloating title="Next">
            <ChevronRight />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

Category.propTypes = {
  title: PropTypes.string,
  pieceIds: PropTypes.arrayOf(PropTypes.string),
  getSubtitle: PropTypes.func,
  linkTo: PropTypes.string,
  placeholder: PropTypes.node,
};

export default Category;
