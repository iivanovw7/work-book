import React from 'react';
import { mount } from 'enzyme';
import chalk from 'chalk';
import Spinner from './Spinner';

jest.mock('../../config/apiURL', () => () => '/api');
jest.mock('../../config/settings', () => ({
  ...(jest.requireActual('../../config/settings'))
}));

describe(`Testing [${chalk.yellow('Spinner')}] component`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    theme: 'dark',
    margin: '1em'
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

    expect(component.find(Spinner).prop('margin')).toBe('1em');
    expect(component.find(Spinner).prop('theme')).toBe('dark');
  });
});
