import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import chalk from 'chalk';
import Spinner from './Spinner';

jest.mock('../../config/apiURL', () => () => '/api');

describe(`Testing [${chalk.yellow('Spinner')}] component`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    theme: 'dark',
    mgTop: 1
  };

  const Composition = () => (
    <Spinner userAccess {...props} />
  );

  it('Should match snapshot', () => {
    const component = mount(<Composition />);

    expect(component).toMatchSnapshot();
  });

  it('Should render without an error', () => {
    const component = mount(<Composition />);
    expect(component.length).toEqual(1);
  });

  it('Should render with correct props', () => {
    const component = mount(<Composition />);

    expect(component.find(Spinner).prop('mgTop')).toBe(1);
    expect(component.find(Spinner).prop('theme')).toBe('dark');
  });
});
