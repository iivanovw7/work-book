import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import { mount, shallow } from 'enzyme';

import { createMemoryHistory } from 'history';
import * as localized from './assets/locales.json';

// Mock browser history
export const history = createMemoryHistory('/dashboard');

// Grid config object for testing
export const mappedSizes = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 11
};

export const localizedText = {
  locales: localized.locales,
  topBar: localized.topBar,
  login: localized.login,
  navigation: localized.navigation,
  pageNotFound: localized.pageNotFound,
  posts: localized.posts,
  search: localized.search
};

export function suppressConsoleWarnings(component, mountType, consoleObject) {
  const originalError = consoleObject.error;
  // eslint-disable-next-line no-param-reassign
  consoleObject.error = jest.fn();

  const createdComponent = mountType === 'mount'
    ? mount(component)
    : shallow(component);
  // eslint-disable-next-line no-param-reassign
  consoleObject.error = originalError;

  return createdComponent;
}
