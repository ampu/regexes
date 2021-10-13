import React, {useRef, useCallback} from 'react';
import PropTypes from 'prop-types';

import {KeyboardKey} from '../constants/keyboard-key';
import {MouseButton} from '../constants/mouse-button';

import {useModal} from '../hooks/use-modal';
import {useKeyDownStack} from '../hooks/use-key-down-stack';

export const withPopup = (Component) => {
  const WithPopup = ({onClose, ...props}) => {
    const popupRef = useRef(null);

    useModal();

    const onContainerMouseDown = useCallback((evt) => {
      if (evt.button === MouseButton.PRIMARY) {
        if (!popupRef.current.contains(evt.target)) {
          onClose();
        }
      }
    }, [onClose]);

    const onDocumentKeyDown = useCallback((evt) => {
      if (evt.key === KeyboardKey.ESCAPE) {
        evt.preventDefault();
        evt.stopPropagation();
        onClose();
      }
    }, [onClose]);

    useKeyDownStack(onDocumentKeyDown);

    return (
      <Component
        popupRef={popupRef}
        onContainerMouseDown={onContainerMouseDown}
        onClose={onClose}
        {...props}
      />
    );
  };

  WithPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  WithPopup.displayName = `${Component.name}${WithPopup.name}`;

  return WithPopup;
};
