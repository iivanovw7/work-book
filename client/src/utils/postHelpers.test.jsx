import React from 'react';
import { shallow, mount } from 'enzyme';
import SwitchedPostComponent from './postHelpers';
import 'jsdom-global/register';

jest.mock('../config/apiURL', () => () => '/api');

jest.mock('../queryBlocks/CreatePost', () => () => (
  <div id="CreatePost">
    CreatePost
  </div>
));

jest.mock('../queryBlocks/QueryPost', () => () => (
  <div id="QueryPost">
    QueryPost
  </div>
));

jest.mock('../queryBlocks/UpdatePost', () => () => (
  <div id="UpdatePost">
    UpdatePost
  </div>
));

describe('SwitchedPostComponent testing: ', () => {
  const props = {
    locale: 'rus',
    text: {},
    theme: 'dark'
  };

  it('Should render correctly in "debug" mode and to match snapshot', () => {
    const location = {
      pathname: 'string1/string2/string3'
    };
    const component = shallow(
      <SwitchedPostComponent debug location={location} {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  it('Should return correct mocked component: QueryPost', () => {
    const location = {
      pathname: 'string1/string2/string3'
    };
    const wrapper = mount(
      <SwitchedPostComponent location={location} {...props} />
    );

    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('#QueryPost').length).toEqual(1);
  });

  it('Should return correct mocked component: CreatePost', () => {
    const location = {
      pathname: 'string1/string2/new'
    };
    const wrapper = mount(
      <SwitchedPostComponent location={location} {...props} />
    );

    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('#CreatePost').length).toEqual(1);
  });

  it('Should return correct mocked component: UpdatePost', () => {
    const location = {
      pathname: 'string1/string2/update'
    };
    const wrapper = mount(
      <SwitchedPostComponent location={location} {...props} />
    );

    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('#UpdatePost').length).toEqual(1);
  });
});
