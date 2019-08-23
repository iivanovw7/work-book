import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import * as testUtils from '../testUtils';
import ErrorMessage from './errorMessage';
import Button from './UI/Button';

jest.mock('../config/apiURL', () => () => '/api');

describe('Testing errorMessage component', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    text: 'error',
    theme: 'dark',
    history: testUtils.history,
    handleClick: jest.fn(),
    message: 'message'
  };

  const Composition = () => (
    <ErrorMessage userAccess {...props} />
  );

  it('Should match snapshot', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition handleClick={mockFunc()} />);
    expect(component).toMatchSnapshot();
  });

  it('Should trigger button click event', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition handleClick={mockFunc()} />);

    expect(component.find(Button)).toHaveLength(1);
    component.find(Button).at(0).simulate('click');
    expect(mockFunc).toHaveBeenCalled();
  });
});
