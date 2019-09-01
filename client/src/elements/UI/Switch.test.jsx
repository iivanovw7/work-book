import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import Switch from './Switch';
import 'jest-styled-components';

jest.mock('../../config/apiURL', () => () => '/api');
jest.mock('../../assets/img/dark.png', () => (
  <img id="ImageDark" alt="ImageDark" />
));
jest.mock('../../assets/img/light.png', () => (
  <img id="ImageLight" alt="ImageLight" />
));

describe('Testing Switch component', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    checked: true,
    theme: 'dark'
  };

  it('Should match snapshot', () => {
    const mockFunc = jest.fn();

    // Disabling PropTypes console.log warnings until component is rendered
    const originalError = console.error;
    const originalWarn = console.warn;
    console.error = jest.fn();
    console.warn = jest.fn();
    const component = mount(<Switch themeSwitch handleChange={mockFunc()} {...props} />);
    console.error = originalError;
    console.warn = originalWarn;

    expect(component).toMatchSnapshot();
  });

  it('Should render with correct props', () => {
    const mockFunc = jest.fn();

    // Disabling PropTypes console.log warnings until component is rendered
    const originalError = console.error;
    const originalWarn = console.warn;
    console.error = jest.fn();
    console.warn = jest.fn();
    const component = mount(<Switch themeSwitch handleChange={mockFunc()} {...props} />);
    console.error = originalError;
    console.warn = originalWarn;

    expect(component.prop('checked')).toBe(true);
    expect(component.prop('theme')).toBe('dark');
  });

  it('Should trigger click event', () => {
    const mockFunc = jest.fn();

    // Disabling PropTypes console.log warnings until component is rendered
    const originalError = console.error;
    const originalWarn = console.warn;
    console.error = jest.fn();
    console.warn = jest.fn();
    const component = mount(<Switch themeSwitch handleClick={mockFunc()} {...props} />);
    console.error = originalError;
    console.warn = originalWarn;

    expect(component).toHaveLength(1);
    component.at(0).simulate('click');
    expect(mockFunc).toHaveBeenCalled();
  });
});
