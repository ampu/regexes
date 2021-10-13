import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {scrollIntoViewByNavigationId} from '../helpers/dom-helpers';

export const useFragmentNavigation = () => {
  const location = useLocation();

  useEffect(() => {
    scrollIntoViewByNavigationId(location.pathname);
  }, [location]);

  useEffect(() => {
    const onDocumentClick = (evt) => {
      for (let target = evt.target; target; target = target.parentNode) {
        if (target.tagName === `A`) {
          const match = target.href.match(/#(.+)$/);
          if (match) {
            const id = match[1];
            scrollIntoViewByNavigationId(id);
          }
          return;
        }
      }
    };

    document.addEventListener(`click`, onDocumentClick);

    return () => {
      document.removeEventListener(`click`, onDocumentClick);
    };
  }, [location]);
};
