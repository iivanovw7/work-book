import React from 'react';
import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import * as testUtils from '../testUtils';
import Post from './Post';

jest.mock('../config/apiURL', () => () => '/api');

jest.mock('storeon/react', () => () => ({
  locale: 'eng',
  theme: 'dark'
}));
jest.mock('../components/Navigation/MobileNavbar', () => () => (
  <div id="MobileNavbar" />
));
jest.mock('../components/TopBar/TopBar', () => () => (
  <div id="TopBar" />
));
jest.mock('../components/Navigation/SideBar', () => () => (
  <div id="SideBar" />
));
jest.mock('../utils/postHelpers', () => () => (
  <div id="SwitchedComponent" />
));

describe('Testing POST screen: ', () => {
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
    const component = mount(<Composition />);
    expect(component.find('Post').length).toEqual(1);
    expect(component.find('#MobileNavbar').length).toEqual(1);
    expect(component.find('#TopBar').length).toEqual(1);
    expect(component.find('#SideBar').length).toEqual(1);
  });

  it('Should render and match snapshot ', () => {
    const component = mount(<Composition />);
    expect(component).toMatchSnapshot();
  });
});
