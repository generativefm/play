import React, { useCallback } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import { byId } from '@generative-music/pieces-alex-bainter';
import { PlayArrow } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import formatReleaseDate from '../dates/format-release-date';
import TextButton from '../button/text-button';
import userPlayedPiece from '../playback/user-played-piece';
import formatPlayTime from './format-play-time';
import selectUserPlayTime from '../user/select-play-time';
import FeedbackButtons from './feedback-buttons';
import MoreButton from './more-button';
import usePlayTime from './use-play-time';
import CircularLoadingIndicator from '../app/circular-loading-indicator';
import useLatestUser from '../user/use-latest-user';
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
  const userPlayTime = useSelector(selectUserPlayTime);
  const playTime = usePlayTime();
  const isLoadingUser = useLatestUser();

  if (!id && !byId[id]) {
    return <Redirect to="/" />;
  }

  const piece = byId[id];
  const hasPlayTime = Boolean(playTime) && Object.keys(playTime).length > 0;

  return (
    <div className={styles.piece}>
      <div className={styles.info}>
        <img className={styles['info__image']} src={piece.imageSrc} />
        <div className={styles['info__other']}>
          <div className={styles['info__other__title']}>{piece.title}</div>
          <div className={styles['info__other__controls']}>
            <TextButton onClick={handlePlayClick}>
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
            {isLoadingUser && <CircularLoadingIndicator />}
            {!isLoadingUser && (
              <p>
                {userPlayTime[piece.id]
                  ? `played for ${formatPlayTime(userPlayTime[piece.id])}`
                  : 'never played'}{' '}
                by you
              </p>
            )}
            {playTime === null && <CircularLoadingIndicator />}
            {hasPlayTime && (
              <p>
                {playTime[piece.id]
                  ? `played for ${formatPlayTime(playTime[piece.id])} total`
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
