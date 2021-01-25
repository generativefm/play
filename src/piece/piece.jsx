import React, { useCallback } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import { byId } from '@generative-music/pieces-alex-bainter';
import { PlayArrow } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import formatReleaseDate from '../dates/format-release-date';
import TextButton from '../button/text-button';
import userPlayedPiece from '../playback/user-played-piece';
import formatPlayTime from './format-play-time';
import FeedbackButtons from './feedback-buttons';
import MoreButton from './more-button';
import usePlayTime from './use-play-time';
import TextSkeleton from '../loading/text-skeleton';
import useUserPlayTime from '../user/use-play-time';
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

  if (!id && !byId[id]) {
    return <Redirect to="/" />;
  }

  const piece = byId[id];
  const hasGlobalPlayTime =
    Boolean(globalPlayTime) && Object.keys(globalPlayTime).length > 0;
  const hasUserPlayTime =
    Object.keys(userPlayTime).length > 0 || !isLoadingUserPlayTime;

  return (
    <div className={styles.piece}>
      <div className={styles.info}>
        <img className={styles['info__image']} src={piece.imageSrc} />
        <div className={styles['info__other']}>
          <div className={styles['info__other__title']}>{piece.title}</div>
          <div className={styles['info__other__controls']}>
            <TextButton onClick={handlePlayClick} isPrimary>
              <PlayArrow />
              Play
            </TextButton>
            <FeedbackButtons pieceId={id} />
            <MoreButton pieceId={id} />
          </div>
          <div className={styles['info__other__stats']}>
            <p>released {formatReleaseDate(piece.releaseDate)}</p>
            <p>
              {piece.tags.map((tag, i) => (
                <span key={tag}>
                  <Link
                    className={styles['info__other__stats__tag']}
                    to={`/browse/flavor/${tag}`}
                  >
                    {tag}
                  </Link>
                  {i < piece.tags.length - 1 && '/'}
                </span>
              ))}
            </p>
            {!hasUserPlayTime && (
              <TextSkeleton
                className={styles['info__other__stats__skeleton']}
              />
            )}
            {hasUserPlayTime && (
              <p>
                {userPlayTime[piece.id]
                  ? `played for ${formatPlayTime(userPlayTime[piece.id])}`
                  : 'never played'}{' '}
                by you
              </p>
            )}
            {globalPlayTime === null && (
              <TextSkeleton
                className={styles['info__other__stats__skeleton']}
              />
            )}
            {hasGlobalPlayTime && (
              <p>
                {globalPlayTime[piece.id]
                  ? `played for ${formatPlayTime(
                      globalPlayTime[piece.id]
                    )} total`
                  : 'never played by anyone else'}
              </p>
            )}
            version {piece.version}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Piece;
