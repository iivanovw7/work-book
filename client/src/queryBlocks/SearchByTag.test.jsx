import React from 'react';
import wait from 'waait';
import 'cross-fetch/polyfill';
import 'jsdom-global/register';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import * as mocks from '../__mocks__';
import * as testUtils from '../testUtils';
import SearchPostsByTag from './SearchByTag';
// import 'babel-polyfill';

jest.mock('../config/apiURL', () => () => '/api');

jest.mock('../elements/UI/Button', () => () => (
  <div id="Button" />
));

describe('Testing SearchPostsByTag() graphql query: ', () => {
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
    const { mocks } = props;
    return (
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false} removeTypename>
          <SearchPostsByTag tag="1" {...queryProps} />
        </MockedProvider>
      </MemoryRouter>
    );
  };

  it('Should render Component and match snapshot', async () => {
    const component = mount(<Composition mocks={[mocks.gqlMocks[14]]} />);

    await wait(0);
    await component.update();
    expect(component).toMatchSnapshot();
  });

  it('Should render ErrorMessage', async () => {
    const component = mount(<Composition mocks={[mocks.gqlMocks[15]]} />);

    await wait(0);
    await component.update();
    expect(component.find('ErrorMessage').length).toEqual(1);
  });

  it('Should render Spinner', async () => {
    const component = mount(<Composition mocks={[]} />);

    await wait(0);
    expect(component.find('Spinner').length).toEqual(1);
  });

  it('Should render Component with correct data', async () => {
    const component = mount(<Composition mocks={[mocks.gqlMocks[14]]} />);

    await wait(0);
    await component.update();

    expect(component.find('SearchList').length).toEqual(1);
    expect(component.find('a').text()).toEqual('Custom Angular mouseWheel scroll directive');
  });
});
