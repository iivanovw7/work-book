import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import React from 'react';
import chalk from 'chalk';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import * as testUtils from '../testUtils';

jest.mock('../config/apiURL', () => () => '/api');
jest.mock('storeon/react', () => () => ({
  locale: 'eng',
  theme: 'dark',
  search: ''
}));
jest.mock('../components/Navigation/TopBar', () => () => (
  <div id="topbar" />
));
jest.mock('../components/Login/LoginForm', () => () => (
  <div id="loginform" />
));

describe(`Testing [${chalk.yellow('LOGIN')}] screen: `, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = { localizedText: testUtils.localizedText };

  const Composition = () => (
    <MemoryRouter>
      <Login {...props} />
    </MemoryRouter>
  );

  it('Should render properly with props ', () => {
    const component = testUtils.suppressConsoleWarnings(
      <Composition />,
      'mount',
      console
    );

    expect(component.find('Login').length).toEqual(1);
    expect(component.find('#topbar').length).toEqual(1);
    expect(component.find('#loginform').length).toEqual(1);
  });

  it('Should render and match snapshot ', () => {
    const component = testUtils.suppressConsoleWarnings(
      <Composition />,
      'mount',
      console
    );

    expect(component).toMatchSnapshot();
  });
});
