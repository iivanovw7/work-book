import React from 'react';
import { mount } from 'enzyme';
import chalk from 'chalk';
import TextArea from './TextArea';

jest.mock('../../config/apiURL', () => () => '/api');

describe(`Testing [${chalk.yellow('TextArea')}] component`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    label: 'label',
    validate: 'validate',
    type: 'type',
    id: '1',
    rows: 1
  };

  const Composition = () => (
    <TextArea userAccess {...props} />
  );

  it('Should match snapshot', () => {
    const component = mount(<Composition />);

    expect(component).toMatchSnapshot();
  });

  it('Should render with all child elements', () => {
    const component = mount(<Composition />);

    expect(component.find('span')).toHaveLength(1);
    expect(component.find('textarea')).toHaveLength(1);
    expect(component.find('label')).toHaveLength(1);

    expect(component.find('span').text()).toBe('validate');
    expect(component.find('label').text()).toBe('label  validate');
  });
});
