import React, { useState } from 'react';
import dialogContext from './dialog-context';
import Dialog from './dialog';

const DialogProvider = ({ children }) => {
  const [currentDialog, setCurrentDialog] = useState();
  return (
    <dialogContext.Provider value={setCurrentDialog}>
      <>
        {children}
        {currentDialog && (
          <Dialog title={currentDialog.title}>{currentDialog.content}</Dialog>
        )}
      </>
    </dialogContext.Provider>
  );
};

export default DialogProvider;
