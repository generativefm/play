import React, {
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
  useEffect,
} from 'react';
import { Search, ArrowBack, Clear, ArrowForward } from '@material-ui/icons';
import classnames from 'classnames';
import pieces from '@generative-music/pieces-alex-bainter';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IconButton from '../button/icon-button';
import useDismissable from '../app/use-dismissable';
import selectCurrentPieceId from '../queue/select-current-piece-id';
import useIsNarrowScreen from '../layout/use-is-narrow-screen';
import { useHistory } from 'react-router-dom';
import styles from './search-button.module.scss';

const SearchButton = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const currentPieceId = useSelector(selectCurrentPieceId);
  const history = useHistory();
  const isNarrowScreen = useIsNarrowScreen();

  const handleSearchClick = useCallback(() => {
    setIsSearching(true);
    if (isNarrowScreen) {
      history.push(
        [
          history.location.pathname,
          history.location.search,
          history.location.hash,
        ].join(''),
        {
          isSearching: true,
        }
      );
    }
  }, [history, isNarrowScreen]);

  const handleStopSearching = useCallback(() => {
    setSearchValue('');
    setIsSearching(false);
  }, []);

  const handleClearClick = useCallback(() => {
    setSearchValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = useCallback((event) => {
    setSearchValue(event.target.value);
  }, []);

  useEffect(
    () =>
      history.listen((location, action) => {
        if (
          action !== 'POP' ||
          (location.state && location.state.isSearching)
        ) {
          return;
        }
        handleStopSearching();
      }),
    [history, handleStopSearching]
  );

  useDismissable({
    dismissableRef: containerRef,
    isOpen: isSearching,
    onDismiss: handleStopSearching,
  });

  useLayoutEffect(() => {
    if (!isSearching || !inputRef.current) {
      return;
    }
    inputRef.current.focus();
  }, [isSearching]);

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResults([]);
      return;
    }
    setSearchResults(
      pieces
        .filter(({ title }) =>
          title.toUpperCase().includes(searchValue.trim().toUpperCase())
        )
        .slice(0)
    );
  }, [searchValue]);

  if (!isSearching) {
    return (
      <IconButton onClick={handleSearchClick}>
        <Search />
      </IconButton>
    );
  }

  return (
    <div
      className={classnames(styles['search'], {
        [styles['search--with-selection']]: Boolean(currentPieceId),
      })}
      ref={containerRef}
    >
      <div
        className={classnames(styles['search-bar'], {
          [styles['search-bar--has-results']]:
            Array.isArray(searchResults) && searchResults.length > 0,
        })}
      >
        <IconButton onClick={handleStopSearching}>
          <ArrowBack />
        </IconButton>
        <input
          placeholder="Search by generator name"
          className={styles['search-bar__input']}
          value={searchValue}
          onChange={handleInputChange}
          ref={inputRef}
        ></input>
        <div
          className={classnames(styles['search-bar__clear-button'], {
            [styles['search-bar__clear-button--is-visible']]: Boolean(
              searchValue
            ),
          })}
        >
          <IconButton onClick={handleClearClick}>
            <Clear />
          </IconButton>
        </div>
      </div>
      {Array.isArray(searchResults) && searchResults.length > 0 && (
        <div
          className={styles['search-results']}
          style={{
            width: containerRef.current && containerRef.current.offsetWidth,
          }}
        >
          {searchResults.map(({ id, title }) => (
            <Link
              key={id}
              className={styles['search-results__item']}
              to={`/generator/${id}`}
              replace={isNarrowScreen}
            >
              {title.toLowerCase()}
              <ArrowForward />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchButton;
