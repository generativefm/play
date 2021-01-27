import React, { useEffect, useState } from 'react';
import { subscribe } from './snackbar-middleware';
import SnackbarMessage from './snackbar-message';

const Snackbar = () => {
  const [messages, setMessages] = useState([]);
  useEffect(
    () =>
      subscribe(({ message }) => {
        const now = Date.now();
        setMessages((previousValue) => [
          ...previousValue,
          { message, timestamp: now },
        ]);
      }),
    []
  );

  return (
    <>
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

export default Snackbar;
