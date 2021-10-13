import {useRef, useCallback} from 'react';

export const useSwipe = (onNext, onPrevious) => {
  const touchRef = useRef();

  const onTouchStart = useCallback((evt) => {
    touchRef.current = {
      startX: evt.targetTouches[0].clientX,
      endX: evt.targetTouches[0].clientX,
    };
  }, []);

  const onTouchMove = useCallback((evt) => {
    touchRef.current.endX = evt.targetTouches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    const distance = touchRef.current.endX - touchRef.current.startX;

    if (distance < 0) {
      onNext();
    } else if (distance > 0) {
      onPrevious();
    }

    touchRef.current = undefined;
  }, [onNext, onPrevious]);

  return [onTouchStart, onTouchMove, onTouchEnd];
};
