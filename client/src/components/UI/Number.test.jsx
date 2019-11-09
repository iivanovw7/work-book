import React from 'react';
import { mount } from 'enzyme';
import chalk from 'chalk';
import Number from './Number';

jest.mock('../../config/apiURL', () => () => '/api');

describe(`Testing [${chalk.yellow('Number')}] component`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    label: 'label',
    theme: 'dark',
    variant: 'primary',
    value: 1
  };

  const Composition = () => (
    <Number userAccess {...props} />
  );

  it('Should match snapshot', () => {
    const component = mount(<Composition />);

    expect(component).toMatchSnapshot();
  });

  it('Should render with all child elements', () => {
    const component = mount(<Composition />);

    expect(component.find('span')).toHaveLength(1);
    expect(component.find('span').text()).toBe('1');
  });

  it('Should render with correct props', () => {
    const component = mount(<Composition />);

    expect(component.find(Number).prop('value')).toBe(1);
    expect(component.find(Number).prop('variant')).toBe('primary');
  });
});
