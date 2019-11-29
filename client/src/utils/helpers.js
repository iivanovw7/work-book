import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import * as localized from '../assets/locales/locales.json';
import * as constants from '../constants';
import Logger from './logger';
import { symbolsPerMinute } from '../config';

// Converts string in array of words
export const words = (str, pattern = /[^a-zA-Z-]+/) => str.split(pattern).filter(Boolean);

// Runs over an array and executes callback on every element
export const forEachCallback = (arr, callback) => arr.slice(0).forEach(callback);

// Filters out the non-unique values in an array, based on a provided comparator function.
export const filterNonUniqueBy = (arr, fn) => arr.filter(
  (v, i) => arr.every((x, j) => (i === j) === fn(v, x, i, j))
);

export const mapKeys = (obj, fn) => Object.keys(obj).reduce((acc, k) => {
  acc[fn(obj[k], k, obj)] = obj[k];
  return acc;
}, {});

// Iterates over properties of an object, run callback every time.
export const forOwnProp = (obj, fn) => Object.keys(obj).forEach(key => fn(obj[key], key, obj));

// Finds value in object, returns first match value if nothing found returns null
export function ifFieldExistsInObject(value, object) {
  let output = null;
  forOwnProp(object, (fieldValue) => {
    if (fieldValue === value) {
      output = value;
    }
  });
  return output;
}

// Sets default browser language as locale if no previous locale setting were found in cookies
export function setLocale() {
  // Get browser locale
  const language = window.navigator.userLanguage || window.navigator.languages[0] || window.navigator.language;

  // Get previous locale from cookies
  const previousLocale = Cookies.get('locale');

  // Form locale from browser
  const defaultLocale = language.slice(0, 2) === 'ru' ? 'rus' : 'eng';

  // Verify locale got from cookies
  const verifiedPreviousLocale = (ifFieldExistsInObject(previousLocale, localized.locales) !== null)
    ? previousLocale
    : 'eng';

  return previousLocale === undefined ? defaultLocale : verifiedPreviousLocale;
}

/**
 * Returns correct word ending for number
 * @param {Number} number - input number to set correct ending to
 * @param {[String]} titles - array of word endings, should contain 3 Strings (one, few, many)
 * @return {String} Finally selects and returns one correct ending out of titles array
 */
export function declOfNum(number, titles) {
  const text = localized.posts.estimates;
  const cases = [2, 0, 1, 1, 1, 2];

  // If no titles passed - use ENG locale endings
  const titlesArray = (Array.isArray(titles) || titles.length !== 2)
    ? titles
    : [text.one.eng, text.few.eng, text.many.eng];

  return titlesArray[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

/**
 * Forms estimated read time label text
 * @param {Number} minutes
 * @param {String} locale - current active locale
 * @return {String|*}
 */
export function fromEstimationEnding(minutes = 0, locale = 'eng') {
  const text = localized.posts.estimates;
  if (minutes < 1) {
    return text.less[locale];
  }
  return declOfNum(minutes, [text.one[locale], text.few[locale], text.many[locale]]);
}

/**
 * Pipeline operator
 * Sample usage:
 *    const result = (value|[value]) => pipe([
 *      x => x*2,
 *      x => x/2
 *    ])(value)
 *
 * @param [functions] functions
 * @return {function(*=): *}
 */
export const pipe = functions => data => functions.reduce((value, func) => func(value), data);

/**
 * Returns average reading time value in minutes with label text to be used in components
 * @param length - Text length
 * @param locale - Browser locale
 * @returns {{ending: *, minutes: number}}
 */
export function calculateReadingTime(length = 0, locale = 'eng') {
  const minutes = Math.floor(Math.abs(length) / symbolsPerMinute);

  return {
    minutes,
    ending: fromEstimationEnding(minutes, locale)
  };
}

/**
 * Returns true is page link should be displayed (page is public or user is authenticated)
 * @param {boolean}pageIsPublic
 * @param {boolean}userAccess
 * @returns {boolean|*}
 */
export function setNavLinkAccess(pageIsPublic, userAccess) {
  return ((!pageIsPublic && userAccess) || pageIsPublic);
}

export function setColorIndex(key, colorsPallet) {
  return key <= colorsPallet.length ? key : 5;
}

/**
 * Converts unix timestamp passed in seconds or milliseconds according to passed format pattern
 * @param {String} date - unix timestamp
 * @param {symbol} units - timestamp units (from constants)
 * @param {String} pattern - date format pattern
 * @return {string} formatted date
 */
export function convertUnixTimestamp(date, units, pattern = 'MMMM DD, YYYY') {
  if (!dayjs(date).isValid() || !date) {
    Logger.send({
      type: constants.LOGGER_ERROR,
      message: `convertUnixTimestamp: ${date} is unsupported, expected a valid timestamp!`
    });
    return 'Invalid Date';
  }

  if (!ifFieldExistsInObject(units, constants.TIMESTAMP_UNITS)) {
    Logger.send({
      type: constants.LOGGER_ERROR,
      message: `convertUnixTimestamp: ${units} is unsupported, expected a valid timestamp units!`
    });
    return 'Invalid Date';
  }

  // Parsing and converting date string to an appropriate format according to template
  const parsedDate = timeStamp => pipe([
    x => (units === constants.TIMESTAMP_UNITS.MS ? x / 1000 : x),
    x => parseInt(x, 10),
    x => dayjs.unix(x).format(pattern)
  ])(timeStamp);

  return parsedDate(date);
}

/**
 * Wraps accessing the property/method in Info Logging proxy
 * Logs every read object property.
 *
 * @param {Object} obj - parent object
 * @return {*}
 */
export const traceGets = obj => new Proxy(obj, {
  get(target, propKey, receiver) {
    Logger.send({
      type: constants.LOGGER_INFO,
      message: `GET: ${propKey}`
    });

    return Reflect.get(target, propKey, receiver);
  }
});
