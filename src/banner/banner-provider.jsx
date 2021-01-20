import React, { useState, useCallback } from 'react';
import bannerContext from './banner-context';
import Banner from './banner';

const BannerProvider = ({ children }) => {
  const [currentBanner, setCurrentBanner] = useState();

  const handleDismiss = useCallback(() => {
    console.log('seting banner to null');
    setCurrentBanner(null);
  }, []);

  return (
    <bannerContext.Provider value={{ setCurrentBanner }}>
      {currentBanner && (
        <Banner
          text={currentBanner.text}
          actions={currentBanner.actions}
          icon={currentBanner.icon}
          onDismiss={handleDismiss}
        />
      )}
      {children}
    </bannerContext.Provider>
  );
};

export default BannerProvider;
