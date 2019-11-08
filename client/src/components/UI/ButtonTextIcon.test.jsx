import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import chalk from 'chalk';
import * as testUtils from '../../testUtils';
import ButtonTextIcon from './ButtonTextIcon';

jest.mock('../../config/apiURL', () => () => '/api');

describe(`Testing [${chalk.yellow('ButtonTextIcon')}] component`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    text: 'text',
    theme: 'dark',
    history: testUtils.history,
    message: 'message',
    variant: 'primary',
    icon: 'icon',
    fontSize: '10',
    padding: '12',
    borderRadius: '12',
    direction: 'column'
  };

  const Composition = () => (
    <ButtonTextIcon userAccess {...props} />
  );

  it('Should match snapshot', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition handleClick={mockFunc()} />);

    expect(component).toMatchSnapshot();
  });

  it('Should render with all child elements', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition handleClick={mockFunc()} />);

    expect(component.find('i')).toHaveLength(1);
    expect(component.find('span')).toHaveLength(1);

    expect(component.find('i').text()).toBe('icon');
    expect(component.find('span').text()).toBe('text');
  });

  it('Should render with correct props', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition handleClick={mockFunc()} />);

    expect(component.find('button').prop('fontSize')).toBe('10');
  });

  it('Should trigger button click event', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition handleClick={mockFunc()} />);

    component.find(ButtonTextIcon).at(0).simulate('click');
    expect(component.find(ButtonTextIcon)).toHaveLength(1);
    expect(mockFunc).toHaveBeenCalled();
  });
});
