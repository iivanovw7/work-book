import React from 'react';
import { mount } from 'enzyme';
import chalk from 'chalk';
import useStoreon from 'storeon/react';
import { MemoryRouter } from 'react-router-dom';
import NoMatchRoute from './noMatchRoute';
import * as testUtils from '../testUtils';

jest.mock('../config/apiURL', () => () => '/api');
jest.mock('../config/settings', () => ({
  ...(jest.requireActual('../config/settings'))
}));
jest.mock('storeon/react', () => jest.fn());

// Used in order to return "localizedText" variable which is out of scope
useStoreon.mockImplementation(() => ({
  locale: 'eng',
  theme: 'dark',
  localizedText: testUtils.localizedText,
  tags: 'tags,tags'
}));

describe(`Testing [${chalk.yellow('NoMatchRoute')}] component`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    history: testUtils.history,
    message: 'message',
    location: {
      pathname: 'pathname'
    }
  };

  const Composition = () => (
    <MemoryRouter>
      <NoMatchRoute userAccess {...props} />
    </MemoryRouter>
  );

  it('Should match snapshot', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition handleClick={mockFunc()} />);
    expect(component).toMatchSnapshot();
  });

  it('Should render with correct props', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition handleClick={mockFunc()} />);
    expect(component.find('ins')).toHaveLength(1);
    expect(component.find('ins').text()).toBe(props.location.pathname);
  });

  it('Should trigger link click event', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition handleClick={mockFunc()} />);
    expect(component.find('a')).toHaveLength(1);
    component.find('a').at(0).simulate('click');
    expect(mockFunc).toHaveBeenCalled();
  });
});
