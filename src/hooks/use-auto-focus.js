import {useEffect} from 'react';

import {scrollIntoViewIfNeeded} from '../helpers/dom-helpers';

export const useAutoFocus = (containerRef, isActive = true) => {
  useEffect(() => {
    if (!isActive) {
      return;
    }
    const element = containerRef.current.querySelector(`[data-auto-focus]`);
    if (element) {
      element.focus({preventScroll: true});
      scrollIntoViewIfNeeded(element);
    }
  }, [containerRef, isActive]);
};
