import React from 'react';
import wait from 'waait';
import chalk from 'chalk';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import QueryUser from './QueryUser';
import * as mocks from '../__mocks__';
import * as testUtils from '../testUtils';

jest.mock('../config/apiURL', () => () => '/api');
jest.mock('../config/settings', () => ({
  ...(jest.requireActual('../config/settings'))
}));
jest.mock('storeon/react', () => () => ({
  locale: 'eng',
  theme: 'dark',
  search: ''
}));
jest.mock('../components/UI/Button', () => () => (
  <div id="Button" />
));

describe(`Testing [${chalk.yellow('QueryUser')}] graphql query: `, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const queryProps = {
    locale: 'eng',
    text: testUtils.localizedText,
    theme: 'dark',
    history: testUtils.history
  };

  const Composition = (props) => {
    // eslint-disable-next-line react/prop-types
    const { componentMocks } = props;
    return (
      <MemoryRouter>
        <MockedProvider mocks={componentMocks} addTypename={false} removeTypename>
          <QueryUser _id="1" id="1" {...queryProps} />
        </MockedProvider>
      </MemoryRouter>
    );
  };

  it('Should render Component and match snapshot', async () => {
    const component = testUtils.suppressConsoleWarnings(
      <Composition componentMocks={[mocks.gqlMocks[12]]} />,
      'mount',
      console
    );

    await wait(0);
    await component.update();
    expect(component).toMatchSnapshot();
  });

  it('Should render ErrorMessage', async () => {
    const component = testUtils.suppressConsoleWarnings(
      <Composition componentMocks={[mocks.gqlMocks[13]]} />,
      'mount',
      console
    );

    await wait(0);
    await component.update();
    expect(component.find('ErrorMessage').length).toEqual(1);
  });

  it('Should render Spinner', async () => {
    const component = testUtils.suppressConsoleWarnings(
      <Composition componentMocks={[]} />,
      'mount',
      console
    );

    await wait(0);
    expect(component.find('Spinner').length).toEqual(1);
  });

  it('Should render Component with correct data', async () => {
    const component = testUtils.suppressConsoleWarnings(
      <Composition componentMocks={[mocks.gqlMocks[12]]} />,
      'mount',
      console
    );

    await wait(0);
    await component.update();
    expect(component.find('UserView').length).toEqual(1);
    expect(component.find('h2').text()).toBe('User');
    expect(component.find({ value: 'Name' }).length).toEqual(1);
  });
});
