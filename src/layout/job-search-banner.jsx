import React, { useState } from 'react';
import Banner from '../banner/banner';
import usePlayTime from '../user/use-play-time';

const PORTFOLIO_URL = 'https://alexbainter.dev';
const STORAGE_KEY = 'jobSearchDismissalTimestamp';
const BANNER_TEXT = 'The creator of Generative.fm is looking for a job';

const getDismissalTimestamp = () => window.localStorage.getItem(STORAGE_KEY);

const JobSearchBanner = () => {
  const { isLoading, playTime } = usePlayTime();
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return null;
  }

  if (
    isLoading ||
    !playTime ||
    Object.values(playTime).reduce((sum, timePlayed) => sum + timePlayed) <
      60 * 60 ||
    getDismissalTimestamp()
  ) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, Date.now());
    } catch (error) {
      // ignore it
    }
  };

  const handleLearnMoreClick = () => {
    const portfolioTab = window.open(PORTFOLIO_URL, 'portfolioTab');
    if (portfolioTab) {
      portfolioTab.focus();
      return;
    }
    window.location.assign(PORTFOLIO_URL);
  };

  return (
    <Banner
      text={BANNER_TEXT}
      actions={[
        {
          text: 'Learn more',
          onClick: handleLearnMoreClick,
        },
        { text: 'Dismiss' },
      ]}
      onDismiss={handleDismiss}
    />
  );
};

export default JobSearchBanner;
