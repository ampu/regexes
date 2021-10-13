import {useEffect} from 'react';

const callbacks = [];

const onDocumentKeyDown = (evt) => {
  const activeCallback = callbacks[callbacks.length - 1];
  activeCallback(evt);
};

export const useKeyDownStack = (callback) => {
  useEffect(() => {
    callbacks.push(callback);
    if (callbacks.length === 1) {
      document.addEventListener(`keydown`, onDocumentKeyDown);
    }

    return () => {
      callbacks.pop();
      if (callbacks.length === 0) {
        document.removeEventListener(`keydown`, onDocumentKeyDown);
      }
    };
  }, [callback]);
};
