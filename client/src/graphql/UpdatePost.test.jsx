import React from 'react';
import wait from 'waait';
import chalk from 'chalk';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import UpdatePost from './UpdatePost';
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

describe(`Testing [${chalk.yellow('UpdatePost')}] graphql query: `, () => {
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
          <UpdatePost _id="1" id="1" {...queryProps} />
        </MockedProvider>
      </MemoryRouter>
    );
  };

  it('Should render Component and match snapshot', async () => {
    const component = testUtils.suppressConsoleWarnings(
      <Composition componentMocks={[mocks.gqlMocks[0]]} />,
      'mount',
      console
    );

    await wait(0);
    await component.update();
    expect(component).toMatchSnapshot();
  });

  it('Should render ErrorMessage', async () => {
    const component = testUtils.suppressConsoleWarnings(
      <Composition componentMocks={[mocks.gqlMocks[7]]} />,
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
      <Composition componentMocks={[mocks.gqlMocks[0]]} />,
      'mount',
      console
    );

    await wait(0);
    await component.update();
    expect(component.find('PostForm').length).toEqual(1);
    expect(component.find({ value: 'Post title' }).length).toEqual(4);
  });
});
