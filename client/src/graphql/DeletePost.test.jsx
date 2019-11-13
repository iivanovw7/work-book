import React from 'react';
import wait from 'waait';
import chalk from 'chalk';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import DeletePost from './DeletePost';
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


describe(`Testing [${chalk.yellow('DeletePost')}] graphql query: `, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const queryProps = {
    locale: 'eng',
    text: testUtils.localizedText,
    theme: 'dark',
    history: testUtils.history,
    post: mocks.gqlMocks[0].result.data.getPost
  };

  const Composition = (props) => {
    // eslint-disable-next-line react/prop-types
    const { componentMocks } = props;

    return (
      <MemoryRouter>
        <MockedProvider mocks={componentMocks} addTypename={false} removeTypename>
          <DeletePost _id={1} id="1" {...queryProps} />
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

  it('Should render Component with correct data', async () => {
    const component = testUtils.suppressConsoleWarnings(
      <Composition componentMocks={[mocks.gqlMocks[0]]} />,
      'mount',
      console
    );

    await wait(0);
    await component.update();
    expect(component.find('#Button').length).toEqual(1);
    expect(component.find({ text: 'Delete' }).length).toEqual(1);
  });
});
