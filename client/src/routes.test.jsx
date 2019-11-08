import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import React from 'react';
import useStoreon from 'storeon/react';
import { MemoryRouter } from 'react-router-dom';
import chalk from 'chalk';
import routes from './routes';
import NoMatchRoute from './components/noMatchRoute';
import * as testUtils from './testUtils';

jest.mock('./utils');
jest.mock('./config/apiURL', () => () => '/api');
jest.mock('storeon/react', () => jest.fn());
jest.mock('./assets/img/dark.png', () => (
  <img id="dark" alt="dark" />
));
jest.mock('./assets/img/light.png', () => (
  <img id="light" alt="light" />
));
jest.mock('./screens/Posts', () => () => (
  <div id="Posts" />
));

// Used in order to return "localizedText" variable which is out of scope
useStoreon.mockImplementation(() => ({
  locale: 'eng',
  theme: 'dark',
  localizedText: testUtils.localizedText,
  tags: 'tags,tags'
}));

describe(`Testing [${chalk.yellow('routes')}]`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.resetModules();
  });

  it(`Should open invalid path and redirect to [${chalk.yellow('404')}]`, () => {
    const component = testUtils.suppressConsoleWarnings(
      <MemoryRouter initialEntries={['/random']}>
        { routes }
      </MemoryRouter>,
      'mount',
      console
    );

    expect(component.find('#Posts')).toHaveLength(0);
    expect(component.find(NoMatchRoute)).toHaveLength(1);
  });

  it(`Should open [${chalk.yellow('"Home"')}] path and check the result`, () => {
    const component = testUtils.suppressConsoleWarnings(
      <MemoryRouter initialEntries={['/']}>
        { routes }
      </MemoryRouter>,
      'mount',
      console
    );

    expect(component.find('#Posts')).toHaveLength(1);
    expect(component.find(NoMatchRoute)).toHaveLength(0);
  });
});
