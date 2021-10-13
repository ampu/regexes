import {useEffect, useRef} from 'react';

const BOUNCE_ANIMATION_TIMEOUT = 600;

export const useBounce = () => {
  const isBounceRef = useRef(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      isBounceRef.current = false;
    }, BOUNCE_ANIMATION_TIMEOUT);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return isBounceRef.current;
};
