import React from 'react';
import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import * as testUtils from '../testUtils';
import Login from './Login';

jest.mock('../config/apiURL', () => () => '/api');

jest.mock('storeon/react', () => () => ({
  locale: 'eng',
  theme: 'dark'
}));
jest.mock('../components/TopBar/TopBar', () => () => (
  <div id="topbar" />
));
jest.mock('../components/Login/LoginForm', () => () => (
  <div id="loginform" />
));

describe('Testing LOGIN screen: ', () => {
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
    const component = mount(<Composition />);
    expect(component.find('Login').length).toEqual(1);
    expect(component.find('#topbar').length).toEqual(1);
    expect(component.find('#loginform').length).toEqual(1);
  });

  it('Should render and match snapshot ', () => {
    const component = mount(<Composition />);
    expect(component).toMatchSnapshot();
  });
});
