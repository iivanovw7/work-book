import React from 'react';
import chalk from 'chalk';
import { MemoryRouter } from 'react-router-dom';
import Post from './Post';
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
jest.mock('../utils/postHelpers', () => () => (
  <div id="SwitchedComponent" />
));

describe(`Testing [${chalk.yellow('POST')}] screen: `, () => {
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
      <Post {...props} />
    </MemoryRouter>
  );

  it('Should render properly with props ', () => {
    const component = testUtils.suppressConsoleWarnings(
      <Composition />,
      'mount',
      console
    );

    expect(component.find('Post').length).toEqual(1);
    expect(component.find('#MobileNavbar').length).toEqual(1);
    expect(component.find('#TopBar').length).toEqual(1);
    expect(component.find('#SideBar').length).toEqual(1);
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
