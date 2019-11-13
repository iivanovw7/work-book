import React from 'react';
import chalk from 'chalk';
import TagButton from './TagButton';
import * as testUtils from '../../testUtils';

jest.mock('../../config/apiURL', () => () => '/api');
jest.mock('../../config/settings', () => ({
  ...(jest.requireActual('../../config/settings'))
}));

describe(`Testing [${chalk.yellow('TagButton')}] component`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    text: 'text',
    theme: 'dark',
    label: 'label',
    bgColor: 'bg',
    textColor: 'color'
  };

  it('Should match snapshot', () => {
    const mockFunc = jest.fn();
    // Disabling PropTypes console.log warnings until component is rendered
    const component = testUtils.suppressConsoleWarnings(
      <TagButton handleClick={mockFunc} {...props} />,
      'mount',
      console
    );

    expect(component).toMatchSnapshot();
  });

  it('Should render with correct props', () => {
    const mockFunc = jest.fn();
    // Disabling PropTypes console.log warnings until component is rendered
    const component = testUtils.suppressConsoleWarnings(
      <TagButton handleClick={mockFunc} {...props} />,
      'mount',
      console
    );

    expect(component.find(TagButton).prop('textColor')).toBe('color');
    expect(component.find(TagButton).prop('bgColor')).toBe('bg');
  });

  it('Should trigger click event', async () => {
    const mockFunc = jest.fn();
    // Disabling PropTypes console.log warnings until component is rendered
    const component = testUtils.suppressConsoleWarnings(
      <TagButton handleClick={mockFunc} {...props} />,
      'mount',
      console
    );

    expect(component.find(TagButton)).toHaveLength(1);
    component.find('button').simulate('click');
    await component.update();
    expect(mockFunc).toHaveBeenCalled();
  });
});
