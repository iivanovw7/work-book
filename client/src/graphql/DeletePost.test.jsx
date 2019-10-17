import React from 'react';
import wait from 'waait';
import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import * as mocks from '../__mocks__';
import * as testUtils from '../testUtils';
import DeletePost from './DeletePost';

jest.mock('../config/apiURL', () => () => '/api');
jest.mock('storeon/react', () => () => ({
  locale: 'eng',
  theme: 'dark',
  search: ''
}));
jest.mock('../elements/UI/Button', () => () => (
  <div id="Button" />
));


describe('Testing DeletePost() graphql query: ', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const props = {
    locale: 'eng',
    text: testUtils.localizedText,
    theme: 'dark',
    history: testUtils.history,
    post: mocks.gqlMocks[0].result.data.getPost
  };

  const Composition = () => (
    <MemoryRouter>
      <MockedProvider mocks={[mocks.gqlMocks[0]]} addTypename={false} removeTypename>
        <DeletePost _id={1} id="1" {...props} />
      </MockedProvider>
    </MemoryRouter>
  );

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
    expect(component.find('#Button').length).toEqual(1);
    expect(component.find({ text: 'Delete' }).length).toEqual(1);
  });
});
