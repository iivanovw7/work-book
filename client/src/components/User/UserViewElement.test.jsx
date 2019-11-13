import React from 'react';
import { mount } from 'enzyme';
import chalk from 'chalk';
import ViewElement from './UserViewElement';

jest.mock('../../config/apiURL', () => () => '/api');
jest.mock('../../config/settings', () => ({
  ...(jest.requireActual('../../config/settings'))
}));

describe(`Testing [${chalk.yellow('Button')}] component`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    title: 'title',
    value: 'value'
  };

  const Composition = () => (
    <ViewElement userAccess {...props} />
  );

  it('Should match snapshot', () => {
    const component = mount(<Composition />);
    expect(component).toMatchSnapshot();
  });

  it('Render component with correct props', () => {
    const component = mount(<Composition />);
    expect(component.find(ViewElement).prop('value')).toBe('value');
  });

  it('Should render components with children', () => {
    const component = mount(<Composition />);

    expect(component.find('p')).toHaveLength(1);
    expect(component.find('strong')).toHaveLength(1);

    expect(component.find('p').text()).toBe('title: value');
    expect(component.find('strong').text()).toBe('title: ');
  });
});
