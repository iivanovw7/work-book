import React from 'react';
import wait from 'waait';
import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import * as mocks from '../__mocks__';
import * as testUtils from '../testUtils';
import CreatePost from './CreatePost';

jest.mock('../config/apiURL', () => () => '/api');

describe('Testing CreatePost() graphql query: ', () => {
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
    const { mocks } = props;

    return (
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false} removeTypename>
          <CreatePost _id={1} id="1" {...queryProps} />
        </MockedProvider>
      </MemoryRouter>
    );
  };

  it('Should render Component and match snapshot', async () => {
    const component = mount(<Composition />);

    await wait(0);
    await component.update();
    expect(component).toMatchSnapshot();
  });

  it('Should render Component with correct data', async () => {
    const component = mount(<Composition />);

    await wait(0);
    await component.update();
    expect(component.find('button').first().text()).toBe('Back');
    expect(component.find('PostForm').length).toEqual(1);
  });
});
