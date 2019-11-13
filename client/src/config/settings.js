const settings = {
  /*
    Log level, can be set to below options:
      - error [default, only errors]
      - debug [all levels]
      - off   [no logging]
  */
  logLevel: 'error'
};

/**
 *  Sets application debugger in 'errors only' mode if started in production (development) mode
 *  @param {object} object - initial settings
 *  @param {string} mode - application mode, defined during build by webpack
 *  @returns {void} - adds modifications before exporting variable
 *
 */
(function merge(object, mode) {
  const config = {};

  if (mode === 'test') {
    config.logLevel = 'off';
  }
  if (mode === 'development') {
    config.logLevel = 'debug';
  }

  Object.assign(object, config);
// eslint-disable-next-line no-undef
}(settings, CONFIG));

// eslint-disable-next-line import/prefer-default-export
export { settings };
