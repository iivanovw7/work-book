import React from 'react';
import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import { mount } from 'enzyme';
import chalk from 'chalk';
import { MemoryRouter } from 'react-router-dom';
import ContentLayout from './contentLayout';

import * as testUtils from '../testUtils';

jest.mock('../config/apiURL', () => () => '/api');
jest.mock('../utils');

describe(`Testing [${chalk.yellow('content layout')}] component: `, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    locale: 'eng',
    text: testUtils.localizedText,
    theme: 'dark',
    history: testUtils.history
  };

  const ChildComponent = () => (
    <div>Component</div>
  );

  const Composition = () => (
    <MemoryRouter>
      <ContentLayout userAccess {...props}>
        <ChildComponent />
      </ContentLayout>
    </MemoryRouter>
  );

  it('Should match snapshot', async () => {
    const component = mount(<Composition />);
    expect(component).toMatchSnapshot();
  });

  it('Should mount correctly with props', async () => {
    const component = mount(<Composition />);
    expect(component.find('div').text()).toBe('Component');
    expect(component.find({ theme: 'dark' }).length).toEqual(1);
  });
});
