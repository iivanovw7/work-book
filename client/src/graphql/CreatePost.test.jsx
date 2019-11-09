import React from 'react';
import wait from 'waait';
import chalk from 'chalk';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import CreatePost from './CreatePost';
import * as mocks from '../__mocks__';
import * as testUtils from '../testUtils';

jest.mock('../config/apiURL', () => () => '/api');
jest.mock('storeon/react', () => () => ({
  locale: 'eng',
  theme: 'dark',
  search: ''
}));

describe(`Testing [${chalk.yellow('CreatePost')}] graphql query: `, () => {
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
    const { componentMocks } = props;
    
    return (
      <MemoryRouter>
        <MockedProvider mocks={componentMocks} addTypename={false} removeTypename>
          <CreatePost _id={1} id="1" {...queryProps} />
        </MockedProvider>
      </MemoryRouter>
    );
  };

  it('Should render Component and match snapshot', async () => {
    const component = testUtils.suppressConsoleWarnings(
      <Composition />,
      'mount',
      console
    );

    await wait(0);
    await component.update();
    expect(component).toMatchSnapshot();
  });

  it('Should render Component with correct data', async () => {
    const component = testUtils.suppressConsoleWarnings(
      <Composition />,
      'mount',
      console
    );

    await wait(0);
    await component.update();
    expect(component.find('button').first().text()).toBe('Back');
    expect(component.find('PostForm').length).toEqual(1);
  });
});
