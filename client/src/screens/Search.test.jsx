import React from 'react';
import wait from 'waait';
import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import chalk from 'chalk';
import { MemoryRouter } from 'react-router-dom';
import Search from './Search';
import * as testUtils from '../testUtils';

jest.mock('../config/apiURL', () => () => '/api');
jest.mock('storeon/react', () => () => ({
  locale: 'eng',
  theme: 'dark',
  search: ''
}));
jest.mock('../components/Navigation/MobileNavbar', () => () => (
  <div id="MobileNavbar" />
));
jest.mock('../components/Navigation/TopBar', () => () => (
  <div id="TopBar" />
));
jest.mock('../components/Navigation/SideBar', () => () => (
  <div id="SideBar" />
));
jest.mock('../graphql/SearchByTag', () => () => (
  <div id="SearchByTag" />
));
jest.mock('../components/UI/TagButton', () => () => (
  <div id="TagButton" />
));

describe(`Testing [${chalk.yellow('SEARCH')}] screen: `, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    localizedText: testUtils.localizedText,
    location: {},
    user: {},
    userAccess: true
  };

  const Composition = () => (
    <MemoryRouter>
      <Search {...props} />
    </MemoryRouter>
  );

  it('Should render properly with props ', async () => {
    const component = testUtils.suppressConsoleWarnings(
      <Composition />,
      'mount',
      console
    );

    await wait(0);
    await component.update();

    expect(component.find('Search').length).toEqual(1);
    expect(component.find('#MobileNavbar').length).toEqual(1);
    expect(component.find('#TopBar').length).toEqual(1);
    expect(component.find('#SideBar').length).toEqual(1);
  });

  it('Should render and match snapshot ', async () => {
    const component = testUtils.suppressConsoleWarnings(
      <Composition />,
      'mount',
      console
    );

    await wait(0);
    await component.update();

    expect(component).toMatchSnapshot();
  });
});
