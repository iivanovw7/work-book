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

// Debounce hook
export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Return a cleanup function that will be called every time useEffect is re-called.
      // useEffect will only be re-called if value changes (see the inputs array below).

      // Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },

    // Only re-call effect if value changes
    [value]
  );

  return debouncedValue;
}
