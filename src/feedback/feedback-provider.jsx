import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import feedbackContext from './feedback-context';
import FeedbackDialog from './feedback-dialog';

const FeedbackProvider = ({ children }) => {
  const [currentConfig, setCurrentConfig] = useState(null);

  const handleDismiss = useCallback(() => {
    setCurrentConfig(null);
  }, []);

  return (
    <>
      <feedbackContext.Provider value={setCurrentConfig}>
        {children}
      </feedbackContext.Provider>
      {currentConfig && (
        <FeedbackDialog
          defaultPieceId={currentConfig.defaultPieceId}
          defaultFeedbackType={currentConfig.defaultFeedbackType}
          onDismiss={handleDismiss}
        />
      )}
    </>
  );
};

FeedbackProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FeedbackProvider;
