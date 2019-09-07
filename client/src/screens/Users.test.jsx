import React from 'react';
import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import { MemoryRouter } from 'react-router-dom';
import * as testUtils from '../testUtils';
import User from './User';

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
jest.mock('../queryBlocks/QueryUser', () => () => (
  <div id="QueryUser" />
));

describe('Testing USER screen: ', () => {
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
      <User {...props} />
    </MemoryRouter>
  );

  it('Should render properly with props ', () => {
    const component = testUtils.suppressConsoleWarnings(
      <Composition />,
      'mount',
      console
    );

    expect(component.find('User').length).toEqual(1);
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
