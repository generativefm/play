import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hasAnonymousData } from '@generative.fm/user';
import classnames from 'classnames';
import Banner from '../banner/banner';
import selectAnonymousImporting from '../settings/select-anonymous-importing';
import selectAnonymousData from '../user/select-anonymous-data';
import Dialog from '../dialog/dialog';
import formatPlayTime from '../piece/format-play-time';
import userChangedSetting from './user-changed-setting';
import { ANONYMOUS_IMPORTING } from './anonymous-importing-reducer';
import styles from './anonymous-data-imported-banner.module.scss';

const BANNER_TEXT =
  'Anonymous activity from this device was moved into your account';
const DIALOG_TITLE = 'Anonymous activity moved into your account';

const AnonymousDataImportedBanner = () => {
  const dispatch = useDispatch();
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const anonymousData = useSelector(selectAnonymousData);
  const isAnonymousImportingEnabled = useSelector(selectAnonymousImporting);
  const [bannerActions] = useState([
    {
      text: 'Learn more',
      onClick: () => {
        setIsDialogVisible(true);
      },
    },
    {
      text: 'Dismiss',
    },
  ]);

  useEffect(() => {
    setIsBannerVisible(
      isAnonymousImportingEnabled && hasAnonymousData(anonymousData)
    );
  }, [anonymousData, isAnonymousImportingEnabled]);

  const handleBannerDismiss = useCallback(() => {
    setIsBannerVisible(false);
  }, []);

  const handleDialogDismiss = useCallback(() => {
    setIsDialogVisible(false);
  }, []);

  const handleDialogDisableClick = useCallback(() => {
    dispatch(
      userChangedSetting({ setting: ANONYMOUS_IMPORTING, value: false })
    );
  }, [dispatch]);

  const createDialogActions = useCallback(
    () => [
      {
        text: 'Undo and disable',
        onClick: handleDialogDisableClick,
      },
      {
        text: 'Dismiss',
      },
    ],
    [handleDialogDisableClick]
  );

  const [dialogActions, setDialogActions] = useState(createDialogActions());

  useEffect(() => {
    setDialogActions(createDialogActions());
  }, [createDialogActions]);

  if (!hasAnonymousData(anonymousData)) {
    return null;
  }

  const totalPlayTime =
    anonymousData.playTime &&
    Object.keys(anonymousData.playTime).reduce(
      (total, pieceId) => total + anonymousData.playTime[pieceId],
      0
    );
  const likeCount =
    anonymousData.likes && Object.keys(anonymousData.likes).length;
  const dislikeCount =
    anonymousData.dislikes && Object.keys(anonymousData.dislikes).length;

  return (
    <>
      {isBannerVisible && (
        <Banner
          text={BANNER_TEXT}
          onDismiss={handleBannerDismiss}
          actions={bannerActions}
        />
      )}
      {isDialogVisible && (
        <Dialog
          title={DIALOG_TITLE}
          actions={dialogActions}
          onDismiss={handleDialogDismiss}
        >
          <p
            className={classnames(
              styles['dialog-body-part'],
              styles['dialog-body-part--text']
            )}
          >
            The following anonymous activity from this device is now associated
            with your account:
          </p>
          <ul
            className={classnames(
              styles['dialog-body-part'],
              styles['dialog-body-part--summary']
            )}
          >
            {totalPlayTime > 0 && (
              <li>{formatPlayTime(totalPlayTime)} of play time</li>
            )}
            {likeCount > 0 && (
              <li>
                {likeCount} like{likeCount > 1 ? 's' : ''}
              </li>
            )}
            {dislikeCount > 0 && (
              <li>
                {dislikeCount} dislike{dislikeCount > 1 ? 's' : ''}
              </li>
            )}
          </ul>
          <p
            className={classnames(
              styles['dialog-body-part'],
              styles['dialog-body-part--text']
            )}
          >
            If you don’t want this activity moved to your account—for example,
            if it belongs to someone else who uses this device without a
            Generative.fm account—you can undo this action and prevent it from
            happening again. You can adjust this behavior from Settings anytime.
          </p>
        </Dialog>
      )}
    </>
  );
};

export default AnonymousDataImportedBanner;
