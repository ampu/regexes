import {useState, useEffect} from 'react';

import {Viewport} from '../constants/viewport';
import {onNoop} from '../helpers/callback-helpers';

export const useMobileModal = () => {
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    const onWindowResize = () => {
      if (window.innerWidth >= Viewport.TABLET) {
        setActive(false);
      }
    };

    window.addEventListener(`resize`, onWindowResize);

    return () => {
      window.removeEventListener(`resize`, onWindowResize);
    };
  }, []);

  useEffect(() => {
    if (!isActive) {
      return onNoop;
    }
    document.body.classList.toggle(`page-body--mobile-modal`, isActive);

    return () => {
      document.body.classList.toggle(`page-body--mobile-modal`, !isActive);
    };
  }, [isActive]);

  return [isActive, setActive];
};
