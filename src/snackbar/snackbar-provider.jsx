import React, { useEffect, useState, useCallback } from 'react';
import { subscribe } from './snackbar-middleware';
import SnackbarMessage from './snackbar-message';
import snackbarContext from './snackbar-context';

const SnackbarProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  useEffect(
    () =>
      subscribe(({ message }) => {
        const timestamp = Date.now();
        setMessages((previousValue) => [
          ...previousValue,
          { message, timestamp },
        ]);
      }),
    []
  );

  const showSnackbarMessage = useCallback((message) => {
    const timestamp = Date.now();
    setMessages((previousValue) => [...previousValue, { message, timestamp }]);
  }, []);

  return (
    <>
      <snackbarContext.Provider value={showSnackbarMessage}>
        {children}
      </snackbarContext.Provider>
      {messages.map(({ message, timestamp }, i) => (
        <SnackbarMessage
          key={timestamp}
          message={message}
          shouldExitNow={i < messages.length - 1}
          onExited={() =>
            setMessages((previousValue) => {
              const index = previousValue.findIndex(
                ({ timestamp: otherTimestamp }) => otherTimestamp === timestamp
              );
              previousValue.splice(index, 1);
              return previousValue;
            })
          }
        />
      ))}
    </>
  );
};

export default SnackbarProvider;
