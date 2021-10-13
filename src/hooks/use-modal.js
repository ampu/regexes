import {useEffect} from 'react';

export const useModal = () => {
  useEffect(() => {
    document.body.classList.add(`page-body--modal`);

    return () => {
      document.body.classList.remove(`page-body--modal`);
    };
  }, []);
};
