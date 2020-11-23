import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
} from 'react';
import Preview from './preview';
import Select from '../select/select';
import styles from './grid.module.scss';

const Grid = ({ pieceIds, getSubtitle, title }) => {
  const ref = useRef(null);
  const [marginLeft, setMarginLeft] = useState(0);

  const calculateMarginLeft = useCallback(() => {
    const remPx = Number.parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const elementWidth = remPx * 12;
    const leftPadding = (ref.current.clientWidth % elementWidth) / 2;
    setMarginLeft(`calc(${leftPadding}px + 1rem`);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      calculateMarginLeft();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateMarginLeft]);

  useLayoutEffect(() => {
    calculateMarginLeft();
  }, [calculateMarginLeft]);

  return (
    <>
      <div className={styles['header']} style={{ marginLeft }}>
        <h1 className={styles['header__title']}>{title}</h1>
        <div className={styles['header__options']}>
          <Select
            options={[
              ['newest', 'Newest'],
              ['atoz', 'A to Z'],
              ['ztoa', 'Z to A'],
            ]}
            value={'atoz'}
          />
        </div>
      </div>
      <div className={styles.grid} ref={ref}>
        {pieceIds.map((id) => (
          <Preview key={id} id={id} getSubtitle={getSubtitle} />
        ))}
      </div>
    </>
  );
};

export default Grid;
