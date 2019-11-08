import { useState, useEffect, useRef } from 'react';

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      }
    }
  };
};

/**
 * Event listener hook
 * @param {String} eventName - event name to listen to
 * @param {Function} handler - callback function
 * @param {Object} element - DOM element to setup listener to
 * @return {void}
 */
// eslint-disable-next-line import/prefer-default-export
export const useEventListener = (eventName, handler, element = global) => {
  const savedHandler = useRef({});

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Break if not supported
    if (!(element && element.addEventListener)) return;

    const eventListener = event => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};
