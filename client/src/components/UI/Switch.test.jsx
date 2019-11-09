import React from 'react';
import chalk from 'chalk';
import Switch from './Switch';
import 'jest-styled-components';
import * as testUtils from '../../testUtils';

jest.mock('../../config/apiURL', () => () => '/api');

jest.mock('../../assets/img/dark.png', () => (
  <img id="ImageDark" alt="ImageDark" />
));
jest.mock('../../assets/img/light.png', () => (
  <img id="ImageLight" alt="ImageLight" />
));

describe(`Testing [${chalk.yellow('Switch')}] component`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    checked: true,
    theme: 'dark'
  };

  it('Should match snapshot', async () => {
    const mockFunc = jest.fn();
    // Disabling PropTypes console.log warnings until component is rendered
    const component = testUtils.suppressConsoleWarnings(
      <Switch themeSwitch handleChange={mockFunc} {...props} />,
      'mount',
      console
    );

    await component.update();
    expect(component).toMatchSnapshot();
  });

  it('Should render with correct props', () => {
    const mockFunc = jest.fn();
    // Disabling PropTypes console.log warnings until component is rendered
    const component = testUtils.suppressConsoleWarnings(
      <Switch themeSwitch handleChange={mockFunc} {...props} />,
      'mount',
      console
    );

    expect(component.prop('checked')).toBe(true);
    expect(component.prop('theme')).toBe('dark');
  });

  it('Should trigger click event', async () => {
    const mockFunc = jest.fn();
    // Disabling PropTypes console.log warnings until component is rendered
    const component = testUtils.suppressConsoleWarnings(
      <Switch themeSwitch handleChange={mockFunc} {...props} />,
      'mount',
      console
    );

    await component.update();
    expect(component).toHaveLength(1);
    component.find('input').simulate('change');
    expect(mockFunc).toHaveBeenCalled();
  });
});
