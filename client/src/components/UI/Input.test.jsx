import React from 'react';
import chalk from 'chalk';
import Input from './Input';
import * as testUtils from '../../testUtils';

jest.mock('../../config/apiURL', () => () => '/api');
jest.mock('../../config/settings', () => ({
  ...(jest.requireActual('../../config/settings'))
}));

describe(`Testing [${chalk.yellow('Input')}] component`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    label: 'label',
    validate: 'validate',
    type: 'type',
    id: '1',
    theme: 'dark'
  };

  const Composition = () => (
    <Input userAccess {...props} />
  );

  it('Should match snapshot', () => {
    const component = testUtils.suppressConsoleWarnings(
      <Composition />,
      'mount',
      console
    );

    expect(component).toMatchSnapshot();
  });

  it('Should render with all child elements', () => {
    const component = testUtils.suppressConsoleWarnings(
      <Composition />,
      'mount',
      console
    );

    expect(component.find('span')).toHaveLength(1);
    expect(component.find('input')).toHaveLength(1);
    expect(component.find('label')).toHaveLength(1);

    expect(component.find('span').text()).toBe('validate');
    expect(component.find('label').text()).toBe('label  validate');
  });
});
