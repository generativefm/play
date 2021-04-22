import React, {
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import pieces, { byId } from '@generative-music/pieces-alex-bainter';
import { ArrowDropDown } from '@material-ui/icons';
import useDismissable from '../app/use-dismissable';
import styles from './piece-selector.module.scss';

const sortedPieces = pieces.sort((a, b) => a.title.localeCompare(b.title));

const PieceList = ({ width, onDismiss, onSelect, selectedPieceId }) => {
  const listRef = useRef(null);
  const selectedPieceRef = useRef(null);

  useDismissable({
    onDismiss,
    dismissableRef: listRef,
  });

  const clickHandlers = useMemo(
    () =>
      sortedPieces.map(({ id }) => (event) => {
        event.stopPropagation();
        onSelect(id);
      }),
    [onSelect]
  );

  useLayoutEffect(() => {
    if (!selectedPieceRef.current) {
      return;
    }
    selectedPieceRef.current.scrollIntoView();
  }, []);

  return (
    <div
      className={styles['piece-selector__list']}
      style={{ width }}
      ref={listRef}
    >
      {sortedPieces.map(({ title, imageSrc, id }, i) => (
        <div
          key={id}
          className={styles['piece-selector__piece']}
          onClick={clickHandlers[i]}
          ref={id === selectedPieceId ? selectedPieceRef : null}
        >
          <img
            src={imageSrc}
            className={styles['piece-selector__piece__image']}
          />
          <div className={styles['piece-selector__piece__title']}>{title}</div>
        </div>
      ))}
    </div>
  );
};

const PieceSelector = ({ selectedPieceId, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState('auto');
  const ref = useRef(null);
  useLayoutEffect(() => {
    setWidth(ref.current ? ref.current.clientWidth : 'auto');
  }, []);
  const handleListSelect = useCallback(
    (pieceId) => {
      setIsOpen(false);
      onChange(pieceId);
    },
    [onChange]
  );
  const handleListDismiss = useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleClick = useCallback(() => {
    setIsOpen((wasOpen) => !wasOpen);
  }, []);
  if (!byId[selectedPieceId]) {
    return null;
  }
  const { title, imageSrc } = byId[selectedPieceId];
  return (
    <>
      <div className={styles['piece-selector']} onClick={handleClick} ref={ref}>
        <div className={styles['piece-selector__piece']}>
          <img
            src={imageSrc}
            className={styles['piece-selector__piece__image']}
          />
          <div className={styles['piece-selector__piece__title']}>{title}</div>
        </div>
        <ArrowDropDown />
      </div>
      {isOpen && (
        <PieceList
          width={width}
          onDismiss={handleListDismiss}
          onSelect={handleListSelect}
          selectedPieceId={selectedPieceId}
        />
      )}
    </>
  );
};

export default PieceSelector;
