import React, { useCallback } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { byId } from '@generative-music/pieces-alex-bainter';
import { PlayArrow, MoreVert } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import formatReleaseDate from '../dates/format-release-date';
import TextButton from '../button/text-button';
import IconButton from '../button/icon-button';
import userPlayedPiece from '../playback/user-played-piece';
import formatPlayTime from './format-play-time';
import selectPlayTime from '../user/select-play-time';
import useMasterGain from '../volume/use-master-gain';
import FeedbackButtons from './feedback-buttons';
import MoreButton from './more-button';
import styles from './piece.module.scss';

const Piece = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const masterGain = useMasterGain();
  const handlePlayClick = useCallback(() => {
    dispatch(
      userPlayedPiece({
        selectionPieceIds: [id],
        index: 0,
        destination: masterGain,
      })
    );
  }, [id, dispatch, masterGain]);
  const playTime = useSelector(selectPlayTime);

  if (!id && !byId[id]) {
    return <Redirect to="/" />;
  }

  const piece = byId[id];

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
            <p>{formatReleaseDate(piece.releaseDate)}</p>
            <p>{piece.tags.join('/')}</p>
            <p>
              {playTime[piece.id]
                ? `Played for ${formatPlayTime(playTime[piece.id])}`
                : 'Never played'}{' '}
              by you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Piece;
