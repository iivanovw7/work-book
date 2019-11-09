import React from 'react';
import { mount } from 'enzyme';
import chalk from 'chalk';
import UserView from './UserView';
import ViewElement from './UserViewElement';
import Button from '../UI/Button';
import * as testUtils from '../../testUtils';
import * as mocks from '../../__mocks__';

jest.mock('../../config/apiURL', () => () => '/api');
jest.mock('storeon/react', () => () => ({
  locale: 'eng',
  theme: 'dark',
  search: ''
}));

describe(`Testing [${chalk.yellow('UserView')}] component`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    history: testUtils.history,
    data: mocks.gqlMocks[12].result.data,
    theme: 'dark',
    locale: 'eng',
    text: testUtils.localizedText
  };

  const Composition = () => (
    <UserView userAccess {...props} />
  );

  it('Should match snapshot', () => {
    const component = mount(<Composition />);
    expect(component).toMatchSnapshot();
  });

  it('Should render component with children', () => {
    const component = mount(<Composition />);

    expect(component.find(ViewElement)).toHaveLength(6);
    expect(component.find(Button)).toHaveLength(1);

    expect(component.find(Button).text()).toBe(props.text.navigation.back[props.locale]);
  });
});
