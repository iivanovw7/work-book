import Cookies from 'js-cookie';
import * as localized from '../assets/locales.json';
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
  let locale = null;
  forOwnProp(object, (fieldValue) => {
    if (fieldValue === value) {
      locale = value;
    }
  });
  return locale;
}

// Sets default browser language as locale if no previous locale setting were found in cookies
export function setLocale() {
  // Get browser locale
  const language = window.navigator.userLanguage || window.navigator.language;

  // Get previous locale from cookies
  const previousLocale = Cookies.get('locale');

  // Form locale from browser
  const defaultLocale = language === 'ru' ? 'rus' : 'eng';

  // Verify locale got from cookies
  const verifiedPreviousLocale = (ifFieldExistsInObject(previousLocale, localized.locales) !== null)
    ? previousLocale
    : 'eng';

  return previousLocale === undefined ? defaultLocale : verifiedPreviousLocale;
}

// Returns correct word ending for numbers
export function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

// Forms estimated read time label text
export function fromEstimationEnding(minutes = 0, locale = 'eng') {
  const text = localized.posts.estimates;
  if (minutes < 1) {
    return text.less[locale];
  }
  return declOfNum(minutes, [text.one[locale], text.few[locale], text.many[locale]]);
}

export function calculateReadingTime(length = 0, locale = 'eng') {
  const minutes = Math.floor(Math.abs(length) / symbolsPerMinute);

  return {
    minutes,
    ending: fromEstimationEnding(minutes, locale)
  };
}
