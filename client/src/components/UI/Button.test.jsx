import React from 'react';
import { mount } from 'enzyme';
import chalk from 'chalk';
import * as testUtils from '../../testUtils';
import Button from './Button';

jest.mock('../../config/apiURL', () => () => '/api');
jest.mock('../../config/settings', () => ({
  ...(jest.requireActual('../../config/settings'))
}));

describe(`Testing [${chalk.yellow('Button')}] component`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    text: 'text',
    theme: 'dark',
    history: testUtils.history,
    message: 'message',
    variant: 'primary'
  };

  const Composition = () => (
    <Button userAccess {...props} />
  );

  it('Should match snapshot', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition handleClick={mockFunc()} />);
    expect(component).toMatchSnapshot();
  });

  it('Should trigger button click event', () => {
    const mockFunc = jest.fn();
    const component = mount(<Composition handleClick={mockFunc()} />);

    expect(component.find(Button)).toHaveLength(1);
    component.find(Button).at(0).simulate('click');
    expect(mockFunc).toHaveBeenCalled();
  });
});
