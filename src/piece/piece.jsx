import React, { useCallback } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import { byId } from '@generative-music/pieces-alex-bainter';
import { PlayArrow, CloudOff } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import formatReleaseDate from '../dates/format-release-date';
import TextButton from '../button/text-button';
import userPlayedPiece from '../playback/user-played-piece';
import formatPlayTime from './format-play-time';
import FeedbackButtons from './feedback-buttons';
import MoreButton from './more-button';
import usePlayTime from './use-play-time';
import Skeleton from '../loading/skeleton';
import useUserPlayTime from '../user/use-play-time';
import useCanPlay from './use-can-play';
import styles from './piece.module.scss';

const Piece = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const handlePlayClick = useCallback(() => {
    dispatch(
      userPlayedPiece({
        selectionPieceIds: [id],
        index: 0,
      })
    );
  }, [id, dispatch]);
  const globalPlayTime = usePlayTime();
  const {
    isLoading: isLoadingUserPlayTime,
    playTime: userPlayTime,
  } = useUserPlayTime();
  const canPlay = useCanPlay(id);

  if (!id || !byId[id]) {
    return <Redirect to="/" />;
  }

  const piece = byId[id];
  const hasUserPlayTime =
    Object.keys(userPlayTime).length > 0 || !isLoadingUserPlayTime;

  return (
    <div className={styles.piece}>
      <div className={styles['piece__info']}>
        <div
          className={styles['piece__info__image']}
          style={{ backgroundImage: `url(${piece.imageSrc})` }}
        >
          {!canPlay && (
            <div className={styles['piece__info__image__status']}>
              <CloudOff
                className={styles['piece__info__image__status__icon']}
              />
            </div>
          )}
        </div>
        <div className={styles['piece__info__other']}>
          <div className={styles['piece__info__other__status']}>
            {!canPlay && (
              <CloudOff
                className={styles['piece__info__other__status__icon']}
              />
            )}
            {!canPlay && 'Unavailable offline'}
          </div>
          <h1 className={styles['piece__info__other__title']}>{piece.title}</h1>
          <div className={styles['piece__info__other__controls']}>
            <TextButton onClick={handlePlayClick} isPrimary>
              <PlayArrow />
              Play
            </TextButton>
            <FeedbackButtons pieceId={id} />
            <MoreButton pieceId={id} shouldEnableLike={false} />
          </div>
          <div className={styles['piece__info__other__stats']}>
            <div>released {formatReleaseDate(piece.releaseDate)}</div>
            <div>
              {piece.tags.map((tag, i) => (
                <span key={tag}>
                  <Link
                    className={styles['piece__info__other__stats__tag']}
                    to={`/browse/flavor/${tag}`}
                  >
                    {tag}
                  </Link>
                  {i < piece.tags.length - 1 && '/'}
                </span>
              ))}
            </div>
            <div>
              <Skeleton isLoading={!hasUserPlayTime}>
                {hasUserPlayTime && userPlayTime[piece.id]
                  ? `played for ${formatPlayTime(userPlayTime[piece.id])}`
                  : 'never played'}{' '}
                by you
              </Skeleton>
            </div>
            <div>
              <Skeleton isLoading={globalPlayTime === null}>
                {globalPlayTime && globalPlayTime[piece.id]
                  ? `played for ${formatPlayTime(
                      globalPlayTime[piece.id]
                    )} total`
                  : 'never played by anyone else'}
              </Skeleton>
            </div>
            version {piece.version}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Piece;
