import * as config from '../config';
import * as constants from '../constants';

class Logger {
  constructor(options) {
    if (!Logger.instance) {
      Logger.instance = this;
    }

    // Sets current logging configuration
    this.mode = options.logLevel || 'off';

    if (this.mode !== 'off') {
      Logger.sendMessage(
        'Info', 'rgb(49,196,251)', `Logger is in [${this.mode} only] mode.`
      );
    }

    return Logger.instance;
  }

  /**
   * Send logger message of appropriate type
   * @param {string} type
   * @param {string} color (rgba)
   * @param {string} message text
   * @returns {void}
   */
  static sendMessage(type, color, message) {
    return (
      console.log(
        `%c[${type}]%c ${message}`,
        `color: ${color};`,
        'color: inherit'
      )
    );
  }

  /**
   * Creates logger message of appropriate type, allows debug messages in debug mode
   * @param {symbol} args.type - constant, message sender type
   * @param {string} args.message - logger message
   *
   * @return {null|void}
   */
  send(args) {
    const { type, message } = args;

    if (this.mode === 'off') {
      return null;
    }

    switch (type) {
    case constants.LOGGER_ERROR:
      return Logger.sendMessage('Error', 'rgb(255, 105, 100)', message);
    case constants.LOGGER_SUCCESS:
      return Logger.sendMessage('Success', 'rgb(102,255,69)', message);
    case constants.LOGGER_WARNING:
      return this.mode === 'debug'
        ? Logger.sendMessage('Warning', 'rgb(255, 220, 93)', message)
        : null;
    case constants.LOGGER_INFO:
      return this.mode === 'debug'
        ? Logger.sendMessage('Info', 'rgb(49,196,251)', message)
        : null;
    default:
      return null;
    }
  }
}

const instance = new Logger(config.settings);
Object.freeze(instance);

export default instance;
