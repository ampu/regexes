import {Viewport} from './viewport';

/** @enum */
export const MediaQuery = {
  TABLET: `(min-width: ${Viewport.TABLET}px) and (max-width: ${Viewport.MIN_DESKTOP - 1}px)`,
  MOBILE: `(max-width: ${Viewport.TABLET - 1}px)`,
};
